import { supabase } from '../lib/supabase';
import type { Order, OrderWithItems, CartItemWithProduct } from '../lib/database.types';

export interface CheckoutData {
  shippingName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  paymentMethod: string;
  notes: string;
}

export async function createOrder(userId: string, cartItems: CartItemWithProduct[], checkout: CheckoutData): Promise<Order> {
  const subtotal = cartItems.reduce((sum, item) => sum + item.products.price * item.quantity, 0);
  const taxAmount = subtotal * 0.08;
  const shippingAmount = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + taxAmount + shippingAmount;

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      status: 'confirmed',
      subtotal,
      discount_amount: 0,
      shipping_amount: shippingAmount,
      tax_amount: taxAmount,
      total,
      currency: 'USD',
      payment_status: 'paid',
      payment_method: checkout.paymentMethod,
      shipping_name: checkout.shippingName,
      shipping_address_line1: checkout.addressLine1,
      shipping_address_line2: checkout.addressLine2,
      shipping_city: checkout.city,
      shipping_state: checkout.state,
      shipping_postal_code: checkout.postalCode,
      shipping_country: checkout.country,
      notes: checkout.notes,
    })
    .select()
    .single();

  if (orderError) throw orderError;

  const orderItems = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.products.name,
    product_sku: item.products.sku || '',
    quantity: item.quantity,
    unit_price: item.products.price,
    total_price: item.products.price * item.quantity,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
  if (itemsError) throw itemsError;

  return order;
}

export async function getUserOrders(userId: string): Promise<OrderWithItems[]> {
  const { data, error } = await supabase
    .from('orders')
    .select(`*, order_items(*)`)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as unknown as OrderWithItems[]) || [];
}

export async function getAllOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
  const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
  if (error) throw error;
}

export async function getOrderById(orderId: string): Promise<OrderWithItems | null> {
  const { data, error } = await supabase
    .from('orders')
    .select(`*, order_items(*)`)
    .eq('id', orderId)
    .maybeSingle();
  if (error) throw error;
  return data as unknown as OrderWithItems;
}

import { supabase } from '../lib/supabase';
import type { CartItemWithProduct } from '../lib/database.types';

export async function getCartItems(userId: string): Promise<CartItemWithProduct[]> {
  const { data, error } = await supabase
    .from('cart_items')
    .select(`*, products(*, product_images(*))`)
    .eq('user_id', userId);
  if (error) throw error;
  return (data as unknown as CartItemWithProduct[]) || [];
}

export async function addToCart(userId: string, productId: string, quantity = 1): Promise<void> {
  const { error } = await supabase.from('cart_items').upsert(
    { user_id: userId, product_id: productId, quantity },
    { onConflict: 'user_id,product_id', ignoreDuplicates: false }
  );
  if (error) throw error;
}

export async function updateCartItemQuantity(itemId: string, quantity: number): Promise<void> {
  if (quantity <= 0) {
    await removeCartItem(itemId);
    return;
  }
  const { error } = await supabase.from('cart_items').update({ quantity }).eq('id', itemId);
  if (error) throw error;
}

export async function removeCartItem(itemId: string): Promise<void> {
  const { error } = await supabase.from('cart_items').delete().eq('id', itemId);
  if (error) throw error;
}

export async function clearCart(userId: string): Promise<void> {
  const { error } = await supabase.from('cart_items').delete().eq('user_id', userId);
  if (error) throw error;
}

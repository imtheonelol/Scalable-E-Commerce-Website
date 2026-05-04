import { supabase } from '../lib/supabase';
import type { Product, ProductWithImages, Category } from '../lib/database.types';

export interface ProductFilters {
  categorySlug?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'name';
  page?: number;
  limit?: number;
}

export async function getProducts(filters: ProductFilters = {}): Promise<{ data: ProductWithImages[]; count: number }> {
  const { page = 1, limit = 12, sortBy = 'newest', categorySlug, search, minPrice, maxPrice, inStock, featured } = filters;
  const from = (page - 1) * limit;

  let query = supabase
    .from('products')
    .select(`*, product_images(*), categories(*)`, { count: 'exact' })
    .eq('is_active', true);

  if (categorySlug) {
    const { data: cat } = await supabase.from('categories').select('id').eq('slug', categorySlug).maybeSingle();
    if (cat) query = query.eq('category_id', cat.id);
  }
  if (search) query = query.ilike('name', `%${search}%`);
  if (minPrice !== undefined) query = query.gte('price', minPrice);
  if (maxPrice !== undefined) query = query.lte('price', maxPrice);
  if (inStock) query = query.gt('stock_quantity', 0);
  if (featured) query = query.eq('is_featured', true);

  switch (sortBy) {
    case 'price_asc': query = query.order('price', { ascending: true }); break;
    case 'price_desc': query = query.order('price', { ascending: false }); break;
    case 'name': query = query.order('name', { ascending: true }); break;
    default: query = query.order('created_at', { ascending: false });
  }

  query = query.range(from, from + limit - 1);

  const { data, error, count } = await query;
  if (error) throw error;
  return { data: (data as unknown as ProductWithImages[]) || [], count: count || 0 };
}

export async function getProductBySlug(slug: string): Promise<ProductWithImages | null> {
  const { data, error } = await supabase
    .from('products')
    .select(`*, product_images(*), categories(*)`)
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();
  if (error) throw error;
  return data as unknown as ProductWithImages;
}

export async function getProductById(id: string): Promise<ProductWithImages | null> {
  const { data, error } = await supabase
    .from('products')
    .select(`*, product_images(*), categories(*)`)
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data as unknown as ProductWithImages;
}

export async function getFeaturedProducts(): Promise<ProductWithImages[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`*, product_images(*), categories(*)`)
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(8);
  if (error) throw error;
  return (data as unknown as ProductWithImages[]) || [];
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function createProduct(product: Partial<Product>): Promise<Product> {
  const { data, error } = await supabase.from('products').insert(product).select().single();
  if (error) throw error;
  return data;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const { data, error } = await supabase.from('products').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from('products').update({ is_active: false }).eq('id', id);
  if (error) throw error;
}

export async function createCategory(category: Partial<Category>): Promise<Category> {
  const { data, error } = await supabase.from('categories').insert(category).select().single();
  if (error) throw error;
  return data;
}

export async function updateCategory(id: string, updates: Partial<Category>): Promise<Category> {
  const { data, error } = await supabase.from('categories').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

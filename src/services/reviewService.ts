import { supabase } from '../lib/supabase';
import type { Review, ReviewWithProfile } from '../lib/database.types';

export async function getProductReviews(productId: string): Promise<ReviewWithProfile[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select(`*, profiles(full_name, avatar_url)`)
    .eq('product_id', productId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as unknown as ReviewWithProfile[]) || [];
}

export async function createReview(review: Omit<Review, 'id' | 'created_at' | 'updated_at' | 'is_verified'>): Promise<Review> {
  const { data, error } = await supabase.from('reviews').insert(review).select().single();
  if (error) throw error;
  return data;
}

export async function updateReview(id: string, updates: Partial<Review>): Promise<Review> {
  const { data, error } = await supabase.from('reviews').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteReview(id: string): Promise<void> {
  const { error } = await supabase.from('reviews').delete().eq('id', id);
  if (error) throw error;
}

export async function getProductAverageRating(productId: string): Promise<{ average: number; count: number }> {
  const { data, error } = await supabase
    .from('reviews')
    .select('rating')
    .eq('product_id', productId);
  if (error) throw error;
  if (!data || data.length === 0) return { average: 0, count: 0 };
  const average = data.reduce((sum, r) => sum + r.rating, 0) / data.length;
  return { average: Math.round(average * 10) / 10, count: data.length };
}

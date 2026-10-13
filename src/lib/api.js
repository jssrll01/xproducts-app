import { supabase } from './supabase.js';

async function list(table, order) {
  try {
    let q = supabase.from(table).select('*');
    if (order) q = q.order(order, { ascending: false });
    const { data, error } = await q;
    return { items: Array.isArray(data) ? data : [], error };
  } catch (e) {
    return { items: [], error: e };
  }
}

export const fetchProducts = () => list('products', 'created_at');

export const productCrud = {
  create: async (p) => supabase.from('products').insert(p).select().single(),
  update: async (id, p) => supabase.from('products').update(p).eq('id', id),
  remove: async (id) => supabase.from('products').delete().eq('id', id),
};

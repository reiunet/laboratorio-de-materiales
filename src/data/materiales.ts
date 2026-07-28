// src/data/materiales.ts
import { supabase } from '../lib/supabase'; // Tu cliente de Supabase

export async function getMaterialBySlug(slug: string) {
  const { data, error } = await supabase
    .from('materiales')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

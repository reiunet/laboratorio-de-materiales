export interface Material {
  id: string;
  slug: string;
  nombre: string;
  categoria: string | null;
  codigo_laboratorio: string | null;
  diametro_pulgadas: string | null;
  color_identificacion: string | null;
  codigo_color_ferrum: string | null;
  composicion_quimica: string | null;
  estado_entrega_probeta: string | null;
  dureza_max_recocido_hb: string | null;
  aplicaciones: string | null;
  clasificacion_iso: string | null;
  norma_aisi_sae: string | null;
  norma_din_en: string | null;
  numero_material_wnr: string | null;
  maquinabilidad: string | null;
  soldabilidad: string | null;
  imagenes_muestra: string[] | null;
  video_url: string | null;
  created_at: string;
}

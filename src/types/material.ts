export interface Material {
  slug: string;
  nombre: string;
  categoria: string;
  codigo_laboratorio: string;
  diametro_pulgadas: string;
  color_identificacion: string;
  codigo_color_ferrum: string;
  composicion_quimica: string;
  estado_entrega_probeta: string;
  dureza_max_recocido_hb: string;
  aplicaciones: string;
  clasificacion_iso?: string;
  norma_aisi_sae: string;
  norma_din_en: string;
  numero_material_wnr: string;
  maquinabilidad?: string;
  soldabilidad?: string;
  imagenes_muestra: string[];
  video_url?: string;
}

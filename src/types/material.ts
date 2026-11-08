export interface Presentacion {
  codigo_laboratorio: string | null;
  diametro_pulgadas: string | null;
}

export interface TratamientoTermico {
  forjado: string | null;
  normalizado: string | null;
  recocido: string | null;
  temple: string | null;
  revenido: string | null;
  notas: string | null;
}

export interface Material {
  id: string;
  slug: string;
  nombre: string;
  tipo_material: string | null;
  codigo_color_ferrum: string | null;
  composicion_quimica: string | null;
  dureza_max_recocido_hb: string | null;
  aplicaciones: string | null;
  imagenes_muestra: string[] | null;
  imagenes_tratamiento_termico: string[] | null;
  video_url: string | null;
  created_at: string;
  presentaciones: Presentacion[];
  tratamiento_termico: TratamientoTermico | null;
}

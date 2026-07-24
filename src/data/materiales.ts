export interface Material {
  slug: string;
  nombre: string;
  categoria: string;
  color_identificacion: string;
  composicion_quimica: string;
  estado_entrega_probeta: string;
  dureza_max_recocido_hb: string;
  aplicaciones: string;
  clasificacion_iso: string;
  norma_aisi_sae: string;
  norma_din_en: string;
  numero_material_wnr: string;
  maquinabilidad: string;
  soldabilidad: string;
  codigo_color_ferrum: string;
  imagenes_muestra: string[];
  video_url: string;
}

export const MATERIALES_MOCK: Material[] = [
  {
    slug: "sae-1045",
    nombre: "SAE 1045",
    categoria: "Aceros al carbono / aleados",
    color_identificacion: "#C19A6B",
    composicion_quimica: "Carbono (C) ≈ 0.45%, Silicio (Si) ≈ 0.25%, Manganeso (Mn) ≈ 0.65%",
    estado_entrega_probeta: "Calibrado / Normalizado",
    dureza_max_recocido_hb: "225 HB",
    aplicaciones: "Ejes, piñones, engranajes, pernos, cigüeñales y piezas de maquinaria que requieran dureza media y alta tenacidad.",
    clasificacion_iso: "P",
    norma_aisi_sae: "1045",
    norma_din_en: "C45E / CK45",
    numero_material_wnr: "1.1191",
    maquinabilidad: "70% (Basado en B1112)",
    soldabilidad: "Limitada (Requiere precalentamiento)",
    codigo_color_ferrum: "Caqui (Marrón claro)",
    imagenes_muestra: [
      "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=600&q=80"
    ],
    video_url: "https://www.youtube.com/embed/ejemplo1"
  },
  {
    slug: "sae-4140",
    nombre: "SAE 4140",
    categoria: "Aceros al carbono / aleados",
    color_identificacion: "#3182CE",
    composicion_quimica: "Carbono (C) ≈ 0.40%, Cromo (Cr) ≈ 1.00%, Manganeso (Mn) ≈ 0.85%, Molibdeno (Mo) ≈ 0.20%",
    estado_entrega_probeta: "Templado y Revenido (Bonificado)",
    dureza_max_recocido_hb: "241 HB",
    aplicaciones: "Piezas de alta exigencia mecánica como cigüeñales, ejes de transmisión, bielas, pernos de alta resistencia y engranajes de alta carga.",
    clasificacion_iso: "P",
    norma_aisi_sae: "4140",
    norma_din_en: "42CrMo4",
    numero_material_wnr: "1.7225",
    maquinabilidad: "65% (En estado recocido)",
    soldabilidad: "Muy limitada (Requiere pre y post calentamiento estricto)",
    codigo_color_ferrum: "Azul oscuro",
    imagenes_muestra: [
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
    ],
    video_url: "https://www.youtube.com/embed/ejemplo2"
  },
  {
    slug: "bohler-k100",
    nombre: "BÖHLER K100",
    categoria: "Aceros para herramientas de trabajo en frío",
    color_identificacion: "#E53E3E",
    composicion_quimica: "Carbono (C) ≈ 2.00%, Cromo (Cr) ≈ 11.50%, Silicio (Si) ≈ 0.25%, Manganeso (Mn) ≈ 0.35%",
    estado_entrega_probeta: "Recocido blando",
    dureza_max_recocido_hb: "250 HB",
    aplicaciones: "Matrices de estampado, herramientas de corte de alta producción, rodillos de laminación, cuchillas de cizalla y moldes para cerámicas.",
    clasificacion_iso: "H / K",
    norma_aisi_sae: "D3",
    norma_din_en: "X210Cr12",
    numero_material_wnr: "1.2080",
    maquinabilidad: "35% (Difícil mecanizado por alto cromo)",
    soldabilidad: "No recomendada",
    codigo_color_ferrum: "Rojo",
    imagenes_muestra: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80"
    ],
    video_url: "https://www.youtube.com/embed/ejemplo3"
  }
];

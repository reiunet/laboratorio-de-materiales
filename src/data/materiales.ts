import type { Material } from '../types/material';
import materialesJson from './materiales.json';
import imagenesGeneradas from './imagenes-generadas.json';

export interface MaterialProcesado extends Material {
  imagenes: string[];
  imagenes_tt: string[];
  imagenes_aplicaciones: string[];
  diametros_disponibles: string[];
  procesos_tratamiento: { etiqueta: string; valor: string }[];
}

const DEFAULT_IMAGE = "/materiales/material-default.jpg";

// Convierte "industria_alimenticia" -> "Industria Alimenticia"
function formatearNombreArchivo(nombre: string): string {
  return nombre
    .replace(/\.[^.]+$/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getAllMateriales(): MaterialProcesado[] {
  return (materialesJson as unknown as Material[]).map((mat) => {
    const imgData = (imagenesGeneradas as Record<string, any>)[mat.slug] || {};

    // Imagen principal: probeta generada o fallback
    const imagenes = imgData.probeta
      ? [imgData.probeta]
      : (Array.isArray(mat.imagenes_muestra) && mat.imagenes_muestra.length > 0
          ? mat.imagenes_muestra
          : [DEFAULT_IMAGE]);

    const imagenes_aplicaciones: string[] = imgData.aplicaciones || [];
    const imagenes_tt: string[] = imgData.tratamiento_termico || [];

    const diametros_disponibles =
      mat.presentaciones?.map((p) => p.diametro_pulgadas).filter(Boolean) as string[] || [];

    const procesos_tratamiento = mat.tratamiento_termico
      ? [
          { etiqueta: "Forjado", valor: mat.tratamiento_termico.forjado },
          { etiqueta: "Normalizado", valor: mat.tratamiento_termico.normalizado },
          { etiqueta: "Recocido", valor: mat.tratamiento_termico.recocido },
          { etiqueta: "Temple", valor: mat.tratamiento_termico.temple },
          { etiqueta: "Revenido", valor: mat.tratamiento_termico.revenido },
          { etiqueta: "Austenitizado", valor: mat.tratamiento_termico.austenitizado },
        ].filter((p): p is { etiqueta: string; valor: string } =>
          p.valor !== null && p.valor !== ""
        )
      : [];

    return {
      ...mat,
      imagenes,
      imagenes_tt,
      imagenes_aplicaciones,
      diametros_disponibles,
      procesos_tratamiento,
    };
  });
}

export { formatearNombreArchivo };

export function getMaterialBySlug(slug: string): MaterialProcesado | null {
  const materiales = getAllMateriales();
  return materiales.find((m) => m.slug === slug) || null;
}

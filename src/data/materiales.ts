import type { Material } from '../types/material';
import materialesJson from './materiales.json';
import imagenesGeneradas from './imagenes-generadas.json';

export interface MaterialProcesado extends Material {
  imagenes: string[];
  imagenes_tt: string[];
  imagenes_aplicaciones: string[];
  microscopia: Record<string, string>; // { "200": "/ruta/200x.jpg", ... }
  diametros_disponibles: string[];
  procesos_tratamiento: { etiqueta: string; valor: string }[];
}

const DEFAULT_IMAGE = "/materiales/material-default.jpg";

function formatearNombreArchivo(nombre: string): string {
  return nombre
    .replace(/\.[^.]+$/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Devuelve la microscopía de menor aumento (200x si existe, si no 500x, etc.)
function imagenPrincipalDesdeMicroscopia(microscopia: Record<string, string>): string | null {
  const aumentos = Object.keys(microscopia)
    .map((k) => parseInt(k, 10))
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b);
  if (aumentos.length === 0) return null;
  return microscopia[String(aumentos[0])] || null;
}

export function getAllMateriales(): MaterialProcesado[] {
  return (materialesJson as unknown as Material[]).map((mat) => {
    const imgData = (imagenesGeneradas as Record<string, any>)[mat.slug] || {};

    const microscopia: Record<string, string> = imgData.microscopia || {};
    const imagenes_aplicaciones: string[] = imgData.aplicaciones || [];
    const imagenes_tt: string[] = imgData.tratamiento_termico || [];

    // Imagen principal: microscopía de menor aumento o fallback
    const principal = imagenPrincipalDesdeMicroscopia(microscopia);
    const imagenes = principal ? [principal] : [DEFAULT_IMAGE];

    const diametros_disponibles =
      mat.presentaciones?.map((p) => p.diametro_pulgadas).filter(Boolean) as string[] || [];

    const procesos_tratamiento = mat.tratamiento_termico
      ? [
          { etiqueta: "Forjado", valor: mat.tratamiento_termico.forjado },
          { etiqueta: "Normalizado", valor: mat.tratamiento_termico.normalizado },
          { etiqueta: "Recocido", valor: mat.tratamiento_termico.recocido },
          { etiqueta: "Temple", valor: mat.tratamiento_termico.temple },
          { etiqueta: "Revenido", valor: mat.tratamiento_termico.revenido },
        ].filter((p): p is { etiqueta: string; valor: string } =>
          p.valor !== null && p.valor !== ""
        )
      : [];

    return {
      ...mat,
      imagenes,
      imagenes_tt,
      imagenes_aplicaciones,
      microscopia,
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

import fs from 'node:fs';
import path from 'node:path';
import type { Material } from '../types/material';
import materialesJson from './materiales.json';

export interface MaterialProcesado extends Material {
  imagenes: string[];
}

const DEFAULT_IMAGE = "/materiales/material-default.jpg";

export function getAllMateriales(): MaterialProcesado[] {
  return (materialesJson as unknown as Material[]).map((mat) => {
    let imagenes: string[] = [];

    if (Array.isArray(mat.imagenes_muestra) && mat.imagenes_muestra.length > 0) {
      imagenes = mat.imagenes_muestra;
    } else {
      const folderPath = path.join(process.cwd(), 'public/materiales', mat.slug);

      if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath);
        const validImages = files.filter((file) =>
          /\.(jpg|jpeg|png|webp|avif)$/i.test(file)
        );

        if (validImages.length > 0) {
          imagenes = validImages.map((file) => `public/materiales/${mat.slug}/${file}`);
        }
      }
    }

    if (imagenes.length === 0) {
      imagenes = [DEFAULT_IMAGE];
    }

    return {
      ...mat,
      imagenes,
    };
  });
}

export function getMaterialBySlug(slug: string): MaterialProcesado | null {
  const materiales = getAllMateriales();
  return materiales.find((m) => m.slug === slug) || null;
}

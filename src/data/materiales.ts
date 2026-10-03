import fs from 'node:fs';
import path from 'node:path';
import type { Material } from '../types/material';
import materialesJson from './materiales.json';

export interface MaterialProcesado extends Material {
  imagenes: string[];
  imagenes_tt: string[]; // Array procesado de imágenes de tratamiento térmico
  diametros_disponibles: string[]; // Lista plana de diámetros para fácil renderizado
}

const DEFAULT_IMAGE = "/materiales/material-default.jpg";

export function getAllMateriales(): MaterialProcesado[] {
  return (materialesJson as unknown as Material[]).map((mat) => {
    let imagenes: string[] = [];
    let imagenes_tt: string[] = [];

    // --- Lógica para imágenes principales ---
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

    // --- Lógica para imágenes de Tratamiento Térmico ---
    // Busca en la subcarpeta 'tratamiento-termico' dentro de la carpeta del slug
    const ttFolderPath = path.join(process.cwd(), 'public/materiales', mat.slug, 'tratamiento-termico');

    if (fs.existsSync(ttFolderPath)) {
      const ttFiles = fs.readdirSync(ttFolderPath);
      const validTTImages = ttFiles.filter((file) =>
        /\.(jpg|jpeg|png|webp|avif)$/i.test(file)
      );
      if (validTTImages.length > 0) {
        imagenes_tt = validTTImages.map((file) => `public/materiales/${mat.slug}/tratamiento-termico/${file}`);
      }
    }

    // Fallback para imagen principal
    if (imagenes.length === 0) {
      imagenes = [DEFAULT_IMAGE];
    }

    // Extraer diámetros de las presentaciones para fácil acceso
    const diametros_disponibles = mat.presentaciones?.map(p => p.diametro_pulgadas).filter(Boolean) as string[] || [];

    return {
      ...mat,
      imagenes,
      imagenes_tt,
      diametros_disponibles,
    };
  });
}

export function getMaterialBySlug(slug: string): MaterialProcesado | null {
  const materiales = getAllMateriales();
  return materiales.find((m) => m.slug === slug) || null;
}

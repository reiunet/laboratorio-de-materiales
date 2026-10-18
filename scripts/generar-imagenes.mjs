import fs from 'node:fs';
import path from 'node:path';

const PUBLIC_DIR = path.join(process.cwd(), 'public/materiales');
const OUTPUT_FILE = path.join(process.cwd(), 'src/data/imagenes-generadas.json');

// Slugs que conocemos (desde el JSON de materiales)
const materialesJson = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'src/data/materiales.json'), 'utf-8')
);
const slugs = materialesJson.map((m) => m.slug);

const resultado = {};

for (const slug of slugs) {
  const base = path.join(PUBLIC_DIR, slug);
  if (!fs.existsSync(base)) {
    resultado[slug] = { probeta: null, aplicaciones: [], tratamiento_termico: [] };
    continue;
  }

  // Imagen principal: [slug]-probeta.*
  const probeta = fs.readdirSync(base).find((f) =>
    new RegExp(`^${slug}-probeta\\.(jpg|jpeg|png|webp|avif)$`, 'i').test(f)
  );

  // Aplicaciones
  const appsDir = path.join(base, 'aplicaciones');
  const aplicaciones = fs.existsSync(appsDir)
    ? fs.readdirSync(appsDir)
        .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
        .map((f) => `/materiales/${slug}/aplicaciones/${f}`)
    : [];

  // Tratamiento térmico
  const ttDir = path.join(base, 'tratamiento-termico');
  const tt = fs.existsSync(ttDir)
    ? fs.readdirSync(ttDir)
        .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
        .map((f) => `/materiales/${slug}/tratamiento-termico/${f}`)
    : [];

  resultado[slug] = {
    probeta: probeta ? `/materiales/${slug}/${probeta}` : null,
    aplicaciones,
    tratamiento_termico: tt,
  };
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(resultado, null, 2));
console.log(`✅ imagenes-generadas.json actualizado (${slugs.length} materiales)`);

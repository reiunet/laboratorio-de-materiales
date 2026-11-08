import fs from 'node:fs';
import path from 'node:path';

const PUBLIC_DIR = path.join(process.cwd(), 'public/materiales');
const OUTPUT_FILE = path.join(process.cwd(), 'src/data/imagenes-generadas.json');

const materialesJson = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'src/data/materiales.json'), 'utf-8')
);
const slugs = materialesJson.map((m) => m.slug);

const resultado = {};

for (const slug of slugs) {
  const base = path.join(PUBLIC_DIR, slug);
  if (!fs.existsSync(base)) {
    resultado[slug] = { microscopia: {}, aplicaciones: [], tratamiento_termico: [] };
    continue;
  }

  // Microscopía: cualquier archivo tipo 200x.jpg, 500x.jpg, 800x.jpg, etc.
  const microDir = path.join(base, 'microscopia');
  const microscopia = {};
  if (fs.existsSync(microDir)) {
    const files = fs.readdirSync(microDir).filter((f) =>
      /\.(jpg|jpeg|png|webp|avif)$/i.test(f)
    );
    files.forEach((f) => {
      const match = f.match(/^(\d+)x\./i);
      if (match) {
        microscopia[match[1]] = `/materiales/${slug}/microscopia/${f}`;
      }
    });
  }

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
    microscopia,
    aplicaciones,
    tratamiento_termico: tt,
  };
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(resultado, null, 2));
console.log(`✅ imagenes-generadas.json actualizado (${slugs.length} materiales)`);

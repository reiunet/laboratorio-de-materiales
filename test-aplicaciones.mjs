import fs from 'node:fs';
import path from 'node:path';

const folder = path.join(process.cwd(), 'public/materiales/aisi-316l/aplicaciones');
const existe = fs.existsSync(folder);
const files = existe ? fs.readdirSync(folder).filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f)) : [];

fs.writeFileSync('test-output.txt', `
CWD: ${process.cwd()}
Carpeta: ${folder}
Existe: ${existe}
Archivos: ${JSON.stringify(files, null, 2)}
Rutas: ${JSON.stringify(files.map(f => '/materiales/aisi-316l/aplicaciones/' + f), null, 2)}
`);

console.log('Listo, revisa test-output.txt');

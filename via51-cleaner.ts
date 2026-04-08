import * as fs from 'fs';
import * as path from 'path';

/**
 * VIA51 HOLDING DIGITAL - PROTOCOLO DE PURGA
 * Solo lo definido en la CARTA MAGNA permanece.
 */

const ROOT_DIR = './';
const ALLOWED_FOLDERS = [
    'via51-root',
    'via51-hub',
    'via51-gamma',
    'node_modules',
    '.git',
    '.vscode'
];

const ALLOWED_FILES = [
    'package.json',
    'tsconfig.base.json',
    'scan_report.txt',
    '.gitignore',
    'via51-cleaner.ts' // Este mismo script
];

function purgeDesmonte() {
    console.log("--- INICIANDO PURGA DEL ECOSISTEMA VIA51 ---");

    const items = fs.readdirSync(ROOT_DIR);

    items.forEach(item => {
        const fullPath = path.join(ROOT_DIR, item);
        const isDir = fs.statSync(fullPath).isDirectory();

        if (isDir) {
            if (!ALLOWED_FOLDERS.includes(item)) {
                console.log(`[ELIMINANDO CARPETA RESIDUAL]: ${item}`);
                fs.rmSync(fullPath, { recursive: true, force: true });
            }
        } else {
            if (!ALLOWED_FILES.includes(item)) {
                console.log(`[ELIMINANDO ARCHIVO RESIDUAL]: ${item}`);
                fs.unlinkSync(fullPath);
            }
        }
    });

    cleanResidualJS('./via51-root');
    cleanResidualJS('./via51-hub');
    cleanResidualJS('./via51-gamma');

    console.log("--- PURGA COMPLETADA: HOLDING DIGITAL LIMPIO ---");
}

function cleanResidualJS(dir: string) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            cleanResidualJS(fullPath);
        } else if (file.endsWith('.js') && dir.includes('src')) {
            console.log(`[BORRANDO JS COMPILADO]: ${fullPath}`);
            fs.unlinkSync(fullPath);
        }
    });
}

purgeDesmonte();
import fs from 'fs';
import path from 'path';

export const CitizenSchema = {
    V51_DNA: { id: "SCHEMA-BETA", seq: "S-05" },

    AUTH_COLLABORATOR: {
        logic: (meta: any) => {
            const dbPath = path.resolve('src/database/citizens.json');
            const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
            const user = db.users[meta.dni];
            const now = Date.now();

            // Lógica de 3 intentos (Bloqueo 24h)
            let lock = db.lockouts[meta.dni] || { attempts: 0, last: 0 };

            if (lock.attempts >= 3 && now - lock.last < 86400000) {
                return { status: 'LOCKED', msg: "Acceso denegado por 24 horas." };
            }

            if (!user) {
                lock.attempts++;
                lock.last = now;
                db.lockouts[meta.dni] = lock;
                fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

                const msgs = [
                    "DNI no reconocido. Verifique gentilmente sus datos.",
                    "Parece haber un error en el número. Inténtelo de nuevo.",
                    "Último intento fallido. El sistema se cerrará por seguridad."
                ];
                return { status: 'RETRY', msg: msgs[lock.attempts - 1] };
            }

            return { status: 'AUTHORIZED', user };
        }
    }
};
// Actualización en C:\via51-fractal\via51-gamma\src\intel\command.form.ts

public static async emitFromUI(): Promise < void> {
    const title = (document.getElementById('ins_title') as HTMLInputElement).value;
    const body = (document.getElementById('ins_body') as HTMLTextAreaElement).value;
    const priority = (document.getElementById('ins_priority') as HTMLSelectElement).value;

    // EL PUENTE: Enviamos al servidor BETA
    await fetch('http://hub.via51.org:3000/api/v1/instruction/emit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, priority })
});

alert("TRASCIENDE: La orden ha sido enviada al HUB BETA.");
}
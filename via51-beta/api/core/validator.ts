export class CoreValidator {
    public static validate(input: any): boolean {
        // Validacion estructural agnostica
        return !!(input && input.v51_dna && input.payload && input.payload.dni);
    }
}

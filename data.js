const SEGNALI_MASTER = {
    // AUTONOMI (Peso 1.0)
    S001: { nome: "Apnea/Respirazione superficiale", peso: 1.0, zona: "SNC" },
    S002: { nome: "Respirazione profonda/Rilassata", peso: 1.0, zona: "SNC" },
    S003: { nome: "Aumento ammiccamento (Blinking)", peso: 0.8, zona: "SNC" },
    S004: { nome: "Micro-tensioni facciali", peso: 0.9, zona: "SNC" },
    S005: { nome: "Sudorazione/Rossore", peso: 0.9, zona: "SNC" },
    // BASSO CORPO
    S006: { nome: "Piedi verso interlocutore", peso: 0.7, zona: "Gambe" },
    S007: { nome: "Piedi verso uscita", peso: 0.8, zona: "Gambe" },
    S008: { nome: "Solidità plantare", peso: 0.6, zona: "Gambe" },
    S009: { nome: "Gambe incrociate (Sbilanciamento)", peso: 0.7, zona: "Gambe" },
    S010: { nome: "Movimenti ritmici (Kick)", peso: 0.6, zona: "Gambe" },
    // VISO
    S011: { nome: "Contatto visivo prolungato", peso: 0.5, zona: "Viso" },
    S012: { nome: "Eye-blocking", peso: 0.6, zona: "Viso" },
    S013: { nome: "Compressione labiale", peso: 0.8, zona: "Viso" },
    S014: { nome: "Asimmetria (Disprezzo)", peso: 0.7, zona: "Viso" },
    S015: { nome: "Dilatazione narici", peso: 0.8, zona: "Viso" },
    // TRONCO
    S016: { nome: "Braccia incrociate serrate", peso: 0.6, zona: "Tronco" },
    S017: { nome: "Ventral Denial (Busto ruotato)", peso: 0.8, zona: "Tronco" },
    S018: { nome: "Innalzamento spalle", peso: 0.7, zona: "Tronco" },
    S019: { nome: "Espansione toracica", peso: 0.7, zona: "Tronco" },
    S020: { nome: "Inclinazione avanti", peso: 0.6, zona: "Tronco" },
    // MANI
    S021: { nome: "Self-soothing (Collo/Viso)", peso: 0.6, zona: "Mani" },
    S022: { nome: "Mani nascoste", peso: 0.6, zona: "Mani" },
    S023: { nome: "Manipolazione oggetti", peso: 0.5, zona: "Mani" },
    S024: { nome: "Palmi visibili", peso: 0.6, zona: "Mani" },
    S025: { nome: "Gesti illustratori", peso: 0.5, zona: "Mani" },
    // VERBALE
    S026: { nome: "Latenza risposta", peso: 0.5, zona: "Voce" },
    S027: { nome: "Tono alterato", peso: 0.4, zona: "Voce" },
    S028: { nome: "Interruzioni", peso: 0.4, zona: "Voce" },
    S029: { nome: "Linguaggio distanziante", peso: 0.3, zona: "Voce" },
    S030: { nome: "Ambiguità verbale", peso: 0.3, zona: "Voce" }
};

const CONTESTI = {
    FORMALE: { moltiplicatore: 1.2, focus: ["C", "D"] },
    INFORMALE: { moltiplicatore: 0.8, focus: ["B", "E"] },
    NEGOZIALE: { moltiplicatore: 1.5, focus: ["A", "D", "E"] },
    CONFLITTUALE: { moltiplicatore: 1.3, focus: ["A", "C", "E"] }
};

const PATTERN_LIBRARY = [
    { nome: "Stress Acuto", cluster: "A", segnali: ["S001", "S004", "S021"], direzione: "fuga" },
    { nome: "Negazione", cluster: "A", segnali: ["S012", "S017", "S026"], direzione: "fuga" },
    { nome: "Interesse Autentico", cluster: "B", segnali: ["S002", "S006", "S020", "S024"], direzione: "apertura" },
    { nome: "Dipendenza Emotiva", cluster: "B", segnali: ["S011", "S012", "S023", "S029"], direzione: "fuga" },
    { nome: "Dominanza Aggressiva", cluster: "C", segnali: ["S013", "S015", "S019", "S028"], direzione: "controllo" },
    { nome: "Inganno Strutturato", cluster: "D", segnali: ["S001", "S011", "S029", "S030"], direzione: "controllo" },
    { nome: "Autosabotaggio", cluster: "D", segnali: ["S004", "S014", "S021", "S027"], direzione: "fuga" },
    { nome: "Coping Attivo", cluster: "E", segnali: ["S002", "S008", "S013", "S020"], direzione: "approccio" }
    // Nota: aggiungi qui gli altri pattern seguendo lo schema
];

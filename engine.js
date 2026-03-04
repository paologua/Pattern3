function calcolaAnalisiCompleta(segnaliUtente, contestoKey = "FORMALE") {
    let risultati = [];
    let vettori = { apertura: 0, fuga: 0, controllo: 0, approccio: 0 };
    // Calcolo forza canali per incongruenza
    let canali = { NV: 0, PV: 0, V: 0 }; 
    const ctx = CONTESTI[contestoKey];

    segnaliUtente.forEach(sID => {
        const s = SEGNALI_MASTER[sID];
        if (["SNC", "Gambe", "Viso", "Tronco", "Mani"].includes(s.zona)) canali.NV += s.peso;
        else if (s.zona === "Voce") canali.PV += s.peso;
        // In un sistema avanzato, il Verbale (V) verrebbe inserito come testo, 
        // qui lo simuliamo con la latenza e l'ambiguità (S026-S030)
    });

    PATTERN_LIBRARY.forEach(pattern => {
        let score = 0;
        let max = 0;
        pattern.segnali.forEach(sID => {
            const peso = SEGNALI_MASTER[sID].peso;
            max += peso;
            if (segnaliUtente.includes(sID)) score += peso;
        });

        let prob = (score / max) * 100;
        if (ctx.focus.includes(pattern.cluster)) prob *= ctx.moltiplicatore;

        if (prob > 20) {
            risultati.push({ nome: pattern.nome, prob: Math.min(Math.round(prob), 100), direzione: pattern.direzione });
            vettori[pattern.direzione] += prob;
        }
    });

    risultati.sort((a, b) => b.prob - a.prob);
    const dominante = Object.keys(vettori).reduce((a, b) => vettori[a] > vettori[b] ? a : b);

    return {
        top: risultati.slice(0, 3),
        direzione: dominante,
        intensita: vettori[dominante] > 80 ? "DOMINANTE" : vettori[dominante] > 40 ? "ATTIVA" : "TENDENZA",
        consiglio: generaSuggerimento(dominante),
        canali: canali,
        incongruenza: Math.abs(canali.NV - canali.PV) > 1.5 // Soglia di allerta
    };
}
// ... mantieni generaSuggerimento() ...

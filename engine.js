function calcolaAnalisi(segnaliUtente) {
    let risultati = [];
    let vettoriDirezione = { apertura: 0, fuga: 0, controllo: 0, approccio: 0 };

    PATTERN_LIBRARY.forEach(pattern => {
        let scoreOttenuto = 0;
        let maxScore = 0;

        pattern.segnali.forEach(sID => {
            const peso = SEGNALI_MASTER[sID].peso;
            maxScore += peso;
            if (segnaliUtente.includes(sID)) {
                scoreOttenuto += peso;
            }
        });

        let probabilita = (scoreOttenuto / maxScore) * 100;

        if (probabilita > 25) {
            risultati.push({
                nome: pattern.nome,
                cluster: pattern.cluster,
                prob: Math.round(probabilita),
                direzione: pattern.direzione
            });
            vettoriDirezione[pattern.direzione] += probabilita;
        }
    });

    // Ordina per probabilità
    risultati.sort((a, b) => b.prob - a.prob);

    // Determina direzione dominante
    const dominante = Object.keys(vettoriDirezione).reduce((a, b) => 
        vettoriDirezione[a] > vettoriDirezione[b] ? a : b
    );

    return {
        topPatterns: risultati.slice(0, 3),
        direzionePrevalente: dominante,
        intensita: calcolaIntensita(vettoriDirezione[dominante])
    };
}

function calcolaIntensita(punti) {
    if (punti > 80) return "DOMINANTE";
    if (punti > 50) return "FORTE";
    return "TENDENZA";
}
// Funzione per resettare tutti i segnali (Torna alla Baseline)
function resetBaseline() {
    return []; // Restituisce un array vuoto per resettare lo stato
}

// Genera un oggetto JSON pronto per l'export
function generaExport(segnaliAttivi, analisi) {
    return {
        session_id: Date.now(),
        timestamp: new Date().toLocaleString(),
        segnali_rilevati: segnaliAttivi,
        risultato_dominante: analisi.topPatterns[0] || null,
        direzione: analisi.direzionePrevalente,
        intensita: analisi.intensita
    };
}

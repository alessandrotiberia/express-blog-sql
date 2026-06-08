
// Il primo parametro rappresenta l'oggetto errore passato dall'applicazione
function errorsHandler(error, request, response, next) {
    // Stampiamo l'errore nel terminale del server per il debugging dello sviluppatore
    console.error("Errore interno del server:", error.stack);

    // Rispondiamo al client con uno status 500 (Internal Server Error)
    response.status(500).json({
        error: "Internal Server Error",
        message: "Si è verificato un errore interno nel server. Riprova più tardi."
    });
}

export default errorsHandler;
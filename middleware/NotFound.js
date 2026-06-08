
// Questo middleware non riceve un errore, ma viene eseguito se nessuna rotta precedente ha risposto
function notFound(request, response, next) {
    // Impostiamo lo status 404 (Not Found) e restituiamo un oggetto JSON di errore
    response.status(404).json({
        error: "Not Found",
        message: "La rotta richiesta non esiste su questo server."
    });
}

export default notFound;
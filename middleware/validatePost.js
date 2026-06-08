// Questo middleware verifica che i dati inviati nel body siano corretti prima di arrivare al controller
function validatePost(request, response, next) {
    const { title, content, tags } = request.body || {};

    // Validazione del campo titolo
    if (!title || title.trim() === '') {
        response.status(400).json({
            error: "Validazione fallita",
            results: "Il campo 'titolo' è obbligatorio e non può essere vuoto."
        });
        return; // Blocchiamo la catena, non chiamiamo next()
    }

    // Validazione del campo contenuto
    if (!content || content.trim() === '') {
        response.status(400).json({
            error: "Validazione fallita",
            results: "Il campo 'contenuto' è obbligatorio e non può essere vuoto."
        });
        return; // Blocchiamo la catena
    }

    // Validazione facoltativa dei tag
    if (tags && !Array.isArray(tags)) {
        response.status(400).json({
            error: "Validazione fallita",
            results: "Il campo 'tags' deve essere una lista (Array)."
        });
        return;
    }

    // Se tutti i controlli passano, chiamiamo next() per passare la mano al controller successivo
    next();
}

export default validatePost;
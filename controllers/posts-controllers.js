import posts from '../imgs/posts/posts.js';

//status 200 è corretto manda posts formato json
// read index visualizza tutti gli elementi
function index(request, response) {
    response.status(200).json(posts);
}

//read show visualizza singolo elemento
function show(request, response) {
    //prendo id
    const { id } = request.params;

    const idOk = Number(id.trim());

    if (isNaN(idOk) || idOk <= 0) {
        response.status(400)
            .json({
                error: "id non trovato",
                results: "id non corrisponde al posts"
            });
        return;
    }

    const postsFiltered = posts.find((postOk) => postOk.id === idOk);

    if (postsFiltered != undefined) {
        response.status(200)
            .json({
                error: null,
                results: postOk
            });
    } else {
        response.status(404)
            .json({
                error: "id not found",
                results: null
            });
    }
}

function destroy(request, response) {
    const { id } = request.params;

    const idOk = Number(id.trim());

    if (isNaN(idOk) || idOk <= 0) {
        response.status(400).json({
            error: "Parametro id non corretto",
            results: "L'id inserito non è un numero valido"
        });
        return;
    }
    const indexPost = posts.findIndex((postOk) => postOk.id === idOk);

    // 5. Controllo se il post esiste davvero
    if (indexPost === -1) {
        // Se l'indice è -1, il post non c'è. Restituisco 404 (Not Found).
        response.status(404).json({
            error: "Post non trovato",
            results: null
        });
        return;
    }
    posts.splice(indexPost, 1);
    console.log("Post eliminato con successo. Ecco la lista dei post aggiornata:");
    console.log(posts);

    //risposta postman 
    response.sendStatus(204);
}


function store(request, response) {

    const { title, content } = request.body || {};
    // se manca titolo o è stringa vuota
    if (!title || title.trim() === '') {
        response.status(400)
            .json({
                error: "validazione fallita",
                results: ' inserire campo titolo corretto'
            });
        return;
    }

    if (!content || title.trim() === '') {
        response.status(400).json({
            error: "Validazione fallita",
            results: "Il campo 'contenuto' è obbligatorio."
        });
        return;
    }

    let newId = 1;
    if (posts.length > 0) {
        const ultimoPost = posts[posts.length - 1]; //
        newId = ultimoPost.id + 1;
    }

    const newPost = {
        id: newId,
        title: title,
        content: content
    };

    posts.push(newPost);

    console.log("nuovo post aggiunto :", posts);

    response.status(201)
        .json({
            error: null,
            results: newPost
        });

}

function update(request, response) {
    const { id } = request.params;
    const idOk = Number(id.trim());

    if (isNaN(idOk) || idOk <= 0) {
        response.status(400).json({
            error: "id non corretto",
            results: "id inserito non valido"
        });
        return;
    }
    const postDaModificare = posts.find((postSingolo) => postSingolo.id === idOk);

    if (postDaModificare === undefined) {
        response.status(404).json({
            error: "Post non trovato",
            results: "Non esiste nessun post con l'id specificato"
        });
        return;
    }


    const { title, content } = request.body || {};

    // 4. Validiamo i nuovi dati
    if (!title || title.trim() === "") {
        response.status(400).json({
            error: "Validazione fallita",
            results: "Il campo 'titolo' è obbligatorio."
        });
        return;
    }

    if (!content || content.trim() === "") {
        response.status(400).json({
            error: "Validazione fallita",
            results: "Il campo 'contenuto' è obbligatorio."
        });
        return;
    }


    postDaModificare.title = title;
    postDaModificare.content = content;

    console.log(`Post con id ${idOk} aggiornato con successo. Ecco la lista:`);
    console.log(posts);


    response.status(200).json({
        error: null,
        results: postDaModificare
    });
}

export {
    index,
    show,
    destroy,
    store,
    update
}

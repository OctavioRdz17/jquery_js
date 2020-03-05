
async function load() {

    async function getData(url) {
        const response = await fetch(url)
        const data = await response.json()
        return data;
    }
    const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
    const dramaList = await getData('https://yts.mx/api/v2/list_movies.json?genre=drama')
    const animationList = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation')

    //se crea la funcion para remplazar de texto
    function videoItemTemplate(movie) {
        return (`<div class="primaryPlaylistItem">
    <div class="primaryPlaylistItem-image">
    <img src="${movie.medium_cover_image}">
    </div>
    <h4 class="primaryPlaylistItem-title">
    ${movie.title}
    </h4>
    </div>`)
    }
    //selectores de las container de las categorias
    const $actionContainer = document.querySelector('#action');
    const $dramaContainer = document.getElementById('drama');
    const $animationContainer = document.getElementById('animation');

    renderMovieList(actionList,$actionContainer);
    renderMovieList(dramaList,$dramaContainer);
    renderMovieList(animationList,$animationContainer);

  

    function renderMovieList(list,$container) {
        $container.children[0].remove();

        //con este foreach se recorre cada una de los items de la array de promesa
        list.data.movies.forEach((movie) => {
            const HTMLString = videoItemTemplate(movie)
            const movieElement = createTemplate(HTMLString)
            $container.append(movieElement)
            //addEventClick(movieElement);
        })
    }

    //en esta funcion se crea una constante que guarda un pedazo de html
    //despues se le asigna el string a modificar y repetir
    //despues retorna el string en html pero removiendo el html y el body
    function createTemplate(HTMLString) {
        const html = document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLString
        return html.body.children[0]
    }



    const $featuringContainer = document.getElementById('#featuring');
    const $form = document.getElementById('#form');
    const $home = document.getElementById('#home');

    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');

    const modalImage = $modal.querySelector('img');
    const modalTitle = $modal.querySelector('h1');
    const modalDescription = $modal.querySelector('p');

}
load();



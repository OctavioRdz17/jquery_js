
async function load() {

    //esta es la magia de las promesas
    async function getData(url) {
        const response = await fetch(url)
        const data = await response.json()
        return data;
    }


    const $featuringContainer = document.getElementById('featuring');
    const BASE_API = 'https://yts.mx/api/v2/'

    function featuringTemplate(peli) {
        return (`
        <div class="featuring">
        <div class="featuring-image">
        <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
        <p class="featuring-title">Pelicula encontrada</p>
        <p class="featuring-album">${peli.title}</p>
        </div>
        </div>
        `)
    }
    function addAttributes($element, attributes) {
        for (const attribute in attributes) {
            $element.setAttribute(attribute, attributes[attribute]);
        }
    }

    const $form = document.getElementById('form');
    $form.addEventListener('submit', async (event) => {
        // debugger
        event.preventDefault();
        $home.classList.add('search-active')
        const $loader = document.createElement('img');
        addAttributes($loader, {
            src: 'src/images/loader.gif',
            height: 50,
            width: 50,
        })
        $featuringContainer.append($loader)
        const data = new FormData($form);
        try {
            const { data: { movies: pelis } } = await getData(`${BASE_API}list_movies.json?Limit=1&query_term=${data.get('name')}`)
            const HTMLString = featuringTemplate(pelis[0])
            $featuringContainer.innerHTML = HTMLString
        } catch (error) {
            // debugger
            $loader.remove();
            $home.classList.remove('search-active');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No encontramos tu pelicula!'
            })
        }
    })


    //se crea la funcion para remplazar de texto
    function videoItemTemplate(movie, category) {
        return (`<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
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

    async function cacheExist(category) {
        const listName = `${category}List`
        const cacheList = window.localStorage.getItem(listName)
        if (cacheList) {
            return JSON.parse(cacheList);
        } else {
            const { data: { movies: data } } = await getData(`${BASE_API}list_movies.json?genre=${category}`);
            localStorage.setItem(listName,JSON.stringify(data))
            return data;
        }
    }

    const actionList = await cacheExist('action')
    renderMovieList(actionList, $actionContainer, 'action');

    const dramaList = await cacheExist('drama')
    renderMovieList(dramaList, $dramaContainer, 'drama');

    const animationList = await cacheExist('animation')
    renderMovieList(animationList, $animationContainer, 'animation');


    function addEventClick($element) {
        return $element.addEventListener('click', () => showModal($element))
    }

    function renderMovieList(list, $container, category) {
        $container.children[0].remove();
        //con este foreach se recorre cada una de los items de la array de promesa
        list.forEach((movie) => {
            const HTMLString = videoItemTemplate(movie, category)
            const movieElement = createTemplate(HTMLString)
            $container.append(movieElement);
            const image = movieElement.querySelector('img')
            image.addEventListener('load', (event) => {
                event.srcElement.classList.add('fadeIn')
            })
            addEventClick(movieElement);
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

    const $home = document.getElementById('home');

    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');

    const $modalImage = $modal.querySelector('img');
    const $modalTitle = $modal.querySelector('h1');
    const $modalDescription = $modal.querySelector('p');

    function findByID(list, id) {
        return list.find(movie => movie.id === parseInt(id, 10))
    }

    function findMovie(id, category) {
        switch (category) {
            case 'action':
                return findByID(actionList, id)
                break;
            case 'drama':
                return findByID(dramaList, id)
                break;
            default:
                return findByID(animationList, id)
                break;
        }
    }

    function showModal($element) {
        $overlay.classList.add('active')
        $modal.style.animation = 'modalIn .8s forwards'
        const id = $element.dataset.id
        const category = $element.dataset.category
        const data = findMovie(id, category)
        $modalImage.setAttribute('src', data.medium_cover_image);
        $modalTitle.textContent = data.title;
        $modalDescription.textContent = data.description_full;
    }

    $hideModal.addEventListener('click', hideModal)

    function hideModal() {
        $overlay.classList.remove('active')
        $modal.style.animation = 'modalOut .8s forwards';
    }


}
load();



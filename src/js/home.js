// console.log('hola mundo!');

const noCambia = "leonidas"
let cambia = '@octavio17'
function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

const getUser3 = new Promise((todoBien, todoMal) => {
  //llamar a un api
  setTimeout(() => {
    //funcion
    todoBien('timer 3 seg')
  }, 3000)
  // todoMal()
})
const getUser5 = new Promise((todoBien, todoMal) => {
  //llamar a un api
  setTimeout(() => {
    //funcion
    todoBien('timer 5 seg')
  }, 5000)
  // todoMal()
});


// getUser
//   .then(() => console.log('todo esta bien en la vida'))
//   .catch(() => console.log('Todo salio mal wachin'))


// Promise.race([getUser3,getUser5])
// .then((message)=>console.log(message))
// .catch((message)=>console.log(message))

// $.ajax('https://yts.mx/api/v2/list_movies.json',{
//   method: 'GET',
//   success: (data)=>console.log('USER',data),
//   error: (error)=>console.log(error)
// })



// fetch('https://randomuser.me/api/')
// .then((response)=>{
//   // console.log(response)
//   return response.json()
// })
// .then((data)=>console.log('USER',data))
// .catch(()=>console.log('algo fallo'))

async function load() {
  //await
  //action
  // animacion
  // terror
  async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data;
  }
  const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
  const dramaList = await getData('https://yts.mx/api/v2/list_movies.json?genre=drama')
  const animationList = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation')

  const $actionContainer = document.querySelector('#action');
  const $dramaContainer = document.getElementById('#drama');
  const $animationContainer = document.getElementById('#animation');


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
  //con este foreach se recorre cada una de los items de la array de promesa
  actionList.data.movies.forEach((movie) => {
    const HTMLString = videoItemTemplate(movie)
    //se crea una variable para la implementacion
    const html = document.implementation.createHTMLDocument();
    //se le pasa el valor del string template
    html.body.innerHTML= HTMLString
    //se le indica con html.body.children que solo queremos esa parte del createHTMLDocument
    //con append le indicamos a que selector le vamos a ingresar el codigo
    $actionContainer.append(html.body.children[0])

  });

  // const terrorList = getData('https://yts.mx/api/v2/list_movies.json')
  //   .then((data) => console.log(data))

  //console.log(actionList, dramaList, animationList)

  // //selectores jquery
  // const $home = $('.home .list #item')

  // //vanilla
  // const $home = document.getElementById('modal');//traerlo by id
  // const $home = document.getElementsByClassName('modal')[0]; //traerlo by clas
  // const $home = document.getElementsByTagName('div')[23]; //traerlo con tagname
  // const $home = document.querySelector('.modal'); //primer elemento de la clase
  // const $home = document.querySelectorAll('.modal'); // todos los elementos



  const $featuringContainer = document.getElementById('#featuring');
  const $form = document.getElementById('#form');
  const $home = document.getElementById('#home');

  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hideModal = document.getElementById('hide-modal');

  const modalImage = $modal.querySelector('img');
  const modalTitle = $modal.querySelector('h1');
  const modalDescription = $modal.querySelector('p');


  //Jquery forma
  // '<div class="primaryPlaylistItem">'+
  //     '<div class="primaryPlaylistItem-image">'+
  //         '<img src="src/images/covers/midnight.jpg">'+
  //     '</div>'+
  //     '<h4 class="primaryPlaylistItem-title">'+
  //         'Titulo de la peli'+
  //     '</h4>'+
  // '</div>'


}
load();



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
  // const terrorList = getData('https://yts.mx/api/v2/list_movies.json')
  //   .then((data) => console.log(data))

  console.log(actionList,dramaList,animationList)
  
}
load();



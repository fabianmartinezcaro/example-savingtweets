// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

// Almacenamos todos los tweets en este array
let tweets = [];

// AddeventListeners
eventListeners();

function eventListeners () {
    formulario.addEventListener('submit', agregarTweet);
}

// Funciones 

function agregarTweet(evento){
    evento.preventDefault();
    const tweet = document.createElement('P');
    tweet.textContent = formulario.children[1].value;

    if(!tweet.textContent){
        errorEnvio();
        limpiarAlertaError();
    }else{
        listaTweets.appendChild(tweet);
        tweets = [...tweets, tweet.textContent];
        saveAtLocalStorage(tweets);
    }
    console.log(tweets)
}


function errorEnvio(){
    const mensajeError = document.createElement('P');
    mensajeError.classList.add('error');
    mensajeError.textContent = 'Necesitas escribir un tweet!';

    formulario.appendChild(mensajeError);
}

function limpiarAlertaError(){
    const alerta = document.querySelector('.error');
    if(alerta){
        alerta.remove();
    }
}


function eliminarTweet(){
    console.log('Eliminando tweet');
}

function saveAtLocalStorage(value){
    
    const tweets = JSON.stringify(value);
    localStorage.setItem('tweet',tweets);

}


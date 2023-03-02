// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

// Almacenamos todos los tweets en este array
let tweets = [];

// AddeventListeners
eventListeners();


function eventListeners () {
    formulario.addEventListener('submit', agregarTweet);

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweet')) || [];
        console.log(tweets);
        tweetHTML();
        limpiarHTML()
    })
}


// Funciones 
function agregarTweet(evento){
    evento.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    const tweetObj = {id: Date.now(), tweet};
    limpiarHTML();
    
    if(tweet === ''){
        limpiarAlertaError();
        alertaError('Necesitas escribir un tweet.');
        return;
    }

    tweets = [...tweets, tweetObj];

    // Guardamos los datos en el localStorage

    // Creamos el HTML del tweet
    tweetHTML();

    // Resetear formulario
    formulario.reset();

}


function tweetHTML(){
    if(tweets.length > 0){
        tweets.forEach(tweet => {
            // Boton de eliminar tweet
            const botonEliminar = document.createElement('a');
            botonEliminar.classList.add('borrar-tweet');
            botonEliminar.textContent = 'x';

            botonEliminar.onclick = () => {
                eliminarTweet(tweet.id);
            }

            // LI
            const li = document.createElement('li');
            li.innerText = tweet.tweet;

            listaTweets.appendChild(li);
            li.appendChild(botonEliminar);
            // li.appendChild(eliminarTweet);
        })
    }
    saveAtLocalStorage(tweets);
}

function eliminarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id)
    tweetHTML();
}


function alertaError(error){
    const mensajeError = document.createElement('P');
    mensajeError.classList.add('error');
    mensajeError.textContent = error;

    formulario.appendChild(mensajeError);
}


function limpiarAlertaError(){
    const alerta = document.querySelector('.error');
    if(alerta){
        alerta.remove();
    }
}


function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}


function saveAtLocalStorage(value){
    localStorage.setItem('tweet', JSON.stringify(value));
}


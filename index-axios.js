/**
 * Criar api para carregar 3 paginas e alterar o conteudo, sem reload da pragina 
 * quando nao encontrado mostrar pagina de não encontrado!
 * 
 */

import { Axios } from 'axios'
// const axios = require('axios');

document.addEventListener("click", function (evento) {
    let elemento = evento.target;
    if (elemento.tagName.toLowerCase() === 'a') {
        evento.preventDefault();
        loadPage(elemento)
    }

})


function loadPage(elemento) {
    const link = elemento.getAttribute('href')

    Axios(link)
        .then(response => {
            console.log("aqui");
            if (response.status !== 200) {
                throw new Error;
            }
            let html = response;
            console.log(html.data);
            carregaPagina(html.data)
        }).catch(error => {
            console.log("deu erro:", error);
            carregaNaoEncontrado();
        })


}

function carregaPagina(html) {
    const div = document.querySelector('.conteudo');
    div.innerHTML = html;
}

function carregaNaoEncontrado() {
    const div = document.querySelector('.conteudo');
    Axios('./notFound.html')
        .then(response => {
            console.log(response);
            div.innerHTML = response.data;
        })
        .catch(error => {
            console.error("deu erro: ", error);
        })
}

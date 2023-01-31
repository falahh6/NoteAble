import App from "./App.js";
const root = document.getElementById("app");
const app = new App(root);
const sidebar = document.querySelector('.notes__sidebar');

const hamburger = document.querySelector('.hamburger');
const close = document.querySelector('.close');
hamburger.addEventListener('click', () =>{
    hamburger.classList.toggle('is-active');
    close.classList.toggle('is-active');
    sidebar.classList.toggle('is-active');
})
close.addEventListener('click', () =>{
    hamburger.classList.toggle('is-active');
    close.classList.toggle('is-active');
    sidebar.classList.toggle('is-active');
})
const notesAddBtn = document.querySelector('.notes__add');
notesAddBtn.addEventListener('click',()=>{
    hamburger.classList.toggle('is-active');
    close.classList.toggle('is-active');
    sidebar.classList.remove('is-active');
})

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
  });
  
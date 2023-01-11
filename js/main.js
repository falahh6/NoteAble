import App from "./App.js";

const root = document.getElementById("app");
const app = new App(root);
const sidebar = document.querySelector('.notes__sidebar');

const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', () =>{

    hamburger.classList.toggle('is-active');

    sidebar.classList.toggle('is-active');
})

const notesAddBtn = document.querySelector('.notes__add');
notesAddBtn.addEventListener('click',()=>{
    hamburger.classList.remove('is-active');
    sidebar.classList.remove('is-active');
})
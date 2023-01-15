
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

// const noteList = document.querySelectorAll('.notes__list-item');
// noteList.forEach( note => { 
//     note.addEventListener('click',()=>{
//         hamburger.classList.toggle('is-active');
//         close.classList.toggle('is-active');
//         sidebar.classList.remove('is-active');
//     })
// });


// Save the notes 
// import jsPDF from "jspdf";





// doc.addImage(dataURL, 'PNG', 300, 670, 120, 70);
// var saveBtn = document.getElementById('save__btn');
// saveBtn.addEventListener('click',(event)=>{
//    if(event.target.classList.contains('notes__list-item--selected')){
//     var parent = event.target;
//     console.log(parent);
//    }
//     
// })


var notesLists = document.querySelectorAll('.notes__list-item');
notesLists.forEach(notes => {
    notes.addEventListener('click', (event)=>{
        if(notes.classList.contains('notes__list-item--selected')){
            var notesTitle =  notes.childNodes[1].innerText;
            var notesBody =  notes.childNodes[3].innerText;
            console.log(notesTitle, notesBody);
            var saveBtn = document.getElementById('save__btn');
            saveBtn.addEventListener('click',()=>{
        
                var doc = new jsPDF();
                
                doc.setFont('Times');
                doc.setFontSize(32);
                doc.setFontType('bold');
                doc.text(20,20,notesTitle);
        
                doc.setFont('helvetica');
                doc.setFontSize(18);
                doc.setFontType('normal');
                doc.text(20,40,notesBody);
                doc.save(notesTitle+'.pdf');
                // console.log(notesTitle);
                swal('Your pdf is saved successfully!');
            })
        }
    })
});



'use strict';


let pagina =1;
let array = [1,2,3,4,5,6,7,8,9];

document.addEventListener('DOMContentLoaded',function(){

    cambiarSeccion();
    cambiarTabs();
    cambiarPaginacion();
    volverPaginacion();
    validarPagina();

    console.log("este el numero que falta"+ devuelveNumArr(array));


  
})

function cambiarTabs(){



  if(document.querySelector('.mostrar-seccion')){
    document.querySelector('.mostrar-seccion').classList.remove('mostrar-seccion')
  }
const seccionActual = document.querySelector(`#paso-${pagina}`)
seccionActual.classList.add('mostrar-seccion')



if(document.querySelector('.tab-seleccionado')){
  document.querySelector('.tab-seleccionado').classList.remove('tab-seleccionado')
}
const tabActual = document.querySelector(`[data-paso="${pagina}"]`)
tabActual.classList.add('tab-seleccionado')



}

function cambiarSeccion(){
    
    const enlaces = document.querySelectorAll('.tabs button')
    
    enlaces.forEach(enlace =>{

        enlace.addEventListener('click',function(e){
             
              let elemento;
              if(e.target.tagName == "FONT"){
                elemento = e.target.parentElement.parentElement;
              }else{
                elemento = e.target;
              }
              
              pagina = parseInt(elemento.dataset.paso); 

        

              
             
              
              validarPagina();

              
              


              
             
        })
    });

  
}
function cambiarPaginacion(){

  const button = document.querySelector('#button-siguiente');
  button.addEventListener('click', function(e){ pagina++; validarPagina(); })



}

function volverPaginacion(){

  const button = document.querySelector('#button-anterior');
  button.addEventListener('click', function(e){ pagina--; validarPagina(); })



}


function validarPagina(){

      const button_anterior = document.querySelector('#button-anterior');
      const button_siguiente = document.querySelector('#button-siguiente');


     if(pagina == 1){
      
      button_anterior.classList.add('ocultar');
      button_siguiente.classList.remove('ocultar');

     }else if(pagina == 2){

      button_anterior.classList.remove('ocultar');
      button_siguiente.classList.remove('ocultar')

     }else if(pagina == 3){

      console.log(button_siguiente)

      button_siguiente.classList.add('ocultar')
      button_anterior.classList.remove('ocultar');
      validarCita();
    
     }

     
     cambiarTabs();
     


}


function devuelveNumArr(array_){
    
 let NumeroFaltante; 
 let numero_base = 0; 


   array_.forEach( arr => {
        
      if(arr === numero_base){
         numero_base++;
       }else{
        NumeroFaltante = arr - 1;
        numero_base+= 2;
      }
 } ) 

 if(array_.length === numero_base){ NumeroFaltante = numero_base; }


 return NumeroFaltante;
 
  
}
  
  
  
 

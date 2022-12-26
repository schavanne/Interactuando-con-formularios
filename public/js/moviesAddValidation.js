

window.onload = function(){
    let titulo = document.querySelector('.moviesAddTitulo')
    let form = document.querySelector('form');
    let ul = document.querySelector('.errores');
    let section = document.querySelector('section');
    let article = document.querySelector('article');
    //Campos del form
    let title = document.querySelector('#title');
    let awards = document.querySelector('#awards');
    let rating = document.querySelector('#rating');
    let length = document.querySelector('#length');
    let release_date = document.querySelector('#release_date');
    let genre_id = document.querySelector('#genre_id');
    let errores = [];

    let errorRelease = "La fecha debe ser un formato valido dd-mm-aaaa";
    let errorTitle = "Titulo es requerido";
    let errorLength = "La duracion debe ser entre 60 y 360";
    let errorAwards = "Premios debe ser un numero entero entre 0 - 10";
    let errorRating = "Calificacion debe ser un numero entero entre 0 - 10";

    titulo.innerHTML = 'AGREGAR PELÍCULA';
    titulo.classList.add('titulo');
    article.classList.add('fondoTransparente');
    section.classList.add('fondoCRUD');

    let regex_date = /([0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2})/;
    let regex_awards = /([0-9]{1}|[0-9]{2})/;
    title.focus();
//------DESDE AQUÍ CONTINÚE CON LAS VALIDACIONES DEL FORMULARIO //
//-------------------DE REGISTRO DE PELÍCULAS------------------//  

    title.addEventListener("blur",()=>{
       if(title.value.length > 0){
        title.classList.add("is-valid");
        title.classList.remove("is-invalid");

       } 
       else{
        if(!errores.includes(errorTitle)){
            errores.push(errorTitle);
        }
        title.classList.add("is-invalid");
        title.classList.remove("is-valid");
       }
    });
    awards.addEventListener("blur",()=>{
       if(parseInt(awards.value) > 0 && parseInt(awards.value) < 11 && regex_awards.test(awards.value) == true){
        awards.classList.add("is-valid")
        awards.classList.remove("is-invalid");
       } 
       else{
        if(!errores.includes(errorAwards)){
            errores.push(errorAwards);
        }
        awards.classList.add("is-invalid")
        awards.classList.remove("is-valid");
       }
    });
    rating.addEventListener("blur",()=>{
       if(parseInt(rating.value) > 0 && parseInt(rating.value) < 11 && regex_awards.test(rating.value)){
        rating.classList.add("is-valid");
        rating.classList.remove("is-invalid");
       } 
       else{
        if(!errores.includes(errorRating)){
            errores.push(errorRating);
        }
        rating.classList.add("is-invalid");
        rating.classList.remove("is-valid");
       }
    });
    length.addEventListener("blur",()=>{
       if(regex_awards.test(length.value) && parseInt(length.value) > 59 && parseInt(length.value) < 361){
        length.classList.add("is-valid");
        length.classList.remove("is-invalid");
       } 
       else{
        if(!errores.includes(errorLength)){
            errores.push(errorLength);
        }
        length.classList.add("is-invalid");
        length.classList.remove("is-valid");
       }
    });
    release_date.addEventListener("blur",()=>{
        if(regex_date.test(release_date.value)){
         release_date.classList.add("is-valid");
         release_date.classList.remove("is-invalid");
        } 
        else{
            if(!errores.includes(errorRelease)){
                errores.push(errorRelease);
            }
         release_date.classList.add("is-invalid");
         release_date.classList.remove("is-valid");
        }
     });

    form.addEventListener("submit",(event)=>{
        event.preventDefault();
        let elementos = form.elements;
        elementos = Array.from(elementos);
        elementos.forEach(campo => {
            //es un select
            if(campo.classList.contains("botonAgregar")){}
            else if(campo.classList.contains("genre_id")){
                let opcion = campo.options[campo.selectedIndex]; 
                if(opcion.value == ""){
                    campo.classList.add("is-invalid");
                }
                else{
                    campo.classList.add("is-valid");
                    campo.classList.remove("is-invalid");
                }
            }
            //es un input
            else{
                if(campo.value == null || campo.value.length == 0){
                    campo.classList.add("is-invalid");
                }
                else{
                    campo.classList.add("is-valid");
                    campo.classList.remove("is-invalid");
                }
            }
        });
        console.log(errores);
        ul.innerHTML = "";
        let allInvalid = document.querySelectorAll(".is-invalid");
        allInvalid = Array.from(allInvalid);
        if(allInvalid.length == 0){
            ul.classList.remove("alert-warning");
            form.submit();

        }else{
            errores.forEach((error)=>{
                ul.innerHTML += "<li>"+error+"</li>";
            });
            if(errores.length > 0){
                ul.classList.add("alert-warning");
            }
            errores = [];
        }
    });

}
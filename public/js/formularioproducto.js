
console.log("hola")

let f = document.getElementById("formularioProducto");

f.addEventListener("submit", function(e){

    e.preventDefault();

    let valor = sessionStorage.getItem("valorInput"); 

    let nombre = document.getElementById("name");
    let precio = document.getElementById("price");
    let descuento = document.getElementById("discount");
    let cantidad = document.getElementById("inventory");
    let imagen=document.getElementById("imageproduct");
    
   
    let regexprice= /^[0-9]+$/
    let regeximg= /.(gif|jpeg|jpg|png)$/


    if (nombre.value.length>6){ 
    }
    else{
        alert("Revise nombre");
        console.log(valor);
        return;
    }

    if (regexprice.test(precio.value)){       
       
    }
    else{
        alert("Revise precio");
        console.log(valor);
        return;
    }


    if (regeximg.test(imagen.value)){
        alert("ok");
       f.submit();
    }
    else{
        alert("Verifique que la imagen sea en formato (gif,jpeg,jpg,png) ");
        console.log(valor);
        return;
    }

});
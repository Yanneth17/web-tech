console.log("hola")

let f = document.getElementById("editarproducto");

f.addEventListener("submit", function(e){

    e.preventDefault();

    let valor = sessionStorage.getItem("valorInput"); 

    let nombre = document.getElementById("name");
    let precio = document.getElementById("price");
    let descuento = document.getElementById("discount");
    let cantidad = document.getElementById("inventory");
    
    
   
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
        f.submit();
    }
    else{
        alert("Revise precio");
        console.log(valor);
        return;
    }


});
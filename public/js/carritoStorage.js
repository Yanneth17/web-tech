
window.onload=function(){
 var productosCarrito = [];
 
 var nuevoProducto = new Object();
 nuevoProducto.name = document.getElementById('name').innerText
 nuevoProducto.precio = document.getElementById('precio').innerText
 nuevoProducto.prodImg = document.getElementById('prodImg').src
 nuevoProducto.inventario= document.getElementById('inventario').innerText
 nuevoProducto.qty = 1 

var cartBtn= document.getElementById("cartBtn")

    cartBtn.onclick = function(){
     
       if(JSON.parse(sessionStorage.getItem("pc")) === null ){
           productosCarrito.push(nuevoProducto);
           sessionStorage.setItem('pc',JSON.stringify(productosCarrito))
           window.location.reload();
        }else{
            const array = JSON.parse(sessionStorage.getItem("pc"))
            array.map(data=>{
                if(nuevoProducto.name == data.name){
                    nuevoProducto.qty = data.qty + 1;
                }
                else{
                    productosCarrito.push(data);
                }
            });
            productosCarrito.push(nuevoProducto);
            sessionStorage.setItem('pc',JSON.stringify(productosCarrito))
            window.location.reload();
            

        }



alert("Producto añadido al carro")


    };


};


window.addEventListener("load" ,function(){
   
  let productos = JSON.parse(sessionStorage.getItem("pc"))






//agregando Data desde session
const carro = document.getElementById("carro")
let tabla = '';
if(productos === null ){
    alert("Carrito Vacio.")
    
}else{
productos.map(data=>{
  const precio = data.precio
  .replace("$"  , "")
  .replace("Hoy"  , "")
    tabla += '<tr class"producto-cart"><th scope="row"></th><td class="table__productos" style="display: flex;"><img style="width: 150px !important; object-fit: contain !important; border-radius: 6px !important; margin-right: 20px !important;" src='+data.prodImg+'><h6 style="margin-top:50px;"id="title">'+data.name+'</h6></td><td class="table__precio"><p style="margin-top:50px;">$'+precio+'</p></td><td class="table__cantidad"><input style="margin-top:50px; width: 40px;"type="number" class="cantidad" min="1" max="10" value='+data.qty+'><button style="margin-left: 70px; " class="btn btn-danger" onclick=Delete(this) ">X</button></td></tr>'
});

}



carro.innerHTML = tabla;



  //Valor Total
  let total = 0;
  const carritoTotal = document.querySelector(".carritoTotal")
productos.map(data=>{
const precio = parseInt(data.precio
.replace("$ ", '')
.replace("hoy",""));


total = total + precio*data.qty
})
carritoTotal.innerHTML ="Total: $"+total;








 



});






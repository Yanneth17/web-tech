const multer= require('multer')
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../public/img/users'));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) { 
        console.log(file)       // request, archivo y callback que almacena archivo en destino
     let imageName = 'img' + Date.now() + path.extname(file.originalname) ;   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});
const uploadFile = multer({ storage: storage });

module.exports=uploadFile;


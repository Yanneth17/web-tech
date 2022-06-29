function userslogin (req,res, next){
    if (req.session.login= undefined){
        next()
    }else{
        res.render("no estas logueado")
    }
}

module.exports = userslogin
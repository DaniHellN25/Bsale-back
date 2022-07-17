//Controlamos que solo las peticiones del cliente lleguen a la base de datos
//Tambien se permite peticiones por medio de localhost y por el host de herouku

const validateHeader = async (req, res, next) => {
    console.log(req.headers)
    if(req.headers.origin !== "https://bsale-store-d.vercel.app" && req.headers.host !== 'localhost:3001' && req.headers.host !== 'bsale-store-d.herokuapp.com') return res.status(401).send({msg:'Origin Unauthorized'})
    else return next()
}

module.exports = {
    validateHeader
}
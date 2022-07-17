//Controlamos que solo las peticiones del cliente lleguen a la base de datos
//Tambien se permite peticiones por medio de thunderclient mientras el localhost sea 3001 y por el host de herouku
//para visualizar los JSON

const validateHeader = async (req, res, next) => {
    if(req.headers.origin !== "https://bsale-store-d.vercel.app" && req.headers.host !== 'localhost:3001' && req.headers.host !== 'bsale-store-d.herokuapp.com') return res.status(401).send({msg:'Origin Unauthorized'})
    else return next()
}

module.exports = {
    validateHeader
}
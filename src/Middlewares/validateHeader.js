//Controlamos que solo las peticiones del cliente lleguen a la base de datos

const validateHeader = async (req, res, next) => {
    if(req.headers.origin !== "https://bsale-store-d.vercel.app" ) return res.status(401).send({msg:'Origin Unauthorized'})
    else return next()
}

module.exports = {
    validateHeader
}
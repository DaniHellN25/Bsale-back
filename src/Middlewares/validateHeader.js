//Controlamos que solo las peticiones del cliente lleguen a la base de datos

const validateHeader = async (req, res, next) => {
    console.log(req.header.origin)
    if(req.headers.origin !== "https://bsale-store-d.vercel.app" || req.headers.origin !== process.env.PORT ) return res.status(401).send({msg:'Origin Unauthorized'})
    else return next()
}

module.exports = {
    validateHeader
}
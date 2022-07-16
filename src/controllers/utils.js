// En caso de que el producto no cuente con una imagen
// Esta URL proporciona la imagen del producto no encontrado
const notFound =
  "https://i.postimg.cc/05b4qLH3/stock-vector-picture-vector-icon-no-image-symbol-picture-coming-soon-no-photo-available-missing-imag.jpg";


//Se guarda en una const la query base de casi todas nuestras busquedas
// Asi se evita algun error de typeo  
const basicQuery =
  "SELECT product.id, product.name, product.url_image, product.price, product.discount, category.name as category_type FROM product INNER JOIN category ON product.category = category.id";


 // De acuerdo  a la respuesta de la base de datos 
 //  Se le da un formato más limpio con el campo del precio con el descuento aplicado
 // y la URL en caso de que el producto no cuente con una imagen
const finalResponse = (response) => {
  return response.map((product) => {
    return {
      id: product.id,
      name: product.name,
      image: product.url_image ? product.url_image : notFound,
      price: product.price,
      discount: product.discount,
      priceWithDiscount:
        product.discount > 0
          ? product.price - product.price * (product.discount / 100)
          : "No discount applied",
      category: product.category_type,
    };
  });
};

module.exports = {
  notFound,
  basicQuery,
  finalResponse,
};

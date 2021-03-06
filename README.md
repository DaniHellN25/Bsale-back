# **Bsale Store API**

### Tecnologías:

#### Back-end:
<li>Node.js</li>
<li>Express</li>
<li>mysql</li>

#### Database:
<li>MySQL</li>

## **Importante:**
<ul>

<li>El lenguaje usado para realizar peticiones en la base de datos es MySQL.</li>
<li>Se utlizó el driver "mysql" de node.js para acceder la base de datos.</li>
<li>Las variables de entorno se pusieron en un archivo .env el cual no fue subido al repositorio para mayor seguridad de la base de datos y podrían ser solicitadas directamente al equipo de Bsale.</li>

</ul>

### **API de consumo para la Bsale Store**

Para la construcción del back se utilizó NodeJS y el Framework Express

Esta API esta destinada para el uso exclusivo de nuestro cliente BSale Store y sus desarrolladores para poder consultar las categorías y 

productos existentes a la venta y poder desarrollar y diseñar la parte del [Frontend](https://github.com/DaniHellN25/Bsale-Front) y UX/UI .

Para realizar pruebas mediante una sesión local se hizo uso del Middleware "validateHeader". El cual valida que el header origin sea el correcto

(de acuerdo al dominio del cliente) o que la propiedad **host** del objeto **header** corresponda al puerto **localhost:3001** o al dominio que 

corresponda al deploy del back. En el archivo **app.js** se hizo uso de una **whitelist** para permitir peticiones mediante **live server** y 

de el dominio del cliente. 

La estructura de los JSON que se recibirá en cada endpoint se describirá más adelante; en cada caso se responde con un **array de objetos**. 

Las consultas a la base de datos están protegidas de inyección SQL mediante placeholders y validación de inputs cuando es necesario (de acuerdo 

a la documentación del driver "mysql)". También se crea una connection pool para mejorar el tiempo de respuesta de nuestra app.

Para conocer las categorías disponibles y por filtrar de acuerdo a la que sea necesaria primero deberá hacer un pedido a la ruta [endpoint de categorías](#get-httpsbsale-store-dherokuappcomcategories) para conocer las categorías disponibles y su ID(que será el valor del param necesario para [filtrar por categorías](#get-httpsbsale-store-dherokuappcomproductsid))

---


## **GET**

### [Todos los productos](#get-httpsbsale-store-dherokuappcomproducts)        

<li>https://bsale-store-d.herokuapp.com/products</li>

---

### [Categorías existentes](#get-httpsbsale-store-dherokuappcomcategories)

<li>https://bsale-store-d.herokuapp.com/categories</li>

---

### [Productos por categoría](#get-httpsbsale-store-dherokuappcomproductsid)

<li>https://bsale-store-d.herokuapp.com/products/:id</li>

---

### [Productos ordenados por nombre de la A-Z](#get-httpsbsale-store-dherokuappcomproductsordernameoptionasc)

<li>https://bsale-store-d.herokuapp.com/products/order/name?option=ASC</li>

---

### [Productos ordenados por nombre de la Z-A](#get-httpsbsale-store-dherokuappcomproductsordernameoptiondesc)

<li>https://bsale-store-d.herokuapp.com/products/order/name?option=DESC</li>

---


## **POST** 

### [Buscar productos por nombre(exacto o parcial)](#post-httpsbsale-store-dherokuappcomproducts)

<li>https://bsale-store-d.herokuapp.com/products</li>
 

---



---

## Ejemplos de pedidos y respuestas

## **GET** https://bsale-store-d.herokuapp.com/products

#### Al hacer un pedido en este endpoint la respuesta será un JSON con todos los productos disponibles en la DB con los siguientes datos(los items estarán ordenados de acuerdo al id de su categoría que va del 1 al 7):

<li> id : número identificador del producto(int)</li>

<li> name : nombre del producto(string)</li>

<li> image : url de la imagen del producto(string)</li>

<li> price : precio normal del producto(float)</li>

<li> discount : descuento en porcentaje para aplicar al producto(int)</li>

<li> priceWithDiscount : precio del producto después de aplicar el descuento(float)</li>

<li> category : nombre de la categoría a la que pertenece el producto(string)</li>

### Respuesta:
```
[
  {
    "id": 5,
    "name": "ENERGETICA MR BIG",
    "image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
    "price": 1490,
    "discount": 20,
    "priceWithDiscount": 1192,
    "category": "bebida energetica"
  },
  {
    "id": 6,
    "name": "ENERGETICA RED BULL",
    "image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg",
    "price": 1490,
    "discount": 0,
    "priceWithDiscount": "No discount applied",
    "category": "bebida energetica"
  },
  {
    "id": 7,
    "name": "ENERGETICA SCORE",
    "image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/logo7698.png",
    "price": 1290,
    "discount": 0,
    "priceWithDiscount": "No discount applied",
    "category": "bebida energetica"
  },
  ...
]  
```

---

## **GET** https://bsale-store-d.herokuapp.com/categories

### Al hacer un pedido en este endpoint la respuesta será un JSON de las categorías con los siguientes datos: 

<li> id : número identificador de la categoría(int)</li>

<li> name : nombre de la categoría(string)</li>


### Respuesta:
```
[
  {
    "id": 1,
    "name": "bebida energetica"
  },
  {
    "id": 2,
    "name": "pisco"
  },
  {
    "id": 3,
    "name": "ron"
  },
  {
    "id": 4,
    "name": "bebida"
  },
  {
    "id": 5,
    "name": "snack"
  },
  {
    "id": 6,
    "name": "cerveza"
  },
  {
    "id": 7,
    "name": "vodka"
  }
]
```

---

## **GET** https://bsale-store-d.herokuapp.com/products/:id

### Al agregar el param "id" se filtrarán los productos de acuerdo al id de la categoría(únicamente se aceptan números del 1 al 7; [véase endpoint de categorías](#get-httpsbsale-store-dherokuappcomcategories)).

### Ejemplo de petición: https://bsale-store-d.herokuapp.com/products/1

### Respuesta:
```
[
  {
    "id": 5,
    "name": "ENERGETICA MR BIG",
    "image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
    "price": 1490,
    "discount": 20,
    "priceWithDiscount": 1192,
    "category": "bebida energetica"
  },
  {
    "id": 6,
    "name": "ENERGETICA RED BULL",
    "image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg",
    "price": 1490,
    "discount": 0,
    "priceWithDiscount": "No discount applied",
    "category": "bebida energetica"
  },
  {
    "id": 7,
    "name": "ENERGETICA SCORE",
    "image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/logo7698.png",
    "price": 1290,
    "discount": 0,
    "priceWithDiscount": "No discount applied",
    "category": "bebida energetica"
  },
  {
    "id": 34,
    "name": "ENERGETICA MONSTER RIPPER",
    "image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/mosterriper0436.jpg",
    "price": 1990,
    "discount": 0,
    "priceWithDiscount": "No discount applied",
    "category": "bebida energetica"
  },
  ...
]
```

---

## **GET** https://bsale-store-d.herokuapp.com/products/order/name?option=ASC

### Al agregar el query "option=ASC" se filtrarán los productos de manera alfabéticamente ascendente (A-Z)


### Respuesta:
```
[
  {
    "id": 104,
    "name": "ABSOLUT",
    "image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/absolut21381.png",
    "price": 8990,
    "discount": 30,
    "priceWithDiscount": 6293,
    "category": "vodka"
  },
  {
    "id": 68,
    "name": "Bebida Sprite 1 Lt",
    "image": "https://i.postimg.cc/05b4qLH3/stock-vector-picture-vector-icon-no-image-symbol-picture-coming-soon-no-photo-available-missing-imag.jpg",
    "price": 1250,
    "discount": 10,
    "priceWithDiscount": 1125,
    "category": "bebida"
  },
  {
    "id": 98,
    "name": "Cerveza Escudo Normal LATA 350CC",
    "image": "https://i.postimg.cc/05b4qLH3/stock-vector-picture-vector-icon-no-image-symbol-picture-coming-soon-no-photo-available-missing-imag.jpg",
    "price": 600,
    "discount": 0,
    "priceWithDiscount": "No discount applied",
    "category": "cerveza"
  },
  {
    "id": 99,
    "name": "Cerveza Escudo Sin Filtrar LATA 350CC",
    "image": "https://i.postimg.cc/05b4qLH3/stock-vector-picture-vector-icon-no-image-symbol-picture-coming-soon-no-photo-available-missing-imag.jpg",
    "price": 800,
    "discount": 0,
    "priceWithDiscount": "No discount applied",
    "category": "cerveza"
  },
  ...
]
```

---

## **GET** https://bsale-store-d.herokuapp.com/products/order/name?option=DESC

### Al agregar el query "option=DESC" se filtrarán los productos de manera alfabéticamente descendente (Z-A).


### Respuesta:
```
[
  {
    "id": 50,
    "name": "SPRITE 2 Lt",
    "image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/sprite-2lt4365.jpg",
    "price": 1800,
    "discount": 0,
    "priceWithDiscount": "No discount applied",
    "category": "bebida"
  },
  {
    "id": 48,
    "name": "SPRITE 1 1/2 Lts",
    "image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/sprite-lata-33cl5575.jpg",
    "price": 1500,
    "discount": 0,
    "priceWithDiscount": "No discount applied",
    "category": "bebida"
  },
  {
    "id": 33,
    "name": "RON PAMPERO ANIVERSARIO",
    "image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/ron_pampero_aniversario0311.jpg",
    "price": 20000,
    "discount": 15,
    "priceWithDiscount": 17000,
    "category": "ron"
  },
  {
    "id": 32,
    "name": "RON PAMPERO",
    "image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/pampero-especial0296.jpg",
    "price": 5490,
    "discount": 20,
    "priceWithDiscount": 4392,
    "category": "ron"
  },
  ...
]  

```
---

## **POST** https://bsale-store-d.herokuapp.com/products

### Al realizar una petición post y mandar por body un JSON con la siguiente estructura(tomando como ejemplo que se quiera buscar un producto "Sprite"):

```
 {
    "name": "Sprite"
 }   
```
### Se obtendrá una respuesta con los productos que coincidan con la búsqueda (Ya sea que los caracteres se incluyan en el nombre de uno o más productos en el mismo orden o se escriba el nombre exacto del producto)

### Respuesta:
```
[
  {
    "id": 50,
    "name": "SPRITE 2 Lt",
    "image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/sprite-2lt4365.jpg",
    "price": 1800,
    "discount": 0,
    "priceWithDiscount": "No discount applied",
    "category": "bebida"
  }
  ...
]  

```
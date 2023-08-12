/* SIGN UP */

document.addEventListener("DOMContentLoaded", function() {
    let userButtonHeader = document.getElementById("userButtonHeader");
    let signUpId = document.getElementById("signUpId");
    let closeButton = document.getElementsByClassName("close")[0];
    let signUpForm = document.getElementById("signUpForm");
    let userNameElement = document.getElementById("user-name");

    userButtonHeader.onclick = function() {
    signUpId.style.display = "block";
    };

    closeButton.onclick = function() {
    signUpId.style.display = "none";
    };

    signUpForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let usernameInput = document.getElementById("username");
    let emailInput = document.getElementById("email");
    let birthdayInput = document.getElementById("birthday");
    let passwordInput = document.getElementById("password");

    let userData = {
        username: usernameInput.value,
        email: emailInput.value,
        birthday: birthdayInput.value,
        password: passwordInput.value
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    usernameInput.value = "";
    emailInput.value = "";
    birthdayInput.value = "";
    passwordInput.value = "";
    
    userNameElement.textContent = userData.username;

    signUpId.style.display = "none";
    });

    let savedData = localStorage.getItem("userData");

    if (savedData) {
    let userData = JSON.parse(savedData);

    userNameElement.textContent = userData.username;
    }

    let logOutButtom = document.getElementById('logOutButtom');

    logOutButtom.onclick = function() {
    localStorage.removeItem('userData');
    location.reload();
    };

});

/* SHOPPING CART */

const stock = [
    {
        "id": 1,
        "name": "Desktop PC #01",
        "description": "PC Intel Dualcore - 8Gb - SSD",
        "price": 10,
        "img": "../images/stock/equipo_armado-1.jpg"
    },
    {
        "id": 2,
        "name": "Desktop PC #02",
        "description": "PC AMD Ryzen 5 5600X Full Gamer - 16gb - SSD - RTX3050",
        "price": 20,
        "img": "../images/stock/equipo_armado-2.jpg"
    },
    {
        "id": 3,
        "name": "Desktop PC #03",
        "description": "PC Intel Core I7 13700f Full Gamer - 32Gb - SSD - Geforce RTX4060Ti",
        "price": 30,
        "img": "../images/stock/equipo_armado-3.jpg"
    },
    {
        "id": 4,
        "name": "Notebook #04",
        "description": "Notebook ASUS TUF Gaming F15 FX506LHB",
        "price": 40,
        "img": "../images/stock/notebook-1.jpg"
    },
    {
        "id": 5,
        "name": "Notebook #05",
        "description": "Notebook MSI GF63 Thin",
        "price": 50,
        "img": "../images/stock/notebook-2.jpg"
    },
    {
        "id": 6,
        "name": "Notebook #06",
        "description": "Notebook ASUS Zenbook Pro 14 Duo OLED UX8402ZA-M3027W",
        "price": 60,
        "img": "../images/stock/notebook-3.jpg"
    },
    {
        "id": 7,
        "name": "Console #07",
        "description": "Nintendo Switch",
        "price": 70,
        "img": "../images/stock/consolas-1.jpg"
    },
    {
        "id": 8,
        "name": "Console #08",
        "description": "NSony PlayStation 5",
        "price": 80,
        "img": "../images/stock/consolas-2.jpg"
    },
    {
        "id": 9,
        "name": "Console #09",
        "description": "Microsoft Xbox Serie X",
        "price": 90,
        "img": "../images/stock/consolas-3.jpg"
    },
    {
        "id": 10,
        "name": "Peripherals #10",
        "description": "Keyboard - Razer Blackwidow Lite",
        "price": 100,
        "img": "../images/stock/perifericos-1.jpg"
    },
    {
        "id": 11,
        "name": "Peripherals #11",
        "description": "Mouse - Logitech G502 X White",
        "price": 110,
        "img": "../images/stock/perifericos-2.jpg"
    },
    {
        "id": 12,
        "name": "Peripherals #12",
        "description": "Headset - Cooler Master MH650 Gamer",
        "price": 120,
        "img": "../images/stock/perifericos-3.jpg"
    },
    {
        "id": 13,
        "name": "Screen #13",
        "description": "Monitor Viewsonic VX2718-2KPC-MHD",
        "price": 130,
        "img": "../images/stock/monitores-1.jpg"
    },
    {
        "id": 14,
        "name": "Screen #14",
        "description": "Monitor Gigabyte M27Q",
        "price": 140,
        "img": "../images/stock/monitores-2.jpg"
    },
    {
        "id": 15,
        "name": "Screen #15",
        "description": "Monitor Gamer Cooler Master GM34-CW2",
        "price": 150,
        "img": "../images/stock/monitores-3.jpg"
    }
];

const cartButtonHeader = document.getElementById('cartButtonHeader')

const cartCloseButton = document.getElementById('cartCloseButton')

const shoppingCart = document.getElementsByClassName('shoppingCart')[0]

const shoppingCartStyle = document.getElementsByClassName('shoppingCartStyle')[0]


cartButtonHeader.addEventListener('click', () => {
    shoppingCart.classList.toggle('cart-active')
})

cartCloseButton.addEventListener('click', () => {
    shoppingCart.classList.toggle('cart-active')
})

shoppingCart.addEventListener('click', (event) => {
    shoppingCart.classList.toggle('cart-active')
})

shoppingCartStyle.addEventListener('click', (event) => {
    event.stopPropagation() 
})


const contenedorProductos = document.getElementById('contenedorProductos');

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')

const precioTotal = document.getElementById('precioTotal')

const botonFinalizar = document.getElementById('finalizar-compra')


const filtroPrecioMin = document.getElementById('filtroPrecioMin')

const filtroPrecioMax = document.getElementById('filtroPrecioMax')

const botonFiltrar = document.getElementById('botonFiltrar')


let carrito = JSON.parse(localStorage.getItem('stock')) || []


/* Funcion para que se muestren los productos */

    stock.forEach((producto) =>{
    const div = document.createElement('div')
    div.classList.add('product')
    div.innerHTML = ` 
    <img src=${producto.img} alt= ""> 
    <h3>
    ${producto.name}
    </h3>
    <p>
    ${producto.description}
    </p>
    <p>Precio: USD ${producto.price}</p>
    <div>
    <button id="agregar${producto.id}" class="buttonAdd">Add Cart</button>
    </div>       
    `

    contenedorProductos.appendChild(div);
    
    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)

        /* Agregar una notificacion de que se agrego el producto al carrito */

    })
})

botonFiltrar.addEventListener('click', filtrarProductos);

function filtrarProductos() {
    const precioMin = parseFloat(filtroPrecioMin.value);
    const precioMax = parseFloat(filtroPrecioMax.value);

    if (isNaN(precioMin) || isNaN(precioMax) || precioMin >= precioMax) {
    
    /* Agregar una notificacion de que se Pida que ingresen valores validos */
    return;
    }


    contenedorProductos.innerHTML = '';


    const productosFiltrados = stock.filter(producto => {
    const precioProducto = parseFloat(producto.price);
    return precioProducto >= precioMin && precioProducto <= precioMax;
    });


    productosFiltrados.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML = ` 
        <img src=${producto.img} alt="">
        <h3>
        ${producto.name}
        </h3>
        <p>
        ${producto.description}
        </p>
        <p>Precio: USD ${producto.price}</p>
        <div>
        <button id="agregar${producto.id}" class="buttonAdd">Add Cart</button>
        </div>       
    `;

    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`agregar${producto.id}`);

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id);

        /* Agregar una notificacion de que se filtraron correctamente */
    });
    });
}


    const eliminarDelCarrito = (prodId) =>{
        const item = carrito.find((prod) => prod.id === prodId)
        const indice = carrito.indexOf(item)
        carrito.splice(indice, 1)
        actualizarCarrito()
    }

    const agregarAlCarrito = (prodId) => {
    const producto = stockProductos.find((prod) => prod.id === prodId);
    const existe = carrito.find((prod) => prod.id === prodId);

    if (existe) {
        existe.cantidad++;
        actualizarCarrito();
    } else {
        const itemAAgregar = {
            id: producto.id,
            imagen: producto.img,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1,
            descripcion: producto.descripcion,
        };
        carrito.push(itemAAgregar);
    }

    actualizarCarrito();
};
    
        
    const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) =>{
        const div= document.createElement('div')
        div.className=('productoEnCarrito')
        div.innerHTML = `
        <img src=${prod.imagen} alt= "">
        <p>
        ${prod.nombre}
        </p>
        <p>
        Price: USD ${prod.precio}
        </p>
        <p>Quantity: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="trashButton"><img src="../images/shop/borrar.png" alt=""></button>
        `

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    localStorage.setItem('carrito', JSON.stringify(carrito))

    contadorCarrito.innerText = carrito.length

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}
                
/* FUNCION PARA VACIAR EL CARRITO */

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})



// Función para abrir la página de pago en otra pestaña
function abrirPaginaDePago() {
    window.open('pagina-de-pago.html', '_self');
}

// Asignar el comportamiento al botón de Finalizar Compra
let finalizarCompraBtn = document.getElementById('finalizar-compra');

finalizarCompraBtn.onclick = function() {
    let userData = localStorage.getItem('userData');

    if (userData) {
    abrirPaginaDePago();
    } else {
    userButtonHeader.click();
    }
}
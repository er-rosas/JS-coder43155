/* SIGN UP */

document.addEventListener("DOMContentLoaded", function() {

/* Mostrar el menu Sign Up */
    const userButtonHeader = document.getElementById("userButtonHeader");
    const userCloseButton = document.getElementById('userCloseButton');
    const signUp = document.getElementsByClassName('signUp')[0];
    const signUpContent = document.getElementsByClassName('signUpContent')[0]

    userButtonHeader.addEventListener('click', () => {
        signUp.classList.toggle('signUp-active')
    })
    userCloseButton.addEventListener('click', () => {
        signUp.classList.toggle('signUp-active')
    })
    signUp.addEventListener('click', (event) => {
        signUp.classList.toggle('signUp-active')
    })
    signUpContent.addEventListener('click', (event) => {
        event.stopPropagation()
    })

    /* Nombre de usuario en el header */
    const userNameElement = document.getElementById("user-name");
    /* Formulario de registro de usuario */
    const signUpForm = document.getElementById("signUpForm");

    signUpForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const birthdayInput = document.getElementById("birthday");
    const passwordInput = document.getElementById("password");

    const userData = {
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

    signUp.classList.toggle('signUp-active')
    });

    const savedData = localStorage.getItem("userData");

    if (savedData) {
    const userData = JSON.parse(savedData);

    userNameElement.textContent = userData.username;
    }

    const logOutButtom = document.getElementById('logOutButtom');

    logOutButtom.onclick = function() {
    localStorage.removeItem('userData');
    location.reload();
    };

});

/* SHOPPING CART */

document.addEventListener("DOMContentLoaded", function() {

/* Mostrar el menu Shopping cart */
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


// Función para abrir la página de pago en otra pestaña
function abrirPaginaDePago() {
    window.open('pagina-de-pago.html', '_self');
}

// Asignar el comportamiento al botón de Finalizar Compra
let finalizarCompraBtn = document.getElementById('finalizar-compra');

finalizarCompraBtn.onclick = function() {
let userData = localStorage.getItem('userData'); // Obtener el valor guardado en localStorage

if (userData) {
    abrirPaginaDePago();
} else {
    openModalBtn.click(); // Llamar al método 'click' para abrir el modal
}
}

});

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


/* FUNCION ASINCRONICA CON FETCH PARA MOSTRAR LAS CARTAS QUE ESTAN EN EL ARCHIVO JSON */

const mostrarCartas = async() =>{
    const respuesta = await fetch ("../data.json")
    const stock = await respuesta.json()

    stock.forEach((producto) => {
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

            Toastify({
                text: "Successfully Added  ",
                duration: 800,
                className:"libreriaAgregar",
                backgroundColor: "#de600c",
                stopOnFocus: true, // Prevents dismissing of toast on hover
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                style: {
                color: "#fffff",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        })
    })

botonFiltrar.addEventListener('click', filtrarProductos);

function filtrarProductos() {
    const precioMin = parseFloat(filtroPrecioMin.value);
    const precioMax = parseFloat(filtroPrecioMax.value);

    // Validar que los valores sean numéricos y el mínimo sea menor al máximo
    if (isNaN(precioMin) || isNaN(precioMax) || precioMin >= precioMax) {
    
        Toastify({
            text: "Please enter two valid values  ",
            duration: 4000,
            className:"libreriaAgregar",
            backgroundColor: "red",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            style: {
            color: "#fffff",

            },
            onClick: function(){} // Callback after click
        }).showToast();
        return;
    }

    // Limpiar los productos existentes en el contenedor
    contenedorProductos.innerHTML = '';

    // Filtrar los productos por precio
    const productosFiltrados = stock.filter(producto => {
    const precioProducto = parseFloat(producto.price);
    return precioProducto >= precioMin && precioProducto <= precioMax;
    });

    // Mostrar los productos filtrados en pantalla
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

        Toastify({
        text: "Successfully Added  ",
        duration: 800,
        className: "libreriaAgregar",
        backgroundColor: "#de600c",
        stopOnFocus: true,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        style: {
            color: "#fffff",
        },
        onClick: function () {},
        }).showToast();
    });
    });
    }
}

    mostrarCartas()
    
    const eliminarDelCarrito = (prodId) =>{
        const item = carrito.find((prod) => prod.id === prodId)
        const indice = carrito.indexOf(item)
        carrito.splice(indice, 1)
        actualizarCarrito()
    }

    const agregarAlCarrito = (prodId) => {
    fetch("../data.json")
        .then((stockProductos) => stockProductos.json())
        .then((item) => {
        const producto = item.find((prod) => prod.id === prodId);
        const existe = carrito.find((prod) => prod.id === prodId);
        if (existe) {
            existe.cantidad++;
            actualizarCarrito();
        } else {
            const itemAAgregar = {
            id: producto.id,
            imagen: producto.img,
            nombre: producto.nombre,
            price: producto.price,
            cantidad: 1,
            descripcion: producto.descripcion,
            };
            carrito.push(itemAAgregar);
            console.log(carrito);
        }
    
        actualizarCarrito();
        });
    };


    const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) =>{
        const div= document.createElement('div')
        div.className=('cartProducts')
        div.innerHTML = `
        <img src=${prod.imagen} alt= "">
        <p>
        ${prod.nombre}
        </p>
        <p>
        Price: USD ${prod.price}
        </p>
        <p>Quantity: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="trashButton"><img src="../images/shop/borrar.png" alt=""></button>
        `

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    localStorage.setItem('carrito', JSON.stringify(carrito))

    contadorCarrito.innerText = carrito.length

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.price, 0)
}

/* FUNCION PARA VACIAR EL CARRITO */

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})
/* SIGN UP */

document.addEventListener("DOMContentLoaded", function() {

/* Mostrar el menu Sign Up */
    const userButtonHeader = document.getElementById("userButtonHeader");
    const userCloseButton = document.getElementById('userCloseButton');
    const signUp = document.getElementsByClassName('signUp')[0];
    const signUpContent = document.getElementsByClassName('signUpContent')[0];

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
    const userNameElement = document.getElementById("userNameHeader");
    
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

/* SHOPPING CART */

/* Mostrar el menu Shopping cart */
    const cartButtonHeader = document.getElementById('cartButtonHeader');
    const cartCloseButton = document.getElementById('cartCloseButton');
    const shoppingCart = document.getElementsByClassName('shoppingCart')[0];
    const shoppingCartStyle = document.getElementsByClassName('shoppingCartStyle')[0];

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

    /* Asignar el comportamiento al botón de Finalizar Compra */
    const finishPurchaseBtn = document.getElementById('finishPurchaseBtn');

    /* Función para abrir la página de pago en otra pestaña */
    function abrirPaginaDePago() {
        window.open('paymentPage.html', '_self');
    }

    finishPurchaseBtn.onclick = function() {
        const userData = localStorage.getItem('userData'); /* Obtener el valor guardado en localStorage */

        userData ? abrirPaginaDePago() : (cartButtonHeader.click(), userButtonHeader.click());
    }

});

const cartCountHeader = document.getElementById('cartCountHeader');

const cartContainer = document.getElementById('cartContainer');

const stockContainerId = document.getElementById('stockContainerId');

const totalCost = document.getElementById('totalCost');

const clearCartBtn = document.getElementById('clearCartBtn');

const quantity = document.getElementById('quantity');

const filterPriceMin = document.getElementById('filterPriceMin');

const filterPriceMax = document.getElementById('filterPriceMax');

const buttonFilter = document.getElementById('buttonFilter');

let cart = JSON.parse(localStorage.getItem('stock')) || []

/* Funcion async con fetch para mostrar el stock en data.json */
const showStock = async() =>{
    const resp = await fetch ("../data.json")
    const stock = await resp.json()

    stock.forEach((product) => {
        const div = document.createElement('div')
        div.classList.add('product')
        div.innerHTML = `
        <img src=${product.img} alt= "">
        <h3>
            ${product.name}
        </h3>
        <p>
            ${product.description}
        </p>
        <p>Precio: USD ${product.price}</p>
        <div>
            <button id="add${product.id}" class="buttonAdd">Add Cart</button>
        </div>
        `

        stockContainerId.appendChild(div);
        
        const button = document.getElementById(`add${product.id}`)

        button.addEventListener('click', () => {
            addToCart(product.id)

            Toastify({
                text: "Successfully Added",
                duration: 800,
                stopOnFocus: true, // Prevents dismissing of toast on hover
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                style: {
                    color: "#fffff",
                    background: "#de600c",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        })
    })

    buttonFilter.addEventListener('click', filterProducts);

    function filterProducts() {
        const priceMin = parseFloat(filterPriceMin.value);
        const priceMax = parseFloat(filterPriceMax.value);

        // Validar que los valores sean numéricos y el mínimo sea menor al máximo
        if (isNaN(priceMin) || isNaN(priceMax) || priceMin >= priceMax) {
        
            Toastify({
                text: "Please enter two valid values",
                duration: 4000,
                stopOnFocus: true, // Prevents dismissing of toast on hover
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                style: {
                    color: "#fffff",
                    background: "#ff0000",
                },
                onClick: function(){} // Callback after click
            }).showToast();
            return;
        }

        // Limpiar los productos existentes en el contenedor
        stockContainerId.innerHTML = '';

        // Filtrar los productos por precio
        const filteredProducts = stock.filter(product => {
        const productPrice = parseFloat(product.price);
        return productPrice >= priceMin && productPrice <= priceMax;
        });

        // Mostrar los productos filtrados en pantalla
        filteredProducts.forEach(product => {
            const div = document.createElement('div');
            div.classList.add('product');
            div.innerHTML = `
                <img src=${product.img} alt="">
                <h3>
                    ${product.name}
                </h3>
                <p>
                    ${product.description}
                </p>
                <p>Precio: USD ${product.price}</p>
                <div>
                    <button id="add${product.id}" class="buttonAdd">Add Cart</button>
                </div>
            `;

            stockContainerId.appendChild(div);

            const button = document.getElementById(`add${product.id}`);

            button.addEventListener('click', () => {
                addToCart(product.id);

                Toastify({
                text: "Successfully Added",
                duration: 800,
                stopOnFocus: true,
                close: true,
                gravity: "top",
                position: "right",
                style: {
                    color: "#fffff",
                    background: "#de600c",
                },
                onClick: function () {},
                }).showToast();
            });
        });
    }
}

showStock()

const removeFromCart = (prodId) =>{
    const item = cart.find((prod) => prod.id === prodId)
    const indice = cart.indexOf(item)
    cart.splice(indice, 1)
    refreshCart()
}

const addToCart = (prodId) => {
    fetch("../data.json")
        .then((stockProductos) => stockProductos.json())
        .then((item) => {
        const product = item.find((prod) => prod.id === prodId);
        const exists = cart.find((prod) => prod.id === prodId);
        if (exists) {
            exists.quantity++;
            refreshCart();
        } else {
            const itemAdd = {
            id: product.id,
            img: product.img,
            name: product.name,
            price: product.price,
            quantity: 1,
            description: product.description,
            };
            cart.push(itemAdd);
        }

        refreshCart();
    });
};

const refreshCart = () => {
    cartContainer.innerHTML = ""
    cart.forEach((prod) =>{
        const div= document.createElement('div')
        div.className=('cartProducts')
        div.innerHTML = `
        <img src=${prod.img} alt= "">
        <p>
        ${prod.name}
        </p>
        <p>
        Price: USD ${prod.price}
        </p>
        <p>Quantity: <span id="quantity">${prod.quantity}</span></p>
        <button onclick="removeFromCart(${prod.id})" class="trashButton"><img src="../images/shop/borrar.png" alt=""></button>
        `;

        cartContainer.appendChild(div);

        localStorage.setItem('cart', JSON.stringify(cart));

    });

    localStorage.setItem('cart', JSON.stringify(cart));

    cartCountHeader.innerText = cart.length;

    totalCost.innerText = cart.reduce((acc, prod) => acc + prod.quantity * prod.price, 0);
};

/* Vaciar el carrito */
clearCartBtn.addEventListener('click', () => {
    cart.length = 0
    refreshCart()
});
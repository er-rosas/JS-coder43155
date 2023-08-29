const cartPay = JSON.parse(localStorage.getItem("cart"));
const payTotalprice = document.getElementById('payTotalprice');
const finishPayment = document.getElementById('finishPayment');

const showPaidCart = () => {
const showPayCart = document.getElementById('showPayCart');
showPayCart.innerHTML = "";

cartPay.forEach((prod) => {
    const div = document.createElement('div');
    div.className = 'showPayCart';
    div.innerHTML = `
    <img src=${prod.img} alt= "">
    <p>${prod.name}</p>
    <p>Price: USD ${prod.price}</p>
    <p>Quantity: <span id="quantity">${prod.quantity}</span></p>
    `;
    showPayCart.appendChild(div);
});

localStorage.setItem('cart', JSON.stringify(cartPay));

const total = cartPay.reduce((acc, prod) => acc + prod.quantity * prod.price, 0);
payTotalprice.innerText = `${total}`;
};

showPaidCart();

finishPayment.addEventListener('click', () => {
    cart.length = 0;
    localStorage.setItem('cart', JSON.stringify(cart));

    localStorage.setItem('successfullyPurchased', 'true');
    window.open('../index.html', '_self');
});


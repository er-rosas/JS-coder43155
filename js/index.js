window.addEventListener('DOMContentLoaded', function() {
    const successfullyPurchased = localStorage.getItem('successfullyPurchased');
    successfullyPurchased === 'true' && Toastify({
        text: "Successfully purchased",
        duration: 4000,
        stopOnFocus: true,
        close: true,
        gravity: "top",
        position: "center",
        style: {
            color: "#fffff",
            background: "green"
        },
        onClick: function () {},
        }).showToast();
    
        localStorage.removeItem('successfullyPurchased');
});
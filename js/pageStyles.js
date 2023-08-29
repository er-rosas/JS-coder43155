// ESTILOS DE LAS PAGINAS

/* Cuando se scrolle 200 pixeles se le agregara la clase menuFixed al menu */
document.addEventListener("DOMContentLoaded", function() {
    const menu = document.querySelector (".menu");
    let scrolled = false;

    window.addEventListener("scroll", function() {
        if (window.scrollY >= 150 && !scrolled) {
            menu.classList.add("menuFixed");
            scrolled = true;
        } else if (window.scrollY < 150 && scrolled) {
            menu.classList.remove("menuFixed");
            scrolled = false;
        }
    });
});
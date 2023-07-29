console.log("¡¡Bienvenido usuario!!")

console.log("Aquí se muetran la información de nuestros productos.")
class Mercaderia {
    constructor(producto, precioEnDolar, stock) {
        this.producto = producto;
        this.precioEnDolar = precioEnDolar;
        // this.stock = stock; // Tal vez agrego algo para que reste stick
    }
}

mesa = new Mercaderia("Mesa", 30);
silla = new Mercaderia("Silla", 20);
tv = new Mercaderia("Tv", 40);
lampara = new Mercaderia("Lámpara", 10);
escritorio = new Mercaderia("Escritorio", 50);
librero = new Mercaderia("Librero", 25);
sofa = new Mercaderia("Sofá", 60);
cama = new Mercaderia("Cama", 90);
mesaDeNoche = new Mercaderia("Mesa de noche", 18);
armario = new Mercaderia("Armario", 55);

const mercaderia = [];
mercaderia.push(mesa);
mercaderia.push(silla);
mercaderia.push(tv);
mercaderia.push(lampara);
mercaderia.push(escritorio);
mercaderia.push(librero);
mercaderia.push(sofa);
mercaderia.push(cama);
mercaderia.push(mesaDeNoche);
mercaderia.push(armario);

console.log(mercaderia);

function filtrarPorPrecio() {
    const minPrecio = parseFloat(prompt("Ingrese precio mínimo:"));
    const maxPrecio = parseFloat(prompt("Ingrese precio máximo:"));

    const mercaderiasFiltradas = mercaderia.filter((producto) => {
        return producto.precioEnDolar >= minPrecio && producto.precioEnDolar <= maxPrecio;
    });

    console.log(mercaderiasFiltradas);
}

function infoMerc() {
    return console.log(mercaderia)
}

console.log("Comandos de la tienda.")
console.log("comprar() para iniciar su pedido.")
console.log("infoMerc() para la información de la mercadería.")
console.log("repetirComprar() para realizar la actividad de comprar() 5 veces.")
console.log("filtrarPorPrecio() para filtrar la mercadería por su precio deseado.") // Aquí agregue lo de arrays para la segunda pre entrega.
console.log("Este ejemplo solo contempla mercadería de entre 10 y 90 USD rangos más grandes o chicos son irrelevantes.")

class Producto {
    constructor(nombre, precio, impuestos, mesa, silla, tv, lampara, escritorio, librero, sofa, cama, mesaDeNoche, armario) {
        this.nombre = nombre;
        this.precio = precio;
        this.mesa = mesa;
        this.silla = silla;
        this.tv = tv;
        this.lampara = lampara;
        this.escritorio = escritorio;
        this.librero = librero;
        this.sofa = sofa;
        this.cama = cama;
        this.mesaDeNoche = mesaDeNoche;
        this.armario = armario;
        this.impuestos = impuestos;
        this.importeFinal = this.calcularImporteFinal(mesa, silla, tv, lampara, escritorio, librero, sofa, cama, mesaDeNoche, armario);
    }

    calcularImporteFinal(mesa, silla, tv, lampara, escritorio, librero, sofa, cama, mesaDeNoche, armario) {
        let importeFinal = this.precio + this.impuestos;
        
        if (mesa === "si") {
            importeFinal += 30;
        }
        if (silla === "si") {
            importeFinal += 20;
        }
        if (tv === "si") {
            importeFinal += 40;
        }
        if (lampara === "si") {
            importeFinal += 10;
        }
        if (escritorio === "si") {
            importeFinal += 50;
        }
        if (librero === "si") {
            importeFinal += 25;
        }
        if (sofa === "si") {
            importeFinal += 60;
        }
        if (cama === "si") {
            importeFinal += 90;
        }
        if (mesaDeNoche === "si") {
            importeFinal += 18;
        }
        if (armario === "si") {
            importeFinal += 55;
        }
        return importeFinal;
    }
}

function comprar() {
    // Solicitar al usuario los datos del producto
    let nombre = prompt("Ingrese su nombre:");
    let precio = parseFloat(prompt("Ingrese el precio de un producto:"));
    let impuestos = parseFloat(prompt("Ingrese el valor de los impuestos del producto:"));
    let mesa = prompt("¿Desea comprar una mesa? (si/no):");
    let silla = prompt("¿Desea comprar una silla? (si/no):");
    let tv = prompt("¿Desea comprar una TV? (si/no):");
    let lampara = prompt("¿Desea comprar una lampara? (si/no):");
    let escritorio = prompt("¿Desea comprar un escritorio? (si/no):");
    let librero = prompt("¿Desea comprar un librero? (si/no):");
    let sofa = prompt("¿Desea comprar un sofa? (si/no):");
    let cama = prompt("¿Desea comprar una cama? (si/no):");
    let mesaDeNoche = prompt("¿Desea comprar una mesaDeNoche? (si/no):");
    let armario = prompt("¿Desea comprar un armario? (si/no):");
    let dia = prompt("Día de la semana:")

    // Crearamos una nueva instancia de Producto
    let nuevoProducto = new Producto(nombre, precio, impuestos, mesa, silla, tv, lampara, escritorio, librero, sofa, cama, mesaDeNoche, armario, dia);

    // Mostrar el recibo a pagar por el cliente
    console.log("¡¡Recibo a pagar!!");
    console.log(nuevoProducto);

    let descuento = 0;

    switch(dia) {
        case "Lunes":
            console.log("El descuento del Lunes es: 20%");
            descuento = nuevoProducto.importeFinal * 0.2;
            break;
        case "Martes":
            console.log("El descuento del Martes es: 10%");
            descuento = nuevoProducto.importeFinal * 0.1;
            break;
        case "Miercoles":
            console.log("El descuento del Miércoles es: 15%");
            descuento = nuevoProducto.importeFinal * 0.15;
            break;
        case "Jueves":
            console.log("El descuento del Jueves es: 40%");
            descuento = nuevoProducto.importeFinal * 0.4;
            break;
        case "Viernes":
            console.log("El descuento del Viernes es: 25%");
            descuento = nuevoProducto.importeFinal * 0.25;
            break;
        default:
            console.log("El descuento del fin de semana es: 50%");
            descuento = nuevoProducto.importeFinal * 0.5;
            break;
    }

    let importeFinalConDescuento = nuevoProducto.importeFinal - descuento;
    console.log("Importe final: $" + importeFinalConDescuento);
}

function repetirComprar() {
    for (let i = 0; i < 5; i++) {
    comprar();
    }
}
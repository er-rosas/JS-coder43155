console.log("¡¡Bienvenido usuario!!")

console.log("Aquí se muetran la información de nuestros productos.")
class Mercaderia {
    constructor(producto, precioEnDolar, stock) {
        this.producto = producto;
        this.precioEnDolar = precioEnDolar;
        this.stock = stock;
    }
}

mesa = new Mercaderia("Mesa", 30);
silla = new Mercaderia("Silla", 20);
tv = new Mercaderia("Tv", 40);

console.log(mesa,silla,tv);

function infoMerc() {
    return console.log(mesa,silla,tv)
}

console.log("Escriba comprar()  para iniciar su pedido o infoMerc() para la información de la mercaderia.")

class Producto {
    constructor(nombre, precio, impuestos, mesa, silla, tv) {
        this.nombre = nombre;
        this.precio = precio;
        this.impuestos = impuestos;
        this.importeFinal = this.calcularImporteFinal(mesa, silla, tv);
    }

    calcularImporteFinal(mesa, silla, tv) {
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
    let dia = prompt("Día de la semana:")

    // Crearamos una nueva instancia de Producto
    let nuevoProducto = new Producto(nombre, precio, impuestos, mesa, silla, tv, dia);

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
document.addEventListener("DOMContentLoaded", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // Recuperar carrito de localStorage
    const contenedorProductosCarrito = document.getElementById("carrito-productos");
    const mensajeCarritoVacio = document.getElementById("carrito-vacio");
    const totalCarrito = document.getElementById("Total");
    const vaciarCarritoBtn = document.querySelector(".carrito-acciones-vaciar");
    const comprarAhoraBtn = document.querySelector(".carrito-acciones-comprar");
    const contadorCarrito = document.getElementById("numerito");

    // Mostrar productos en el carrito
    const actualizarCarrito = () => {
        contenedorProductosCarrito.innerHTML = "";
        mensajeCarritoVacio.style.display = carrito.length === 0 ? "block" : "none";

        let total = 0;
        carrito.forEach(({ id, titulo, precio, cantidad, imagen }) => {
            const subtotal = precio * cantidad;
            total += subtotal;

            const productoHTML = document.createElement("div");
            productoHTML.classList.add("carrito-producto");
            productoHTML.innerHTML = `
                <img class="carrito-producto-imagen" src="${imagen}" alt="${titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${subtotal}</p>
                </div>
                <button class="carrito-producto-eliminar" data-id="${id}"><i class="bi bi-trash-fill"></i></button>
            `;
            contenedorProductosCarrito.appendChild(productoHTML);
        });

        totalCarrito.textContent = `$${total}`;
        contadorCarrito.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
        configurarBotonesEliminar();
    };

    // Configurar botones "Eliminar"
    const configurarBotonesEliminar = () => {
        const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
        botonesEliminar.forEach((boton) => {
            boton.addEventListener("click", () => {
                const idProducto = boton.dataset.id;
                eliminarProducto(idProducto);
            });
        });
    };

    // Eliminar un producto del carrito
    const eliminarProducto = (idProducto) => {
        carrito = carrito.filter((producto) => producto.id !== idProducto);
        guardarCarrito();
        actualizarCarrito();
    };

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener("click", () => {
        carrito = [];
        guardarCarrito();
        actualizarCarrito();
    });

    // Comprar ahora
    comprarAhoraBtn.addEventListener("click", () => {
        const total = carrito.reduce((acum, item) => acum + item.cantidad * item.precio, 0);
        if (carrito.length > 0) {
            alert(`¿Estás seguro que quieres comprar por un total de $${total}?`);
            carrito = [];
            guardarCarrito();
            actualizarCarrito();
        } else {
            alert("Tu carrito está vacío.");
        }
    });

    // Guardar carrito en localStorage
    const guardarCarrito = () => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    };

    // Inicializar carrito
    const iniciarCarrito = () => {
        actualizarCarrito();
    };

    iniciarCarrito();
});

document.addEventListener("DOMContentLoaded", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // Recuperar carrito de localStorage
    const contenedorProductosCarrito = document.getElementById("carrito-productos");
    const mensajeCarritoVacio = document.getElementById("carrito-vacio");
    const totalCarrito = document.getElementById("Total");
    const vaciarCarritoBtn = document.querySelector(".carrito-acciones-vaciar");
    const comprarAhoraBtn = document.querySelector(".carrito-acciones-comprar");
    const cuadrototal = document.querySelector(".carrito-acciones-total");
    const contadorCarrito = document.getElementById("numerito");
    const mensajeCompra = document.getElementById("carrito-comprado"); // Elemento donde mostrar el mensaje

    // Seleccionamos el enlace del logo para escuchar el clic
    const volverLogin = document.getElementById("vueltaLogin");

    // Evento para borrar el carrito antes de redirigir
    volverLogin.addEventListener("click", (e) => {
        e.preventDefault(); // Evita la redirección inmediata

        // Confirmación antes de borrar el carrito
        const confirmacion = confirm("Si vuelves al login perderas todos los productos de tu carrito, ¿aún deseas volver?");

        if (confirmacion) {
            // Limpiamos el carrito de localStorage
            localStorage.removeItem("carrito"); 

            // Redirigimos al login (index.html)
            window.location.href = "index.html";  // Realiza la redirección a la página de login
        }
    });

    // Mostrar productos en el carrito
    const actualizarCarrito = () => {
        contenedorProductosCarrito.innerHTML = "";
        mensajeCarritoVacio.style.display = carrito.length === 0 ? "block" : "none";
        mensajeCompra.style.display = "none"; // Ocultar el mensaje de compra antes de la compra

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
                <button class="carrito-producto-eliminar" data-id="${id}">
                    <p class="eliminar">Eliminar</p>
                </button>
            `;
            contenedorProductosCarrito.appendChild(productoHTML);
        });

        totalCarrito.textContent = `$${total}`;
        contadorCarrito.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);

        // Mostrar u ocultar los botones según el estado del carrito
        if (carrito.length === 0) {
            // Ocultar los botones y el total si el carrito está vacío
            vaciarCarritoBtn.style.display = "none";
            totalCarrito.style.display = "none";
            comprarAhoraBtn.style.display = "none";
            cuadrototal.style.display = "none";
        } else {
            // Mostrar los botones si hay productos en el carrito
            vaciarCarritoBtn.style.display = "block";
            totalCarrito.style.display = "block";
            comprarAhoraBtn.style.display = "block";
        }

        configurarBotonesEliminar();
    };

    // Configurar botones "Eliminar"
    const configurarBotonesEliminar = () => {
        const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
        botonesEliminar.forEach((boton) => {
            boton.addEventListener("click", () => {
                const idProducto = boton.dataset.id;

                // Confirmación antes de eliminar el producto
                const confirmacion = confirm("¿Estás seguro de que quieres eliminar este producto?");
                if (confirmacion) {
                    eliminarProducto(idProducto);
                }
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
            // Mostrar alerta antes de confirmar la compra
            const confirmarCompra = confirm(`¿Estás seguro que quieres comprar por un total de $${total}?`);

            if (confirmarCompra) {
                // Vaciar el carrito y mostrar solo el mensaje de compra
                carrito = []; // Vaciar el carrito
                guardarCarrito();
                // Ocultar los productos, el total y los botones
                contenedorProductosCarrito.innerHTML = "";
                totalCarrito.innerHTML = ""; // Limpiar el total
                contadorCarrito.innerHTML = "0";
                mensajeCompra.style.display = "block"; // Mostrar el mensaje de compra

                // Ocultar los botones de acciones y el contenedor del total
                vaciarCarritoBtn.style.display = "none"; 
                totalCarrito.style.display = "none"; // Asegurarse de que el total se oculte
                comprarAhoraBtn.style.display = "none"; 
                cuadrototal.style.display = "none"; // Asegurarse de que el cuadro del total se oculte
            }
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

    // Configurar el menú lateral
    const abrirMenu = document.getElementById("open-menu");
    const cerrarMenu = document.getElementById("close-menu");
    const menuLateral = document.querySelector("aside");

    // Evento para abrir el menú lateral
    abrirMenu.addEventListener("click", () => {
        menuLateral.classList.add("menu-activo");
    });

    // Evento para cerrar el menú lateral
    cerrarMenu.addEventListener("click", () => {
        menuLateral.classList.remove("menu-activo");
    });
});

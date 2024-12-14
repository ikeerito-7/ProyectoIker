document.addEventListener("DOMContentLoaded", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // Recuperar carrito de localStorage
    let productos = [];
    const contenedorProductos = document.getElementById("contenedor-productos");
    const contadorCarrito = document.getElementById("numerito");
    const categorias = document.querySelectorAll(".boton-categoria");
    const menuLateral = document.querySelector("aside");
    const abrirMenu = document.getElementById("open-menu");
    const cerrarMenu = document.getElementById("close-menu");

    // Función para cargar productos desde el archivo JSON
    const cargarProductos = async () => {
        try {
            const respuesta = await fetch("./js/productos.json");
            if (!respuesta.ok) throw new Error("No se pudieron cargar los productos");
            productos = await respuesta.json();
            mostrarProductos(productos);
            configurarBotonesAgregar();
            configurarFiltros();
        } catch (error) {
            console.error("Error cargando productos:", error);
        }
    };

    // Mostrar productos en la página principal
    const mostrarProductos = (productos) => {
        contenedorProductos.innerHTML = "";
        productos.forEach(({ id, titulo, precio, imagen }) => {
            contenedorProductos.innerHTML += `
                <div class="producto">
                    <img class="producto-imagen" src="${imagen}" alt="${titulo}">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${titulo}</h3>
                        <p class="producto-precio">$${precio}</p>
                        <button class="producto-agregar" data-id="${id}">Agregar</button>
                    </div>
                </div>
            `;
        });
    };

    // Configurar los botones para agregar productos al carrito
    const configurarBotonesAgregar = () => {
        document.querySelectorAll(".producto-agregar").forEach((boton) => {
            boton.addEventListener("click", () => {
                const idProducto = boton.dataset.id;
                const productoSeleccionado = productos.find((prod) => prod.id === idProducto);
                if (productoSeleccionado) {
                    agregarAlCarrito(productoSeleccionado);
                }
            });
        });
    };

    // Agregar productos al carrito
    const agregarAlCarrito = (producto) => {
        const existente = carrito.find((item) => item.id === producto.id);
        if (existente) {
            existente.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        guardarCarrito();
        actualizarContador();
    };

    // Guardar el carrito en localStorage
    const guardarCarrito = () => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        console.log("Carrito guardado:", carrito); // Verificar en consola
    };

    // Actualizar el contador del carrito
    const actualizarContador = () => {
        const totalProductos = carrito.reduce((acum, item) => acum + item.cantidad, 0);
        contadorCarrito.textContent = totalProductos;
    };

    // Configurar los filtros por categorías
    const configurarFiltros = () => {
        categorias.forEach((boton) => {
            boton.addEventListener("click", () => {
                const categoria = boton.id;
                const filtrados =
                    categoria === "todos"
                        ? productos
                        : productos.filter((item) => item.categoria.id === categoria);

                categorias.forEach((btn) => btn.classList.remove("active"));
                boton.classList.add("active");
                mostrarProductos(filtrados);
                configurarBotonesAgregar();
            });
        });
    };

    // Configurar el menú lateral
    const configurarMenu = () => {
        abrirMenu.addEventListener("click", () => {
            menuLateral.classList.add("menu-activo");
        });
        cerrarMenu.addEventListener("click", () => {
            menuLateral.classList.remove("menu-activo");
        });
    };

    // Inicializar la aplicación
    const iniciar = () => {
        cargarProductos();
        configurarMenu();
        actualizarContador(); // Refrescar el contador al cargar la página
    };

    iniciar();
});

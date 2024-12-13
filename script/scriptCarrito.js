document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.getElementById("contenedor-productos");

    // Cargar productos desde productos.json
    fetch("./js/productos.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo JSON");
            }
            return response.json();
        })
        .then((productos) => {
            mostrarProductos(productos);
        })
        .catch((error) => console.error("Error al cargar los productos:", error));

    // Función para mostrar productos
    function mostrarProductos(productos) {
        productosContainer.innerHTML = ""; // Limpiar contenedor
        productos.forEach((producto) => {
            const productoHTML = `
                     <div class="carrito-producto">
                        <img class="carrito-producto-imagen" src="${carrito-producto-imagen}" alt="${carrito-producto-titulo}">
                        <div class="carrito-producto-titulo">
                            <small>${carrito-producto-titulo}</small>
                            <h3>Portatil 01</h3>
                        </div>
                        <div class="carrito-producto-cantidad">
                            <small>${carrito-producto-cantidad}</small>
                            <p>1</p>
                        </div>
                        <div class="carrito-producto-precio">
                            <small>${carrito-producto-precio}</small>
                            <p>$1000</p>
                        </div>
                        <div class="carrito-producto-subtotal">
                            <small>${carrito-producto-subtotal}</small>
                            <p>$1000</p>
                        </div>
                        <button class="carrito-producto-eliminar"><i class="bi bi-trash-fill"></i></button>
                    </div>

                    <div id="carrito-acciones" class="carrito-acciones">
                        <div class="carrito-acciones-izquierda">
                            <button class="carrito-acciones-vaciar">${carrito-acciones-vaciar}</button>
                        </div>

                        <div class="carrito-acciones-derecha">
                            <div class="carrito-acciones-total">
                                <p>${carrito-acciones-total}</p>
                                <p id="Total">$3000</p>
                            </div>
                            <button class="carrito-acciones-comprar">${carrito-acciones-comprar}</button>
                        </div>
                    </div>
            `;
            productosContainer.innerHTML += productoHTML;
        });
    }
    
});






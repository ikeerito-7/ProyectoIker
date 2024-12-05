document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");
    const nombreInput = document.getElementById("nombre");
    const passwordInput = document.getElementById("password");
    const errorNombre = document.getElementById("error-nombre");
    const errorPassword = document.getElementById("error-password");
    const limpiarButton = document.getElementById("limpiar");


    function validarNombre() {
        const nombre = nombreInput.value.trim();
        const nombreRegex = /^[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ\s]{1,20}$/;

        if (nombre === "") {
            errorNombre.textContent = "Nombre obligatorio.";
            return false;
        } else if (!nombreRegex.test(nombre)) {
            errorNombre.textContent = "Nombre inválido.";
            return false;
        } else if (nombre.length > 20) {
            errorNombre.textContent = "El nombre no puede tener más de 20 caracteres.";
            errorNombre.style.display = "block";
            return false;
        }
        errorNombre.textContent = "";
        return true;
    }


    function validarPassword() {
        const password = passwordInput.value.trim();
        const passwordRegex = /^[a-zA-Z0-9·$%&/()]{8,16}$/;

        if (password === "") {
            errorPassword.textContent = "La contraseña es obligatoria.";
            return false;
        } else if (!passwordRegex.test(password)) {
            errorPassword.textContent = "La contraseña debe tener entre 8 y 16 caracteres y solo puede contener letras, números y los caracteres ·$%&/().";
            return false;
        }
        errorPassword.textContent = "";
        return true;
    }


    limpiarButton.addEventListener("click", () => {
        nombreInput.value = "";
        passwordInput.value = "";
        errorNombre.textContent = "";
        errorPassword.textContent = "";
    });

   
    formulario.addEventListener("submit", (e) => {
        e.preventDefault(); 

        const nombreValido = validarNombre();
        const passwordValido = validarPassword();

        if (nombreValido && passwordValido) {
            window.location.href = "./main.html";
        }
    });

    nombreInput.addEventListener("blur", () => {
        validarNombre(nombreInput.value);
    });

    passwordInput.addEventListener("blur", () => {
        validarPassword(passwordInput.value);
    });
});

//seleccion de elementos en el DOM
let userData = {};
const usuario = document.getElementById('name');
const email = document.getElementById('email');
const pass = document.getElementById('password');
const form = document.getElementById('form');
const parrafo = document.getElementById('warnings')


form.addEventListener("submit", async (e) =>{
    e.preventDefault()
    let warnings = ""
    let validacion = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4 })+$/ 
    let entrar = false 
    parrafo.innerHTML =""
    if(usuario.value.length <6){
        warnings += `El nombre no es valido <br>`
        entrar =true
    }
    if(validacion.test(email.value)){
        warnings += `El email no es valido <br>`
        entrar = true
    }

    if(pass.value.length < 8){
        warnings += `La Contraseña no es valido <br>`
        entrar = true
    }

    if(entrar){
        parrafo.innerHTML = warnings;
        return; 
    }

        //crear datos del usuario
    const userData = {
            nameUser: usuario.value,
            emailUser: email.value,
            password: pass.value
        };
        // enviar los datos al servidor 
        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData) // Convierte el objeto en JSON
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("Usuario creado:", data);
                parrafo.innerHTML = "Usuario creado exitosamente";
            } else {
                console.error("Error al crear el usuario:", response.statusText);
                parrafo.innerHTML = "Hubo un problema al crear el usuario.";
            }
        } catch (error) {
            console.error("Error de red:", error);
            parrafo.innerHTML = "No se pudo conectar con el servidor.";
        }
    });




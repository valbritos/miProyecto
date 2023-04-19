

document.getElementById("btnInicioSesion").addEventListener("click", function() {
    window.location.href = "InicioSesion.html";
  });


/*  CREAR CUENTA  */
if (window.location.pathname.includes("Unete.html")) {


const constraints = {
    nombre: {
      presence: true
    },
    correo: {
      presence: true,
      email: true
    },
    password: {
      presence: true,
    },
  };

  const formulario = document.querySelector('#formulario');
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const datos = {
      nombre: document.querySelector('#nombre').value,
      correo: document.querySelector('#correo').value,
      password: document.querySelector('#password').value
    };
  
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  });
  
  




/*  INICIO DE SESION  */
} else if (window.location.pathname.includes("InicioSesion.html")) /*verifica que estes en el html correcto*/{
$(function() {
  // Validación del formulario con Validate.js
  const constraints = {
    email: {
      presence: true,
      email: true
    },
    password: {
      presence: true,
      length: {
        minimum: 6,
        message: "La contraseña debe tener al menos 6 caracteres"
      }
    }
  };

  const form = document.getElementById('loginForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const errors = validate(form, constraints);
    if (errors) {
      console.log(errors);
    } else {
      console.log('Formulario válido');
      const email = form.email.value;
      const password = form.password.value;
      // Hacer una solicitud GET a la API
      fetch(`               `)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log('Inicio de sesión exitoso');
            window.location.href = '/Bassies.html';
          } else {
            console.log('Error al iniciar sesión');
            console.log(data.message);
          }
        })
        .catch(error => {
          console.log('Error al iniciar sesión');
          console.log(error);
        });
    }
  });
  

});



 }
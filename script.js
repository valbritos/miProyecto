document.getElementById("btnInicioSesion").addEventListener("click", function() {
    window.location.href = "InicioSesion.html";
  });


/*  CREAR CUENTA  */


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
      length: {
        minimum: 6
      }
    },
    confirmPassword: {
      presence: true,
      equality: {
        attribute: "password",
        message: "^Las contraseñas no coinciden"
      }
    }
  };

  const form = document.getElementById("registroForm");

  form.addEventListener("submit", function (event) {
    const errors = validate(form, constraints);

    if (errors) {
      event.preventDefault();
      const errorList = document.getElementById("errorList");
      errorList.innerHTML = "";
      Object.keys(errors).forEach(function (key) {
        errors[key].forEach(function (error) {
          const li = document.createElement("li");
          li.textContent = `${key} ${error}`;
          errorList.appendChild(li);
        });
      });
    }
  });


  $("#formulario").submit(function(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  
    // Obtener los datos del formulario
    var datos = {
      nombre: $("#nombre").val(),
      correo: $("#correo").val(),
      password: $("#password").val(),
      confirm_password: $("#confirm_password").val()
    };
  
    // Enviar los datos mediante una petición HTTP POST
    $.ajax({
      type: "POST",
      url: "/api/crear-cuenta",
      data: datos,
      success: function(response) {
        // La petición fue exitosa
        console.log(response);
      },
      error: function(error) {
        // Hubo un error al enviar la petición
        console.log(error);
      }
    });
  });
  




/*  INICIO DE SESION  */

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
        // Envío del formulario con jQuery
        $.ajax({
          url: '/login',
          type: 'POST',
          data: $(form).serialize(),
          success: function(data) {
            console.log('Inicio de sesión exitoso');
            // Redirigir a la página de inicio
            window.location.href = '/inicio';
          },
          error: function(xhr, status, error) {
            console.log('Error al iniciar sesión');
            console.log(xhr.responseText);
          }
        });
      }
    });
  });
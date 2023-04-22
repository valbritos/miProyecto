document.getElementById("btnInicioSesion").addEventListener("click", function () {
  window.location.href = "InicioSesion.html";
});

/*  Reclamo  */
if (window.location.pathname.includes("Formulario.html")) {

  window.onload = function () {

    var reclamo = document.getElementsByName('reclamo')[0];
    var producto = document.getElementById('producto');

    reclamo.addEventListener('change', function () {
      if (reclamo.value == 'si') {
        producto.style.display = 'block';
      } else {
        producto.style.display = 'none';
      }
    });





    // Define las reglas de validación para cada campo del formulario
    const constraints = {
      nombre: {
        presence: { message: "El nombre es obligatorio" },
        length: {
          minimum: 2,
          message: "El nombre debe tener al menos 2 caracteres",
        },
      },
      correo: {
        presence: { message: "El correo electrónico es obligatorio" },
        email: { message: "Ingresa un correo electrónico válido" },
      },
      reclamo: { presence: { message: "Selecciona si es un reclamo o no" } },
      tel: {
        presence: { message: "El número de teléfono es obligatorio" },
        numericality: { onlyInteger: true, message: "Ingresa un número válido" },
      },
      direction: { presence: { message: "La dirección es obligatoria" } },
    };

    $(document).ready(function () {
      // se define la función que se ejecuta cuando se envía el formulario
      $("#formulario1").submit(function (event) {
        // se evita que se recargue la página
        event.preventDefault();

        // se crean variables para guardar los valores de los campos del formulario
        var nombre = $("#nombre").val();

        var correo = $("#correo").val();

        var reclamo = $("#SioNo").val();
        if (reclamo === "si") {
          reclamo = "Nos contacta por un reclamo de un producto";
        } else {
          reclamo = "No nos contacta por un reclamo de un producto"
        }

        var producto = $("#productoEspecifico option:selected").val();
        if (producto = "") {
          producto = $("#productoEspecifico option:selected").val();
        } else {
          producto = "";
        }


        var tel = $("#tel").val();

        var direccion = $("#direction").val();

        var comentario = $("textarea[name='comentario']").val();
        if (comentario === "") {
          comentario = "No ha dejado un comentario";
        }

        // se crea un objeto que contiene los datos del formulario
        var datos = {
          nombre: nombre,
          correo: correo,
          Reclamo: reclamo,
          producto: producto,
          tel: tel,
          direccion: direccion,
          comentario: comentario
        };

        // se muestra el objeto en la consola
        console.log(datos);
      });
    });








  }

  /*  INICIO DE SESION  */
} else if (window.location.pathname.includes("InicioSesion.html")) /*verifica que estes en el html correcto*/ {

  let usuarios;

  fetch('http://localhost:3000/usuarios')
    .then(response => response.json())
    .then(data => {
      usuarios = data;
    })
    .catch(error => console.error(error));

  document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const usuarioEncontrado = usuarios.find(usuario => usuario.correo === email && usuario.contraseña === password);

    if (usuarioEncontrado) {
      console.log('Iniciando sesión...');
    } else {
      console.error('El correo electrónico o la contraseña son incorrectos');
    }
  });


};

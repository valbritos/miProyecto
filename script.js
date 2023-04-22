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
        length: {
          is: 10,
          message: "El número de teléfono debe tener exactamente 10 caracteres"
        }

      },
      direction: { presence: { message: "La dirección es obligatoria" } },
    };

    $(document).ready(function () {
      $("#formulario1").submit(function (event) {
        event.preventDefault();

        var nombre = $("#nombre").val();

        var correo = $("#correo").val();

        var reclamo = $("#SioNo").val();
        if (reclamo === "si") {
          reclamo = "Nos contacta por un reclamo de un producto";
        } else {
          reclamo = "No nos contacta por un reclamo de un producto"
        }

        var producto = "-";
        if ($("#producto").is(":visible")) {
          producto = $("select[name=productoEspecifico] option:selected").val();
        }

        var tel = $("#tel").val();

        var direccion = $("#direction").val();

        var comentario = $("textarea[name='comentario']").val();
        if (comentario === "") {
          comentario = "No ha dejado un comentario";
        }

        var datos = {
          nombre: nombre,
          correo: correo,
          Reclamo: reclamo,
          producto: producto,
          tel: tel,
          direccion: direccion,
          comentario: comentario
        };

        console.log(datos);



        var doc = new jsPDF();

        var lines = doc.splitTextToSize(comentario, 160);

        doc.setFontSize(22);
        doc.text('Datos del usuario', 20, 20);
        doc.line(20, 25, 190, 25); // Línea horizontal debajo del título

        doc.setFontSize(16);
        doc.text('- Nombre: ' + nombre, 20, 40);
        doc.text('- Correo electrónico: ' + correo, 20, 50);
        doc.text('- Teléfono: ' + tel, 20, 60);
        doc.text('- Dirección: ' + direccion, 20, 70);

        doc.text('', 20, 100); // Espacio en blanco

        doc.setFontSize(22);
        doc.text('Motivo del contacto', 20, 140);
        doc.line(20, 145, 190, 145); // Línea horizontal debajo del título

        doc.setFontSize(16);
        if (reclamo === "No nos contacta por un reclamo de un producto" && comentario === "No ha dejado un comentario") {
          doc.text("El usuario no especifico motivo de contacto", 20, 160);
        } else if (reclamo === "No nos contacta por un reclamo de un producto" && comentario != "No ha dejado un comentario") {
          doc.text("", 20, 160);
          for (var i = 0; i < lines.length; i++) {
            doc.text(lines[i], 20, 160 + (i * 10));
          }
        } else {
          doc.text("- " + reclamo, 20, 160);
          if (reclamo === 'Nos contacta por un reclamo de un producto') {
            doc.text('- Producto: ' + producto, 20, 170);
          }
          if (comentario === "No ha dejado un comentario") {
            doc.text("- El usuario no añadio detalles", 20, 180)
          } else {
            doc.text('- Ademas nos añade que: ', 20, 180)
            for (var i = 0; i < lines.length; i++) {
              doc.text(lines[i], 20, 190 + (i * 10));
            }
          };
        }

        doc.save('Contacto.pdf');

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

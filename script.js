document.getElementById("btnInicioSesion").addEventListener("click", function () {
  window.location.href = "InicioSesion.html";
});

/*  Registrarse  */
if (window.location.pathname.includes("Unete.html")) {

  window.onload = function() {

    var usuario = {
      nombre: '',
      correo: '',
      contraseña: ''
    };
  
    function crearUsuario() {
      fetch("http://localhost:3000/usuarios", {
        method: "POST",
        body: JSON.stringify(usuario),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
    }
  
    $(document).ready(function() {
      $("#registroForm").submit(function(event) {
        event.preventDefault();
  
        usuario.nombre = $("#nombre").val();
        usuario.correo = $("#correo").val();
        usuario.contraseña = $("#password").val();
        console.log(usuario);
  
        crearUsuario();
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

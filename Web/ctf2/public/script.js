const BASE_URL = '/nodejs';

function login() {
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Acceso exitoso') {
            window.location.href = `${BASE_URL}/dashboard`;
        } else {
            document.getElementById('resultado').textContent = data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('resultado').textContent = 'Ocurrió un error. Por favor, intenta de nuevo.';
    });
}

function getInfoUsuario() {
    fetch(`${BASE_URL}/usuario-info`)
        .then(response => response.json())
        .then(data => {
            if (data.role === 'admin') {
                document.getElementById('contenidoAdmin').style.display = 'block';
                document.getElementById('contenidoUsuario').style.display = 'none';
            } else {
                document.getElementById('contenidoUsuario').style.display = 'block';
                document.getElementById('contenidoAdmin').style.display = 'none';
            }
        })
        .catch(error => console.error('Error:', error));
}

function getFlag() {
    fetch(`${BASE_URL}/flag`)
        .then(response => response.json())
        .then(data => {
            if (data.flag) {
                document.getElementById('flag').textContent = data.flag;
            } else {
                document.getElementById('flag').textContent = 'Acceso denegado';
            }
        })
        .catch(error => console.error('Error:', error));
}

function salir() {
    fetch(`${BASE_URL}/salir`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            window.location.href = BASE_URL;
        })
        .catch(error => console.error('Error:', error));
}

if (window.location.pathname === `${BASE_URL}/dashboard`) {
    getInfoUsuario();
}
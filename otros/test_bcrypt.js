const bcrypt = require('bcryptjs');

const password = '3107';
const saltRounds = 10; // Un número estándar para la sal

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) throw err;
    console.log('El hash de tu contraseña es:');
    console.log(hash);
});
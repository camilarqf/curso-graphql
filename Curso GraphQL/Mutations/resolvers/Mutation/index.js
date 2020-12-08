const usuario = require("./usuario");
const perfil = require("./perfis");

module.exports = {
  ...usuario,
  ...perfil,
};

const jwt = require("jwt-simple");

module.exports = async ({ req }) => {
  //em ambiente de desenvolvimento
  await require("./simularUsuarioLogado")(req);

  const auth = req.headers.authorization;
  const token = auth && auth.substring(7); //vrifica s o token foi setado e retira as 7 primeiras strings Bearer... para pegar apenas o token

  let usuario = null;
  let admin = false;

  if (token) {
    try {
      let conteudoToken = jwt.decode(token, process.env.APP_AUTH_SECRET); //decodificar o token
      if (new Date(conteudoToken.exp * 1000) > new Date()) {
        //verificar se o tokn expirou, * 1000 para transformar em milisegundos e compara com a data atual
        usuario = conteudoToken;
      }
    } catch (e) {
      //token invalido
    }
  }

  if (usuario && usuario.perfis) {
    admin = usuario.perfis.includes("admin"); //verifica se tem o valor admin dentro do array perfis
  }

  const err = new Error("Acesso negado!");

  return {
    usuario,
    admin,
    validarUsuario() {
      if (!usuario) {
        throw err;
      }
    },
    validarAdmin() {
      if (!admin) {
        throw err;
      }
    },
    validarUsuarioFiltro(filtro) {
      if (admin) {
        return;
      }

      if (!filtro) {
        throw err;
      }

      if (!usuario) {
        throw err;
      }

      const { id, email } = filtro;

      if (!id && !email) {
        throw err;
      }

      if (id && id !== usuario.id) {
        throw err;
      }

      if (email && email !== usuario.email) {
        throw err;
      }
    },
  };
};

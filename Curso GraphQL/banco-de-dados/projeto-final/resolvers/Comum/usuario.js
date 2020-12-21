const jwt = require("jwt-simple");
const db = require("../../config/db");
const { perfis: obterPerfis } = require("../Type/Usuario");

module.exports = {
  async getUsuarioLogado(usuario) {
    const perfis = await obterPerfis(usuario);
    const agora = Math.floor(Date.now() / 1000); //pegar os segundos como padrão para o payload do token

    //payload
    const usuarioInfo = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfis: perfis.map((p) => p.nome),
      iat: agora,
      exp: agora + 24 * 60 * 60 * 3, //validade do token 3 dias
    };

    const authSecret = process.env.APP_AUTH_SECRET;
    return {
      ...usuarioInfo,
      token: jwt.encode(usuarioInfo, authSecret),
    };
  },
};

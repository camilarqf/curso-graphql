const { usuarios, proximoId } = require("../../data/db");
const perfis = require("./perfis");

function indiceUsuario(filtro) {
  if (!filtro) {
    return -1;
  }

  const { id, email } = filtro;

  if (id) {
    return usuarios.findIndex((u) => u.id === id);
  } else if (email) {
    return usuarios.findIndex((u) => u.email === email);
  }
  return -1;
}



module.exports = {
  //{ nome, email, idade }
  /*  novoUsuario(_, args) {
    const emailExistente = usuarios.some((u) => u.email === args.email); //compara se existe algum email igual
    if (emailExistente) {
      //se for true
      throw new Error("E-mail cadastrado já existe");
    }
    const novo = {
      id: proximoId(),
      ...args, //operador spread
      perfil_id: 1,
      status: "ATIVO",
    };
    usuarios.push(novo);
    return novo;
  }, */

  novoUsuario(_, { dados }) {
    const emailExistente = usuarios.some((u) => u.email === dados.email); //compara se existe algum email igual
    if (emailExistente) {
      //se for true
      throw new Error("E-mail cadastrado já existe");
    }
    const novo = {
      id: proximoId(),
      ...dados, //operador spread
      perfil_id: 1,
      status: "ATIVO",
    };
    usuarios.push(novo);
    return novo;
  },

  /* excluirUsuario(_, { id }) { */
  excluirUsuario(_, { filtro }) {
    /* const i = usuarios.findIndex((u) => u.id === id); */
    const i = indiceUsuario(filtro);
    if (i < 0) {
      return null;
    }
    const excluidos = usuarios.splice(i, 1);
    return excluidos ? excluidos[0] : null;
  },

  alterarUsuario(_, { dados, filtro }) {
    /* const i = usuarios.findIndex((u) => u.id == args.id); */
    const i = indiceUsuario(filtro);
    if (i < 0) {
      return null;
    }
    const usuario = {
      ...usuarios[i],
      ...dados,
    };
    usuarios.splice(i, 1, usuario);
    return usuario;
  },
};

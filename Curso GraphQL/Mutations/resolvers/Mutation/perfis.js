const { perfis, proximoId } = require("../../data/db");

function indicePerfil(filtro) {
  if (!filtro) {
    return -1;
  }

  const { id, nome } = filtro;

  if (id) {
    return perfis.findIndex((p) => p.id === id);
  } else if (nome) {
    return perfis.findIndex((p) => p.nome === nome);
  }

  return -1;
}

module.exports = {
  //{nome}
  novoPerfil(_, { dados }) {
    const perfilExistente = perfis.some((p) => p.nome === dados.nome);

    if (perfilExistente) {
      throw new Error("Perfil já existe");
    }

    const novo = {
      id: proximoId(),
      ...dados,
    };
    perfis.push(novo);
    return novo;
  },

  excluirPerfil(_, { filtro }) {
    const i = indicePerfil(filtro);

    if (i < 0) {
      return null;
    }

    const excluidos = perfis.splice(i, 1);
    return excluidos ? excluidos[0] : null;
  },

  alterarPerfil(_, { dados, filtro }) {
    const i = indicePerfil(filtro);

    if (i < 0) {
      return null;
    }

    const perfil = {
      ...perfis[i],
      ...dados,
    };

    perfis.splice(i, 1, perfil);
    return perfil;
  },
};

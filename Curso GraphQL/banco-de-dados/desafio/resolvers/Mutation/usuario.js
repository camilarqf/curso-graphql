const db = require("../../config/db");
const { perfil: obterPerfil } = require("../Query/perfil");
const { usuario: obterUsuario, usuarios } = require("../Query/usuario");

module.exports = {
  async novoUsuario(_, { dados }) {
    try {
      const idsPerfis = [];
      if (dados.perfis) {
        //se tiver setado perfil no cadastro
        for (let filtro of dados.perfis) {
          const perfil = await obterPerfil(_, {
            filtro,
          });
          if (perfil) {
            //se tiver algo dentro de perfil
            idsPerfis.push(perfil.id);
          }
        }
      }

      const [id] = await db("usuarios")
        .insert({
          nome: dados.nome,
          email: dados.email,
          senha: dados.senha,
        })
        .returning("id");

      for (perfil_id of idsPerfis) {
        await db("usuarios_perfis").insert({
          perfil_id,
          usuario_id: id,
        });
      }

      return await db("usuarios").where({ id }).first();
    } catch (e) {
      throw new Error(e);
    }
  },
  async excluirUsuario(_, { filtro }) {
    try {
      const usuario = await obterUsuario(_, { filtro });

      if (usuario) {
        const { id } = usuario;

        await db("usuarios_perfis").where({ usuario_id: id }).delete();
        await db("usuarios").where({ id }).delete();
      }

      return usuario;
    } catch (e) {
      throw new Error(e);
    }
  },
  async alterarUsuario(_, { filtro, dados }) {
    const usuario = await obterUsuario(_, { filtro });

    if (usuario) {
      const { id } = usuario;

      if (dados.perfis) {
        //se tiver passado algum perfil para alterar
        await db("usuarios_perfis").where({ usuario_id: id }).delete(); //deleta relacionamentos desse usuario na tab usuarios_perfis

        for (let filtro of dados.perfis) {
          const perfil = await obterPerfil(_, { filtro });

          if (perfil) {
            await db("usuarios_perfis").insert({
              perfil_id: perfil.id,
              usuario_id: id,
            });
          }
        }
      }

      delete dados.perfis; //deletar dentro de dados o atributo perfis para poder inserir no bd

      await db("usuarios")
        .where({ id })
        .update({ ...dados });
    }
    return !usuario ? null : { ...usuario, ...dados }; //concatenação dos usuarios e o dados passados
  },
};

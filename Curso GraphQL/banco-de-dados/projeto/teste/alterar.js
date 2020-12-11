const db = require("../config/db");

const novoUsuario = {
  nome: "Pedro",
  email: "pedro2@email.com",
  senha: "12345",
};

async function exercicio() {
  //count
  const { qtde } = await db("usuarios").count("* as qtde").first();
  console.log(qtde);
  //inserir se a tabela estiver vazia

  await db("usuarios").insert(novoUsuario);

  //consultar
  let { id } = await db("usuarios").select("id").limit(1).first();
  console.log(id);
  //alterar
  await db("usuarios").where({ id: 1 }).update({ nome: "Pedro Garcia" });
  return await db("usuarios").where({ id });
}
//git checkout --track origin/RC_OS
exercicio()
  .then((usuario) => console.log(usuario))
  .finally(() => db.destroy());

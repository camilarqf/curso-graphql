const db = require("../config/db");

/* const novoPerfil = {
  nome: "visitante",
  rotulo: "Visitante",
};

db("perfis")
  .insert(novoPerfil)
  .then((res) => console.log(res))
  .catch((err) => console.log(err.sqlMessage)) //exibe mensagem de erro
  .finally(() => db.destroy()); // encerra a conexao com o bd
 */

const perfilSU = {
  nome: "root" + Math.random(),
  rotulo: "Super Usuário",
};

db.insert(perfilSU)
  .into("perfis")
  .then((res) => res[0])
  .then((id) => `O código gerado foi ${id}`)
  .then((string) => console.log(string))
  .catch((err) => console.log(err.sqlMessage)) //exibe mensagem de erro
  .finally(() => db.destroy());

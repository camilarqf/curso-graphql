const { where } = require("../config/db");
const db = require("../config/db");
/* 
db("perfis")
  .then((res) => console.log(res))
  .finally(() => db.destroy()); */

//procurando apenas os nomes
/* db("perfis")
  .then((res) => res.map((p) => p.nome))
  .then((nomes) => console.log(nomes))
  .finally(() => db.destroy());
 */

/* db("perfis")
  .select("nome", "id")
  .then((res) => console.log(res))
  .finally(() => db.destroy()); */

/* db.select("nome", "id")
  .from("perfis")
  .limit(4) // limite de quantos registros irão retornar
  .offset(0) // indica de onde a consulta começa
  .then((res) => console.log(res))
  .finally(() => db.destroy());
 */

db("perfis")
  //.where({ id: 2 })
  //.where("id", "=", 2)
  //.whereNot({ id: 2 })
  //.first()
  .then((res) => console.log(res.nome))
  .finally(() => db.destroy());

//git checkout --track -b rc_os origin/RC_OS

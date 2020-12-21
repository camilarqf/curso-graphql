module.exports = async ({ req }) => {
  //em ambiente de desenvolvimento
  await require("./simularUsuarioLogado")(req);
  const auth = req.headers.authorization;
  console.log(auth);
};

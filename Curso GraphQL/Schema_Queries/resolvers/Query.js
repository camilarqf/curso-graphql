const { usuarios, perfis } = require("../data/db");

module.exports = {
  ola() {
    return "bom dia";
  },
  horaAtual() {
    var hora = new Date();
    var horaAtual = hora.toString();
    // return horaAtual;
    return new Date();
  },
  usuarioLogado() {
    return {
      id: 1,
      nome: "fulano",
      email: "fulano@gmail.com",
      idade: 30,
      salario_real: 1234.8,
      vip: true,
    };
  },

  produtoEmEstoque() {
    return {
      nome: "Pc Gamer",
      preco: 6000.0,
      desconto: 0.15,
    };
  },

  megaSenaNumeros() {
    var megaSena = [];
    while (megaSena.length < 6) {
      var aleatorio = parseInt(Math.random() * 60 + 1); // converte o random em int depois * por 60 ( num 0 a 59 )  soma + 1 (1 a 60)
      if (megaSena.indexOf(aleatorio) === -1) {
        // se o numero não tiver no array retorna -1 e adiciona no array
        megaSena.push(aleatorio);
      }
    }
    return megaSena.sort((a, b) => a - b); //array ordenado
  },

  usuarios() {
    return usuarios;
  },

  usuario(_, { id }) {
    const selecionados = usuarios.filter((u) => u.id == id); // filtra o usuario comparando o id usuario com o id do argumeento passado
    return selecionados ? selecionados[0] : null; //se o array selecionados tiver setado retorna o primeiro elemento (selecionados[0], caso contrário rtorna null)
  },

  perfis() {
    return perfis;
  },

  perfil(_, { id }) {
    const sel = perfis.filter((p) => p.id == id);
    return sel ? sel[0] : null;
  },
};

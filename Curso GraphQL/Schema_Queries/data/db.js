const perfis = [
  {
    id: 1,
    nome: "Comum",
  },
  {
    id: 2,
    nome: "Administrador",
  },
];

const usuarios = [
  {
    id: 1,
    nome: "fulano",
    email: "fulano@mail.com",
    idade: 30,
    salario: 3000,
    vip: true,
    perfil_id: 1,
    status: "ATIVO",
  },
  {
    id: 2,
    nome: "ciclano",
    email: "ciclano@mail.com",
    idade: 40,
    salario: 4000,
    vip: true,
    perfil_id: 2,
    status: "INATIVO",
  },
  {
    id: 3,
    nome: "beltrano",
    email: "beltrano@mail.com",
    idade: 50,
    salario: 5000,
    vip: true,
    perfil_id: 1,
    status: "BLOQUEADO",
  },
];

module.exports = { usuarios, perfis };

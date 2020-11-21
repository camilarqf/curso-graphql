/* /"scripts": {
    "start": "nodemon" //faz auto-restart da aplicação, toda vez que um arquivo do projeto for modificado.
  }, isso tá no package.json */
const { ApolloServer, gql } = require("apollo-server");

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
    },
    {
        id: 2,
        nome: "ciclano",
        email: "ciclano@mail.com",
        idade: 40,
        salario: 4000,
        vip: true,
    },
    {
        id: 3,
        nome: "beltrano",
        email: "beltrano@mail.com",
        idade: 50,
        salario: 5000,
        vip: true,
    },
];

/* # pontos dee entrada da sua API! */
const typeDefs = gql`
    scalar Date

    type Perfil {
        id: ID!
        nome: String
    }

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    type Usuario {
        id: ID!
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    type Query {
        ola: String!
        horaAtual: Date!
        usuarioLogado: Usuario
        produtoEmEstoque: Produto
        megaSenaNumeros: [Int!]!
        usuarios: [Usuario]
        usuario(id: ID): Usuario
        perfis: [Perfil]
        perfil(id: ID): Perfil
    }
`;

//tmplate string

const resolvers = {
    Usuario: {
        salario(usuario) {
            return usuario.salario_real;
        },
    },
    Query: {
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

        perfis(){
            return perfis;
        },

        perfil(_, {id}){
            
            const sel = perfis.filter(p => p.id == id)
            return sel ? sel[0] : null;
        },
    },
    Produto: {
        precoComDesconto(produto) {
            if (produto.desconto) {
                return produto.preco * (1 - produto.desconto);
            } else {
                return produto.preco;
            }
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`);
});

Vá para a pasta do projeto, em seguida abra o terminal

Digite "npm i" para instalar as dependências presentes no package.json

Digite npm start 


=======================
Criação do BD
=======================

npm init - y => para criar o arquivo package.json

npm i -s knex mysql/postgresql => para instalar as duas dependências do projeto

npx knex init => cria o knexfile.js (arquivo p/configurar o bd)

* Criação de tabelas *
npx knex migrate:make tabela_perfis 
npx knex migrate:make tabela_usuarios
npx knex migrate:make tabela_usuarios_perfis




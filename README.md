# Gestão de Usuários

Este é um projeto de gestão de usuários, composto por um front-end desenvolvido em **React.js** e um back-end com **C#**, utilizando uma API para gerenciar operações de usuários.

## Tecnologias Utilizadas

- **Front-end**: React.js
- **Back-end**: C# (ASP.NET Core)
- **Banco de Dados**: (Se você estiver usando algum banco, adicione aqui. Caso contrário, pode omitir.)

## Funcionalidades

O projeto permite realizar as seguintes operações para gerenciar usuários:

### Front-end
- Interface em React.js para interação com o usuário.

### Back-end
- **Listar Usuários**
  - **Método**: GET
  - **Endpoint**: `https://localhost:5001/api/Users`
  - **Descrição**: Retorna uma lista de todos os usuários.

- **Obter Usuário por ID**
  - **Método**: GET
  - **Endpoint**: `https://localhost:5001/api/Users/{id}`
  - **Descrição**: Retorna os detalhes de um usuário específico pelo seu ID.

- **Deletar Usuário**
  - **Método**: DELETE
  - **Endpoint**: `https://localhost:5001/api/Users/{id}`
  - **Descrição**: Deleta um usuário específico pelo seu ID.

- **Atualizar Usuário**
  - **Método**: PUT
  - **Endpoint**: `https://localhost:5001/api/Users/{id}`
  - **Descrição**: Atualiza as informações de um usuário específico pelo seu ID.

- **Autenticação (Login)**
  - **Método**: POST
  - **Endpoint**: `https://localhost:5001/api/Users/login`
  - **Descrição**: Realiza o login do usuário, retornando um token de autenticação.


## Licença

Esse projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

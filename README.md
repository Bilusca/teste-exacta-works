# Teste Exacta Works

Teste de front da Exacta Works, consiste em um sistema de cadastros de documentos para cotação de emprestimos.

## URL da aplicação

[Da uma checada 😉](https://exactapay.netlify.app/)

## Como rodar o projeto

Primeiro você deverá criar um arquivo `.env` no diretório raiz

```bash
$ touch .env
```

E no arquivo irá criar uma variável de ambiente como no exemplo

```
VITE_API_URL=https://urldaapi.com
```

E execute os comandos

```bash
$ yarn install && yarn dev
```

## Configurando a API

Usando a api do [Mock API](https://mockapi.io/) crie uma API na seguinte estrutura.


- Crie uma collection com nome `documents`
 
![Primeiro passo](/project-images/mockapi3.png)

- Defina o schema desta maneira

![Segundo passo](/project-images/mockapi1.png)

- Depois defina assim os retornos

![Terceiro passo](/project-images/mockapi2.png)
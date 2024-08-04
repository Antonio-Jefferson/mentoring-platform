# Bossa Investt

<img src="https://bossainvest.com/wp-content/uploads/2020/04/logotipo-gradiente.png" alt="logo">

# Sumário
- [Bossa Investt](#bossa-investt)
- [Sumário](#sumário)
  - [Sobre o Desafio](#sobre-o-desafio)
  - [Tecnologias](#tecnologias)
  - [Modelagem do Banco de Dados](#modelagem-do-banco-de-dados)
  - [Estrutura do Arquivo](#estrutura-do-arquivo)
  - [Quer testar o projeto então vem comigo](#quer-testar-o-projeto-então-vem-comigo)
  - [1. Requisitos](#1-requisitos)
  - [2. Instalação](#2-instalação)
      - [1. Clone este repositório para o seu computador:](#1-clone-este-repositório-para-o-seu-computador)
      - [2. Navegue até o diretório do projeto:](#2-navegue-até-o-diretório-do-projeto)
      - [3. Instale as dependências do projeto:](#3-instale-as-dependências-do-projeto)
  - [2. Configurações do Ambiente](#2-configurações-do-ambiente)
      - [1. Construindo o Banco de Dados](#1-construindo-o-banco-de-dados)
      - [2. Executando o Seed do Prisma](#2-executando-o-seed-do-prisma)
  - [3. Executando o Projeto](#3-executando-o-projeto)
    - [1. Executando com Node.js](#1-executando-com-nodejs)
    - [2. Executando com Docker](#2-executando-com-docker)
      - [Para construir a imagem Docker, execute:](#para-construir-a-imagem-docker-execute)
      - [3. Testando as Rotas](#3-testando-as-rotas)
  - [Rodando os Test do Projeto](#rodando-os-test-do-projeto)

## Sobre o Desafio
O objetivo
 deste desafio é desenvolver um backend para uma plataforma de mentorias. Esta plataforma deve atender a dois públicos distintos: pessoas que possuem habilidades e estão dispostas a oferecer mentoria, e pessoas que precisam de mentoria nessas habilidades. 

## Tecnologias
- Node.js
- TypeScript
- Docker
- PostgreSQL
- Prisma
- Jest
- Swagger
- GoogleApis

## Modelagem do Banco de Dados

<img src="https://media.discordapp.net/attachments/1244260762017337405/1269658948806643743/image.png?ex=66b0dd8a&is=66af8c0a&hm=e4e0ebe8218233e6a6999e4889de7a90b22bc3ccc850204988cfbf2d5d619e3c&=&format=webp&quality=lossless&width=871&height=645" alt="imagem da modelagem">

## Estrutura do Arquivo

```bash

  📁 /.github
  📁 /node_modules
  📁 /prisma
  📁 /src
    📁 /__tests__
    📁 /@types
    📁 /config
    📁 /controllers
    📁 /errors
    📁 /http
    📁 /middlewares
    📁 /repositories
    📁 /routes
    📁 /schemas
    📁 /services
  📄 .dockerignore
  📄 .env
  📄 .env.test
  📄 .gitignore
  📄 docker-compose.yml
  📄 Dockerfile
  📄 jest.config.js
  📄 LICENSE
  📄 package-lock.json
  📄 package.json
  📄 README.md
  📄 tsconfig.json
```
## Quer testar o projeto então vem comigo

## 1. Requisitos

Certifique-se de ter o Node.js e o npm instalados em sua máquina antes de começar.

## 2. Instalação

#### 1. Clone este repositório para o seu computador:

 ```bash
git clone git@github.com:Antonio-Jefferson/mentoring-platform.git
```

#### 2. Navegue até o diretório do projeto:

  ```bash
  cd mentoring-platform
  ```

#### 3. Instale as dependências do projeto:

```bash
npm install
```
## 2. Configurações do Ambiente
  Certifique-se de configurar as variáveis necessárias no arquivo .env. Um exemplo do arquivo .env.example pode estar disponível no repositório para referência.
#### 1. Construindo o Banco de Dados
Para criar o banco de dados e aplicar as migrações, execute:

```bash
npx prisma migrate dev
```

#### 2. Executando o Seed do Prisma
Para popular o banco de dados com dados iniciais, execute:

```bash
npx prisma db seed
```

## 3. Executando o Projeto

### 1. Executando com Node.js
Para iniciar o servidor, use o seguinte comando:

```bash
npm run dev
```
O projeto estará disponível em http://localhost:5000 (ou a porta que você configurou).

### 2. Executando com Docker
Certifique-se de que o Docker está rodando em sua máquina.

#### Para construir a imagem Docker, execute:

```bash
  docker-compose build
```
Para iniciar o projeto em um contêiner Docker, execute:

```bash
  docker-compose up
```

O projeto estará disponível em http://localhost:5000 (ou a porta que você configurou).

#### 3. Testando as Rotas
Depois que o projeto estiver rodando, você pode testar as rotas usando o Swagger UI. Basta acessar no seu navegador a rota:

```bash
http://localhost:5000/api-docs
```

Ou você pode executar as rotas usando o Postman. Para isso, baixe o <a hrf="https://drive.google.com/file/d/1qvRtqr_AThjnFLaYfMYgkd-d8ee7NvQ3/view?usp=sharing">Aquivo</a> apropriado e use-o no Postman.

## Rodando os Test do Projeto

Para executar os testes unitários, você pode usar o seguinte comando:

```bash
  npm run test
```

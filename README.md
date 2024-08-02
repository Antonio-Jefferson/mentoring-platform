
Essa estrutura de pastas é organizada para manter a separação de responsabilidades e facilitar a manutenção do código. Cada pasta tem um propósito específico, conforme descrito acima.

### Descrição das Pastas


- **`.github`**: Arquivos de configuração e workflows do GitHub.
- **`node_modules`**: Diretório gerado automaticamente contendo os módulos instalados pelo NPM.
- **`prisma`**: Contém os arquivos do Prisma ORM, como esquemas de banco de dados e migrações.
- **`src`**: Diretório principal do código fonte da aplicação.
  - **`__tests__`**: Contém os testes do projeto, incluindo testes unitários e fábricas de objetos para testes.
  - **`@types`**: Definições de tipos TypeScript personalizados.
  - **`config`**: Arquivos de configuração da aplicação.
  - **`controllers`**: Controladores que gerenciam as requisições HTTP.
  - **`errors`**: Tratamento e definição de erros personalizados.
  - **`http`**: Configurações e utilitários relacionados a HTTP.
  - **`middlewares`**: Middlewares utilizados na aplicação.
  - **`repositories`**: Camada de acesso a dados, contendo interações com o banco de dados.
  - **`routes`**: Definições das rotas da API.
  - **`schemas`**: Schemas de validação para dados de entrada.
  - **`services`**: Contém a lógica de negócios e serviços da aplicação.
- **`utils`**: Funções utilitárias que podem ser usadas em diferentes partes da aplicação.
- **`.dockerignore`**: Lista de arquivos e diretórios que o Docker deve ignorar.
- **`.env`**: Arquivo de configuração de variáveis de ambiente.
- **`.env.test`**: Arquivo de configuração de variáveis de ambiente para o ambiente de teste.
- **`.gitignore`**: Lista de arquivos e diretórios que o Git deve ignorar.
- **`docker-compose.yml`**: Arquivo de configuração do Docker Compose para definir serviços, redes e volumes.
- **`Dockerfile`**: Arquivo de configuração do Docker para construir a imagem da aplicação.
- **`jest.config.js`**: Arquivo de configuração do Jest para testes.
- **`LICENSE`**: Arquivo de licença do projeto.
- **`package-lock.json`**: Arquivo de lock do NPM para garantir a consistência das instalações de dependências.
- **`package.json`**: Arquivo de configuração do NPM, contendo dependências e scripts.
- **`README.md`**: Documentação principal do projeto.
- **`tsconfig.json`**: Arquivo de configuração do TypeScript.

Essa descrição detalhada e a estrutura de pastas irão ajudar os desenvolvedores a entenderem a organização do seu projeto e a contribuírem de maneira mais eficiente.

# Desafio Final - Desenvolvimento Back-end II

API RESTful desenvolvida em Node.js para gerenciamento de clientes, produtos e usuários, com autenticação JWT, cache e testes automatizados.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL** - Banco de dados relacional
- **JWT** - Autenticação via tokens
- **bcryptjs** - Hash de senhas
- **node-cache** - Sistema de cache
- **Jest + Supertest** - Testes automatizados

## 📁 Estrutura do Projeto

\`\`\`
backend-challenge/
├── configs/           # Configurações (banco, cache)
├── controllers/       # Lógica de negócio
├── middlewares/       # Middlewares (auth, validação)
├── models/           # Scripts SQL
├── routes/           # Definição das rotas
├── services/         # Camada de dados
├── __tests__/        # Testes automatizados
├── .env              # Variáveis de ambiente
├── .gitignore        # Arquivos ignorados pelo Git
├── app.js            # Arquivo principal
├── package.json      # Dependências e scripts
└── README.md         # Documentação
\`\`\`

## 🛠️ Instalação e Configuração

### 1. Clone o repositório
\`\`\`bash
git clone <url-do-repositorio>
cd backend-challenge
\`\`\`

### 2. Instale as dependências
\`\`\`bash
npm install
\`\`\`

### 3. Configure o banco de dados
- Crie um banco MySQL chamado `backend_challenge`
- Execute os scripts SQL em `models/schema.sql` e `models/seed.sql`

### 4. Configure as variáveis de ambiente
Copie o arquivo `.env` e ajuste as configurações:
\`\`\`env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=backend_challenge
JWT_SECRET=seu_jwt_secret_seguro
\`\`\`

### 5. Execute o projeto
\`\`\`bash
# Desenvolvimento
npm run dev

# Produção
npm start
\`\`\`

## 📚 Endpoints da API

### Público
- `GET /` - Verificar status do servidor
- `GET /produtos` - Listar produtos
- `POST /produtos` - Criar produto
- `PUT /produtos/:id` - Atualizar produto
- `DELETE /produtos/:id` - Excluir produto
- `GET /usuarios` - Listar usuários
- `POST /usuarios` - Criar usuário
- `POST /login` - Fazer login

### Autenticado (requer token JWT)
- `GET /clientes` - Listar clientes (com cache)
- `POST /clientes` - Criar cliente
- `PUT /clientes/:id` - Atualizar cliente
- `DELETE /clientes/:id` - Excluir cliente
- `POST /logout` - Fazer logout

## 🔐 Autenticação

Para acessar endpoints protegidos, inclua o token no header:
\`\`\`
Authorization: Bearer <seu_token_jwt>
\`\`\`

### Usuários padrão:
- **Usuário:** admin | **Senha:** 123456
- **Usuário:** user1 | **Senha:** 123456

## 💾 Cache

O endpoint `GET /clientes` utiliza cache com TTL de 30 segundos:
- Cache é invalidado automaticamente em operações CRUD
- Logs mostram se dados vieram do cache ou banco

## 🧪 Testes

Execute os testes automatizados:
\`\`\`bash
# Todos os testes
npm test

# Testes em modo watch
npm run test:watch
\`\`\`

### Cobertura de testes:
- ✅ Validação de campos obrigatórios
- ✅ Funcionamento de todos os endpoints
- ✅ Sistema de autenticação
- ✅ Sistema de cache

## 📊 Validações Implementadas

### Clientes
- Nome/Sobrenome: 3-255 caracteres
- Email: formato válido
- Idade: 0 < idade < 120

### Produtos
- Nome/Descrição: 3-255 caracteres
- Preço: valor positivo
- Data: entre 01/01/2000 e 20/06/2025

### Usuários
- Usuário: 3-255 caracteres
- Senha: mínimo 6 caracteres

## 🔧 Scripts Disponíveis

\`\`\`bash
npm start        # Iniciar servidor
npm run dev      # Modo desenvolvimento
npm test         # Executar testes
npm run test:watch # Testes em modo watch
\`\`\`

## 📝 Exemplos de Uso

### Login
\`\`\`bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"usuario":"admin","senha":"123456"}'
\`\`\`

### Criar Cliente (autenticado)
\`\`\`bash
curl -X POST http://localhost:3000/clientes \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"nome":"João","sobrenome":"Silva","email":"joao@email.com","idade":30}'
\`\`\`

### Listar Produtos (público)
\`\`\`bash
curl http://localhost:3000/produtos
\`\`\`

## 🚨 Logs do Sistema

O sistema exibe logs informativos:
- 📦 Dados servidos do cache
- 🗄️ Dados servidos do banco
- 🗑️ Cache invalidado
- ✅ Conexão com banco estabelecida

## 👥 Contribuição

Este projeto foi desenvolvido como trabalho acadêmico para a disciplina de Desenvolvimento Back-end II.

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

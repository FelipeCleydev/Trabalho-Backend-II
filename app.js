const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
require("dotenv").config()

const clientesRoutes = require("./routes/clientes")
const produtosRoutes = require("./routes/produtos")
const usuariosRoutes = require("./routes/usuarios")
const authRoutes = require("./routes/auth")

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares de segurança
app.use(helmet())
app.use(cors())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
})
app.use(limiter)

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Endpoint padrão
app.get("/", (req, res) => {
  res.json({
    message: "Bem-vindo à API do Desafio Backend!",
    status: "Servidor funcionando corretamente",
    timestamp: new Date().toISOString(),
  })
})

// Rotas
app.use("/clientes", clientesRoutes)
app.use("/produtos", produtosRoutes)
app.use("/usuarios", usuariosRoutes)
app.use("/", authRoutes)

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: "Algo deu errado!",
    message: process.env.NODE_ENV === "development" ? err.message : "Erro interno do servidor",
  })
})

// Middleware para rotas não encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Rota não encontrada",
    message: `A rota ${req.originalUrl} não existe`,
  })
})

// Inicializar servidor
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`)
    console.log(`📍 Acesse: http://localhost:${PORT}`)
  })
}

module.exports = app

const express = require("express")
const cors = require("cors")

const app = express()

const pedidosRoutes = require("./routes/pedidos")
const usuariosRoutes = require("./routes/usuarios")

app.use(cors())
app.use(express.json())

app.use("/pedidos", pedidosRoutes)
app.use("/usuarios", usuariosRoutes)

app.get("/", (req, res) => {
  res.send("API de pedidos rodando 🚀")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Servidor rodando")
})
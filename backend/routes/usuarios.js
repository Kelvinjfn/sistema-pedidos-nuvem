const express = require("express")
const router = express.Router()
const db = require("../firebase")

// CADASTRAR USUÁRIO
router.post("/register", async (req,res)=>{

  const usuario = {
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha
  }

  const doc = await db.collection("usuarios").add(usuario)

  res.json({
    id: doc.id,
    ...usuario
  })

})

module.exports = router
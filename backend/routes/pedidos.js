const express = require("express")
const router = express.Router()

let pedidos = []

// LISTAR
router.get("/", (req, res) => {
  res.json(pedidos)
})

// CRIAR
router.post("/", (req, res) => {

  const novoPedido = {
    id: pedidos.length + 1,
    cliente: req.body.cliente,
    produto: req.body.produto,
    quantidade: req.body.quantidade,
    status: "Pendente"
  }

  pedidos.push(novoPedido)

  res.json(novoPedido)
})

// ATUALIZAR
router.put("/:id", (req, res) => {

  const id = parseInt(req.params.id)

  const pedido = pedidos.find(p => p.id === id)

  if(!pedido){
    return res.status(404).json({erro:"Pedido não encontrado"})
  }

  pedido.status = req.body.status

  res.json(pedido)

})

// DELETAR
router.delete("/:id", (req,res)=>{

  const id = parseInt(req.params.id)

  pedidos = pedidos.filter(p => p.id !== id)

  res.json({mensagem:"Pedido removido"})

})

module.exports = router
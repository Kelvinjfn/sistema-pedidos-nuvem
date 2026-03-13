import { useEffect, useState } from "react"
import "./App.css"

function App(){

  const [pedidos,setPedidos] = useState([])
  const [cliente,setCliente] = useState("")
  const [produto,setProduto] = useState("")
  const [quantidade,setQuantidade] = useState("")

  const API = "https://sistema-pedidos-nuvem.onrender.com/pedidos"

  function carregarPedidos(){
    fetch(API)
    .then(res=>res.json())
    .then(data=>setPedidos(data))
  }

  useEffect(()=>{
    carregarPedidos()
  },[])

  function criarPedido(e){
    e.preventDefault()

    fetch(API,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        cliente,
        produto,
        quantidade
      })
    })
    .then(()=>{
      setCliente("")
      setProduto("")
      setQuantidade("")
      carregarPedidos()
    })
  }

  function deletarPedido(id){
    fetch(API + "/" + id,{
      method:"DELETE"
    })
    .then(()=>carregarPedidos())
  }

  function atualizarStatus(id){

    fetch(API + "/" + id,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        status:"Concluído"
      })
    })
    .then(()=>carregarPedidos())

  }

  return(

    <div className="container">

      <h1>Sistema de Pedidos</h1>

      <h2>Total de pedidos: {pedidos.length}</h2>

      <form className="form" onSubmit={criarPedido}>

        <input
        placeholder="Cliente"
        value={cliente}
        onChange={e=>setCliente(e.target.value)}
        />

        <input
        placeholder="Produto"
        value={produto}
        onChange={e=>setProduto(e.target.value)}
        />

        <input
        placeholder="Quantidade"
        value={quantidade}
        onChange={e=>setQuantidade(e.target.value)}
        />

        <button type="submit">Criar Pedido</button>

      </form>

      <div className="pedidos">

      {pedidos.map(p=>(
        <div key={p.id} className={`card ${p.status === "Concluído" ? "done" : ""}`}>

          <h3>{p.cliente}</h3>

          <p>Produto: {p.produto}</p>
          <p>Quantidade: {p.quantidade}</p>
          <p>Status: {p.status}</p>

          <button onClick={()=>atualizarStatus(p.id)}>
            Concluir
          </button>

          <button onClick={()=>deletarPedido(p.id)}>
            Remover
          </button>

        </div>
      ))}

      </div>

    </div>
  )
}

export default App
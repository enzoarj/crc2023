import axios from 'axios'
import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'

export const Cadastro = () => {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    try{
      const response = await axios.post("http://localhost:8080/criarProfessor", {nome, email, senha}) 
      console.log(response.data) 

    }catch(err){
      console.error(err)
    }
  }
  
  
  
  
  
  
  
  return (
    <div className='d-flex align-items-center justify-content-center' style={{height: "100vh"}}>
      <div className='border rounder p-5' style={{backgroundColor: '#5f4888', borderRadius: "13px"}}>
      <Form style= {{color: '#ffffff', margin: "5px"}} onSubmit ={handleSubmit}>
        <h1>Cadastrar</h1>
        <Form.Group controlId='formBasicText'>
          <Form.Label>Nome</Form.Label>
          <Form.Control type= "text"   placeholder="Digite seu nome lindo:" value={nome} onChange={(event) => setNome(event.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control type= "email"  placeholder="Digite seu email:" value={email} onChange={(event) => setEmail(event.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Senha</Form.Label>
          <Form.Control type= "password"   placeholder="Digite seu senha:" value={senha} onChange={(event) => setSenha(event.target.value)}></Form.Control>

        </Form.Group>
        <Button  style={{backgroundColor: '#9370DB', borderColor: "#9370DB", marginTop: "10px"}} type="submit">
          Cadastrar
        </Button>
      </Form>
      </div>
    </div>
  )
}

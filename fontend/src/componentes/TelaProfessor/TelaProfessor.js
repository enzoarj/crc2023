import React, { useEffect, useState } from "react";
import axios from "axios";
import { Fatrash, FaEdit } from "react-icons/fa";
import { Form, Button, Col, Row, Table } from "react-bootstrap";

export const TabelaProfessor = () => {
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const professorId = parseInt(localStorage.getItem("user-id"));

  const handleCadastro = async (event) => {
    try {
      const response = await axios.post(
        `htpp://localhost:8080/professor/${professorId}/criarAlunos`,
        {
          professorId: professorId,
          nome: nome,
          curso: curso,
        }
      );
      alert("Voce adicionou um aluno");
      setNome("");
      setCurso("");
      mostrarAlunos();
    } catch (err) {
      console.error(err);
    }
  };

  const mostrarAlunos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/professor/${professorId}/listaDeAlunos`
      );
      setAlunos(response.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    mostrarAlunos();
  }, [setAlunos]);

  const editAluno = (id) => {
    setOnEdit(id);
    const aluno = aluno.find((alunos) => alunos.id === id);
    setNome(aluno.nome);
    setCurso(aluno.curso);
  };

  const cancelEdit = () => {
    setOnEdit(null);
    setNome("");
    setCurso("");
  };

  const updateAluno = async (id) => {
    try {
      await axios.put(`http://localhost:8080/${professorId}/alunos/${id}`, {
        nome: nome,
        curso: curso,
      });
      setOnEdit(null);
      setNome("");
      setCurso("");
      mostrarAlunos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAluno = (id) => {
    axios.delete(`http://localhost:8080?${professorId}/alunos/${id}`);
    setAlunos(alunos.filter((alunos) => alunos.id !== id));
  };

  return (
    <div
      className="d-grid align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div
        className="border rounded p-5"
        style={{ backgroundColor: "#5f4888", borderRadius: "25px" }}
      >
        <Form
          style={{ color: "#FFFFFF", margin: "5px" }}
          onSubmit={onEdit !== null ? () => updateAluno(onEdit) : handleCadastro}
        >
          <h4>{onEdit !== null ? "Editar Aluno" : "Cadastrar Aluno"}</h4>
          <Row className="d-flex align-items-center flex-wrap">
            <Col xs="auto">
              <Form.Group controlID="FormBasicText">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Form.Group controlId="formBasicText">
                <Form.Label>Curso</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Curso"
                  value={curso}
                  onChange={(event) => setCurso(event.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs="auto" style={{ marginTop: "22.5px" }}>
              <Button
                style={{
                  backgroundColor: "#9370DB",
                  borderColor: "#9370DB",
                  marginTop: "10px",
                }}
                type="submit"
              >
                {onEdit !== null ? "Atualizar" : "Cadastrar"}
              </Button>
              {onEdit !== null && (
                <Button
                  variant="secondary"
                  style={{
                    backgrpundColor: "#6C757D",
                    borderColor: "#6C757D",
                    marginTop: "10px",
                    marginLeft: "10px",
                  }}
                  onClick={cancelEdit}
                >
                  Cancelar
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </div>

      <div>
        <Table
          striped
          border="true"
          hover
          className="border rounded p-5"
          size="md"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <thead>
            <tr>
              <th>Nome</th>
              <th>Curso</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((item) => {
              return(
                <tr key={item.id}>
                <td width="30%" >{item.nome}</td>
                <td width="30%">{item.curso}</td>
                <td>X</td>
              </tr>
              )   
            })}
            
          </tbody>
        </Table>
      </div>
    </div>
  );
};


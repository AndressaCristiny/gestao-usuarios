import React, { useState, useCallback, useEffect } from "react";
import CompHeader from "../components/header";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableFooter,
  TableCell,
  TableBody,
  Button,
  ButtonGroup,
  Icon,
  Table,
  Grid,
  Rail,
  GridColumn,
  Segment,
  Image,
  Modal,
  Header,
  ModalContent,
  ModalActions,
  ButtonOr,
  ModalHeader,
  ModalDescription,
  Input,
  Container,
  Pagination,
} from "semantic-ui-react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [data, setData] = useState([]);
  const [openDel, setOpenDel] = useState(false); // State para controlar a abertura do modal
  const [openEdt, setOpenEdt] = useState(false); // State para controlar a abertura do modal
  const [selectedUser, setSelectedUser] = useState([]); // Estado para armazenar os dados do usuário selecionado
  const [user, setUser] = useState([]); // State para armazenar o usuário buscado pelo id

  const [message, setMessage] = useState([]);
  const [FirstName, setFirstName] = useState([]);
  const [LastName, setLastName] = useState([]);
  const [Email, setEmail] = useState([]);

  // Endpoint para lista de usuários
  const getUsers = async () => {
    await axios
      .get("https://reqres.in/api/users?page=1&per_page=4")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        if (err.response) {
          setMessage(err.response.data.mensagem);
        } else {
          setMessage("Erro: Tente mais tarde!");
        }
      });
  };

  // Endpoint usuário por id
  const getUser = async (id) => {
    console.log(id);
    await axios
      .get(`https://reqres.in/api/users/${id}`)
      .then((response) => {
        setUser(response.data.data);
        openModalEdit();
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        } else {
          setMessage("Erro: Tente mais tarde!");
        }
      });
  };

  // Endpoint atualizar usuário por id
  const updateUser = async (id) => {
    console.log(id);
    await axios
      .put("https://reqres.in/api/users/" + id)
      .then((response) => {
        alert("Atualizado: " + response.data.updatedAt);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        } else {
          setMessage("Erro: Tente mais tarde!");
        }
      });
    closeModalEdit();
  };

  // Endpoint deletar usuário por id
  const deleteRow = async (id) => {
    console.log("Excluir usuário com o ID:", id);
    await axios
      .delete(`https://reqres.in/api/users/${id}`)
      .then((response) => {
        alert("204 | Deletado");
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(err);
        }
      });
    closeModalDelete();
  };

  useEffect(() => {
    getUsers();
  }, []);

  const openModalEdit = (id) => {
    setOpenEdt(true);
  };
  const openModalDelete = (id, avatar, firstName, lastName) => {
    setSelectedUser({ id, avatar, firstName, lastName });
    setOpenDel(true);
  };

  const closeModalEdit = () => {
    setOpenEdt(false);
  };
  const closeModalDelete = () => {
    setOpenDel(false);
  };

  const Page = async (pageNumber) => {
    await axios
      .get("https://reqres.in/api/users?page=" + pageNumber + "&per_page=4")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        if (err.response) {
          setMessage(err.response.data.mensagem);
        } else {
          setMessage("Erro: Tente mais tarde!");
        }
      });
  };

  return (
    <>
      <CompHeader />
      <Grid centered columns={2}>
        <GridColumn>
          <Segment textAlign="center">
            <Rail attached position="left">
              <Segment>USUÁRIOS</Segment>
            </Rail>

            <Table compact celled definition>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell />
                  <TableHeaderCell>id</TableHeaderCell>
                  <TableHeaderCell>Usuário</TableHeaderCell>
                  <TableHeaderCell>E-mail</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell collapsing>
                      <ButtonGroup>
                        <Button onClick={() => getUser(user.id)}>
                          <Icon name="edit" />
                        </Button>
                        <ButtonOr />
                        <Button
                          onClick={() =>
                            openModalDelete(
                              user.id,
                              user.avatar,
                              user.first_name,
                              user.last_name
                            )
                          }
                        >
                          <Icon name="trash alternate outline" />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      <div>
                        <Image src={user.avatar} avatar />
                        <span>
                          {user.first_name} {user.last_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter fullWidth>
                <TableRow>
                  <TableHeaderCell />
                  <TableHeaderCell colSpan="4">
                    <Button
                      floated="left"
                      icon
                      labelPosition="left"
                      primary
                      size="small"
                    >
                      <Icon name="user" /> Add User
                    </Button>
                    <Pagination
                      floated="right"
                      boundaryRange={0}
                      defaultActivePage={1}
                      ellipsisItem={null}
                      firstItem={null}
                      lastItem={null}
                      siblingRange={1}
                      totalPages={3}
                      onPageChange={(event, data) => Page(data.activePage)}
                    />
                  </TableHeaderCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Segment>
        </GridColumn>
      </Grid>

      <Modal
        basic
        onClose={closeModalDelete}
        onOpen={() => setOpenDel(true)}
        open={openDel}
        size="small"
      >
        <Header icon>
          <Icon name="trash alternate outline" />
          Excluir Usuário:
          {selectedUser && (
            <div>
              <Image src={selectedUser.avatar} avatar />{" "}
              {selectedUser.firstName} {selectedUser.lastName}
            </div>
          )}
        </Header>
        <ModalContent>
          <Container textAlign="center" text>
            Você realmente deseja excluir o usuário?
          </Container>
        </ModalContent>
        <ModalActions>
          <Button basic color="red" inverted onClick={closeModalDelete}>
            <Icon name="remove" /> Não
          </Button>
          <Button
            color="green"
            inverted
            onClick={() => deleteRow(selectedUser.id)}
          >
            <Icon name="checkmark" /> Sim
          </Button>
        </ModalActions>
      </Modal>
      <Modal
        onClose={closeModalEdit}
        onOpen={() => setOpenEdt(true)}
        open={openEdt}
      >
        <ModalHeader>Editar</ModalHeader>
        <ModalContent image>
          {user && <Image size="medium" src={user.avatar} wrapped />}
          <ModalDescription>
            <Header>
              {user && (
                <div>
                  {user.first_name} {user.last_name}
                </div>
              )}
            </Header>
            <p>
              {user && (
                <div>
                  <Input
                    onChange={(e) => setFirstName(e.target.value)}
                    iconPosition="left"
                    placeholder="Nome"
                  >
                    <Icon name="user outline" />
                    <input />
                  </Input>
                  <Input
                    onChange={(e) => setLastName(e.target.value)}
                    iconPosition="left"
                    placeholder="Sobrenome"
                  >
                    <Icon name="user outline" />
                    <input />
                  </Input>
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    iconPosition="left"
                    placeholder="Email"
                  >
                    <Icon name="at" />
                    <input />
                  </Input>
                </div>
              )}
            </p>
          </ModalDescription>
        </ModalContent>
        <ModalActions>
          <Button color="black" onClick={() => setOpenEdt(false)}>
            Cacelar
          </Button>
          <Button
            content="Editar"
            labelPosition="right"
            icon="checkmark"
            onClick={() => updateUser(user.id)}
            positive
          />
        </ModalActions>
      </Modal>
    </>
  );
}

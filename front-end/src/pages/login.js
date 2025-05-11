import React, { useState, useCallback } from 'react';
import { Grid, Button, Form, Header, Message, Segment } from 'semantic-ui-react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    
  document.title = "Login";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  let navigate = useNavigate();


  // Endpoint para login
  const acessar = useCallback(async () => {
    console.log(password);
    await axios
      .post("https://reqres.in/api/login", {
        email: email,
        password: password
      })
      .then(({ data }) => navigate("/main"))
      .catch(({ data }) => alert("Usuário não encontrado"));

  }, [email, password]);

  return (
    <>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Login
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' value={email} onChange={e => setEmail(e.target.value)} />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                value={password} onChange={e => setPassword(e.target.value)}
              />
              <Button color='teal' fluid size='large' onClick={acessar}>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Não tem conta? <a href='register'>Registrar-se</a>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );

}

export default Login;

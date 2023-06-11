import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import { useState } from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser, setToken } = useStateContext()
  const [message, setMessage] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()
    console.log("Clicked")
    const payload = {
      email: email,
      password: password,
    }
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
      })
  }

  return (
    <Container className="min-vh-100">
      <Row className="min-vh-100 justify-content-center align-items-center">
        <Col lg="4" className="align-self-center my-auto">
          <Card className="text-center">
            <Card.Body>
              <Card.Title><strong>Login into your account</strong></Card.Title>

              {message &&
                <div class="alert alert-danger" role="alert">
                  <p className={"my-0"}>{message}</p>
                </div>
              }

              <Form>
                <Form.Group style={{ textAlign: 'left' }}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Form.Group>

                <Form.Group style={{ textAlign: 'left' }}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Group>

                <Button className="my-3" onClick={onSubmit}>
                  Submit
                </Button>
                <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

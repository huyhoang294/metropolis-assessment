import {Link} from "react-router-dom";
import {useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    }
    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (
    // <div className="login-signup-form animated fadeInDown">
    //   <div className="form">
    //     <form onSubmit={onSubmit}>
    //       <h1 className="title">Signup for Free</h1>
    //       {errors &&
    //         <div className="alert">
    //           {Object.keys(errors).map(key => (
    //             <p key={key}>{errors[key][0]}</p>
    //           ))}
    //         </div>
    //       }
    //       <input ref={nameRef} type="text" placeholder="Full Name"/>
    //       <input ref={emailRef} type="email" placeholder="Email Address"/>
    //       <input ref={passwordRef} type="password" placeholder="Password"/>
    //       <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password"/>
    //       <button className="btn btn-block">Signup</button>
    //       <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
    //     </form>
    //   </div>
    // </div>
    <Container className="min-vh-100">
      <Row className="min-vh-100 justify-content-center align-items-center">
        <Col lg="4" className="align-self-center my-auto">
          <Card className="text-center">
            <Card.Body>
              <Card.Title><strong>Signup</strong></Card.Title>

              {errors &&
                <div className="alert alert-danger" role="alert">
                  {Object.keys(errors).map(key => (
                    <p className={"my-0"} key={key}>{errors[key][0]}</p>
                  ))}
                </div>
              }

              <Form>
                <Form.Group style={{ textAlign: 'left' }}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Form.Group>

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

                <Form.Group style={{ textAlign: 'left' }}>
                  <Form.Label>Repeat Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Repeat Password"
                    required
                    value={passwordConfirmation}
                    onChange={(event) => setPasswordConfirmation(event.target.value)}
                  />
                </Form.Group>

                <Button className="my-3" onClick={onSubmit}>
                  Submit
                </Button>
                <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

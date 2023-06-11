import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";

export default function DefaultLayout() {
  const {user, token, setUser, setToken, notification} = useStateContext();

  if (!token) {
    return <Navigate to="/login"/>
  }

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])

  return (
    <>
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand href="/dashboard">
            Metropolis
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/users">Users</Nav.Link>
            </Nav>
            <Nav>
              <Button onClick={onLogout} variant="outline-light">Log out</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Outlet/>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </Container>
    </>
  )
}

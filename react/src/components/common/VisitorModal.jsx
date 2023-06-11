import {Button, Card, Form, Modal} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";
import {useState} from "react";
import axiosClient from "../../axios-client.js";

export const VisitorModal = ({onClose, visitor, onSave}) => {
  const [name, setName] = useState(visitor ? visitor.name : '');
  const [email, setEmail] = useState(visitor ? visitor.email : '');
  const [phoneNumber, setPhoneNumber] = useState(visitor ? visitor.phone_number : '');
  const [hasVehicle, setHasVehicle] = useState(visitor ? visitor.has_vehicle : false);
  const [purposeOfVisiting, setPurposeOfVisiting] = useState(visitor ? visitor. purpose_of_visiting : '');
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      name: name,
      email: email,
      phone_number: phoneNumber,
      has_vehicle: JSON.parse(hasVehicle),
      purpose_of_visiting: purposeOfVisiting
    }

    if (visitor && visitor.id) {
      axiosClient.put(`/visitors/${visitor.id}`, payload)
        .then(() => {
          setLoading(false);
          onSave();
          onClose();
        }).catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
            setLoading(false)
          }
      })
    } else {
      axiosClient.post(`/visitors/new`, payload)
        .then(() => {
          setLoading(false);
          onSave();
          onClose();
        }).catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
          setLoading(false)
        }
      })
    }
  }

  return (
    <Modal show onHide={onClose} >
      <Modal.Header closeButton>
        <Modal.Title>Check-in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="phoneNumber"
              placeholder="Enter phone number"
              required
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </Form.Group>

          <Form.Group style={{ textAlign: 'left' }}>
            <Form.Label>Purpose of Visiting</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Purpose of Visiting"
              required
              value={purposeOfVisiting}
              onChange={(event) => setPurposeOfVisiting(event.target.value)}
            />
          </Form.Group>

          <Form.Group style={{ textAlign: 'left' }}>
            <div className="form-check">
              <input
                className="form-check-input p-0"
                type="checkbox"
                value={hasVehicle}
                onChange={(event) => {
                  setHasVehicle(event.target.checked)
                }
              }
                id="hasVehicle"
              />
              <label className="form-check-label" htmlFor="hasVehicle">
                Has Vehicle
              </label>
            </div>
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={loading}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

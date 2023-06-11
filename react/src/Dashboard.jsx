import {useEffect, useState} from 'react'
import {Button, Col, Container, Form, InputGroup, Modal, Row, Table} from "react-bootstrap";
import {InforCard} from "./components/common/InforCard.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import axiosClient from "./axios-client.js";
import {Link} from "react-router-dom";
import {VisitorModal} from "./components/common/VisitorModal.jsx";
import VisitorTable from "./components/common/VisitorTable.jsx";

function Dashboard() {
  const [visitors, setVisitors] = useState([]);
  const [meta, setMeta] = useState(null)
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [dateTimeFilter,  setDateTimeFilter] = useState(null);
  const [transportFilter, setTransportFilter] = useState(null)

  useEffect(() =>{
    getVisitors();
  }, [searchResult,dateTimeFilter,transportFilter])

  const getVisitors = (page = 1) => {
    let url = (
      (searchResult && searchResult.length !== 0
        || dateTimeFilter
        || transportFilter !== ""
      ) ? '/search' : '/visitors')
    axiosClient.get(url, {
      params: {
        search: searchResult,
        dateTime: dateTimeFilter,
        transportFilter: transportFilter,
        page: page
      }
    }).then(({data}) => {
      setLoading(false);
      setVisitors(data.data)
      setMeta(data.meta)
    }).catch(() => {
      setLoading(false);
    })
  }

  return (
    <div>
      <Container>
        <Row className="my-2">
          <h2><strong>Dashboard</strong></h2>
        </Row>
        <Row>
          <Col>
            {meta
              ? <InforCard totalVisitors={meta.total} date={dateTimeFilter}/>
              : null
            }
          </Col>
        </Row>
        <Row className="my-2">
          <Col lg>
            <h4><strong>Visitor Log</strong></h4>
          </Col>
          <Col lg>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control value={dateTimeFilter} type="date" onChange={(e) => setDateTimeFilter(e.target.value)}/>
              </Form.Group>
            </Form>
          </Col>
          <Col lg>
            <InputGroup className="mb-3">
              <InputGroup.Text id="prefix-search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="prefix-search"
                value={searchResult}
                onChange={(e) => setSearchResult(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col lg>
            <Form>
              <Form.Select className="mb-3" value={transportFilter} onChange={(e) => setTransportFilter(e.target.value)}>
                <option value="">Select mode of transport</option>
                <option value="vehicle">Vehicle</option>
                <option value="walkin">Walk-in</option>
              </Form.Select>
            </Form>
          </Col>
          <Col><Button variant="danger" onClick={() => {
            setSearchResult('');
            setDateTimeFilter('');
            setTransportFilter('');
          }}>Clear filter</Button></Col>
          <Col style={{ textAlign: "end"}}>
            <Button onClick={() => setModal(
              <VisitorModal
                onClose={()=> setModal(null)}
                onSave={() => getVisitors()}
              />
            )}>
              Check-in
            </Button>

          </Col>
        </Row>
        <Row className="my-2">
          {<VisitorTable
            visitors={visitors}
            loading={loading}
            reload={(page) => getVisitors(page)}
            links={meta ? meta.links : []}/>
          }
        </Row>
      </Container>

      {modal}

    </div>
  )
}

export default Dashboard

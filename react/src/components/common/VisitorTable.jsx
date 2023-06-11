import {DateTime} from "luxon";
import {Button, Pagination, Table} from "react-bootstrap";
import axiosClient from "../../axios-client.js";
import {useState} from "react";
import {VisitorModal} from "./VisitorModal.jsx";
export default function VisitorTable({loading, visitors, reload, links}) {
  const [modal, setModal] = useState(null);
  const onSubmit = (e , visitor) => {
    e.preventDefault();
    let date = DateTime.now()
    axiosClient.put(`/visitors/${visitor.id}`, {...visitor, check_out: date})
      .then(() => {
        reload();
      })
    }
  console.log(links)
  return (
    <div>
      <div className="card animated fadeInDown">
        <Table responsive>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Has Vehicle</th>
            <th>Purpose of visiting</th>
            <th>Check in</th>
            <th>Check out</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {visitors.map(v => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>{v.email}</td>
                <td>{v.phone_number}</td>
                <td>{v.has_vehicle ? "Yes" : "No"}</td>
                <td>{v.purpose_of_visiting}</td>
                <td>{v.check_in
                  ? DateTime.fromISO(v.check_in, {zone: 'utc'}).toFormat('dd-LL-yyyy HH:mm')
                  : null
                }</td>
                <td>{v.check_out
                  ? DateTime.fromISO(v.check_out, {zone: 'utc'}).toFormat('dd-LL-yyyy HH:mm')
                  : <Button
                    variant="danger"
                    onClick={(e) => onSubmit(e, v)}
                  >Check out
                </Button>
                }</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => setModal(
                      <VisitorModal
                        visitor={v}
                        onClose={()=> setModal(null)}
                        onSave={() => reload()}
                      />
                    )}>Edit
                  </Button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </Table>
        {links.length > 0
          ?<Pagination>

            {links.slice(1,links.length -1).map(l => (
              <Pagination.Item
                active={l.active}
                onClick={() => reload(parseInt(l.label))}
              >
                {l.label}
              </Pagination.Item>
            ))}

          </Pagination>
          : null
        }

      </div>
      {modal}
    </div>
  )
}

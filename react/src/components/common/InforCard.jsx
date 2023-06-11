import {Card} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons";

export const InforCard = ({date, totalVisitors}) => {
    return (
        <Card style={{ width: '15rem' }} className="text-center">
            <Card.Body >
                <Card.Title><FontAwesomeIcon icon={faUser} /></Card.Title>
                <Card.Text><h2><strong>{totalVisitors}</strong></h2></Card.Text>
                <Card.Subtitle className="mb-2 text-muted">Visitors</Card.Subtitle>
                {
                  date ? <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle> : null
                }
            </Card.Body>
        </Card>
    );
}

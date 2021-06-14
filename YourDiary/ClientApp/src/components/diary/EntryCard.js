import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
} from "react-bootstrap";
import { Router, Switch, Route, Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteEntry, published, setEntriesPublished } from "../../actions/entry";
import { drafts } from "../../actions/entry";
import { useHistory ,useLocation } from 'react-router-dom';

const EntryCard = () => {
  const { diaryEntries } = useSelector((state) => state.diaryEntries);
  const dispatch = useDispatch();
  const location = useLocation()

  const history = useHistory()

  function convertDate(date) {
    date = date +10800;
    let iso = new Date(date * 1e3).toISOString();
    let fulldate = iso.substr(0, 10);
    let time = iso.substr(11, 5);
    return time + " " + fulldate;
  }

  const handleSubmit = (e, id) => {
    dispatch(deleteEntry(id))
    window.location.reload();
  };

  if (diaryEntries) {
    return diaryEntries.diaryEntries.map((res, index) => (
      <Col key={index} xs={6} md={4}>
        <Card>
          <Card.Body>
            <Card.Title>{res.title}</Card.Title>
            <p dangerouslySetInnerHTML={{ __html: res.content }}>{}</p>
            <Link to={`/entry/${res.id}`} className="btn btn-primary">Open </Link>
            <Link to={`/edit/${res.id}`} className="btn btn-info">Edit</Link>
            
            <Button className="deleteButton" onClick={(e) => handleSubmit(e, res.id)} variant="outline-danger">Delete</Button>{' '}
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Last updated at {convertDate(res.lastEditTime)}
            </small>
          </Card.Footer>
        </Card>
      </Col>
    ));
  } else {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
};

export default EntryCard;

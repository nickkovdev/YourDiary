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

const EntryCard = () => {
  const { diaryEntries } = useSelector((state) => state.diaryEntries);

  function convertDate(date) {
    let iso = new Date(date * 1e3).toISOString();
    let fulldate = iso.substr(0, 10);
    let time = iso.substr(11, 5);
    return time + " " + fulldate;
  }

  if (diaryEntries) {
    return diaryEntries.diaryEntries.map((res, index) => (
      <Col key={index} xs={6} md={4}>
        <Card>
          <Card.Body>
            <Card.Title>{res.title}</Card.Title>
            <p dangerouslySetInnerHTML={{ __html: res.content }}>{}</p>
            <Link to={`/entry/${res.id}`}>Open </Link>
            <Link to={`/entry/${res.id}`}>Edit</Link>
            <Button className="deleteButton" variant="outline-danger">Delete</Button>{' '}
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

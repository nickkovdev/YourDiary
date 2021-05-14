import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Row, Col, Container, ListGroup, ListGroupItem } from "react-bootstrap";

const EntryCard = () => {
  const { diaryEntries } = useSelector((state) => state.diaryEntries);

  if (diaryEntries) {
    return diaryEntries.diaryEntries.map((res, index) => (
      <Col>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{res.title}</Card.Title>
            <Card.Text>
              <p key={index} dangerouslySetInnerHTML={{ __html: res.content }}>
                {}
              </p>
            </Card.Text>
            <Card.Link href="#">Edit</Card.Link>
            <Card.Link href="#">Open</Card.Link>
            <ListGroup className="list-group-flush">
              <ListGroupItem>{Date(res.lastEditTime)}</ListGroupItem>
            </ListGroup>
          </Card.Body>
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

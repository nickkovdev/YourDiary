import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Col, ListGroup, ListGroupItem, Button, Row, Container } from "react-bootstrap";
import { Router, Switch, Route, Link, useParams } from "react-router-dom";
import { getEntry } from "../../actions/entry";

const Entry = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { diaryEntry } = useSelector((state) => state.diaryEntries);

  useEffect(() => {
    dispatch(getEntry(id));
  });

  if (diaryEntry) {
    return (
      <Container>
        <Row>
          <Col>
            <h3>{diaryEntry.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: diaryEntry.content }}>{}</p>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return(
    <div>
      <p>Loading...</p>
    </div>
    )
  }
};

export default Entry;

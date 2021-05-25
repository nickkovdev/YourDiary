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
  },[]);

  function convertDate(date) {
    date = date +10800;
    let iso = new Date(date * 1e3).toISOString();
    let fulldate = iso.substr(0, 10);
    let time = iso.substr(11, 5);
    return time + " " + fulldate;
  }

  if (diaryEntry) {
    return (
      <Container>
        <Row>
          <Col>
            <h3>{diaryEntry.title}</h3>
            
            <p dangerouslySetInnerHTML={{ __html: diaryEntry.content }}>{}</p>
            <h5>Publish Time: {convertDate(diaryEntry.publishTime)}</h5>
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

import { useEffect, useState } from "react";
import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import EntryCard from "./EntryCard";
import { published } from "../../actions/entry";

const Published = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(published(id));
  });

  return (
    <Container>
      <Row className="justify-content-md-center">
        <EntryCard />
      </Row>
    </Container>
  );
};

export default Published;

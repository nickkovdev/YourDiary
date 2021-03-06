import { useEffect, useState } from "react";
import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import EntryCard from "./EntryCard";
import { drafts } from "../../actions/entry";
import { setEntryId } from "../../actions/editor";

const SearchPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(drafts());
  });

  return (
    <Container>
      <Row className="justify-content-md-center">
        <EntryCard />
      </Row>
    </Container>
  );
};

export default SearchPage;

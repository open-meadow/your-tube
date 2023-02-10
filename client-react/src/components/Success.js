import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useGlobalContext } from "context/context";

import "./success.css";

export default function Success(props) {
  const { show, setShow } = useGlobalContext();

  return (
    <Alert variant="success" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>Success!</Alert.Heading>
      <p>{props.message}</p>
    </Alert>
  );
}

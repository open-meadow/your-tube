import React from "react";
import Alert from "react-bootstrap/Alert";
import { useGlobalContext } from "context/context";

import "../styles/success.css";

export default function Success(props) {
  const { show, setShow } = useGlobalContext();

  return (
    <Alert
      variant="success"
      onClose={() => setShow(false)}
      dismissible
      transition
    >
      <Alert.Heading>Success!</Alert.Heading>
      <p>{props.message}</p>
    </Alert>
  );
}

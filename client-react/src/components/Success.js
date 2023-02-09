import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useGlobalContext } from "context/context";

export default function Success(props) {
  const {
    // Used to update playlist sidebar on add video
    show,
    setShow,
  } = useGlobalContext();

  if (show) {
    return (
      <Alert variant="success" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Success!</Alert.Heading>
        <p>{props.message}</p>
      </Alert>
    );
  }
}

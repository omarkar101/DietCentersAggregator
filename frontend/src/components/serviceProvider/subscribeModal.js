import React from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import styled from "styled-components";
import { subscribeClientToMealPlan } from "../../api/requests";

const SubscribeModal = (props) => {
  const { isOpen, onClose, onSubmit, mealPlanId } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Modal size='lg' show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Do you want to subscribe to this meal plan?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          Subscribe
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubscribeModal;

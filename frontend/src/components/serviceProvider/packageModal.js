import React from "react";
import { Button, Modal, Card, ListGroup, ListGroupItem } from "react-bootstrap";

const PackageModal = (props) => {
  const { isOpen, onClose, packageItems } = props;

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Package Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {packageItems?.map((item) => (
          <Card key={item.id} style={{ marginBottom: 20, padding: 15 }}>
            <Card.Img
              variant="top"
              src={item.imagelink}
              alt="image"
              width={100}
              height={100}
            />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <ListGroup className="flush">
                <ListGroupItem>Price: {item.price}</ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PackageModal;

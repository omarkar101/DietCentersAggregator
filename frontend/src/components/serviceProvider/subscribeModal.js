import React from "react";
import { Button, Modal, Card } from "react-bootstrap";


const SubscribeModal = (props) => {
  const { isOpen, onClose, onSubmit, mealPlan, items } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(mealPlan);
  };
  console.log('mealPlan:', mealPlan);

  return (
    <Modal size="lg" show={isOpen} onHide={onClose} onClose={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Package Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {items?.map((item) => (
          <Card key={item.id} style={{ marginBottom: 20, padding: 15 }}>
            <Card.Img
              variant="top"
              src={item.image_url}
              alt="image"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "250px",
                width: "100%"
              }}
            />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              {/* <ListGroup className="flush">
                <ListGroupItem>Price: {item.price}</ListGroupItem>
              </ListGroup> */}
            </Card.Body>
          </Card>
        ))}
      </Modal.Body>
      <Modal.Header>
        <Modal.Title>Do you want to subscribe to this meal plan?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {mealPlan && mealPlan.meal_plan_uses && 
        <div>
          Meals Per Month: {mealPlan.meal_plan_uses}
        </div>}
      {mealPlan && 
          <div>
            Price Per Month: ${mealPlan.price}
          </div>
      }
        <div>
          Payment will be cash on the first delivery.
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Subscribe
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubscribeModal;

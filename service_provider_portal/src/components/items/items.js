import { useCallback, useState } from "react";
import { Button, Table } from "react-bootstrap";
import styled from "styled-components";
import ItemModal from "./item_modal";

const Items = () => {

  const [modalOpen, setModalOpen] = useState(false);
  console.log('MODALOPEN:', modalOpen);

  const toggleOpenModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const toggleModalOnSubmit = useCallback(() => {
    console.log('SUBMITTED');
    setModalOpen(false);
  }, []);

  const toggleModalOnClose = useCallback(() => {
    console.log('CLOSED');
    setModalOpen(false);
  }, []);

  return (
    <>
      <Container>
        <ItemModal isOpen={modalOpen} onClose={toggleModalOnClose} onSubmit={toggleModalOnSubmit} />
        <Button variant="success" onClick={toggleOpenModal}>Add Item</Button>
        <Table striped bordered hover>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
          <tr>
            <td>Burger</td>
            <td>Fast Food</td>
            <td>This is food</td>
          </tr>
        </Table>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin: 10px 10px 10px 10px;
  th, tr {
    text-align: center;
  }
`;

export default Items;

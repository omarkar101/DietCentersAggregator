import { Button, Table } from "react-bootstrap";
import styled from "styled-components";

const Items = () => {

  return (
    <>
      <Container>
        <Button variant="success">Add Item</Button>
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

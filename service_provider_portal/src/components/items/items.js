import { useCallback, useReducer, useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import styled from "styled-components";
import ItemModal from "./item_modal";
import { getAllItems } from "../../api/requests";

const reducer = (state, action) => {
  switch (action.type) {
    case "get-all-items":
      return { modalOpen: false, items: action.items };
    case "open-add-item-modal":
      return {
        modalOpen: true,
        // selectedItemId: null,
        selectedItemDescription: action.itemDescription,
        selectedItemName: action.itemName,
        selectedItemCategory: action.itemCategory,
      };
    case "submit-add-item-modal":
      return {
        modalOpen: false,
        selectedItemDescription: action.itemDescription,
        selectedItemName: action.itemName,
        selectedItemCategory: action.itemCategory,
      };
    case "delete-item":
      return {};
    case "open-edit-item-modal":
      return {
        modalOpen: true,
        selectedItemDescription: action.itemDescription,
        selectedItemName: action.itemName,
      };
    case "submit-edit-item-modal":
      return {
        modalOpen: false,
        selectedItemDescription: action.itemDescription,
        selectedItemName: action.itemName,
        selectedItemId: action.itemId,
      };
    case "close-item-modal":
      return {
        modalOpen: false,
        selectedItemDescription: null,
        selectedItemName: null,
        selectedItemId: null,
      };
    default:
      throw new Error();
  }
};

const Items = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    modalOpen: false,
    selectedItemId: null,
    selectedItemDescription: null,
    selectedItemCategory: null,
    selectedItemName: null,
  });

  const items = [
    { name: "Item 1", description: "This is item 1", categories: "This is category 1" },
    { name: "Item 2", description: "This is item 2", categories: "This is category 2" },
    { name: "Item 3", description: "This is item 3", categories: "This is category 3" },
  ];

  // useEffect(() => {
  //   getAllItems()
  //     .then((response) => {
  //       if (response.data.success) {
  //         dispatch({ type: "get-all-items", items: response.data.items }); // remove constant items array and add items to state
  //       } else {
  //         alert(response.data.message);
  //       }
  //     })
  //     .catch((e) => {
  //       alert(e);
  //     });
  // }, []);

  const toggleDeleteItem = useCallback((e) => {
    console.log("delete");
    dispatch({ type: "delete-item" });
  }, []);

  const toggleOpenModal = useCallback((e) => {
    // const itemId = e.target.id;
    const itemName = e.target.dataset.itemname;
    const itemDescription = e.target.dataset.itemdescription;
    const itemCategory = e.target.dataset.itemcategory;
    dispatch({
      type: "open-add-item-modal",
      itemDescription: itemDescription,
      itemName: itemName,
      itemCategory: itemCategory,
    });
  }, []);

  const toggleModalOnSubmit = useCallback(() => {
    dispatch({ type: "close-item-modal" });
  }, []);

  const toggleModalOnClose = useCallback(() => {
    dispatch({ type: "close-item-modal" });
  }, []);

  return (
    <>
      <Container>
        <ItemModal
          isOpen={state.modalOpen}
          onClose={toggleModalOnClose}
          onSubmit={toggleModalOnSubmit}
          itemName={state.selectedItemName}
          itemDescription={state.selectedItemDescription}
          itemCategory={state.selectedItemCategory}
        />
        <Button
          variant="success"
          data-itemName=""
          data-itemDescription=""
          data-itemCategory=""
          onClick={toggleOpenModal}
        >
          Add Item
        </Button>
        <Table striped bordered hover>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
          {items?.map((item, index) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.categories}</td>
              <td>{item.description}</td>
              <td>
                <div className="mb-2">
                  <Button
                    id={index}
                    data-itemName={item.name}
                    data-itemDescription={item.description}
                    data-itemCategory={item.categories}
                    variant="primary"
                    size="sm"
                    onClick={toggleOpenModal}
                  >
                    Edit
                  </Button>
                  <Button
                    id={index}
                    variant="danger"
                    size="sm"
                    onClick={toggleDeleteItem}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 10px 10px 10px 10px;
  th,
  tr {
    text-align: center;
  }
`;

export default Items;

import { useCallback, useReducer, useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import styled from "styled-components";
import ItemModal from "./item_modal";
import { addOneItem, getAllItems } from "../../api/requests";

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
        selectedItemDescription: "",
        selectedItemName: "",
        selectedItemCategory: "",
        items: action.items,
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
        selectedItemDescription: "",
        selectedItemName: "",
        selectedItemId: "",
      };
    default:
      throw new Error();
  }
};

const Items = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    modalOpen: false,
    selectedItemId: "",
    selectedItemDescription: "",
    selectedItemCategory: "",
    selectedItemName: "",
    items: [],
  });

  useEffect(() => {
    getAllItems()
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: "get-all-items", items: response.data.items });
        } else {
          alert(response.data.message);
        }
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  const toggleModalOnSubmit = (itemName, itemDescription, itemCategory) => {
    console.log("HANDLE SUBMITTTT");
    addOneItem(itemName, itemDescription, itemCategory)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: "submit-add-item-modal", items: response.data.items });
        } else {
          alert(response.data.message);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const toggleDeleteItem = useCallback((e) => {
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

  const toggleModalOnClose = useCallback(() => {
    dispatch({ type: "close-item-modal" });
  }, []);

  console.log("ITEMS:", state.items);

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
          variant='success'
          data-itemname=''
          data-itemdescription=''
          data-itemcategory=''
          onClick={toggleOpenModal}>
          Add Item
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.items?.map((item, index) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>
                  <div className='mb-2'>
                    <Button
                      id={index}
                      data-itemName={item.name}
                      data-itemDescription={item.description}
                      data-itemCategory={item.category}
                      variant='primary'
                      size='sm'
                      onClick={toggleOpenModal}>
                      Edit
                    </Button>
                    <Button id={index} variant='danger' size='sm' onClick={toggleDeleteItem}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
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

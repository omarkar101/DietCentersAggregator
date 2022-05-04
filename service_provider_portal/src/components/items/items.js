import { useCallback, useReducer, useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import styled from "styled-components";
import ItemModal from "./item_modal";
import {
  addOneItem,
  changeMealAvailability,
  deleteOneItem,
  editOneItem,
  getAllItems,
} from "../../api/requests";

const reducer = (state, action) => {
  switch (action.type) {
    case "get-all-items":
      return { ...state, modalOpen: false, items: action.items };
    case "open-add-item-modal":
      return {
        ...state,
        modalOpen: true,
        selectedItemId: null,
        selectedItemDescription: action.itemDescription,
        selectedItemName: action.itemName,
        selectedItemCategory: action.itemCategory,
      };
    case "submit-add-item-modal":
      return {
        ...state,
        modalOpen: false,
        selectedItemDescription: "",
        selectedItemName: "",
        selectedItemCategory: "",
        items: action.items,
      };
    case "delete-item":
      return {
        ...state,
        items: action.items,
      };
      case "change-item-availability":
        return {
          ...state,
          items: action.items,
        };
    case "open-edit-item-modal":
      return {
        ...state,
        modalOpen: true,
        selectedItemId: action.itemId,
        selectedItemDescription: action.itemDescription,
        selectedItemName: action.itemName,
        selectedItemCategory: action.itemCategory,
      };
    case "submit-edit-item-modal":
      return {
        ...state,
        modalOpen: false,
        selectedItemId: null,
        selectedItemDescription: "",
        selectedItemName: "",
        selectedItemCategory: "",
        items: action.items,
      };
    case "close-item-modal":
      return {
        ...state,
        modalOpen: false,
        selectedItemDescription: "",
        selectedItemName: "",
        selectedItemCategory: "",
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
    selectedItemImgUrl: "",
    items: [],
  });

  useEffect(() => {
    getAllItems()
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: "get-all-items", items: response.data.items });
        } else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const toggleModalOnSubmit = (
    itemName,
    itemDescription,
    itemCategory,
    image
  ) => {
    if (state.selectedItemId == null) {
      addOneItem(itemName, itemDescription, itemCategory)
        .then((response) => {
          if (response.data.success) {
            dispatch({
              type: "submit-add-item-modal",
              items: response.data.items,
            });
          } else {
            console.log(response.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      editOneItem(
        state.selectedItemId,
        itemName,
        itemDescription,
        itemCategory,
        image
      )
        .then((response) => {
          if (response.data.success) {
            dispatch({
              type: "submit-edit-item-modal",
              items: response.data.items,
            });
          } else {
            console.log(response.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const toggleDeleteItem = useCallback((e) => {
    const itemId = e.target.id;
    deleteOneItem(itemId)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: "delete-item", items: response.data.items });
        } else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const toggleMealAvailability = useCallback((e) => {
    const itemId = e.target.id;
    changeMealAvailability(itemId)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: "change-item-availability", items: response.data.items });
        } else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const toggleOpenAddItemModal = useCallback((e) => {
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

  const toggleOpenEditItemModal = useCallback((e) => {
    const itemId = e.target.id;
    const itemName = e.target.dataset.itemname;
    const itemDescription = e.target.dataset.itemdescription;
    const itemCategory = e.target.dataset.itemcategory;
    dispatch({
      type: "open-edit-item-modal",
      itemId: itemId,
      itemDescription: itemDescription,
      itemName: itemName,
      itemCategory: itemCategory,
    });
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
          itemImgUrl={state.selectedItemImgUrl}
        />
        <Button
          variant="success"
          data-itemname=""
          data-itemdescription=""
          data-itemcategory=""
          onClick={toggleOpenAddItemModal}
        >
          Add Item
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
              <th>Availability</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {state.items?.map((item) => (
              <tr>
                <td>
                  <img
                    src={item.image_url}
                    alt="item img"
                    width={"100px"}
                    height={"100px"}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>
                  <div className="mb-2">
                    <Button
                      id={item.id}
                      data-itemName={item.name}
                      data-itemDescription={item.description}
                      data-itemCategory={item.category}
                      variant="primary"
                      size="sm"
                      onClick={toggleOpenEditItemModal}
                    >
                      Edit
                    </Button>
                    <Button
                      id={item.id}
                      variant="danger"
                      size="sm"
                      onClick={toggleDeleteItem}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
                <td>{item.isavailable? "Available" : "Not Available"}</td>
                <td>
                  <div className="mb-2">
                  <Button
                      id={item.id}
                      // variant="success"
                      variant = {item.isavailable? "danger" : "success"}
                      size="sm"
                      onClick={toggleMealAvailability}
                    >
                      {item.isavailable? 'Remove' : 'Add'}
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

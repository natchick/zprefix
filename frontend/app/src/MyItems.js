import React, { useState, useEffect, useContext } from 'react';
import './App.css';

export const Items = () => {
    const [newItemName, setNewItemName] = useState('');
    const [newItemDescription, setNewItemDescription] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState(0);
    const [updatedItemName, setUpdatedItemName] = useState('');
    const [updatedItemDescription, setUpdatedItemDescription] = useState('');
    const [updatedItemQuantity, setUpdatedItemQuantity] = useState(0);
    const [userID, setUserId] = useState('visitor')
    const [data, setData] = useState([]);
    const [itemID, setItemID] = useState(0);

const getItems = () => {
        return fetch('http://localhost:8085/items/')
        .then(res => res.json())
        .then(data => setData(data))
    } 

//displays items based on user or all for visitor
useEffect(() => {
    if(userID == 'visitor'){
        fetch('http://localhost:8085/items/')
        .then(res => res.json())
        .then(data => setData(data))
    } else {
        fetch(`http://localhost:8085/items/user/${userID}`)
        .then(res => res.json())
        .then(data => setData(data))
    }
},[data])

const addItem = (item) => {
    fetch('http://localhost:8085/items/', {
        method: 'POST',
        body: JSON.stringify({
            Item_Name: newItemName,
            Description: newItemDescription,
            Quantity: newItemQuantity,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }
        // .then(() => {
        //     getItems().then((data) => setData(data));
        //     setNewItemName('');
        //     setNewItemDescription('');
        //     setNewItemQuantity('');
        // })
        // .catch((error) => console.error('Error adding item:', error));
        // }

const deleteItem = (id) => {
    fetch(`http://localhost:8085/items/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error('Network response not ok');
            }
            return response.json();
        })
        .then(() => {
            getItems().then((data) => setData(data));
        })
        .catch((error) => console.error('Error deleting item:', error));
    };
    

const updateItem = () => {
    if (itemID) {
        fetch(`http://localhost:8085/items/${itemID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Item_Name: newItemName,
                Description: updatedItemDescription,
                Quantity: updatedItemQuantity
            })
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
    }
}

return (
    <div className="App">
      <div className="item-list">
        <h1>Your Items</h1>
        <ul>
          {data?.map((data) => (
            <li key={data.id}>
              <span>{data.Item_Name}</span>
              <span>{data.Description}</span>
              <span>{data.Quantity}</span>
              <button onClick={() => deleteItem(data.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="add-item-section">
        <h2>Add Item</h2>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="New Item Name"
        />
        <input
          type="text"
          value={newItemDescription}
          onChange={(e) => setNewItemDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="text"
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(e.target.value)}
          placeholder="Quantity"
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <div className="update-section">
        <h2>Update Items</h2>
        <select
          value={itemID}
          onChange={(e) => setItemID(e.target.value)}
        >
          <option value="" disabled>Select Item</option>
          {data?.map((item) => (
            <option key={item.id} value={item.id}>{item.Item_Name}</option>
          ))}
        </select>
        <input
          type="text"
          value={updatedItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="New Item Name"
        />
        <input
          type="text"
          value={updatedItemDescription}
          onChange={(e) => setUpdatedItemDescription(e.target.value)}
          placeholder="New Description"
        />
        <input
          type="text"
          value={updatedItemQuantity}
          onChange={(e) => setUpdatedItemQuantity(e.target.value)}
          placeholder="New Quantity"
        />
        <button onClick={updateItem}>Update</button>
      </div>
    </div>
  );

}
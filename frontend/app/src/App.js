
import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './Login.js';



const App = () => {
  const[items, setItems] = useState([]);
  const[users,setUsers] = useState([]);
  const[newItem, setNewItem] = useState({});

  useEffect(() => {


    const getItems = () => {
      return fetch('http://localhost:8085/items', {
          headers: {
              'Content-type': 'application.json; charset=UTR-8',
          },
      })
      .then((response) => response.json())
  }
    getItems()
      .then((data) => setItems(data))
      .catch((error) => console.error('There is an error fetching new items', error));
  }, []);

return(
  <main className = "App">
    <Login></Login>
    <div className="app">
    <div className="Inventory">
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.UserId}</span>
            <span>{item.Item_name}</span>
            <span>{item.Description}</span>
            <span>{item.Quantity}</span>
          </li>
    ))}
      </ul>
    </div>
  </div>
  </main>
)
}

export default App;

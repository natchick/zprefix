import './App.css';
import React, { useState, useEffect } from 'react';
import { Home } from './Home.js';
import { Register } from './Register.js';
import { BrowserRouter as Router, Routes, Route, Switch, Link, useNavigate } from 'react-router-dom' ;
import { Items } from './MyItems.js';
import Login from './Login.js';
import useToken from './useToken.js';

function App() {
  // const { token, setToken } = useToken();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
    <div className="app">
        <div className='links'>
          <Link to='/' className='NavBar'>Home </Link>
          <Link to='/Login' className='NavBar'>Login </Link>
          <Link to='/Register' className='NavBar'>Create Account </Link>
          {/* <Link to='/Items' className='NavBar'>Items </Link> */}
        </div>
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Items' element={<Items />} />
          {/* <Route path='/Items' element={<Items />} />
           <Route path='/MyItems' element={<MyItems />} /> */}
          </Routes>
      </div>
    
  );
}

export default App;















// import './App.css';
// import React, { useState, useEffect } from 'react';
// import LoginPage from './LoginPage.js';
// import { Home } from './Home.js';
// import { Register } from './Register.js';
// import { BrowserRouter as Router, Routes, Route, Switch, Link, useNavigate } from 'react-router-dom' ;

// export const userContext = React.createContext();

// const App = () => {
//   const[items, setItems] = useState([]);
//   const[users,setUsers] = useState([]);
//   const[newItem, setNewItem] = useState({});
//   const[currentForm, setCurrentForm] = useState('login');

//   useEffect(() => {


//     const getItems = () => {
//       return fetch('http://localhost:8085/items', {
//           headers: {
//               'Content-type': 'application.json; charset=UTR-8',
//           },
//       })
//       .then((response) => response.json())
//   }
//     getItems()
//       .then((data) => setItems(data))
//       .catch((error) => console.error('There is an error fetching new items', error));
//   }, []);

// return(
//   <main className = "App">
//     <div className='links'>
//       <Link to='/' className='NavBar'>Home </Link>
//       <Link to='/Login' className='NavBar'>Login </Link>
//       <Link to='/Register' className='NavBar'>Create Account </Link>
//       <Link to='/Items' className='NavBar'>Items </Link>
//       <Link to='/MyItems' className='NavBar'>My Items </Link>
//     </div>
//     <userContext.Provider>
//       <Routes>
//       <Route path='/' element={<Home />} />
//       <Route path='/Register' element={<Register />} />
//       <Route path='/Login' element={<LoginPage />} />
//       {/* <Route path='/Items' element={<Items />} />
//       <Route path='/MyItems' element={<MyItems />} /> */}
//       </Routes>
//     </userContext.Provider>

//   </main>
// )
// }

// export default App;







// <div className="app">
// <div className="Inventory">
//   <h1>Items</h1>
//   <ul>
//     {items.map((item) => (
//       <li key={item.id}>
//         <span>User Id: {item.UserId} </span>
//         <span>Item Name: {item.Item_name} </span>
//         <span>Description: {item.Description} </span>
//         <span>Quantity: {item.Quantity} </span>
//       </li>
// ))}
//   </ul>
// </div>
// </div>
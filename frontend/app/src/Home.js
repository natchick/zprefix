import { useState, useEffect, useContext } from 'react';

export const Home = () => {
    const [items, setItems] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8085/items')
        .then(res=> res.json())
        .then((data) => {setItems(data)})
    }, [])

    return !items ? null: ((
        <div className='items'>
            <h1>Items</h1>
            <div className="table-container">
                <table>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Description</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.Item_Name}</td>
                                    <td>{item.Description}</td>
                                    <td>{item.Quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                </table>
            </div>
        </div>
    ))
}


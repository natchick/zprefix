

export const getItems = () => {
    return fetch('http://localhost:8085/items', {
        headers: {
            'Content-type': 'application.json; charset=UTR-8',
        },
    })
    .then((response) => response.json())
}

export const addItem = (itemData) => {
    return fetch('http://localhost:8085/items', {
        method: 'POST' ,
        headers: {'Content-Type': 'application/json', } ,
        body: JSON.stringify(itemData),
    })
};
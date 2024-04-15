const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

const Item = []

const itemsData = [
    [1, 1, 1, "John", "2024-04-12 15:51:00.000", "Product A", 2, 10, true],
    [2, 2, 2, "Alice", "2024-04-12 11:51:00.000", "Product B", 1, 20, true],
    [3, 3, 3, "Bob", "2024-04-12 17:51:00.000", "Product C", 3, 15, true]
];

let salesData = [
    {
        productName: "name1",
    },
    {
        productName: "name2"
    },
    {
        productName: "name3"
    }
];

app.get('/items-with-person-and-sale-data', (req, res) => {
    res.status(200).json({ items: itemsData });
});

app.post('/save-new-sale', (req, res) => {
    const saleData = req.body;
    //salesData.push(saleData);
    console.log('Received new sale data:', saleData);
    console.log(saleData.personModel.personName)
    let counter = 3; // Counter inicializálása
    for (const valtozo in saleData.itemModels) {
        const Item = []; // Új Item létrehozása minden iterációban

        // Item tulajdonságainak beállítása
        Item[0] = counter + 1; // Az index növelése 1-gyel
        Item[1] = 32; // Fix érték
        Item[2] = Math.floor(Math.random() * 10); // Véletlenszerű érték 0 és 9 között
        Item[3] = saleData.personModel.personName; // A personName beállítása
        Item[4] = "2024-04-12 17:51:00.000"; // Állandó dátum
        Item[5] = saleData.itemModels[valtozo].productName; // productName beállítása
        Item[6] = saleData.itemModels[valtozo].quantity; // quantity beállítása
        Item[7] = 10; // Beégetett érték

        // Elem hozzáadása az itemsData tömbhöz
        itemsData.push(Item);

        // Counter növelése
        counter++;
    }
    res.status(200).json({message: 'Sale data saved successfully!'});
});

app.get('/productInfo', (req, res) => {
    res.status(200).json(salesData);
});











app.post('/api/update-item', (req, res) => {
    const updatedItem = req.body;
    const index = itemsData.findIndex(itemArray => itemArray[0] === updatedItem.itemId);
    if (index !== -1) {
        itemsData[index][0] = updatedItem.itemId;
        itemsData[index][1] = updatedItem.saleId;
        itemsData[index][2] = updatedItem.productId;
        itemsData[index][3] = updatedItem.personName;
        itemsData[index][4] = updatedItem.datetime;
        itemsData[index][5] = updatedItem.productName;
        itemsData[index][6] = updatedItem.quantity;
        itemsData[index][7] = updatedItem.price;
        res.json({ message: 'Item updated successfully' });
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});


//TODO: majd javítani
app.post('/api/close-item', (req, res) => {
    const updatedItem = req.body;
    const index = itemsData.findIndex(item => item.itemId === updatedItem.itemId);
    if (index !== -1) {
        itemsData[index].editable = false;
        res.status(200).json({ message: 'Item closed successfully!' });
    } else {
        res.status(404).json({ message: 'Item not found!' });
    }
});

app.post('/api/delete-item', (req, res) => {
    const deletedItem = req.body;
    const index = itemsData.findIndex(itemArray => itemArray[0] === deletedItem.itemId);
    if (index !== -1) {
        itemsData.splice(index, 1);
        res.status(200).json({ message: 'Item deleted successfully!' });
    } else {
        res.status(404).json({ message: 'Item not found!' });
    }
});






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

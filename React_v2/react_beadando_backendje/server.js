const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

const Item = []

const itemsData = [
    [1, 1, 1, "John", "2024-04-12 15:51:00.000", "Product A", 2, 1335, true],
    [2, 2, 2, "Alice", "2024-04-12 11:51:00.000", "Product B", 1, 780, true],
    [3, 3, 3, "Bob", "2024-04-12 17:51:00.000", "Product C", 3, 2490, true],
    [4, 3, 3, "Alice", "2024-06-12 17:51:00.000", "Product E", 3, 2970, true],
    [5, 3, 3, "Josh", "2024-04-12 17:51:00.000", "Product B", 3, 2164, true]
];

let salesData = [
    {productName: "Product A"},
    {productName: "Product B"},
    {productName: "Product C"},
    {productName: "Product D"},
    {productName: "Product E"}
];

app.get('/items-with-person-and-sale-data', (req, res) => {
    res.status(200).json({items: itemsData});
});

app.post('/save-new-sale', (req, res) => {
    const saleData = req.body;
    let counter = 5;
    for (const valtozo in saleData.itemModels) {
        const Item = [];

        const currentDate = new Date();
        const x = `${currentDate.getFullYear()}-
        ${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-
        ${currentDate.getDate().toString().padStart(2, '0')} 
        ${currentDate.getHours().toString().padStart(2, '0')}:
        ${currentDate.getMinutes().toString().padStart(2, '0')}:
        ${currentDate.getSeconds().toString().padStart(2, '0')}.
        ${currentDate.getMilliseconds().toString().padStart(3, '0')}`;

        Item[0] = counter + 1;
        Item[1] = 32; // Itt most nincs jelentősége.
        Item[2] = Math.floor(Math.random() * 10); // Itt most nincs jelentősége.
        Item[3] = saleData.personModel.personName; // personName
        Item[4] = x; // current date
        Item[5] = saleData.itemModels[valtozo].productName; // productName
        Item[6] = saleData.itemModels[valtozo].quantity; // quantity
        Item[7] = Item[6] * Math.floor(Math.random() * 1000); // price (nyílván kamu price, de nincs jelentősége itt)

        itemsData.push(Item);
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
        res.json({message: 'Item updated successfully'});
    } else {
        res.status(404).json({error: 'Item not found'});
    }
});

closedItemsData = [];
app.post('/api/close-item', (req, res) => {
    const updatedItem = req.body;
    const index = itemsData.findIndex(itemArray => itemArray[0] === updatedItem.itemId);
    if (index !== -1) {
        //kell másolni is
        const currentDate = new Date();
        itemsData[index][0] = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}.${currentDate.getMilliseconds().toString().padStart(3, '0')}`;
        closedItemsData.push(itemsData[index]);
        //töröljük
        itemsData.splice(index, 1);
        res.status(200).json({message: 'Item closed successfully!'});
    } else {
        res.status(404).json({message: 'Item not found!'});
    }
});

app.get('/closed-sale-table', (req, res) => {
    let xd = [];
    for (let i = 0; i < closedItemsData.length; i++) {
        xd.push([]);
    }
    let counter = 0;
    for (const item of closedItemsData) {
        console.log(counter);
        xd[counter][1] = item[3];
        xd[counter][2] = item[5];
        xd[counter][3] = item[6];
        xd[counter][4] = item[7];
        xd[counter][5] = item[4];
        xd[counter][6] = item[0]; //formattedDate;
        counter++;
    }
    res.status(200).json({items: xd});
});


app.post('/api/delete-item', (req, res) => {
    const deletedItem = req.body;
    const index = itemsData.findIndex(itemArray => itemArray[0] === deletedItem.itemId);
    if (index !== -1) {
        itemsData.splice(index, 1);
        res.status(200).json({message: 'Item deleted successfully!'});
    } else {
        res.status(404).json({message: 'Item not found!'});
    }
});

function reportFunction(X, Y) {

    const mergedTable = itemsData.concat(closedItemsData);

    const personConsumption = [];

    for (const item of mergedTable) {

        const dateString = item[4];
        const productQuantity = item[6];
        const productPrice = item[7];

        let selectedX = X;
        let selectedY = Y;

        switch (X) {
            case "personName":
                selectedX = item[3];
                break;
            case "productName":
                selectedX = item[5];
                break;
        }

        switch (Y) {
            case "totalCost":
                selectedY = productPrice;
                break;
            case "quantity":
                selectedY = productQuantity;
                break;
        }

        // Ellenőrizzük, hogy a személy már szerepel-e a personConsumption tömbben
        const existingPersonIndex = personConsumption.findIndex(entry => entry[0] === selectedX);

        const dateObj = new Date(dateString);
        const month = dateObj.getMonth() + 1; // A hónapok indexelése 0-tól indul, ezért hozzáadjuk az 1-et

        if (new Date().getMonth() + 1 === month) {
            // Ha a személy még nem szerepel, adjunk hozzá egy új tömböt a personConsumption-höz
            if (existingPersonIndex === -1) {
                if (X === "personName") {
                    personConsumption.push([selectedX, selectedY]);
                }
                if (X === "productName") {
                    personConsumption.push([selectedX, " ", selectedY]);
                }
            } else {
                // Ha a személy már szerepel, csak növeljük az összesített költséget
                if (X === "personName") {
                    personConsumption[existingPersonIndex][1] += selectedY;
                }
                if (X === "productName") {
                    personConsumption[existingPersonIndex][2] += selectedY;
                }
            }
        }

    }
    return personConsumption
}


app.get('/2feladat', (req, res) => {
    res.status(200).json({persons: reportFunction("personName", "totalCost")});
});


app.get('/3feladat', (req, res) => {
    res.status(200).json({sales: reportFunction("productName", "quantity")});
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

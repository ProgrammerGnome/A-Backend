import React, {useState, useEffect} from 'react';
import axios, {AxiosResponse} from 'axios';
import './ListAllSales.css';

interface Item {
    itemId: number;
    personId: number;
    saleId: number;
    personName: string;
    datetime: string;
    productName: string;
    quantity: number;
    price: number;
    editable: boolean;
}

const ListAllSales: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetchItemsWithPersonAndSaleData();
    }, []);


    const fetchItemsWithPersonAndSaleData = () => {
        axios.get('/items-with-person-and-sale-data', {
            baseURL: 'http://localhost:8080',
        })
            .then((response: AxiosResponse<{ items: Item[][] }>) => {
                const mappedItems: {
                    personName: unknown;
                    itemId: unknown;
                    datetime: unknown;
                    quantity: unknown;
                    saleId: unknown;
                    price: unknown;
                    editable: boolean;
                    personId: unknown;
                    productName: unknown
                }[] = response.data.items.map((item: unknown[]) => ({
                    itemId: item[0],
                    personId: item[1],
                    saleId: item[2],
                    personName: item[3] || '',
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    datetime: convertToDateTime(item[4] || ''),
                    productName: item[5] || '',
                    quantity: item[6] || 0,
                    price: item[7] || 0,
                    editable: false
                }));
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setItems(mappedItems);
                //TODO:
                console.log("mappedItems", mappedItems);
                console.log("response.data", response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const convertToDateTime = (datetime: string): string => {
        const date = new Date(datetime);
        return date.toISOString().slice(0, 16);
    };

    const editItem = (item: Item) => {
        if (!item.editable) {
            const updatedItems = items.map((i: Item) => {
                if (i.itemId === item.itemId && i.saleId === item.saleId) {
                    return {...i, editable: true};
                }
                return i;
            });
            setItems(updatedItems);
        } else {
            const updatedItem: Item = {
                itemId: item.itemId,
                personId: item.personId,
                saleId: item.saleId,
                personName: item.personName,
                datetime: item.datetime,
                productName: item.productName,
                quantity: item.quantity,
                price: item.price,
                editable: false // No need to send editable status
            };

            axios.post('/api/update-item', updatedItem, {
                baseURL: 'http://localhost:8080',
            })
                .then(() => {
                    console.log('Mentés:', updatedItem);
                    const updatedItems = items.map((i: Item) => {
                        if (i.itemId === updatedItem.itemId && i.saleId === updatedItem.saleId) {
                            return {...i, editable: false};
                        }
                        return i;
                    });
                    setItems(updatedItems);
                    alert('Sikeres módosítás!');
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const deleteItem = (item: Item) => {
        if (!item.editable) {
            const updatedItem: Item = {
                itemId: item.itemId,
                personId: item.personId,
                saleId: item.saleId,
                personName: item.personName,
                productName: item.productName,
                quantity: item.quantity,
                price: item.price,
                datetime: item.datetime,
                editable: true
            };

            axios.post('/api/delete-item', updatedItem, {
                baseURL: 'http://localhost:8080',
            })
                .then(() => {
                    console.log('Törlés:', updatedItem);
                    const updatedItems = items.filter((i: Item) => !(i.itemId === updatedItem.itemId && i.saleId === updatedItem.saleId));
                    setItems(updatedItems);
                    alert('Sikeres törlés!');
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            const updatedItems = items.filter((i: Item) => !(i.itemId === item.itemId && i.saleId === item.saleId));
            setItems(updatedItems);
        }
    };

    const closeItem = (item: Item) => {
        if (!item.editable) {
            const updatedItem: Item = {
                itemId: item.itemId,
                personId: item.personId,
                saleId: item.saleId,
                personName: item.personName,
                productName: item.productName,
                quantity: item.quantity,
                price: item.price,
                datetime: item.datetime,
                editable: true
            };

            axios.post('/api/close-item', updatedItem, {
                baseURL: 'http://localhost:8080',
            })
                .then(() => {
                    console.log('Lezárás:', updatedItem);
                    const updatedItems = items.map((i: Item) => {
                        if (i.itemId === updatedItem.itemId && i.saleId === updatedItem.saleId) {
                            return {...i, editable: false};
                        }
                        return i;
                    });
                    setItems(updatedItems);
                    alert('Sikeres lezárás!');
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            const updatedItems = items.map((i: Item) => {
                if (i.itemId === item.itemId && i.saleId === item.saleId) {
                    return {...i, editable: false};
                }
                return i;
            });
            setItems(updatedItems);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, item: Item, field: string) => {
        const value = e.target.value;
        const updatedItems = items.map(i => {
            if (i.itemId === item.itemId && i.saleId === item.saleId) {
                return {...i, [field]: value};
            }
            return i;
        });
        setItems(updatedItems);
    };

    return (

        <div>
            <br/>
            <h4><p className="sales-title">Lezajlott, de még nem lezárt értékesítések</p></h4>
            <p>
                A lezajlott, de még nem lezárt rendeléseket itt tudja megtekinteni és módosítani, lezárni és
                törölni.
                Ez a felsorolás a vásárlás pontos ideje szerint van rendezve (legújabbak felül). <br/>
                Ha szeretne utólag új terméket felvenni egy értékesítéshez, kövesse az alábbiakat: <br/>
                Adja hozzá azokat az oldal címére kattintva, majd itt a táblázatban legfelűl fog megjelenni,
                és módosíthatja megfelelőre a dátumidejét.
            </p>
            <table className="table">
                <thead>
                <tr>
                    <th>
                        <center>Dolgozó neve</center>
                    </th>
                    <th>
                        <center>Vásárlás pontos ideje</center>
                    </th>
                    <th>
                        <center>Terméknév</center>
                    </th>
                    <th>
                        <center>Mennyiség</center>
                    </th>
                    <th>
                        <center>Végösszeg</center>
                    </th>
                    <th>
                        <center>Műveletek</center>
                    </th>
                </tr>
                </thead>
                <tbody>

                {items.map((item: Item) => {
                    if (item.itemId !== undefined && item.saleId !== undefined) {
                        return (
                            <tr key={`${item.itemId}-${item.saleId}`}>
                                <td><input type="text" value={item.personName} readOnly={!item.editable}
                                           onChange={(e) => handleInputChange(e, item, 'personName')}/></td>
                                <td><input type="datetime-local" value={item.datetime} readOnly={!item.editable}
                                           onChange={(e) => handleInputChange(e, item, 'datetime')}/></td>
                                <td><input type="text" value={item.productName} readOnly={!item.editable}
                                           onChange={(e) => handleInputChange(e, item, 'productName')}/></td>
                                <td><input type="number" value={item.quantity} readOnly={!item.editable}
                                           onChange={(e) => handleInputChange(e, item, 'quantity')}/></td>
                                <td><input type="number" value={item.price} readOnly={!item.editable}
                                           onChange={(e) => handleInputChange(e, item, 'price')}/></td>
                                <td>
                                    <button onClick={() => editItem(item)}>
                                        {item.editable ? 'Mentem a módosítást' : 'Módosítás'}
                                    </button>
                                    <button onClick={() => closeItem(item)}>
                                        {item.editable ? 'Mindnképp lezárom' : 'Lezárás'}
                                    </button>
                                    <button onClick={() => deleteItem(item)}>
                                        {item.editable ? 'Mindenképp törlöm' : 'Törlés'}
                                    </button>
                                </td>
                            </tr>
                        );
                    } else {
                        // Ha valamelyik azonosító érvénytelen, ne jelenítsük meg az elemet
                        return null;
                    }
                })}

                </tbody>
            </table>
        </div>

    );
};

export default ListAllSales;

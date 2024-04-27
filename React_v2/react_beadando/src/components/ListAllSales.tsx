import React from 'react';
import {listAllSalesCore} from './ListAllSalesCore.tsx';
import './ListAllSales.css';

const ListAllSales: React.FC = () => {
    const {
        items,
        editItem,
        closeItem,
        deleteItem
    } = listAllSalesCore();

    return (
        <div className="container mx-auto px-4">
            <h2 className="title"><br></br>Lezajlott, de még nem lezárt értékesítések<p></p></h2>
            <p>
                A lezajlott, de még nem lezárt rendeléseket itt tudja megtekinteni és módosítani, lezárni és
                törölni.
                Ez a felsorolás a vásárlás pontos ideje szerint van rendezve (legújabbak felül). <br/>
                Ha szeretne utólag új terméket felvenni egy értékesítéshez, kövesse az alábbiakat: <br/>
                Adja hozzá azokat <a href="/new-sale">ide</a> kattintva, majd itt a táblázatban legfelűl fog megjelenni,
                és módosíthatja megfelelőre a dátumidejét.
            </p>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                    <thead>
                    <tr>
                        <th className="p-4 text-center">Dolgozó neve</th>
                        <th className="p-4 text-center">Vásárlás pontos ideje</th>
                        <th className="p-4 text-center">Terméknév</th>
                        <th className="p-4 text-center">Mennyiség</th>
                        <th className="p-4 text-center">Végösszeg</th>
                        <th className="p-4 text-center">Műveletek</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <tr key={`${item.itemId}-${item.saleId}`}>
                            <td className="p-4">
                                <input
                                    type="text"
                                    value={item.personName}
                                    readOnly={item.editable}
                                    onChange={(e) => editItem({...item, personName: e.target.value})}
                                    className="w-full p-2 border rounded"
                                />
                            </td>
                            <td className="p-4">
                                <input
                                    type="datetime-local"
                                    value={item.datetime}
                                    readOnly={item.editable}
                                    onChange={(e) => editItem({...item, datetime: e.target.value})}
                                    className="w-full p-2 border rounded"
                                />
                            </td>
                            <td className="p-4">
                                <input
                                    type="text"
                                    value={item.productName}
                                    readOnly={item.editable}
                                    onChange={(e) => editItem({...item, productName: e.target.value})}
                                    className="w-full p-2 border rounded"
                                />
                            </td>
                            <td className="p-4">
                                <input
                                    type="number"
                                    value={item.quantity}
                                    readOnly={item.editable}
                                    onChange={(e) => editItem({...item, quantity: parseInt(e.target.value)})}
                                    className="w-full p-2 border rounded"
                                />
                            </td>
                            <td className="p-4">
                                <input
                                    type="number"
                                    value={item.price}
                                    readOnly={item.editable}
                                    onChange={(e) => editItem({...item, price: parseInt(e.target.value)})}
                                    className="w-full p-2 border rounded"
                                />
                            </td>
                            <td className="p-4">
                                <button
                                    onClick={() => closeItem(item)}
                                    className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    {item.editable ? 'Mindnképp lezárom' : 'Lezárás'}
                                </button>
                                <button
                                    onClick={() => deleteItem(item)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    {item.editable ? 'Mindenképp törlöm' : 'Törlés'}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <br></br>
            <a href="/" className="text-blue-500 hover:underline"> BACK || Vissza a főoldalra </a>
            <br></br>
        </div>
    );
};

export default ListAllSales;

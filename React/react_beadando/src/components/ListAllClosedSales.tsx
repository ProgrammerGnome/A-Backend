import React, {useState, useEffect} from 'react';
import axios, {AxiosResponse} from 'axios';
import './ListAllClosedSales.css';

interface Item {
    [index: number]: any;
}

const ListAllClosedSales: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetchItemsWithPersonAndSaleData();
    }, []);

    const fetchItemsWithPersonAndSaleData = () => {
        axios.get('/closed-sale-table', {
            baseURL: 'http://localhost:8080',
        })
            .then((response: AxiosResponse<{ items: Item[] }>) => {
                if (response.data.items) {
                    setItems(response.data.items);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <center>
            <div>
                <br/>
                <h4>Lezárt értékesítések</h4>
                <p>A lezárás pontos ideje szerint rendezve (legrégebben lezártak alul).</p>
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            <center>Dolgozó neve</center>
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
                            <center>Vásárlás pontos ideje</center>
                        </th>
                        <th>
                            <center>Lezárás pontos ideje</center>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <center>{item[1]}</center>
                            </td>
                            <td>
                                <center>{item[2]}</center>
                            </td>
                            <td>
                                <center>{item[3]}</center>
                            </td>
                            <td>
                                <center>{item[4]}</center>
                            </td>
                            <td>
                                <center>{item[5]}</center>
                            </td>
                            <td>
                                <center>{item[6]}</center>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </center>
    );
};

export default ListAllClosedSales;

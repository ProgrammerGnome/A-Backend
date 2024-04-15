import React from 'react';
import { useQuery } from 'react-query';
import {getBaseURL} from "../BacendConfig.ts";

interface Item {
    [index: number]: any;
}

const fetchItemsWithPersonAndSaleData = async () => {
    const response = await fetch(getBaseURL()+'closed-sale-table', {
        method: 'GET'
    });
    const data = await response.json();
    return data.items;
};

const ListAllClosedSales: React.FC = () => {
    const { data: items = [], isError, isLoading } = useQuery<Item[]>(
        'closedSales',
        fetchItemsWithPersonAndSaleData
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    return (
        <center>
            <div>
                <br />
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

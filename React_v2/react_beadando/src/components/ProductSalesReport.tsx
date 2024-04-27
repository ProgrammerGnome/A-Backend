import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import {getBaseURL} from "../BacendConfig.ts";

interface Sale {
    [index: number]: any;
}

const fetchProductQuantityByCurrentMonth = async () => {
    const response = await fetch(getBaseURL()+'3feladat', {
        method: 'GET',
    });
    const data = await response.json();
    return data.sales;
};

const ProductSalesReport: React.FC = () => {
    const { data: sales = [], isError, isLoading } = useQuery<Sale[]>(
        'productSales',
        fetchProductQuantityByCurrentMonth
    );

    const [currentMonth, setCurrentMonth] = useState<string>('');

    useEffect(() => {
        const currentDate = new Date();
        const monthNames = [
            'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
            'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
        ];
        setCurrentMonth(monthNames[currentDate.getMonth()]);
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    return (
        <center>
            <div>
                <h2><p className="title"><br></br>Termékek fogyásának riportja</p><p></p></h2>
                <p>Rendezve a fogyás mennyiségére fordítottan (legnagyobbak felül).</p>
                <h4>A jelenlegi hónap: {currentMonth}</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            <center>Terméknév</center>
                        </th>
                        <th>
                            <center>Fogyás mennyisége</center>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {sales.map((sale, index) => (
                        <tr key={index}>
                            <td>
                                <center>{sale[0]}</center>
                            </td>
                            <td>
                                <center>{sale[2]}</center>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <br></br>
            <a href="/" className="text-blue-500 hover:underline"> BACK || Vissza a főoldalra </a>
            <br></br>
        </center>
    );
};

export default ProductSalesReport;

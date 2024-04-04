import React, {useState, useEffect} from 'react';
import axios, {AxiosResponse} from 'axios';
import './ProductSalesReport.css';

interface Sale {
    [index: number]: any;
}

const ProductSalesReport: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [currentMonth, setCurrentMonth] = useState<string>('');

    useEffect(() => {
        fetchProductQuantityByCurrentMonth();
        const currentDate = new Date();
        const monthNames = [
            'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
            'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
        ];
        setCurrentMonth(monthNames[currentDate.getMonth()]);
    }, []);

    const fetchProductQuantityByCurrentMonth = () => {
        axios.get('/3feladat', {
            baseURL: 'http://localhost:8080',
        })
            .then((response: AxiosResponse<{ sales: Sale[] }>) => {
                setSales(response.data.sales);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <center>
            <div>
                <h2><p style={{color: 'white'}}>Termékek fogyásának riportja</p></h2>
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
        </center>
    );
};

export default ProductSalesReport;

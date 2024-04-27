import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import {getBaseURL} from "../BacendConfig.ts";

interface Person {
    [index: number]: any;
}

const fetchPersonSalesByCurrentMonth = async () => {
    const response = await fetch(getBaseURL()+'2feladat', {
        method: 'GET'
    });
    const data = await response.json();
    return data.persons;
};

const EmployeeConsumptionReport: React.FC = () => {
    const { data: persons = [], isError, isLoading } = useQuery<Person[]>(
        'personSales',
        fetchPersonSalesByCurrentMonth
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
                <h2><p className="title"><br></br>Dolgozói fogyasztásriport</p><p></p>
                    <p>Rendezve a dolgozók felhasználónevükre alfabetikusan.</p>
                </h2>
                <h4>A jelenlegi hónap: {currentMonth}</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            <center>Dolgozó neve</center>
                        </th>
                        <th>
                            <center>Fogyasztás értéke</center>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {persons.map((person, index) => (
                        <tr key={index}>
                            <td>
                                <center>{person[0]}</center>
                            </td>
                            <td>
                                <center>{person[1]}</center>
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

export default EmployeeConsumptionReport;

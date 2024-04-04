import React, {useState, useEffect} from 'react';
import axios, {AxiosResponse} from 'axios';
import './EmployeeConsumptionReport.css';

interface Person {
    [index: number]: any;
}

const EmployeeConsumptionReport: React.FC = () => {
    const [persons, setPersons] = useState<Person[]>([]);
    const [currentMonth, setCurrentMonth] = useState<string>('');

    useEffect(() => {
        fetchPersonSalesByCurrentMonth();
        const currentDate = new Date();
        const monthNames = [
            'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
            'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
        ];
        setCurrentMonth(monthNames[currentDate.getMonth()]);
    }, []);

    const fetchPersonSalesByCurrentMonth = () => {
        axios.get('/2feladat', {
            baseURL: 'http://localhost:8080',
        })
            .then((response: AxiosResponse<{ persons: Person[] }>) => {
                setPersons(response.data.persons);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <center>
            <div>
                <h2><p style={{color: 'white'}}>Dolgozói fogyasztásriport</p></h2>
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
        </center>
    );
};

export default EmployeeConsumptionReport;

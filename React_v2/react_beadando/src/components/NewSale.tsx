import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import './NewSale.css';
import {getBaseURL} from "../BacendConfig.ts";

const NewSale: React.FC = () => {
    const [personName, setPersonName] = useState('');
    const [inputs, setInputs] = useState([{ productName: '', quantity: '' }]);
    const [selectedProducts, setSelectedProducts] = useState<{ [key: number]: boolean }>({});
    const [productOptions, setProductOptions] = useState<string[]>([]);

    const handleDropdownClick = (index: number) => {
        setSelectedProducts((prevSelectedProducts) => ({
            ...prevSelectedProducts,
            [index]: !prevSelectedProducts[index]
        }));
    };

    const handleOptionClick = (option: string, index: number) => {
        setInputs((prevInputs) =>
            prevInputs.map((input, i) =>
                i === index ? { ...input, productName: option } : input
            )
        );
        setSelectedProducts((prevSelectedProducts) => ({
            ...prevSelectedProducts,
            [index]: false
        }));
    };

    const addInput = () => {
        setInputs([...inputs, { productName: '', quantity: '' }]);
    };

    const removeInput = (index: number) => {
        setInputs(inputs.filter((_input, i) => i !== index));
    };

    const fetchProductOptions = async () => {
        try {
            const response = await fetch(getBaseURL()+'productInfo');
            const data = await response.json();
            setProductOptions(data.map((product: { productName: string }) => product.productName));
        } catch (error) {
            console.error('Hiba történt a termékinformációk lekérése közben:', error);
        }
    };

    const saveNewSaleMutation = useMutation((personItemData: any) =>
        fetch(getBaseURL()+'save-new-sale', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(personItemData),
        })
    );

    useEffect(() => {
        fetchProductOptions();
        addInput();
    }, []);

    const submitForm = () => {
        const personItemData = {
            personModel: {
                personName: personName,
            },
            itemModels: inputs.map((input) => ({
                productName: input.productName,
                quantity: input.quantity,
            })),
        };

        try {
            saveNewSaleMutation.mutateAsync(personItemData);
            console.log('Mentve az adatbázisba!');
            alert('Mentve az adatbázisba!');
        } catch (error) {
            console.error('Hiba történt a mentés közben:', error);
        }
    };

    return (
        <div className="container">
            <div className="columns">
                <form onSubmit={submitForm} className="box">
                    <h4 className="title has-text-white">Új vásárlás rögzítése</h4>
                    <br />
                    <input
                        className="input"
                        type="text"
                        value={personName}
                        onChange={(e) => setPersonName(e.target.value)}
                        placeholder="Dolgozó neve"
                        required
                    />
                    {inputs.map((input, index) => (
                        <div key={index} className="field">
                            <div className="field">
                                <div
                                    className={`dropdown ${selectedProducts[index] ? 'is-active' : ''}`}
                                    onClick={() => handleDropdownClick(index)}
                                >
                                    <div className="dropdown-trigger">
                                        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                            <span>{input.productName || 'Válasszon terméket!'}</span>
                                            <span className="icon is-small">
                                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                                            </span>
                                        </button>
                                    </div>
                                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                        <div className="dropdown-content">
                                            {productOptions.map((option, optionIndex) => (
                                                <a key={optionIndex} className="dropdown-item" onClick={() => handleOptionClick(option, index)}>
                                                    {option}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    value={input.quantity || ''}
                                    onChange={(e) =>
                                        setInputs((prevInputs) =>
                                            prevInputs.map((prevInput, prevIndex) =>
                                                prevIndex === index
                                                    ? {
                                                        ...prevInput,
                                                        quantity: e.target.value === '' ? '' : String(parseInt(e.target.value)),
                                                    }
                                                    : prevInput
                                            )
                                        )
                                    }
                                    placeholder="Mennyiség"
                                    required
                                />
                            </div>
                            <div className="control">
                                <button className="button is-danger" type="button" onClick={() => removeInput(index)}>
                                    Törlés
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mainField">
                        <div className="control">
                            <button className="button" type="button" onClick={addInput}>
                                Hozzáadás
                            </button>
                        </div>
                        <div className="control">
                            <button className="button is-primary" type="submit">
                                Értékesítés leadása
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewSale;

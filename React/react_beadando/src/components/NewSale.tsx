// NewSale.tsx
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './NewSale.css';

const NewSale: React.FC = () => {
    const [personName, setPersonName] = useState('');
    const [inputs, setInputs] = useState([{productName: '', quantity: ''}]);
    const [selectedProducts, setSelectedProducts] = useState<{ [key: number]: boolean }>({});
    const [productOptions, setProductOptions] = useState<string[]>(['Termék A', 'Termék B', 'Termék C']);

    const handleDropdownClick = (index: number) => {
        setSelectedProducts((prevSelectedProducts) => ({
            ...prevSelectedProducts,
            [index]: !prevSelectedProducts[index]
        }));
    };

    const handleOptionClick = (option: string, index: number) => {
        setInputs((prevInputs) =>
            prevInputs.map((input, i) =>
                i === index ? {...input, productName: option} : input
            )
        );
        setSelectedProducts((prevSelectedProducts) => ({
            ...prevSelectedProducts,
            [index]: false
        }));
    };

    const addInput = () => {
        setInputs([...inputs, {productName: '', quantity: ''}]);
    };

    const removeInput = (index: number) => {
        setInputs(inputs.filter((_input, i) => i !== index));
    };


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

        axios
            .post('/save-new-sale', personItemData, {
                baseURL: 'http://localhost:8080',
            })
            .then((response) => {
                console.log(response.data);
                alert('Mentve az adatbázisba!');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetchProductOptions = () => {
        axios
            .get('/productInfo', {
                baseURL: 'http://localhost:8080',
            })
            .then((response) => {
                if (response.data && Array.isArray(response.data)) {
                    setProductOptions(response.data.map((product: { productName: string }) => product.productName));
                } else {
                    console.error('Nem sikerült lekérni a termékinformációkat.');
                }
            })
            .catch((error) => {
                console.error('Hiba történt a termékinformációk lekérése közben:', error);
            });
    };

    useEffect(() => {
        fetchProductOptions();
        addInput(); // Alapból egy mezőt hozzáadunk
    }, []);

    return (
        <div className="container">
            <div className="columns">
                {/*<div className="column is-half">*/}
                <form onSubmit={submitForm} className="box">
                    <h4 className="title has-text-white">Új vásárlás rögzítése</h4>
                    <p>
                        Ugyanazzal a névvel többször leadott rendelés esetén az illetőhöz más-más ID fog
                        tartozni, <br/>
                        de a dolgozói fogyasztásriportban egy név csak egyszer szerepel.
                    </p>
                    <br/>
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
                                {/*<label className="label">Termék kiválasztása</label>*/}
                                <div
                                    className={`dropdown ${selectedProducts[index] ? 'is-active' : ''}`}
                                    onClick={() => handleDropdownClick(index)}
                                >
                                    <div className="dropdown-trigger">
                                        <button className="button" aria-haspopup="true"
                                                aria-controls="dropdown-menu">
                                            <span>{input.productName || 'Válasszon terméket!'}</span>
                                            <span className="icon is-small">
                                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                                </span>
                                        </button>
                                    </div>
                                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                        <div className="dropdown-content">
                                            {productOptions.map((option, optionIndex) => (
                                                <a key={optionIndex} className="dropdown-item"
                                                   onClick={() => handleOptionClick(option, index)}>
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
                                                prevIndex === index ? {
                                                    ...prevInput,
                                                    quantity: e.target.value === '' ? '' : String(parseInt(e.target.value))
                                                } : prevInput
                                            )
                                        )
                                    }
                                    placeholder="Mennyiség"
                                    required
                                />
                            </div>
                            <div className="control">
                                <button className="button is-danger" type="button"
                                        onClick={() => removeInput(index)}>
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
                {/*</div>*/}
            </div>
        </div>
    );
};

export default NewSale;

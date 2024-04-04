import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080', // A szerver címe és portja
    timeout: 5000, // Maximum 5 másodpercig vár a válaszra
});

export default instance;

import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';
import NewSale from './components/NewSale';
import ListAllSales from './components/ListAllSales';
import ListAllClosedSales from './components/ListAllClosedSales';
import ProductSalesReport from './components/ProductSalesReport';
import EmployeeConsumptionReport from './components/EmployeeConsumptionReport';

const App: React.FC = () => {
    return (
        <Carousel showThumbs={false} showStatus={false} /*infiniteLoop autoPlay*/>
            <div>
                <NewSale/>
            </div>
            <div>
                <ListAllSales/>
            </div>
            <div>
                <ListAllClosedSales/>
            </div>
            <div>
                <ProductSalesReport/>
            </div>
            <div>
                <EmployeeConsumptionReport/>
            </div>
        </Carousel>
    );
};

export default App;

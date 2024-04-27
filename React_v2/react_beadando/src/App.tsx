import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';
import MainSite from './mainSite.tsx';
import NewSale from './components/NewSale';
import ListAllSales from './components/ListAllSales';
import ListAllClosedSales from './components/ListAllClosedSales';
import ProductSalesReport from './components/ProductSalesReport';
import EmployeeConsumptionReport from './components/EmployeeConsumptionReport';

const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<MainSite/>}/>
                    <Route path="/new-sale" element={<NewSale/>}/>
                    <Route path="/list-all-sales" element={<ListAllSales/>}/>
                    <Route path="/list-all-closed-sales" element={<ListAllClosedSales/>}/>
                    <Route path="/product-sales-report" element={<ProductSalesReport/>}/>
                    <Route path="/employee-consumption-report" element={<EmployeeConsumptionReport/>}/>
                </Routes>
            </Router>
        </QueryClientProvider>
    );
};

export default App;

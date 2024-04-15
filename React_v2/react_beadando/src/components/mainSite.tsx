const MainSite = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Main Site</h1>
            <ul className="space-y-2">
                <li>
                    <a href="/new-sale" className="text-blue-500 hover:underline">New sale</a>
                </li>
                <li>
                    <a href="/list-all-sales" className="text-blue-500 hover:underline">List All Sales</a>
                </li>
                <li>
                    <a href="/list-all-closed-sales" className="text-blue-500 hover:underline">List All Closed Sales</a>
                </li>
                <li>
                    <a href="/product-sales-report" className="text-blue-500 hover:underline">Product Sales Report</a>
                </li>
                <li>
                    <a href="/employee-consumption-report" className="text-blue-500 hover:underline">Employee
                        Consumption Report</a>
                </li>
            </ul>
        </div>
    );
};

export default MainSite;

import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Filter, Pencil, Trash2 } from 'lucide-react';

const Restaurants = () => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const sampleData = [
        { id: 1, name: 'Margherita Pizza', category: 'Pizza', restaurant: 'Pizza Palace', price: 12.99, status: 'Available' },
        { id: 2, name: 'Chicken Burger', category: 'Burger', restaurant: 'Burger House', price: 8.99, status: 'Available' },
        { id: 3, name: 'Pad Thai', category: 'Asian', restaurant: 'Thai Delight', price: 14.99, status: 'Out of Stock' },
        { id: 4, name: 'Caesar Salad', category: 'Salad', restaurant: 'Green House', price: 7.99, status: 'Available' },
        { id: 5, name: 'Sushi Roll', category: 'Asian', restaurant: 'Sushi Bar', price: 16.99, status: 'Available' },
    ];

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="table-container">
            <div className="table-header">
                <div className="table-title">
                    <h2>Food Items</h2>
                    <span className="item-count">{sampleData.length} items</span>
                </div>
                <div className="table-actions">
                    <div className="search-container">
                        <Search size={20} />
                        <input type="text" placeholder="Search items..." />
                    </div>
                    <button className="filter-btn">
                        <Filter size={20} />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('name')}>
                                <div className="th-content">
                                    Name
                                    {sortConfig.key === 'name' && (
                                        sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                    )}
                                </div>
                            </th>
                            <th onClick={() => handleSort('category')}>
                                <div className="th-content">
                                    Category
                                    {sortConfig.key === 'category' && (
                                        sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                    )}
                                </div>
                            </th>
                            <th onClick={() => handleSort('restaurant')}>
                                <div className="th-content">
                                    Restaurant
                                    {sortConfig.key === 'restaurant' && (
                                        sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                    )}
                                </div>
                            </th>
                            <th onClick={() => handleSort('price')}>
                                <div className="th-content">
                                    Price
                                    {sortConfig.key === 'price' && (
                                        sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                    )}
                                </div>
                            </th>
                            <th onClick={() => handleSort('status')}>
                                <div className="th-content">
                                    Status
                                    {sortConfig.key === 'status' && (
                                        sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                    )}
                                </div>
                            </th>
                            <th className="action-column">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleData.map((item) => (
                            <tr key={item.id}>
                                <td data-label="Name">
                                    <div className="td-name">
                                        <div className="item-image" />
                                        <span>{item.name}</span>
                                    </div>
                                </td>
                                <td data-label="Category">{item.category}</td>
                                <td data-label="Restaurant">{item.restaurant}</td>
                                <td data-label="Price">${item.price}</td>
                                <td data-label="Status">
                                    <span className={`status-badge ${item.status === 'Available' ? 'available' : 'out-of-stock'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td data-label="Actions">
                                    <div className='action-btns'>
                                        <Pencil size={16} color='#FFD700' />
                                        <Trash2 size={16} color='#FF0000' />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default Restaurants;


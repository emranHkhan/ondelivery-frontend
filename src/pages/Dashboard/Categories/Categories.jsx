import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Pencil, Trash2, Plus } from 'lucide-react';
import styles from './Categories.module.css';
import { Link } from 'react-router-dom';
import useData from '../../../hooks/useData';

const Categories = () => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const { categories } = useData();

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedCategories = () => {
        const sorted = [...categories];
        if (sortConfig.key) {
            sorted.sort((a, b) => {
                if (typeof a[sortConfig.key] === 'string') {
                    return sortConfig.direction === 'asc'
                        ? a[sortConfig.key].localeCompare(b[sortConfig.key])
                        : b[sortConfig.key].localeCompare(a[sortConfig.key]);
                } else {
                    return sortConfig.direction === 'asc'
                        ? a[sortConfig.key] - b[sortConfig.key]
                        : b[sortConfig.key] - a[sortConfig.key];
                }
            });
        }
        return sorted;
    };

    const categoriesToDisplay = sortedCategories();

    return (
        <>
            <Link to={'/admin/categories/create'} type="submit" className={`${styles.addBtn}`}>
                <Plus /><span>Add Category</span>
            </Link>
            <div className="table-container">

                <div className="table-header">
                    <div className="table-title">
                        <h2>Categories ({categories.length})</h2>
                    </div>
                    <div className="table-actions">
                        <div className="search-container">
                            <Search size={20} />
                            <input type="text" placeholder="Search items..." />
                        </div>
                    </div>
                </div>

                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('name')}>
                                    <div className="th-content">
                                        Category
                                        {sortConfig.key === 'name' && (
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
                            {categoriesToDisplay.map((item) => (
                                <tr key={item.id}>
                                    <td data-label="Category">{item.name}</td>
                                    <td data-label="Status">
                                        <span className={`status-badge ${item.status ? 'available' : 'out-of-stock'}`}>
                                            {item.status ? 'Available' : 'Out of Stock'}
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
        </>
    );
};

export default Categories;

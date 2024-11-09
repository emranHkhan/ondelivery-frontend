import { Link } from 'react-router-dom';
import './DashboardSummary.css';

const DashboardSummary = () => {
    const stats = [
        { label: 'Total Orders', value: '1,234', trend: '+12%' },
        { label: 'Total Revenue', value: '$45,678', trend: '+8%' },
        { label: 'Active Restaurants', value: '48', trend: '+5%' },
        { label: 'Menu Items', value: '356', trend: '+15%' }
    ];

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Dashboard Overview</h1>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div className="stat-card" key={index}>
                        <h3 className="stat-label">{stat.label}</h3>
                        <p className="stat-value">{stat.value}</p>
                        <span className="stat-trend">{stat.trend}</span>
                    </div>
                ))}
            </div>

            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                    <Link to="/dashboard/food-items/create" className="action-button">
                        Add New Item
                    </Link>
                    <Link to="/dashboard/categories/create" className="action-button">
                        Create Category
                    </Link>
                    <Link to="/dashboard/restaurants/create" className="action-button">
                        Add Restaurant
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardSummary






import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryCreate.css';
import api from '../../../utils/axiosInstance';

const CategoryCreate = () => {
    const [categoryName, setCategoryName] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post('categories/', { name: categoryName, image_url: imgUrl, status })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
        navigate('/admin/categories');
    };

    return (
        <div className="category-create-container">
            <h2>Create New Category</h2>
            <form className="category-form" onSubmit={handleSubmit}>
                <label htmlFor="categoryName">Category Name</label>
                <input
                    type="text"
                    id="categoryName"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter category name"
                    required
                />

                <label htmlFor="img-url">Image URL</label>
                <input type="url" id="img-url" required placeholder="Image URL" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />

                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    value={status ? "available" : "not-available"}
                    onChange={(e) => setStatus(e.target.value === "available")}
                    required
                >
                    <option value="available">Available</option>
                    <option value="not-available">Not Available</option>
                </select>

                <button type="submit" className="submit-btn">
                    Create Category
                </button>
            </form>
        </div>
    );
};

export default CategoryCreate;

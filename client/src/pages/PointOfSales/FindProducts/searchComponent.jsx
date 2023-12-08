import { useState, useEffect } from 'react';
import axios from 'axios'; 
import Products from '../Products/index';

function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {

            const response = await axios.get(`/api/pos/search-product?searchTerm=${searchTerm}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            
            setSearchResults(response.data); 
            onSearch(response.data);
        } catch (error) {
            console.error('Error searching for products:', error.message);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [searchTerm]);
    return ( 
        <div className="input-group">
            <div className="form-outline w-100">
                <label className="form-label">Search or type barcode</label>
                <div className="d-flex w-100">
                    <input
                        type="search"
                        className="form-control w-100"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="button" className="btn btn-primary" onClick={handleSearch}>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
        
    );
}

export default Search;
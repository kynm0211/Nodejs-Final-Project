import { useState, useEffect } from 'react';
import axios from 'axios'; 
function Barcode({addToCart  }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBarcode, setSearchBarcode] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/pos/add-product-by-barcode?searchTerm=${searchTerm}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
    
            if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
                const foundProduct = response.data;
    
                console.log(foundProduct);
            } else {
                console.error('No valid data found in response');
            }

        } catch (error) {
            console.error('Error searching for products:', error.message);
        }
    };
    


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };
    return ( 
        <div className="input-group">
            <div className="form-outline w-100">
                <label className="form-label">Type barcode</label>
                <div className="d-flex w-100">
                <input
                        type="search"
                        className="form-control w-100"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    );
}

export default Barcode;
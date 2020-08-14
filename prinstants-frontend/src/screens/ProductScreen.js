import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { detailsProduct } from '../actions/productActions';


function ProductScreen(props) {
    
    const [qty, setQty] = useState(1)
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return ()=> {
            
        };
    }, []);

    const handleAddToCart = () => {
        props.history.push("/cart/"+ props.match.params.id + "?qty=" + qty)
    }

    return  (

            <div>
                <div className="back-to-results">
                    <Link to="/">Back to results</Link>
                </div>
                {loading? <div>Loading...</div>:
                error? <div>{error} </div>: (
                <div className="details">
                    <div className="details-image">
                        <img src={product.image} alt="product"/>
                    </div>
                    <div className="details-info">
                        <ul>
                            <li>
                                <h4>{product.name}</h4>
                            </li>
                            <li>
                                {product.rating} Stars ({product.numReviews} Reviews)
                            </li>
                            <li>
                                <b>{product.price}</b>
                            </li>
                            <li>
                                Description:
                                <div>
                                    {product.description}
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                    <div className="details-action">
                        <ul>
                            <li>
                                Price: <b>${product.price}</b>
                            </li>
                            <li>
                                Status:{ product.stock>0? "In Stock": "Out of stock"}
                            </li>
                            <li>
                                Qty: <select value={qty} onChange={(e) => { setQty(e.target.value)} }>
                                        {[...Array(product.stock).keys()].map(count=> 
                                            <option key={count+1} value={count+1}>{count+1}</option>
                                        )}
                                    </select>
                            </li>
                            <li>
                                {
                                    product.stock>0 && 
                                    <button onClick={handleAddToCart} className="button primary">Add to Cart</button>
                                }
                            </li>
                        </ul>
                    </div>
                </div> 
                )
                
            }
                
            </div>
            )
    
}

export default ProductScreen


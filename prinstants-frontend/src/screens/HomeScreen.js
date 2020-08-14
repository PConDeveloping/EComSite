import React, { useEffect } from 'react'
/* ------------- when using backend don't need set frontend data ------------ */
// import data from '../data'
import {Link} from 'react-router-dom';
// import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {listProducts} from '../actions/productActions'


function HomeScreen(props) {


    //define hooks

    // const [products, setProduct] = useState([]);
    const productList = useSelector(state => state.productList);
    const {products, loading, error} = productList;


    const dispatch = useDispatch();
    

/* ------------------------- fetch data from server ------------------------- */

useEffect(() => {
    dispatch(listProducts())
    // const fetchData = async () => {
    //     const {data} = await axios.get("/api/products");
    //     setProduct(data)
    // }
    // fetchData();
    return () => {
        
    }
    // empty array means when component did mount 
}, [])



    return  loading ? <div>Loading...</div> :
    error? <div>{error}</div> : 

   
        <ul className="products">
        { products.map(product =>
            <li key={product._id}>
                <div className="product">
                    <Link to={'/product/' + product._id}>                    
                        <img className="product-image" src={product.image} alt="product"/>
                    </Link>
                    <div className="product-name">
                        <Link to={'/product/' + product._id}>{product.name}</Link>
                    </div>
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-price">${product.price}</div>
                    <div className="product-rating">{product.rating} Starts ({product.numReviews})</div>
                </div>
            </li>
        )}
        </ul>
   
    


}

export default HomeScreen
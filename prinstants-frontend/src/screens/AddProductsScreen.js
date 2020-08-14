import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {saveProduct, listProducts, deleteProdcut} from '../actions/productActions';

  



function AddProductsScreen(props) {
        const [modalVisible, setModalVisible] = useState(false);
        const [id, setId] = useState('');
        const [name, setName] = useState('');
        const [price, setPrice] = useState('');
        const [image, setImage] = useState('');
        const [brand, setBrand] = useState('');
        const [category, setCategory] = useState('');
        const [stock, setStock] = useState('');
        const [description, setDescription] = useState('');
        
        const productList = useSelector(state => state.productList);
        const { loading, products, error } = productList;
        
        const productSave = useSelector(state=>state.productSave);
        const { loading: loadingSave, success: successSave, error: errorSave} = productSave
        
        const productDelete = useSelector(state => state.productDelete);
        const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
        const dispatch = useDispatch()

    useEffect(() => {
            if(successSave){
                    setModalVisible(false);
            }
        dispatch(listProducts());
        return ()=> {
        };
    }, [successSave, successDelete]);

    

    const openModal = (product) => {
            setModalVisible(true);
            setId(product._id);
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setStock(product.stock);
            setDescription(product.description);
    }

   const submitHandler = (e) => {
           e.preventDefault();
           dispatch(saveProduct({_id: id, name, price, brand, category, stock, image, description}));
   }

   const deleteHandler = (product) => {
        dispatch(deleteProdcut(product._id));
      }

//    let btnLabel = "Add New";
//    let buttonAction = ()=> openModal({})
//    let cn = 'primary'  

//    const buttonUpdate = (status) => {
//         if(status === "Add New"){
//                 return {
//                         btnLabel: "Back",
//                         buttonAction: "{setModalVisible(false)}",
//                         cn: 'secondary'
//                 }
                
//         }else {
//                 return{
//                         btnLabel: "Add New",
//                         buttonAction: "()=> openModal({})",
//                         cn: 'primary'
//                 }
//         }
//    }

    return  (
                <div className="content content-margined">
                        <div className="product-header">
                                <h3>Products</h3> 
                                 <button className= {`button primary`} onClick={()=> openModal({})}>Add Product</button>
                                 
                                
                        </div>
                    {modalVisible &&    
                    <div className="form">
                            <form onSubmit={submitHandler}>
                                    <ul className="form-container">
                                            <h2>Add Product</h2>
                                            <li>
                                                    {loadingSave && <div>Loading...</div>}
                                                    {errorSave && <div>{errorSave}</div>}
                                                    {loadingDelete && <div>Deleting...</div>}
                                                    {errorDelete && <div>{errorDelete}</div>}
                                            </li>
                                            <li>
                                                    <label htmlFor="name">
                                                            Name
                                                    </label>
                                                    <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)}>
                                                    </input>
                                            </li>
                                            <li>
                                                    <label htmlFor="price">
                                                            Price
                                                    </label>
                                                    <input type="number" id="price" value={price} name="price" onChange={(e) => setPrice(e.target.value)}>
                                                    </input>
                                            </li>
                                            <li>
                                                    <label htmlFor="image">
                                                            Image
                                                    </label>
                                                    <input type="text" name="image" value={image} id="image" onChange={(e) => setImage(e.target.value)}>
                                                    </input>
                                            </li>
                                            <li>
                                                    <label htmlFor="brand">
                                                            Brand
                                                    </label>
                                                    <input type="text" id="brand" value={brand} name="brand" onChange={(e) => setBrand(e.target.value)}>
                                                    </input>
                                            </li>
                                            <li>
                                                    <label htmlFor="category">
                                                            Category
                                                    </label>
                                                    <input type="text" name="category" value={category} id="category" onChange={(e) => setCategory(e.target.value)}>
                                                    </input>
                                            </li>
                                            <li>
                                                    <label htmlFor="stock">
                                                            Stock
                                                    </label>
                                                    <input type="number" id="stock" value={stock} name="stock" onChange={(e) => setStock(e.target.value)}>
                                                    </input>
                                            </li>
                                            <li>
                                                    <label htmlFor="description">
                                                            Description
                                                    </label>
                                                    <textarea name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)}>
                                                    </textarea>
                                            </li>
                                            <li>
                                                <button type="submit" className="button primary">{id?"Update":"Add Product"}</button>
                                                <button onClick={() => {setModalVisible(false)}} className="button secondary">Back</button>
                                            </li>
                                    </ul>
                            </form>
                    </div>
                }
                    <div className="product-list">
                                <table className="table">
                
                                       <thead>
                                                <tr>
                                                        <th className="Thumbnail-th">Thumbnail</th>
                                                        <th className="id-th">ID</th>
                                                        <th className="name-th">Name</th>
                                                        <th className="price-th">Price</th>
                                                        <th className="category-th">Category</th>
                                                        <th className="brand-th">Brand</th>
                                                        <th className="action-th">Action</th>
                                                </tr>
                                       </thead>
                                       <tbody>
                                                {products.map(product => (
                                                <tr key={product._id}>
                                                        <td ><img className="product-thumbnail" src={product.image}/></td>
                                                        <td>{product._id}</td>
                                                        <td>{product.name}</td>
                                                        <td>{product.price}</td>
                                                        <td>{product.category}</td>
                                                        <td>{product.brand}</td>
                                                        <td>
                                                                <button className="button" onClick={() => openModal(product)}>Edit</button>
                                                                {" "}
                                                                <button className="button" onClick={() => deleteHandler(product)} >Delete</button>                                                        </td>


                                                </tr>
                                                ))}
                                       </tbody>
                                </table>
                        </div>
                </div>
    )
    
}

export default AddProductsScreen



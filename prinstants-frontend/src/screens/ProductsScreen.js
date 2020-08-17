import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import { saveProduct, listProducts, deleteProdcut } from '../actions/productActions';

function ProductsScreen(props) {
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

  const productSave = useSelector(state => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

  const productDelete = useSelector(state => state.productDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setStock(product.stock);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({
      _id: id,
      name, price, image, brand, category,
      stock, description
    }));
  }
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  }
  return <div className="content content-margined">

    <div className="product-header">
      <h3>Products</h3>
      <button className="button primary" onClick={() => openModal({})}>Create Product</button>
    </div>
    {modalVisible &&
      <div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
            <li>
              <h2>Create Product</h2>
            </li>
            <li>
              {loadingSave && <div>Loading...</div>}
              {errorSave && <div>{errorSave}</div>}
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
              <input type="text" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)}>
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
              <input type="text" name="brand" value={brand} id="brand" onChange={(e) => setBrand(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="stock">
                Stock
          </label>
              <input type="text" name="stock" value={stock} id="stock" onChange={(e) => setStock(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="name">
                Category
          </label>
              <input type="text" name="category" value={category} id="category" onChange={(e) => setCategory(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="description">
                Description
          </label>
              <textarea name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
            </li>
            <li>
              <button type="submit" className="button primary">{id ? "Update" : "Create"}</button>
            </li>
            <li>
              <button type="button" onClick={() => setModalVisible(false)} className="button secondary">Back</button>
            </li>
          </ul>
        </form>
      </div>
    }


    <div className="products_list">

      <table className="products_Table">
        <thead>
          <tr className="header_product_row">
            <th className="products_Col">ID</th>
            <th className="products_Col">Thumbnail</th>
            <th className="products_Col">Name</th>
            <th className="products_Col">Price</th>
            <th className="products_Col">Category</th>
            <th className="products_Col">Brand</th>
            <th className="products_Col">Stock</th>
            <th className="products_Col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (<tr classname="products_row" key={product._id}>
            <td className="products_Id_Col products_col">{product._id}</td>
            <td className="products_Img_Col products_col"><img classname="thumbnailProducts" src={product.image}></img></td>
            <td className="products_Name_Col products_col">{product.name}</td>
            <td className="products_centered products_Price_Col products_col">{product.price}</td>
            <td className="products_Category_Col products_col">{product.category}</td>
            <td className="products_Brand_Col products_col">{product.brand}</td>
            <td className="products_centered products_Stock_Col products_col">{product.stock}</td>
            <td className="products_centered products_Action_Col products_col">
              <button className="button" onClick={() => openModal(product)} >Edit</button>
              {' '}
              <button className="button" onClick={() => deleteHandler(product)} >Delete</button>
            </td>
          </tr>))}
        </tbody>
      </table>

    </div>
  </div>
}
export default ProductsScreen;
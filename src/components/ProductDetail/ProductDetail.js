import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    document.title = "Product Detail";
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`https://polar-beach-48875.herokuapp.com/product/${productKey}`)
        .then(res => res.json())
        .then(data => {
            setProduct(data);
        })
    }, [productKey])
    return (
        <div>
            <h1>Your Product Details Here :- </h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;
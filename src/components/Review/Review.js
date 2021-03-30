import React, { useEffect, useState } from "react";
import {
    getDatabaseCart,
    processOrder,
    removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import happyImage from "../../images/giphy.gif";
import { useHistory } from "react-router";

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();
    const handleProceedCheckout = () => {
        history.push("/shipment");
    };

    const handleRemoveProduct = (productKey) => {
        const newCart = cart.filter((pd) => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };

    useEffect(() => {
        const savedCart = getDatabaseCart();
        console.log(savedCart);
        const productKeys = Object.keys(savedCart);

        fetch("http://localhost:5000/productsByKeys", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productKeys),
        })
            .then((res) => res.json())
            .then((data) => setCart(data));
    }, []);

    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt="Thanks for Ordering" />;
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {cart.map((pd) => {
                    return (
                        <div key={pd.key}>
                            <ReviewItem
                                key={pd.key}
                                product={pd}
                                handleRemoveProduct={handleRemoveProduct}
                            ></ReviewItem>
                        </div>
                    );
                })}

                {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button
                        onClick={handleProceedCheckout}
                        className="main-button"
                    >
                        Proceed Checkout
                    </button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;

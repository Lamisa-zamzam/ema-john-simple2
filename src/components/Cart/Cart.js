import React from "react";

const Cart = (props) => {
    const cart = props.cart;
    //const totalPrice = cart.reduce((total, product) => total + product.price, 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }

    let shippingCost = 0;
    if (total > 35) {
        shippingCost = 0;
    } else if (total > 15) {
        shippingCost = 4.99;
    } else if (total > 0) {
        shippingCost = 12.99;
    }

    const tax = total / 10;
    const grandTotal = total + shippingCost + Number(tax);

    const formatNumber = (number) => {
        const precision = number.toFixed(2);
        return Number(precision);
    };
    return (
        <div>
            <h4 className="text-danger">Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p>
                <small>Shipping Cost: {shippingCost}</small>
            </p>
            <p>
                <small>Tax + VAT: {formatNumber(tax)}</small>
            </p>
            <p>Total Price: {formatNumber(grandTotal)}</p>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;

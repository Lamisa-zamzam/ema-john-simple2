import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { UserContext } from "../../App.js";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = (data) => {
        console.log(data);
        const savedCart = getDatabaseCart();
        const orderDetails = {
            ...loggedInUser,
            products: savedCart,
            shipment: data,
            orderTime: new Date(),
        };
        fetch("https://polar-beach-48875.herokuapp.com/addOrder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderDetails),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    processOrder();
                    alert("Your order placed successfully.")
                }
            });
    };

    console.log(watch("example"));
    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input
                name="name"
                ref={register({ required: true })}
                placeholder="Your name"
                defaultValue={loggedInUser.name}
            />
            {errors.name && <span className="error">Name is required</span>}
            <input
                name="email"
                ref={register({ required: true })}
                placeholder="Your name"
                defaultValue={loggedInUser.email}
            />
            {errors.email && <span className="error">Email is required</span>}
            <input
                name="address"
                ref={register({ required: true })}
                placeholder="Your address"
            />
            {errors.address && (
                <span className="error">Address is required</span>
            )}
            <input
                name="phone"
                ref={register({ required: true })}
                placeholder="Your phone"
            />
            {errors.phone && <span className="error">Phone is required</span>}
            <input type="submit" />
        </form>
    );
};

export default Shipment;

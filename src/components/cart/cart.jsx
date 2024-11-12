import Button from "../button/button";
import "./cart.css";
import "../button/button";
import { totalPrice } from "../../units/total-price";
const Cart = ({ cartItems ,onCheckout }) => {
    return (
        <div className="cart-container">
            <p>
                Umumiy narx:
                {totalPrice(cartItems).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                })}
            </p>
            <Button
                title={`${
                    cartItems.length === 0 ? "Buyurtma berish" : "To'lov"
                }`}
                disable={cartItems.length ===0 ? true :false }
                type={"checkout"}
                onClick={onCheckout}
            />
        </div>
    );
};

export default Cart;

import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { getData } from "./constants/db";
import Card from "./components/card/card";
import Cart from "./components/cart/cart";

const courses = getData();
const telegram = window.Telegram.WebApp;

function App() {
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        telegram.ready();
    }, []);

    const onAddItem = (item) => {
        const existItem = cartItems.find((c) => c.id === item.id);
        console.log("EXIST_ITEM", existItem);

        if (existItem) {
            const updatedCartItems = cartItems.map((c) =>
                c.id === item.id
                    ? { ...existItem, quantity: existItem.quantity + 1 }
                    : c
            );
            console.log("ADD_QUANTITY_EXIST_ITEM", updatedCartItems);
            setCartItems(updatedCartItems);
        } else {
            const newCartItems = [...cartItems, { ...item, quantity: 1 }];
            console.log("ADD_ITEM", newCartItems);
            setCartItems(newCartItems);
        }
    };

    const onRemoveItem = (item) => {
        const existItem = cartItems.find((c) => c.id === item.id);
        console.log("existItem", existItem);
        if (existItem.quantity === 1) {
            const newData = cartItems.filter((c) => c.id !== item.id);
            setCartItems(newData);
            console.log("DELETE_ITEM_QUANTITY_0", newData);
        } else {
            const newData = cartItems.map((c) =>
                c.id === existItem.id
                    ? { ...existItem, quantity: existItem.quantity - 1 }
                    : c
            );
            console.log("DELETE_ITEM_QUANTITY_1", newData);
            setCartItems(newData);
        }
    };

    const onCheckout = () => {
        telegram.MainButton.text = "Sotib olish :)";
        telegram.MainButton.show();
    };

    const onSendData = useCallback(() => {
        const queryId = telegram.initDataUnsave?.query_id;
        if (queryId) {
            fetch(
                "https://telegram-web-bot-6a300eee1ecc.herokuapp.com/web-data",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        products: cartItems,
                        queryId: queryId,
                    }),
                }
            );
        } else {
            telegram.sendData(JSON.stringify(cartItems));
        }
    }, [cartItems]);
    useEffect(() => {
        telegram.onEvent("mainButtonClicked", onSendData);
        return () => telegram.offEvent("mainButtonClicked", onSendData);
    }, [onSendData]);

    return (
        <div>
            <Cart cartItems={cartItems} onCheckout={onCheckout} />
            <div className="card">
                {courses.map((course) => (
                    <div className="cards-container" key={course.id}>
                        <Card
                            course={course}
                            onAddItem={onAddItem}
                            onRemoveItem={onRemoveItem}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;

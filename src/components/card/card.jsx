import React, { useState } from "react";
import "./card.css";
import Button from "../button/button";

const Card = (props) => {
    const [count, setCount] = useState(0);
    const { course, onAddItem, onRemoveItem } = props;
    const handleIcrement = () => {
        setCount((prev) => prev + 1);
        onAddItem(course);
    };
    const handleDecrement = () => {
        setCount((prev) => prev - 1);
        onRemoveItem(course);
    };

    return (
        <div className="cards">
            <span
                className={` ${
                    count === 0 ? "card-badge-hidden" : "card-badge"
                } `}
            >
                {count}
            </span>
            <div className="image-container">
                <img
                    width={"330px"}
                    height={"200px"}
                    src={course?.Image}
                    alt={course?.title || "Course image"}
                />
            </div>
            <div className="card__1">
                <div className="card-body">
                    <h2 className="card-title">{course.title}</h2>
                </div>
                <div className="card-price">
                    {course.price}so'm
                </div>
            </div>
            <div className="hr"></div>
            <div className="btn-container">
                <Button title="+" type="add" onClick={handleIcrement} />
                {count !== 0 && (
                    <Button title="-" type="remove" onClick={handleDecrement} />
                )}
            </div>
        </div>
    );
};

export default Card;

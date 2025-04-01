"use client";
import "./styles.css";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { Dispatch, SetStateAction, useState } from "react";

type PasswordProps = {
    placeholder: string;
};

export default function Password({ placeholder }: PasswordProps) {
    const [inputType, setInputType] = useState("password");
    const [toggle, setToggle] = useState("button");

    const toggleInput = () => {
        setInputType(inputType === "text" ? "password" : "text");
        setToggle(toggle === "button" ? "button-active" : "button");
    };

    return (
        <div className="password">
            <input type={inputType} placeholder={placeholder} />
            <button onClick={toggleInput}>
                <PiEye size={24} className={toggle} />
            </button>
        </div>
    );
}

"use client";
import styles from "./styles.module.css";
import { PiEye } from "react-icons/pi";
import { useState } from "react";

type PasswordProps = {
    placeholder: string;
};

export default function Password({ placeholder }: PasswordProps) {
    const [inputType, setInputType] = useState("password");
    const [toggle, setToggle] = useState(styles.button);
    const [password, setPassword] = useState<string>("");

    const toggleInput = () => {
        setInputType(inputType === "text" ? "password" : "text");
        setToggle(toggle === styles.button ? styles.button_active : styles.button);
    };

    return (
        <div className={styles.password}>
            <input
                type={inputType}
                placeholder={placeholder}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button onClick={toggleInput}>
                <PiEye size={24} className={toggle} />
            </button>
        </div>
    );
}

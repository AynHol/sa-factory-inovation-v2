"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import carFactory from "@/assets/factory.jpg";
import Link from "next/link";
import { v4 as uuid } from "uuid";
import { FormEvent, useState } from "react";
import axios from "axios";
import { PiEye } from "react-icons/pi";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [inputType, setInputType] = useState("password");
    const [toggle, setToggle] = useState(styles.button);

    const toggleInput = () => {
        setInputType(inputType === "text" ? "password" : "text");
        setToggle(toggle === styles.button ? styles.button_active : styles.button);
    };

    const router = useRouter();

    async function handleCreateProfile(event: FormEvent) {
        event.preventDefault();
        const person = {
            id: uuid(),
            name: name,
            email: email,
            password: password,
        };
        await axios.post("http://localhost:5500/profiles", person);
        router.replace("/dashboard");
    }

    return (
        <div className={styles.body}>
            <div className={styles.main}>
                <Image src={carFactory} alt="Car Factory" className={styles.car_factory} />
                <form className={styles.cadastro} onSubmit={handleCreateProfile}>
                    <div className={styles.name_p}>
                        <div className={styles.name}>
                            <h1>Factory Inovation</h1>
                            <p>v2</p>
                        </div>
                        <p>Por favor entre com as suas informações</p>
                    </div>
                    <div className={styles.inputs}>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <div className={styles.password}>
                            <input
                                type={inputType}
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <button
                                className={styles.eye_button}
                                type="button"
                                onClick={toggleInput}
                            >
                                <PiEye size={24} className={toggle} />
                            </button>
                        </div>
                    </div>
                    <button
                        className={styles.signup_button}
                        type="submit"
                        disabled={!email || !name || !password}
                    >
                        Cadastrar
                    </button>
                    <div className={styles.login}>
                        <p>Já tem uma conta?</p>
                        <Link href="/login" className={styles.link}>
                            Log in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

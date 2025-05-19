"use client";
import carFactory from "@/assets/factory.jpg";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiEye } from "react-icons/pi";
import styles from "./styles.module.css";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [inputType, setInputType] = useState("password");
    const [toggle, setToggle] = useState(styles.button);
    const [error, setError] = useState(styles.escondido);

    const toggleInput = () => {
        setInputType(inputType === "text" ? "password" : "text");
        setToggle(toggle === styles.button ? styles.button_active : styles.button);
    };

    const passwordEmailError = (state: boolean) => {
        if (state === true) {
            setError(styles.aparecido);
            setEmail("");
            setPassword("");
        }
    };

    const router = useRouter();

    async function handleLogin() {
        try {
            const response = await axios.post<{ access_token: string }>(`http://localhost:5500/user/login`, {
                email,
                password,
            });

            localStorage.setItem("access_token", response.data.access_token);
            router.push("/dashboard");
        } catch {
            passwordEmailError(true);
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.main}>
                <form className={styles.login} onSubmit={handleLogin}>
                    <div className={styles.name_p}>
                        <div className={styles.name}>
                            <h1>Factory Inovation</h1>
                            <p>v2</p>
                        </div>
                        <p>Por favor entre com as suas informações</p>
                    </div>
                    <div className={styles.inputs}>
                        <input type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <div className={styles.password}>
                            <input type={inputType} placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                            <button className={styles.eye_button} type="button" onClick={toggleInput}>
                                <PiEye size={24} className={toggle} />
                            </button>
                        </div>
                    </div>
                    <p className={error}>Email ou/e Password incorreta ou inexistente</p>
                    <button className={styles.login_button} type="submit" disabled={!email || !password}>
                        Log in
                    </button>
                    <div className={styles.cadastro}>
                        <p>Não tem uma conta?</p>
                        <Link href="/signup" className={styles.link}>
                            Cadastrar-se
                        </Link>
                    </div>
                </form>
                <Image src={carFactory} alt="Car Factory" className={styles.car_factory} />
            </div>
        </div>
    );
}

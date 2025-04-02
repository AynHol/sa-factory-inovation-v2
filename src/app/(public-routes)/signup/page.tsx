"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import carFactory from "@/assets/factory.jpg";
import Link from "next/link";
import Password from "@/components/Password";
import { v4 as uuid } from "uuid";
import { FormEvent, useState } from "react";
import axios from "axios";

type Profile = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export default function SignUp() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    async function handleCreateProfile(event: FormEvent) {
        event.preventDefault();
        const person = {
            id: uuid(),
            name: name,
            email: email,
            password: "123",
        };
        await axios.post("http://localhost:5500/profiles", person);
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
                        <Password placeholder="Password" />
                        <Password placeholder="Confirmar Password" />
                    </div>
                    <button className={styles.signup_button} type="submit">
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

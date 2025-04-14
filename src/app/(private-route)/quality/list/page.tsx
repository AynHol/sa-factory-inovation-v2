"use client";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function QualityList() {
    const router = useRouter();
    const avaliar = () => {
        router.replace("/quality/create");
    };

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>QA Pendente</h1>
                    <p>Veículos no aguardo de Controle de Qualidade</p>
                </div>
                <ul className={styles.lista}>
                    <li className={styles.li}>
                        <div>
                            <div className={styles.info}>
                                <p>Nome: Uno</p>
                                <p>Serie: 123</p>
                            </div>
                            <button onClick={avaliar}>Avaliar</button>
                        </div>
                    </li>
                    <li className={styles.li}>
                        <div>
                            <div className={styles.info}>
                                <p>Nome: Gol</p>
                                <p>Serie: 124</p>
                            </div>
                            <button onClick={avaliar}>Avaliar</button>
                        </div>
                    </li>
                    <li className={styles.li}>
                        <div>
                            <div className={styles.info}>
                                <p>Nome: Palio</p>
                                <p>Serie: 133</p>
                            </div>
                            <button onClick={avaliar}>Avaliar</button>
                        </div>
                    </li>
                    <li className={styles.li}>
                        <div>
                            <div className={styles.info}>
                                <p>Nome: Corolla</p>
                                <p>Serie: 143</p>
                            </div>
                            <button onClick={avaliar}>Avaliar</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

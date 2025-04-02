import Image from "next/image";
import styles from "./styles.module.css";
import carFactory from "@/assets/factory.jpg";
import Link from "next/link";
import Password from "@/components/Password";

export default function Login() {
    return (
        <div className={styles.body}>
            <div className={styles.main}>
                <div className={styles.login}>
                    <div className={styles.name_p}>
                        <div className={styles.name}>
                            <h1>Factory Inovation</h1>
                            <p>v2</p>
                        </div>
                        <p>Por favor entre com as suas informações</p>
                    </div>
                    <div className={styles.inputs}>
                        <input type="text" placeholder="Email" />
                        <Password placeholder="Password" />
                    </div>
                    <button className={styles.login_button}>Log in</button>
                    <div className={styles.cadastro}>
                        <p>Não tem uma conta?</p>
                        <Link href="/signup" className={styles.link}>
                            Cadastrar-se
                        </Link>
                    </div>
                </div>
                <Image src={carFactory} alt="Car Factory" className={styles.car_factory} />
            </div>
        </div>
    );
}

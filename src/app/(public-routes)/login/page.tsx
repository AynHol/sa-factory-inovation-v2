import Image from "next/image";
import "./styles.css";
import carFactory from "@/assets/factory.jpg";
import Link from "next/link";
import Password from "@/components/Password";

export default function Login() {
    return (
        <div className="body">
            <div className="main">
                <div className="login">
                    <div className="name-p">
                        <div className="name">
                            <h1>Factory Inovation</h1>
                            <p>v2</p>
                        </div>
                        <p>Por favor entre com as suas informações</p>
                    </div>
                    <div className="inputs">
                        <input type="text" placeholder="Email" />
                        <Password placeholder="Password" />
                    </div>
                    <button className="login-button">Log in</button>
                    <div className="cadastro">
                        <p>Não tem uma conta?</p>
                        <Link href="/signup" className="link">
                            Cadastrar-se
                        </Link>
                    </div>
                </div>
                <Image src={carFactory} alt="Car Factory" className="car-factory" />
            </div>
        </div>
    );
}

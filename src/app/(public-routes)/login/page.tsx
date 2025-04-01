import Image from "next/image";
import "./styles.css";
import carFactory from "@/assets/factory.jpg"

export default function Home() {
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
                        <input type="text" placeholder="Password" />
                    </div>
                    <button className="login-button">Log in</button>
                    <div className="cadastro">
                        <p>Não tem uma conta?</p>
                        <button>Cadastrar-se</button>
                    </div>
                </div>
                <Image src={carFactory} alt="Car Factory" className="car-factory" />
            </div>
        </div>
    );
}

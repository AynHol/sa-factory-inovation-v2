"use client"
import { PiDevToLogo, PiMinusCircle, PiPencilSimpleLine, PiSignOut } from "react-icons/pi";
import styles from "./styles.module.css";

export default function Profile() {
    return (
        <div className={styles.body}>
            <div className={styles.close}>
                <button>
                    <PiMinusCircle size={24}/>
                </button>
            </div>
            <div className={styles.container}>
                <div className={styles.profile}>
                    <img src="https://github.com/aynhol.png" />
                    <div className={styles.profileInfos}>
                        <strong>Wesley Antunes</strong>
                        <strong>wesley@gmail.com</strong>
                    </div>
                </div>
                <div className={styles.divisions}>
                    <div className={styles.dev_form}>
                        <button><PiDevToLogo size={32} /></button>
                    </div>
                    <form className={styles.php_form}>
                        <button> <PiPencilSimpleLine size={16} /> Mudar Foto do Perfil</button>
                    </form>
                    <div className={styles.logout}>
                        <button><PiSignOut size={32} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

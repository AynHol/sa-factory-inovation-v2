"use client";
import TopMenu from "@/components/TopMenu";
import styles from "./styles.module.css";
import Profile from "@/components/Profile";
import { PiDevToLogo, PiMinusCircle, PiPencilSimpleLine, PiSignOut } from "react-icons/pi";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    const [hidden, setHidden] = useState(styles.extra);

    const router = useRouter();

    const closeGui = () => {
        event?.preventDefault();
        setHidden(styles.s_extra);
    };

    const logout = () => {
        router.replace("/login");
    };

    return (
        <div className={styles.body}>
            <div className={hidden}>
                <div className={styles.bodytwo}>
                    <form className={styles.close}>
                        <button onClick={closeGui}>
                            <PiMinusCircle size={24} />
                        </button>
                    </form>
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
                                <button>
                                    <PiDevToLogo size={32} />
                                </button>
                            </div>
                            <form className={styles.php_form}>
                                <button>
                                    <PiPencilSimpleLine size={16} /> Mudar Foto do Perfil
                                </button>
                            </form>
                            <div className={styles.logout}>
                                <button onClick={logout}>
                                    <PiSignOut size={32} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.layout}>
                <TopMenu />
                {children}
            </div>
        </div>
    );
}

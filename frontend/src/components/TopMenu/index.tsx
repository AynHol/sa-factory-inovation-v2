"use client";
import Link from "next/link";
import styles from "./styles.module.css";
import { usePathname, useRouter } from "next/navigation";
import { PiClipboard, PiFactory, PiHouseLine, PiWarehouse, PiWrench } from "react-icons/pi";
import axios from "axios";
import { useState } from "react";

export default function TopMenu() {
    const pathName = usePathname();
    const router = useRouter();
    const [avatar, setAvatar] = useState("");

    const profile = () => {
        router.replace("/profile");
    };

    async function avatarpfp(id: string) {
        try {
            const storedToken = localStorage.getItem("access_token");
            const response = await axios.get(`http://localhost:5500/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao carregar o avatar");
        }
    }

    const itens = [
        {
            label: "Home",
            page: "/dashboard",
            icon: <PiHouseLine />,
        },
        {
            label: "Manutenção",
            page: "/maintenance",
            icon: <PiWrench />,
        },
        {
            label: "Produção",
            page: "/production",
            icon: <PiFactory />,
        },
        {
            label: "Estoque",
            page: "/stock",
            icon: <PiWarehouse />,
        },
        {
            label: "Qualidade",
            page: "/quality",
            icon: <PiClipboard />,
        },
    ];

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {itens.map((item) => (
                        <Link key={item.label} className={`${styles.item} ${pathName === item.page ? styles.selected : ""}`} href={item.page}>
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
                <div className={styles.profile} onClick={profile}>
                    <img src="https://github.com/aynhol.png" />
                </div>
            </div>
        </div>
    );
}

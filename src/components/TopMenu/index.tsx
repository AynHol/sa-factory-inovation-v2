"use client";
import Link from "next/link";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { PiClipboard, PiFactory, PiHouseLine, PiWarehouse, PiWrench } from "react-icons/pi";

export default function TopMenu() {
    const pathName = usePathname();

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

    const openGui = () => {
        event?.preventDefault()
        
    }

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {itens.map((item) => (
                        <Link
                            key={item.label}
                            className={`${styles.item} ${
                                pathName === item.page ? styles.selected : ""
                            }`}
                            href={item.page}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
                <div className={styles.profile} >
                    <img src="https://github.com/aynhol.png" />
                </div>
            </div>
        </div>
    );
}

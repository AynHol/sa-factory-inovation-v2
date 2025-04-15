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
            pagename: "/dashboard",
            page: "/dashboard",
            icon: <PiHouseLine />,
        },
        {
            label: "Manutenção",
            pagename: "/maintenance",
            page: "/maintenance",
            icon: <PiWrench />,
        },
        {
            label: "Produção",
            pagename: "/production",
            page: "/production",
            icon: <PiFactory />,
        },
        {
            label: "Estoque",
            pagename: "/stock/",
            page: "/stock",
            icon: <PiWarehouse />,
        },
        {
            label: "Qualidade",
            pagename: "/quality",
            page: "/quality",
            icon: <PiClipboard />,
        },
    ];

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {itens.map((item) => (
                        <Link
                            key={item.label}
                            className={`${styles.item} ${
                                pathName === item.pagename ? styles.selected : ""
                            }`}
                            href={item.page}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
                <div className={styles.profile}>
                    <img src="https://github.com/aynhol.png" />
                </div>
            </div>
        </div>
    );
}

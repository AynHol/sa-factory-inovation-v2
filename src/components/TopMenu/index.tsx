"use client";
import Link from "next/link";
import "./styles.css";
import { usePathname } from "next/navigation";
import { PiClipboard, PiFactory, PiHouseLine, PiWarehouse, PiWrench } from "react-icons/pi";

export default function TopMenu() {
    const pathName = usePathname();

    const itens = [
        {
            label: "Home",
            page: "/dashboard",
            icon: <PiHouseLine/>,
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
        <div className="body">
            <div className="container">
                <div className="content">
                    {itens.map((item) => (
                        <Link
                            key={item.label}
                            className={`item ${pathName === item.page ? "selected" : ""}`}
                            href={item.page}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

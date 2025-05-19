"use client";
import TopMenu from "@/components/TopMenu";
import styles from "./styles.module.css";
import Profile from "@/components/Profile";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.body}>
            <div className={styles.layout}>
                <TopMenu />
                {children}
            </div>
        </div>
    );
}

'use client'
import TopMenu from "@/components/TopMenu"
import "./styles.css"

export default function PrivateLayout({ children }: { children: React.ReactNode}){
    return (
        <div className="layout">
            <TopMenu />
            {children}
        </div>
    )
}
"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiPlus } from "react-icons/pi";
import styles from "./styles.module.css";

const columns: GridColDef<any[number]>[] = [
    {
        field: "name",
        headerName: "Nome",
        width: 150,
        resizable: false,
    },
    {
        field: "markName",
        headerName: "Marca",
        resizable: false,
    },
    {
        field: "amount",
        headerName: "Quantidade",
        type: "number",
        align: "center",
        resizable: false,
    },
    {
        field: "description",
        headerName: "Descrição",
        width: 500,
        sortable: false,
        resizable: false,
    },
];

export default function Stock() {
    const [stock, setStock] = useState<any[]>([]);

    const router = useRouter();

    useEffect(() => {
        loadItens();
    }, []);

    async function loadItens() {
        const storedToken = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:5500/stock", {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        const markName = response.data.map((item: any) => ({
            ...item,
            markName: item.mark?.name || "",
        }));
        setStock(markName);
    }

    const pageCreateStock = () => {
        router.replace("/stock/create");
    };

    return (
        <div className={styles.body}>
            <div className={styles.box}>
                <div className={styles.header}>
                    <h1>Lista Estoque</h1>
                    <button className={styles.plus} onClick={pageCreateStock}>
                        <PiPlus size={18} />
                    </button>
                </div>
                <div className={styles.datagrid}>
                    <DataGrid rows={stock} columns={columns as any} sx={{ maxHeight: "70vh" }} hideFooter checkboxSelection disableRowSelectionOnClick />
                </div>
            </div>
        </div>
    );
}

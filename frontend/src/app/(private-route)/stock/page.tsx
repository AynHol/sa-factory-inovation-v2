"use client";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PiPlus } from "react-icons/pi";
import { useEffect, useState } from "react";
import axios from "axios";

const columns: GridColDef<any[number]>[] = [
    { field: "position", headerName: "Posição", align: "center", width: 70 },
    {
        field: "name",
        headerName: "Nome",
        width: 150,
    },
    {
        field: "marca",
        headerName: "Marca",
    },
    {
        field: "amount",
        headerName: "Quantidade",
        type: "number",
        align: "center",
    },
    {
        field: "description",
        headerName: "Descrição",
        width: 500,
        sortable: false,
    },
];

export default function Stock() {
    const [stock, setStock] = useState<Stock[]>([]);

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
        setStock(response.data);
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

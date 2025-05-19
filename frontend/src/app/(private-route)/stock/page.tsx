"use client";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PiPlus } from "react-icons/pi";

const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID" },
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
    },
    {
        field: "description",
        headerName: "Descrição",
        width: 500,
        sortable: false,
    },
];

const rows = [
    { id: 1, name: "Pneu", marca: "Fabricante", amount: 305, description: "É um pneu" },
    { id: 2, name: "Porta", marca: "Fabricante", amount: 452, description: "É uma porta" },
    { id: 3, name: "Motor", marca: "Fabricante", amount: 262, description: "É um motor" },
    {
        id: 4,
        name: "Lataria",
        marca: "Fabricante",
        amount: 159,
        description: "É uma lataria",
    },
    {
        id: 5,
        name: "Espelho",
        marca: "Fabricante",
        amount: 356,
        description: "É um espelho",
    },
    { id: 6, name: "Vidro", marca: "Fabricante", amount: 408, description: "É um vidro" },
    { id: 7, name: "Airbag", marca: "Fabricante", amount: 237, description: "É um airbag" },
    {
        id: 8,
        name: "Sistema Eletrônico",
        marca: "Fabricante",
        amount: 375,
        description: "É o Sistema Eletrônico",
    },
    { id: 9, name: "Banco", marca: "Fabricante", amount: 518, description: "É um banco" },
    { id: 10, name: "Farol", marca: "Fabricante", amount: 392, description: "É um farol" },
    { id: 11, name: "Extras", marca: "Fabricante", amount: 318, description: "É os extras" },
    {
        id: 12,
        name: "Pneu",
        marca: "Fabricante 2",
        amount: 360,
        description: "É um pneu de outro aro",
    },
    {
        id: 13,
        name: "Motor",
        marca: "Fabricante 2",
        amount: 437,
        description: "É um motor de mais cavalos",
    },
];

export default function Stock() {
    const router = useRouter();

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
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        sx={{ maxHeight: "70vh" }}
                        hideFooter
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </div>
            </div>
        </div>
    );
}

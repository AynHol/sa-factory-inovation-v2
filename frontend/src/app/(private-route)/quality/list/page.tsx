"use client";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function QualityList() {
    const [car, setCar] = useState<Production[]>([]);

    const router = useRouter();

    useEffect(() => {
        loadItens();
    }, []);

    async function loadItens() {
        const storedToken = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:5500/production/noquality", {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        setCar(response.data);
    }

    function avaliar(id: string) {
        return router.replace(`/quality/create?id=${id}`);
    }

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>QA Pendente</h1>
                    <p>Veículos no aguardo do Controle de Qualidade!</p>
                </div>
                <TableContainer style={{ maxHeight: 400 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {car.map((production) => (
                                <TableRow key={production.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {production.model}
                                    </TableCell>
                                    <TableCell align="right">
                                        <button onClick={() => avaliar(production.id)} className={styles.button}>
                                            Avaliar
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

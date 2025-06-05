"use client";
import { FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Maintenance() {
    const [car, setCar] = useState<Quality[]>([]);

    const router = useRouter();

    useEffect(() => {
        loadItens();
    }, []);

    async function loadItens() {
        const storedToken = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:5500/quality/fail", {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        setCar(response.data);
    }

    function manutencao(id: string) {
        return router.replace(`/maintenance/car?id=${id}`);
    }

    return (
        <div className={styles.body}>
            {/* <div className={styles.container}>
                <h1>Manutenção Preventiva</h1>
                <div className={styles.div}>
                    <FormControl sx={{ width: 200 }}>
                        <InputLabel sx={{ backgroundColor: "#fff" }}>Selecione o Veiculo</InputLabel>
                        <Select>
                            <MenuItem value={10}>Uno</MenuItem>
                            <MenuItem value={20}>Gol</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div> */}
            <div className={styles.table}>
                <div className={styles.header}>
                    <h1>Veículos em Manutenção</h1>
                    <p>Veículos no aguardo de Manutenção!</p>
                </div>
                <TableContainer style={{ maxHeight: 400 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Qualidade</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {car.map((fail) => (
                                <TableRow key={fail.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {fail.car}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {fail.number} / 10
                                    </TableCell>
                                    <TableCell align="right">
                                        <button onClick={() => manutencao(fail.id)} className={styles.button}>
                                            Manutenção
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

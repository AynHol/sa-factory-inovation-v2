"use client";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function QualityList() {
    const router = useRouter();
    const avaliar = () => {
        router.replace("/quality/create");
    };

    function createData(name: string, serie: number) {
        return { name, serie };
    }

    const rows = [
        createData("Uno", 159),
        createData("Gol", 237),
        createData("Palio", 262),
        createData("Corolla", 305),
        createData("Golf", 356)
    ];

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>QA Pendente</h1>
                    <p>Veículos no aguardo do Controle de Qualidade!</p>
                </div>
                <TableContainer style={{maxHeight: 400}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Serie</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.serie}</TableCell>
                                    <TableCell align="right">
                                        <button onClick={avaliar} className={styles.button}>
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

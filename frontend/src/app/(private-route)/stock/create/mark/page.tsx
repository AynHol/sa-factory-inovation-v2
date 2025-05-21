"use client";
import { CheckCircle } from "@mui/icons-material";
import { Box, Button, LinearProgress, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function Mark() {
    const [progress, setProgress] = useState(".");
    const [buttonStatus, setButtonStatus] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    const [mark, setMark] = useState("");

    const router = useRouter();

    async function handleCreateMark(event: FormEvent) {
        event.preventDefault();
        setIsLoading(true);
        setButtonStatus(false);

        const result = {
            name: mark,
        };
        const storedToken = localStorage.getItem("access_token");
        await axios.post("http://localhost:5500/mark/create", result, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });

        setIsLoading(false);
        setSent(true);
        setTimeout(() => {
            router.replace("/stock/create");
        }, 3000);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress == "..." ? "." : prevProgress + "."));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <form className={styles.form}>
                    <div className={styles.selection}>
                        <h2>Registro no Estoque</h2>
                    </div>
                    <h2>Fabricante:</h2>
                    <div>
                        <div className={styles.product}>
                            <TextField label="Nome da Fabricante" variant="outlined" type="string" onChange={(event) => setMark(event.target.value)} value={mark} />
                        </div>
                        <div className={styles.button}>
                            <Button variant="contained" color="success" disabled={buttonStatus == false} onClick={handleCreateMark}>
                                adicionar
                            </Button>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className={styles.loading}>
                            <Box sx={{ width: "80%" }}>
                                <Box>
                                    <LinearProgress />
                                </Box>
                                <Box>
                                    <Typography sx={{ color: "text.primary", marginTop: 1 }}>Adicionando ao Estoque{progress}</Typography>
                                </Box>
                            </Box>
                        </div>
                    ) : !isLoading && sent ? (
                        <div className={styles.sent}>
                            <CheckCircle color="success" fontSize="large" />
                            <p>Adicionado com Sucesso</p>
                        </div>
                    ) : null}
                </form>
            </div>
        </div>
    );
}

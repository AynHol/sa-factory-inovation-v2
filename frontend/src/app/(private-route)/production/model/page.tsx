"use client";
import { FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Box, Button, FormControl, InputLabel, LinearProgress, MenuItem, Select, TextField, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Production() {
    const [progress, setProgress] = useState(".");
    const [buttonStatus, setButtonStatus] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    const [model, setModel] = useState("");

    const router = useRouter();

    async function handleCreateModel(event: FormEvent) {
        event.preventDefault();
        setIsLoading(true);
        setButtonStatus(false);

        const result = {
            name: model,
        };
        const storedToken = localStorage.getItem("access_token");
        await axios.post("http://localhost:5500/model/create", result, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });

        setIsLoading(false);
        setSent(true);
        setTimeout(() => {
            router.replace("/production")
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
                <h2>Novo Modelo</h2>
                <form className={styles.form}>
                    <div className={styles.content}>
                        <div className={styles.div}>
                            <TextField label="Nome do Modelo" variant="outlined" type="string" onChange={(event) => setModel(event.target.value)} value={model} />
                        </div>
                    </div>
                    <div className={styles.button}>
                        <Button variant="contained" color="success" onClick={handleCreateModel} disabled={buttonStatus == false}>
                            Enviar para a Gerência
                        </Button>
                    </div>

                    {isLoading ? (
                        <div className={styles.loading}>
                            <Box sx={{ width: "80%" }}>
                                <Box>
                                    <LinearProgress />
                                </Box>
                                <Box>
                                    <Typography sx={{ color: "text.primary", marginTop: 1 }}>Enviando para a gerência{progress}</Typography>
                                </Box>
                            </Box>
                        </div>
                    ) : !isLoading && sent ? (
                        <div className={styles.sent}>
                            <CheckCircle color="success" fontSize="large" />
                            <p>Enviado com Sucesso</p>
                        </div>
                    ) : null}
                </form>
            </div>
        </div>
    );
}

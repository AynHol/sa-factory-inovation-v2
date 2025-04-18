"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { clearInterval } from "timers";

export default function Production() {
    const [progress, setProgress] = useState(".");
    const [lies, setLies] = useState(styles.nolies);
    const [secondLies, setSecondLies] = useState(styles.nosecondlies);
    const [buttonStatus, setButtonStatus] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress == "..." ? "." : prevProgress + "."));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    const loadLies = () => {
        setButtonStatus(false);
        setLies(styles.lies);

        setTimeout(() => {
            setLies(styles.nolies);
            setSecondLies(styles.secondlies);
            loadsencodLies()
        }, 10000);
    };

    const loadsencodLies = () => {
        setTimeout(() => {
            setSecondLies(styles.nosecondlies);
            setButtonStatus(true);
        }, 4000);
    };

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h2>Novo Veículo</h2>
                <form className={styles.form}>
                    <div className={styles.content}>
                        <div className={`${styles.div} ${styles.div1}`}>
                            <FormControl sx={{ width: 200 }}>
                                <InputLabel sx={{ backgroundColor: "#fff" }}>
                                    Selecione o Modelo
                                </InputLabel>
                                <Select>
                                    <MenuItem value={10}>Uno</MenuItem>
                                    <MenuItem value={20}>Gol</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: 200 }}>
                                <InputLabel sx={{ backgroundColor: "#fff" }}>
                                    Selecione a Cor
                                </InputLabel>
                                <Select>
                                    <MenuItem value={10}>Preto</MenuItem>
                                    <MenuItem value={20}>Vermelho</MenuItem>
                                    <MenuItem value={30}>Branco</MenuItem>
                                    <MenuItem value={40}>Prata</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={styles.div}>
                            <TextField label="Quantidade" variant="outlined" type="number" />
                            <FormControl sx={{ width: 300 }}>
                                <InputLabel sx={{ backgroundColor: "#fff" }}>
                                    Selecione a Quantidade de Portas
                                </InputLabel>
                                <Select>
                                    <MenuItem value={10}>2</MenuItem>
                                    <MenuItem value={20}>4</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className={styles.button}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={loadLies}
                            disabled={buttonStatus == false}
                        >
                            Enviar para produção
                        </Button>
                    </div>
                    <div className={lies}>
                        <Box sx={{ width: "80%" }} >
                            <Box>
                                <LinearProgress />
                            </Box>
                            <Box>
                                <Typography sx={{ color: "text.primary", marginTop: 1 }}>
                                    Enviando para a produção{progress}
                                </Typography>
                            </Box>
                        </Box>
                    </div>
                    <div className={secondLies}>
                        <CheckCircle color="success" fontSize="large" />
                        <p>Enviado com Sucesso</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

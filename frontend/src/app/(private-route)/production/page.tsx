"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, LinearProgress, MenuItem, Select, TextField, Tooltip, Typography } from "@mui/material";
import { AddBox, Air, CheckCircle, Computer, HdrAutoOutlined } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { TbAutomaticGearbox, TbManualGearbox } from "react-icons/tb";

export default function Production() {
    const [progress, setProgress] = useState(".");
    const [buttonStatus, setButtonStatus] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    const [airbag, setAirbag] = useState<boolean>(false);
    const [eletric, setEletric] = useState<boolean>(false);
    const [gear, setGear] = useState<boolean>(false);
    const [modelId, setModelId] = useState("");
    const [model, setModel] = useState<Model[]>([]);

    const router = useRouter();

    useEffect(() => {
        loadItens();
    }, []);

    async function loadItens() {
        const storedToken = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:5500/model", {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        setModel(response.data);
    }

    function handleSubmit() {
        setIsLoading(true);
        setButtonStatus(false);

        setIsLoading(false);
        setSent(true);
        setTimeout(() => {
            setSent(false);
            setButtonStatus(true);
        }, 3000);
    }

    const newModel = () => {
        router.replace("/production/model");
    };

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
                <div className={styles.selection}>
                    <h2>Novo Veículo</h2>
                    <Tooltip title={"Clique para registrar um novo modelo"}>
                        <Button onClick={newModel}>
                            <AddBox />
                        </Button>
                    </Tooltip>
                </div>
                <form className={styles.form}>
                    <div className={styles.content}>
                        <div className={`${styles.div} ${styles.div1}`}>
                            <FormControl sx={{ width: 200 }}>
                                <InputLabel sx={{ backgroundColor: "#fff" }}>Selecione o Modelo</InputLabel>
                                <Select onChange={(event) => setModelId(event.target.value)} value={modelId}>
                                    {model.map((model) => (
                                        <MenuItem key={model.id} value={model.id}>
                                            {model.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: 200 }}>
                                <InputLabel sx={{ backgroundColor: "#fff" }}>Selecione a Cor</InputLabel>
                                <Select>
                                    <MenuItem value={"Preto"}>Preto</MenuItem>
                                    <MenuItem value={"Vermelho"}>Vermelho</MenuItem>
                                    <MenuItem value={"Branco"}>Branco</MenuItem>
                                    <MenuItem value={"Prata"}>Prata</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={styles.div}>
                            <TextField label="Quantidade" variant="outlined" type="number" />
                            <FormControl sx={{ width: 300 }}>
                                <InputLabel sx={{ backgroundColor: "#fff" }}>Selecione a Quantidade de Portas</InputLabel>
                                <Select>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <FormGroup sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                <FormControlLabel
                                    control={<Checkbox icon={<Air />} checkedIcon={<Air />} color="primary" onChange={(event) => setAirbag(event.target.checked)} />}
                                    label={airbag === false ? "Sem Airbag" : "Com Airbag"}
                                />
                                <FormControlLabel
                                    control={<Checkbox icon={<Computer />} checkedIcon={<Computer />} color="primary" onChange={(event) => setEletric(event.target.checked)} />}
                                    label={eletric === false ? "Sem Computador de Bordo" : "Com Computador de Bordo"}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            icon={<TbManualGearbox size={25} />}
                                            checkedIcon={<TbAutomaticGearbox size={25} />}
                                            color="primary"
                                            onChange={(event) => setGear(event.target.checked)}
                                        />
                                    }
                                    label={gear === false ? "Manual" : "Automático"}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div className={styles.button}>
                        <Button variant="contained" color="success" onClick={handleSubmit} disabled={buttonStatus == false}>
                            Enviar para a produção
                        </Button>
                    </div>

                    {isLoading ? (
                        <div className={styles.loading}>
                            <Box sx={{ width: "80%" }}>
                                <Box>
                                    <LinearProgress />
                                </Box>
                                <Box>
                                    <Typography sx={{ color: "text.primary", marginTop: 1 }}>Enviando para a produção{progress}</Typography>
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

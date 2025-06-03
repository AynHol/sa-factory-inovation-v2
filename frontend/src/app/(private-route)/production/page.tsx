"use client";
import { FormEvent, useEffect, useState } from "react";
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
    const [airbag, setAirbag] = useState("");
    const [eletric, setEletric] = useState<boolean>(false);
    const [gear, setGear] = useState<boolean>(false);
    const [model, setModel] = useState("");
    const [engine, setEngine] = useState("");
    const [tire, setTire] = useState("");
    const [door, setDoor] = useState("");
    const [colour, setColour] = useState("");
    const [amount, setAmount] = useState("");
    const [gEngine, setGEngine] = useState<Stock[]>([]);
    const [gTire, setGTire] = useState<Stock[]>([]);
    const [production, setProduction] = useState<Production[]>([]);

    const router = useRouter();

    useEffect(() => {
        loadItens();
    }, []);

    async function loadItens() {
        const storedToken = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:5500/stock/engine", {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        const response2 = await axios.get("http://localhost:5500/stock/tire", {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        setGEngine(response.data);
        setGTire(response2.data);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        setIsLoading(true);
        setButtonStatus(false);

        const newProduction = {
            model,
            engineId: engine,
            amount: Number(amount),
            door: Number(door),
            colour,
            tireId: tire,
            airbag: Number(airbag),
            pc: eletric,
            gear,
        };
        const storedToken = localStorage.getItem("access_token");
        await axios.post("http://localhost:5500/production/create", newProduction, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });

        setIsLoading(false);
        setTimeout(() => {
            setSent(true);
            setTimeout(() => {
                setSent(false);
                setButtonStatus(true);
            }, 3000);
        }, 4000);
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
                <h2>Novo Veículo</h2>
                <form className={styles.form}>
                    <div className={styles.content}>
                        <div className={styles.div}>
                            <FormControl>
                                <TextField label="Nome do Modelo" variant="outlined" type="string" onChange={(event) => setModel(event.target.value)} value={model} />
                            </FormControl>
                            <FormControl sx={{ width: 200 }}>
                                <InputLabel sx={{ backgroundColor: "#fff" }}>Selecione o Motor</InputLabel>
                                <Select onChange={(event) => setEngine(event.target.value)} value={engine}>
                                    {gEngine.map((gEngine) => (
                                        <MenuItem key={gEngine.id} value={gEngine.id}>
                                            {gEngine.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className={styles.div}>
                            <TextField label="Quantidade" variant="outlined" type="number" onChange={(event) => setAmount(event.target.value)} value={amount} />
                            <FormControl sx={{ width: 300 }}>
                                <InputLabel sx={{ backgroundColor: "#fff" }}>Selecione a Quantidade de Portas</InputLabel>
                                <Select onChange={(event) => setDoor(event.target.value)} value={door}>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={styles.div}>
                            <FormControl sx={{ width: 223 }}>
                                <InputLabel sx={{ backgroundColor: "#fff" }}>Selecione a Cor</InputLabel>
                                <Select onChange={(event) => setColour(event.target.value)} value={colour}>
                                    <MenuItem value={"Preto"}>Preto</MenuItem>
                                    <MenuItem value={"Vermelho"}>Vermelho</MenuItem>
                                    <MenuItem value={"Branco"}>Branco</MenuItem>
                                    <MenuItem value={"Prata"}>Prata</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: 240 }}>
                                <InputLabel sx={{ backgroundColor: "#fff" }}>Selecione o Tipo de Pneu</InputLabel>
                                <Select onChange={(event) => setTire(event.target.value)} value={tire}>
                                    {gTire.map((gTire) => (
                                        <MenuItem key={gTire.id} value={gTire.id}>
                                            {gTire.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className={styles.div}>
                            <FormControl sx={{ width: 310 }}>
                                <InputLabel sx={{ backgroundColor: "#fff" }}>Selecione a Quantidade de AirBags</InputLabel>
                                <Select onChange={(event) => setAirbag(event.target.value)} value={airbag}>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <FormGroup sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
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

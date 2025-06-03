"use client";
import {
    AddCircle,
    AddCircleOutline,
    Air,
    AirlineSeatReclineNormal,
    CarRepair,
    CarRepairOutlined,
    CheckCircle,
    DirectionsCarFilled,
    DirectionsCarFilledOutlined,
    ElectricCar,
    ElectricCarOutlined,
    LightMode,
    LightModeOutlined,
    PanoramaFishEye,
    SensorDoor,
    SensorDoorOutlined,
    TripOrigin,
    Window,
    WindowOutlined,
} from "@mui/icons-material";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, LinearProgress, MenuItem, Select, Typography } from "@mui/material";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function QualityCreate() {
    const [car, setCar] = useState<string>("");
    const [door, setDoor] = useState<boolean>(false);
    const [engine, setEngine] = useState<boolean>(false);
    const [chassi, setChassi] = useState<boolean>(false);
    const [tire, setTire] = useState<boolean>(false);
    const [window, setWindow] = useState<boolean>(false);
    const [light, setLight] = useState<boolean>(false);
    const [seat, setSeat] = useState<boolean>(false);
    const [airbag, setAirbag] = useState<boolean>(false);
    const [extra, setExtra] = useState<boolean>(false);
    const [eletric, setEletric] = useState<boolean>(false);
    const [progress, setProgress] = useState(".");
    const [buttonStatus, setButtonStatus] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    const [model, setModel] = useState<string>("");

    const router = useRouter();

    useEffect(() => {
        loadItens();
    }, []);

    const id = useSearchParams().get("id");
    async function loadItens() {
        const storedToken = localStorage.getItem("access_token");
        const response = await axios.get(`http://localhost:5500/production/${id}/car`, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        setModel(response.data);
    }

    async function handleCreateQAStatus(event: FormEvent) {
        event.preventDefault();
        setIsLoading(true);
        setButtonStatus(false);

        const result = {
            carId: id,
            door: door,
            engine: engine,
            chassi: chassi,
            tire: tire,
            window: window,
            ligh: light,
            seat: seat,
            airbag: airbag,
            extra: extra,
            eletric: eletric,
        };
        const storedToken = localStorage.getItem("access_token");
        await axios.post("http://localhost:5500/quality/create", result, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });

        setIsLoading(false);
        setSent(true);
        setTimeout(() => {
            router.replace(`/quality/result?id=${id}`);
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
                <h1>Quality Create</h1>
                <div className={styles.selectVehicle}>
                    <h3>Veiculo: {model}</h3>
                </div>
                <p>Marque os componentes que passaram nos testes</p>
                <div className={styles.checkbox}>
                    <div className={styles.check1}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox icon={<SensorDoorOutlined />} checkedIcon={<SensorDoor />} color="success" onChange={(event) => setDoor(event.target.checked)} />
                                }
                                label="Portas"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox icon={<CarRepairOutlined />} checkedIcon={<CarRepair />} color="success" onChange={(event) => setEngine(event.target.checked)} />
                                }
                                label="Motor"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<DirectionsCarFilledOutlined />}
                                        checkedIcon={<DirectionsCarFilled />}
                                        color="success"
                                        onChange={(event) => setChassi(event.target.checked)}
                                    />
                                }
                                label="Lataria"
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<PanoramaFishEye />} checkedIcon={<TripOrigin />} color="success" onChange={(event) => setTire(event.target.checked)} />}
                                label="Pneus"
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<WindowOutlined />} checkedIcon={<Window />} color="success" onChange={(event) => setWindow(event.target.checked)} />}
                                label="Vidros / Espelhos"
                            />
                        </FormGroup>
                    </div>
                    <div className={styles.check2}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox icon={<LightModeOutlined />} checkedIcon={<LightMode />} color="success" onChange={(event) => setLight(event.target.checked)} />}
                                label="Farol"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<AirlineSeatReclineNormal />}
                                        checkedIcon={<AirlineSeatReclineNormal />}
                                        color="success"
                                        onChange={(event) => setSeat(event.target.checked)}
                                    />
                                }
                                label="Bancos"
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<Air />} checkedIcon={<Air />} color="success" onChange={(event) => setAirbag(event.target.checked)} />}
                                label="Airbag"
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<AddCircleOutline />} checkedIcon={<AddCircle />} color="success" onChange={(event) => setExtra(event.target.checked)} />}
                                label="Extras"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox icon={<ElectricCarOutlined />} checkedIcon={<ElectricCar />} color="success" onChange={(event) => setEletric(event.target.checked)} />
                                }
                                label="Sistema Eletrônico"
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className={styles.button}>
                    <form onSubmit={handleCreateQAStatus}>
                        <Button variant="contained" color="success" type="submit">
                            Adicionar
                        </Button>
                    </form>
                </div>

                {isLoading ? (
                    <div className={styles.loading}>
                        <Box sx={{ width: "80%" }}>
                            <Box>
                                <LinearProgress />
                            </Box>
                            <Box>
                                <Typography sx={{ color: "text.primary", marginTop: 1 }}>Gerando Avaliação{progress}</Typography>
                            </Box>
                        </Box>
                    </div>
                ) : !isLoading && sent ? (
                    <div className={styles.sent}>
                        <CheckCircle color="success" fontSize="large" />
                        <p>Gerado com Sucesso</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

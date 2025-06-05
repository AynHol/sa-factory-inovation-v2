"use client";
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import styles from "./styles.module.css";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
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

export default function MaintenanceCar() {
    const [car, setCar] = useState<Quality>();
    const [progress, setProgress] = useState(".");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
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

    const router = useRouter();

    useEffect(() => {
        loadItens();
    }, []);

    const id = useSearchParams().get("id");
    async function loadItens() {
        setIsLoading(true);
        const storedToken = localStorage.getItem("access_token");
        const response = await axios.get(`http://localhost:5500/quality/${id}/car`, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        setCar(response.data);
        setDoor(response.data.door);
        setEngine(response.data.engine);
        setChassi(response.data.chassi);
        setTire(response.data.tire);
        setWindow(response.data.window);
        setLight(response.data.ligh);
        setSeat(response.data.seat);
        setAirbag(response.data.airbag);
        setExtra(response.data.extra);
        setEletric(response.data.eletric);
        setIsLoading(false);
    }

    async function handleUpdateMaintenance(event: FormEvent) {
        event.preventDefault();
        setIsLoading(true);

        const result = {
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
        await axios.patch(`http://localhost:5500/quality/${id}/update`, result, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        await axios.post(`http://localhost:5500/maintenance/${id}/create`, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });

        setIsLoading(false);
        setSent(true);
        setTimeout(() => {
            router.replace(`/maintenance`);
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
                <h1 className={styles.h1R}>Resultado da QA</h1>
                <div className={styles.info}>
                    <p>
                        Veículo: <span className={styles.infoSpan}>{car?.car}</span>
                    </p>
                </div>
                <h3>Detalhado:</h3>
                <div className={styles.detalhado}>
                    <Tooltip title="Portas">
                        <SensorDoor className={car?.door ? styles.success : styles.error} />
                    </Tooltip>
                    <Tooltip title="Motor">
                        <CarRepair className={car?.engine ? styles.success : styles.error} />
                    </Tooltip>
                    <Tooltip title="Lataria">
                        <DirectionsCarFilled className={car?.chassi ? styles.success : styles.error} />
                    </Tooltip>
                    <Tooltip title="Pneus">
                        <TripOrigin className={car?.tire ? styles.success : styles.error} />
                    </Tooltip>
                    <Tooltip title="Vidros / Espelhos">
                        <Window className={car?.window ? styles.success : styles.error} />
                    </Tooltip>
                    <Tooltip title="Farol">
                        <LightMode className={car?.ligh ? styles.success : styles.error} />
                    </Tooltip>
                    <Tooltip title="Bancos">
                        <AirlineSeatReclineNormal className={car?.seat ? styles.success : styles.error} />
                    </Tooltip>
                    <Tooltip title="Airbag">
                        <Air className={car?.airbag ? styles.success : styles.error} />
                    </Tooltip>
                    <Tooltip title="Extras">
                        <AddCircle className={car?.extra ? styles.success : styles.error} />
                    </Tooltip>
                    <Tooltip title="Sistema Eletrônico">
                        <ElectricCar className={car?.eletric ? styles.success : styles.error} />
                    </Tooltip>
                </div>
                <h3 className={styles.h2D}>Manuteção:</h3>
                <p>Marque os componentes que foram reparados</p>
                <div className={styles.checkbox}>
                    <div className={styles.check1}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<SensorDoorOutlined />}
                                        checkedIcon={<SensorDoor />}
                                        checked={door}
                                        color="success"
                                        onChange={(event) => setDoor(event.target.checked)}
                                    />
                                }
                                label="Portas"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CarRepairOutlined />}
                                        checkedIcon={<CarRepair />}
                                        checked={engine}
                                        color="success"
                                        onChange={(event) => setEngine(event.target.checked)}
                                    />
                                }
                                label="Motor"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<DirectionsCarFilledOutlined />}
                                        checkedIcon={<DirectionsCarFilled />}
                                        checked={chassi}
                                        color="success"
                                        onChange={(event) => setChassi(event.target.checked)}
                                    />
                                }
                                label="Lataria"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<PanoramaFishEye />}
                                        checkedIcon={<TripOrigin />}
                                        checked={tire}
                                        color="success"
                                        onChange={(event) => setTire(event.target.checked)}
                                    />
                                }
                                label="Pneus"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<WindowOutlined />}
                                        checkedIcon={<Window />}
                                        checked={window}
                                        color="success"
                                        onChange={(event) => setWindow(event.target.checked)}
                                    />
                                }
                                label="Vidros / Espelhos"
                            />
                        </FormGroup>
                    </div>
                    <div className={styles.check2}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<LightModeOutlined />}
                                        checkedIcon={<LightMode />}
                                        checked={light}
                                        color="success"
                                        onChange={(event) => setLight(event.target.checked)}
                                    />
                                }
                                label="Farol"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<AirlineSeatReclineNormal />}
                                        checkedIcon={<AirlineSeatReclineNormal />}
                                        checked={seat}
                                        color="success"
                                        onChange={(event) => setSeat(event.target.checked)}
                                    />
                                }
                                label="Bancos"
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<Air />} checkedIcon={<Air />} checked={airbag} color="success" onChange={(event) => setAirbag(event.target.checked)} />}
                                label="Airbag"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<AddCircleOutline />}
                                        checkedIcon={<AddCircle />}
                                        checked={extra}
                                        color="success"
                                        onChange={(event) => setExtra(event.target.checked)}
                                    />
                                }
                                label="Extras"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<ElectricCarOutlined />}
                                        checkedIcon={<ElectricCar />}
                                        checked={eletric}
                                        color="success"
                                        onChange={(event) => setEletric(event.target.checked)}
                                    />
                                }
                                label="Sistema Eletrônico"
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className={styles.button}>
                    <Button variant="contained" color="success" onClick={handleUpdateMaintenance}>
                        Concluir
                    </Button>
                </div>
                {isLoading ? (
                    <div className={styles.loading}>
                        <Box sx={{ width: "80%" }}>
                            <Box>
                                <LinearProgress />
                            </Box>
                            <Box>
                                <Typography sx={{ color: "text.primary", marginTop: 1 }}>Corrigindo Avaliação{progress}</Typography>
                            </Box>
                        </Box>
                    </div>
                ) : !isLoading && sent ? (
                    <div className={styles.sent}>
                        <CheckCircle color="success" fontSize="large" />
                        <p>Corrigido com Sucesso</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

"use client";
import { Box, Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import styles from "./styles.module.css";
import {
    AddCircle,
    Air,
    AirlineSeatReclineNormal,
    CarRepair,
    DirectionsCarFilled,
    ElectricCar,
    LightMode,
    SensorDoor,
    TripOrigin,
    Window,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

type Result = {
    id: string;
    car: string;
    door: boolean;
    engine: boolean;
    chassi: boolean;
    tire: boolean;
    window: boolean;
    light: boolean;
    seat: boolean;
    airbag: boolean;
    extra: boolean;
    eletric: boolean;
};

export default function QualityResult() {
    const [result, setResult] = useState<Result>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const router = useRouter();
    const end = () => {
        router.replace("/quality");
    };

    useEffect(() => {
        loadResult();
    }, []);

    async function loadResult() {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5500/qastatus/7f54fa04-380d-44ad-8dd6-6aa680fc80ea");
        setResult(response.data);
        setIsLoading(false);
        console.log(response.data);
        console.log(result);
    }

    const getColor = (status: boolean) => {
        status ? styles.success : styles.error;
    };

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.h1R}>Resultado da QA</h1>
                <div className={styles.info}>
                    <p>
                        Veículo: <span className={styles.infoSpan}>{result?.car}</span>
                    </p>
                    <p>
                        Serie: <span className={styles.infoSpan}>143</span>
                    </p>
                </div>
                <h2 className={styles.h2R}>Resumo:</h2>
                <div className={styles.resumo}>
                    <Box sx={{ position: "relative" }}>
                        <CircularProgress
                            variant="determinate"
                            size={70}
                            value={100}
                            thickness={4.9}
                            sx={{
                                color: "#d32f2f",
                            }}
                        />
                        <CircularProgress
                            variant="determinate"
                            size={70}
                            value={75}
                            thickness={5}
                            sx={{
                                position: "absolute",
                                color: "#2e7d32",
                                left: 0,
                            }}
                        />
                        <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: "absolute",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="caption" component="div" sx={{ color: "text.secondary" }}>
                                7/10
                            </Typography>
                        </Box>
                    </Box>
                    <p>
                        Resultado: <span className={styles.status}>Reprovado</span>
                    </p>
                </div>
                <h2 className={styles.h2D}>Detalhado:</h2>

                {isLoading ? (
                    <h1>Carregando...</h1>
                ) : (
                    <div className={styles.detalhado}>
                        <Tooltip title="Portas">
                            <SensorDoor className={result?.door ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Motor">
                            <CarRepair className={result?.engine ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Lataria">
                            <DirectionsCarFilled className={result?.chassi ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Pneus">
                            <TripOrigin className={result?.tire ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Vidros / Espelhos">
                            <Window className={result?.window ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Farol">
                            <LightMode className={result?.light ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Bancos">
                            <AirlineSeatReclineNormal className={result?.seat ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Airbag">
                            <Air className={result?.airbag ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Extras">
                            <AddCircle className={result?.extra ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Sistema Eletrônico">
                            <ElectricCar className={result?.eletric ? styles.success : styles.error} />
                        </Tooltip>
                    </div>
                )}
                <div className={styles.button}>
                    <Button variant="contained" color="success" onClick={end}>
                        Concluir
                    </Button>
                </div>
            </div>
        </div>
    );
}

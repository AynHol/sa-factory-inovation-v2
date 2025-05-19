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
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

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
    const [approval, setApproval] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        loadResult();
    }, []);

    const id = useSearchParams().get("id");

    async function loadResult() {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5500/qastatus/${id}`);
        setResult(response.data);
        setIsLoading(false);
    }

    const resumo = () => {
        var n = 0;
        result?.airbag ? ++n : n + 0;
        result?.chassi ? ++n : n + 0;
        result?.door ? ++n : n + 0;
        result?.eletric ? ++n : n + 0;
        result?.engine ? ++n : n + 0;
        result?.extra ? ++n : n + 0;
        result?.light ? ++n : n + 0;
        result?.seat ? ++n : n + 0;
        result?.tire ? ++n : n + 0;
        result?.window ? ++n : n + 0;
        return n;
    };

    const resumoCal = () => {
        const n = resumo();
        const cal = n * 10;
        return cal;
    };

    useEffect(() => {
        resumo() === 10 ? setApproval(true) : setApproval(false);
    });

    async function handleEnd(event: FormEvent) {
        event.preventDefault();
        await axios.patch(`http://localhost:5500/qastatus/${id}`, {
            approval: approval,
        });
        router.replace("/quality");
    }

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.h1R}>Resultado da QA</h1>
                <div className={styles.info}>
                    <p>
                        Veículo: <span className={styles.infoSpan}>{result?.car}</span>
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
                            value={resumoCal()}
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
                            <Typography
                                variant="caption"
                                component="div"
                                sx={{ color: "text.secondary" }}
                            >
                                {resumo()}/10
                            </Typography>
                        </Box>
                    </Box>

                    {approval ? (
                        <p>
                            Resultado: <span className={styles.statusA}>Aprovado</span>
                        </p>
                    ) : (
                        <p>
                            Resultado: <span className={styles.statusR}>Reprovado</span>
                        </p>
                    )}
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
                            <DirectionsCarFilled
                                className={result?.chassi ? styles.success : styles.error}
                            />
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
                            <AirlineSeatReclineNormal
                                className={result?.seat ? styles.success : styles.error}
                            />
                        </Tooltip>
                        <Tooltip title="Airbag">
                            <Air className={result?.airbag ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Extras">
                            <AddCircle className={result?.extra ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Sistema Eletrônico">
                            <ElectricCar
                                className={result?.eletric ? styles.success : styles.error}
                            />
                        </Tooltip>
                    </div>
                )}
                <div className={styles.button}>
                    <Button variant="contained" color="success" onClick={handleEnd}>
                        Concluir
                    </Button>
                </div>
            </div>
        </div>
    );
}

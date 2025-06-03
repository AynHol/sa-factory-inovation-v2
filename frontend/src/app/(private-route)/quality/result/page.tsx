"use client";
import { Box, Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import styles from "./styles.module.css";
import { AddCircle, Air, AirlineSeatReclineNormal, CarRepair, DirectionsCarFilled, ElectricCar, LightMode, SensorDoor, TripOrigin, Window } from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

export default function QualityResult() {
    const [quality, setQuality] = useState<Quality>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const router = useRouter();

    useEffect(() => {
        loadItens();
    }, []);

    const id = useSearchParams().get("id");
    async function loadItens() {
        setIsLoading(true);
        const storedToken = localStorage.getItem("access_token");
        const response = await axios.get(`http://localhost:5500/quality/${id}`, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        setQuality(response.data);
        setIsLoading(false);
    }

    function handleEnd() {
        router.replace("/quality");
    }

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.h1R}>Resultado da QA</h1>
                <div className={styles.info}>
                    <p>
                        Veículo: <span className={styles.infoSpan}>{quality?.car}</span>
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
                            value={quality?.resume}
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
                                {quality?.number}/10
                            </Typography>
                        </Box>
                    </Box>

                    {quality?.aproval ? (
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
                            <SensorDoor className={quality?.door ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Motor">
                            <CarRepair className={quality?.engine ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Lataria">
                            <DirectionsCarFilled className={quality?.chassi ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Pneus">
                            <TripOrigin className={quality?.tire ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Vidros / Espelhos">
                            <Window className={quality?.window ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Farol">
                            <LightMode className={quality?.ligh ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Bancos">
                            <AirlineSeatReclineNormal className={quality?.seat ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Airbag">
                            <Air className={quality?.airbag ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Extras">
                            <AddCircle className={quality?.extra ? styles.success : styles.error} />
                        </Tooltip>
                        <Tooltip title="Sistema Eletrônico">
                            <ElectricCar className={quality?.eletric ? styles.success : styles.error} />
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

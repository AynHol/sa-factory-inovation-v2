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

export default function QualityResult() {
    const router = useRouter();
    const end = () => {
        router.replace("/quality");
    };

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.h1R}>Resultado da QA</h1>
                <div className={styles.info}>
                    <p>Veículo: <span className={styles.infoSpan}>Uno</span></p>
                    <p>Serie: <span className={styles.infoSpan}>143</span></p>
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
                <div className={styles.detalhado}>
                    <Tooltip title="Portas">
                        <SensorDoor color="success" />
                    </Tooltip>
                    <Tooltip title="Motor">
                        <CarRepair color="error" />
                    </Tooltip>
                    <Tooltip title="Lataria">
                        <DirectionsCarFilled color="success" />
                    </Tooltip>
                    <Tooltip title="Pneus">
                        <TripOrigin color="error" />
                    </Tooltip>
                    <Tooltip title="Vidros / Espelhos">
                        <Window color="success" />
                    </Tooltip>
                    <Tooltip title="Farol">
                        <LightMode color="success" />
                    </Tooltip>
                    <Tooltip title="Bancos">
                        <AirlineSeatReclineNormal color="success" />
                    </Tooltip>
                    <Tooltip title="Airbag">
                        <Air color="error" />
                    </Tooltip>
                    <Tooltip title="Extras">
                        <AddCircle color="success" />
                    </Tooltip>
                    <Tooltip title="Sistema Eletrônico">
                        <ElectricCar color="success" />
                    </Tooltip>
                </div>
                <div className={styles.button}>
                    <Button variant="contained" color="success" onClick={end}>
                        Concluir
                    </Button>
                </div>
            </div>
        </div>
    );
}

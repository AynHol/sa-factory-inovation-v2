"use client";
import { Box, Typography } from "@mui/material";
import styles from "./styles.module.css";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { PiClipboard } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Quality() {
    const palette = ["#d32f2f", "#2e7d32"];
    const router = useRouter();
    const [carNum, setCarNum] = useState<number>(0)

    useEffect(() => {
            loadResult();
        }, []);

    async function loadResult() {
        const response = await axios.get(`http://localhost:5500/qastatus/`);
        console.log(response.data)
        setCarNum(response.data.length)
    }

    const list = () => {
        router.replace("/quality/list");
    };

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1>Qualidade</h1>
                <div className={styles.charts}>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography sx={{ marginBottom: 2 }}>Aprovados / Reprovados:</Typography>
                        <PieChart
                            colors={palette}
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 10, label: "Reprovados" },
                                        { id: 1, value: 15, label: "Aprovados" },
                                    ],
                                },
                            ]}
                            width={300}
                            height={300}
                        />
                    </Box>
                    <Box>
                        <Typography sx={{ marginBottom: 2 }}>
                            Itens Aprovados / Reprovados:
                        </Typography>
                        <BarChart
                            colors={palette}
                            xAxis={[
                                {
                                    scaleType: "band",
                                    data: [
                                        "Portas",
                                        "Motor",
                                        "Lataria",
                                        "Pneu",
                                        "Vid. / Esp.",
                                        "Farol",
                                        "Banco",
                                        "Airbag",
                                        "Extras",
                                        "Sist. Elet.",
                                    ],
                                },
                            ]}
                            series={[
                                { data: [4, 3, 5, 3, 5, 3, 5, 3, 5, 3] },
                                { data: [1, 6, 3, 3, 5, 3, 5, 3, 5, 3] },
                            ]}
                            width={800}
                            height={300}
                        />
                    </Box>
                </div>
                <div className={styles.info}>
                    <strong className={styles.total}>
                        Quantidade de Carros Avaliados: <span>{carNum}</span>
                    </strong>
                    <div className={styles.list}>
                        <p>Ver lista de avaliações pendentes:</p>
                        <button onClick={list}>
                            <PiClipboard size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

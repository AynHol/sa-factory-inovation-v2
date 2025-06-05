"use client";
import { Box, Typography } from "@mui/material";
import styles from "./styles.module.css";
import { BarChart, PieChart } from "@mui/x-charts";
import axios from "axios";
import { useEffect, useState } from "react";
import { Build, CheckCircle, Factory, Inventory } from "@mui/icons-material";

export default function Dashboard() {
    const [car, setCar] = useState<Production[]>([]);
    const [stock, setStock] = useState<Stock[]>([]);
    const [carNumber, setCarNumber] = useState<number>(0);
    const [productNumber, setProductNumber] = useState<number>(0);
    const [quality, setQuality] = useState<number>(0);
    const [maintenance, setMaintenance] = useState<number>(0);

    useEffect(() => {
        loadItens();
    }, []);

    async function loadItens() {
        const storedToken = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:5500/production", {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        const response2 = await axios.get("http://localhost:5500/stock", {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        const response3 = await axios.get("http://localhost:5500/quality/all", {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        const response4 = await axios.get("http://localhost:5500/maintenance", {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        setCar(response.data);
        setStock(response2.data);
        const total = response.data.reduce((sum: number, car: Production) => sum + car.amount, 0);
        setCarNumber(total);
        const total2 = response2.data.reduce((sum: number, product: Stock) => sum + product.amount, 0);
        setProductNumber(total2);
        const total3 = response3.data.length;
        const aprovado = response3.data.filter((quality: Quality) => quality.aproval === true).length;
        const porcento = total3 > 0 ? Math.round((aprovado / total3) * 100) : 0;
        setQuality(porcento);
        const total4 = response4.data.length;
        setMaintenance(total4);
    }

    const cars: { [car: string]: number } = {};
    car.forEach((car) => {
        cars[car.model] = (cars[car.model] || 0) + car.amount;
    });

    const pieData = Object.entries(cars).map(([model, value], index) => ({
        id: index,
        value,
        label: model,
    }));

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.cardItem}>
                    <div className={`${styles.icon} ${styles.production}`}>
                        <Factory />
                    </div>
                    <div className={styles.cardInfos}>
                        <span>Total de Carros Fabricados</span>
                        <strong>{carNumber}</strong>
                    </div>
                </div>

                <div className={styles.cardItem}>
                    <div className={`${styles.icon} ${styles.stock}`}>
                        <Inventory />
                    </div>
                    <div className={styles.cardInfos}>
                        <span>Total de Produtos</span>
                        <strong>{productNumber}</strong>
                    </div>
                </div>

                <div className={styles.cardItem}>
                    <div className={`${styles.icon} ${styles.maintenance}`}>
                        <Build />
                    </div>
                    <div className={styles.cardInfos}>
                        <span>Manutenções Efetuadas</span>
                        <strong>{maintenance}</strong>
                    </div>
                </div>

                <div className={styles.cardItem}>
                    <div className={`${styles.icon} ${styles.quality}`}>
                        <CheckCircle />
                    </div>
                    <div className={styles.cardInfos}>
                        <span>Qualidade</span>
                        <strong>{quality}%</strong>
                    </div>
                </div>
            </div>
            <div className={styles.charts}>
                <div className={styles.pie}>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography sx={{ marginBottom: 2 }}>Veículos producidos por modelo:</Typography>
                        <PieChart
                            series={[
                                {
                                    data: pieData,
                                },
                            ]}
                            width={300}
                            height={300}
                        />
                    </Box>
                </div>
                {/* <div className={styles.bar}>
                    <Box>
                        <BarChart
                            xAxis={[{ scaleType: "band", data: ["Motor", "Pneu", "Produtos", "Outros"] }]}
                            series={[{ data: [4, 3, 5, 2] }, { data: [1, 6, 3, 3] }, { data: [2, 5, 6, 4] }]}
                            height={300}
                            width={800}
                        />
                    </Box>
                </div> */}
            </div>
        </div>
    );
}

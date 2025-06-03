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
    const [quality, setQuality] = useState<Quality[]>([]);
    const [aprovado, setAprovado] = useState<number>(0);
    const [reprovado, setReprovado] = useState<number>(0);
    const [doorAprovado, setDoorAprovado] = useState<number>(0);
    const [doorReprovado, setDoorReprovado] = useState<number>(0);
    const [engineAprovado, setEngineAprovado] = useState<number>(0);
    const [engineReprovado, setEngineReprovado] = useState<number>(0);
    const [chassiAprovado, setChassiAprovado] = useState<number>(0);
    const [chassiReprovado, setChassiReprovado] = useState<number>(0);
    const [tireAprovado, setTireAprovado] = useState<number>(0);
    const [tireReprovado, setTireReprovado] = useState<number>(0);
    const [WindowAprovado, setWindowAprovado] = useState<number>(0);
    const [WindowReprovado, setWindowReprovado] = useState<number>(0);
    const [LightAprovado, setLightAprovado] = useState<number>(0);
    const [LightReprovado, setLightReprovado] = useState<number>(0);
    const [SeatAprovado, setSeatAprovado] = useState<number>(0);
    const [SeatReprovado, setSeatReprovado] = useState<number>(0);
    const [AirbagAprovado, setAirbagAprovado] = useState<number>(0);
    const [AirbagReprovado, setAirbagReprovado] = useState<number>(0);
    const [ExtraAprovado, setExtraAprovado] = useState<number>(0);
    const [ExtraReprovado, setExtraReprovado] = useState<number>(0);
    const [EletricAprovado, setEletricAprovado] = useState<number>(0);
    const [EletricReprovado, setEletricReprovado] = useState<number>(0);
    const [carNum, setCarNum] = useState<number>(0);

    const router = useRouter();
    const palette = ["#d32f2f", "#2e7d32"];

    useEffect(() => {
        loadItens();
    }, []);

    async function loadItens() {
        const storedToken = localStorage.getItem("access_token");
        const response = await axios.get(`http://localhost:5500/quality/all}`, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        setQuality(response.data);

        const Aprovado = quality.filter((approval) => approval.aproval === true);
        setAprovado(Aprovado.length);
        const Reprovado = quality.filter((approval) => approval.aproval === false);
        setReprovado(Reprovado.length);

        const DoorAprovado = quality.filter((approval) => approval.door === true);
        setDoorAprovado(DoorAprovado.length);
        const DoorReprovado = quality.filter((approval) => approval.door === false);
        setDoorReprovado(DoorReprovado.length);

        const EngineAprovado = quality.filter((approval) => approval.engine === true);
        setEngineAprovado(EngineAprovado.length);
        const EngineReprovado = quality.filter((approval) => approval.engine === false);
        setEngineReprovado(EngineReprovado.length);

        const ChassiAprovado = quality.filter((approval) => approval.chassi === true);
        setChassiAprovado(ChassiAprovado.length);
        const ChassiReprovado = quality.filter((approval) => approval.chassi === false);
        setChassiReprovado(ChassiReprovado.length);

        const TireAprovado = quality.filter((approval) => approval.tire === true);
        setTireAprovado(TireAprovado.length);
        const TireReprovado = quality.filter((approval) => approval.tire === false);
        setTireReprovado(TireReprovado.length);

        const WindowAprovado = quality.filter((approval) => approval.window === true);
        setWindowAprovado(WindowAprovado.length);
        const WindowReprovado = quality.filter((approval) => approval.window === false);
        setWindowReprovado(WindowReprovado.length);

        const LightAprovado = quality.filter((approval) => approval.ligh === true);
        setLightAprovado(LightAprovado.length);
        const LightReprovado = quality.filter((approval) => approval.ligh === false);
        setLightReprovado(LightReprovado.length);

        const SeatAprovado = quality.filter((approval) => approval.seat === true);
        setSeatAprovado(SeatAprovado.length);
        const SeatReprovado = quality.filter((approval) => approval.seat === false);
        setSeatReprovado(SeatReprovado.length);

        const AirbagAprovado = quality.filter((approval) => approval.airbag === true);
        setAirbagAprovado(AirbagAprovado.length);
        const AirbagReprovado = quality.filter((approval) => approval.airbag === false);
        setAirbagReprovado(AirbagReprovado.length);

        const ExtraAprovado = quality.filter((approval) => approval.extra === true);
        setExtraAprovado(ExtraAprovado.length);
        const ExtraReprovado = quality.filter((approval) => approval.extra === false);
        setExtraReprovado(ExtraReprovado.length);

        const EletricAprovado = quality.filter((approval) => approval.eletric === true);
        setEletricAprovado(EletricAprovado.length);
        const EletricReprovado = quality.filter((approval) => approval.eletric === false);
        setEletricReprovado(EletricReprovado.length);

        setCarNum(quality.length);
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
                                        { id: 0, value: reprovado, label: "Reprovados" },
                                        { id: 1, value: aprovado, label: "Aprovados" },
                                    ],
                                },
                            ]}
                            width={300}
                            height={300}
                        />
                    </Box>
                    <Box>
                        <Typography sx={{ marginBottom: 2 }}>Itens Aprovados / Reprovados:</Typography>
                        <BarChart
                            colors={palette}
                            xAxis={[
                                {
                                    scaleType: "band",
                                    data: ["Portas", "Motor", "Lataria", "Pneu", "Vid. / Esp.", "Farol", "Banco", "Airbag", "Extras", "Sist. Elet."],
                                },
                            ]}
                            series={[
                                {
                                    data: [
                                        doorReprovado,
                                        engineReprovado,
                                        chassiReprovado,
                                        tireReprovado,
                                        WindowReprovado,
                                        LightReprovado,
                                        SeatReprovado,
                                        AirbagReprovado,
                                        ExtraReprovado,
                                        EletricReprovado,
                                    ],
                                },
                                {
                                    data: [
                                        doorAprovado,
                                        engineAprovado,
                                        chassiAprovado,
                                        tireAprovado,
                                        WindowAprovado,
                                        LightAprovado,
                                        SeatAprovado,
                                        AirbagAprovado,
                                        ExtraAprovado,
                                        EletricAprovado,
                                    ],
                                },
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

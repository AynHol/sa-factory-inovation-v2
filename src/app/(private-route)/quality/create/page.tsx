"use client";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import styles from "./styles.module.css";
import {
    AddCircle,
    AddCircleOutline,
    Air,
    AirlineSeatReclineNormal,
    CarRepair,
    CarRepairOutlined,
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
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";

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

    const router = useRouter();

    async function handleCreateQAStatus(event: FormEvent) {
        event.preventDefault();
        const result = {
            id: uuid(),
            car: car,
            door: door,
            engine: engine,
            chassi: chassi,
            tire: tire,
            window: window,
            light: light,
            seat: seat,
            airbag: airbag,
            extra: extra,
            eletric: eletric,
        };
        await axios.post("http://localhost:5500/qastatus", result);
        router.replace("/quality/result");
    }

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1>Quality Create</h1>
                <div className={styles.selectVehicle}>
                    <FormControl fullWidth>
                        <InputLabel sx={{ backgroundColor: "#fff" }}>Selecione o veiculo</InputLabel>
                        <Select label="Veiculos" onChange={(event) => setCar(event.target.value as string)} value={car}>
                            <MenuItem value={"Uno"}>Uno</MenuItem>
                            <MenuItem value={"Gol"}>Gol</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <p>Marque os componentes que passaram nos testes</p>
                <div className={styles.checkbox}>
                    <div className={styles.check1}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<SensorDoorOutlined />}
                                        checkedIcon={<SensorDoor />}
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
                                        color="success"
                                        onChange={(event) => setSeat(event.target.checked)}
                                    />
                                }
                                label="Bancos"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<Air />}
                                        checkedIcon={<Air />}
                                        color="success"
                                        onChange={(event) => setAirbag(event.target.checked)}
                                    />
                                }
                                label="Airbag"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<AddCircleOutline />}
                                        checkedIcon={<AddCircle />}
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
                    <form onSubmit={handleCreateQAStatus}>
                        <Button variant="contained" color="success" type="submit">
                            Adicionar
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

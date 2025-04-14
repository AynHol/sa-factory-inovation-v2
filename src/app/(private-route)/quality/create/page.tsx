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
    AirlineSeatFlat,
    CarRepair,
    CarRepairOutlined,
    ControlPoint,
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

export default function QualityCreate() {
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1>Quality Create</h1>
                <div className={styles.selectVehicle}>
                    <FormControl fullWidth>
                        <InputLabel>Selecione o veiculo</InputLabel>
                        <Select label="Veiculos">
                            <MenuItem value={10}>Uno</MenuItem>
                            <MenuItem value={20}>Gol</MenuItem>
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
                                    />
                                }
                                label="Farol"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<AirlineSeatFlat />}
                                        checkedIcon={<AirlineSeatFlat />}
                                        color="success"
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
                                    />
                                }
                                label="Sistema Eletrônico"
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className={styles.button}>
                    <Button variant="contained" color="success">
                        Adicionar
                    </Button>
                </div>
            </div>
        </div>
    );
}

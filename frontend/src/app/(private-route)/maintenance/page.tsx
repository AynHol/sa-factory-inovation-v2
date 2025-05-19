"use client"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import styles from "./styles.module.css"

export default function Maintenance() {

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1>Manutenção</h1>
                <div className={`${styles.div} ${styles.div1}`}>
                            <FormControl sx={{ width: 200 }}>
                                <InputLabel sx={{ backgroundColor: "#fff" }}>
                                    Selecione o Veiculo
                                </InputLabel>
                                <Select>
                                    <MenuItem value={10}>Uno</MenuItem>
                                    <MenuItem value={20}>Gol</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: 280 }}>
                                <InputLabel sx={{ backgroundColor: "#fff" }}>
                                    Selecione o Tipo de Manutenção
                                </InputLabel>
                                <Select>
                                    <MenuItem value={10}>Preventiva</MenuItem>
                                    <MenuItem value={20}>Corretiva</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
            </div>
        </div>
    );
}

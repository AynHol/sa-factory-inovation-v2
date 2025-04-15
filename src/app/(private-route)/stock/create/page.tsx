"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import {
    Button,
    Checkbox,
    Dialog,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
} from "@mui/material";
import { Inventory2, Inventory2Outlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function Production() {
    const [newProduct, setNewProduct] = useState(false);
    const router = useRouter()
    const stock = () => {
        router.replace("/stock")
    }

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <form className={styles.form}>
                    <div className={styles.selection}>
                        <h2>Registro no Estoque</h2>
                        <div>
                            <Tooltip
                                title={
                                    !newProduct
                                        ? "Clique para mudar para registro de novos produtos"
                                        : "Clique para mudar para registro de produtos já existentes"
                                }
                            >
                                <Checkbox
                                    icon={<Inventory2Outlined />}
                                    checkedIcon={<Inventory2 />}
                                    checked={newProduct}
                                    onChange={(e) => setNewProduct(e.target.checked)}
                                />
                            </Tooltip>
                        </div>
                    </div>
                    <h2>Dados:</h2>
                    {!newProduct ? (
                        <div className={styles.product}>
                            <FormControl variant="outlined">
                                <InputLabel sx={{ backgroundColor: "#fff" }}>
                                    Selecione o produto
                                </InputLabel>
                                <Select label="Produtos" sx={{ width: 200 }}>
                                    <MenuItem value={10}>Pneu </MenuItem>
                                    <MenuItem value={20}>Motor</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField label="Quantidade" variant="outlined" type="number" />
                        </div>
                    ) : (
                        <div>
                            <div className={styles.div}>
                                <TextField label="Nome do Produto" variant="outlined" />
                                <TextField label="Descrição" variant="outlined" />
                            </div>
                            <div className={styles.div}>
                                <FormControl>
                                    <InputLabel>Selecione a Marca</InputLabel>
                                    <Select label="Selecione a Marca" sx={{ width: 223 }}>
                                        <MenuItem value={10}>Fabricante</MenuItem>
                                        <MenuItem value={20}>Fabricante 2</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField label="Quantidade" variant="outlined" type="number" />
                            </div>
                        </div>
                    )}
                    <div className={styles.button}>
                        <Button variant="contained" color="success" onClick={stock}>
                            adicionar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

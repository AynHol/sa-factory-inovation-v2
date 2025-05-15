"use client";
import { FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Box, Button, Checkbox, Dialog, FormControl, InputLabel, LinearProgress, MenuItem, Select, TextField, Tooltip, Typography } from "@mui/material";
import { CheckCircle, Inventory2, Inventory2Outlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import axios from "axios";

export default function Production() {
    const [newProduct, setNewProduct] = useState(false);
    const [progress, setProgress] = useState(".");
    const [buttonStatus, setButtonStatus] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    const [name, setName] = useState("");
    const [mark, setMark] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [product, setProduct] = useState("");

    const router = useRouter();

    async function handleCreateStock(event: FormEvent) {
        event.preventDefault();
        setIsLoading(true);
        setButtonStatus(false);

        const result = {
            id: uuid(),
            name: name,
            mark: mark,
            amount: amount,
            description: description,
        };
        await axios.post("http://localhost:5500/stock", result);

        setIsLoading(false);
        setSent(true);
        setTimeout(() => {
            router.replace("/stock");
        }, 3000);
    }

    async function handleUpdateStock(event: FormEvent) {
        event.preventDefault();
        setIsLoading(true);
        setButtonStatus(false);

        await axios.patch(`http://localhost:5500/stock/${id}`);

        setIsLoading(false);
        setSent(true);
        setTimeout(() => {
            router.replace("/stock");
        }, 3000);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress == "..." ? "." : prevProgress + "."));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <form className={styles.form}>
                    <div className={styles.selection}>
                        <h2>Registro no Estoque</h2>
                        <div>
                            <Tooltip title={!newProduct ? "Clique para mudar para registro de novos produtos" : "Clique para mudar para registro de produtos já existentes"}>
                                <Checkbox icon={<Inventory2Outlined />} checkedIcon={<Inventory2 />} checked={newProduct} onChange={(e) => setNewProduct(e.target.checked)} />
                            </Tooltip>
                        </div>
                    </div>
                    <h2>Dados:</h2>
                    {!newProduct ? (
                        <div>
                            <div className={styles.product}>
                                <FormControl variant="outlined">
                                    <InputLabel sx={{ backgroundColor: "#fff" }}>Selecione o produto</InputLabel>
                                    <Select label="Produtos" sx={{ width: 200 }} onChange={(event) => setProduct(event.target.value as string)} value={product}>
                                        <MenuItem value={10}>Pneu </MenuItem>
                                        <MenuItem value={20}>Motor</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField label="Quantidade" variant="outlined" type="number" onChange={(event) => setAmount(event.target.value)} value={amount} />
                            </div>
                            <div className={styles.button}>
                                <Button variant="contained" color="success" onClick={handleUpdateStock} disabled={buttonStatus == false}>
                                    adicionar
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div>
                                <div className={styles.div}>
                                    <TextField label="Nome do Produto" variant="outlined" onChange={(event) => setName(event.target.value)} value={name} />
                                    <TextField label="Descrição" variant="outlined" onChange={(event) => setDescription(event.target.value)} value={description} />
                                </div>
                                <div className={styles.div}>
                                    <FormControl>
                                        <InputLabel>Selecione a Marca</InputLabel>
                                        <Select label="Selecione a Marca" onChange={(event) => setMark(event.target.value as string)} value={mark} sx={{ width: 223 }}>
                                            <MenuItem value={10}>Fabricante</MenuItem>
                                            <MenuItem value={20}>Fabricante 2</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField label="Quantidade" variant="outlined" type="number" onChange={(event) => setAmount(event.target.value)} value={amount} />
                                </div>
                            </div>
                            <div className={styles.button}>
                                <Button variant="contained" color="success" onClick={handleCreateStock} disabled={buttonStatus == false}>
                                    adicionar
                                </Button>
                            </div>
                        </div>
                    )}

                    {isLoading ? (
                        <div className={styles.loading}>
                            <Box sx={{ width: "80%" }}>
                                <Box>
                                    <LinearProgress />
                                </Box>
                                <Box>
                                    <Typography sx={{ color: "text.primary", marginTop: 1 }}>Adicionando ao Estoque{progress}</Typography>
                                </Box>
                            </Box>
                        </div>
                    ) : !isLoading && sent ? (
                        <div className={styles.sent}>
                            <CheckCircle color="success" fontSize="large" />
                            <p>Adicionado com Sucesso</p>
                        </div>
                    ) : null}
                </form>
            </div>
        </div>
    );
}

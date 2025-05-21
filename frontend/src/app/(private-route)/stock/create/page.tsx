"use client";
import { FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Box, Button, Checkbox, Dialog, FormControl, InputLabel, LinearProgress, MenuItem, Select, TextField, Tooltip, Typography } from "@mui/material";
import { Add, AddBox, CheckCircle, Inventory2, Inventory2Outlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import axios from "axios";

export default function StockCreate() {
    const [progress, setProgress] = useState(".");
    const [newProduct, setNewProduct] = useState(false);
    const [buttonStatus, setButtonStatus] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [productId, setProductId] = useState("");
    const [markId, setMarkId] = useState("");
    const [stock, setStock] = useState<Stock[]>([]);
    const [mark, setMark] = useState<Mark[]>([]);

    const router = useRouter();

    useEffect(() => {
        loadItens();
    }, []);

    async function loadItens() {
        const storedToken = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:5500/stock", {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        const response2 = await axios.get("http://localhost:5500/mark", {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        setStock(response.data);
        setMark(response2.data);
    }

    async function handleCreateStock(event: FormEvent) {
        event.preventDefault();
        setIsLoading(true);
        setButtonStatus(false);

        const result = {
            name,
            amount: Number(amount),
            description,
            markId,
        };
        const storedToken = localStorage.getItem("access_token");
        await axios.post("http://localhost:5500/stock/create", result, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });

        setIsLoading(false);
        setSent(true);
        setTimeout(() => {
            router.replace("/stock");
        }, 3000);
    }

    const newMark = () => {
        router.replace("/stock/create/mark");
    };

    async function handleUpdateStock(event: FormEvent) {
        event.preventDefault();
        setIsLoading(true);
        setButtonStatus(false);

        const id = productId
        const updateStock = {
            amount: Number(amount),
        };
        const storedToken = localStorage.getItem("access_token");
        await axios.patch(`http://localhost:5500/stock/${id}/amount`, updateStock, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });

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
                            <Tooltip title={"Clique para registrar um novo fabricante"}>
                                <Button onClick={newMark}>
                                    <AddBox />
                                </Button>
                            </Tooltip>
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
                                    <Select label="Produtos" sx={{ width: 200 }} onChange={(event) => setProductId(event.target.value)} value={productId}>
                                        {stock.map((stock) => (
                                            <MenuItem key={stock.id} value={stock.id}>
                                                {stock.name}
                                            </MenuItem>
                                        ))}
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
                                        <Select label="Selecione a Marca" onChange={(event) => setMarkId(event.target.value as string)} value={markId} sx={{ width: 223 }}>
                                            {mark.map((mark) => (
                                                <MenuItem key={mark.id} value={mark.id}>
                                                    {mark.name}
                                                </MenuItem>
                                            ))}
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

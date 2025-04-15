"use client"
import { PiFolders, PiFunnelSimple, PiPlus, PiTrash } from "react-icons/pi";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

export default function Stock() {
    const router = useRouter()

    const pageCreateStock = () => {
        router.replace("/stock/create")
    }

    return (
        <div className={styles.body}>
            <div className={styles.box}>
                <div className={styles.header}>
                    <h1>Lista Estoque</h1>
                    <div>
                        <button className={styles.del}>
                            <PiTrash size={18} />
                            Deletar
                        </button>
                        <button className={styles.fil}>
                            <PiFunnelSimple size={18} />
                            Filtro
                        </button>
                        <button className={styles.plus} onClick={pageCreateStock}>
                            <PiPlus size={18} />
                        </button>
                    </div>
                </div>
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <th>
                                <PiFolders size={18}/>
                            </th>
                            <th>Nome</th>
                            <th>Fabricante</th>
                            <th>Quantidade</th>
                            <th>Descrição</th>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>Icon</td>
                            <td>Pneu</td>
                            <td>Fabrica</td>
                            <td>18300</td>
                            <td>É um pneu</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>Icon</td>
                            <td>Pneu</td>
                            <td>Fabrica</td>
                            <td>18300</td>
                            <td>É um pneu</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>Icon</td>
                            <td>Pneu</td>
                            <td>Fabrica</td>
                            <td>18300</td>
                            <td>É um pneu</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>Icon</td>
                            <td>Pneu</td>
                            <td>Fabrica</td>
                            <td>18300</td>
                            <td>É um pneu</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>Icon</td>
                            <td>Pneu</td>
                            <td>Fabrica</td>
                            <td>18300</td>
                            <td>É um pneu</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

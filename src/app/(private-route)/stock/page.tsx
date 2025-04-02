import styles from "./styles.module.css"

export default function Stock() {
    return (
        <div className={styles.box}>
            <div className={styles.header}>
                <h1>Lista Estoque</h1>
                <button>Deletar</button>
                <button>Filtro</button>
                <button>+</button>
            </div>
            <div className={styles.table}>
                <div className={styles.icons}>
                    <span>icon</span>
                </div>
                <div className={styles.icons}>
                    <p>Pneu</p>
                </div>
                <div className={styles.fabricante}>
                    <p>Fabricante</p>
                </div>
                <div className={styles.quantidade}>
                    <p>18.354</p>
                </div>
                <div className={styles.description}>
                    <p>É um pneu</p>
                </div>
                <div className={styles.options}>
                    <></>
                </div>
            </div>
        </div>
    );
}

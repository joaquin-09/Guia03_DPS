import styles from "./page.module.css";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Dashboard de estadisticas</h1>
        <p className={styles.subtitle}>Filtro por periodo, metricas con .reduce()/.filter() y tabla ordenable</p>
          <Dashboard />
      </div>
    </main>
  );
}
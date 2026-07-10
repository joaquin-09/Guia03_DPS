"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [contador, setContador] = useState<number>(0);

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1>Contador</h1>
        <p className={styles.valor}>{contador}</p>
        <div className={styles.botones}>
          <button onClick={() => setContador((c) => c - 1)}>- Decrementar</button>
          <button onClick={() => setContador((c) => c + 1)}>+ Incrementar</button>
        </div>
      </div>
    </main>
  );
}

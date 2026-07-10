"use client";
import { useState } from "react";
import styles from "./page.module.css";

type Conversion = "CtoF" | "FtoC";

export default function Home() {
  const [temperatura, setTemperatura] = useState<string>("");
  const [conversion, setConversion] = useState<Conversion>("CtoF");
  const [resultado, setResultado] = useState<string | null>(null);

  const convertir = (): void => {
    const valor = parseFloat(temperatura);
    if (isNaN(valor)) {
      setResultado("Ingresa un valor numérico válido.");
      return;
    }

    if (conversion === "CtoF") {
      const f = (valor * 9) / 5 + 32;
      setResultado(`${valor}°C equivalen a ${f.toFixed(2)}°F`);
    } else {
      const c = ((valor - 32) * 5) / 9;
      setResultado(`${valor}°F equivalen a ${c.toFixed(2)}°C`);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1>Conversor de Temperatura</h1>

        <input
          type="text"
          placeholder="Ingresa la temperatura"
          value={temperatura}
          onChange={(e) => setTemperatura(e.target.value)}
        />

        <select
          value={conversion}
          onChange={(e) => setConversion(e.target.value as Conversion)}
        >
          <option value="CtoF">Celsius → Fahrenheit</option>
          <option value="FtoC">Fahrenheit → Celsius</option>
        </select>

        <button onClick={convertir}>Convertir</button>

        {resultado && <p className={styles.resultado}>{resultado}</p>}
      </div>
    </main>
  );
}

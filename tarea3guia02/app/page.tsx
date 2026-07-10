"use client";
import { useState } from "react";
import styles from "./page.module.css";

// Credenciales de prueba (en un caso real se validarían contra un backend)
const USUARIO_VALIDO = "admin";
const PASSWORD_VALIDO = "1234";

export default function Home() {
  const [usuario, setUsuario] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [exito, setExito] = useState<boolean>(false);

  const iniciarSesion = (): void => {
    if (usuario === USUARIO_VALIDO && password === PASSWORD_VALIDO) {
      setMensaje(`¡Bienvenido, ${usuario}!`);
      setExito(true);
    } else {
      setMensaje("Usuario o contraseña incorrectos.");
      setExito(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1>Iniciar Sesión</h1>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={iniciarSesion}>Ingresar</button>

        {mensaje && (
          <p className={exito ? styles.exito : styles.error}>{mensaje}</p>
        )}
      </div>
    </main>
  );
}

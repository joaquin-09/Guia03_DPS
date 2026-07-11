import styles from "./page.module.css";
import RegisterForm from "../components/RegisterForm";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Registro de Usuario</h1>
        <p className={styles.subtitle}>Formulario con validación en tiempo real</p>
          <RegisterForm />
      </div>
    </main>
  );
}
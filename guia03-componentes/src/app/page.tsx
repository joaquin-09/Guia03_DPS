import styles from "./page.module.css";
import MovieGallery from "../components/MovieGallery";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Galeria de peliculas</h1>
        <p className={styles.subtitle}>Modal reutilizable tipado con interface ModalProps</p>
          <MovieGallery />
      </div>
    </main>
  );
}
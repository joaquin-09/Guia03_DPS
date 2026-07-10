import styles from "./page.module.css";
import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Tienda Online</h1>
        <p className={styles.subtitle}>Lista de productos con filtro por categoria</p>
          <ProductList />
      </div>
    </main>
  );
}
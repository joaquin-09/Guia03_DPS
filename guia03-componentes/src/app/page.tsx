import styles from "./page.module.css";
import ShoppingCart from "../components/ShoppingCart";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Mi tiendan Tech</h1>
        <p className={styles.subtitle}>Carrito de compras con composición de componentes</p>
          <ShoppingCart />
      </div>
    </main>
  );
}
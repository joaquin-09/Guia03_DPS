"use client";
import { useState } from "react";

interface Producto { id: number; nombre: string; precio: number; emoji: string; }
interface ItemCarrito extends Producto { cantidad: number; } // extiende Producto
interface ProductItemProps { producto: Producto; onAgregar: (p: Producto) => void; }
interface CartSummaryProps { carrito: ItemCarrito[]; onEliminar: (id: number) => void; onLimpiar: () => void; }

const catalogo: Producto[] = [
  { id: 1, nombre: "Laptop Pro",       precio: 1299, emoji: "💻" },
  { id: 2, nombre: "Mouse Gamer",      precio: 55,   emoji: "🖱️"  },
  { id: 3, nombre: "Teclado Mecánico", precio: 95,   emoji: "⌨️"  },
  { id: 4, nombre: "Monitor 4K",       precio: 480,  emoji: "🖥️"  },
  { id: 5, nombre: "Auriculares BT",   precio: 79,   emoji: "🎧" },
  { id: 6, nombre: "Webcam HD",        precio: 65,   emoji: "📷" },
];

// Sub-componente hijo 1 — tarjeta de producto
const ProductItem = ({ producto, onAgregar }: ProductItemProps): JSX.Element => (
  <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px',
    padding: '16px', textAlign: 'center' }}>
    <div style={{ fontSize: '2.5rem' }}>{producto.emoji}</div>
    <h4 style={{ margin: '8px 0 4px', color: '#001f3f', fontSize: '.88rem' }}>{producto.nombre}</h4>
    <p style={{ color: '#003f7f', fontWeight: 800, margin: '0 0 12px' }}>${producto.precio}</p>
    {/* Al hacer clic, llama la función del padre pasando este producto */}
    <button onClick={() => onAgregar(producto)}
      style={{ width: '100%', padding: '7px', background: '#003f7f', color: '#fff',
        border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
      + Agregar
    </button>
  </div>
);

// Sub-componente hijo 2 — resumen del carrito
const CartSummary = ({ carrito, onEliminar, onLimpiar }: CartSummaryProps): JSX.Element => {
  // .reduce() para calcular el total
  const total: number = carrito.reduce(
    (acc: number, item: ItemCarrito) => acc + item.precio * item.cantidad, 0
  );
  if (carrito.length === 0) return <p style={{ textAlign: 'center', color: '#5a6a7e' }}>🛒 Carrito vacío</p>;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h3 style={{ margin: 0, color: '#001f3f' }}>Carrito ({carrito.length} items)</h3>
        <button onClick={onLimpiar} style={{ background: '#fdf0ee', color: '#c0392b',
          border: '1px solid #c0392b', borderRadius: '6px', cursor: 'pointer', padding: '4px 12px' }}>
          Vaciar
        </button>
      </div>
      {carrito.map((item: ItemCarrito) => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px',
          padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>
          <span>{item.emoji}</span>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '.85rem' }}>{item.nombre}</p>
            <p style={{ margin: 0, fontSize: '.75rem', color: '#5a6a7e' }}>
              ${item.precio} × {item.cantidad} = <strong>${item.precio * item.cantidad}</strong>
            </p>
          </div>
          <button onClick={() => onEliminar(item.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0392b' }}>✕</button>
        </div>
      ))}
      <div style={{ marginTop: '14px', background: '#e6f1fb', borderRadius: '8px', padding: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <strong>Total:</strong>
          <strong style={{ color: '#003f7f', fontSize: '1.1rem' }}>${total.toLocaleString()}</strong>
        </div>
        <button style={{ width: '100%', marginTop: '10px', padding: '10px', background: '#00a651',
          color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>
          Proceder al pago →
        </button>
      </div>
    </div>
  );
};

// Componente PADRE — gestiona el estado del carrito
export default function ShoppingCart(): JSX.Element {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  // Agregar: si ya existe incrementa cantidad, si no lo agrega con spread
  const agregarAlCarrito = (producto: Producto): void => {
    setCarrito((prev: ItemCarrito[]) => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) return prev.map(item =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id: number): void =>
    setCarrito((prev) => prev.filter(item => item.id !== id));

  const limpiarCarrito = (): void => setCarrito([]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
      <div>
        <h2 style={{ color: '#001f3f', marginBottom: '16px' }}>Catálogo</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: '14px' }}>
          {catalogo.map((p: Producto) => (
            <ProductItem key={p.id} producto={p} onAgregar={agregarAlCarrito} />
          ))}
        </div>
      </div>
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <CartSummary carrito={carrito} onEliminar={eliminarDelCarrito} onLimpiar={limpiarCarrito} />
      </div>
    </div>
  );
}
// src/components/Dashboard.tsx
"use client";
import { useState } from "react";

// "JSON local" — en un proyecto real vendría de un archivo .json importado
interface VentaMensual {
  mes: string;
  trimestre: "Q1" | "Q2" | "Q3" | "Q4";
  ventas: number;
}

const ventasData: VentaMensual[] = [
  { mes: "Enero", trimestre: "Q1", ventas: 12500 },
  { mes: "Febrero", trimestre: "Q1", ventas: 14200 },
  { mes: "Marzo", trimestre: "Q1", ventas: 11800 },
  { mes: "Abril", trimestre: "Q2", ventas: 15300 },
  { mes: "Mayo", trimestre: "Q2", ventas: 16700 },
  { mes: "Junio", trimestre: "Q2", ventas: 13900 },
  { mes: "Julio", trimestre: "Q3", ventas: 18200 },
  { mes: "Agosto", trimestre: "Q3", ventas: 17600 },
  { mes: "Septiembre", trimestre: "Q3", ventas: 15400 },
  { mes: "Octubre", trimestre: "Q4", ventas: 19800 },
  { mes: "Noviembre", trimestre: "Q4", ventas: 21500 },
  { mes: "Diciembre", trimestre: "Q4", ventas: 24300 },
];

// type de unión para el selector de período (incluye "todos")
type Periodo = "todos" | "Q1" | "Q2" | "Q3" | "Q4";
// type de unión para la dirección de orden — null significa "sin ordenar"
type OrdenDireccion = "asc" | "desc" | null;

const periodos: Periodo[] = ["todos", "Q1", "Q2", "Q3", "Q4"];

export default function Dashboard(): JSX.Element {
  const [periodo, setPeriodo] = useState<Periodo>("todos");
  const [orden, setOrden] = useState<OrdenDireccion>(null);

  // Estado derivado — se recalcula en cada render, no necesita su propio useState
  const datosFiltrados: VentaMensual[] =
    periodo === "todos" ? ventasData : ventasData.filter((v) => v.trimestre === periodo);

  const totalVentas: number = datosFiltrados.reduce((acc, v) => acc + v.ventas, 0);
  const promedio: number = datosFiltrados.length > 0 ? totalVentas / datosFiltrados.length : 0;
  const mejorMes: VentaMensual | undefined = datosFiltrados.reduce(
    (mejor: VentaMensual | undefined, actual) =>
      !mejor || actual.ventas > mejor.ventas ? actual : mejor,
    undefined as VentaMensual | undefined
  );

  // Ordena una copia — nunca mutamos datosFiltrados directamente
  const datosOrdenados: VentaMensual[] = [...datosFiltrados].sort((a, b) => {
    if (orden === "asc") return a.ventas - b.ventas;
    if (orden === "desc") return b.ventas - a.ventas;
    return 0;
  });

  // Ciclo: sin ordenar → descendente → ascendente → sin ordenar
  const toggleOrden = (): void => {
    setOrden((prev) => (prev === null ? "desc" : prev === "desc" ? "asc" : null));
  };

  const iconoOrden: string = orden === "asc" ? "▲" : orden === "desc" ? "▼" : "⇅";

  const cardStyle: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "18px",
    boxShadow: "0 2px 6px rgba(0,63,127,.06)",
  };

  return (
    <div>
      <h2 style={{ color: "#001f3f", marginBottom: "16px" }}>Dashboard de Ventas</h2>

      {/* Selector de período */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
        {periodos.map((p) => (
          <button
            key={p}
            onClick={() => setPeriodo(p)}
            style={{
              padding: "6px 18px",
              borderRadius: "20px",
              border: "2px solid #003f7f",
              background: periodo === p ? "#003f7f" : "transparent",
              color: periodo === p ? "#fff" : "#003f7f",
              fontWeight: 600,
              cursor: "pointer",
              textTransform: "uppercase",
              fontSize: ".8rem",
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Tarjetas de resumen */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        <div style={cardStyle}>
          <p style={{ margin: "0 0 6px", color: "#5a6a7e", fontSize: ".8rem", fontWeight: 600 }}>
            TOTAL DE VENTAS
          </p>
          <p style={{ margin: 0, color: "#003f7f", fontSize: "1.5rem", fontWeight: 800 }}>
            ${totalVentas.toLocaleString()}
          </p>
        </div>
        <div style={cardStyle}>
          <p style={{ margin: "0 0 6px", color: "#5a6a7e", fontSize: ".8rem", fontWeight: 600 }}>
            PROMEDIO MENSUAL
          </p>
          <p style={{ margin: 0, color: "#003f7f", fontSize: "1.5rem", fontWeight: 800 }}>
            ${promedio.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div style={cardStyle}>
          <p style={{ margin: "0 0 6px", color: "#5a6a7e", fontSize: ".8rem", fontWeight: 600 }}>
            MEJOR MES
          </p>
          <p style={{ margin: 0, color: "#00a651", fontSize: "1.3rem", fontWeight: 800 }}>
            {mejorMes ? `${mejorMes.mes} — $${mejorMes.ventas.toLocaleString()}` : "—"}
          </p>
        </div>
      </div>

      {/* Tabla ordenable */}
      <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#e6f1fb" }}>
              <th style={{ textAlign: "left", padding: "10px 16px", color: "#001f3f", fontSize: ".85rem" }}>
                Mes
              </th>
              <th style={{ textAlign: "left", padding: "10px 16px", color: "#001f3f", fontSize: ".85rem" }}>
                Trimestre
              </th>
              <th
                onClick={toggleOrden}
                style={{
                  textAlign: "right",
                  padding: "10px 16px",
                  color: "#001f3f",
                  fontSize: ".85rem",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                Ventas {iconoOrden}
              </th>
            </tr>
          </thead>
          <tbody>
            {datosOrdenados.map((v) => (
              <tr key={v.mes} style={{ borderTop: "1px solid #e2e8f0" }}>
                <td style={{ padding: "10px 16px", fontSize: ".88rem", color: "#1a2332" }}>{v.mes}</td>
                <td style={{ padding: "10px 16px", fontSize: ".88rem", color: "#5a6a7e" }}>
                  {v.trimestre}
                </td>
                <td
                  style={{
                    padding: "10px 16px",
                    fontSize: ".88rem",
                    color: "#003f7f",
                    fontWeight: 700,
                    textAlign: "right",
                  }}
                >
                  ${v.ventas.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

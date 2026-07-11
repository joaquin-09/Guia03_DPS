// src/components/MovieGallery.tsx
"use client";
import { useState } from "react";
import Modal from "./Modal";

// Interface con todos los datos de una película
interface Pelicula {
  id: number;
  titulo: string;
  anio: number;
  imagen: string;
  sinopsis: string;
  director: string;
  calificacion: number;
}

// Datos hardcoded — títulos y sinopsis ficticios para el ejercicio
const peliculas: Pelicula[] = [
  {
    id: 1,
    titulo: "El Último Horizonte",
    anio: 2023,
    imagen: "https://picsum.photos/seed/horizonte/400/560",
    sinopsis:
      "Un equipo de exploradores descubre una señal proveniente del borde del sistema solar y debe decidir si perseguirla, arriesgando todo lo que conocen.",
    director: "Laura Méndez",
    calificacion: 8.4,
  },
  {
    id: 2,
    titulo: "Sombras de Abril",
    anio: 2021,
    imagen: "https://picsum.photos/seed/abril/400/560",
    sinopsis:
      "Una detective regresa a su ciudad natal para resolver un caso que la obliga a enfrentar secretos familiares enterrados hace veinte años.",
    director: "Diego Ramírez",
    calificacion: 7.6,
  },
  {
    id: 3,
    titulo: "Código Amanecer",
    anio: 2024,
    imagen: "https://picsum.photos/seed/amanecer/400/560",
    sinopsis:
      "Un grupo de ingenieros de software descubre que la inteligencia artificial que crearon empezó a tomar decisiones por su cuenta.",
    director: "Sofía Castellanos",
    calificacion: 8.9,
  },
  {
    id: 4,
    titulo: "La Ruta del Silencio",
    anio: 2022,
    imagen: "https://picsum.photos/seed/silencio/400/560",
    sinopsis:
      "Dos hermanos cruzan el continente en auto para cumplir la última voluntad de su padre, reconstruyendo su relación en el camino.",
    director: "Marco Villanueva",
    calificacion: 7.2,
  },
  {
    id: 5,
    titulo: "Ecos del Mar",
    anio: 2020,
    imagen: "https://picsum.photos/seed/mar/400/560",
    sinopsis:
      "Una bióloga marina investiga fenómenos extraños en las profundidades del océano que podrían cambiar la comprensión de la vida submarina.",
    director: "Elena Ruiz",
    calificacion: 8.1,
  },
  {
    id: 6,
    titulo: "Punto de Quiebre",
    anio: 2023,
    imagen: "https://picsum.photos/seed/quiebre/400/560",
    sinopsis:
      "Un piloto de carreras retirado vuelve a la pista para un último campeonato, enfrentando tanto a nuevos rivales como a sus propios límites.",
    director: "Andrés Peña",
    calificacion: 7.8,
  },
];

export default function MovieGallery(): JSX.Element {
  // Estado del padre: qué película está seleccionada (o ninguna)
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState<Pelicula | null>(null);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "18px",
        }}
      >
        {peliculas.map((pelicula: Pelicula) => (
          <div
            key={pelicula.id}
            onClick={() => setPeliculaSeleccionada(pelicula)}
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,63,127,.06)",
              transition: "transform .15s ease",
            }}
          >
            <img
              src={pelicula.imagen}
              alt={pelicula.titulo}
              style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }}
            />
            <div style={{ padding: "12px" }}>
              <h4 style={{ margin: "0 0 4px", color: "#001f3f", fontSize: ".92rem" }}>
                {pelicula.titulo}
              </h4>
              <p style={{ margin: 0, color: "#5a6a7e", fontSize: ".8rem" }}>{pelicula.anio}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal reutilizable — solo se abre si hay una película seleccionada */}
      <Modal
        isOpen={peliculaSeleccionada !== null}
        onClose={() => setPeliculaSeleccionada(null)}
      >
        {peliculaSeleccionada && (
          <>
            <img
              src={peliculaSeleccionada.imagen}
              alt={peliculaSeleccionada.titulo}
              style={{
                width: "100%",
                maxHeight: "260px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "16px",
              }}
            />
            <h3 style={{ margin: "0 0 6px", color: "#001f3f" }}>
              {peliculaSeleccionada.titulo}{" "}
              <span style={{ color: "#5a6a7e", fontWeight: 400 }}>
                ({peliculaSeleccionada.anio})
              </span>
            </h3>
            <p style={{ margin: "0 0 4px", color: "#003f7f", fontSize: ".88rem", fontWeight: 600 }}>
              Dirigida por {peliculaSeleccionada.director}
            </p>
            <p style={{ margin: "0 0 14px", color: "#fdb913", fontWeight: 700 }}>
              ⭐ {peliculaSeleccionada.calificacion.toFixed(1)} / 10
            </p>
            <p style={{ margin: 0, color: "#1a2332", lineHeight: 1.5, fontSize: ".9rem" }}>
              {peliculaSeleccionada.sinopsis}
            </p>
          </>
        )}
      </Modal>
    </div>
  );
}

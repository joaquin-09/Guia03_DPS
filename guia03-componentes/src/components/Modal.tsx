// src/components/Modal.tsx
"use client";
import { ReactNode } from "react";

// Modal genérico y reutilizable — cualquier componente puede pasarle contenido
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps): JSX.Element | null => {
  // Si no está abierto, no renderiza nada (patrón común para modales)
  if (!isOpen) return null;

  return (
    // Overlay — al hacer clic aquí (fuera de la tarjeta) se cierra el modal
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 31, 63, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
    >
      {/* stopPropagation evita que un clic DENTRO de la tarjeta cierre el modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "28px",
          maxWidth: "480px",
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 12px 40px rgba(0,0,0,.25)",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "#f4f6f9",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            cursor: "pointer",
            fontSize: "1rem",
            color: "#5a6a7e",
          }}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

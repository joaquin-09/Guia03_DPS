"use client";
import { useState } from "react";

// type de unión — los únicos valores válidos para un campo
type Campo = "nombre" | "email" | "password" | "confirmar";
type FormData   = Record<Campo, string>;
type FormErrors = Record<Campo, string>;

const initialData:   FormData   = { nombre: "", email: "", password: "", confirmar: "" };
const initialErrors: FormErrors = { nombre: "", email: "", password: "", confirmar: "" };

// Función de validación pura — fuera del componente, fácil de testear
function validarCampo(campo: Campo, valor: string, formData: FormData): string {
  switch (campo) {
    case "nombre":
      if (!valor.trim()) return "El nombre es obligatorio";
      if (valor.trim().length < 3) return "Mínimo 3 caracteres";
      return "";
    case "email":
      if (!valor.trim()) return "El email es obligatorio";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) return "Email inválido";
      return "";
    case "password":
      if (!valor) return "La contraseña es obligatoria";
      if (valor.length < 8) return "Mínimo 8 caracteres";
      if (!/[A-Z]/.test(valor)) return "Debe incluir una mayúscula";
      if (!/[0-9]/.test(valor)) return "Debe incluir un número";
      return "";
    case "confirmar":
      if (!valor) return "Confirma tu contraseña";
      if (valor !== formData.password) return "Las contraseñas no coinciden";
      return "";
    default: return "";
  }
}

export default function RegisterForm(): JSX.Element {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errores, setErrores]   = useState<FormErrors>(initialErrors);
  const [exito, setExito]       = useState<boolean>(false);

  const handleChange = (campo: Campo, valor: string): void => {
    const nuevoFormData: FormData = { ...formData, [campo]: valor };
    setFormData(nuevoFormData);
    setErrores(prev => ({ ...prev, [campo]: validarCampo(campo, valor, nuevoFormData) }));
  };

  const handleSubmit = (): void => {
    const nuevosErrores: FormErrors = {
      nombre:    validarCampo("nombre",    formData.nombre,    formData),
      email:     validarCampo("email",     formData.email,     formData),
      password:  validarCampo("password",  formData.password,  formData),
      confirmar: validarCampo("confirmar", formData.confirmar, formData),
    };
    setErrores(nuevosErrores);
    if (Object.values(nuevosErrores).every(e => e === "")) setExito(true);
  };

  const inputStyle = (campo: Campo): React.CSSProperties => ({
    width: '100%', padding: '10px 14px', borderRadius: '8px', outline: 'none',
    border: `2px solid ${errores[campo] ? '#c0392b' : formData[campo] ? '#00a651' : '#e2e8f0'}`,
    fontSize: '0.9rem', boxSizing: 'border-box', marginTop: '6px',
  });

  if (exito) return (
    <div style={{ background: '#edfaf3', border: '2px solid #00a651',
      borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
      <p style={{ fontSize: '2rem' }}>✅</p>
      <h3 style={{ color: '#007a3d' }}>¡Registro exitoso! Bienvenido/a, {formData.nombre}</h3>
      <button onClick={() => { setFormData(initialData); setErrores(initialErrors); setExito(false); }}
        style={{ marginTop: '16px', padding: '8px 24px', background: '#003f7f',
          color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
        Nuevo registro
      </button>
    </div>
  );

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px',
      padding: '32px', maxWidth: '460px' }}>
      <h2 style={{ color: '#001f3f', marginBottom: '24px' }}>Crear cuenta</h2>
      {(["nombre", "email", "password", "confirmar"] as Campo[]).map((campo) => (
        <div key={campo} style={{ marginBottom: '18px' }}>
          <label style={{ fontWeight: 600, fontSize: '.9rem' }}>
            {{ nombre: "Nombre", email: "Email", password: "Contraseña", confirmar: "Confirmar contraseña" }[campo]}
          </label>
          <input type={campo === "password" || campo === "confirmar" ? "password" : campo === "email" ? "email" : "text"}
            value={formData[campo]}
            onChange={(e) => handleChange(campo, e.target.value)}
            style={inputStyle(campo)} />
          {errores[campo] && <p style={{ color: '#c0392b', fontSize: '.78rem', margin: '4px 0 0' }}>⚠ {errores[campo]}</p>}
        </div>
      ))}
      <button onClick={handleSubmit}
        style={{ width: '100%', padding: '12px', background: '#003f7f', color: '#fff',
          border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer' }}>
        Registrarse
      </button>
    </div>
  );
}
// Interface: define exactamente qué props acepta este componente
interface ProfileProps {
  nombre: string;
  rol: string;
  tecnologias: string[];
  avatar?: string;          // opcional — el ? lo indica
  disponible?: boolean;
}

const ProfileCard = ({
  nombre, rol, tecnologias, avatar,
  disponible = true,        // valor por defecto
}: ProfileProps): JSX.Element => {
  return (
    <div style={{ border: '2px solid #003f7f', borderRadius: '12px',
      padding: '20px', maxWidth: '300px', background: '#fff',
      boxShadow: '0 2px 8px rgba(0,63,127,.08)' }}>

      {/* Avatar — operador ?? para valor de respaldo */}
      <img
        src={avatar ?? `https://ui-avatars.com/api/?name=${nombre}&background=003f7f&color=fff`}
        alt={nombre}
        style={{ width: '72px', height: '72px', borderRadius: '50%',
          border: '3px solid #fdb913' }}
      />
      <h3 style={{ margin: '12px 0 4px', color: '#001f3f' }}>{nombre}</h3>
      <p style={{ color: '#5a6a7e', margin: '0 0 12px' }}>{rol}</p>

      {/* Renderizado condicional con operador ternario */}
      <span style={{
        background: disponible ? '#edfaf3' : '#fdf0ee',
        color: disponible ? '#007a3d' : '#c0392b',
        padding: '3px 12px', borderRadius: '20px', fontSize: '.75rem'
      }}>
        {disponible ? '✓ Disponible' : '✗ No disponible'}
      </span>

      {/* Renderizado de arreglo con .map() */}
      <div style={{ marginTop: '14px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {tecnologias.map((tech: string) => (
          <span key={tech} style={{ background: '#e6f1fb', color: '#003f7f',
            padding: '2px 8px', borderRadius: '4px', fontSize: '.73rem' }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
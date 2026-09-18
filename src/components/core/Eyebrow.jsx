/** Etiqueta mono en versalitas. El recurso tipográfico de la marca. */
export function Eyebrow({ tone = 'muted', wide = false, children, className = '' }) {
  const tones = { muted: 'text-tinta-tenue', accent: 'text-violeta-600', warm: 'text-ambar-700', night: 'text-noite-tenue', good: 'text-verde-600' };
  return (
    <span className={['font-mono text-xs uppercase', wide ? 'tracking-eyebrow-wide' : 'tracking-eyebrow', tones[tone], className].join(' ')}>
      {children}
    </span>
  );
}
export default Eyebrow;

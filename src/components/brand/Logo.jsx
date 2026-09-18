/**
 * Logo — envoltorio de los SVG de marca.
 * Nunca recolorear por CSS: elegí la variante correcta para el fondo.
 * wordmark-tight-* está recortado al glifo; usalo en UI donde el logo
 * tiene que alinear con otros elementos (barra lateral, header).
 */
const SRC = {
  'wordmark-crema': '/brand/wordmark-crema.svg',
  'wordmark-noche': '/brand/wordmark-noche.svg',
  'wordmark-tight-crema': '/brand/wordmark-tight-crema.svg',
  'wordmark-tight-noche': '/brand/wordmark-tight-noche.svg',
  'lockup-crema': '/brand/lockup-crema.svg',
  'lockup-noche': '/brand/lockup-noche.svg',
  'iso-crema': '/brand/iso-crema.svg',
  'iso-noche': '/brand/iso-noche.svg',
  'iso-violeta': '/brand/iso-violeta.svg',
  'favicon-noche': '/brand/favicon-noche.svg',
  'favicon-crema': '/brand/favicon-crema.svg',
};

export function Logo({ variant = 'wordmark-noche', width = 120, className = '' }) {
  return (
    <img
      src={SRC[variant] || SRC['wordmark-noche']}
      alt={variant.startsWith('iso') || variant.startsWith('favicon') ? '' : 'Nocttua'}
      style={{ width }}
      className={'block ' + className}
    />
  );
}
export default Logo;

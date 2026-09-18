import { color, semantic, font, fontSize, radius, shadow, space } from '@nocttua/theme';

const px = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, typeof v === 'number' ? v + 'px' : v]));

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        crema: { paper: color.cremaPaper, mist: color.cremaMist, sand: color.cremaSand, base: color.cremaBase, hairline: color.cremaHairline, line: color.cremaLine, 'line-strong': color.cremaLineStrong },
        noche: { 900: color.noche900, 800: color.noche800, 700: color.noche700, 600: color.noche600, 500: color.noche500 },
        violeta: { 600: color.violeta600, 400: color.violeta400, 300: color.violeta300, 200: color.violeta200, 100: color.violeta100, 50: color.violeta50 },
        ambar: { 700: color.ambar700, 500: color.ambar500, 200: color.ambar200, 100: color.ambar100, 50: color.ambar50 },
        verde: { 600: color.verde600, 400: color.verde400, 200: color.verde200, 100: color.verde100, 50: color.verde50 },
        coral: { 700: color.coral700, 500: color.coral500, 100: color.coral100 },
        terracota: { 500: color.terracota500, 100: color.terracota100 },
        tinta: { fuerte: color.tintaFuerte, media: color.tintaMedia, cuerpo: color.tintaCuerpo, suave: color.tintaSuave, tenue: color.tintaTenue, apagada: color.tintaApagada },
        noite: { fuerte: color.sobreNocheFuerte, suave: color.sobreNocheSuave, tenue: color.sobreNocheTenue, apagado: color.sobreNocheApagado },
        accent: semantic.accent,
        highlight: semantic.highlight,
        'baby-a': semantic.babyA,
        'baby-b': semantic.babyB,
      },
      fontFamily: {
        display: font.display.split(', '),
        ui: font.ui.split(', '),
        mono: font.mono.split(', '),
        'display-app': font.displayApp.split(', '),
        'ui-app': font.uiApp.split(', '),
      },
      fontSize: px(fontSize),
      spacing: px(space),
      borderRadius: { ...px(radius), sheet: '24px 24px 34px 34px' },
      boxShadow: { card: shadow.card, raised: shadow.raised, phone: shadow.phone, toast: shadow.toast, accent: shadow.accent, ring: shadow.focusRing },
      letterSpacing: { eyebrow: '0.1em', 'eyebrow-wide': '0.18em' },
      lineHeight: { tight: '1.1', snug: '1.3', normal: '1.45', relaxed: '1.55' },
      keyframes: {
        riseIn: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'none' } },
        popIn: { from: { opacity: '0', transform: 'scale(.4)' }, to: { opacity: '1', transform: 'scale(1)' } },
        growW: { from: { width: '0' } },
        sheen: { '0%,100%': { opacity: '.35' }, '50%': { opacity: '.9' } },
      },
      animation: {
        riseIn: 'riseIn 300ms ease both',
        popIn: 'popIn 300ms cubic-bezier(.2,.8,.2,1) both',
        growW: 'growW 900ms cubic-bezier(.2,.8,.2,1) both',
        sheen: 'sheen 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

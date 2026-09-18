/**
 * Exporta la tarjeta de caso a PNG real, dibujada a mano con Canvas 2D — sin
 * librerías de gráficos ni backend. El contenido es el mismo que el preview
 * en pantalla: si no hay cifra real, el PNG también dice "—", nunca inventa.
 */
async function ensureFonts() {
  try {
    await Promise.all([
      document.fonts.load('400 90px "Instrument Serif"'),
      document.fonts.load('500 28px "DM Mono"'),
      document.fonts.load('400 22px "DM Mono"'),
      document.fonts.load('400 22px "DM Sans"'),
      document.fonts.load('500 22px "DM Sans"'),
    ]);
    await document.fonts.ready;
  } catch {
    /* si las fuentes no cargan a tiempo, el canvas cae a la fuente genérica del sistema */
  }
}

export async function exportCasePng({ format, weeksLabel, context, bigValue, unitLabel, statLine, coachName, coachHandle }) {
  const W = 1080;
  const H = format === 'story' ? 1920 : 1080;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  await ensureFonts();

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#16162B');
  bg.addColorStop(0.58, '#22224A');
  bg.addColorStop(1, '#332F5C');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W / 2, H * 1.06, 0, W / 2, H * 1.06, W * 0.85);
  glow.addColorStop(0, 'rgba(240,168,104,.28)');
  glow.addColorStop(0.62, 'rgba(240,168,104,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  const pad = Math.round(W * 0.079);
  ctx.textBaseline = 'alphabetic';

  ctx.fillStyle = 'rgba(240,168,104,.75)';
  ctx.font = Math.round(W * 0.026) + 'px "DM Mono"';
  ctx.fillText('✦', W - pad - 24, H * (format === 'story' ? 0.3 : 0.42));
  ctx.fillStyle = 'rgba(201,193,216,.55)';
  ctx.font = Math.round(W * 0.02) + 'px "DM Mono"';
  ctx.fillText('✦', pad, H * (format === 'story' ? 0.72 : 0.74));

  let y = pad + Math.round(W * 0.03);
  ctx.fillStyle = '#F0A868';
  ctx.font = Math.round(W * 0.026) + 'px "DM Mono"';
  ctx.fillText(('Caso cerrado · ' + weeksLabel).toUpperCase(), pad, y);

  y += Math.round(W * 0.048);
  ctx.fillStyle = '#B9B2C9';
  ctx.font = Math.round(W * 0.032) + 'px "DM Sans"';
  ctx.fillText(context, pad, y);

  const bigY = H * (format === 'story' ? 0.46 : 0.5);
  ctx.fillStyle = '#FBF7F0';
  ctx.font = Math.round(W * 0.18) + 'px "Instrument Serif"';
  ctx.fillText(bigValue, pad, bigY);
  const bigWidth = ctx.measureText(bigValue).width;
  ctx.fillStyle = '#8E87B5';
  ctx.font = Math.round(W * 0.03) + 'px "DM Sans"';
  ctx.fillText(unitLabel, pad + bigWidth + Math.round(W * 0.025), bigY - Math.round(W * 0.015));

  ctx.fillStyle = '#D6D0E4';
  ctx.font = Math.round(W * 0.03) + 'px "DM Mono"';
  ctx.fillText(statLine, pad, bigY + Math.round(W * 0.06));

  const footerY = H - pad - Math.round(W * 0.02);
  ctx.strokeStyle = '#33335F';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, footerY - Math.round(W * 0.05));
  ctx.lineTo(W - pad, footerY - Math.round(W * 0.05));
  ctx.stroke();

  ctx.fillStyle = '#FBF7F0';
  ctx.font = '500 ' + Math.round(W * 0.033) + 'px "DM Sans"';
  ctx.fillText(coachName, pad, footerY);
  ctx.fillStyle = '#8E87B5';
  ctx.font = Math.round(W * 0.024) + 'px "DM Mono"';
  ctx.fillText(coachHandle, pad, footerY + Math.round(W * 0.032));

  ctx.textAlign = 'right';
  ctx.fillStyle = '#6E6890';
  ctx.font = Math.round(W * 0.022) + 'px "DM Mono"';
  ctx.fillText('CON NOCTTUA', W - pad, footerY);
  ctx.textAlign = 'left';

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'nocttua-caso-' + format + '-' + W + 'x' + H + '.png';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  return { width: W, height: H };
}

import { onMounted, onUnmounted } from 'vue';

// === 二阶弹簧-阻尼系统（函数式，避开 max-classes-per-file）===
interface SpringPhysicsState {
  k: number;
  z: number;
  target: number;
  pos: number;
  vel: number;
}

function createSpring(k = 200, z = 0.65): SpringPhysicsState {
  return { k, z, target: 0, pos: 0, vel: 0 };
}

function springUpdate(sp: SpringPhysicsState, dt: number) {
  const omega = Math.sqrt(sp.k) * 2;
  const force = -sp.k * (sp.pos - sp.target);
  const damper = -2 * sp.z * omega * sp.vel;
  sp.vel += (force + damper) * dt;
  sp.pos += sp.vel * dt;
  return sp.pos;
}

function springSetTarget(sp: SpringPhysicsState, t: number) {
  sp.target = t;
}

function springImpulse(sp: SpringPhysicsState, v: number) {
  sp.vel += v;
}

// === Canvas 渲染器（纯函数式，避开 class-methods-use-this）===
interface RendererState {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  index: number;
  w: number;
  h: number;
}

function createRenderer(canvas: HTMLCanvasElement, index: number): RendererState {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2d context from canvas');
  }
  return { canvas, ctx, index, w: canvas.width, h: canvas.height };
}

function getSeed(state: RendererState) {
  return state.index * 1.618;
}

function drawCaustics(state: RendererState, t: number, intensity: number, ambientTemp: number) {
  const { ctx, w, h } = state;
  const s = getSeed(state);
  for (let i = 0; i < 4; i++) {
    const cx = (Math.sin(t * 0.3 + s + i * 2.1) * 0.5 + 0.5) * w;
    const cy = (Math.cos(t * 0.25 + s * 1.3 + i * 1.7) * 0.5 + 0.5) * h;
    const r = 14 + Math.sin(t * 0.5 + s + i) * 4;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    const rt = 1 + ambientTemp * 0.08;
    const bt = 1 - ambientTemp * 0.08;
    g.addColorStop(0, `rgba(${(255 * rt) | 0},235,${(255 * bt) | 0},${0.065 * intensity})`);
    g.addColorStop(0.6, `rgba(${(220 * rt) | 0},235,${(255 * bt) | 0},${0.03 * intensity})`);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 0.1 * intensity;
  for (let i = 0; i < 14; i++) {
    const px = (Math.sin(t * 0.12 + s * 2.7 + i * 5.3) * 0.8 + 0.5) * w;
    const py = (Math.cos(t * 0.15 + s * 3.1 + i * 3.7) * 0.8 + 0.5) * h;
    const pr = 2 + Math.sin(t * 0.6 + i) * 1;
    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${0.22 + Math.sin(t + i) * 0.1})`;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawReflection(state: RendererState, mx: number, my: number, intensity: number) {
  const { ctx, w, h } = state;
  const rx = mx * w * 0.6 + w * 0.2;
  const ry = my * h * 0.6 + h * 0.2;
  const g = ctx.createRadialGradient(rx, ry, 0, rx, ry, w * 0.55);
  g.addColorStop(0, `rgba(255,255,255,${0.055 * intensity})`);
  g.addColorStop(0.3, `rgba(200,220,255,${0.02 * intensity})`);
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(rx, ry, w * 0.55, 0, Math.PI * 2);
  ctx.fill();

  const sx = w - rx;
  const sy = h * 0.3 + my * h * 0.2;
  const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, w * 0.28);
  sg.addColorStop(0, `rgba(200,220,255,${0.02 * intensity})`);
  sg.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = sg;
  ctx.beginPath();
  ctx.arc(sx, sy, w * 0.28, 0, Math.PI * 2);
  ctx.fill();
}

function drawDistortion(state: RendererState, t: number, press: number) {
  const { ctx, w, h } = state;
  ctx.save();
  ctx.globalAlpha = 0.025 + press * 0.04;
  for (let i = -1; i <= 1; i += 0.5) {
    const ly = h / 2 + i * (h * 0.2 + press * 4);
    ctx.beginPath();
    ctx.moveTo(w * 0.1, ly);
    ctx.quadraticCurveTo(
      w * 0.5 + Math.sin(t * 0.5 + i) * press * 5,
      ly + press * 3 + Math.sin(t + i) * 2,
      w * 0.9,
      ly,
    );
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 0.35;
    ctx.stroke();
  }
  ctx.restore();
}

function renderFrame(
  state: RendererState,
  t: number,
  mx: number,
  my: number,
  press: number,
  intensity: number,
  ambientTemp: number,
) {
  const { ctx, w, h } = state;
  ctx.clearRect(0, 0, w, h);
  drawCaustics(state, t, intensity, ambientTemp);
  drawReflection(state, mx, my, intensity);
  drawDistortion(state, t, press);
}

// === 主 Composable ===
export function useLiquidGlass() {
  let items: HTMLElement[] = [];
  let springs: SpringPhysicsState[] = [];
  let renderers: RendererState[] = [];
  let animFrameId = 0;
  let mouseX = 0.5;
  let mouseY = 0.5;
  let causticTime = 0;
  let ambientTemp = 0;

  function setup() {
    items = Array.from(document.querySelectorAll('.t-tab-bar--liquid-glass .t-tab-bar-item')) as HTMLElement[];
    if (!items.length) return;

    const initBlur = 24;
    const initSat = 200;

    items.forEach((item, i) => {
      const content = item.querySelector('.t-tab-bar-item__content') as HTMLElement | null;
      if (!content) return;

      const canvas = document.createElement('canvas');
      canvas.className = 'cap-glass-canvas';
      canvas.width = 66;
      canvas.height = 58;
      content.insertBefore(canvas, content.firstChild);

      const disp = document.createElement('div');
      disp.className = 'cap-dispersion';
      content.insertBefore(disp, content.firstChild);

      const indicator = document.createElement('div');
      indicator.className = 'active-indicator';
      content.insertBefore(indicator, disp.nextSibling);

      const renderer = createRenderer(canvas, i);
      renderers.push(renderer);

      content.addEventListener('click', () => {
        springImpulse(springs[i], 3);
        setTimeout(() => springImpulse(springs[i], -1.5), 60);
      });
    });

    document.body.addEventListener('mousemove', (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
    });

    springs = items.map(() => createSpring(200, 0.65));

    let lastTime = performance.now();
    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      causticTime += dt;

      ambientTemp = Math.sin(causticTime * 0.015) * 0.5;

      items.forEach((item, i) => {
        const sp = springs[i];
        const content = item.querySelector('.t-tab-bar-item__content');
        const isActive = content?.classList.contains('t-tab-bar-item__content--checked') ?? false;

        springSetTarget(sp, 0);
        springUpdate(sp, dt);

        const deform = Math.abs(sp.vel) * 0.35;
        const dynamicBlur = deform > 0.1 ? Math.max(initBlur - Math.min(deform, 8), 8) : initBlur;
        item.style.backdropFilter = `blur(${dynamicBlur}px) saturate(${initSat}%)`;
        (item.style as unknown as Record<string, string>).webkitBackdropFilter =
          `blur(${dynamicBlur}px) saturate(${initSat}%)`;

        const dispEl = item.querySelector('.cap-dispersion') as HTMLElement | null;
        if (dispEl) {
          const dispBoost = Math.min(deform * 0.15, 0.35);
          dispEl.style.opacity = `${0.55 + dispBoost + (isActive ? 0.25 : 0)}`;
        }
      });

      renderers.forEach((r, i) => {
        const press = Math.min(Math.abs(springs[i].vel) * 0.22, 1);
        const hovered = items[i].matches(':hover');
        const intensity = 0.45 * (hovered ? 1.3 : 1);
        renderFrame(r, causticTime, mouseX, mouseY, press * (hovered ? 1.2 : 1), intensity, ambientTemp);
      });

      animFrameId = requestAnimationFrame(loop);
    };

    animFrameId = requestAnimationFrame(loop);
  }

  function cleanup() {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    renderers = [];
    springs = [];
    items = [];
  }

  onMounted(() => {
    requestAnimationFrame(() => requestAnimationFrame(setup));
  });

  onUnmounted(cleanup);
}

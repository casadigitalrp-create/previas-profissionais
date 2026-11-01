// Gera logo e ilustrações SIMULADAS (SVG) em public/img. Troque por fotos reais quando existirem.
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const out = new URL("../public/img/", import.meta.url);
mkdirSync(out, { recursive: true });
const save = (name, svg) => writeFileSync(new URL(name, out), svg);

const NAVY = "#0B1F3A";
const NAVY2 = "#16396b";
const ORANGE = "#F28C28";

let seed = 7;
const rnd = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

const svg = (w, h, body, defs = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">${defs ? `<defs>${defs}</defs>` : ""}${body}</svg>`;

const sky = (id, top, mid, bot) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset=".6" stop-color="${mid}"/><stop offset="1" stop-color="${bot}"/></linearGradient>`;

const stars = (w, h, n) =>
  Array.from(
    { length: n },
    () =>
      `<circle cx="${(rnd() * w).toFixed(0)}" cy="${(rnd() * h * 0.5).toFixed(0)}" r="${(rnd() * 1.4 + 0.3).toFixed(1)}" fill="#fff" opacity="${(rnd() * 0.6 + 0.2).toFixed(2)}"/>`,
  ).join("");

function skyline(w, baseY, color, minH, maxH, minW, maxW, lit = 0.25, winColor = "#ffd27a") {
  let x = -10;
  let s = "";
  while (x < w) {
    const bw = minW + rnd() * (maxW - minW);
    const bh = minH + rnd() * (maxH - minH);
    s += `<rect x="${x.toFixed(0)}" y="${(baseY - bh).toFixed(0)}" width="${bw.toFixed(0)}" height="${bh.toFixed(0)}" fill="${color}"/>`;
    if (rnd() > 0.7)
      s += `<rect x="${(x + bw / 2 - 1).toFixed(0)}" y="${(baseY - bh - 28).toFixed(0)}" width="2" height="28" fill="${color}"/>`;
    for (let wy = baseY - bh + 10; wy < baseY - 8; wy += 14)
      for (let wx = x + 6; wx < x + bw - 8; wx += 12)
        if (rnd() < lit)
          s += `<rect x="${wx.toFixed(0)}" y="${wy.toFixed(0)}" width="5" height="7" fill="${winColor}" opacity=".85"/>`;
    x += bw + 2;
  }
  return s;
}

function crane(x, baseY, h, color) {
  const top = baseY - h;
  const braces = Array.from(
    { length: Math.floor(h / 22) },
    (_, i) =>
      `<path d="M${x} ${baseY - i * 22}L${x + 14} ${baseY - i * 22 - 22}M${x + 14} ${baseY - i * 22}L${x} ${baseY - i * 22 - 22}" stroke-width="1.5"/>`,
  ).join("");
  return `<g stroke="${color}" fill="none" stroke-width="3">
    <path d="M${x} ${baseY}V${top}M${x + 14} ${baseY}V${top}"/>
    ${braces}
    <path d="M${x - 150} ${top}H${x + 90}" stroke-width="5"/>
    <path d="M${x - 150} ${top}L${x + 7} ${top - 46}L${x + 90} ${top}" stroke-width="2"/>
    <path d="M${x - 110} ${top}V${top + 60}" stroke-width="1.5"/>
    <rect x="${x - 122}" y="${top + 60}" width="24" height="14" fill="${ORANGE}" stroke="none"/>
    <rect x="${x + 70}" y="${top + 4}" width="26" height="18" fill="${color}" stroke="none"/>
  </g>`;
}

const W = 1600;
const H = 900;

// ---------- Hero 1: São Paulo ao entardecer (a chegada) ----------
seed = 11;
save(
  "hero-sao-paulo.svg",
  svg(
    W,
    H,
    `<rect width="${W}" height="${H}" fill="url(#g)"/>
     ${stars(W, H, 90)}
     <circle cx="1180" cy="520" r="120" fill="${ORANGE}" opacity=".35"/>
     <circle cx="1180" cy="520" r="70" fill="${ORANGE}" opacity=".6"/>
     ${skyline(W, 700, "#10294d", 160, 420, 50, 110, 0.12)}
     ${skyline(W, 760, "#0b1d38", 120, 330, 60, 130, 0.3)}
     ${skyline(W, 900, "#060f1f", 160, 280, 70, 150, 0.35)}
     <g fill="#0b1d38"><rect x="760" y="300" width="6" height="400"/><rect x="900" y="300" width="6" height="400"/><path d="M752 330h162v10H752z"/></g>
     <path d="M763 330L560 700M763 340L640 700M903 330L1100 700M903 340L1020 700" stroke="${ORANGE}" stroke-width="2" opacity=".7"/>`,
    sky("g", "#050c1a", "#1b3a6e", "#f28c28"),
  ),
);

// ---------- Hero 2: Canteiro de obra ----------
seed = 23;
save(
  "hero-obra.svg",
  svg(
    W,
    H,
    `<rect width="${W}" height="${H}" fill="url(#g)"/>
     <circle cx="300" cy="260" r="90" fill="#ffd27a" opacity=".25"/>
     ${skyline(W, 760, "#5a6f90", 140, 300, 60, 120, 0.05)}
     <g fill="#2a3f63">
       <rect x="880" y="360" width="360" height="460"/>
       ${[0, 1, 2, 3, 4].map((i) => `<rect x="870" y="${360 + i * 90}" width="380" height="10" fill="#10294d"/>`).join("")}
       ${[0, 1, 2, 3].map((i) => `<rect x="${890 + i * 110}" y="370" width="10" height="440" fill="#10294d"/>`).join("")}
     </g>
     <g stroke="${ORANGE}" stroke-width="3" opacity=".9">${Array.from({ length: 6 }, (_, i) => `<path d="M${890 + i * 66} 360v-40"/>`).join("")}</g>
     ${crane(1380, 820, 640, "#0B1F3A")}
     ${crane(560, 820, 520, "#16396b")}
     <rect y="800" width="${W}" height="100" fill="#0B1F3A"/>
     <g fill="${ORANGE}">${Array.from({ length: 24 }, (_, i) => `<path d="M${i * 70} 800l35 0l-20 24h-35z" opacity=".95"/>`).join("")}</g>`,
    sky("g", "#9fb6d6", "#f0c58f", "#fbe6c8"),
  ),
);

// ---------- Hero 3: Bahia (a origem) ----------
seed = 31;
const casas = ["#f28c28", "#ffd27a", "#e8553d", "#3fa7a0", "#f4f5f7", "#d94f70", "#5aa9e6"];
let casasSvg = "";
for (let i = 0, x = -20; x < W; i++) {
  const cw = 90 + rnd() * 70;
  const ch = 110 + rnd() * 120;
  const c = casas[i % casas.length];
  const y = 820 - ch - (Math.sin(i * 0.8) * 30 + 30);
  const janelas = [0, 1]
    .map((r) =>
      [0, 1]
        .map(
          (k) =>
            `<rect x="${(x + 14 + k * (cw / 2 - 4)).toFixed(0)}" y="${(y + 24 + r * 54).toFixed(0)}" width="${(cw / 4).toFixed(0)}" height="32" fill="#0B1F3A" opacity=".8"/>`,
        )
        .join(""),
    )
    .join("");
  casasSvg += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${cw.toFixed(0)}" height="${(ch + 90).toFixed(0)}" fill="${c}"/>
    <path d="M${x.toFixed(0)} ${y.toFixed(0)}l${(cw / 2).toFixed(0)} -34l${(cw / 2).toFixed(0)} 34z" fill="#9a3b26"/>${janelas}`;
  x += cw + 4;
}
save(
  "hero-bahia.svg",
  svg(
    W,
    H,
    `<rect width="${W}" height="${H}" fill="url(#g)"/>
     <circle cx="1230" cy="250" r="170" fill="#fff3c4" opacity=".55"/>
     <circle cx="1230" cy="250" r="105" fill="#ffd27a"/>
     <rect y="560" width="${W}" height="200" fill="#2a8fbd" opacity=".9"/>
     <path d="M0 640q200-26 400 0t400 0t400 0t400 0v120H0z" fill="#1d6f99"/>
     <g fill="#0B1F3A"><rect x="1330" y="250" width="70" height="500"/><rect x="1318" y="240" width="94" height="22"/></g>
     <g transform="translate(0 40)">${casasSvg}</g>
     <rect y="860" width="${W}" height="40" fill="#8a4a1e"/>`,
    sky("g", "#4aa3e0", "#ffd9a0", "#fff1d6"),
  ),
);

// ---------- Hero 4: Projeto / blueprint ----------
save(
  "hero-projeto.svg",
  svg(
    W,
    H,
    `<rect width="${W}" height="${H}" fill="#0a3a73"/>
     <g stroke="#7fb3ff" stroke-opacity=".25" stroke-width="1">${Array.from({ length: 40 }, (_, i) => `<path d="M${i * 40} 0V${H}"/>`).join("")}${Array.from({ length: 23 }, (_, i) => `<path d="M0 ${i * 40}H${W}"/>`).join("")}</g>
     <g fill="none" stroke="#e6f0ff" stroke-width="3" stroke-opacity=".85">
       <rect x="300" y="200" width="1000" height="500"/>
       <path d="M300 450H760V200M760 450V700M1040 200V450H1300M1040 450V700"/>
       <path d="M760 330h40M1040 560h-60" stroke="${ORANGE}"/>
       <path d="M640 200a60 60 0 0 1 120 0" stroke-width="2"/>
       <rect x="520" y="200" width="120" height="8"/>
     </g>
     <g stroke="#e6f0ff" stroke-width="2" stroke-opacity=".7"><path d="M300 150H1300M300 140v20M1300 140v20M300 750H1300M300 740v20M1300 740v20"/></g>
     <g fill="#e6f0ff" font-family="monospace" font-size="22" opacity=".8"><text x="800" y="140" text-anchor="middle">12,00 m</text><text x="800" y="790" text-anchor="middle">12,00 m</text></g>
     <g fill="none" stroke="${ORANGE}" stroke-width="3"><circle cx="1380" cy="300" r="46"/><path d="M1380 254v92M1334 300h92"/></g>`,
  ),
);

// ---------- Retrato simulado ----------
save(
  "retrato-simulado.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Retrato ilustrativo de engenheiro civil com capacete (foto simulada)">
   <defs><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16396b"/><stop offset="1" stop-color="#0B1F3A"/></linearGradient></defs>
   <rect width="600" height="750" fill="url(#b)"/>
   <g stroke="#7fb3ff" stroke-opacity=".12">${Array.from({ length: 15 }, (_, i) => `<path d="M${i * 40} 0V750M0 ${i * 50}H600"/>`).join("")}</g>
   <path d="M60 750c0-170 110-250 240-250s240 80 240 250z" fill="${ORANGE}"/>
   <path d="M300 520l-60 230h120z" fill="#fff" opacity=".9"/>
   <rect x="262" y="440" width="76" height="90" rx="30" fill="#c98f65"/>
   <ellipse cx="300" cy="370" rx="92" ry="108" fill="#d9a074"/>
   <path d="M205 345a95 95 0 0 1 190 0z" fill="#fff"/>
   <rect x="190" y="338" width="220" height="22" rx="8" fill="#fff"/>
   <rect x="280" y="262" width="40" height="20" rx="6" fill="#e9eef6"/>
   <circle cx="262" cy="385" r="7" fill="#2b2b2b"/><circle cx="338" cy="385" r="7" fill="#2b2b2b"/>
   <path d="M270 430q30 20 60 0" stroke="#7a3d2b" stroke-width="5" fill="none" stroke-linecap="round"/>
   <text x="300" y="725" text-anchor="middle" font-family="Arial" font-size="20" fill="#0B1F3A" font-weight="700">FOTO SIMULADA</text></svg>`,
);

// ---------- Portfólio (4 obras simuladas) ----------
const card = (name, body, c1, c2) =>
  save(
    name,
    svg(
      800,
      600,
      `<rect width="800" height="600" fill="url(#g)"/>${body}`,
      sky("g", c1, c2, "#fff"),
    ),
  );

card(
  "obra-residencial.svg",
  `<rect y="470" width="800" height="130" fill="#7aa86b"/>
   <path d="M170 470V280L400 150l230 130v190z" fill="#f4f5f7"/>
   <path d="M150 285L400 135l250 150-20 22L400 175 170 307z" fill="#0B1F3A"/>
   <rect x="250" y="320" width="110" height="150" fill="#16396b"/><rect x="440" y="330" width="110" height="80" fill="#9fc4ee"/>
   <rect x="360" y="400" width="60" height="70" fill="${ORANGE}"/>`,
  "#9fc4ee",
  "#fde9c8",
);
card(
  "obra-estrutural.svg",
  `<rect y="480" width="800" height="120" fill="#3b4a63"/>
   ${[0, 1, 2, 3].map((i) => `<rect x="${120 + i * 180}" y="130" width="26" height="350" fill="#aeb7c6"/>`).join("")}
   ${[0, 1, 2, 3].map((i) => `<rect x="90" y="${170 + i * 100}" width="640" height="18" fill="#cfd6e2"/>`).join("")}
   <g stroke="${ORANGE}" stroke-width="3">${Array.from({ length: 9 }, (_, i) => `<path d="M${130 + i * 70} 130v-40"/>`).join("")}</g>`,
  "#c9d6ec",
  "#eef2f8",
);
card(
  "obra-laudo.svg",
  `<rect y="480" width="800" height="120" fill="#4b5a73"/>
   <rect x="160" y="140" width="480" height="340" fill="#d9dee8"/>
   ${[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4].map((c) => `<rect x="${190 + c * 90}" y="${170 + r * 76}" width="56" height="46" fill="#16396b" opacity=".85"/>`).join("")).join("")}
   <path d="M360 140l60 160-30 20 40 160" stroke="#0B1F3A" stroke-width="5" fill="none"/>
   <circle cx="600" cy="130" r="54" fill="none" stroke="${ORANGE}" stroke-width="10"/><path d="M640 170l60 60" stroke="${ORANGE}" stroke-width="12" stroke-linecap="round"/>`,
  "#c7d3e8",
  "#f2f5fa",
);
card(
  "obra-reforma.svg",
  `<rect y="480" width="800" height="120" fill="#8b6b4a"/>
   <rect x="170" y="210" width="460" height="270" fill="#f1e4cf"/>
   <rect x="170" y="210" width="460" height="60" fill="#0B1F3A"/>
   <rect x="170" y="270" width="200" height="210" fill="#e6c9a0"/>
   <g stroke="#8b6b4a" stroke-width="3">${Array.from({ length: 9 }, (_, i) => `<path d="M170 ${270 + i * 24}H370"/>`).join("")}</g>
   <rect x="430" y="300" width="140" height="180" fill="#16396b"/><rect x="450" y="320" width="100" height="60" fill="#9fc4ee"/>
   <path d="M610 480l50-120" stroke="${ORANGE}" stroke-width="14" stroke-linecap="round"/>`,
  "#bcd3ee",
  "#fff1d9",
);

// ---------- Logo ----------
const mark = (
  bg,
) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Tiago Nascimento Engenharia Civil">
  <rect width="64" height="64" rx="12" fill="${bg}"/>
  <path d="M14 18h36v8H36v26h-8V26H14z" fill="#fff"/>
  <rect x="38" y="30" width="12" height="22" fill="${ORANGE}"/>
</svg>`;
save("logo-marca.svg", mark(NAVY));
save("favicon.svg", mark(NAVY));

// ---------- OG (png para WhatsApp) ----------
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
 <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${NAVY}"/><stop offset="1" stop-color="${NAVY2}"/></linearGradient></defs>
 <rect width="1200" height="630" fill="url(#g)"/>
 <g stroke="#7fb3ff" stroke-opacity=".1">${Array.from({ length: 30 }, (_, i) => `<path d="M${i * 40} 0V630M0 ${i * 40}H1200"/>`).join("")}</g>
 <rect x="80" y="90" width="110" height="110" rx="22" fill="#fff"/>
 <path d="M104 120h62v14h-24v46h-14v-46h-24z" fill="${NAVY}"/><rect x="146" y="148" width="20" height="32" fill="${ORANGE}"/>
 <text x="80" y="340" font-family="Arial" font-weight="900" font-size="86" fill="#fff">Tiago Nascimento</text>
 <text x="80" y="420" font-family="Arial" font-size="44" fill="${ORANGE}" font-weight="700">Engenharia Civil</text>
 <text x="80" y="500" font-family="Arial" font-size="32" fill="#cfe0ff">Projetos, laudos e obras com solidez e confiança</text>
 <rect x="0" y="600" width="1200" height="30" fill="${ORANGE}"/></svg>`;
await sharp(Buffer.from(ogSvg))
  .png()
  .toFile(fileURLToPath(new URL("og.png", out)));
console.log("imagens geradas");

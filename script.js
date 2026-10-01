const PORTFOLIO_CONFIG = {
  name: 'Rajit M Krishna',
  role: '2nd-Year Computer Science & Engineering Student',
  university: 'REVA University, Bangalore',
  email: 'rajit.m.krishna000@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rajit-m-krishna',
  github: 'https://github.com/Rajit2207',
  skills: { C: 'Good', Python: 'Basic' },
  project: 'IoT-Based Water Quality Monitoring System'
};

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let soundEnabled = false;
let audioContext;

function playBlip(frequency = 440) {
  if (!soundEnabled) return;
  audioContext ||= new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';
  gain.gain.setValueAtTime(0.025, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.08);
}

menuToggle?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  playBlip(330);
});
document.querySelectorAll('a, button').forEach((element) => element.addEventListener('click', () => playBlip(520)));
document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const soundToggle = document.querySelector('.sound-toggle');
soundToggle?.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundToggle.setAttribute('aria-pressed', String(soundEnabled));
  soundToggle.innerHTML = soundEnabled ? '● <span>Sound on</span>' : '◌ <span>Sound off</span>';
  playBlip(660);
});

const terminalContent = document.querySelector('#terminal-content');
const terminalIntro = document.querySelector('#terminal-intro');
const terminalInput = document.querySelector('#terminal-input');
const terminalForm = document.querySelector('#terminal-form');
const terminalOutput = document.querySelector('#terminal-output');
const terminalViews = {
  'rajit.c': '<p><span class="terminal-key">#include</span> &lt;curiosity.h&gt;</p><p><span class="terminal-key">int</span> main() {</p><p>&nbsp;&nbsp;build(<span class="terminal-string">"meaningful things"</span>);</p><p>&nbsp;&nbsp;learn(<span class="terminal-string">"every day"</span>);</p><p>&nbsp;&nbsp;<span class="terminal-key">return</span> progress;</p><p>}</p>',
  'explore.py': '<p><span class="terminal-key">interests</span> = [<span class="terminal-string">"web"</span>, <span class="terminal-string">"AI/ML"</span>, <span class="terminal-string">"hardware"</span>]</p><p><span class="terminal-key">for</span> idea <span class="terminal-key">in</span> interests:</p><p>&nbsp;&nbsp;prototype(idea)</p>',
  bash: '<p class="terminal-muted">Type <span class="terminal-string">help</span> to see available commands.</p>'
};
function renderTerminal(view = 'rajit.c') {
  terminalIntro.textContent = view === 'bash' ? 'bash' : `cat ${view}`;
  terminalContent.innerHTML = terminalViews[view];
  terminalInput.disabled = view !== 'bash';
  if (view === 'bash') terminalInput.focus();
}
document.querySelectorAll('.terminal-tab').forEach((tab) => tab.addEventListener('click', () => {
  document.querySelectorAll('.terminal-tab').forEach((item) => item.classList.remove('active'));
  tab.classList.add('active');
  renderTerminal(tab.dataset.tab);
}));
const commands = {
  help: '<p class="terminal-string">help</p><p>skills &nbsp; project &nbsp; socials &nbsp; github &nbsp; contact &nbsp; clear</p>',
  skills: `<p><span class="terminal-key">C</span> ........ [Good] / syntax + memory logic</p><p><span class="terminal-key">Python</span> ... [Basic] / foundations + scripting</p>`,
  project: `<p><span class="terminal-key">${PORTFOLIO_CONFIG.project}</span></p><p>ESP8266 NodeMCU · Analog Turbidity Sensor · LCD</p><p>IoT Cloud Protocol · Arduino IDE</p>`,
  socials: `<p><a class="terminal-link" href="${PORTFOLIO_CONFIG.github}" target="_blank">GitHub ↗</a> &nbsp; <a class="terminal-link" href="${PORTFOLIO_CONFIG.linkedin}" target="_blank">LinkedIn ↗</a></p><p><a class="terminal-link" href="mailto:${PORTFOLIO_CONFIG.email}">${PORTFOLIO_CONFIG.email}</a></p>`,
  github: `<p>Opening GitHub profile...</p>`,
  contact: `<p>Opening mail client...</p>`,
  clear: ''
};
terminalForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const command = terminalInput.value.trim().toLowerCase();
  if (!command) return;
  terminalOutput.insertAdjacentHTML('beforeend', `<p><span class="terminal-prompt">rajit@portfolio:~$</span> ${command}</p>${commands[command] ?? '<p class="terminal-error">command not found. Try help.</p>'}`);
  if (command === 'clear') terminalOutput.innerHTML = '';
  if (command === 'github') window.open(PORTFOLIO_CONFIG.github, '_blank', 'noopener');
  if (command === 'contact') window.location.href = `mailto:${PORTFOLIO_CONFIG.email}`;
  terminalInput.value = '';
  document.querySelector('#terminal-screen').scrollTop = document.querySelector('#terminal-screen').scrollHeight;
  playBlip(600);
});
terminalInput?.addEventListener('keydown', () => playBlip(390));
renderTerminal();

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('pointermove', (event) => {
  cursorGlow?.style.setProperty('--x', `${event.clientX}px`);
  cursorGlow?.style.setProperty('--y', `${event.clientY}px`);
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
      card.style.setProperty('--spot-x', `${x * 100}%`);
      card.style.setProperty('--spot-y', `${y * 100}%`);
      if (!reducedMotion) card.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * 5}deg) rotateY(${(x - 0.5) * 5}deg) scale3d(1.02,1.02,1.02)`;
    }
  });
});
document.querySelectorAll('[data-tilt]').forEach((card) => card.addEventListener('mouseleave', () => { card.style.transform = ''; }));

const palette = document.querySelector('.palette-backdrop');
const paletteInput = document.querySelector('#palette-input');
const paletteResults = document.querySelector('#palette-results');
const paletteItems = [['About', '#about'], ['Skills', '#skills'], ['IoT Project', '#projects'], ['GitHub', '#github'], ['Certifications', '#certifications'], ['Education', '#education'], ['LinkedIn', PORTFOLIO_CONFIG.linkedin], ['Contact', '#contact']];
function openPalette() { palette.classList.add('open'); palette.setAttribute('aria-hidden', 'false'); paletteInput.focus(); drawPalette(); }
function closePalette() { palette.classList.remove('open'); palette.setAttribute('aria-hidden', 'true'); }
function drawPalette() { const query = paletteInput.value.toLowerCase(); paletteResults.innerHTML = paletteItems.filter(([label]) => label.toLowerCase().includes(query)).map(([label, href], index) => `<a href="${href}" ${href.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}><span>${label}</span><kbd>${index + 1}</kbd></a>`).join(''); }
document.querySelector('.palette-badge')?.addEventListener('click', openPalette);
document.querySelector('.nav-command')?.addEventListener('click', openPalette);
paletteInput?.addEventListener('input', drawPalette);
palette?.addEventListener('click', (event) => { if (event.target === palette) closePalette(); });
document.addEventListener('keydown', (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openPalette(); } if (event.key === 'Escape') closePalette(); });
paletteResults?.addEventListener('click', closePalette);

async function loadGithubStatus() {
  try { const response = await fetch('https://api.github.com/users/Rajit2207'); if (!response.ok) return; const data = await response.json(); const marker = document.querySelector('.github-band .mono-label'); if (marker) marker.textContent = `OPEN SOURCE · ${data.public_repos} PUBLIC REPOSITORIES · LEARNING`; } catch { /* Offline use keeps the profile link fully usable. */ }
}
loadGithubStatus();

document.querySelectorAll('[data-copy]').forEach((button) => button.addEventListener('click', async () => {
  await navigator.clipboard.writeText(button.dataset.copy);
  button.textContent = 'copied';
  setTimeout(() => { button.textContent = 'copy'; }, 1400);
}));
document.querySelector('.copy-code')?.addEventListener('click', async (event) => {
  await navigator.clipboard.writeText(document.querySelector('#terminal-content').innerText);
  event.currentTarget.textContent = '✓';
  setTimeout(() => { event.currentTarget.textContent = '▣'; }, 1400);
});
document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.querySelector('.form-note').textContent = 'Message staged locally. Connect this form to an email service to send it.';
  event.currentTarget.reset();
});

const canvas = document.querySelector('.particle-canvas');
const context = canvas?.getContext('2d');
const pointer = { x: -1000, y: -1000 };
let particles = [];
function resizeCanvas() { if (!canvas) return; canvas.width = window.innerWidth * devicePixelRatio; canvas.height = window.innerHeight * devicePixelRatio; context.scale(devicePixelRatio, devicePixelRatio); particles = Array.from({ length: Math.min(65, Math.floor(window.innerWidth / 18)) }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25 })); }
function drawParticles() { if (!context || reducedMotion) return; context.clearRect(0, 0, innerWidth, innerHeight); particles.forEach((particle, index) => { const dx = pointer.x - particle.x; const dy = pointer.y - particle.y; const distance = Math.hypot(dx, dy); if (distance < 180) { particle.vx += dx / distance * .003; particle.vy += dy / distance * .003; } particle.x += particle.vx; particle.y += particle.vy; if (particle.x < 0 || particle.x > innerWidth) particle.vx *= -1; if (particle.y < 0 || particle.y > innerHeight) particle.vy *= -1; context.fillStyle = 'rgba(0,240,255,.45)'; context.fillRect(particle.x, particle.y, 1.5, 1.5); particles.slice(index + 1).forEach((other) => { const gap = Math.hypot(particle.x - other.x, particle.y - other.y); if (gap < 115) { context.strokeStyle = `rgba(0,240,255,${.12 * (1 - gap / 115)})`; context.beginPath(); context.moveTo(particle.x, particle.y); context.lineTo(other.x, other.y); context.stroke(); } }); }); requestAnimationFrame(drawParticles); }
window.addEventListener('resize', resizeCanvas); document.addEventListener('pointermove', (event) => { pointer.x = event.clientX; pointer.y = event.clientY; }); resizeCanvas(); drawParticles();

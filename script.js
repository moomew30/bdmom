const pages = [
  { label: "ปกหนังสือ", html: `<section class="cover"><div class="cover-ornament"></div><p class="eyebrow">หนังสือเล่มเล็กจากหัวใจ</p><h1>ถึงแม่<br>ด้วยรัก</h1><p>เรื่องราวของเรา ตั้งแต่วันแรกจนถึงวันนี้</p><span class="date">สุขสันต์วันเกิดนะครับ แม่</span></section>` },
  { label: "บทที่ 1 · วันแรกของเรา", html: `<section class="chapter"><div class="photo-wrap"><span class="tape"></span><div class="photo-placeholder"><img src="/images/img1.jpg" alt=""></div></div><div><p class="eyebrow">บทที่หนึ่ง</p><h2>วันแรกของเรา</h2><p class="copy">ตั้งแต่วันแรกที่ผมลืมตาดูโลก แม่ก็เป็นคนแรกที่คอยอุ้มชู ดูแล และมอบความรักให้โดยไม่เคยขอสิ่งใดตอบแทน</p></div></section>` },
  { label: "บทที่ 2 · มือที่คอยประคอง", html: `<section class="chapter"><div class="photo-wrap"><span class="tape"></span><div class="photo-placeholder"><img src="/images/img2.jpg" alt=""></div></div><div><p class="eyebrow">บทที่สอง</p><h2>มือที่คอยประคอง</h2><p class="copy">ทุกก้าวในวัยเด็กมีแม่อยู่ข้าง ๆ เสมอ วันที่ผมหกล้ม แม่คอยปลอบ วันที่ผมยิ้ม แม่ก็ยิ้มกว้างกว่าผมทุกครั้ง</p></div></section>` },
  { label: "บทที่ 3 · วันที่ผมเริ่มโต", html: `<section><p class="eyebrow">บทที่สาม</p><h2>วันที่ผมเริ่มโต</h2><p class="copy">เมื่อผมโตขึ้น โลกของผมก็กว้างขึ้นเรื่อย ๆ จนอาจมีบางวันที่มัวแต่วิ่งตามทางของตัวเอง และลืมหันกลับมามองว่าแม่ยังคงยืนอยู่ที่เดิม—คอยเป็นห่วงอยู่เสมอ</p><p class="signature">แต่แม่ไม่เคยปล่อยมือเลย</p></section>` },
  { label: "บทที่ 4 · ถึงลูกคนนี้จะดื้อ", html: `<section><span class="quote-mark">“</span><p class="quote">ถึงลูกคนนี้จะดื้อบ้าง<br>พูดไม่เก่งบ้าง<br>แต่รักแม่มากกว่าที่เคยพูดออกไปเสมอ</p></section>` },
  { label: "บทที่ 5 · วันนี้ของเรา", html: `<section class="chapter"><div class="photo-wrap"><span class="tape"></span><div class="photo-placeholder"><img src="/images/img3.jpg" alt=""></div></div><div><p class="eyebrow">บทที่ห้า</p><h2>วันนี้ของเรา</h2><p class="copy">วันนี้ผมจึงเริ่มเข้าใจแล้วว่า ทุกสิ่งที่แม่ทำต้องใช้ทั้งแรงกายและแรงใจมากเพียงใด ขอบคุณที่เหนื่อยเพื่อครอบครัวมาตลอดนะครับ</p></div></section>` },
  { label: "คำขอบคุณจากหัวใจ", html: `<section class="center"><div class="final-heart">♥</div><p class="eyebrow">จากหัวใจของลูก</p><h2>ขอบคุณนะครับ แม่</h2><p class="copy">ขอบคุณสำหรับทุกมื้ออาหาร ทุกคำสอน ทุกความเป็นห่วง และทุกครั้งที่แม่เลือกให้ผมก่อนตัวเอง ต่อจากนี้ขอให้ผมได้เป็นคนดูแลรอยยิ้มของแม่บ้างนะครับ</p></section>` },
  { label: "สุขสันต์วันเกิด", html: `<section class="center"><p class="eyebrow">หน้าสุดท้าย แต่ไม่ใช่ความทรงจำสุดท้าย</p><h2>สุขสันต์วันเกิดนะครับ</h2><p class="copy">ขอให้แม่มีสุขภาพแข็งแรง ได้พักผ่อนเยอะ ๆ มีความสุขในทุกวัน และอยู่สร้างความทรงจำดี ๆ ด้วยกันไปอีกนานแสนนาน</p><p class="signature">รักแม่เสมอ<br>— จากลูกคนนี้</p></section>` }
];

const page = document.getElementById('page');
const pageInner = document.getElementById('pageInner');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const pageCount = document.getElementById('pageCount');
const progressBar = document.getElementById('progressBar');
const progress = document.querySelector('.progress');
const soundButton = document.getElementById('soundButton');
let index = 0, turning = false, startX = 0, audioContext, musicTimer;

function render() {
  pageInner.innerHTML = pages[index].html;
  pageCount.textContent = pages[index].label;
  progressBar.style.width = `${((index + 1) / pages.length) * 100}%`;
  progress.setAttribute('aria-valuenow', index + 1);
  prevButton.disabled = index === 0;
  nextButton.innerHTML = index === pages.length - 1 ? '<span>อ่านอีกครั้ง</span><span aria-hidden="true">↻</span>' : index === 0 ? '<span>เปิดอ่าน</span><span aria-hidden="true">→</span>' : '<span>ถัดไป</span><span aria-hidden="true">→</span>';
}

function turn(direction) {
  if (turning) return;
  const target = direction === 1 ? (index === pages.length - 1 ? 0 : index + 1) : Math.max(0, index - 1);
  if (target === index) return;
  turning = true;
  page.classList.add(direction === 1 ? 'turn-next' : 'turn-prev');
  setTimeout(() => { index = target; render(); }, 345);
  setTimeout(() => { page.classList.remove('turn-next', 'turn-prev'); turning = false; }, 720);
}

nextButton.addEventListener('click', () => turn(1));
prevButton.addEventListener('click', () => turn(-1));
document.getElementById('book').addEventListener('click', e => turn(e.clientX < innerWidth / 2 ? -1 : 1));
document.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === ' ') turn(1); if (e.key === 'ArrowLeft') turn(-1); });
page.addEventListener('touchstart', e => startX = e.changedTouches[0].clientX, { passive: true });
page.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - startX; if (Math.abs(dx) > 45) turn(dx < 0 ? 1 : -1); }, { passive: true });

function playGentleNotes() {
  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  const notes = [261.63, 329.63, 392, 329.63, 293.66, 349.23, 440, 349.23]; let n = 0;
  const play = () => { const osc = audioContext.createOscillator(), gain = audioContext.createGain(); osc.type = 'sine'; osc.frequency.value = notes[n++ % notes.length]; gain.gain.setValueAtTime(.0001, audioContext.currentTime); gain.gain.exponentialRampToValueAtTime(.035, audioContext.currentTime + .05); gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + 1.35); osc.connect(gain).connect(audioContext.destination); osc.start(); osc.stop(audioContext.currentTime + 1.4); };
  play(); musicTimer = setInterval(play, 1450);
}
soundButton.addEventListener('click', () => { const on = soundButton.getAttribute('aria-pressed') === 'true'; soundButton.setAttribute('aria-pressed', String(!on)); soundButton.setAttribute('aria-label', on ? 'เปิดเสียงบรรยากาศ' : 'ปิดเสียงบรรยากาศ'); if (on) { clearInterval(musicTimer); audioContext?.suspend(); } else { audioContext?.resume(); playGentleNotes(); } });
render();

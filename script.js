const works = [
  ["Monolith I", "Reykjavík, IS", "A study in vertical tension and polar light.", "monolith"],
  ["Soft Divide", "Osaka, JP", "Shadow becomes architecture at the edge of day.", "divide"],
  ["Passage", "Berlin, DE", "A threshold held between arrival and departure.", "passage"],
  ["White Current", "Vík, IS", "The horizon dissolves into weather and water.", "current"],
  ["Night Geometry", "London, UK", "Concrete planes arranged in nocturnal rhythm.", "geometry"],
  ["Still House", "Kyoto, JP", "Domestic form reduced to light and proportion.", "house"],
  ["Signal", "Paris, FR", "A single interruption in an ordered field.", "signal"],
  ["Afterimage", "New York, US", "What remains after the city moves on.", "afterimage"],
  ["Fault Line", "Lisbon, PT", "Stone, shadow, and a precise incision of sky.", "fault"],
  ["Last Light", "Lofoten, NO", "The final measure of light before darkness.", "light"]
];

const scenes = {
  monolith:`<rect width="900" height="1100" fill="#b9b9b7"/><path d="M0 840 900 610v490H0z" fill="#575755"/><path d="M310 0h270l90 845-425 109z" fill="#272727"/><path d="m580 0 90 845-94 24-86-869z" fill="#e4e4df" opacity=".45"/>`,
  divide:`<rect width="900" height="1100" fill="#d7d7d3"/><path d="M0 0h550L310 1100H0z" fill="#151515"/><path d="m550 0 350 260v840H310z" fill="#787875"/><circle cx="588" cy="450" r="82" fill="#efefea"/>`,
  passage:`<rect width="900" height="1100" fill="#888"/><path d="M110 0h680v1100H110z" fill="#292929"/><path d="M245 150h410v950H245z" fill="#050505"/><path d="M313 247h274v853H313z" fill="#c5c5c0"/><path d="m313 247 274 0-145 310z" fill="#eee"/>`,
  current:`<rect width="1200" height="800" fill="#d9d9d7"/><path d="M0 380q260-170 520 12t680-65v473H0z" fill="#4b4b4a"/><path d="M0 512q220-120 460 15t740-52v325H0z" fill="#1c1c1c"/><path d="M0 590q290-80 600 30t600-15" fill="none" stroke="#eee" stroke-width="6" opacity=".6"/>`,
  geometry:`<rect width="1200" height="800" fill="#101010"/><path d="m0 800 330-620 215 620zm545 0L790 0l410 800z" fill="#555"/><path d="M340 800 620 90l170 710z" fill="#bdbdb9"/><rect x="875" y="145" width="115" height="115" fill="#eee"/>`,
  house:`<rect width="900" height="1100" fill="#c9c9c4"/><rect y="720" width="900" height="380" fill="#4a4a48"/><path d="M170 470 460 205l300 265v370H170z" fill="#252525"/><rect x="420" y="572" width="120" height="268" fill="#deded9"/><rect x="215" y="540" width="120" height="90" fill="#888"/>`,
  signal:`<rect width="900" height="1100" fill="#222"/><g stroke="#777" stroke-width="2">${Array.from({length:15},(_,i)=>`<path d="M0 ${100+i*65}h900"/>`).join('')}</g><rect x="410" y="130" width="80" height="840" fill="#d8d8d4"/><circle cx="450" cy="530" r="45" fill="#111"/>`,
  afterimage:`<rect width="900" height="1100" fill="#bcbcb8"/><g fill="#252525">${Array.from({length:6},(_,i)=>`<rect x="${100+i*125}" y="${140+(i%2)*90}" width="75" height="800"/>`).join('')}</g><path d="M0 860 900 430v670H0z" fill="#eee" opacity=".55"/>`,
  fault:`<rect width="1200" height="800" fill="#8e8e8b"/><path d="M0 0h530L430 800H0zm675 0h525v800H570z" fill="#252525"/><path d="m530 0 145 0-105 800H430z" fill="#e4e4df"/>`,
  light:`<rect width="1200" height="800" fill="#171717"/><circle cx="865" cy="280" r="125" fill="#deded8"/><path d="M0 585 225 350l205 170 185-250 250 315 335-80v295H0z" fill="#4c4c4a"/><path d="M0 670 330 515l270 170 310-145 290 90v170H0z" fill="#090909"/>`
};

const makeImage = (kind, wide) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${wide ? '1200 800' : '900 1100'}">${scenes[kind]}</svg>`)}`;
const grid = document.querySelector('#gallery-grid');
works.forEach((work, index) => {
  const card = document.createElement('article');
  card.className = 'gallery-card'; card.tabIndex = 0; card.setAttribute('role','button');
  card.setAttribute('aria-label', `View ${work[0]}`);
  const wide = [3,4,8,9].includes(index);
  card.innerHTML = `<div class="thumb-wrap"><img src="${makeImage(work[3],wide)}" alt="Abstract monochrome artwork titled ${work[0]}" /></div><div class="card-meta"><span>${String(index+1).padStart(2,'0')}</span><strong>${work[0].toUpperCase()}</strong><small>${work[1].toUpperCase()}</small></div>`;
  card.addEventListener('click',()=>openViewer(index));
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openViewer(index)}});
  grid.append(card);
});

const viewer=document.querySelector('#viewer'), image=document.querySelector('#viewer-image');
let active=0;
function updateViewer(){ const w=works[active],wide=[3,4,8,9].includes(active); image.src=makeImage(w[3],wide);image.alt=`Abstract monochrome artwork titled ${w[0]}`;document.querySelector('#viewer-count').textContent=`${String(active+1).padStart(2,'0')} / ${works.length}`;document.querySelector('#viewer-title').textContent=w[0].toUpperCase();document.querySelector('#viewer-location').textContent=w[1].toUpperCase();document.querySelector('#viewer-description').textContent=w[2]; }
function openViewer(index){active=index;updateViewer();viewer.showModal();document.body.style.overflow='hidden'}
function closeViewer(){viewer.close();document.body.style.overflow=''}
document.querySelector('.viewer-close').addEventListener('click',closeViewer);
document.querySelector('.viewer-prev').addEventListener('click',()=>{active=(active+works.length-1)%works.length;updateViewer()});
document.querySelector('.viewer-next').addEventListener('click',()=>{active=(active+1)%works.length;updateViewer()});
viewer.addEventListener('click',e=>{if(e.target===viewer)closeViewer()});
document.addEventListener('keydown',e=>{if(!viewer.open)return;if(e.key==='ArrowLeft'){active=(active+works.length-1)%works.length;updateViewer()}if(e.key==='ArrowRight'){active=(active+1)%works.length;updateViewer()}});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.gallery-card').forEach(c=>observer.observe(c));
const sound=document.querySelector('.sound-toggle');sound.addEventListener('click',()=>{const on=sound.getAttribute('aria-pressed')==='true';sound.setAttribute('aria-pressed',String(!on));sound.lastElementChild.textContent=on?'SOUND OFF':'SOUND ON'});

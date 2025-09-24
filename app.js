(() => {
  const svg = document.getElementById('mapSVG');
  const path = document.getElementById('flightPath');
  const plane = document.getElementById('plane');
  const replay = document.getElementById('replay');
  const stage = document.getElementById('stage');

  const pathLen = path.getTotalLength();
  let startTime = null;
  const duration = 4200; // ms

  function spawnParticles(){
    const colors = ['#ffd27a','#ff9ccf','#b4f8ff','#ffd9f0'];
    for(let i=0;i<16;i++){
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = (Math.random()*90 + 2) + '%';
      p.style.top = (Math.random()*80 + 4) + '%';
      p.style.width = (6 + Math.random()*12) + 'px';
      p.style.height = p.style.width;
      p.style.background = colors[i % colors.length];
      p.style.opacity = 0.9 - Math.random()*0.6;
      p.style.transform = `translateY(${Math.random()*30}px)`;
      stage.appendChild(p);

      const delay = Math.random()*2000;
      p.animate([
        { transform: `translateY(0) scale(1)`, opacity: p.style.opacity },
        { transform: `translateY(-60px) scale(.7)`, opacity: 0 }
      ], { duration: 4000 + Math.random()*3000, delay, iterations: Infinity });
    }
  }

  spawnParticles();

  function easeInOut(t){ return t<.5 ? 2*t*t : -1 + (4-2*t)*t; }

  function animatePlane(ts){
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;
    let t = Math.min(1, elapsed / duration);
    const eased = easeInOut(t);

    const pos = path.getPointAtLength(eased * pathLen);
    const ahead = path.getPointAtLength(Math.min(pathLen, eased*pathLen + 1));
    const angle = Math.atan2(ahead.y - pos.y, ahead.x - pos.x) * 180/Math.PI;

    plane.setAttribute('transform', `translate(${pos.x-20}, ${pos.y-40}) rotate(${angle})`);
    plane.style.filter = `drop-shadow(0 ${6 + eased*8}px rgba(0,0,0,${0.06 + eased*0.08}))`;

    if (t < 1){
      requestAnimationFrame(animatePlane);
    } else {
      const card = document.getElementById('messageCard');
      card.animate([{ transform:'translateY(0)', opacity:1 }, { transform:'translateY(-6px)', opacity:1 }, { transform:'translateY(0)', opacity:1 }], { duration:800, iterations:3 });
    }
  }

  function play(){
    startTime = null;
    requestAnimationFrame(animatePlane);
  }

  setTimeout(play, 400);

  replay.addEventListener('click', (e)=>{
    e.preventDefault();
    play();
  });

  stage.addEventListener('mousemove', (ev)=>{
    const r = stage.getBoundingClientRect();
    const cx = r.width/2;
    const cy = r.height/2;
    const dx = (ev.clientX - r.left - cx)/cx;
    const dy = (ev.clientY - r.top - cy)/cy;
    svg.style.transform = `translate3d(${dx*6}px,${dy*6}px,0) rotate(${dx*1.5}deg)`;
  });
  stage.addEventListener('mouseleave', ()=> svg.style.transform = '');
})();

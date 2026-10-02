// motion-design kit: deterministic timing helpers + theme/copy access.
// Contract: every style page defines window.DUR (seconds) and window.frame(t).
// frame(t) must set every animated property from t alone (no rAF, Date.now, unseeded random).
// For loops, frame(0) should equal frame(DUR).
(function(){
  const K = {};
  K.clamp = (x,a=0,b=1)=>Math.min(b,Math.max(a,x));
  K.lerp = (a,b,u)=>a+(b-a)*u;
  // normalised progress of t inside [a,b]
  K.seg = (t,a,b)=>K.clamp((t-a)/(b-a));
  // eases
  K.smooth = u=>u*u*(3-2*u);
  K.smoother = u=>u*u*u*(u*(u*6-15)+10);           // no one-frame pop (motion-video-kit)
  K.outExpo = u=>u>=1?1:1-Math.pow(2,-10*u);
  K.inExpo = u=>u<=0?0:Math.pow(2,10*u-10);
  K.inOutExpo = u=>u<=0?0:u>=1?1:u<.5?Math.pow(2,20*u-10)/2:(2-Math.pow(2,-20*u+10))/2;
  K.outCubic = u=>1-Math.pow(1-u,3);
  K.inCubic = u=>u*u*u;
  K.inOutCubic = u=>u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2;
  K.outQuint = u=>1-Math.pow(1-u,5);
  K.outBack = (u,s=1.70158)=>1+(s+1)*Math.pow(u-1,3)+s*Math.pow(u-1,2);
  K.inOutSine = u=>-(Math.cos(Math.PI*u)-1)/2;
  // cubic-bezier like CSS (x1,y1,x2,y2)
  K.bezier = (x1,y1,x2,y2)=>u=>{
    if(u<=0)return 0; if(u>=1)return 1;
    let lo=0,hi=1,m=u; for(let i=0;i<24;i++){m=(lo+hi)/2;const x=3*(1-m)*(1-m)*m*x1+3*(1-m)*m*m*x2+m*m*m; if(x<u)lo=m; else hi=m;}
    return 3*(1-m)*(1-m)*m*y1+3*(1-m)*m*m*y2+m*m*m; };
  K.premium = K.bezier(.4,0,.2,1);     // LottieFiles "premium" signature ease
  K.emph = K.bezier(.05,.7,.1,1);      // MD3 emphasized entrance
  K.accel = K.bezier(.3,0,1,1);        // MD3 exit
  // closed-form damped spring 0->1 (stiffness k, damping c, mass 1), t in seconds
  K.spring = (t,k=180,c=14)=>{ if(t<=0)return 0; const w0=Math.sqrt(k), z=c/(2*w0);
    if(z<1){const wd=w0*Math.sqrt(1-z*z); return 1-Math.exp(-z*w0*t)*(Math.cos(wd*t)+z*w0/wd*Math.sin(wd*t));}
    return 1-Math.exp(-w0*t)*(1+w0*t); };
  // speed-ramp: readable landing, fast exit (motion-grammar rule 4)
  K.ramp = (t,a,b,land=.55)=>{const u=K.seg(t,a,b); return u<land? K.outExpo(u/land)*.92 : .92+.08*K.inExpo((u-land)/(1-land));};
  // deterministic hash noise
  K.hash = (i,j=0)=>{let n=(i*374761393+j*668265263)|0; n=(n^(n>>13))*1274126177|0; return ((n^(n>>16))&0x7fffffff)/0x7fffffff;};
  K.noise1 = (x,seed=0)=>{const i=Math.floor(x),f=x-i,u=f*f*(3-2*f); return K.lerp(K.hash(i,seed),K.hash(i+1,seed),u);};
  K.loop = (t,dur)=>((t%dur)+dur)%dur;
  K.$ = s=>document.querySelector(s);
  K.$$ = s=>[...document.querySelectorAll(s)];
  K.css = (el,o)=>{ if(typeof el==='string')el=K.$(el); for(const k in o){ if(k.startsWith('--')) el.style.setProperty(k,o[k]); else el.style[k]=o[k]; } };
  // ---- theme + copy -------------------------------------------------------
  // K.color('--primary') -> [r,g,b] in 0..1 (for canvas/WebGL); K.hex('--primary') -> '#6552c8'.
  K.hex = name=>{ const v=getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if(v.startsWith('#')) return v.length===4? '#'+[...v.slice(1)].map(c=>c+c).join('') : v.slice(0,7);
    const c=document.createElement('canvas').getContext('2d'); c.fillStyle=v||'#000'; return c.fillStyle; };
  K.color = name=>{ const h=K.hex(name); return [1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255); };
  K.rgba = (name,a=1)=>{ const [r,g,b]=K.color(name); return `rgba(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)},${a})`; };
  // Every page keeps its on-screen words in one COPY object: const COPY = K.copy({headline:'...'}).
  // render.mjs --copy file.json (or window.COPY_OVERRIDE) replaces keys without editing the page.
  K.hashParam = k=>{ try{ return new URLSearchParams(location.hash.slice(1)).get(k); }catch(e){ return null; } };
  K.copy = defaults=>{ let h=null; try{ const c=K.hashParam('copy'); if(c) h=JSON.parse(c); }catch(e){}
    return Object.assign({}, defaults, h||{}, window.COPY_OVERRIDE||{}); };
  // Fill [data-copy="key"] elements from COPY (call once at load, before the first frame).
  K.fill = copy=>{ document.querySelectorAll('[data-copy]').forEach(el=>{ const v=copy[el.dataset.copy]; if(v!=null) el.innerHTML=v; }); };
  window.K = K;
})();

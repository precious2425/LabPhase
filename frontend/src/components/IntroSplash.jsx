import React, { useEffect, useState } from 'react';

// Change this one link later to use a different picture
const INTRO_IMAGE = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600';
const SHOW_FOR_MS = 3000;

const css = `
.intro{position:fixed;inset:0;z-index:9999;overflow:hidden;background:#111;color:#fff;cursor:pointer;
  animation:introIn .5s ease both}
.intro-leave{animation:introOut .6s ease forwards;pointer-events:none}
.intro-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  animation:introZoom 3.6s ease-out both}
.intro-shade{position:absolute;inset:0;
  background:linear-gradient(90deg,rgba(0,0,0,.75) 0%,rgba(0,0,0,.25) 60%,rgba(0,0,0,.1) 100%)}
.intro-content{position:relative;height:100%;display:flex;flex-direction:column;justify-content:center;
  padding:0 8vw;max-width:760px}
.intro-brand{font-weight:700;letter-spacing:.04em;opacity:0;animation:introUp .7s .2s ease forwards}
.intro-content h1{font-family:'Playfair Display',Georgia,serif;font-size:clamp(2.6rem,7vw,5.5rem);
  line-height:1.05;margin:16px 0;opacity:0;animation:introUp .8s .45s ease forwards}
.intro-content p{font-size:1.15rem;margin:0 0 28px;opacity:0;animation:introUp .8s .75s ease forwards}
.intro-btn{align-self:flex-start;border:0;border-radius:999px;padding:14px 28px;font-size:1rem;font-weight:700;
  background:#fff;color:#111;cursor:pointer;opacity:0;animation:introUp .8s 1s ease forwards}
.intro-btn:hover{background:#f0d9cf}
.intro-bar{position:absolute;left:0;right:0;bottom:0;height:4px;background:rgba(255,255,255,.2)}
.intro-bar span{display:block;height:100%;background:#fff;transform-origin:left;
  animation:introBar ${SHOW_FOR_MS}ms linear forwards}
@keyframes introIn{from{opacity:0}to{opacity:1}}
@keyframes introOut{to{opacity:0;transform:scale(1.06)}}
@keyframes introZoom{from{transform:scale(1.12)}to{transform:scale(1)}}
@keyframes introUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes introBar{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@media (prefers-reduced-motion:reduce){.intro *{animation-duration:.01s!important;animation-delay:0s!important}}
`;

export default function IntroSplash() {
  const [visible, setVisible] = useState(() => {
    try { return !sessionStorage.getItem('introSeen'); } catch { return true; }
  });
  const [leaving, setLeaving] = useState(false);

  const close = () => {
    setLeaving(true);
    try { sessionStorage.setItem('introSeen', '1'); } catch {}
    setTimeout(() => setVisible(false), 600);
  };

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(close, SHOW_FOR_MS);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`intro ${leaving ? 'intro-leave' : ''}`} onClick={close} role="dialog" aria-label="Welcome">
      <style>{css}</style>
      <img className="intro-img" src={INTRO_IMAGE} alt="" />
      <div className="intro-shade" />
      <div className="intro-content">
        <span className="intro-brand">ShopSphere</span>
        <h1>Step into<br />the new season.</h1>
        <p>Fresh arrivals, just landed.</p>
        <button className="intro-btn" onClick={(e) => { e.stopPropagation(); close(); }}>
          Enter shop
        </button>
      </div>
      <div className="intro-bar"><span /></div>
    </div>
  );
}
const canvases = [...document.querySelectorAll("canvas.avatar-webgl")];
const topIntro = document.querySelector("#top-intro");
if (topIntro) window.setTimeout(() => topIntro.remove(), 3400);
const launchProfileAvatar=()=>{
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const profile=document.querySelector('.profile-arrival[data-entry]:not([data-entry=""])');
  const stage=profile?.querySelector(".avatar-3d-stage");
  if(!stage)return;
  const character=stage.querySelector("canvas.avatar-webgl");
  const originalStyle=stage.getAttribute("style");
  if(character)character.dataset.arriving="true";
  const rect=stage.getBoundingClientRect();
  stage.style.position="fixed";stage.style.left=`${rect.left}px`;stage.style.top=`${rect.top}px`;
  stage.style.width=`${rect.width}px`;stage.style.height=`${rect.height}px`;stage.style.margin="0";
  stage.style.zIndex="80";stage.style.pointerEvents="none";
  const flight=stage.animate([
    {transform:`translate3d(0,${window.innerHeight+rect.height}px,0) scale(.78)`,opacity:0,filter:"brightness(1.5)"},
    {transform:"translate3d(0,-10px,0) scale(1.045)",opacity:1,filter:"brightness(1.18)",offset:.72},
    {transform:"translate3d(0,2px,0) scale(.99)",opacity:1,filter:"brightness(1.04)",offset:.86},
    {transform:"translate3d(0,0,0) scale(1)",opacity:1,filter:"brightness(1)"}
  ],{duration:2350,easing:"cubic-bezier(.18,.72,.2,1)",fill:"both"});
  flight.onfinish=()=>{if(originalStyle===null)stage.removeAttribute("style");else stage.setAttribute("style",originalStyle);if(character)character.dataset.arriving="false";};
};
if(document.querySelector('.profile-arrival[data-entry]:not([data-entry=""])'))window.setTimeout(launchProfileAvatar,topIntro?3350:180);

const visualStyles = document.createElement("style");
visualStyles.textContent = `
.avatar-aura{position:absolute;inset:-11% -17% -5%;z-index:1;border:0;border-radius:48% 52% 44% 56%;opacity:.9;background:conic-gradient(from 30deg,transparent 0 18deg,var(--aura-color) 22deg 25deg,transparent 32deg 77deg,var(--aura-color) 81deg 84deg,transparent 94deg 178deg,var(--aura-color) 184deg 188deg,transparent 198deg 288deg,var(--aura-color) 295deg 298deg,transparent 308deg);mask:radial-gradient(ellipse,transparent 47%,#000 50% 55%,transparent 59%);filter:drop-shadow(0 0 9px var(--aura-color)) drop-shadow(0 0 20px var(--aura-color));animation:aura-orbit 2.8s ease-in-out infinite;pointer-events:none}
.avatar-aura:before,.avatar-aura:after{content:"";position:absolute;inset:-3% 8%;border:0;border-radius:46%;background:repeating-conic-gradient(from 0deg,transparent 0 28deg,var(--aura-color) 29deg 30deg,transparent 32deg 63deg);mask:radial-gradient(ellipse,transparent 45%,#000 49% 52%,transparent 56%);opacity:.7;animation:aura-spin 4.2s linear infinite}
.avatar-aura:after{inset:-8% 12%;opacity:.42;filter:blur(3px);animation-direction:reverse;animation-duration:6s}
.aura-aura_black .avatar-aura{border-color:#a78bfa;box-shadow:inset 0 0 22px #17131f,0 0 20px #8b5cf6}
.avatar-environment{position:absolute;inset:-8% -28% 0;border-radius:45%;z-index:0;opacity:.86;pointer-events:none;animation:environment-drift 12s ease-in-out infinite alternate}
.has-background .avatar-3d-turn{position:relative;z-index:1}
.environment-background_library{background:repeating-linear-gradient(90deg,transparent 0 19%,#7f1d1d33 20% 21%),linear-gradient(145deg,#fbbf2480,#7f1d1d22 55%,#450a0a55)}
.environment-background_andes{background:linear-gradient(#7dd3fc77,#fde68a55 56%,transparent 57%),linear-gradient(145deg,transparent 35%,#365b45bb 36% 52%,transparent 53%),linear-gradient(35deg,#315b49aa 23%,transparent 24% 52%,#55765bbb 53%)}
.environment-background_ocean{background:radial-gradient(ellipse at 50% 78%,#38bdf866,transparent 60%),linear-gradient(160deg,#0369a177,#0c4a6e22 55%,#082f4966)}
.environment-background_fire{background:radial-gradient(ellipse at 50% 85%,#f9731688,transparent 60%),linear-gradient(#7f1d1d22,#43140799)}
.environment-background_nebula{background:radial-gradient(circle at 30% 30%,#f0abfc77 0 2px,transparent 4px),radial-gradient(circle at 75% 38%,#fde047aa 0 2px,transparent 4px),radial-gradient(ellipse at 45% 50%,#7c3aed99,#11182755 72%)}
.environment-background_champion{background:repeating-linear-gradient(90deg,#facc1533 0 3px,transparent 3px 28px),radial-gradient(ellipse at 50% 80%,#facc1555,transparent 68%),linear-gradient(#450a0a44,#7f1d1d99)}
.profile-bg-background_library .entry-atmosphere{opacity:.62;background:repeating-linear-gradient(90deg,transparent 0 18%,#facc1522 19% 20%),linear-gradient(145deg,#7f1d1d55,#fbbf2411)}
.profile-bg-background_andes .entry-atmosphere{opacity:.75;background:linear-gradient(#38bdf855,#fde68a33 54%,transparent 55%),linear-gradient(145deg,transparent 31%,#365b45cc 32% 52%,transparent 53%),linear-gradient(35deg,#315b49cc 21%,transparent 22% 52%,#55765bcc 53%)}
.profile-bg-background_ocean .entry-atmosphere{opacity:.8;background:repeating-radial-gradient(ellipse at 50% 120%,transparent 0 25px,#38bdf866 28px 33px,transparent 37px 59px),linear-gradient(#0369a155,#0c4a6e22)}
.profile-bg-background_fire .entry-atmosphere{opacity:.75;background:radial-gradient(ellipse at 50% 100%,#f9731688,transparent 62%),linear-gradient(#7f1d1d22,#43140799)}
.profile-bg-background_nebula .entry-atmosphere{opacity:.78;background:radial-gradient(circle at 22% 27%,#fff 0 1px,transparent 2px),radial-gradient(circle at 75% 32%,#fde047 0 1px,transparent 2px),radial-gradient(ellipse at 50% 55%,#7c3aed88,#11182766 72%)}
.profile-bg-background_champion .entry-atmosphere{opacity:.8;background:repeating-linear-gradient(90deg,#facc1522 0 3px,transparent 3px 30px),radial-gradient(ellipse at 50% 90%,#facc1566,transparent 66%)}
.visual-tier-bueno .avatar-aura{animation-duration:2.8s}
.visual-tier-exclusivo .avatar-aura{inset:-9%;border-width:5px;animation-duration:1.9s;filter:drop-shadow(0 0 14px var(--aura-color)) drop-shadow(0 0 23px #fde047)}
.profile-arrival[data-tier="exclusivo"] .avatar-arm-left,.profile-arrival[data-tier="exclusivo"] .avatar-arm-right,.profile-idle[data-tier="exclusivo"] .avatar-arm-left,.profile-idle[data-tier="exclusivo"] .avatar-arm-right{animation-duration:.24s;animation-iteration-count:10}
.has-aura .avatar-3d-turn{position:relative;z-index:2}
.avatar-pet-badge{z-index:5;animation:pet-bob 1.8s ease-in-out infinite;transform-origin:center}
.avatar-webgl{position:absolute;inset:0;width:100%;height:100%;z-index:2}
.avatar-webgl-ready .avatar-fallback,.avatar-webgl-ready .avatar-wearable,.avatar-webgl-ready .avatar-pet-badge{opacity:0}
@keyframes aura-orbit{0%,100%{transform:scale(.96) rotate(-4deg);opacity:.58}50%{transform:scale(1.04) rotate(5deg);opacity:1}}
@keyframes aura-spin{to{transform:rotate(360deg)}}@keyframes pet-bob{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-8px) rotate(6deg)}}
@keyframes environment-drift{from{transform:translateX(-3%) scale(1)}to{transform:translateX(3%) scale(1.04)}}
.profile-arrival .avatar-3d-turn{animation:avatar-turn 7s ease-in-out infinite alternate}
.profile-arrival .avatar-arm-left{animation:entry-left-step .32s ease-in-out 6 alternate}
.profile-arrival .avatar-arm-right{animation:entry-right-step .32s ease-in-out 6 alternate}
.entry-atmosphere{position:absolute;inset:0;pointer-events:none;opacity:0;z-index:0}
.entry-atmosphere:before{content:"";position:absolute;inset:12% 8%;display:grid;place-items:center;text-align:center;font-size:40px;letter-spacing:18px;opacity:.75;text-shadow:0 0 20px #fde68a;animation:entry-emblems 1.3s ease-in-out infinite alternate}
.arrival-entry_water .entry-atmosphere{opacity:.85;background:radial-gradient(ellipse at 50% 100%,#38bdf8aa,transparent 54%),repeating-radial-gradient(ellipse at 50% 110%,transparent 0 32px,#7dd3fc55 34px 38px,transparent 41px 68px);animation:water-arrival 3s ease-in-out infinite alternate}
.arrival-entry_water .entry-atmosphere:before{content:"";inset:0;background:radial-gradient(ellipse at 18% 54%,transparent 0 23%,#a5f3fc66 24% 25%,transparent 27%),radial-gradient(ellipse at 82% 54%,transparent 0 23%,#7dd3fc66 24% 25%,transparent 27%);animation:water-arrival 3s ease-in-out infinite alternate}
.arrival-entry_fire .entry-atmosphere{opacity:.9;background:radial-gradient(ellipse at 50% 100%,#fb542eaa,transparent 60%),linear-gradient(0deg,#f9731644,transparent 74%);animation:fire-arrival .7s ease-in-out infinite alternate}
.arrival-entry_fire .entry-atmosphere:before{content:"";background:radial-gradient(circle at 16% 72%,#ffd166 0 2px,transparent 4px),radial-gradient(circle at 74% 62%,#ff784f 0 2px,transparent 5px),radial-gradient(circle at 46% 38%,#ffe7a0 0 1px,transparent 3px),radial-gradient(circle at 85% 35%,#fb923c 0 2px,transparent 4px);animation:embers-rise 1.6s linear infinite}
.arrival-entry_millionaire .entry-atmosphere{opacity:.94;background:radial-gradient(circle at 50% 30%,#facc1555,transparent 62%),linear-gradient(145deg,#78350f44,#facc151a 45%,transparent);animation:gold-arrival 2.4s ease-out both}
.arrival-entry_millionaire .entry-atmosphere:before{content:"";background:radial-gradient(ellipse at 20% 45%,#fde68a 0 5px,#ca8a04 7px 9px,transparent 11px),radial-gradient(ellipse at 78% 60%,#fff7ae 0 5px,#ca8a04 7px 9px,transparent 11px),radial-gradient(ellipse at 36% 78%,#facc15 0 4px,#a16207 6px 8px,transparent 10px);animation:coin-shimmer 1.5s ease-in-out infinite alternate}
.arrival-entry_pistols .entry-atmosphere{opacity:.9;background:linear-gradient(112deg,transparent 29%,#fde04788 30%,#fff8 30.4%,transparent 31%),linear-gradient(68deg,transparent 68%,#fb718588 69%,#fff8 69.4%,transparent 70%),radial-gradient(circle at 28% 40%,#fde047aa 0 2px,transparent 24px),radial-gradient(circle at 72% 38%,#fb7185aa 0 2px,transparent 28px);animation:arcade-arrival .45s steps(2) 4}
.arrival-entry_pistols .entry-atmosphere:before{content:"";inset:0;background:linear-gradient(90deg,transparent 48%,#fff 50%,transparent 52%);opacity:.22;animation:arcade-arrival .45s steps(2) 4}
.arrival-entry_dance .avatar-3d-turn{animation:avatar-turn 7s ease-in-out infinite alternate,dance-settle .6s ease-in-out 2.35s 4}
.arrival-entry_dance .entry-atmosphere{opacity:.65;background:radial-gradient(ellipse at 50% 80%,#c084fc66,transparent 60%)}
.arrival-entry_dance .entry-atmosphere:before{content:"";background:linear-gradient(115deg,transparent 30%,#f5d0fe66 31%,transparent 33%),linear-gradient(65deg,transparent 70%,#c4b5fd66 71%,transparent 73%);animation:stage-lights 1.2s ease-in-out infinite alternate}
.entry-caption{position:absolute;top:12px;left:50%;transform:translateX(-50%);z-index:8;white-space:nowrap;border:1px solid #fde04788;border-radius:999px;background:#450a0acc;padding:6px 12px;color:#fef08a;font-size:11px;font-weight:900;letter-spacing:.06em}
.effect-effect_frame .avatar-3d-turn{outline:5px solid #facc15;outline-offset:8px;border-radius:24px}
.effect-effect_stars:after{content:"✦  ✧  ✦";position:absolute;inset:-10px;z-index:4;color:#fde047;font-size:24px;letter-spacing:22px;animation:aura-spin 8s linear infinite;pointer-events:none}
.profile-item-title{position:absolute;left:50%;top:-10px;z-index:7;transform:translateX(-50%);white-space:nowrap;border:1px solid #fde047;border-radius:999px;background:#7f1d1d;padding:4px 10px;color:#fef08a;font-size:10px;font-weight:900;box-shadow:0 0 12px #facc15}
@keyframes profile-walk-in{0%{transform:translateY(75vh) translateX(-12%) scale(.82) rotate(-8deg);opacity:0}55%{transform:translateY(-8px) translateX(2%) scale(1.03) rotate(3deg);opacity:1}70%{transform:translateY(3px) translateX(-1%) scale(.99) rotate(-2deg)}85%{transform:translateY(-2px) scale(1.01)}100%{transform:translateY(0) scale(1) rotate(0);opacity:1}}
@keyframes entry-left-step{to{transform:rotate(12deg)}}@keyframes entry-right-step{to{transform:rotate(-12deg)}}@keyframes dance-settle{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-7px) rotate(5deg)}}
@keyframes water-arrival{0%{transform:translateY(40%);opacity:0}30%,75%{opacity:1}100%{transform:translateY(-8%);opacity:.35}}@keyframes fire-arrival{to{filter:brightness(1.7);transform:scale(1.08)}}@keyframes gold-arrival{0%{filter:brightness(2);transform:scale(.5)}100%{filter:brightness(1);transform:scale(1)}}@keyframes arcade-arrival{50%{filter:brightness(1.8)}}
@keyframes entry-emblems{from{transform:translateY(18px) scale(.8);opacity:.3}to{transform:translateY(-18px) scale(1.08);opacity:.85}}
@keyframes embers-rise{from{transform:translateY(20px);opacity:.25}to{transform:translateY(-60px);opacity:.95}}
@keyframes coin-shimmer{from{transform:translateY(12px) rotate(-3deg);filter:brightness(.8)}to{transform:translateY(-12px) rotate(3deg);filter:brightness(1.5)}}
@keyframes stage-lights{from{transform:translateX(-12%) rotate(-3deg);opacity:.35}to{transform:translateX(12%) rotate(3deg);opacity:.85}}
@media(prefers-reduced-motion:reduce){.avatar-aura,.avatar-aura:before,.avatar-aura:after,.avatar-pet-badge,.profile-arrival *,.entry-atmosphere{animation:none!important}}
`;
document.head.append(visualStyles);

if (canvases.length) {
  Promise.all([
    import("https://cdn.jsdelivr.net/npm/three@0.186.0/build/three.module.js"),
    import("https://cdn.jsdelivr.net/npm/three@0.186.0/examples/jsm/loaders/GLTFLoader.js")
  ])
    .then(([THREE, { GLTFLoader }]) => canvases.forEach((canvas) => createAvatar(THREE, GLTFLoader, canvas)))
    .catch((error) => console.warn("No se pudo cargar el avatar 3D; se mostrará la ilustración de respaldo.", error));
}

function createAvatar(THREE, GLTFLoader, canvas) {
  const stage = canvas.closest(".avatar-3d-stage");
  try {
    if(canvas.dataset.entry==="entry_water") stage.style.width="min(100%, 230px)";
    const entryTheme=canvas.dataset.entry||"";
    const scene = new THREE.Scene();
    const width = Math.max(stage.clientWidth, 1);
    const height = Math.max(stage.clientHeight, 1);
    const compactView=canvas.dataset.view==="compact";
    const camera = new THREE.PerspectiveCamera(compactView?34:31, width / height, 0.1, 40);
    camera.position.set(0, compactView?2.28:1.7, compactView?3.7:7.4);
    camera.lookAt(0, compactView?2.22:1.52, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
    const mobileDevice=window.matchMedia("(max-width: 640px), (pointer: coarse)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobileDevice ? 1.1 : 1.6));
    renderer.setSize(width, height, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    scene.add(new THREE.HemisphereLight(0xfff1dc, 0x5b2330, 2.0));
    const key = new THREE.DirectionalLight(0xfff6e8, 3.2);
    key.position.set(-3.5, 5, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffc928, 2.2);
    rim.position.set(3.2, 3.8, -2.5);
    scene.add(rim);
    const fill = new THREE.PointLight(0xef4444, 16, 8);
    fill.position.set(-2.7, 1.8, 2.5);
    scene.add(fill);
    const themeLightColor=entryTheme==="entry_water"?0x42dff5:entryTheme==="entry_fire"?0xff542e:entryTheme==="entry_millionaire"?0xfacc15:entryTheme==="entry_dance"?0xc084fc:0xef4444;
    const themeLight=new THREE.PointLight(themeLightColor,entryTheme?24:8,7,2);
    themeLight.position.set(entryTheme==="entry_water"?-.85:1.0,1.7,1.15);scene.add(themeLight);

    const skin = new THREE.MeshPhysicalMaterial({ color: canvas.dataset.skin || "#f3c9a5", roughness: 0.48, metalness: 0.02, clearcoat: 0.18 });
    const hair = new THREE.MeshPhysicalMaterial({ color: "#202635", roughness: 0.3, clearcoat: 0.48 });
    const fabric = (color, repeat = 2) => {
      const swatch = document.createElement("canvas");
      swatch.width = 128;
      swatch.height = 128;
      const ctx = swatch.getContext("2d");
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 128, 128);
      const light = ctx.createLinearGradient(0, 0, 128, 128);
      light.addColorStop(0, "rgba(255,255,255,.25)");
      light.addColorStop(0.48, "rgba(255,255,255,0)");
      light.addColorStop(1, "rgba(15,23,42,.2)");
      ctx.fillStyle = light;
      ctx.fillRect(0, 0, 128, 128);
      ctx.globalAlpha = 0.11;
      for (let x = 0; x < 128; x += 4) {
        ctx.fillStyle = x % 8 ? "#fff" : "#111827";
        ctx.fillRect(x, 0, 1, 128);
      }
      ctx.globalAlpha = 1;
      const texture = new THREE.CanvasTexture(swatch);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(repeat, repeat);
      return new THREE.MeshPhysicalMaterial({ map: texture, roughness: 0.73, clearcoat: 0.06 });
    };
    const shirt = fabric(canvas.dataset.shirt || "#c62828", 2.5);
    const pants = fabric(canvas.dataset.pants || "#334155", 2.2);
    const shoe = new THREE.MeshPhysicalMaterial({ color: canvas.dataset.shoes || "#f1f5f9", roughness: 0.36, clearcoat: 0.35 });
    const dark = new THREE.MeshStandardMaterial({ color: "#202534", roughness: 0.38 });
    const gold = new THREE.MeshStandardMaterial({ color: "#f8c735", metalness: 0.72, roughness: 0.24 });
    const white = new THREE.MeshStandardMaterial({ color: "#fffaf3", roughness: 0.24 });
    const root = new THREE.Group();
    scene.add(root);

    const sphere = (material, position, scale, parent = root, detail = 28) => {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, detail, Math.max(16, detail - 4)), material);
      mesh.position.set(...position);
      mesh.scale.set(...scale);
      parent.add(mesh);
      return mesh;
    };
    const capsule = (material, radius, length, position, parent = root) => {
      const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 8, 20), material);
      mesh.position.set(...position);
      parent.add(mesh);
      return mesh;
    };
    const animatedMaterials=[];
    const flowMaterial=(hex,style)=>{
      const material=new THREE.ShaderMaterial({
        uniforms:{uTime:{value:0},uColor:{value:new THREE.Color(hex)}},
        vertexShader:`varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
        fragmentShader:style==="water"?`varying vec2 vUv;uniform float uTime;uniform vec3 uColor;void main(){float edge=pow(max(0.0,1.0-abs(vUv.y-.5)*2.0),.55);float flow=sin(vUv.x*34.0-uTime*4.2+sin(vUv.y*13.0-uTime*1.4)*2.2);float foam=smoothstep(.48,.96,flow);float glint=pow(max(0.0,sin(vUv.x*73.0-uTime*7.0+vUv.y*9.0)),18.0);float alpha=edge*(.2+foam*.3+glint*.42);vec3 color=mix(uColor,vec3(.82,.98,1.0),foam*.68+glint*.7);gl_FragColor=vec4(color,alpha);}`:`varying vec2 vUv;uniform float uTime;uniform vec3 uColor;void main(){float edge=pow(max(0.0,1.0-abs(vUv.y-.5)*2.0),.45);float wave=sin(vUv.x*27.0-uTime*5.0+sin(vUv.y*18.0+uTime)*2.0);float veins=smoothstep(.25,.95,wave);float flare=pow(max(0.0,sin(vUv.x*51.0-uTime*8.0+vUv.y*4.0)),16.0);float alpha=edge*(.12+veins*.38+flare*.4);vec3 color=mix(uColor,vec3(1.0),flare*.65);gl_FragColor=vec4(color,alpha);}`,
        transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending
      });
      animatedMaterials.push(material);return material;
    };

    // Soft oval ground shadow and softly rounded clothes give the character depth.
    const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.62, 48), new THREE.MeshBasicMaterial({ color: 0x310b18, transparent: true, opacity: 0.22, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.018;
    root.add(shadow);

    const legs = new THREE.Group();
    root.add(legs);
    const leftLeg=new THREE.Group();leftLeg.position.set(-.19,1.04,0);legs.add(leftLeg);
    const rightLeg=new THREE.Group();rightLeg.position.set(.19,1.04,0);legs.add(rightLeg);
    capsule(pants, 0.16, 0.72, [0,-.4,0], leftLeg);
    capsule(pants, 0.16, 0.72, [0,-.4,0], rightLeg);
    sphere(shoe, [0,-.92,.11], [.22,.12,.35], leftLeg);
    sphere(shoe, [0,-.92,.11], [.22,.12,.35], rightLeg);

    capsule(shirt, 0.43, 0.61, [0, 1.55, 0], root);
    sphere(shirt, [-0.38, 1.88, 0], [0.27, 0.28, 0.31], root);
    sphere(shirt, [0.38, 1.88, 0], [0.27, 0.28, 0.31], root);
    capsule(skin, 0.105, 0.23, [0, 2.08, 0], root);

    const leftArm = new THREE.Group();
    leftArm.position.set(-0.43, 1.93, 0);
    root.add(leftArm);
    capsule(shirt, 0.135, 0.38, [-0.035, -0.22, 0], leftArm);
    capsule(skin, 0.09, 0.3, [-0.08, -0.61, 0.02], leftArm);
    sphere(skin, [-0.08, -0.8, 0.03], [0.105, 0.11, 0.1], leftArm);

    const rightArm = new THREE.Group();
    rightArm.position.set(0.43, 1.93, 0);
    root.add(rightArm);
    capsule(shirt, 0.135, 0.38, [0.035, -0.22, 0], rightArm);
    capsule(skin, 0.09, 0.3, [0.08, -0.61, 0.02], rightArm);
    sphere(skin, [0.08, -0.8, 0.03], [0.105, 0.11, 0.1], rightArm);

    // Head, sculpted hair cap, nose, bright eyes and a curved smile.
    sphere(skin, [0, 2.52, 0.015], [0.36, 0.44, 0.32]);
    sphere(skin, [-0.355, 2.5, 0], [0.09, 0.13, 0.095]);
    sphere(skin, [0.355, 2.5, 0], [0.09, 0.13, 0.095]);
    sphere(hair, [0, 2.84, -0.005], [0.385, 0.19, 0.34]);
    sphere(hair, [-0.2, 2.77, 0.08], [0.2, 0.19, 0.27]);
    sphere(hair, [0.11, 2.8, 0.09], [0.23, 0.18, 0.26]);
    sphere(dark, [-0.13, 2.54, 0.306], [0.052, 0.067, 0.027]);
    sphere(dark, [0.13, 2.54, 0.306], [0.052, 0.067, 0.027]);
    sphere(white, [-0.146, 2.565, 0.329], [0.016, 0.019, 0.009]);
    sphere(white, [0.114, 2.565, 0.329], [0.016, 0.019, 0.009]);
    sphere(skin, [0, 2.43, 0.322], [0.055, 0.07, 0.055]);
    const smilePath = new THREE.CatmullRomCurve3([new THREE.Vector3(-0.105, 2.36, 0.291), new THREE.Vector3(0, 2.335, 0.316), new THREE.Vector3(0.105, 2.36, 0.291)]);
    root.add(new THREE.Mesh(new THREE.TubeGeometry(smilePath, 16, 0.012, 8, false), dark));
    sphere(gold, [0.27, 1.64, 0.39], [0.075, 0.075, 0.025]);

    // The selected wardrobe slot is rendered directly on the 3D model.
    if (canvas.dataset.hat) {
      if (canvas.dataset.hat === "hat_crown") {
        const band = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.055, 10, 32), gold);
        band.position.set(0, 2.9, 0);
        band.rotation.x = Math.PI / 2;
        root.add(band);
        for (let i = 0; i < 5; i += 1) {
          const spike = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.2, 8), gold);
          const angle = Math.PI * (i / 4);
          spike.position.set(Math.cos(angle) * 0.24, 3.02, Math.sin(angle) * 0.12);
          root.add(spike);
        }
      } else {
        const capMat = fabric("#b91c1c", 1.5);
        const cap = new THREE.Mesh(new THREE.SphereGeometry(0.37, 32, 18, 0, Math.PI * 2, 0, Math.PI / 2), capMat);
        cap.position.set(0, 2.88, -0.015);
        root.add(cap);
        const brim = new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 12, 0, Math.PI, 0, Math.PI), capMat);
        brim.scale.set(1, 0.1, 0.56);
        brim.position.set(0, 2.84, 0.24);
        root.add(brim);
        sphere(gold, [0, 2.94, 0.35], [0.055, 0.055, 0.018]);
      }
    }
    if (canvas.dataset.eyewear) {
      const frame = new THREE.MeshStandardMaterial({ color: canvas.dataset.eyewear === "glasses_star" ? 0xf5c542 : 0x202534, metalness: 0.35, roughness: 0.3 });
      for (const x of [-0.13, 0.13]) {
        const lens = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.018, 8, 24), frame);
        lens.position.set(x, 2.54, 0.329);
        root.add(lens);
      }
      const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.018, 0.018), frame);
      bridge.position.set(0, 2.54, 0.33);
      root.add(bridge);
    }
    if (canvas.dataset.scarf) {
      const scarfMat = fabric(canvas.dataset.scarfColor || "#b91c1c", 1.5);
      const scarf = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.085, 12, 32), scarfMat);
      scarf.position.set(0, 2.1, 0);
      scarf.rotation.x = Math.PI / 2;
      root.add(scarf);
      capsule(scarfMat, 0.055, 0.27, [0.15, 1.92, 0.16], root);
    }
    if (canvas.dataset.gold === "true") {
      for (let x = -0.28; x <= 0.28; x += 0.14) sphere(gold, [x, 2.99, 0.015], [0.045, 0.085, 0.035]);
    }

    // Keep the handcrafted character as a local fallback while the rigged GLB loads.
    const stylizedFallback = new THREE.Group();
    stylizedFallback.add(...root.children);
    root.add(stylizedFallback);

    let auraRig = null;
    const auraHands=[];
    const auraId=canvas.dataset.aura;
    if(auraId){
      auraRig=new THREE.Group();
      root.add(auraRig);
      const glowColor=auraId==="aura_black"?"#a78bfa":(canvas.dataset.auraColor||"#facc15");
      const auraMaterial=flowMaterial(glowColor,"energy");
      for(let i=0;i<3;i++){
        const ring=new THREE.Mesh(new THREE.TorusGeometry(.72+i*.09,.018,8,72),auraMaterial);
        ring.position.set(0,1.45,0);ring.scale.set(1,1.9+i*.12,1);ring.rotation.y=i*Math.PI/3;auraRig.add(ring);
      }
      for(let i=0;i<16;i++){
        const spark=new THREE.Mesh(new THREE.SphereGeometry(.026+(i%3)*.009,8,6),auraMaterial);
        const angle=(i/16)*Math.PI*2;spark.position.set(Math.cos(angle)*(.72+(i%2)*.12),.25+(i%6)*.48,Math.sin(angle)*.3-.08);auraRig.add(spark);
      }
      for(const side of [-1,1]){
        const energyPath=new THREE.CatmullRomCurve3([
          new THREE.Vector3(side*.46,.28,.08),new THREE.Vector3(side*.78,.72,.18),
          new THREE.Vector3(side*.7,1.2,.32),new THREE.Vector3(side*.88,1.72,.04),
          new THREE.Vector3(side*.62,2.22,.18),new THREE.Vector3(side*.4,2.7,-.04)
        ]);
        auraRig.add(new THREE.Mesh(new THREE.TubeGeometry(energyPath,80,.038,8,false),auraMaterial));
        const handGlow=new THREE.Mesh(new THREE.SphereGeometry(.16,16,12),auraMaterial);
        handGlow.position.set(side*.59,1.23,.32);auraRig.add(handGlow);auraHands.push(handGlow);
      }
      if(auraId.includes("crown")){
        const crown=new THREE.Group();const base=new THREE.Mesh(new THREE.TorusGeometry(.27,.04,8,32),gold);base.rotation.x=Math.PI/2;crown.add(base);
        for(let i=0;i<5;i++){const spike=new THREE.Mesh(new THREE.ConeGeometry(.045,.15,6),gold);spike.position.set(-.22+i*.11,.11,0);crown.add(spike)}
        crown.position.set(0,3.16,.02);auraRig.add(crown);auraRig.userData.crown=crown;
      }
    }

    let entryRig=null;
    const waterBubbles=[];
    const fireSparks=[];
    const entryCoins=[];
    const entryId=canvas.dataset.entry;
    if(entryId){
      entryRig=new THREE.Group();root.add(entryRig);
      if(entryId==="entry_water"){
        const water=flowMaterial("#28bde8","water");
        const foam=flowMaterial("#c7f5ff","energy");
        for(const side of [-1,1]){
          const curve=new THREE.CatmullRomCurve3([
            new THREE.Vector3(side*.63,.12,-.2),new THREE.Vector3(side*1.02,.35,-.28),
            new THREE.Vector3(side*1.12,.92,-.32),new THREE.Vector3(side*.94,1.52,-.25),
            new THREE.Vector3(side*.68,2.08,-.1),new THREE.Vector3(side*.4,1.95,.16),
            new THREE.Vector3(side*.52,1.46,.42),new THREE.Vector3(side*.34,1.13,.48)
          ]);
          entryRig.add(new THREE.Mesh(new THREE.TubeGeometry(curve,120,.135,16,false),water));
          const glint=new THREE.CatmullRomCurve3(curve.getPoints(30).map((p,i)=>new THREE.Vector3(p.x,p.y+.035,p.z+.05)));
          entryRig.add(new THREE.Mesh(new THREE.TubeGeometry(glint,120,.018,8,false),foam));
        }
        const dropletMaterial=new THREE.MeshPhysicalMaterial({color:"#a5f3fc",transparent:true,opacity:.55,roughness:.04,metalness:.08,clearcoat:1,transmission:.25,thickness:.22,depthWrite:false});
        for(let i=0;i<28;i++){
          const drop=new THREE.Mesh(new THREE.SphereGeometry(.025+(i%4)*.012,12,10),dropletMaterial);
          const angle=i*2.399;drop.position.set(Math.cos(angle)*(.75+(i%3)*.11),.2+(i%9)*.31,-.12+Math.sin(angle)*.24);
          drop.scale.set(.8,1.25,.8);entryRig.add(drop);waterBubbles.push({mesh:drop,phase:i*.73,speed:.3+(i%5)*.07,baseX:drop.position.x});
        }
      }else if(entryId==="entry_fire"){
        const flame=flowMaterial("#ff6a24","energy");
        for(const side of [-1,1]){
          const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(side*.58,.12,-.16),new THREE.Vector3(side*.92,.55,-.12),new THREE.Vector3(side*.74,1.12,.08),new THREE.Vector3(side*.9,1.72,-.12),new THREE.Vector3(side*.62,2.25,.05)]);
          entryRig.add(new THREE.Mesh(new THREE.TubeGeometry(curve,100,.075,12,false),flame));
        }
        const emberMaterial=new THREE.MeshBasicMaterial({color:"#ffd391",transparent:true,opacity:.88,blending:THREE.AdditiveBlending,depthWrite:false});
        for(let i=0;i<26;i++){
          const angle=i*2.399;const spark=new THREE.Mesh(new THREE.SphereGeometry(.012+(i%4)*.006,8,8),emberMaterial);
          const x=Math.cos(angle)*(.65+(i%3)*.13),z=Math.sin(angle)*.3-.12,y=.2+(i%9)*.28;
          spark.position.set(x,y,z);entryRig.add(spark);fireSparks.push({mesh:spark,phase:i*.41,speed:.45+(i%6)*.12,x,z});
        }
      }else if(entryId==="entry_millionaire"){
        const coinMaterial=new THREE.MeshStandardMaterial({color:"#facc15",metalness:.86,roughness:.2,emissive:"#9a6700",emissiveIntensity:.22});
        for(let i=0;i<8;i++){
          const angle=i*Math.PI/4;const coin=new THREE.Mesh(new THREE.CylinderGeometry(.105,.105,.027,24),coinMaterial);
          coin.position.set(Math.cos(angle)*(.72+(i%2)*.15),.48+(i%4)*.56,Math.sin(angle)*.45);coin.rotation.x=Math.PI/2;coin.rotation.z=angle;entryRig.add(coin);entryCoins.push({mesh:coin,phase:angle,baseY:coin.position.y});
        }
      }else if(entryId==="entry_pistols"){
        const flash=new THREE.MeshBasicMaterial({color:"#fde047",transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false});
        for(const side of [-1,1]){
          const burst=new THREE.Mesh(new THREE.OctahedronGeometry(.23,1),flash);burst.position.set(side*.86,1.52,.18);entryRig.add(burst);
          const tracer=new THREE.Mesh(new THREE.TorusGeometry(.24,.012,6,28),flash);tracer.position.set(side*.88,1.52,.14);entryRig.add(tracer);
        }
      }
    }

    let pet = null;
    const petId = canvas.dataset.pet;
    if (petId) {
      pet = new THREE.Group();
      pet.position.set(0.66, 0.22, 0.3);
      pet.scale.setScalar(0.52);
      root.add(pet);
      const furColor = petId === "pet_fox" ? "#c96d2d" : petId === "pet_dragon" ? "#238f89" : petId === "pet_phoenix" ? "#c94325" : petId === "pet_cat" ? "#77717c" : "#9a704e";
      const catFur = new THREE.MeshPhysicalMaterial({ color: furColor, roughness: 0.84, clearcoat: 0.04 });
      const creamFur = new THREE.MeshStandardMaterial({ color: petId === "pet_phoenix" ? "#f5aa35" : petId === "pet_fox" ? "#fff0d8" : "#f6dfbd", roughness: 0.9 });
      const petEye = new THREE.MeshStandardMaterial({ color: "#172033", roughness: 0.2 });
      if (petId === "pet_owl" || petId === "pet_phoenix") {
        const phoenix = petId === "pet_phoenix";
        if (phoenix) {
          const birdBody = new THREE.MeshPhysicalMaterial({color:"#c94325", roughness:0.6, clearcoat:0.12});
          sphere(birdBody,[0,0.52,0],[0.25,0.38,0.24],pet);
          sphere(birdBody,[0,0.84,0.03],[0.24,0.24,0.22],pet);
          for (const side of [-1,1]) {
            const wing = sphere(new THREE.MeshStandardMaterial({color:side<0?"#e45b24":"#f18427",roughness:0.7}),[side*0.31,0.57,-0.02],[0.27,0.12,0.12],pet);
            wing.rotation.z = side*0.28;
            for (let feather=0;feather<3;feather++) sphere(gold,[side*(0.42+feather*0.04),0.43-feather*0.08,0],[0.08,0.12,0.055],pet);
          }
          for (const side of [-1,1]) { const plume=new THREE.Mesh(new THREE.ConeGeometry(0.055,0.22,6),gold); plume.position.set(side*0.11,1.08,0); plume.rotation.z=side*-0.25; pet.add(plume); }
        } else sphere(catFur, [0, 0.58, 0], [0.29, 0.38, 0.25], pet);
        sphere(creamFur, [0, 0.46, 0.19], [0.19, 0.2, 0.08], pet);
        for (const x of [-0.11, 0.11]) {
          sphere(white, [x, 0.72, 0.22], [0.11, 0.12, 0.06], pet);
          sphere(petEye, [x, 0.72, 0.28], [0.045, 0.055, 0.025], pet);
        }
        const beak = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.14, 5), gold);
        beak.position.set(0, 0.55, 0.28);
        beak.rotation.x = Math.PI / 2;
        pet.add(beak);
      } else {
        const headY = petId === "pet_dragon" ? 0.86 : 0.72;
        sphere(catFur, [0, 0.42, 0], [0.33, 0.24, 0.37], pet);
        sphere(catFur, [0, headY, 0.06], petId === "pet_fox" ? [0.3,0.26,0.27] : [0.28, 0.27, 0.25], pet);
        sphere(creamFur, [0, headY - 0.12, petId === "pet_fox" ? 0.29 : 0.25], petId === "pet_fox" ? [0.14,0.12,0.15] : [0.16, 0.11, 0.095], pet);
        for (const x of [-0.16, 0.16]) {
          if (petId === "pet_dragon") {
            const horn = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.23, 8), gold);
            horn.position.set(x, headY + 0.24, 0.03);
            horn.rotation.z = x < 0 ? 0.28 : -0.28;
            pet.add(horn);
          } else {
            const ear = new THREE.Mesh(new THREE.ConeGeometry(petId === "pet_fox" ? 0.09 : 0.105, petId === "pet_fox" ? 0.4 : 0.28, 6), catFur);
            ear.position.set(x, headY + 0.22, 0.015);
            ear.rotation.z = x < 0 ? 0.22 : -0.22;
            pet.add(ear);
          }
          sphere(petEye, [x * 0.63, headY + 0.025, 0.28], [0.036, 0.046, 0.025], pet);
        }
        const tailPath = new THREE.CatmullRomCurve3([new THREE.Vector3(0.22, 0.38, -0.15), new THREE.Vector3(0.5, 0.32, -0.28), new THREE.Vector3(0.52, 0.62, -0.32), new THREE.Vector3(0.38, 0.73, -0.29)]);
        pet.add(new THREE.Mesh(new THREE.TubeGeometry(tailPath, 20, 0.075, 10, false), catFur));
        for (const x of [-0.17, 0.17]) sphere(catFur, [x, 0.17, 0.04], [0.095, 0.2, 0.11], pet);
        if (petId === "pet_cat" || petId === "pet_fox") {
          const whiskers = new THREE.MeshStandardMaterial({color:petId === "pet_fox"?"#ead6be":"#ded9d5",roughness:0.8});
          for (const side of [-1,1]) for(let line=0;line<2;line++) {
            const path=new THREE.CatmullRomCurve3([new THREE.Vector3(side*0.08,headY-0.15-line*0.025,0.32),new THREE.Vector3(side*0.22,headY-0.13-line*0.025,0.34),new THREE.Vector3(side*0.34,headY-0.1-line*0.03,0.31)]);
            pet.add(new THREE.Mesh(new THREE.TubeGeometry(path,8,0.006,5,false),whiskers));
          }
        }
        if (petId === "pet_dragon") {
          for (const x of [-0.34, 0.34]) {
            const wing = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.48, 4), catFur);
            wing.position.set(x, 0.58, -0.12);
            wing.rotation.z = x < 0 ? 0.75 : -0.75;
            pet.add(wing);
          }
        }
      }
    }

    let importedAvatar=null;
    let importedMixer=null;
    let importedArmBones=null;
    const modelGear=new THREE.Group();
    root.add(modelGear);
    const addWearable=(geometry,material,position,scale=[1,1,1],rotation=null)=>{
      const mesh=new THREE.Mesh(geometry,material);
      mesh.position.set(...position);mesh.scale.set(...scale);
      if(rotation)mesh.rotation.set(...rotation);
      modelGear.add(mesh);return mesh;
    };
    const loadRiggedAvatar=()=>{
      const loader=new GLTFLoader();
      const modelUrl=new URL("./models/Untitled.glb",import.meta.url).href;
      loader.load(modelUrl,(gltf)=>{
        importedAvatar=gltf.scene;
        importedAvatar.updateMatrixWorld(true);
        const bounds=new THREE.Box3().setFromObject(importedAvatar);
        const size=bounds.getSize(new THREE.Vector3());
        const center=bounds.getCenter(new THREE.Vector3());
        const scale=3.05/Math.max(size.y,.001);
        importedAvatar.scale.setScalar(scale);
        importedAvatar.position.set(-center.x*scale,-bounds.min.y*scale,-center.z*scale);
        importedAvatar.traverse((object)=>{if(object.isMesh){object.castShadow=true;object.receiveShadow=true;object.frustumCulled=false;}});
        root.add(importedAvatar);
        stylizedFallback.visible=false;

        // Apply selected wardrobe pieces over the textured body without tinting its skin.
        const cloth=(color)=>new THREE.MeshPhysicalMaterial({color,roughness:.72,clearcoat:.08});
        if(canvas.dataset.shirtEquipped==="true"){
          const shirtMaterial=canvas.dataset.gold==="true"?new THREE.MeshPhysicalMaterial({color:"#d4a72c",metalness:.48,roughness:.3,clearcoat:.55}):cloth(canvas.dataset.shirt||"#c62828");
          addWearable(new THREE.SphereGeometry(1,32,24),shirtMaterial,[0,1.58,0],[.36,.5,.28]);
        }
        if(canvas.dataset.pantsEquipped==="true"){
          const pantsMaterial=cloth(canvas.dataset.pants||"#334155");
          for(const side of [-1,1])addWearable(new THREE.CapsuleGeometry(.115,.52,8,18),pantsMaterial,[side*.16,.74,0],[1,1,1]);
        }
        if(canvas.dataset.shoesEquipped==="true"){
          const shoesMaterial=cloth(canvas.dataset.shoes||"#f1f5f9");
          for(const side of [-1,1])addWearable(new THREE.SphereGeometry(1,20,14),shoesMaterial,[side*.16,.09,.12],[.2,.1,.31]);
        }
        if(canvas.dataset.hat){
          const hatMaterial=new THREE.MeshPhysicalMaterial({color:canvas.dataset.hat==="hat_crown"?"#f8c735":"#b91c1c",metalness:canvas.dataset.hat==="hat_crown"?.72:.08,roughness:.28,clearcoat:.5});
          if(canvas.dataset.hat==="hat_crown"){
            addWearable(new THREE.TorusGeometry(.31,.045,10,32),hatMaterial,[0,3.0,0],[1,1,.58],[Math.PI/2,0,0]);
            for(let i=0;i<5;i++)addWearable(new THREE.ConeGeometry(.055,.16,8),hatMaterial,[-.23+i*.115,3.09,.01]);
          }else{
            addWearable(new THREE.SphereGeometry(.36,32,18,0,Math.PI*2,0,Math.PI/2),hatMaterial,[0,2.94,0],[1,.6,1]);
            addWearable(new THREE.SphereGeometry(.34,32,12,0,Math.PI,0,Math.PI),hatMaterial,[0,2.9,.19],[1,.1,.56]);
          }
        }
        if(canvas.dataset.eyewear){
          const frame=new THREE.MeshStandardMaterial({color:canvas.dataset.eyewear==="glasses_star"?0xf5c542:0x202534,metalness:.4,roughness:.27});
          for(const x of [-.13,.13])addWearable(new THREE.TorusGeometry(.085,.018,8,24),frame,[x,2.68,.39]);
          addWearable(new THREE.BoxGeometry(.08,.018,.018),frame,[0,2.68,.4]);
        }
        if(canvas.dataset.scarf){
          const scarfMaterial=cloth(canvas.dataset.scarfColor||"#b91c1c");
          addWearable(new THREE.TorusGeometry(.25,.075,12,32),scarfMaterial,[0,2.25,0],[1,1,.7],[Math.PI/2,0,0]);
        }
        importedMixer=new THREE.AnimationMixer(importedAvatar);
        const idleClip=gltf.animations.find((clip)=>/idle|mixamo/i.test(clip.name))||gltf.animations[0];
        if(idleClip)importedMixer.clipAction(idleClip).reset().fadeIn(.25).play();
        const bone=(name)=>importedAvatar.getObjectByName(name)||importedAvatar.getObjectByName(name.replace("mixamorig:",""));
        importedArmBones={left:bone("mixamorig:LeftArm"),right:bone("mixamorig:RightArm"),hips:bone("mixamorig:Hips")};
        canvas.dataset.modelReady="true";
      },undefined,(error)=>console.warn("No se pudo cargar static/models/Untitled.glb; se conserva el avatar de respaldo.",error));
    };
    loadRiggedAvatar();

    const clock = new THREE.Clock();
    let frame = 0;
    let lastFrameAt=0;
    const animate = () => {
      frame = requestAnimationFrame((now)=>{
        if(mobileDevice&&now-lastFrameAt<33){animate();return;}
        lastFrameAt=now;
        renderFrame();
      });
    };
    const renderFrame=()=>{
      const delta=clock.getDelta();
      const t = clock.elapsedTime;
      if(importedMixer)importedMixer.update(Math.min(delta,.05));
      if(importedArmBones){
        const leftGesture=entryId==="entry_dance"?Math.sin(t*3.2)*.32:entryId==="entry_water"?-.12-Math.sin(t*1.8)*.14:entryId==="entry_millionaire"?-.1:entryId==="entry_pistols"?-.2:0;
        const rightGesture=entryId==="entry_dance"?-Math.sin(t*3.2+1)*.36:entryId==="entry_water"?.12+Math.sin(t*1.8+1)*.14:entryId==="entry_millionaire"?-.14-Math.max(0,Math.sin(t*2.2))*.2:entryId==="entry_pistols"?.2:0;
        if(importedArmBones.left)importedArmBones.left.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),leftGesture));
        if(importedArmBones.right)importedArmBones.right.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),rightGesture));
        if(canvas.dataset.arriving==="true"&&importedArmBones.hips)importedArmBones.hips.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),Math.sin(t*10)*.035));
      }
      animatedMaterials.forEach(material=>{material.uniforms.uTime.value=t;});
      root.position.y = Math.sin(t * 2.1) * 0.035;
      root.rotation.y = Math.sin(t * 0.55) * 0.16;
      rightArm.rotation.z = t % 5.6 > 4.4 ? -0.16 - Math.sin(t * 7) * 0.12 : -0.025;
      leftArm.rotation.z = Math.sin(t * 1.3) * 0.025;
      if (pet) {
        pet.position.y = 0.2 + Math.sin(t * 2.5 + 1) * 0.045;
        pet.rotation.y = Math.sin(t * 0.8) * 0.13;
        if (petId === "pet_phoenix") pet.rotation.z = Math.sin(t * 7) * 0.08;
      }
      if(auraRig){auraRig.rotation.y=t*.35;auraRig.scale.setScalar(1+Math.sin(t*2.4)*.035);if(auraRig.userData.crown)auraRig.userData.crown.position.y=3.16+Math.sin(t*2.5)*.045;auraHands.forEach((orb,i)=>orb.scale.setScalar(.78+Math.sin(t*4+i)*.34));}
      const tier=canvas.dataset.tier||"casual";
      const motionBoost=tier==="exclusivo"?1.8:tier==="bueno"?1.3:1;
      if(canvas.dataset.arriving==="true"){
        const stride=Math.sin(t*10.5);
        leftLeg.rotation.x=stride*.32;rightLeg.rotation.x=-stride*.32;
        leftArm.rotation.x=-stride*.12;rightArm.rotation.x=stride*.12;
        leftArm.rotation.z=-.08;rightArm.rotation.z=.08;
      }else{leftLeg.rotation.x=0;rightLeg.rotation.x=0;}
      if(entryRig){entryRig.rotation.y=Math.sin(t*1.4)*.1;entryRig.position.y=Math.sin(t*2.1)*.045;if(entryId==="entry_millionaire")entryRig.rotation.y=t*.42;if(entryId==="entry_pistols")entryRig.scale.setScalar(1+Math.sin(t*9)*.035);}
      waterBubbles.forEach(({mesh,phase,speed,baseX})=>{mesh.position.y=.2+((phase*.31+t*speed)%2.8);mesh.position.x=baseX+Math.sin(t*1.3+phase)*.035;mesh.rotation.z=Math.sin(t+phase)*.12;});
      fireSparks.forEach(({mesh,phase,speed,x,z})=>{mesh.position.y=.15+((phase*.33+t*speed)%2.65);mesh.position.x=x+Math.sin(t*2+phase)*.035;mesh.position.z=z;});
      entryCoins.forEach(({mesh,phase,baseY})=>{mesh.rotation.y=t*2.7+phase;mesh.position.y=baseY+Math.sin(t*2+phase)*.075;});
      if(entryId==="entry_dance"){root.rotation.z=Math.sin(t*2.3)*.075*motionBoost;leftArm.rotation.z=Math.sin(t*3.2)*.42*motionBoost;rightArm.rotation.z=-Math.sin(t*3.2+1)*.48*motionBoost;}
      else if(entryId==="entry_water"){leftArm.rotation.z=-.12-Math.sin(t*1.8)*.18*motionBoost;rightArm.rotation.z=.12+Math.sin(t*1.8+1)*.18*motionBoost;}
      else if(entryId==="entry_millionaire"){rightArm.rotation.z=-.12-Math.max(0,Math.sin(t*2.2))*.35*motionBoost;}
      else if(entryId==="entry_fire"){root.rotation.z=Math.sin(t*1.4)*.035*motionBoost;}
      else if(entryId==="entry_pistols"){leftArm.rotation.z=-.26+Math.sin(t*2.5)*.1;rightArm.rotation.z=.26+Math.sin(t*2.5+1)*.1;}
      else if(tier==="exclusivo"){rightArm.rotation.z=-.12-Math.sin(t*1.7)*.24;leftArm.rotation.z=Math.sin(t*1.7+1)*.22;}
      renderer.render(scene, camera);
      animate();
    };
    const resize = () => {
      const w = Math.max(stage.clientWidth, 1);
      const h = Math.max(stage.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    new ResizeObserver(resize).observe(stage);
    stage.classList.add("avatar-webgl-ready");
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { cancelAnimationFrame(frame); clock.stop(); }
      else if(clock.running===false) { clock.start(); lastFrameAt=0; animate(); }
    });
    if("IntersectionObserver" in window){
      const visibility=new IntersectionObserver(([entry])=>{
        if(entry.isIntersecting&&!document.hidden&&clock.running===false){clock.start();lastFrameAt=0;animate();}
        else if(!entry.isIntersecting&&clock.running){cancelAnimationFrame(frame);clock.stop();}
      },{rootMargin:"80px"});
      visibility.observe(stage);
      stage.addEventListener("DOMNodeRemoved",()=>visibility.disconnect(),{once:true});
    }
    if(!("IntersectionObserver" in window)||stage.getBoundingClientRect().top<innerHeight+80){clock.start();animate();}
  } catch (error) {
    console.warn("El avatar 3D no pudo inicializarse; se conserva la ilustración de respaldo.", error);
  }
}

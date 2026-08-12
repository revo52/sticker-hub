const STICKERS = [
  "https://i.postimg.cc/Wbm511Q2/download-(10).jpg",
  "https://i.postimg.cc/xTG611WT/download-(11).jpg",
  "https://i.postimg.cc/FsbTHH2m/download-(12).jpg",
  "https://i.postimg.cc/BQ5mnnd3/download-(13).jpg",
  "https://i.postimg.cc/8PdZzzqS/download-(14).jpg",
  "https://i.postimg.cc/Kv7088dS/download-(15).jpg",
  "https://i.postimg.cc/7Y1KZZpJ/download-(4).jpg",
  "https://i.postimg.cc/L6kx88rY/download-(5).jpg",
  "https://i.postimg.cc/4NvWxxrd/download-(6).jpg",
  "https://i.postimg.cc/zXwxGG93/download-(7).jpg",
  "https://i.postimg.cc/wT5wjjSM/download-(8).jpg",
  "https://i.postimg.cc/sDPTggtj/download-(9).jpg",
  "https://i.postimg.cc/tCdB44L1/alʿfwyt-ttsl-bk.jpg",
  "https://i.postimg.cc/c47FLLV0/bhjt-sabr.jpg",
  "https://i.postimg.cc/5N5s22Z6/ttt.jpg",
  "https://i.postimg.cc/Hs06kkfL/ʿbdt-mwtt.jpg"
];

const scene = new THREE.Scene();

scene.fog = new THREE.FogExp2(
  0x07070a,
  0.018
);

const camera = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  0.1,
  100
);

camera.position.set(0, 0, 13);


const renderer =
  new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

renderer.setSize(
  innerWidth,
  innerHeight
);

renderer.setPixelRatio(
  Math.min(devicePixelRatio, 2)
);

document
  .querySelector("#bg")
  .appendChild(renderer.domElement);


// =====================================================
// LIGHTING
// =====================================================

const ambient =
  new THREE.AmbientLight(
    0xffffff,
    1.2
  );

scene.add(ambient);


const pointA =
  new THREE.PointLight(
    0x8b5cf6,
    18,
    35
  );

pointA.position.set(
  -7,
  5,
  6
);

scene.add(pointA);


const pointB =
  new THREE.PointLight(
    0xd8ff3e,
    14,
    30
  );

pointB.position.set(
  8,
  -2,
  5
);

scene.add(pointB);


// =====================================================
// FLOATING PARTICLES
// =====================================================

const particleGeo =
  new THREE.BufferGeometry();

const particleCount = 900;

const positions =
  new Float32Array(
    particleCount * 3
  );


for (
  let i = 0;
  i < particleCount;
  i++
) {

  positions[i * 3] =
    (Math.random() - 0.5) * 35;

  positions[i * 3 + 1] =
    (Math.random() - 0.5) * 22;

  positions[i * 3 + 2] =
    (Math.random() - 0.5) * 28;
}


particleGeo.setAttribute(
  "position",

  new THREE.BufferAttribute(
    positions,
    3
  )
);


const particleMat =
  new THREE.PointsMaterial({

    color: 0xd8ff3e,

    size: 0.035,

    transparent: true,

    opacity: 0.42,

    depthWrite: false

  });


const particles =
  new THREE.Points(
    particleGeo,
    particleMat
  );

scene.add(particles);


// =====================================================
// ABSTRACT 3D RINGS
// =====================================================

const ringGroup =
  new THREE.Group();

scene.add(ringGroup);


for (let i = 0; i < 8; i++) {

  const ring =
    new THREE.Mesh(

      new THREE.TorusGeometry(
        2.4 + i * 0.42,
        0.008 + i * 0.002,
        12,
        100
      ),

      new THREE.MeshBasicMaterial({

        color:
          i % 2
            ? 0x8b5cf6
            : 0xd8ff3e,

        transparent: true,

        opacity: 0.13

      })

    );


  ring.rotation.set(

    Math.random() *
      Math.PI,

    Math.random() *
      Math.PI,

    Math.random() *
      Math.PI

  );


  ring.position.set(

    (Math.random() - 0.5) * 4,

    (Math.random() - 0.5) * 3,

    -5 - Math.random() * 3

  );


  ringGroup.add(ring);
}


// =====================================================
// 3D STICKER STACK
// =====================================================

const stack =
  document.querySelector(
    "#stickerStack"
  );

const stackData = [];


STICKERS
  .slice(0, 12)
  .forEach((url, i) => {

    const card =
      document.createElement(
        "div"
      );

    card.className =
      "sticker-card";


    card.innerHTML = `
      <img
        src="${url}"
        alt="Sticker ${i + 1}"
      >
    `;


    stack.appendChild(card);


    const angle =
      (i / 12) *
      Math.PI *
      2;


    const radius =
      125 +
      (i % 3) * 24;


    stackData.push({

      el: card,

      angle: angle,

      radius: radius,

      y:
        Math.sin(
          angle * 2
        ) * 55,

      z:
        -i * 24,

      speed:
        0.0015 +
        (i % 4) * 0.00035,

      phase:
        i * 0.7

    });

  });


// =====================================================
// GALLERY
// =====================================================

const gallery =
  document.querySelector(
    "#gallery"
  );


STICKERS.forEach(
  (url, i) => {

    const card =
      document.createElement(
        "div"
      );

    card.className =
      "g-card";


    card.innerHTML = `
      <img
        src="${url}"
        alt="Sticker ${i + 1}"
        loading="lazy"
      >

      <span>
        STICKER /
        ${String(i + 1).padStart(2, "0")}
      </span>
    `;


    gallery.appendChild(card);

  }
);


// =====================================================
// CURSOR GLOW
// =====================================================

const cursorGlow =
  document.querySelector(
    ".cursor-glow"
  );


let mx =
  innerWidth / 2;

let my =
  innerHeight / 2;


let gx = mx;
let gy = my;


addEventListener(
  "pointermove",

  (e) => {

    mx = e.clientX;

    my = e.clientY;

  },

  {
    passive: true
  }
);


// =====================================================
// SCROLL REVEAL
// =====================================================

const observer =
  new IntersectionObserver(

    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target
              .classList
              .add("show");

          }

        }
      );

    },

    {
      threshold: 0.15
    }

  );


document
  .querySelectorAll(
    ".g-card"
  )
  .forEach(
    (x) =>
      observer.observe(x)
  );


// =====================================================
// SCROLL PROGRESS
// =====================================================

let scrollP = 0;


addEventListener(
  "scroll",

  () => {

    const max =
      document.documentElement
        .scrollHeight -
      innerHeight;


    scrollP =
      max > 0
        ? scrollY / max
        : 0;

  },

  {
    passive: true
  }
);


// =====================================================
// ANIMATION
// =====================================================

function animate(t = 0) {

  requestAnimationFrame(
    animate
  );


  // ---------------------------------
  // Cursor
  // ---------------------------------

  gx +=
    (mx - gx) *
    0.08;


  gy +=
    (my - gy) *
    0.08;


  cursorGlow.style.left =
    gx + "px";


  cursorGlow.style.top =
    gy + "px";


  // ---------------------------------
  // Mouse position
  // ---------------------------------

  const px =
    mx / innerWidth -
    0.5;


  const py =
    my / innerHeight -
    0.5;


  // ---------------------------------
  // Camera
  // ---------------------------------

  camera.position.x +=
    (
      px * 1.25 -
      camera.position.x
    ) * 0.025;


  camera.position.y +=
    (
      -py * 0.7 -
      camera.position.y
    ) * 0.025;


  camera.lookAt(
    0,
    0,
    -4
  );


  // ---------------------------------
  // Particles
  // ---------------------------------

  particles.rotation.y +=
    0.00025;


  particles.rotation.x =
    Math.sin(
      t * 0.00008
    ) * 0.08;


  // ---------------------------------
  // 3D Rings
  // ---------------------------------

  ringGroup.rotation.y +=
    0.00045;


  ringGroup.rotation.x =
    Math.sin(
      t * 0.0002
    ) * 0.12;


  ringGroup.position.x +=
    (
      px * 1.2 -
      ringGroup.position.x
    ) * 0.015;


  ringGroup.position.y +=
    (
      -py * 0.8 -
      ringGroup.position.y
    ) * 0.015;


  // ---------------------------------
  // Sticker movement
  // ---------------------------------

  stackData.forEach(
    (d, i) => {

      const a =
        d.angle +
        t * d.speed +
        scrollP *
          (
            i % 2
              ? -0.9
              : 0.9
          );


      const x =
        Math.cos(a) *
        d.radius;


      const y =
        d.y +
        Math.sin(
          t * 0.0012 +
          d.phase
        ) * 22;


      const z =
        d.z +
        Math.sin(a * 2) *
        20;


      d.el.style.transform =

        `translate3d(
          calc(-50% + ${x}px),
          calc(-50% + ${y}px),
          ${z}px
        )
        rotateZ(
          ${Math.sin(a) * 8}deg
        )
        rotateY(
          ${Math.cos(a) * 10}deg
        )`;


      d.el.style.zIndex =
        String(100 - i);

    });


  // ---------------------------------
  // Render
  // ---------------------------------

  renderer.render(
    scene,
    camera
  );

}


animate();


// =====================================================
-- // RESIZE
// =====================================================

addEventListener(
  "resize",

  () => {

    camera.aspect =
      innerWidth /
      innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
      innerWidth,
      innerHeight
    );


    renderer.setPixelRatio(
      Math.min(
        devicePixelRatio,
        2
      )
    );

  }
);
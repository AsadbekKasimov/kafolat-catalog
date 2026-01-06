const container = document.getElementById("book-container");
const flipSound = document.getElementById("flipSound");
const clickSound = document.getElementById("clickSound");
const indicator = document.getElementById("pageIndicator");

/* PageFlip — ВСЕГДА 2 страницы */
const pageFlip = new St.PageFlip(container, {
  width: 1200,
  height: 1200,
  size: "fixed",
  showCover: true,
  maxShadowOpacity: 0.5,
  mobileScrollSupport: false,
  useMouseEvents: true
});

/* Загрузка страниц */
const totalPages = 60;
const pages = [];

for (let i = 1; i <= totalPages; i++) {
  pages.push(`pages/${String(i).padStart(2, "0")}.jpg`);
}

pageFlip.loadFromImages(pages);

/* Звук перелистывания + индикатор */
pageFlip.on("changeState", (e) => {
  if (e.data === "flipping") {
    flipSound.currentTime = 0;
    flipSound.play().catch(() => {});
    updateIndicator();
  }
});


/* Индикатор страниц */
function updateIndicator() {
  const current = pageFlip.getCurrentPageIndex() + 1;
  indicator.textContent = `${current} / ${totalPages}`;
}

/* Клик-звук */
function clickFx() {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}
document.getElementById("prevBtn").onclick = () => {
  clickFx();
  pageFlip.flipPrev();
};

document.getElementById("nextBtn").onclick = () => {
  clickFx();
  pageFlip.flipNext();
};



/* Fullscreen */
document.getElementById("fsBtn").onclick = () => {
  clickFx();
  if (!document.fullscreenElement) {
    container.requestFullscreen({ navigationUI: "hide" });
  } else {
    document.exitFullscreen();
  }
};

/* Масштаб — уменьшено ~25% */
function resizeBook() {
  const scale = Math.min(
    window.innerWidth / 1200,
    window.innerHeight / 1200
  ) * 0.75;

  container.style.transform = `scale(${scale})`;
}

window.addEventListener("resize", resizeBook);
resizeBook();

/* Автоскрытие нижнего меню */
const bar = document.getElementById("bottomBar");
let hideTimer;

function showBar() {
  bar.classList.remove("hidden");
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    bar.classList.add("hidden");
  }, 3000);
}

["mousemove", "click", "touchstart"].forEach(event => {
  document.addEventListener(event, showBar);
});

showBar();

const container = document.getElementById("book-container");
const sound = document.getElementById("flipSound");

const pageFlip = new St.PageFlip(container, {
  width: 1200,
  height: 1200,
  size: "fixed",
  showCover: true,         
  maxShadowOpacity: 0.5,
  mobileScrollSupport: true
});

// загружаем 60 страниц
const pages = [];
for (let i = 1; i <= 60; i++) {
  pages.push(`pages/${String(i).padStart(2, "0")}.jpg`);
}

pageFlip.loadFromImages(pages);

// звук перелистывания
pageFlip.on("flip", () => {
  sound.currentTime = 0;
  sound.play().catch(() => {});
});

// кнопки
document.getElementById("prevBtn").onclick = () => pageFlip.flipPrev();
document.getElementById("nextBtn").onclick = () => pageFlip.flipNext();

// fullscreen
document.getElementById("fsBtn").onclick = () => {
  if (!document.fullscreenElement) {
    container.requestFullscreen({ navigationUI: "hide" });
  } else {
    document.exitFullscreen();
  }
};

// оглавление
const toc = document.getElementById("toc");
document.getElementById("tocBtn").onclick = () => {
  toc.classList.toggle("hidden");
};

toc.querySelectorAll("li").forEach(item => {
  item.onclick = () => {
    pageFlip.flip(+item.dataset.page);
    toc.classList.add("hidden");
  };
});

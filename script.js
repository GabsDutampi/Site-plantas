// Menu hamburguer (celular)
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
  const aberto = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", aberto ? "true" : "false");
});

// fecha o menu ao clicar em um link
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// Imagens: se uma foto nao existir na pasta images, ela some em vez de mostrar imagem quebrada
function atualizarGaleria() {
  document.querySelectorAll("[data-galeria]").forEach((bloco) => {
    bloco.hidden = !bloco.querySelector(".foto:not([hidden])");
  });
}

document.querySelectorAll(".foto img").forEach((img) => {
  const esconder = () => {
    img.closest(".foto").hidden = true;
    atualizarGaleria();
  };
  img.addEventListener("error", esconder);
  if (img.complete && img.naturalWidth === 0) esconder();
});

window.addEventListener("load", atualizarGaleria);

// Video: se o arquivo videos/divulgacao.mp4 ainda nao existir, a secao e o link do menu ficam escondidos
const secaoVideo = document.querySelector("[data-video-secao]");
const fonteVideo = document.querySelector("[data-video-secao] source");

function esconderVideo() {
  if (secaoVideo) secaoVideo.hidden = true;
  const linkVideo = document.querySelector('.nav a[href="#video"]');
  if (linkVideo) linkVideo.hidden = true;
}

if (fonteVideo) fonteVideo.addEventListener("error", esconderVideo);

// Garantia extra: se o navegador nao achou nenhum arquivo de video, esconde a secao
const videoEl = secaoVideo ? secaoVideo.querySelector("video") : null;
window.addEventListener("load", () => {
  setTimeout(() => {
    if (videoEl && videoEl.networkState === 3) esconderVideo();
  }, 300);
});

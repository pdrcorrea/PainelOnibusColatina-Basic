/* pv-footer.js — Rodapé unificado PontoView
   Logo à direita (TV) → centralizada em telas menores
   Day/Night + animação sutil
*/
(function () {
  const LOGO = "./assets/logo-pontoview.png";

  const css = `
    .pvFooter{
      display:flex;
      align-items:center;
      justify-content:flex-end; /* direita por padrão */
      padding:12px 18px;
      border-top:1px solid var(--line, rgba(0,0,0,.12));
      background: transparent;
    }

    .pvFooterBrand{
      display:flex;
      align-items:center;
    }

    .pvFooterBrand img{
      height:22px;
      width:auto;
      transition: opacity .35s ease, transform .35s ease;
    }

    /* animação sutil de entrada */
    .pvEnter{
      animation: pvEnter .35s ease-out both;
    }
    @keyframes pvEnter{
      from{ opacity:0; transform: translateY(6px); }
      to{ opacity:1; transform:none; }
    }

    /* telas menores: centraliza */
    @media (max-width: 900px){
      .pvFooter{
        justify-content:center;
      }
    }

    @media (prefers-reduced-motion: reduce){
      .pvEnter{ animation:none !important; }
    }
  `;

  function isNight(){
    const h = new Date().getHours();
    return h >= 19 || h < 7;
  }

  function applyOpacity(img){
    img.style.opacity = isNight() ? "0.60" : "0.85";
  }

  /* injeta CSS uma vez */
  if (!document.getElementById("pvFooterStyles")) {
    const style = document.createElement("style");
    style.id = "pvFooterStyles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* garante container */
  let footer = document.querySelector(".pvFooter");
  if (!footer) {
    footer = document.createElement("div");
    footer.className = "pvFooter";
    document.body.appendChild(footer);
  }

  footer.innerHTML = `
    <div class="pvFooterBrand">
      <img id="pvLogo" src="${LOGO}" alt="PontoView">
    </div>
  `;

  /* animação */
  footer.classList.add("pvEnter");
  setTimeout(() => footer.classList.remove("pvEnter"), 700);

  /* opacidade day/night */
  const img = document.getElementById("pvLogo");
  applyOpacity(img);
  setInterval(() => applyOpacity(img), 60 * 1000);
})();

/* ZARZUR website kit — primitives, header, footer. */
import React from "react";

const A = "assets/";

/* WhatsApp principal (ES) + helpers de conversão */
const WA_NUMBER = "5527999734394";
function waLink(msg) {
  const t = msg || "Olá! Vim pelo site da ZARZUR e quero falar com um especialista.";
  return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(t);
}
/* dispara evento para GA4 (gtag) e Meta Pixel (fbq) quando configurados */
function zzTrack(event, params) {
  try {
    if (window.gtag) window.gtag("event", event, params || {});
    if (window.fbq) {
      window.fbq("trackCustom", event, params || {});
      if (event === "whatsapp_click") window.fbq("track", "Lead", params || {});
    }
  } catch (e) {}
}
function waOpen(msg, evtParams) {
  zzTrack("whatsapp_click", evtParams || {});
  window.open(waLink(msg), "_blank", "noopener");
}

function IMG(name) {
  return A + name;
}

function Lu({ name, className }) {
  return <i data-lucide={name} className={"lu " + (className || "")}></i>;
}

/* Real 3D spinning coin */
function Coin3D({ size = 340, spin = 22, className = "" }) {
  const R = Math.round(size * 0.484);
  const T = Math.max(14, Math.round(size * 0.074));
  const N = Math.max(120, Math.round(size * 0.62));
  const segW = (2 * Math.PI * R) / N + 1.3;
  const half = T / 2;
  const segs = Array.from({ length: N }, (_, i) => {
    const a = (360 / N) * i;
    return <span key={i} style={{
      width: segW.toFixed(2) + "px", height: T + "px",
      marginTop: (-half) + "px", marginLeft: (-segW / 2).toFixed(2) + "px",
      transform: `rotateZ(${a}deg) translateY(${-R}px) rotateX(90deg)`,
    }} />;
  });
  return (
    <div className={"zzc-coin3d " + className} style={{ width: size, height: size, "--spin": spin + "s" }} aria-label="Selo ZARZUR Soluções Financeiras" role="img">
      <div className="zzc-coin3d-stage">
        <div className="zzc-coin3d-inner">
          <div className="zzc-coin-edge">{segs}</div>
          <img className="zzc-coin-face front" src={IMG("coin-disc.png")} alt="" style={{ transform: `translateZ(${half}px)` }} />
          <img className="zzc-coin-face back" src={IMG("coin-disc.png")} alt="" style={{ transform: `rotateY(180deg) translateZ(${half}px)` }} />
        </div>
      </div>
      <span className="zzc-coin-shadow"></span>
    </div>
  );
}

function Btn({ variant = "gold", size, icon, children, onClick, href }) {
  const cls = `zzc-btn zzc-btn-${variant}${size ? " zzc-btn-" + size : ""}`;
  const inner = (<>{children}{icon && <Lu name={icon} />}</>);
  if (href) return <a className={cls} href={href} onClick={onClick}>{inner}</a>;
  return <button className={cls} onClick={onClick}>{inner}</button>;
}

const NAV = [
  ["Soluções", "#solucoes"],
  ["Como funciona", "#como-funciona"],
  ["Calculadora", "#calculadora"],
  ["A ZARZUR", "#sobre"],
  ["Blog", "/blog"],
  ["Dúvidas", "#faq"],
];

function Header({ solid, onSimulate }) {
  const [open, setOpen] = React.useState(false);
  return (
    <header className={"zzc-header " + (solid ? "solid" : "float")}>
      <div className="zzc-container zzc-headrow">
        <a href="#topo" aria-label="ZARZUR">
          <img className="zzc-logo" src={IMG("marca-horizontal.svg")} alt="ZARZUR Soluções Financeiras" />
          <img className="zzc-logo rev" src={IMG("marca-horizontal-white.svg")} alt="ZARZUR" />
        </a>
        <nav className="zzc-nav">
          {NAV.map(([t, h]) => <a key={t} href={h}>{t}</a>)}
        </nav>
        <Btn variant="ghost" size="sm" onClick={onSimulate}>
          <span className="zzc-headcta">Fale com um especialista</span>
        </Btn>
        <button className="zzc-burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <Lu name={open ? "x" : "menu"} />
        </button>
      </div>
      <div className={"zzc-mobile" + (open ? " open" : "")} onClick={() => setOpen(false)}>
        {NAV.map(([t, h]) => <a key={t} href={h}>{t}</a>)}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="zzc-footer" id="rodape">
      <div className="zzc-container">
        <div className="zzc-foot-grid">
          <div className="zzc-foot-brand">
            <img className="zzc-foot-logo" src={IMG("marca-vertical-white.svg")} alt="ZARZUR" />
            <p>Soluções financeiras para condomínios: garantia de receita, antecipação de inadimplência, crédito para obras e compra de dívida. Tudo com lastro e contrato por trás.</p>
            <div className="zzc-foot-soc">
              {/* ✏️ EDITAR: redes sociais */}
              <a href="https://instagram.com/zarzurgarantidora" target="_blank" rel="noopener" aria-label="Instagram"><img src={IMG("social-icon-3.png")} alt="Instagram" /></a>
              <a href="#" aria-label="LinkedIn (em breve)"><img src={IMG("social-icon-2.png")} alt="LinkedIn" /></a>
              <a href="#" aria-label="Facebook (em breve)"><img src={IMG("social-icon-4.png")} alt="Facebook" /></a>
            </div>
          </div>
          <div className="zzc-foot-col">
            <h5>Soluções</h5>
            <a href="/garantidora">Garantidora de Condomínio</a>
            <a href="/compra-garantida">Compra Garantida</a>
            <a href="/emprestimo">Empréstimo p/ Condomínios</a>
            <a href="/compra-de-divida">Compra de Dívida Antiga</a>
          </div>
          <div className="zzc-foot-col">
            <h5>A empresa</h5>
            <a href="#sobre">Sobre a ZARZUR</a>
            <a href="#seguranca">Como garantimos</a>
            <a href="/blog">Blog</a>
            <a href="#faq">Dúvidas frequentes</a>
          </div>
          <div className="zzc-foot-col">
            <h5>Atendimento</h5>
            {/* ✏️ EDITAR: telefones dos escritórios */}
            <a href="tel:+5511978947653">São Paulo · +55 11 97894-7653</a>
            <a href="tel:+5527999734394">Espírito Santo · +55 27 99973-4394</a>
            <a href="#contato">Fale conosco</a>
          </div>
        </div>
        <div className="zzc-foot-bottom">
          <span>© 2026 ZARZUR Soluções Financeiras. Todos os direitos reservados.</span>
          <span>CNPJ 62.716.775/0001-15</span>
        </div>
      </div>
    </footer>
  );
}

export { A, WA_NUMBER, waLink, zzTrack, waOpen, IMG, Lu, Coin3D, Btn, Header, Footer };

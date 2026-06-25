/* ZARZUR website kit — page sections */
import React from "react";
import { Lu, Btn, IMG, A, waLink, waOpen, zzTrack, WA_NUMBER } from "./kit.jsx";

function Hero({ onSimulate }) {
  return (
    <section className="zzc-hero" id="topo">
      <img className="zzc-hero-mark" src={IMG("symbol-white.svg")} alt="" aria-hidden="true" />
      <div className="zzc-container zzc-hero-inner">
        <p className="zzc-hero-eyebrow">Soluções financeiras para condomínios</p>
        <h1 className="zzc-hero-title">O seu condomínio recebe todo mês, <em>no dia certo.</em></h1>
        <p className="zzc-hero-sub">A ZARZUR assume a inadimplência do seu condomínio e garante a arrecadação antes mesmo de vencer. Você fecha o caixa sem depender de quem pagou ou deixou de pagar.</p>
        <div className="zzc-hero-actions">
          <Btn variant="gold" icon="message-circle" onClick={() => waOpen("Olá! Vim pelo site da ZARZUR e quero falar com um especialista.", { origem: "hero" })}>Falar com um especialista</Btn>
          <a className="zzc-hero-link" href="#calculadora">Calcular minha perda <Lu name="arrow-down" /></a>
        </div>
      </div>
      <div className="zzc-container zzc-hero-note-wrap">
        <a className="zzc-hero-note" href="/emprestimo" onClick={() => zzTrack("intent_click", { intent: "emprestimo_hero" })}>
          <span className="k">Também</span>
          <span className="t"><b>Empréstimo para obras sem garantia real do condomínio.</b> Sem hipoteca, sem aval, com aprovação em até 7 dias.</span>
          <Lu name="arrow-right" />
        </a>
      </div>
    </section>
  );
}

/* ✏️ EDITAR: números de impacto */
const STATS = [
  ["100", "%", "de repasse antes de vencer"],
  ["+50", "", "condomínios em operação"],
  ["+R$ 20", "mi", "em obras financiadas"],
  ["7", "dias", "para liberar o crédito"],
];
function Trust() {
  return (
    <section className="zzc-trust">
      <div className="zzc-container zzc-trust-grid">
        {STATS.map(([a, b, c]) => (
          <div className="zzc-stat" key={c}>
            <div className="num">{a}<span>{b}</span></div>
            <div className="cap">{c}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ✏️ EDITAR: serviços — [ícone-lucide, título, descrição] */
const SERVICES = [
  ["hand-coins", "Garantidora de Condomínio", "A ZARZUR assume a inadimplência futura do condomínio e deposita 100% da arrecadação um dia antes do vencimento (D-1), não importa quem pagou. A cobrança dos moradores fica por nossa conta.", "/garantidora"],
  ["piggy-bank", "Empréstimo para Condomínios", "Crédito de R$ 30 mil a R$ 20 milhões para obras. Aprovação em até 7 dias, prazo de até 60 meses, sem garantia real e sem aval dos condôminos.", "/emprestimo"],
  ["calendar-check", "Compra Garantida de Inadimplência", "No fim do mês, a ZARZUR cobre a inadimplência que faltou. Você fecha o caixa completo por uma taxa menor que a da Garantidora.", "/compra-garantida"],
  ["archive", "Compra de Dívida Antiga", "A ZARZUR compra à vista a inadimplência acumulada do condomínio. O balanço fica limpo e o síndico elimina o passivo de uma vez.", "/compra-de-divida"],
];
function Services() {
  return (
    <section className="zzc-section zzc-services" id="solucoes">
      <div className="zzc-container">
        <div className="zzc-services-head">
          <p className="zzc-eyebrow">As soluções</p>
          <h2 className="zzc-h2">Quatro caminhos para o condomínio receber sempre.</h2>
          <p className="zzc-lead">Cada uma resolve um problema diferente do caixa do condomínio. Veja qual encaixa no seu ou fale com um especialista.</p>
        </div>
        <div className="zzc-serv-grid">
          {SERVICES.map(([ic, t, d, href], i) => (
            <a className="zzc-serv" href={href} key={t} onClick={() => zzTrack("service_click", { servico: t })}>
              <div className="zzc-serv-head">
                <span className="zzc-serv-ic"><Lu name={ic} /></span>
                <span className="zzc-serv-idx">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3>{t}</h3>
              <p>{d}</p>
              <span className="zzc-serv-link">Saiba mais <Lu name="arrow-right" /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function brl0(n) {
  return n.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
}

/* ✏️ EDITAR: opções de finalidade de obra */
const PURPOSES = [
  "Reforma de fachada", "Pintura predial", "Troca de telhado / impermeabilização",
  "Área de lazer / academia", "Modernização de elevadores", "Portaria e segurança",
  "Obra emergencial", "Outra finalidade",
];

function Cotacao() {
  const [amount, setAmount]   = React.useState(500000);
  const [purpose, setPurpose] = React.useState("");
  const [nome, setNome]       = React.useState("");
  const [email, setEmail]     = React.useState("");
  const [cond, setCond]       = React.useState("");
  const [detalhe, setDetalhe] = React.useState("");
  const [status, setStatus]   = React.useState("idle"); // idle | loading | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    const msg =
      "Olá! Quero um orçamento de crédito para obra.\n" +
      "• Valor desejado: R$ " + brl0(amount) + "\n" +
      (purpose ? "• Finalidade: " + purpose + "\n" : "") +
      (detalhe ? "• Detalhe: " + detalhe + "\n" : "") +
      "• Nome: " + (nome || "(não informado)") + "\n" +
      (cond ? "• Condomínio: " + cond + "\n" : "") +
      (email ? "• E-mail: " + email : "");
    waOpen(msg, { tipo: "orcamento_obra", valor: amount });
    setStatus("sent");
  }

  return (
    <section className="zzc-section alt" id="cotacao">
      <div className="zzc-container zzc-sim-grid">
        <div className="zzc-sim-copy">
          <p className="zzc-eyebrow">Crédito para obra</p>
          <h2>Diga quanto precisa.<br/>Receba a proposta no WhatsApp.</h2>
          <p className="zzc-lead">Informe o valor e a finalidade da obra. Um especialista analisa o caso e <b>retorna pelo WhatsApp</b> com uma proposta sob medida, sem compromisso.</p>
          <ul className="zzc-sim-points">
            <li><Lu name="zap" />Aprovação em até 7 dias úteis.</li>
            <li><Lu name="sliders-horizontal" />Sem garantia real e sem aval dos condôminos.</li>
            <li><Lu name="shield-check" />Análise gratuita e sem compromisso.</li>
          </ul>
        </div>
        <div className="zzc-sim-card">
          {status === "sent" ? (
            <div className="zzc-sent zzc-quote-sent">
              <div className="zzc-sent-ico"><Lu name="message-circle" /></div>
              <h3 className="zzc-modal-title">Abrindo o WhatsApp…</h3>
              <p className="zzc-modal-sub">Montamos sua mensagem com o pedido de <b>R$ {brl0(amount)}</b>{purpose ? <> para <b>{purpose.toLowerCase()}</b></> : null}. Se não abrir, <a href={waLink("Olá! Quero um orçamento de crédito para obra de R$ " + brl0(amount) + (purpose ? " para " + purpose.toLowerCase() : "") + ".")} target="_blank" rel="noopener" style={{ color: "var(--zz-green)", textDecoration: "underline" }}>toque aqui</a>.</p>
              <Btn variant="ghost" onClick={() => setStatus("idle")}>Fazer outra simulação</Btn>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="top"><img src={IMG("symbol.svg")} alt="" /><span>SOLICITAÇÃO DE ORÇAMENTO</span></div>
              <div className="zzc-field">
                <div className="lbl"><span>Valor desejado</span><b>R$ {brl0(amount)}</b></div>
                {/* ✏️ EDITAR: min/max do slider e labels */}
                <input className="zzc-range" type="range" min="30000" max="20000000" step="10000" value={amount} onInput={e => setAmount(+e.target.value)} />
                <div className="zzc-range-ends"><span>R$ 30 mil</span><span>R$ 20 mi</span></div>
              </div>
              <label className="zzc-flbl">Finalidade da obra</label>
              <select className="zzc-minput" value={purpose} onChange={e => setPurpose(e.target.value)} required>
                <option value="" disabled>Selecione a finalidade</option>
                {PURPOSES.map(p => <option key={p}>{p}</option>)}
              </select>
              <textarea className="zzc-minput" rows="2" placeholder="Detalhe a obra (opcional): escopo, urgência, nº de unidades…"
                value={detalhe} onChange={e => setDetalhe(e.target.value)} />
              <div className="zzc-quote-row">
                <input className="zzc-minput" placeholder="Seu nome" required value={nome} onChange={e => setNome(e.target.value)} />
                <input className="zzc-minput" placeholder="Condomínio (opcional)" value={cond} onChange={e => setCond(e.target.value)} />
              </div>
              <Btn variant="green" icon="message-circle">
                Receber proposta no WhatsApp
              </Btn>
              <p className="zzc-quote-fine">Estimativa sem compromisso, sujeita a análise. Abrimos o WhatsApp com sua mensagem pronta.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="zzc-section" id="sobre">
      <div className="zzc-container zzc-about-solo">
        <p className="zzc-eyebrow center">A ZARZUR</p>
        {/* ✏️ EDITAR: texto sobre a empresa */}
        <h2 className="zzc-h2">Raízes profundas, gestão tranquila.</h2>
        <p>O cedro do nosso símbolo cresce devagar e dura gerações. Enxergamos o condomínio do mesmo jeito: um patrimônio que se mantém de pé quando tem previsibilidade no caixa e cuidado de quem entende do assunto.</p>
        <p>A ZARZUR cuida da parte financeira para o síndico administrar sem o peso da inadimplência. Tratamos o caixa do seu condomínio com o mesmo cuidado que teríamos com o próprio.</p>
        <div className="zzc-about-sign">
          <img src={IMG("symbol.svg")} alt="" />
          <div><b>ZARZUR Soluções Financeiras</b>Solidez que se constrói com o tempo.</div>
        </div>
      </div>
    </section>
  );
}

function CtaBand({ onSimulate }) {
  return (
    <section className="zzc-cta">
      <img className="zzc-cta-wm" src={IMG("symbol.svg")} alt="" />
      <div className="zzc-container">
        <h2>Descubra quanto a inadimplência custa ao seu condomínio.</h2>
        <p>Receba uma análise gratuita e sem compromisso. Um especialista mostra, em números, quanto o seu condomínio deixa de receber por ano e como passar a receber tudo no dia certo.</p>
        <Btn variant="gold" icon="message-circle" onClick={() => waOpen("Olá! Quero uma análise gratuita da inadimplência do meu condomínio.", { origem: "cta_band" })}>Receber análise gratuita</Btn>
      </div>
    </section>
  );
}

/* Roteador de intenção — leva o síndico direto para a solução da dor dele */
const INTENTS = [
  ["shield-check", "Quero garantir a receita", "Receba 100% no dia certo, mesmo com inadimplência.", "/garantidora"],
  ["hard-hat", "Preciso de crédito para obra", "R$ 30 mil a R$ 20 mi, aprovação em 7 dias, sem aval.", "/emprestimo"],
  ["eraser", "Tenho dívida acumulada", "Vendemos à vista a inadimplência antiga e limpamos o balanço.", "/compra-de-divida"],
];
function IntentRouter() {
  return (
    <section className="zzc-intent" id="comecar">
      <div className="zzc-container">
        <div className="zzc-section-head center">
          <p className="zzc-eyebrow center">Por onde começar</p>
          <h2 className="zzc-h2">Qual é a dor do seu condomínio hoje?</h2>
        </div>
        <div className="zzc-intent-grid">
          {INTENTS.map(([ic, t, d, href]) => (
            <a className="zzc-intent-card" href={href} key={t} onClick={() => zzTrack("intent_click", { intent: t })}>
              <h3>{t}</h3>
              <p>{d}</p>
              <span className="zzc-intent-go">Ver solução <Lu name="arrow-right" /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Calculadora — quanto a inadimplência custa por ano (ímã de lead + prova) */
function Calculadora() {
  const [unidades, setUnidades] = React.useState(60);
  const [cota, setCota]         = React.useState(600);
  const [taxa, setTaxa]         = React.useState(12);

  const arrecadacao = unidades * cota;
  const perdaMes    = arrecadacao * (taxa / 100);
  const perdaAno    = perdaMes * 12;

  const msg =
    "Olá! Simulei no site e meu condomínio deixa de receber cerca de R$ " + brl0(perdaMes) +
    " por mês (R$ " + brl0(perdaAno) + " por ano) com " + taxa + "% de inadimplência. " +
    "Quero uma análise gratuita.";

  return (
    <section className="zzc-calc" id="calculadora">
      <div className="zzc-container zzc-calc-grid">
        <div className="zzc-calc-copy">
          <p className="zzc-eyebrow on-green">Calculadora de inadimplência</p>
          <h2>Quanto o seu condomínio<br/>deixa de receber?</h2>
          <p>Ajuste os números do seu condomínio e veja, na hora, quanto a inadimplência tira do caixa todo ano. Com a Garantidora ZARZUR, esse valor entra integralmente um dia antes do vencimento (D-1).</p>

          <div className="zzc-calc-field">
            <div className="lbl"><span>Unidades no condomínio</span><b>{unidades}</b></div>
            <input className="zzc-range" type="range" min="8" max="500" step="1" value={unidades} onInput={e => setUnidades(+e.target.value)} />
          </div>
          <div className="zzc-calc-field">
            <div className="lbl"><span>Cota mensal média</span><b>R$ {brl0(cota)}</b></div>
            <input className="zzc-range" type="range" min="150" max="3000" step="10" value={cota} onInput={e => setCota(+e.target.value)} />
          </div>
          <div className="zzc-calc-field">
            <div className="lbl"><span>Inadimplência atual</span><b>{taxa}%</b></div>
            <input className="zzc-range" type="range" min="1" max="40" step="1" value={taxa} onInput={e => setTaxa(+e.target.value)} />
          </div>
        </div>

        <div className="zzc-calc-result">
          <span className="zzc-calc-tag">Sua perda estimada</span>
          <div className="zzc-calc-big">
            <span className="cur">R$</span>{brl0(perdaAno)}
            <span className="per">por ano</span>
          </div>
          <div className="zzc-calc-sub">
            <div><b>R$ {brl0(perdaMes)}</b><span>por mês</span></div>
            <div><b>R$ {brl0(arrecadacao)}</b><span>arrecadação/mês</span></div>
          </div>
          <p className="zzc-calc-note">Com a Garantidora, o condomínio recebe <b>100% da arrecadação</b> um dia antes do vencimento (D-1) e a ZARZUR assume a cobrança dos moradores.</p>
          <Btn variant="gold" icon="message-circle" onClick={() => waOpen(msg, { origem: "calculadora", perda_ano: Math.round(perdaAno) })}>Receber análise gratuita</Btn>
          <p className="zzc-calc-fine">Estimativa ilustrativa, baseada nos valores informados. Não constitui proposta.</p>
        </div>
      </div>
    </section>
  );
}


export { Hero, Trust, Services, Cotacao, About, CtaBand, IntentRouter, Calculadora };

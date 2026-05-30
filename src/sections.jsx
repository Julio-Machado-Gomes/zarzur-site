/* ZARZUR website kit — page sections */

function Hero({ onSimulate }) {
  return (
    <section className="zzc-hero" id="topo">
      <img className="zzc-hero-wm" src={IMG("symbol.svg")} alt="" />
      <div className="zzc-container zzc-hero-grid">
        <div>
          {/* ✏️ EDITAR: texto do hero */}
          <p className="zzc-eyebrow on-green">Soluções Financeiras para Condomínios</p>
          <h1>Inadimplência <em>zero</em> e tranquilidade para o seu condomínio.</h1>
          <p>Garantimos a receita do condomínio, financiamos obras e cuidamos da parte jurídica — para o síndico focar na gestão, sem dor de cabeça.</p>
          <div className="zzc-hero-cta">
            <Btn variant="gold" icon="arrow-right" href="#solucoes">Conheça as soluções</Btn>
            <Btn variant="ghost-white" onClick={onSimulate}>Fale com um especialista</Btn>
          </div>
          <div className="zzc-hero-tags">
            <span className="zzc-hero-tag"><Lu name="shield-check" />Garantia de receita</span>
            <span className="zzc-hero-tag"><Lu name="building-2" />Foco em condomínios</span>
            <span className="zzc-hero-tag"><Lu name="scale" />Suporte jurídico</span>
          </div>
        </div>
        <Coin3D size={360} spin={24} />
      </div>
    </section>
  );
}

/* ✏️ EDITAR: números de impacto */
const STATS = [
  ["100", "%", "da receita garantida"],
  ["+50", "", "condomínios atendidos"],
  ["+R$ 20", "mi", "em obras financiadas"],
  ["60", "meses", "de prazo para obras"],
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
  ["hand-coins", "Garantia de Receita", "Garantia de inadimplência zero, cobrança eficaz e tranquilidade financeira para o síndico focar na gestão."],
  ["piggy-bank", "Linha de Financiamento", "Financiamento desburocratizado para condomínios: realize obras com prazos de até 60 meses e valorize a sua propriedade."],
  ["scale", "Assessoria Jurídica", "Assessoria jurídica completa para síndicos e proprietários, reduzindo custos e minimizando riscos em locações e gestão."],
  ["file-text", "Atualização de Convenção de Condomínio", "Atualização de normas condominiais essenciais, evitando conflitos judiciais e assegurando convivência justa e alinhada às leis."],
  ["gavel", "Tribunal Arbitral", "Tribunal Arbitral especializado resolve conflitos condominiais rapidamente, com menor custo e sem necessidade de advogado."],
  ["file-search", "Auditoria Externa", "Análise das contas condominiais para reduzir despesas e implementar soluções tecnológicas personalizadas para cada condomínio."],
];
function Services() {
  return (
    <section className="zzc-section" id="solucoes">
      <div className="zzc-container">
        <div className="zzc-section-head center">
          <h2 className="zzc-serv-title">Conheçam Nossos Serviços</h2>
          <span className="zzc-divider"><i></i><i></i><i></i><b></b></span>
          <p className="zzc-lead" style={{ margin: "0 auto" }}>Conheça nossos serviços pensados para eliminar a inadimplência e facilitar a administração do seu imóvel.</p>
        </div>
        <div className="zzc-serv-grid">
          {SERVICES.map(([ic, t, d]) => (
            <article className="zzc-serv" key={t}>
              <div className="zzc-serv-badge"><Lu name={ic} /></div>
              <div className="zzc-serv-body">
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </article>
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
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "orcamento",
          valor: brl0(amount),
          finalidade: purpose,
          nome,
          email,
          condominio: cond,
          detalhe,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="zzc-section alt" id="cotacao">
      <div className="zzc-container zzc-sim-grid">
        <div className="zzc-sim-copy">
          <p className="zzc-eyebrow">Solicite um orçamento</p>
          <h2>Diga quanto precisa.<br/>Nós montamos a proposta.</h2>
          <p className="zzc-lead">Informe o valor desejado e a finalidade da obra. Um especialista ZARZUR analisa o caso e <b>retorna o orçamento por e-mail</b> — sem compromisso e sob medida para o seu condomínio.</p>
          <ul className="zzc-sim-points">
            <li><Lu name="mail-check" />Resposta enviada por e-mail em até 1 dia útil.</li>
            <li><Lu name="sliders-horizontal" />Condições ajustadas à realidade do condomínio.</li>
            <li><Lu name="shield-check" />Análise gratuita e sem compromisso.</li>
          </ul>
        </div>
        <div className="zzc-sim-card">
          {status === "sent" ? (
            <div className="zzc-sent zzc-quote-sent">
              <div className="zzc-sent-ico"><Lu name="mail-check" /></div>
              <h3 className="zzc-modal-title">Solicitação recebida</h3>
              <p className="zzc-modal-sub">Recebemos seu pedido de orçamento de <b>R$ {brl0(amount)}</b>{purpose ? <> para <b>{purpose.toLowerCase()}</b></> : null}. Um especialista ZARZUR retornará a proposta por e-mail em até 1 dia útil.</p>
              <Btn variant="ghost" onClick={() => setStatus("idle")}>Fazer outra solicitação</Btn>
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
                <input className="zzc-minput" type="email" placeholder="E-mail para retorno" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <input className="zzc-minput" placeholder="Condomínio (opcional)" value={cond} onChange={e => setCond(e.target.value)} />
              {status === "error" && (
                <p style={{ color: "#9E3328", fontSize: 13, marginBottom: 8 }}>
                  Erro ao enviar. Tente novamente ou ligue para nós.
                </p>
              )}
              <Btn variant="green" icon={status === "loading" ? "loader" : "arrow-right"}>
                {status === "loading" ? "Enviando…" : "Solicitar orçamento por e-mail"}
              </Btn>
              <p className="zzc-quote-fine">Estimativa sem compromisso, sujeita a análise. Seus dados são usados apenas para o retorno do orçamento.</p>
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
        <p>O cedro do nosso símbolo não cresce rápido — cresce firme. É assim que enxergamos o condomínio: um patrimônio coletivo que se sustenta com previsibilidade financeira, raízes fortes e cuidado de perto.</p>
        <p>A ZARZUR garante a receita, financia as obras e dá suporte jurídico para que o síndico administre sem o peso da inadimplência — com a transparência e a proximidade de quem trata o seu condomínio como trataria o próprio.</p>
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
        {/* ✏️ EDITAR: chamada principal */}
        <h2>Pronto para acabar com a inadimplência do seu condomínio?</h2>
        <p>Converse com um especialista ZARZUR e descubra a solução certa para o seu condomínio.</p>
        <Btn variant="gold" icon="arrow-right" onClick={onSimulate}>Falar com um especialista</Btn>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, Trust, Services, Cotacao, About, CtaBand });

/* ZARZUR website kit — app shell, scroll state, contact modal */

function ContactModal({ open, onClose }) {
  const [nome, setNome]       = React.useState("");
  const [email, setEmail]     = React.useState("");
  const [tel, setTel]         = React.useState("");
  const [solucao, setSolucao] = React.useState("");
  const [cond, setCond]       = React.useState("");
  const [status, setStatus]   = React.useState("idle"); // idle | loading | sent | error

  React.useEffect(() => {
    if (open) {
      setNome(""); setEmail(""); setTel(""); setSolucao(""); setCond("");
      setStatus("idle");
    }
  }, [open]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "contato",
          nome, email,
          telefone: tel,
          solucao,
          condominio: cond,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (!open) return null;
  return (
    <div className="zzc-modal-backdrop" onClick={onClose}>
      <div className="zzc-modal" onClick={e => e.stopPropagation()}>
        <button className="zzc-modal-x" onClick={onClose} aria-label="Fechar"><Lu name="x" /></button>
        {status === "sent" ? (
          <div className="zzc-sent">
            <div className="zzc-sent-ico"><Lu name="check" /></div>
            <h3 className="zzc-modal-title">Recebemos seu contato</h3>
            <p className="zzc-modal-sub">Um especialista ZARZUR falará com você em breve. Obrigado pela confiança.</p>
            <Btn variant="ghost" onClick={onClose}>Fechar</Btn>
          </div>
        ) : (
          <>
            <img src={IMG("symbol.svg")} alt="" style={{ width: 44, marginBottom: 16 }} />
            <h3 className="zzc-modal-title">Fale com um especialista</h3>
            <p className="zzc-modal-sub">A forma mais rápida é pelo WhatsApp. Se preferir, deixe seus dados que retornamos.</p>
            <button type="button" className="zzc-modal-wa" onClick={() => waOpen("Olá! Vim pelo site da ZARZUR e quero falar com um especialista.", { origem: "modal" })}>
              <Lu name="message-circle" />Falar agora no WhatsApp
            </button>
            <div className="zzc-modal-or"><span>ou deixe seus dados</span></div>
            <form onSubmit={handleSubmit}>
              <input className="zzc-minput" placeholder="Nome completo" required
                value={nome} onChange={e => setNome(e.target.value)} />
              <input className="zzc-minput" type="email" placeholder="E-mail" required
                value={email} onChange={e => setEmail(e.target.value)} />
              <input className="zzc-minput" placeholder="Telefone / WhatsApp" required
                value={tel} onChange={e => setTel(e.target.value)} />
              <select className="zzc-minput" value={solucao} onChange={e => setSolucao(e.target.value)}>
                <option value="" disabled>Solução de interesse</option>
                <option>Garantidora de Crédito</option>
                <option>Compra Garantida de Inadimplência</option>
                <option>Empréstimo para Obras</option>
                <option>Compra de Dívida Antiga</option>
                <option>Ainda não sei</option>
              </select>
              <input className="zzc-minput" placeholder="Nome do condomínio (opcional)"
                value={cond} onChange={e => setCond(e.target.value)} />
              {status === "error" && (
                <p style={{ color: "#9E3328", fontSize: 13, marginBottom: 8 }}>
                  Erro ao enviar. Tente novamente ou ligue para nós.
                </p>
              )}
              <Btn variant="green" icon={status === "loading" ? "loader" : "arrow-right"}>
                {status === "loading" ? "Enviando…" : "Enviar solicitação"}
              </Btn>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  const [solid, setSolid] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const openModal = (e) => { if (e) e.preventDefault(); setModal(true); };

  React.useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  return (
    <>
      <Header solid={solid} onSimulate={openModal} />
      <main>
        <Hero onSimulate={openModal} />
        <Trust />
        <IntentRouter />
        <Services />
        <ComoFunciona />
        <Calculadora />
        <Garantias />
        <CasoReal />
        <ParaQuem />
        <Cotacao />
        <About />
        <FAQ />
        <Contato onSimulate={openModal} />
        <CtaBand onSimulate={openModal} />
      </main>
      <Footer />
      <ContactModal open={modal} onClose={() => setModal(false)} />
      <a
        className="zzc-wa-float"
        href={waLink("Olá! Vim pelo site da ZARZUR e quero falar com um especialista.")}
        target="_blank" rel="noopener"
        aria-label="Falar no WhatsApp"
        onClick={() => zzTrack("whatsapp_click", { origem: "botao_flutuante" })}
      >
        <Lu name="message-circle" />
        <span>Fale no WhatsApp</span>
      </a>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

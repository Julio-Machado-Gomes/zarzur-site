/* ZARZUR — seções premium adicionais do site institucional */

/* ✏️ EDITAR: públicos atendidos */
const AUDIENCES = [
  ["user-cog", "Síndicos", "Gestão sem o peso da inadimplência. Receita garantida e respaldo jurídico para você administrar com tranquilidade."],
  ["building-2", "Administradoras", "Um parceiro financeiro que fortalece a sua carteira de condomínios e agrega serviços de alto valor."],
  ["users", "Condôminos", "Mais previsibilidade nas contas, valorização do patrimônio e convivência justa, dentro das normas."],
];
function ParaQuem() {
  return (
    <section className="zzc-section" id="para-quem">
      <div className="zzc-container">
        <div className="zzc-section-head">
          <p className="zzc-eyebrow">Para quem</p>
          <h2 className="zzc-h2">Feito para quem cuida do condomínio.</h2>
          <p className="zzc-lead">Estruturamos soluções para os três lados da gestão condominial — sempre com transparência e proximidade.</p>
        </div>
        <div className="zzc-aud-grid">
          {AUDIENCES.map(([ic, t, d]) => (
            <article className="zzc-aud" key={t}>
              <div className="zzc-aud-ico"><Lu name={ic} /></div>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ✏️ EDITAR: passos do processo */
const STEPS = [
  ["01", "Diagnóstico", "Analisamos a realidade financeira e jurídica do condomínio, sem compromisso."],
  ["02", "Proposta sob medida", "Desenhamos a combinação de soluções ideal — garantia, financiamento, jurídico ou auditoria."],
  ["03", "Acompanhamento", "Implementamos e acompanhamos de perto, com um especialista dedicado ao seu condomínio."],
];
function ComoFunciona() {
  return (
    <section className="zzc-section alt" id="como-funciona">
      <div className="zzc-container">
        <div className="zzc-section-head center">
          <p className="zzc-eyebrow center">Como funciona</p>
          <h2 className="zzc-h2">Três passos até a tranquilidade.</h2>
        </div>
        <div className="zzc-steps">
          {STEPS.map(([n, t, d], i) => (
            <div className="zzc-step" key={n}>
              <span className="zzc-step-n">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
              {i < STEPS.length - 1 && <span className="zzc-step-line"></span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ✏️ EDITAR: diferenciais — [ícone-lucide, título, descrição] */
const DIFF = [
  ["shield-check", "Receita garantida", "O condomínio recebe em dia, independentemente da inadimplência."],
  ["scale", "Respaldo jurídico", "Assessoria completa e tribunal arbitral para resolver sem desgaste."],
  ["handshake", "Atendimento próximo", "Um especialista dedicado, do primeiro contato ao acompanhamento."],
  ["search-check", "Transparência total", "Auditoria e contas claras, sem letras miúdas."],
];
function Diferenciais() {
  return (
    <section className="zzc-diff" id="diferenciais">
      <img className="zzc-diff-wm" src={IMG("symbol.svg")} alt="" />
      <div className="zzc-container zzc-diff-grid">
        <div className="zzc-diff-copy">
          <p className="zzc-eyebrow on-green">Por que ZARZUR</p>
          <h2>Solidez que se constrói<br/>com o tempo.</h2>
          {/* ✏️ EDITAR: parágrafo sobre a empresa */}
          <p>Soluções financeiras desenhadas para transformar a saúde financeira de condomínios em todo o país.</p>
        </div>
        <ul className="zzc-diff-list">
          {DIFF.map(([ic, t, d]) => (
            <li key={t}>
              <span className="zzc-diff-ico"><Lu name={ic} /></span>
              <div><b>{t}</b><span>{d}</span></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ✏️ EDITAR: perguntas e respostas do FAQ — adicione quantas quiser */
const FAQS = [
  [
    "Como funciona a garantia de receita?",
    "A ZARZUR assegura o repasse das cotas condominiais ao condomínio mesmo diante de inadimplência, assumindo a cobrança de forma eficaz. O síndico passa a contar com previsibilidade total de caixa.",
  ],
  [
    "O condomínio precisa trocar de administradora?",
    "Não. Atuamos de forma complementar à administradora atual, agregando soluções financeiras e jurídicas sem interferir na gestão do dia a dia.",
  ],
  [
    "O financiamento de obras tem entrada?",
    "As linhas são desburocratizadas, com prazos de até 60 meses e condições ajustadas à realidade de cada condomínio. As condições finais são definidas no atendimento.",
  ],
  [
    "O tribunal arbitral substitui a Justiça comum?",
    "A arbitragem resolve conflitos condominiais de forma mais rápida e econômica, com decisão de eficácia equivalente, sem a necessidade de um processo judicial tradicional.",
  ],
  [
    "Qual o valor mínimo para financiamento de obras?",
    "Nossos financiamentos cobrem projetos a partir de R$ 30 mil, com teto de R$ 20 milhões — faixa ampla para atender desde pequenas reformas até grandes modernizações prediais.",
  ],
  [
    "Em quanto tempo a ZARZUR analisa meu condomínio?",
    "O diagnóstico inicial é realizado em até 2 dias úteis após a coleta das informações básicas do condomínio. Depois, a proposta personalizada é apresentada em reunião com o síndico ou administradora.",
  ],
  [
    "A ZARZUR atua em quais estados?",
    "Atualmente temos escritórios em São Paulo e no Espírito Santo, com atendimento presencial e remoto para condomínios nessas regiões. Entre em contato para verificar disponibilidade na sua cidade.",
  ],
  [
    "A auditoria externa pode identificar irregularidades passadas?",
    "Sim. Nossa auditoria analisa o histórico das contas condominiais, identifica cobranças indevidas, pagamentos duplicados e oportunidades de redução de despesas — independentemente do período investigado.",
  ],
];

function FAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="zzc-section" id="faq">
      <div className="zzc-container zzc-faq-wrap">
        <div className="zzc-section-head center">
          <p className="zzc-eyebrow center">Dúvidas frequentes</p>
          <h2 className="zzc-h2">Perguntas que todo síndico faz.</h2>
        </div>
        <div className="zzc-faq">
          {FAQS.map(([q, a], i) => (
            <div className={"zzc-faq-item" + (open === i ? " open" : "")} key={i}>
              <button className="zzc-faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{q}</span><Lu name="plus" />
              </button>
              <div className="zzc-faq-a"><p>{a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ✏️ EDITAR: escritórios — preencha phone/tel/wa com os números reais */
const OFFICES = [
  {
    uf: "São Paulo", sigla: "SP",
    desc: "Atendimento à capital, Grande SP e interior.",
    phone: "+55 11 97894-7653",
    tel: "+5511978947653",
    wa: "5511978947653",
    pending: false,
  },
  {
    uf: "Espírito Santo", sigla: "ES",
    desc: "Atendimento à Grande Vitória e todo o estado.",
    phone: "+55 27 99973-4394",
    tel: "+5527999734394",
    wa: "5527999734394",
    pending: false,
  },
];

function Contato({ onSimulate }) {
  return (
    <section className="zzc-contact" id="contato">
      <img className="zzc-contact-wm" src={IMG("symbol-gold.svg")} alt="" />
      <div className="zzc-container zzc-contact-grid">
        <div className="zzc-contact-intro">
          <p className="zzc-eyebrow on-green">Contato</p>
          <h2>Atendimento próximo,<br/>onde o seu condomínio estiver.</h2>
          <p>Fale com a ZARZUR em São Paulo ou no Espírito Santo. Ligue, chame no WhatsApp ou solicite que um especialista entre em contato.</p>
          <Btn variant="gold" icon="arrow-right" onClick={onSimulate}>Solicitar contato</Btn>
        </div>
        <div className="zzc-offices">
          {OFFICES.map(o => (
            <article className="zzc-office" key={o.sigla}>
              <div className="zzc-office-head">
                <span className="zzc-office-uf">{o.sigla}</span>
                <div>
                  <h3>{o.uf}</h3>
                  <p>{o.desc}</p>
                </div>
              </div>
              <a className="zzc-office-phone" href={"tel:" + o.tel}>
                <Lu name="phone" />
                <span>{o.phone}</span>
                {o.pending && <em className="zzc-office-pend">a confirmar</em>}
              </a>
              <div className="zzc-office-actions">
                <a className="zzc-office-wa" href={"https://wa.me/" + o.wa} target="_blank" rel="noopener">
                  <Lu name="message-circle" />WhatsApp
                </a>
                <a className="zzc-office-call" href={"tel:" + o.tel}>
                  <Lu name="phone-call" />Ligar
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ParaQuem, ComoFunciona, Diferenciais, FAQ, Contato });

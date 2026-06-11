/* ZARZUR — seções premium adicionais do site institucional */
import React from "react";
import { Lu, Btn, IMG, A, waLink, waOpen, zzTrack, WA_NUMBER } from "./kit.jsx";

/* ✏️ EDITAR: públicos atendidos */
const AUDIENCES = [
  ["user-cog", "Síndicos", "Gestão sem o peso da inadimplência. A receita entra no dia certo e a cobrança sai do seu colo."],
  ["building-2", "Administradoras", "Um parceiro financeiro que fortalece a sua carteira de condomínios e reduz o atrito com os síndicos."],
  ["users", "Condôminos", "Mais previsibilidade nas contas e valorização do patrimônio, sem rateio extra por causa de quem não paga."],
];
function ParaQuem() {
  return (
    <section className="zzc-section" id="para-quem">
      <div className="zzc-container">
        <div className="zzc-section-head">
          <p className="zzc-eyebrow">Para quem</p>
          <h2 className="zzc-h2">Feito para quem cuida do condomínio.</h2>
          <p className="zzc-lead">Soluções financeiras para os três lados da gestão condominial, sempre com lastro e contrato por trás.</p>
        </div>
        <div className="zzc-aud-grid">
          {AUDIENCES.map(([ic, t, d]) => (
            <article className="zzc-aud" key={t}>
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
  ["01", "Diagnóstico", "Analisamos a arrecadação e a inadimplência do condomínio, sem compromisso."],
  ["02", "Proposta sob medida", "Desenhamos a solução ideal para o seu caso: garantir a receita, antecipar a inadimplência, financiar a obra ou comprar a dívida antiga."],
  ["03", "Repasse no dia certo", "Implementamos o contrato e o condomínio passa a receber no dia combinado, com a ZARZUR cuidando da cobrança."],
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

/* ✏️ EDITAR: perguntas e respostas do FAQ — adicione quantas quiser */
const FAQS = [
  [
    "A Garantidora é um empréstimo? Vou endividar o condomínio?",
    "Não. A Garantidora não é dívida e não entra no balanço como passivo. A ZARZUR assume a inadimplência futura e repassa 100% da arrecadação no dia combinado, cobrando uma porcentagem sobre o valor arrecadado. O condomínio não toma crédito nem precisa de aval.",
  ],
  [
    "Quanto custa?",
    "Na Garantidora, a ZARZUR cobra uma porcentagem sobre a arrecadação mensal, a partir de 2,5%. O valor exato sai depois da análise do perfil do condomínio: número de unidades, histórico de inadimplência e valor das cotas. Na Compra Garantida você paga só pelo que precisou ser antecipado. No crédito para obra e na compra de dívida antiga, as condições são apresentadas caso a caso. A análise é gratuita.",
  ],
  [
    "Qual a diferença entre Garantidora e Compra Garantida?",
    "Na Garantidora, a ZARZUR cobre 100% da inadimplência futura todos os meses, então o condomínio recebe cheio sempre. Na Compra Garantida, a cinco dias do fim do mês a ZARZUR antecipa só o que faltou entrar, e você fecha o mês completo pagando apenas pelo uso. A Compra Garantida costuma sair mais barata para quem tem inadimplência baixa ou pontual.",
  ],
  [
    "Como é feita a cobrança ao morador inadimplente?",
    "A cobrança passa a ser conduzida pela ZARZUR, dentro da lei e de forma respeitosa, sem expor o morador perante o condomínio. O síndico deixa de ter o desgaste de cobrar vizinho e a relação na assembleia melhora.",
  ],
  [
    "O condomínio precisa trocar de administradora?",
    "Não. A ZARZUR atua de forma complementar à administradora atual, sem interferir na gestão do dia a dia. Somamos a parte financeira; a rotina administrativa continua com quem já cuida dela.",
  ],
  [
    "Preciso aprovar em assembleia?",
    "Em geral, sim. A contratação costuma passar pela assembleia. A ZARZUR prepara o material de apresentação com os números do seu condomínio para você levar à reunião e facilitar a aprovação. Fale com um especialista e receba esse material.",
  ],
  [
    "Qual o valor mínimo e o prazo do crédito para obras?",
    "O crédito para obras vai de R$ 30 mil a R$ 20 milhões, com prazo de até 60 meses, aprovação em até 7 dias, sem garantia real e sem aval dos condôminos.",
  ],
  [
    "A ZARZUR atua em quais regiões?",
    "Temos atendimento presencial em São Paulo e no Espírito Santo, além de atendimento remoto. Fale com a ZARZUR para confirmar a disponibilidade na sua cidade.",
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
          <p>Fale com a ZARZUR em São Paulo ou no Espírito Santo. Chame no WhatsApp, ligue ou peça que um especialista entre em contato.</p>
          <Btn variant="gold" icon="message-circle" onClick={() => waOpen("Olá! Vim pelo site da ZARZUR e quero falar com um especialista.", { origem: "secao_contato" })}>Falar no WhatsApp</Btn>
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

/* ✏️ EDITAR: pilares da estrutura jurídica/operacional — adicione/refine conforme o real */
const GARANTIAS = [
  ["landmark", "Contrato formalizado em banco",
   "A operação de repasse é contratualizada por meio de instituição bancária, o que dá formalidade e rastreabilidade a cada movimento."],
  ["wallet", "Capital próprio",
   "A ZARZUR opera com capital próprio e assume o risco da inadimplência. Esse risco é nosso, nunca do condomínio."],
  ["file-check-2", "Conta segregada na Garantidora",
   "Na Garantidora de Crédito, a arrecadação do condomínio é controlada em conta dedicada, sem mistura de fluxos."],
  ["shield-check", "Não é dívida do condomínio",
   "A Garantidora não funciona como empréstimo: não vira passivo no balanço nem exige aval dos condôminos. O condomínio apenas recebe."],
];

function Garantias() {
  return (
    <section className="zzc-section alt" id="seguranca">
      <div className="zzc-container">
        <div className="zzc-section-head center">
          <p className="zzc-eyebrow center">Como garantimos o seu repasse</p>
          <h2 className="zzc-h2">A garantia tem estrutura por trás.</h2>
          <p className="zzc-lead" style={{ margin: "0 auto" }}>
            Garantir a receita de um condomínio é responsabilidade séria, e responsabilidade precisa de lastro e contrato por trás. Veja como a ZARZUR estrutura essa confiança.
          </p>
        </div>
        <div className="zzc-garantias-grid">
          {GARANTIAS.map(([ic, t, d], i) => (
            <article className="zzc-garantia" key={t}>
              <span className="zzc-garantia-idx">{String(i + 1).padStart(2, "0")}</span>
              <div>
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

function CasoReal() {
  return (
    <section className="zzc-section" id="casos">
      <div className="zzc-container">
        <div className="zzc-section-head center">
          <p className="zzc-eyebrow center">Caso real</p>
          <h2 className="zzc-h2">Da reforma improvisada à obra que dura.</h2>
        </div>
        <article className="zzc-caso">
          <div className="zzc-caso-main">
            <div className="zzc-caso-tag"><Lu name="hard-hat" />Empréstimo para obra</div>
            <h3>Condomínio residencial · Jardim Camburi, Vitória/ES</h3>
            <p className="zzc-caso-lead">
              Sem crédito, o condomínio continuaria fazendo só reparos pontuais na cobertura, ano após ano, sem nunca resolver o problema de verdade.
            </p>
            <div className="zzc-caso-steps">
              <div>
                <b>Antes</b>
                <p>Manutenções pontuais e recorrentes na cobertura, sem fôlego de caixa para uma solução definitiva.</p>
              </div>
              <div>
                <b>Com a ZARZUR</b>
                <p>Crédito liberado para modernizar todo o sistema de impermeabilização da cobertura.</p>
              </div>
              <div>
                <b>Resultado</b>
                <p>Vida útil do sistema ampliada, manutenções futuras viabilizadas e mais conforto térmico para os apartamentos do último andar.</p>
              </div>
            </div>
          </div>
          <aside className="zzc-caso-aside">
            <Lu name="building-2" />
            <p className="zzc-caso-quote">A obra que vinha sendo adiada saiu do papel e resolveu o problema de uma vez.</p>
            <a className="zzc-caso-cta" href={waLink("Olá! Vi o caso de Jardim Camburi no site e quero crédito para uma obra no meu condomínio.")} target="_blank" rel="noopener" onClick={() => zzTrack("whatsapp_click", { origem: "caso_real" })}>
              <Lu name="message-circle" />Quero crédito para minha obra
            </a>
          </aside>
        </article>
      </div>
    </section>
  );
}


export { ParaQuem, ComoFunciona, FAQ, Contato, Garantias, CasoReal };

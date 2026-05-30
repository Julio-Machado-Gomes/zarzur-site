# ZARZUR — Site Institucional

Projeto limpo, editável e pronto para deploy.  
Nenhuma etapa de build necessária — abra direto no browser ou suba no Vercel/Netlify em um clique.

---

## Estrutura de arquivos

```
project/
├── index.html          ← shell HTML (raramente precisa editar)
├── src/
│   ├── styles.css      ← tokens de design + componentes visuais
│   ├── kit.jsx         ← Header, Footer, Logo, Coin3D, botões
│   ├── sections.jsx    ← Hero, Serviços, Orçamento (slider), Sobre
│   ├── premium.jsx     ← Para quem, Como funciona, Diferenciais, FAQ, Contato
│   └── app.jsx         ← App shell + modal de contato
└── assets/
    ├── marca-horizontal.svg
    ├── marca-horizontal-white.svg
    ├── marca-vertical-white.svg
    ├── symbol.svg
    ├── symbol-gold.svg
    ├── coin-disc.png
    ├── social-icon-2.png   (LinkedIn)
    ├── social-icon-3.png   (Instagram)
    └── social-icon-4.png   (Facebook)
```

---

## O que editar e onde

Cada arquivo tem comentários `✏️ EDITAR` marcando exatamente os pontos a alterar.

### Telefones e WhatsApp

**`src/premium.jsx`** — objeto `OFFICES` (perto do fim do arquivo):

```jsx
const OFFICES = [
  {
    uf: "São Paulo", sigla: "SP",
    phone: "+55 11 97894-7653",   // ← texto exibido
    tel: "+5511978947653",         // ← href do link tel:
    wa: "5511978947653",           // ← número do WhatsApp (só dígitos)
    pending: false,                // ← true mostra "a confirmar"
  },
  {
    uf: "Espírito Santo", sigla: "ES",
    phone: "+55 27 99973-4394",
    tel: "+5527999734394",
    wa: "5527999734394",
    pending: false,
  },
];
```

O mesmo número do SP também aparece no rodapé em **`src/kit.jsx`** (função `Footer`):

```jsx
<a href="tel:+5511978947653">São Paulo · +55 11 97894-7653</a>
```

---

### Slider de orçamento

**`src/sections.jsx`** — função `Cotacao`:

```jsx
<input
  type="range"
  min="30000"       // ← valor mínimo (R$ 30 mil)
  max="20000000"    // ← valor máximo (R$ 20 mi)
  step="10000"
  ...
/>
<div className="zzc-range-ends">
  <span>R$ 30 mil</span>   {/* ← label esquerdo */}
  <span>R$ 20 mi</span>    {/* ← label direito */}
</div>
```

Para alterar, mude `min`, `max` e os textos dos labels juntos.

---

### FAQ

**`src/premium.jsx`** — array `FAQS`:

```jsx
const FAQS = [
  ["Pergunta aqui?", "Resposta completa aqui."],
  // adicione quantas quiser no mesmo formato
];
```

---

### Serviços

**`src/sections.jsx`** — array `SERVICES`:

```jsx
const SERVICES = [
  ["ícone-lucide", "Título do Serviço", "Descrição do serviço."],
  // ...
];
```

Ícones disponíveis em: https://lucide.dev/icons

---

### Números de impacto (Trust bar)

**`src/sections.jsx`** — array `STATS`:

```jsx
const STATS = [
  ["+20", "anos", "de experiência em condomínios"],
  ["100", "%", "da receita garantida"],
  // ...
];
```

---

### Links de redes sociais

**`src/kit.jsx`** — função `Footer`:

```jsx
<a href="https://instagram.com/SUA_CONTA"><img src={IMG("social-icon-3.png")} alt="Instagram" /></a>
<a href="https://linkedin.com/company/SUA_EMPRESA"><img src={IMG("social-icon-2.png")} alt="LinkedIn" /></a>
<a href="https://facebook.com/SUA_PAGINA"><img src={IMG("social-icon-4.png")} alt="Facebook" /></a>
```

---

### CNPJ e copyright

**`src/kit.jsx`** — função `Footer`, linha final:

```jsx
<span>© 2025 ZARZUR Soluções Financeiras. Todos os direitos reservados.</span>
<span>CNPJ 00.000.000/0001-00</span>   {/* ← preencher CNPJ real */}
```

---

## Como visualizar localmente

**Opção 1 — VS Code (recomendado):**

1. Instale a extensão **Live Server** (Ritwick Dey)
2. Abra a pasta `project/` no VS Code
3. Clique com o botão direito em `index.html` → "Open with Live Server"

**Opção 2 — Python (sem instalar nada):**

```bash
cd project
python3 -m http.server 8080
# Abra http://localhost:8080
```

> ⚠️ Abrir o `index.html` direto pelo Finder/Explorer **não funciona** — o browser bloqueia scripts externos por segurança (CORS). Use sempre um servidor local.

---

## Deploy no Vercel (recomendado)

1. Faça login em [vercel.com](https://vercel.com)
2. Clique em **Add New Project**
3. Arraste a pasta `project/` ou conecte ao GitHub
4. Deixe todas as configurações padrão e clique **Deploy**
5. Em ~30 segundos o site está no ar com HTTPS

Não precisa de `package.json`, `node_modules` nem nenhum passo de build.

---

## Deploy no Netlify (alternativa)

1. Abra [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arraste a pasta `project/` para a área de drop
3. Pronto — URL gerada automaticamente

---

## Fontes

O site usa **Cinzel**, **Lora** e **Libre Franklin** carregadas do Google Fonts (ver `index.html`).  
Se a marca fornecer arquivos `.woff2` próprios, coloque-os em `assets/fonts/` e substitua o `<link>` do Google Fonts por `@font-face` no início de `src/styles.css`.

---

## Cores da marca

| Token CSS          | Hex       | Uso                         |
|--------------------|-----------|-----------------------------|
| `--zz-green`       | `#044828` | Verde principal (medido)    |
| `--zz-gold`        | `#A88840` | Dourado principal (medido)  |
| `--zz-green-800`   | `#022E19` | Hero, rodapé                |
| `--zz-gold-400`    | `#C4A86A` | Acentos em fundo escuro     |

Altere os tokens em `src/styles.css` (bloco `:root`) para ajustar toda a paleta de uma vez.

# ADMcast FECISC – Site do Podcast

Site do podcast de extensão ADMcast FECISC/UECE, construído com **Astro** e integrado ao **Contentful** para gerenciamento de conteúdo.

---

## 🚀 Rodando localmente

```bash
# 1. Instale as dependências
npm install

# 2. Copie o arquivo de variáveis de ambiente
cp .env.example .env

# 3. Preencha o .env com suas credenciais do Contentful (veja abaixo)

# 4. Rode o servidor de desenvolvimento
npm run dev
```

---

## 🔑 Configurando o Contentful

### Passo 1 – Criar conta e space

1. Acesse [app.contentful.com](https://app.contentful.com) e crie uma conta gratuita
2. Crie um novo **Space** (espaço) — ex: `admcast-fecisc`
3. Selecione o plano **Free** (gratuito)

### Passo 2 – Criar os Content Types (modelos de conteúdo)

No painel do Contentful, vá em **Content model** e crie os seguintes tipos:

---

#### 📻 Content Type: `episodio`

| Campo           | ID do campo       | Tipo           | Obrigatório |
|----------------|-------------------|----------------|-------------|
| Título         | `titulo`          | Short text     | ✅          |
| Descrição      | `descricao`       | Long text      | ✅          |
| Data de publicação | `dataPublicacao` | Date       | ✅          |
| Duração        | `duracao`         | Short text     | ❌          |
| Temporada      | `temporada`       | Integer        | ❌          |
| Número         | `numero`          | Integer        | ✅          |
| Capa           | `capa`            | Media (imagem) | ❌          |
| Link Spotify   | `linkSpotify`     | Short text     | ❌          |
| Link YouTube   | `linkYoutube`     | Short text     | ❌          |
| Tags           | `tags`            | Short text, lista | ❌       |

---

#### ⚙️ Content Type: `configuracoes`

| Campo           | ID do campo       | Tipo       | Obrigatório |
|----------------|-------------------|------------|-------------|
| Descrição Hero | `descricaoHero`   | Long text  | ❌          |
| Sobre (texto)  | `sobreTexto`      | Long text  | ❌          |
| Link Spotify   | `linkSpotify`     | Short text | ❌          |
| Link YouTube   | `linkYoutube`     | Short text | ❌          |
| Link Instagram | `linkInstagram`   | Short text | ❌          |
| Link Facebook  | `linkFacebook`    | Short text | ❌          |

> ⚠️ **Atenção:** Os IDs dos campos precisam ser exatamente como listados acima (respeitando maiúsculas/minúsculas).

---

### Passo 3 – Obter as credenciais de API

1. No Contentful, vá em **Settings → API Keys**
2. Clique em **Add API Key**
3. Copie o **Space ID** e o **Content Delivery API – access token**
4. Cole no arquivo `.env`:

```env
CONTENTFUL_SPACE_ID=abc123xyz
CONTENTFUL_ACCESS_TOKEN=seu_token_aqui
```

---

### Passo 4 – Adicionar o primeiro episódio

1. No Contentful, vá em **Content → Add entry → Episodio**
2. Preencha os campos
3. Clique em **Publish**
4. Rode `npm run dev` — o episódio aparece automaticamente no site!

---

## 🌐 Deploy no Netlify

```bash
# 1. Build do projeto
npm run build

# 2. A pasta 'dist/' é o site pronto para deploy
```

No Netlify:
1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`
3. Defina o comando de build: `npm run build`
4. Defina a pasta de publish: `dist`

---

## 📁 Estrutura do projeto

```
admcast/
├── src/
│   ├── pages/
│   │   └── index.astro        # Página principal
│   ├── components/
│   │   └── EpisodioCard.astro # Card de cada episódio
│   ├── layouts/
│   │   └── Base.astro         # Layout base HTML
│   └── lib/
│       └── contentful.js      # Integração com a API do Contentful
├── .env.example               # Modelo de variáveis de ambiente
├── astro.config.mjs           # Configuração do Astro
└── package.json
```

---

## 🛠️ Tecnologias

- **[Astro](https://astro.build)** – Framework de site estático
- **[Contentful](https://contentful.com)** – CMS headless para gerenciar episódios
- **[Netlify](https://netlify.com)** – Hospedagem e deploy automático (gratuito)

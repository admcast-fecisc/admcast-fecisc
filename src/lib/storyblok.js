const TOKEN = import.meta.env.STORYBLOK_TOKEN;
const BASE = 'https://api.storyblok.com/v2/cdn';

export async function getEpisodios() {
  const res = await fetch(
    `${BASE}/stories?starts_with=episodios/&token=${TOKEN}&sort_by=first_published_at:desc`
  );
  const { stories } = await res.json();
  return stories.map((s) => ({
    id: s.id,
    titulo: s.content.titulo,
    descricao: s.content.descricao,
    dataPublicacao: s.content.dataPublicacao,
    duracao: s.content.duracao ?? '',
    numero: s.content.numero ?? 1,
    capa: s.content.capa?.filename ?? null,
    linkSpotify: s.content.linkSpotify ?? null,
    linkYoutube: s.content.linkYoutube ?? null,
    tags: s.content.tags ?? [],
  }));
}

export async function getConfiguracoes() {
  const res = await fetch(
    `${BASE}/stories/configuracoes?token=${TOKEN}`
  );
  const { story } = await res.json();
  return story?.content ?? null;
}
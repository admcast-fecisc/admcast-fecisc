import contentful from 'contentful';

const client = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
});

/**
 * Busca todos os episódios do Contentful ordenados por data (mais recente primeiro).
 * Content Type esperado: "episodio"
 * Campos:
 *   - titulo        (Short text)
 *   - descricao     (Long text)
 *   - dataPublicacao (Date)
 *   - duracao        (Short text, ex: "32min")
 *   - temporada      (Integer)
 *   - numero         (Integer)
 *   - capa           (Media – imagem)
 *   - linkSpotify    (Short text – URL)
 *   - linkYoutube    (Short text – URL)
 *   - tags           (Short text, list)
 */
export async function getEpisodios() {
  const entries = await client.getEntries({
    content_type: 'episodio',
    order: '-fields.dataPublicacao',
  });

  return entries.items.map((item) => ({
    id: item.sys.id,
    titulo: item.fields.titulo,
    descricao: item.fields.descricao,
    dataPublicacao: item.fields.dataPublicacao,
    duracao: item.fields.duracao ?? '',
    temporada: item.fields.temporada ?? 1,
    numero: item.fields.numero ?? 1,
    capa: item.fields.capa?.fields?.file?.url
      ? 'https:' + item.fields.capa.fields.file.url
      : null,
    linkSpotify: item.fields.linkSpotify ?? null,
    linkYoutube: item.fields.linkYoutube ?? null,
    tags: item.fields.tags ?? [],
  }));
}

/**
 * Busca as informações gerais do podcast (sobre, redes sociais etc.)
 * Content Type esperado: "configuracoes"
 * Campos:
 *   - descricaoHero  (Long text)
 *   - sobreTexto     (Long text)
 *   - linkSpotify    (Short text)
 *   - linkYoutube    (Short text)
 *   - linkInstagram  (Short text)
 *   - linkFacebook   (Short text)
 */
export async function getConfiguracoes() {
  const entries = await client.getEntries({
    content_type: 'configuracoes',
    limit: 1,
  });

  if (!entries.items.length) return null;
  return entries.items[0].fields;
}

# Bora — AA1, Entrega 2

O Bora é um projeto da disciplina Web 2 para ajudar a descobrir lugares e atividades de acordo com interesses, preço, distância e tempo disponível.

## Objetivo desta entrega

Evoluir a primeira versão em HTML e CSS, com uma identidade visual mais clara, avaliações de exemplo, uma página de mapa e favoritos que funcionam.

## O que foi feito

- Home e página de detalhes reorganizadas para celular, tablet e desktop, com cores, tipografia, navegação e cards mais consistentes.
- Três lugares de demonstração com notas médias e comentários fictícios.
- Página **Mapa** com uma visão mundial básica usando Leaflet e mapas do OpenStreetMap.
- Favoritos na Home e nos Detalhes, salvos em `localStorage` e exibidos na página **Favoritos**. É possível adicionar e remover lugares; a seleção continua após recarregar a página.
- Filtros simples da Home para categoria, distância e preço, aplicados aos dados de demonstração.

Na primeira entrega havia apenas a estrutura das páginas, filtros visuais e cards sem avaliações. Os favoritos agora usam dados salvos no navegador. Na página **Preferências**, os campos podem ser alterados, mas o botão Salvar ainda não tem ação.

## Tecnologias

HTML, CSS, JavaScript, Tailwind CSS pela Play CDN e Leaflet 1.9.4 com OpenStreetMap. Os dados dos lugares e avaliações estão em `js/places.js`; não há backend nem API de lugares nesta etapa.

O layout usa classes comuns do Tailwind. O CSS próprio complementa a fonte, a cor principal, os controles do formulário e a altura do mapa.

## Como executar

Abra `index.html` no navegador. Para servir os arquivos localmente, também é possível executar `python3 -m http.server 8000` nesta pasta e acessar `http://localhost:8000`.

É necessária conexão com a internet para carregar o Tailwind, a biblioteca Leaflet, as imagens do mapa e a foto ilustrativa de uma avaliação. Os estilos próprios, ilustrações e dados do Bora estão nesta pasta.

A foto ilustrativa exibida em uma avaliação é de [KaanaveniSaikiran no Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Image_of_a_Park_with_Benches_and_Flowering_Trees.jpg), disponibilizada em CC0. Ela não representa o local nem foi enviada pelo usuário fictício.

## Próximos passos

Na próxima entrega da AA1, pretendemos refinar a responsividade e evoluir a exploração no mapa. Geolocalização, lugares próximos, integração com uma API e comentários reais ficam para etapas posteriores.

# Bora

Projeto da disciplina Web 2.

Gustavo Gonçalves de Souza Geraldelli, RA 800523

O Bora é uma aplicação para ajudar a encontrar lugares e atividades de acordo com categoria, preço e distância. Os lugares, as avaliações e as coordenadas dos marcadores usam dados de exemplo.

## Páginas

- `index.html` - página principal com sugestões de lugares, filtros de categoria, distância e preço e opção de favoritar.
- `detalhes.html` - informações, notas e comentários do lugar selecionado.
- `favoritos.html` - lugares salvos no `localStorage`, com opção de remover favoritos.
- `mapa.html` - mapa com marcadores dos lugares, links para detalhes e localização do usuário mediante permissão.
- `preferencias.html` - categorias favoritas e distância máxima salvas no `localStorage` e aplicadas ao abrir a página principal, além da opção de modo escuro.

O projeto utiliza HTML, CSS, JavaScript, Tailwind CSS e Leaflet com OpenStreetMap. As páginas compartilham a identidade visual e possuem layout responsivo para celular, tablet e desktop. Em telas pequenas, os links de navegação ficam em um menu controlado por checkbox e CSS. O modo escuro é salvo no `localStorage` e aplicado em todas as páginas.

Os cards principais e as informações dos lugares estão escritos no HTML. O JavaScript controla os filtros, a seleção dos detalhes e os favoritos, que permanecem salvos após recarregar a página. A Home solicita a localização ao abrir. A localização autorizada fica na sessão do navegador e permite calcular as distâncias em linha reta, ordenar as sugestões e aplicar os filtros. Sem ela, São Carlos é o ponto de referência.

## Como executar

Abra o arquivo `index.html` no navegador.

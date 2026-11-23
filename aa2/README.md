# Bora

Projeto da disciplina Web 2.

Gustavo Gonçalves de Souza Geraldelli, RA 800523

O Bora é uma aplicação para ajudar a encontrar lugares e atividades de acordo com categoria, preço e distância. Os lugares, as avaliações e as coordenadas dos marcadores usam dados de exemplo.

## Páginas

- `/` - página principal com sugestões de lugares, filtros de categoria, distância e preço e opção de favoritar.
- `/detalhes/:id` - informações, notas e comentários do lugar selecionado.
- `/favoritos` - lugares salvos no `localStorage`, com opção de remover favoritos.
- `/mapa` - mapa com marcadores dos lugares, links para detalhes e localização do usuário mediante permissão.
- `/preferencias` - categorias favoritas e distância máxima salvas no `localStorage` e aplicadas ao abrir a página principal, além da opção de modo escuro.

O projeto utiliza React, Vite, React Router, Tailwind CSS e Leaflet com OpenStreetMap. As páginas compartilham componentes e possuem layout responsivo para celular, tablet e desktop. Em telas pequenas, os links de navegação ficam em um menu controlado por checkbox e CSS. O modo escuro e os favoritos permanecem salvos após recarregar a página.

O Tailwind CSS é compilado localmente pelo Vite usando os pacotes instalados pelo npm. O build gera os arquivos CSS em `dist`, sem carregar o Tailwind por CDN.

A página principal solicita a localização ao abrir. A localização autorizada fica na sessão do navegador e permite calcular as distâncias em linha reta, ordenar as sugestões e aplicar os filtros. Sem ela, São Carlos é o ponto de referência.

## Como executar

Na pasta do projeto, execute:

```bash
npm install
npm run dev
```

Abra no navegador o endereço mostrado no terminal.

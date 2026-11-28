# Bora

Projeto da disciplina Web 2.

Gustavo Gonçalves de Souza Geraldelli, RA 800523

O Bora é uma aplicação para ajudar a encontrar lugares e atividades de acordo com categoria, preço e distância. Os lugares, as avaliações e as coordenadas dos marcadores usam dados de exemplo.

## Páginas

- `/` - sugestões de lugares, filtros de categoria, distância e preço e opção de favoritar.
- `/detalhes/:id` - informações, notas e comentários do lugar selecionado.
- `/favoritos` - lugares salvos no `localStorage`, com opção de remover favoritos.
- `/mapa` - mapa com marcadores dos lugares, links para detalhes e localização do usuário mediante permissão.
- `/preferencias` - categorias favoritas, distância máxima e modo escuro.

O frontend utiliza React, Vite, React Router, Tailwind CSS compilado localmente e Leaflet com OpenStreetMap. O backend utiliza Node.js e Express para ler `backend/dados.json` e responder a `GET /api/lugares` e `GET /api/lugares/:id`. A média e a quantidade de avaliações são calculadas pelo servidor. As consultas mostram carregamento, erro com opção de tentar novamente e ausência de resultados.

As páginas possuem layout responsivo. Favoritos, preferências e tema ficam no `localStorage`; a localização autorizada fica na sessão do navegador. Sem localização, São Carlos é o ponto de referência para as distâncias em linha reta. O Vite encaminha os pedidos iniciados por `/api` ao backend local.

## Como executar

Na pasta do projeto, instale as dependências:

```bash
npm install
```

Inicie o backend em um terminal:

```bash
npm run backend
```

Em outro terminal, na mesma pasta, inicie o frontend:

```bash
npm run dev
```

Abra o endereço mostrado pelo Vite. O backend utiliza `http://127.0.0.1:3001` e precisa permanecer em execução.

Para verificar o build, execute `npm run build`. Para visualizar o build localmente, mantenha o backend ligado e execute `npm run preview`.

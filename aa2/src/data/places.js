export const places = [
  {
    id: 'parque-kartodromo',
    latitude: -22.0085,
    longitude: -47.896,
    name: 'Parque do Kartódromo',
    category: 'Ao ar livre',
    image: '/assets/parque.svg',
    imageAlt: 'Ilustração de um parque',
    summary: 'Espaço para caminhar e passar uma tarde tranquila.',
    price: 'Grátis',
    duration: '1–2 h',
    rating: 4.3,
    reviewCount: 3,
    priceValue: 0,
    description: 'Um espaço aberto para caminhar, descansar e aproveitar o fim da tarde.',
    address: 'Av. Liberdade, s/n - São Carlos, SP',
    hours: 'Todos os dias, das 6h às 21h.',
    reviews: [
      {
        author: 'Marina S.',
        rating: 5,
        comment: 'Gostei do espaço para caminhar. Fui no fim da tarde e havia bastante sombra.',
        photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Image_of_a_Park_with_Benches_and_Flowering_Trees.jpg?width=330',
        photoAlt: 'Parque com bancos e árvores'
      },
      {
        author: 'Rafael M.',
        rating: 4,
        comment: 'Boa opção para uma pausa ao ar livre. Algumas áreas poderiam ter mais bancos.'
      },
      {
        author: 'Lia P.',
        rating: 4,
        comment: 'Passeio simples e agradável para fazer sem gastar.'
      }
    ]
  },
  {
    id: 'cafe-centro',
    latitude: -22.018,
    longitude: -47.891,
    name: 'Café do Centro',
    category: 'Comer',
    image: '/assets/cafe.svg',
    imageAlt: 'Ilustração de uma cafeteria',
    summary: 'Café e lanches perto da região central.',
    price: 'Cerca de R$ 25',
    duration: '1 h',
    rating: 4.5,
    reviewCount: 2,
    priceValue: 25,
    description: 'Uma opção para tomar café e fazer uma pausa durante um passeio pelo centro.',
    address: 'Região central - São Carlos, SP',
    hours: 'Horário a confirmar.',
    reviews: [
      {
        author: 'Joana R.',
        rating: 5,
        comment: 'Ambiente tranquilo para conversar e tomar um café.'
      },
      {
        author: 'Pedro A.',
        rating: 4,
        comment: 'Gostei dos lanches. O espaço é pequeno nos horários mais cheios.'
      }
    ]
  },
  {
    id: 'museu-ciencia',
    latitude: -22.025,
    longitude: -47.881,
    name: 'Museu da Ciência',
    category: 'Cultura',
    image: '/assets/museu.svg',
    imageAlt: 'Ilustração de um museu',
    summary: 'Exposições e atividades para conhecer.',
    price: 'Grátis',
    duration: '2 h',
    rating: 4.7,
    reviewCount: 3,
    priceValue: 0,
    description: 'Uma visita para conhecer exposições e reservar um tempo para explorar temas de ciência.',
    address: 'São Carlos, SP - endereço a confirmar',
    hours: 'Horário a confirmar.',
    reviews: [
      {
        author: 'Camila T.',
        rating: 5,
        comment: 'As exposições renderam uma visita interessante e várias conversas depois.'
      },
      {
        author: 'Bruno C.',
        rating: 4,
        comment: 'Vale reservar tempo para ver tudo com calma.'
      },
      {
        author: 'Nina L.',
        rating: 5,
        comment: 'Gostei da variedade de assuntos apresentados.'
      }
    ]
  },
  {
    id: 'padaria-vila',
    name: 'Padaria da Vila',
    category: 'Comer',
    latitude: -22.041,
    longitude: -47.927,
    image: '/assets/cafe.svg',
    imageAlt: 'Ilustração de uma cafeteria',
    summary: 'Pães e lanches para um café da manhã sem pressa.',
    price: 'Cerca de R$ 18',
    duration: '1 h',
    rating: 4.5,
    reviewCount: 2,
    priceValue: 18,
    description: 'Um lugar para tomar café, escolher um pão fresco e fazer uma pausa durante o dia.',
    address: 'Região sul - São Carlos, SP',
    hours: 'De segunda a sábado, das 7h às 18h.',
    reviews: [
      {
        author: 'Ana B.',
        rating: 5,
        comment: 'Gostei dos pães e do café. Uma boa parada para começar o dia.'
      },
      {
        author: 'Lucas F.',
        rating: 4,
        comment: 'Atendimento tranquilo e lanches variados. Estava cheia pela manhã.'
      }
    ]
  },
  {
    id: 'galeria-bairro',
    name: 'Galeria do Bairro',
    category: 'Cultura',
    latitude: -21.961,
    longitude: -47.86,
    image: '/assets/museu.svg',
    imageAlt: 'Ilustração de um espaço cultural',
    summary: 'Exposições de arte e trabalhos de artistas locais.',
    price: 'Cerca de R$ 15',
    duration: '1-2 h',
    rating: 4,
    reviewCount: 2,
    priceValue: 15,
    description: 'Uma galeria para conhecer pinturas, fotografias e pequenas exposições em uma visita tranquila.',
    address: 'Região norte - São Carlos, SP',
    hours: 'De terça a domingo, das 10h às 17h.',
    reviews: [
      {
        author: 'Beatriz C.',
        rating: 4,
        comment: 'Gostei das fotografias e da organização das salas.'
      },
      {
        author: 'Diego R.',
        rating: 4,
        comment: 'É um espaço pequeno, mas dá para apreciar os trabalhos com calma.'
      }
    ]
  },
  {
    id: 'recanto-verde',
    name: 'Recanto Verde',
    category: 'Ao ar livre',
    latitude: -22.101,
    longitude: -47.82,
    image: '/assets/parque.svg',
    imageAlt: 'Ilustração de uma área verde',
    summary: 'Área verde com trilhas leves e espaço para piquenique.',
    price: 'Cerca de R$ 60',
    duration: '3-4 h',
    rating: 4.5,
    reviewCount: 2,
    priceValue: 60,
    description: 'Um passeio para caminhar entre as árvores e passar algumas horas ao ar livre com amigos ou família.',
    address: 'Zona rural - São Carlos, SP',
    hours: 'Sábados e domingos, das 8h às 17h.',
    reviews: [
      {
        author: 'Clara M.',
        rating: 5,
        comment: 'As trilhas são agradáveis e encontramos um bom espaço para o piquenique.'
      },
      {
        author: 'André V.',
        rating: 4,
        comment: 'Vale reservar a manhã para caminhar. Levei água e um lanche.'
      }
    ]
  }
];

const places = [
  {
    id: 'parque-kartodromo',
    name: 'Parque do Kartódromo',
    category: 'Ao ar livre',
    image: 'assets/parque.svg',
    imageAlt: 'Ilustração de um parque',
    summary: 'Espaço para caminhar e passar uma tarde tranquila.',
    description:
      'Um espaço aberto para caminhar, descansar e aproveitar o fim da tarde.',
    distance: '1,8 km',
    distanceKm: 1.8,
    price: 'Grátis',
    priceValue: 0,
    duration: '1–2 h',
    address: 'Av. Liberdade, s/n — São Carlos, SP',
    hours: 'Todos os dias, das 6h às 21h.',
    reviews: [
      {
        name: 'Marina S.',
        rating: 5,
        text: 'Gostei do espaço para caminhar. Fui no fim da tarde e havia bastante sombra.',
        photo:
          'https://commons.wikimedia.org/wiki/Special:FilePath/Image_of_a_Park_with_Benches_and_Flowering_Trees.jpg?width=330',
        photoAlt: 'Parque com bancos e árvores'
      },
      {
        name: 'Rafael M.',
        rating: 4,
        text: 'Boa opção para uma pausa ao ar livre. Algumas áreas poderiam ter mais bancos.'
      },
      {
        name: 'Lia P.',
        rating: 4,
        text: 'Passeio simples e agradável para fazer sem gastar.'
      }
    ]
  },
  {
    id: 'cafe-centro',
    name: 'Café do Centro',
    category: 'Comer',
    image: 'assets/cafe.svg',
    imageAlt: 'Ilustração de uma cafeteria',
    summary: 'Café e lanches perto da região central.',
    description:
      'Uma opção para tomar café e fazer uma pausa durante um passeio pelo centro.',
    distance: '850 m',
    distanceKm: 0.85,
    price: 'Cerca de R$ 25',
    priceValue: 25,
    duration: '1 h',
    address: 'Região central — São Carlos, SP',
    hours: 'Horário a confirmar.',
    reviews: [
      {
        name: 'Joana R.',
        rating: 5,
        text: 'Ambiente tranquilo para conversar e tomar um café.'
      },
      {
        name: 'Pedro A.',
        rating: 4,
        text: 'Gostei dos lanches. O espaço é pequeno nos horários mais cheios.'
      }
    ]
  },
  {
    id: 'museu-ciencia',
    name: 'Museu da Ciência',
    category: 'Cultura',
    image: 'assets/museu.svg',
    imageAlt: 'Ilustração de um museu',
    summary: 'Exposições e atividades para conhecer.',
    description:
      'Uma visita para conhecer exposições e reservar um tempo para explorar temas de ciência.',
    distance: '3,2 km',
    distanceKm: 3.2,
    price: 'Grátis',
    priceValue: 0,
    duration: '2 h',
    address: 'São Carlos, SP — endereço a confirmar',
    hours: 'Horário a confirmar.',
    reviews: [
      {
        name: 'Camila T.',
        rating: 5,
        text: 'As exposições renderam uma visita interessante e várias conversas depois.'
      },
      {
        name: 'Bruno C.',
        rating: 4,
        text: 'Vale reservar tempo para ver tudo com calma.'
      },
      {
        name: 'Nina L.',
        rating: 5,
        text: 'Gostei da variedade de assuntos apresentados.'
      }
    ]
  }
];

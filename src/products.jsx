// src/products.js

// Importa todas as imagens de todas as categorias de forma antecipada
const imagens = import.meta.glob('./assets/*/*.png', { eager: true, import: 'default' });

function normalizar(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-'); // substitui espaços e caracteres especiais por '-'
}

// Lista de produtos com nome, categoria e unidades
const produtos = [
  {
    "nome": "Abacate",
    "categoria": "frutas",
    "unidades": [
      "un",
      "kg"
    ],
    "observacoes": [
      {
        "categoria": "maturação",
        "opcoes": [
          "verde",
          "maduro",
          "média"
        ]
      },
      {
        "categoria": "tamanho",
        "opcoes": [
          "pequeno",
          "médio",
          "grande"
        ]
      }
    ]
  },
  {
    "nome": "Abacaxi",
    "categoria": "frutas",
    "unidades": [
      "un"
    ],
    "observacoes": [
      {
        "categoria": "maturação",
        "opcoes": [
          "verde",
          "maduro",
          "média"
        ]
      },
      {
        "categoria": "tamanho",
        "opcoes": [
          "pequeno",
          "médio",
          "grande"
        ]
      }
    ]
  },
  {
    "nome": "Ameixa",
    "categoria": "frutas",
    "unidades": [
      "un",
      "kg"
    ],
    "observacoes": []
  },
  {
    "nome": "Banana Caturra",
    "categoria": "frutas",
    "unidades": [
      "un",
      "kg"
    ],
    "observacoes": [
      {
        "categoria": "maturação",
        "opcoes": [
          "verde",
          "maduro",
          "média"
        ]
      }
    ]
  },
  {
    "nome": "Banana Prata",
    "categoria": "frutas",
    "unidades": [
      "un",
      "kg"
    ],
    "observacoes": [
      {
        "categoria": "maturação",
        "opcoes": [
          "verde",
          "maduro",
          "média"
        ]
      }
    ]
  },
  {
    "nome": "Banana Terra",
    "categoria": "frutas",
    "unidades": [
      "un",
      "kg"
    ],
    "observacoes": [
      {
        "categoria": "maturação",
        "opcoes": [
          "verde",
          "maduro",
          "média"
        ]
      }
    ]
  },
  {
    "nome": "Côco Seco",
    "categoria": "frutas",
    "unidades": [
      "un",
      "kg"
    ],
    "observacoes": []
  },
  {
    "nome": "Côco Verde",
    "categoria": "frutas",
    "unidades": [
      "un"
    ],
    "observacoes": []
  },
  {
    "nome": "Figo",
    "categoria": "frutas",
    "unidades": [
      "bdj"
    ],
    "observacoes": []
  },
  {
    "nome": "Goiaba",
    "categoria": "frutas",
    "unidades": [
      "un",
      "kg"
    ],
    "observacoes": [
      {
        "categoria": "maturação",
        "opcoes": [
          "verde",
          "maduro",
          "média"
        ]
      }
    ]
  },
  {
    "nome": "Kiwi",
    "categoria": "frutas",
    "unidades": [
      "un",
      "kg"
    ],
    "observacoes": []
  },
  { "nome": 'Laranja Pera Rio', unidades: ['un', 'kg'], categoria: 'frutas' },
  { "nome": 'Laranja Bahia', unidades: ['un', 'kg'], categoria: 'frutas' },
  { "nome": 'Limão Tahiti', unidades: ['un', 'kg'], categoria: 'frutas' },
  { "nome": 'Limão Siciliano', unidades: ['un', 'kg'], categoria: 'frutas' },
  { "nome": 'Maçã Fuji', unidades: ['un', 'kg'], categoria: 'frutas' },
  { "nome": 'Maçã Gala', unidades: ['un', 'kg'], categoria: 'frutas' },
  { "nome": 'Maçã Verde', unidades: ['un', 'kg'], categoria: 'frutas' },
  { "nome": 'Mamão Formoso', unidades: ['un', 'kg'], categoria: 'frutas' },
  { "nome": 'Mamão Papaya', unidades: ['un', 'kg'], categoria: 'frutas' },
  { "nome": 'Manga Palmer', unidades: ['un', 'kg'], categoria: 'frutas' },
  { "nome": 'Manga Tomy', unidades: ['un', 'kg'], categoria: 'frutas' },
  { "nome": 'Maracujá', unidades: ['un', 'kg'], categoria: 'frutas' },
  { "nome": 'Melancia', unidades: ['un', 'kg'], categoria: 'frutas' },
  { "nome": 'Melão', unidades: ['un', 'kg'], categoria: 'frutas' },
  { "nome": 'Mexerica Pokan', unidades: ['un', 'kg'], categoria: 'frutas' },
  { "nome": 'Morango', unidades: ['bdj', 'kg'], categoria: 'frutas' },
  { "nome": 'Morango Cart', unidades: ['bdj', 'kg'], categoria: 'frutas' },
  { "nome": 'Pêra', unidades: ['un', 'kg'], categoria: 'frutas' },
  { "nome": 'Pêssego', unidades: ['un', 'kg'], categoria: 'frutas' },
  { "nome": 'Pitaya', unidades: ['un', 'kg'], categoria: 'frutas' },
  { "nome": 'Tangerina Importada', unidades: ['un', 'kg'], categoria: 'frutas' },
  {
    "nome": "Uva Rubi",
    "categoria": "frutas",
    "unidades": [
      "bdj",
      "kg"
    ],
    "observacoes": []
  },
  //legumes
  { "nome": 'Abóbora Moranga', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Abobrinha Italiana', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Batata Barôa', unidades: ['bdj', 'kg'], categoria: 'legumes' },
  {
    "nome": "Batata Asterix",
    "categoria": "legumes",
    "unidades": [
      "un",
      "kg"
    ],
    "observacoes": [
      {
        "categoria": "tamanho",
        "opcoes": [
          "pequena",
          "média",
          "grande"
        ]
      }
    ]
  },
  { "nome": 'Batata Bolinha', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Batata Doce Branca', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Batata Doce Roxa', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Batata Inglesa Clone', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Batata Inglesa', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Batata Suja', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Berinjela', unidades: ['um', 'kg'], categoria: 'legumes' },
  { "nome": 'Beterraba', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Brócolis', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Cebola', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Cebola Cocão', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Cebola Miúda', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Cebola Roxa', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Cenoura', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Chuchu', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Couve Flor', unidades: ['un'], categoria: 'legumes' },
  { "nome": 'Ervilha', unidades: ['bdj'], categoria: 'legumes' },
  { "nome": 'Inhame/cará', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Mandioca Amarela', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Mandioca Cacau', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Pepino', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Pepino Japonês', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Pimentão Amarelo', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Pimentão Verde', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Pimentão Vermelho', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Quiabo', unidades: ['bdj', 'kg'], categoria: 'legumes' },
  { "nome": 'Repolho', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Repolho Roxo', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Tomate Andreia', unidades: ['un', 'kg'], categoria: 'legumes' },
  { "nome": 'Tomate SG Amarelo', unidades: ['bdj', 'kg'], categoria: 'legumes' },
  { "nome": 'Tomate SG Vermelho', unidades: ['bdj', 'kg'], categoria: 'legumes' },
  { "nome": 'Vagem', unidades: ['bdj', 'kg'], categoria: 'legumes' },

  // OUTROS
  {
    "nome": "Alho com casca",
    "categoria": "outros",
    "unidades": [
      "un",
      "pente"
    ],
    "observacoes": [
      {
        "categoria": "tipo",
        "opcoes": [
          "com casca",
          "descascado"
        ]
      }
    ]
  },
  { "nome": 'Alho Descascado', unidades: ['bdj', 'kg'], categoria: 'outros' },
  { "nome": 'Gengibre', unidades: ['un', 'bdj'], categoria: 'outros' },
  { "nome": 'Ovo Branco', unidades: ['un', 'pente'], categoria: 'outros' },
  { "nome": 'Ovo de Codorna', unidades: ['un', 'pente'], categoria: 'outros' },

  // VERDURAS
  { "nome": 'Acelga', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Agrião', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Alecrim', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Alface Americana', unidades: ['un'], categoria: 'verduras' },
  {
    "nome": "Alface Crespa",
    "categoria": "verduras",
    "unidades": [
      "un"
    ],
    "observacoes": [
      {
        "categoria": "tipo de folha",
        "opcoes": [
          "inteira",
          "picada"
        ]
      }
    ]
  },
  { "nome": 'Alface Lisa', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Alface Roxa', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Alho poró', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Almeirão', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Cebolete', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Cebolinha', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Chicória', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Coentro', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Couve', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Espinafre', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Hortelã', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Manjericão', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Mostarda', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Radicchio', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Rúcula', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Salsa', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Salsa Crespa', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Salsão', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Sálvia', unidades: ['un'], categoria: 'verduras' },
  { "nome": 'Tomilho', unidades: ['un'], categoria: 'verduras' }
];

// Associa imagem ao produto com base na pasta da categoria e nome do arquivo
produtos.forEach((produto) => {
  const nomeArquivo = normalizar(produto.nome);
  const caminhoEsperado = `./assets/${produto.categoria}/${nomeArquivo}.png`;

  if (caminhoEsperado in imagens) {
    produto.img = imagens[caminhoEsperado];
  } else {
    produto.img = null; // ou undefined
  }

  // Também adiciona um campo `label` para exibição
  produto.label = produto.nome;
});

export default produtos;

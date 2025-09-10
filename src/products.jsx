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
          "maduro",
		  "verde"
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
          "maduro",
		  "verde"
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
      "kg",
	  "penca",
	  "cx"
    ],
    "observacoes": [
      {
        "categoria": "maturação",
        "opcoes": [
          "maduro",
		  "de vez",
		  "verde"             
        ]
      }
    ]
  },
  {
    "nome": "Banana Prata",
    "categoria": "frutas",
    "unidades": [
      "un",
      "kg",
	  "penca",
	  "cx"
    ],
    "observacoes": [
      {
        "categoria": "maturação",
        "opcoes": [
          "maduro",
		  "de vez",
		  "verde" 
        ]
      }
    ]
  },
  {
    "nome": "Banana Terra",
    "categoria": "frutas",
    "unidades": [
      "un",
      "kg",
	  "penca",
	  "cx"
    ],
    "observacoes": [
      {
        "categoria": "maturação",
        "opcoes": [
          "maduro",
		  "de vez",
		  "verde" 
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
    "observacoes": []
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
  { 
	"nome": 'Laranja Pera Rio', 
	"categoria": 'frutas',
	"unidades": [
		"un", 
		"kg",
		"sc"
	], 
	"observacoes": []
  },
  { 
	"nome": 'Laranja Bahia',
	"categoria": 'frutas',
	"unidades": [
		'un', 
		'kg',
		'cx'
	], 
	"observacoes": []
  },
  { 
	"nome": 'Limão Tahiti', 
	"categoria": 'frutas',
	"unidades": [
		'un', 
		'kg',
		'sc'
	],
	"observacoes": []
  },
  { 
	"nome": 'Limão Siciliano',
	"categoria": 'frutas',
	"unidades": [
		'un', 
		'kg',
		'cx'
	],
	"observacoes": []
  },
  { 
	"nome": 'Maçã Fuji', 
	"categoria": 'frutas',
	"unidades": [
		'un',
		'kg',
		'cx'
	],
	"observacoes": []
  },
  { 
	"nome": 'Maçã Gala', 
	"categoria": 'frutas',
	"unidades": [
		'un',
		'kg',
		'cx'
	],
	"observacoes": []
  },
  { 
	"nome": 'Maçã Verde', 
	"categoria": 'frutas',
	"unidades": [
		'un',
		'kg',
		'cx'
	],
	"observacoes": []
  },
  { 
	"nome": 'Mamão Formoso',
	"categoria": 'frutas',
	"unidades": [
		'un',
		'kg',
		'cx'
	],
	"observacoes": []
  },
  { 
	"nome": 'Mamão Papaya',
	"categoria": 'frutas',
	"unidades": [
		'un', 
		'kg',
		'cx'
	],
	"observacoes": [
      {
        "categoria": "maturação",
        "opcoes": [
          "maduro",
		  "de vez",
		  "verde" 
        ]
      }
    ]		
  },
  { 
	"nome": 'Manga Palmer', 
	"categoria": 'frutas',
	"unidades": [
		'un',
		'kg',
		'cx'
	], 
	"observacoes": [
      {
        "categoria": "maturação",
        "opcoes": [
          "maduro",
		  "de vez",
		  "verde" 
        ]
      }
    ]
  },
  { 
	"nome": 'Manga Tomy', 
	"categoria": 'frutas',
	"unidades": [
		'un',
		'kg',
		'cx'
	],
"observacoes": [
      {
        "categoria": "maturação",
        "opcoes": [
          "maduro",
		  "de vez",
		  "verde" 
        ]
      }
    ]	
  },
  { 
	"nome": 'Maracujá',
	"categoria": 'frutas',
 	"unidades": [
		'un', 
		'kg', 
		'sc'
	],
	"observacoes": []
  },
  { 
	"nome": 'Melancia',
	"categoria": 'frutas', 
	"unidades": [
		'un', 
		'kg'
	],
	"observacoes": []	
  },
  { 
	"nome": 'Melão', 
	"categoria": 'frutas',
	"unidades": [
		'un', 
		'kg'
	],
	"observacoes": []	
  },
  { 
	"nome": 'Mexerica Pokan', 
	"categoria": 'frutas',
	"unidades": [
		'un', 
		'kg'
	],
    "observacoes": []
  },
  { 
	"nome": 'Morango', 
	"categoria": 'frutas',
	"unidades": [
		'bdj', 
		'cx'
	], 
	"observacoes": [] 
  },
  { 
	"nome": 'Morango Cart', 
	"categoria": 'frutas',
	"unidades": [
		'bdj', 
		'cx'
	],  
	"observacoes": []
  },
  { 
	"nome": 'Pêra', 
	"categoria": 'frutas',
	"unidades": [
		'un', 
		'kg',
		'cx'
	],  
	"observacoes": []
  },
  { 
	"nome": 'Pêssego',
	"categoria": 'frutas',
	"unidades": [
		'un', 
		'kg'
	],  
	"observacoes": []
  },
  { 
	"nome": 'Pitaya', 
	"categoria": 'frutas',
	"unidades": [
		'un', 
		'kg'
	],
	"observacoes": []	
  },
  { 
	"nome": 'Tangerina Importada', 
	"categoria": 'frutas',
	"unidades": [
		'un', 
		'kg'
	], 
	"observacoes": []
  },
  {
    "nome": "Uva Vitória",
    "categoria": "frutas",
    "unidades": [
      "bdj"
    ],
    "observacoes": []
  },
  {
    "nome": "Uva Thompson",
    "categoria": "frutas",
    "unidades": [
      "bdj"
    ],
    "observacoes": []
  },
  
  //Polpas
  {
    "nome": "Polpa Cong. Abacaxi",
    "categoria": "polpas",
    "unidades": [
      "kg"
    ],
    "observacoes": []
  },
  {
    "nome": "Polpa Cong. Acerola",
    "categoria": "polpas",
    "unidades": [
      "kg"
    ],
    "observacoes": []
  },
  {
    "nome": "Polpa Cong. Amora",
    "categoria": "polpas",
    "unidades": [
      "kg"
    ],
    "observacoes": []
  },
  {
    "nome": "Polpa Cong. Caju",
    "categoria": "polpas",
    "unidades": [
      "kg"
    ],
    "observacoes": []
  },
  {
    "nome": "Polpa Cong. Cupuaçu",
    "categoria": "polpas",
    "unidades": [
      "kg"
    ],
    "observacoes": []
  },
  {
    "nome": "Polpa Cong. Framboesa",
    "categoria": "polpas",
    "unidades": [
      "kg"
    ],
    "observacoes": []
  },
  {
    "nome": "Polpa Cong. Graviola",
    "categoria": "polpas",
    "unidades": [
      "kg"
    ],
    "observacoes": []
  },
  {
    "nome": "Polpa Cong. Manga",
    "categoria": "polpas",
    "unidades": [
      "kg"
    ],
    "observacoes": []
  },
  {
    "nome": "Polpa Cong. Maracujá",
    "categoria": "polpas",
    "unidades": [
      "kg"
    ],
    "observacoes": []
  },
  {
    "nome": "Polpa Cong. Mirtilo",
    "categoria": "polpas",
    "unidades": [
      "kg"
    ],
    "observacoes": []
  },
  {
    "nome": "Polpa Cong. Morango",
    "categoria": "polpas",
    "unidades": [
      "kg"
    ],
    "observacoes": []
  },
  {
    "nome": "Polpa Cong. Goiaba",
    "categoria": "polpas",
    "unidades": [
      "kg"
    ],
    "observacoes": []
  },
  {
    "nome": "Polpa Cong. Frutas Vermelhas",
    "categoria": "polpas",
    "unidades": [
      "kg"
    ],
    "observacoes": []
  },
  
  
  //legumes
  { 
	"nome": 'Abóbora Moranga', 
	"categoria": 'legumes',
	"unidades": [
		'un', 
		'kg'
	], 
	"observacoes": []
  },
  { 
	"nome": 'Abobrinha Italiana', 
	"categoria": 'legumes',
	"unidades": [
		'un', 
		'kg'
	], 
	"observacoes": []
  },
  { 
	"nome": 'Batata Barôa', 
	"categoria": 'legumes', 
	"unidades": [
		'bdj', 
		'kg'
	], 
	"observacoes": []
  },
  {
    "nome": "Batata Asterix",
    "categoria": "legumes",
    "unidades": [
      "un",
      "kg",
	  'sc'
    ],
    "observacoes": []     
  },
  { 
	"nome": 'Batata Bolinha', 
	"categoria": 'legumes',
	"unidades": [
		'un', 
		'kg',
		'sc'
	], 
	"observacoes": []
  },
  { 
	"nome": 'Batata Doce Branca', 
	"categoria": 'legumes',
	"unidades": [
		'un',
		'kg'
	],
	"observacoes": []
  },
  { 
	"nome": 'Batata Doce Roxa',
	"categoria": 'legumes',
	"unidades": [
		'un',
		'kg'
	],
	"observacoes": []
  },
  { 
	"nome": 'Batata Inglesa Clone',
	"categoria": 'legumes',
	"unidades": [
		'un',
		'kg',
		'sc'
	],
	"observacoes": []
  },
  { 
	"nome": 'Batata Inglesa', 
	"categoria": 'legumes', 
	"unidades": [
		'un',
		'kg',
		'sc'
	], 
	"observacoes": []
  },
  { 
	"nome": 'Batata Suja',
	"categoria": 'legumes',
	"unidades": [
		'un',
		'kg',
		'sc'
	],
	"observacoes": []
  },
  { 
	"nome": 'Berinjela', 
	"categoria": 'legumes',
	"unidades": [
		'un', 
		'kg'
	],
	"observacoes": []
  },
  { 
	"nome": 'Beterraba', 
	"categoria": 'legumes',
	"unidades": [
		'un', 
		'kg',
		'sc'
	],  
	"observacoes": []
  },
  { 
	"nome": 'Brócolis', 
	"categoria": 'legumes',
	"unidades": [
		'un'
	],
	"observacoes": []	
  },
  { 
	"nome": 'Cebola', 
	"categoria": 'legumes',
	"unidades": [
		'un', 
		'kg',
		'sc'
	],
	"observacoes": []	
  },
  { 
	"nome": 'Cebola Cocão', 
	"categoria": 'legumes',
	"unidades": [
		'un',
		'kg',
		'sc'
	],  
	"observacoes": []
  },
  { 
	"nome": 'Cebola Miúda', 
	"categoria": 'legumes', 
	"unidades": [
		'un',
		'kg',
		'sc'
	], 
	"observacoes": []
  },
  { 
	"nome": 'Cebola Roxa', 
	"categoria": 'legumes',
	"unidades": [
		'un', 
		'kg',
		'sc'
	],
	"observacoes": []
  },
  { 
	"nome": 'Cenoura', 
	"categoria": 'legumes', 
	"unidades": [
		'un', 
		'kg',
		'cx'
	], 
	"observacoes": []
  },
  { 
	"nome": 'Chuchu', 
	"categoria": 'legumes',
	"unidades": [
		'un', 
		'kg'
	], 
	"observacoes": []
  },
  { 
	"nome": 'Couve Flor', 
	"categoria": 'legumes',
	"unidades": [
		'un'
	],
	"observacoes": []
  },
  { 
	"nome": 'Ervilha', 
	"categoria": 'legumes',
	"unidades": [
		'bdj'
	],
	"observacoes": []
  },
  { 
	"nome": 'Inhame/cará',
	"categoria": 'legumes',
	"unidades": [
		'un', 
		'kg'
	],
	"observacoes": []
  },
  { 
	"nome": 'Mandioca Amarela', 
	"categoria": 'legumes',
	"unidades": [
		'un', 
		'kg',
		'bdj'
	],
	"observacoes": []
  },
  { 
	"nome": 'Mandioca Cacau', 
	"categoria": 'legumes',
	"unidades": [
		'un',
		'kg',
		'bdj'
	], 
	"observacoes": []
  },
  { 
	"nome": 'Pepino',
	"categoria": 'legumes',
	"unidades": [
		'un', 
		'kg'
	],
	"observacoes": []
  },
  { 
	"nome": 'Pepino Japonês', 
	"categoria": 'legumes',
	"unidades": [
		'kg',
		'bdj'
	],
	"observacoes": []
  },
  { 
	"nome": 'Pimentão Amarelo',
	"categoria": 'legumes',
	"unidades": [
		'un',
		'kg'
	],
	"observacoes": []
  },
  {
	"nome": 'Pimentão Verde', 
	"categoria": 'legumes',
	"unidades": [
		'un',
		'kg'
	],
	"observacoes": []
  },
  {
	"nome": 'Pimentão Vermelho',
	"categoria": 'legumes',
	"unidades": [
		'un',
		'kg'
	],
	"observacoes": []
  },
  { 
	"nome": 'Quiabo',
	"categoria": 'legumes',
	"unidades": [
		'bdj',
		'kg'
	],
	"observacoes": []
  },
  { 
	"nome": 'Repolho Verde', 
	"categoria": 'legumes',
	"unidades": [
		'un',
		'kg'
	],
	"observacoes": []
  },
  { 
	"nome": 'Repolho Roxo',
	"categoria": 'legumes',
	"unidades": [
		'un',
		'kg'
	],
	"observacoes": []
  },
  { 
	"nome": 'Tomate Andreia',
	"categoria": 'legumes',
 	"unidades": [
		'un',
		'kg',
		'cx'
	],
	"observacoes": []
  },
  { 
	"nome": 'Tomate SG Amarelo', 
	"categoria": 'legumes',
	"unidades": [
		'bdj',
		'kg',
		'cx'
	],
	"observacoes": []
  },
  { 
	"nome": 'Tomate SG Vermelho',
	"categoria": 'legumes',
	"unidades": [
		'bdj',
		'kg',
		'cx'
	],
	"observacoes": []
  },
  { 
	"nome": 'Vagem',
	"categoria": 'legumes',
	"unidades": [
		'bdj',
		'kg'
	],
	"observacoes": []
  },

  // OUTROS
  {
    "nome": "Alho com casca",
    "categoria": "outros",
    "unidades": [
      "un",
      "kg"
    ],
    "observacoes": []
  },
  { 
	"nome": 'Alho Descascado', 
	"categoria": 'outros',
	"unidades": [
		'bdj',
		'kg'
	],
	"observacoes": []
  },
  {
	"nome": 'Gengibre', 
	"categoria": 'outros',
	"unidades": [
		'un', 
		'bdj',
		'kg'
	],
	"observacoes": []
  },
  { 
	"nome": 'Ovo Branco', 
	"categoria": 'outros',
	"unidades": [
		'pente',
		'cx'
	],
	"observacoes": []
  },
  { 
	"nome": 'Ovo de Codorna',
	"categoria": 'outros',
	"unidades": [
		'pente'
	],
	"observacoes": []
  },

  // VERDURAS
  { 
	"nome": 'Acelga', 
	"categoria": 'verduras',
	"unidades": [
		'un'
	],
	"observacoes": []
  },
  {
	"nome": 'Agrião Hidropônico',
	"categoria": 'verduras',
	"unidades": [
		'un'
	],
	"observacoes": []
  },	
  { 
	"nome": 'Alecrim', 
	"categoria": 'verduras',
	"unidades": [
		'un'
	],
	"observacoes": []
  },
  { 
	"nome": 'Alface Americana',
	"categoria": 'verduras',
 	"unidades": [
		'un'
	],
	"observacoes": []
  },
  {
    "nome": "Alface Crespa",
    "categoria": "verduras",
    "unidades": [
      "un"
    ],    
	"observacoes": []
  },
  { 
	"nome": 'Alface Lisa', 
	"categoria": 'verduras',
	"unidades": [
		'un'
	],
	"observacoes": []
  },
  {
	"nome": 'Alface Roxa',
	"categoria": 'verduras',
 	"unidades": [
		'un'
	],
	"observacoes": []
  },
  { 
	"nome": 'Alho poró',
	"categoria": 'verduras',
	"unidades": [
		'un'
	],
	"observacoes": []
  },
  {
	"nome": 'Almeirão', 
	"categoria": 'verduras',
	"unidades": [
		'un'
	],
	"observacoes": []
  },
  {
	"nome": 'Cebolete',
	"categoria": 'verduras',
 	"unidades": [
		'un'
	],
	"observacoes": []
  },
  {
	"nome": 'Cebolinha', 
	"categoria": 'verduras',
	"unidades": [
		'un'
	],
	"observacoes": []
  },
  { 
	"nome": 'Chicória',
	"categoria": 'verduras',
	"unidades": [
		'un'
	],
	"observacoes": []
  },
  {
	"nome": 'Coentro', 
	"categoria": 'verduras',
	"unidades": [
		'un'
	],
	"observacoes": []
  },
  {
	"nome": 'Couve',
	"categoria": 'verduras',
	"unidades": [
		'un'
	],	
	"observacoes": []
  },
  { 
	"nome": 'Espinafre', 
	"categoria": 'verduras',
	"unidades": [
		'un'
	],
	"observacoes": []
  },
  { 
	"nome": 'Hortelã', 
	"categoria": 'verduras', 
	"unidades": [
		'un'
	],
	"observacoes": []
  },
  { 
	"nome": 'Manjericão',
	"categoria": 'verduras',
	"unidades": [
		'un'
	],
	"observacoes": []
  },
  { 
	"nome": 'Mostarda',
	"categoria": 'verduras',
	"unidades": [
		'un'
	],
	"observacoes": []
  },
  { 
	"nome": 'Radicchio',
	"categoria": 'verduras',
 	"unidades": [
		'un'
	],
	"observacoes": []
  },
  {
	"nome": 'Rúcula',
	"categoria": 'verduras',
	"unidades": [
		'un'
	],
	"observacoes": []
  },
  {
	"nome": 'Salsa', 
	 "categoria": 'verduras',
	"unidades": [
		'un'
	],
	"observacoes": []
  },
  {
	"nome": 'Salsa Crespa',
	"categoria": 'verduras',
 	"unidades": [
		'un'
	],
	"observacoes": []
  },
  { 
	"nome": 'Salsão', 
	"categoria": 'verduras', 
	"unidades": [
		'un'
	],
	"observacoes": []
  },
  { 
	"nome": 'Sálvia',
	"categoria": 'verduras',
	"unidades": [
		'un'
	],
	"observacoes": []
  },
  { 
	"nome": 'Tomilho', 
	"categoria": 'verduras',
	"unidades": [
		'un'
	],
	"observacoes": []
  }
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

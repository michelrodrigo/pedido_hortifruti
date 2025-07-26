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
	//Frutas
  { nome: 'Abacate', categoria: 'frutas', observacoes: [
    { categoria: 'maturação', opcoes: ['verde', 'maduro', 'média'] },
    { categoria: 'tamanho', opcoes: ['pequeno', 'médio', 'grande'] }
  ] },
  { nome: 'Abacaxi', categoria: 'frutas', observacoes: [
    { categoria: 'maturação', opcoes: ['verde', 'maduro', 'média'] },
    { categoria: 'tamanho', opcoes: ['pequeno', 'médio', 'grande'] }
  ] },
  { nome: 'Ameixa', categoria: 'frutas', observacoes: [] },
  { nome: 'Banana Caturra', categoria: 'frutas', observacoes: [
    { categoria: 'maturação', opcoes: ['verde', 'maduro', 'média'] }
  ] },
  { nome: 'Banana Prata', categoria: 'frutas', observacoes: [
    { categoria: 'maturação', opcoes: ['verde', 'maduro', 'média'] }
  ] },
  { nome: 'Banana Terra', categoria: 'frutas', observacoes: [
    { categoria: 'maturação', opcoes: ['verde', 'maduro', 'média'] }
  ] },
  { nome: 'Côco Seco', categoria: 'frutas', observacoes: [] },
  { nome: 'Côco Verde', categoria: 'frutas', observacoes: [] },
  { nome: 'Figo', categoria: 'frutas', observacoes: [] },
  { nome: 'Goiaba', categoria: 'frutas', observacoes: [
    { categoria: 'maturação', opcoes: ['verde', 'maduro', 'média'] }
  ] },
  { nome: 'Kiwi', categoria: 'frutas', observacoes: [] },
  { nome: 'Laranja Pera Rio', categoria: 'frutas', observacoes: [] },
  { nome: 'Laranja Bahia', categoria: 'frutas', observacoes: [] },
  { nome: 'Limão Tahiti', categoria: 'frutas', observacoes: [] },
  { nome: 'Limão Siciliano', categoria: 'frutas', observacoes: [] },
  { nome: 'Maçã Fuji', categoria: 'frutas', observacoes: [] },
  { nome: 'Maçã Gala', categoria: 'frutas', observacoes: [] },
  { nome: 'Maçã Verde', categoria: 'frutas', observacoes: [] },
  { nome: 'Mamão Formoso', categoria: 'frutas', observacoes: [
    { categoria: 'maturação', opcoes: ['verde', 'maduro', 'média'] },
    { categoria: 'tamanho', opcoes: ['pequeno', 'médio', 'grande'] }
  ] },
  { nome: 'Mamão Papaya', categoria: 'frutas', observacoes: [
    { categoria: 'maturação', opcoes: ['verde', 'maduro', 'média'] },
    { categoria: 'tamanho', opcoes: ['pequeno', 'médio', 'grande'] }
  ] },
  { nome: 'Manga Palmer', categoria: 'frutas', observacoes: [
    { categoria: 'maturação', opcoes: ['verde', 'maduro', 'média'] },
    { categoria: 'tamanho', opcoes: ['pequeno', 'médio', 'grande'] }
  ] },
  { nome: 'Manga Tomy', categoria: 'frutas', observacoes: [
    { categoria: 'maturação', opcoes: ['verde', 'maduro', 'média'] },
    { categoria: 'tamanho', opcoes: ['pequeno', 'médio', 'grande'] }
  ] },
  { nome: 'Maracujá', categoria: 'frutas', observacoes: [] },
  { nome: 'Melancia', categoria: 'frutas', observacoes: [
    { categoria: 'maturação', opcoes: ['verde', 'maduro', 'média'] },
    { categoria: 'tamanho', opcoes: ['pequeno', 'médio', 'grande'] }
  ] },
  { nome: 'Melão', categoria: 'frutas', observacoes: [
    { categoria: 'maturação', opcoes: ['verde', 'maduro', 'média'] },
    { categoria: 'tamanho', opcoes: ['pequeno', 'médio', 'grande'] }
  ] },
  { nome: 'Mexerica Pokan', categoria: 'frutas', observacoes: [] },
  { nome: 'Morango', categoria: 'frutas', observacoes: [] },
  { nome: 'Morango Cart', categoria: 'frutas', observacoes: [] },
  { nome: 'Pêra', categoria: 'frutas', observacoes: [
    { categoria: 'maturação', opcoes: ['verde', 'maduro', 'média'] },
    { categoria: 'tamanho', opcoes: ['pequeno', 'médio', 'grande'] }
  ] },
  { nome: 'Pêssego', categoria: 'frutas', observacoes: [
    { categoria: 'maturação', opcoes: ['verde', 'maduro', 'média'] },
    { categoria: 'tamanho', opcoes: ['pequeno', 'médio', 'grande'] }
  ] },
  { nome: 'Pitaya', categoria: 'frutas', observacoes: [] },
  { nome: 'Tangerina Importada', categoria: 'frutas', observacoes: [] },
  { nome: 'Uva Rubi', categoria: 'frutas', observacoes: [] },
  { nome: 'Uva Verde', categoria: 'frutas', observacoes: [] },
  
  //Legumes
  { nome: 'Abóbora Moranga', categoria: 'legumes', observacoes: [] },
  { nome: 'Abobrinha Italiana', categoria: 'legumes', observacoes: [] },
  { nome: 'Batata Barôa', categoria: 'legumes', observacoes: [
    { categoria: 'tamanho', opcoes: ['pequena', 'média', 'grande'] }
  ] },
  { nome: 'Batata Asterix', categoria: 'legumes', observacoes: [
    { categoria: 'tamanho', opcoes: ['pequena', 'média', 'grande'] }
  ] },
  { nome: 'Batata Bolinha', categoria: 'legumes', observacoes: [
    { categoria: 'tamanho', opcoes: ['pequena', 'média', 'grande'] }
  ] },
  { nome: 'Batata Doce Branca', categoria: 'legumes', observacoes: [
    { categoria: 'tamanho', opcoes: ['pequena', 'média', 'grande'] }
  ] },
  { nome: 'Batata Doce Roxa', categoria: 'legumes', observacoes: [
    { categoria: 'tamanho', opcoes: ['pequena', 'média', 'grande'] }
  ] },
  { nome: 'Batata Inglesa Clone', categoria: 'legumes', observacoes: [
    { categoria: 'tamanho', opcoes: ['pequena', 'média', 'grande'] }
  ] },
  { nome: 'Batata Inglesa', categoria: 'legumes', observacoes: [
    { categoria: 'tamanho', opcoes: ['pequena', 'média', 'grande'] }
  ] },
  { nome: 'Batata Suja', categoria: 'legumes', observacoes: [
    { categoria: 'tamanho', opcoes: ['pequena', 'média', 'grande'] }
  ] },
  { nome: 'Berinjela', categoria: 'legumes', observacoes: [
    { categoria: 'formato', opcoes: ['curta', 'média', 'longa'] }
  ] },
  { nome: 'Beterraba', categoria: 'legumes', observacoes: [] },
  { nome: 'Brócolis', categoria: 'legumes', observacoes: [] },
  { nome: 'Cebola', categoria: 'legumes', observacoes: [] },
  { nome: 'Cebola Cocão', categoria: 'legumes', observacoes: [] },
  { nome: 'Cebola Miúda', categoria: 'legumes', observacoes: [] },
  { nome: 'Cebola Roxa', categoria: 'legumes', observacoes: [] },
  { nome: 'Cenoura', categoria: 'legumes', observacoes: [
    { categoria: 'tamanho', opcoes: ['pequena', 'média', 'grande'] }
  ] },
  { nome: 'Chuchu', categoria: 'legumes', observacoes: [] },
  { nome: 'Couve Flor', categoria: 'legumes', observacoes: [] },
  { nome: 'Ervilha', categoria: 'legumes', observacoes: [] },
  { nome: 'Inhame/cará', categoria: 'legumes', observacoes: [
    { categoria: 'tamanho', opcoes: ['pequena', 'média', 'grande'] }
  ] },
  { nome: 'Mandioca Amarela', categoria: 'legumes', observacoes: [
    { categoria: 'tamanho', opcoes: ['pequena', 'média', 'grande'] }
  ] },
  { nome: 'Mandioca Cacau', categoria: 'legumes', observacoes: [
    { categoria: 'tamanho', opcoes: ['pequena', 'média', 'grande'] }
  ] },
  { nome: 'Pepino', categoria: 'legumes', observacoes: [
    { categoria: 'tamanho', opcoes: ['pequena', 'média', 'grande'] },
    { categoria: 'formato', opcoes: ['curta', 'média', 'longa'] }
  ] },
  { nome: 'Pepino Japonês', categoria: 'legumes', observacoes: [
    { categoria: 'tamanho', opcoes: ['pequena', 'média', 'grande'] },
    { categoria: 'formato', opcoes: ['curta', 'média', 'longa'] }
  ] },
  { nome: 'Pimentão Amarelo', categoria: 'legumes', observacoes: [] },
  { nome: 'Pimentão Verde', categoria: 'legumes', observacoes: [] },
  { nome: 'Pimentão Vermelho', categoria: 'legumes', observacoes: [] },
  { nome: 'Quiabo', categoria: 'legumes', observacoes: [] },
  { nome: 'Repolho', categoria: 'legumes', observacoes: [] },
  { nome: 'Repolho Roxo', categoria: 'legumes', observacoes: [] },
  { nome: 'Tomate Andreia', categoria: 'legumes', observacoes: [] },
  { nome: 'Tomate SG Amarelo', categoria: 'legumes', observacoes: [] },
  { nome: 'Tomate SG Vermelho', categoria: 'legumes', observacoes: [] },
  { nome: 'Vagem', categoria: 'legumes', observacoes: [] },
  
  //Outros
  { nome: 'Alho com casca', categoria: 'outros', observacoes: [
    { categoria: 'tipo', opcoes: ['com casca', 'descascado'] }
  ] },
  { nome: 'Alho Descascado', categoria: 'outros', observacoes: [
    { categoria: 'tipo', opcoes: ['com casca', 'descascado'] }
  ] },
  { nome: 'Gengibre', categoria: 'outros', observacoes: [] },
  { nome: 'Ovo Branco', categoria: 'outros', observacoes: [
    { categoria: 'tamanho', opcoes: ['pequeno', 'médio', 'grande'] },
    { categoria: 'tipo de criação', opcoes: ['caipira', 'granja'] }
  ] },
  { nome: 'Ovo de Codorna', categoria: 'outros', observacoes: [
    { categoria: 'tamanho', opcoes: ['pequeno', 'médio', 'grande'] },
    { categoria: 'tipo de criação', opcoes: ['caipira', 'granja'] }
  ] },
  
  //Verduras
  { nome: 'Acelga', categoria: 'verduras', observacoes: [] },
  { nome: 'Agrião', categoria: 'verduras', observacoes: [] },
  { nome: 'Alecrim', categoria: 'verduras', observacoes: [] },
  { nome: 'Alface Americana', categoria: 'verduras', observacoes: [
    { categoria: 'tipo de folha', opcoes: ['inteira', 'picada'] }
  ] },
  { nome: 'Alface Crespa', categoria: 'verduras', observacoes: [
    { categoria: 'tipo de folha', opcoes: ['inteira', 'picada'] }
  ] },
  { nome: 'Alface Lisa', categoria: 'verduras', observacoes: [
    { categoria: 'tipo de folha', opcoes: ['inteira', 'picada'] }
  ] },
  { nome: 'Alface Roxa', categoria: 'verduras', observacoes: [
    { categoria: 'tipo de folha', opcoes: ['inteira', 'picada'] }
  ] },
  { nome: 'Alho poró', categoria: 'verduras', observacoes: [] },
  { nome: 'Almeirão', categoria: 'verduras', observacoes: [] },
  { nome: 'Cebolete', categoria: 'verduras', observacoes: [] },
  { nome: 'Cebolinha', categoria: 'verduras', observacoes: [] },
  { nome: 'Chicória', categoria: 'verduras', observacoes: [] },
  { nome: 'Coentro', categoria: 'verduras', observacoes: [] },
  { nome: 'Couve', categoria: 'verduras', observacoes: [
    { categoria: 'tipo de folha', opcoes: ['inteira', 'picada'] }
  ] },
  { nome: 'Espinafre', categoria: 'verduras', observacoes: [
    { categoria: 'tipo de folha', opcoes: ['inteira', 'picada'] }
  ] },
  { nome: 'Hortelã', categoria: 'verduras', observacoes: [] },
  { nome: 'Manjericão', categoria: 'verduras', observacoes: [] },
  { nome: 'Mostarda', categoria: 'verduras', observacoes: [] },
  { nome: 'Radicchio', categoria: 'verduras', observacoes: [] },
  { nome: 'Rúcula', categoria: 'verduras', observacoes: [
    { categoria: 'tipo de folha', opcoes: ['inteira', 'picada'] }
  ] },
  { nome: 'Salsa', categoria: 'verduras', observacoes: [] },
  { nome: 'Salsa Crespa', categoria: 'verduras', observacoes: [] },
  { nome: 'Salsão', categoria: 'verduras', observacoes: [] },
  { nome: 'Sálvia', categoria: 'verduras', observacoes: [] },
  { nome: 'Tomilho', categoria: 'verduras', observacoes: [] },
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

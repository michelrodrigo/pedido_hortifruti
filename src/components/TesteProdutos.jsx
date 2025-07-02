// src/components/TesteProdutos.jsx
import React from 'react';
import produtosComImagens from '../products';

const categorias = ['frutas', 'legumes', 'verduras', 'outros'];

export default function TesteProdutos() {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Todos os produtos</h2>
      {categorias.map((categoria) => {
        const produtosDaCategoria = produtosComImagens.filter(
          (p) => p.categoria === categoria
        );
        if (produtosDaCategoria.length === 0) return null;

        return (
          <div key={categoria} style={{ marginBottom: '2rem' }}>
            <h3 style={{ textTransform: 'capitalize' }}>{categoria}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {produtosDaCategoria.map((produto) => (
                <div key={produto.nome} style={{ width: '120px', textAlign: 'center' }}>
                  {produto.img ? (
                    <img
                      src={produto.img}
                      alt={produto.nome}
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100px',
                        height: '100px',
                        backgroundColor: '#eee',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '0.8rem',
                        color: '#666',
                        border: '1px dashed #ccc'
                      }}
                    >
                      Sem imagem
                    </div>
                  )}
                  <div>{produto.nome}</div>
                  <small>{produto.unidades?.join(' / ')}</small>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

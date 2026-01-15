import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import { PRODUCTS } from '../data/products';
import '../styles/pages.css';

const ProductsPage = () => {
  return (
    <div>
      <h2 className="page-title">Nasze pyszne ciasta 🍰</h2>
      <div className="products-grid">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;

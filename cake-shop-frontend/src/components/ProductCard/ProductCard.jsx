import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`Dodano ${quantity}x ${product.name} do koszyka!`);
    setQuantity(1);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.desc}</p>
        <div className="product-price">{product.price} PLN</div>
        <div className="product-quantity">
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
          />
          <span>szt.</span>
        </div>
        <button className="btn btn-add-cart" onClick={handleAddToCart}>
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

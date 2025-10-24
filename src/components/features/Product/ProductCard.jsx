import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Link from '../../common/Link';
import { CartContext } from '../../../context/CartContextCore.js';

const ProductCard = ({
  product,
  className = '',
}) => {
  const { addToCart } = React.useContext(CartContext);
  const { id, name, price, imageUrl, description } = product;
  
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card 
      elevated
      className={`h-full flex flex-col ${className}`}
    >
      <div className="relative pt-[100%]">
        <img 
          src={imageUrl} 
          alt={name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <Link 
          to={`/product/${id}`}
          className="text-lg font-semibold hover:text-blue-600 mb-1 block"
        >
          {name}
        </Link>
        <p className="text-gray-700 text-sm mb-2 flex-grow">{description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="font-bold">${price.toFixed(2)}</span>
          <Button
            onClick={handleAddToCart}
            ariaLabel={`Add ${name} to cart`}
            variant="primary"
            size="small"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default ProductCard;

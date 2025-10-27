import React from 'react';
import { CartContext } from '../../../context/CartContextCore.js';
import Button from '../../common/Button';
import Icon from '../../common/Icon';
import Badge from '../../common/Badge';

const CartButton = () => {
  const { totalItems, cartModalState } = React.useContext(CartContext);

  return (
    <Button
      {...cartModalState.trigger}
      onClick={cartModalState.toggle}
      className="relative p-2 bg-blue-600 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      ariaLabel={`Open cart with ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
    >
      <Icon name="cart" />
      {totalItems > 0 && (
        <Badge 
          variant="danger" 
          className="absolute -top-1 -right-1 w-5 h-5"
          aria-hidden="true"
        >
          {totalItems}
        </Badge>
      )}
    </Button>
  );
};

export default CartButton;

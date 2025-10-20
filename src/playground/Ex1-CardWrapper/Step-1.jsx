// STEP: 1 - fix syntactic accessibility issues (semantic HTML elements)
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import PropTypes from "prop-types";

export const Card = ({ id, title, description, price, imageSrc }) => {
  const handleAddToCart = () => {
    alert("Success");
  };

  return (
    <li className="flex-shrink-0" id={`card-${id}`}>
      <article
        className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow transform hover:scale-105 focus:ring-2 focus:ring-blue-500 w-[480px] md:w-[600px] lg:w-[620px]"
      >
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-20 md:h-28 lg:h-32 object-cover mb-3 rounded"
        />

        <h2 className="text-lg font-semibold line-clamp-1">{title}</h2>

        <p className="mb-2 text-sm line-clamp-2 h-12 overflow-hidden">
          {description}
        </p>

        <p className="block font-bold mb-2 text-blue-700">{price}</p>

        <button
          onClick={handleAddToCart}
          className="outline-none bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 text-sm w-full transition-colors rounded"
        >
          Add to Cart
        </button>
        {/* ❌ ISSUE 2: Focus-visible not used, outline-none hides focus */}
        {/* ❌ ISSUE 3: No ARIA associations (aria-labelledby/aria-describedby) */}
        {/* ❌ ISSUE 4: Motion-reduce preference ignored in transitions */}
      </article>
    </li>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

const CardWrapper = () => {
  const products = [
    {
      id: "1",
      title: "Wireless Headphones",
      description: "Comfortable over-ear headphones with noise cancellation.",
      price: "Rs 500",
      imageSrc: "/headphone.jpeg",
    },
    {
      id: "2",
      title: "Bluetooth Speaker",
      description: "Portable speaker with high-quality sound.",
      price: "Rs 1200",
      imageSrc: "/behind_the_ear.jpeg",
    },
  ];

  return (
    <ul className="flex flex-wrap justify-center items-start gap-8 py-10">
      {products.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          imageSrc={product.imageSrc}
        />
      ))}
    </ul>
  );
};

export default CardWrapper;

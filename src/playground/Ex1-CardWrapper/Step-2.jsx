// STEP: 2 - use focus-within to add outline while keyboard navigation
import React from "react";
import PropTypes from "prop-types";

export const Card = ({ id, title, description, price, imageSrc }) => {
  const handleAddToCart = () => {
    alert("Success");
  };
  return (
    <li className="flex-shrink-0" id={`card-${id}`}>
      <article
        className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow transform hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500 w-[480px] md:w-[600px] lg:w-[620px]"
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
          className="focus-visible:outline focus-visible:ring-2 focus-visible:ring-blue-500 bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 text-sm w-full transition-colors rounded"
        >
          Add to Cart
        </button>
        {/* ❌ ISSUE 4: No ARIA associations (aria-labelledby/aria-describedby) */}
        {/* ❌ ISSUE 5: Motion-reduce preference ignored in transitions */}
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
    <div className="ex1-card-wrapper p-4">
      <h1 className="text-xl font-semibold m-1">Product List</h1>
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
    </div>
  );
};

export default CardWrapper;

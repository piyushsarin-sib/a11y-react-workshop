// EX1-CardWrapper.jsx: Step 4 improve motion reduction support

// /* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";
import Checkpoints from "./Checkpoints";

export const Card = ({ id, title, description, price, imageSrc }) => {
  const handleAddToCart = () => {
    alert("Success");
  };


  const titleId = `card-title-${id}`;
  const descriptionId = `card-desc-${id}`;
  const priceId = `card-price-${id}`;

  return (
    <li className="flex-shrink-0" id={`card-${id}`}>
      {/* ✅ Done STEP 2: Improve keyboard navigation by using `focus-within` on parent. 
          Replace the existing className with:
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow transform hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500 w-[480px] md:w-[600px] lg:w-[620px]"
      */}
      {/* ✅ Done STEP 3: aria label associations. 
        Use the above IDs to add `aria-labelledby` and `aria-describedby` to the <article> element by uncommenting the lines 35 and 36 */
      }
      {/* ✅ Done STEP 4: Improve motion reduction support by leveraging prefers-reduced-motion media query by replacing the existing className with below:
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow transform hover:scale-105 focus:ring-2 focus:ring-blue-500 w-[480px] md:w-[600px] lg:w-[620px]
          motion-reduce:transform-none
          motion-reduce:hover:scale-100
          motion-reduce:transition-none" */
      }
      <article
        className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow transform hover:scale-105 focus:ring-2 focus:ring-blue-500 w-[480px] md:w-[600px] lg:w-[620px]
          motion-reduce:transform-none
          motion-reduce:hover:scale-100
          motion-reduce:transition-none"
        aria-labelledby={titleId}
        aria-describedby={`${descriptionId} ${priceId}`}
      >
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-20 md:h-28 lg:h-32 object-cover mb-3 rounded"
        />

        {/* ✅ DONE STEP 1: Use a semantic heading tag (<h2>) instead of <div> for better accessibility and page hierarchy */}
        <h2 id={titleId} className="text-lg font-semibold line-clamp-1">{title}</h2>

        <p id={descriptionId} className="mb-2 text-sm line-clamp-2 h-12 overflow-hidden">
          {description}
        </p>

        {/* ✅ DONE STEP 1: Use a semantic paragraph tag (<p>) instead of <div> for better accessibility and page hierarchy */}
        <p id={priceId} className="block font-bold mb-2 text-blue-700">{price}</p>

        {/* ✅ DONE STEP 1: Use a semantic button tag (<button>) instead of <div> with proper readable text and without aria-label for better accessibility and page hierarchy */}
        {/* ✅ DONE STEP 2: Improve keyboard navigation by using `focus-visible`. 
            Replace the existing className with:
            className="focus-visible:outline focus-visible:ring-2 focus-visible:ring-blue-500 bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 text-sm w-full transition-colors rounded"
        */}
        <button
          onClick={handleAddToCart}
          className="focus-visible:outline focus-visible:ring-2 focus-visible:ring-blue-500 bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 text-sm w-full transition-colors rounded"
        >
          Add to Cart
        </button>
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
    <div className="ex1-card-wrapper p-4" style={{ padding: "50px" }}>
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
      <Checkpoints />
    </div>
  );
};

export default CardWrapper;

// EX1-CardWrapper.jsx: Step 0 with all issues

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";
import Checkpoints from "./Checkpoints";
import "./CardWrapper.css";

export const Card = ({ id, title, description, price, imageSrc }) => {
  const handleAddToCart = () => {
    alert("Success");
  };


  const titleId = `card-title-${id}`;
  const descriptionId = `card-desc-${id}`;
  const priceId = `card-price-${id}`;

  return (
    <li className="ex1-card-list-item" id={`card-${id}`}>
      {/* ✏️ TODO STEP 2: Improve keyboard navigation by using `focus-within` on parent. 
          Replace the existing className with:
          className="ex1-card focus-within:ring-2 focus-within:ring-blue-500"
      */}
      {/* ✏️ TODO STEP 3: aria label associations. 
        Use the above IDs to add `aria-labelledby` and `aria-describedby` to the <article> element by uncommenting the lines 35 and 36 */
      }
      {/* ✏️ TODO STEP 4: Improve motion reduction support by leveraging prefers-reduced-motion media query by replacing the existing className with below:
          className="ex1-card focus-within:ring-2 focus-within:ring-blue-500 reduce-motion" */
      }
      <article
        className="ex1-card focus:ring-2 focus:ring-blue-500"
        // aria-labelledby={titleId}
        // aria-describedby={`${descriptionId} ${priceId}`}
      >
        <img
          src={imageSrc}
          alt={title}
          className="ex1-card-image"
        />

        {/* ✏️ TODO STEP 1: Use a semantic heading tag (<h2>) instead of <div> for better accessibility and page hierarchy */}
        <div id={titleId} className="ex1-card-title">{title}</div>

        <p id={descriptionId} className="ex1-card-description">
          {description}
        </p>

        <p id={priceId} className="ex1-card-price">{price}</p>

        {/* ✏️ TODO STEP 1: Use a semantic button tag (<button>) instead of <div> with proper readable text and without aria-label for better accessibility and page hierarchy */}
        {/* ✏️ TODO STEP 2: Improve keyboard navigation by using `focus-visible`. 
            Replace the existing className with:
            className="ex1-card-button focus-visible:outline focus-visible:ring-2 focus-visible:ring-blue-500"
        */}
        <div
          onClick={handleAddToCart}
          aria-label="add"
          className="ex1-card-button outline-none"
        >
          Add to Cart
        </div>
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
    <div className="ex1-card-wrapper">
      <h1 className="ex1-card-wrapper-title">Product List</h1>
      <ul className="ex1-card-list">
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

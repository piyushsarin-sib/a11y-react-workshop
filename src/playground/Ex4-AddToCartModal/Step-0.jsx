import React from "react";
import { DialogOverlay, useDialog } from "@lib/Overlay";
import Button from "@common/Button";
import QuantitySelector from "@common/QuantitySelector";
import Checkpoints from "./Checkpoints";

const product = {
  id: 2,
  name: "Braille Keyboard",
  description: "Keyboard with Braille for visually impaired users.",
  image: "/brailkeyboard.jpeg",
  alt: "Braille keyboard with raised dots on keys",
  price: "Rs 45000",
  category: "vision",
  priceValue: 45000,
};

const AddToCartModal = () => {
  // ✅ COMPLETED : Configure useDialog hook for a Dialog overlay for modal
  const dialogState = useDialog({
    bodyId: "add-to-cart-modal",
    triggerId: "add-to-cart-button",
  });

  return (
    <>
      <Checkpoints />
      {/* ✅ COMPLETED: Connect trigger button to dialog controls by spreading trigger props and onClick handler */}
      <Button
        {...dialogState.trigger}
        onClick={dialogState.open}
        className="px-3 py-1.5 text-sm"
        style={{ width: "48rem", display: "block", margin: "50px auto" }}
        variant="primary"
      >
        Add to Cart
      </Button>

      {/* ✏️ TODO STEP 1: Configure DialogOverlay component with dialog state props */}

      {/* <DialogOverlay
        {...dialogState}
        title={product.name}
        backdrop
        style={{ width: "100%", maxWidth: "48rem" }}
      > */}

      {/* ✅ COMPLETED : Connect modal content to dialog body with aria-describedby by setting div id */}
      <div id={dialogState.body["aria-describedby"]} className="mb-4">
        <p className="mb-4">{product.description}</p>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xl font-bold">{product.price}</span>

          {/* Quantity Selector */}
          <QuantitySelector
            quantity={4}
            onIncrease={() => {}}
            onDecrease={() => {}}
            minQuantity={0}
            ariaLabel={`Quantity selector for ${product.name}`}
          />
        </div>

        <div className="flex justify-between items-center mb-4"></div>
        <div className="flex justify-end mb-4">
          <Button onClick={() => {}} variant={"primary"}>
            Update Cart
          </Button>
        </div>
        <div className="text-center mt-4 border-t pt-3">
          <Button
            onClick={() => {}}
            variant="ghost"
            className="text-lg text-blue-600 hover:text-blue-800 underline"
          >
            Go to Cart
          </Button>
        </div>
      </div>
      {/* </DialogOverlay> */}
    </>
  );
};

export default AddToCartModal;

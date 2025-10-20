import Button from "@common/Button";
import Collection from "@lib/Collections/Collection";
import { useRovingIndex } from "@lib/interactions/keyboard/hooks/useRovingIndex";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Comfortable over-ear headphones with noise cancellation.",
    image: "/headphone.jpeg",
    alt: "Black wireless over-ear headphones",
    price: "Rs 500",
    category: "hearing",
    priceValue: 500,
  },
  {
    id: 2,
    name: "Braille Keyboard",
    description: "Keyboard with Braille for visually impaired users.",
    image: "/brailkeyboard.jpeg",
    alt: "Braille keyboard with raised dots on keys",
    price: "Rs 45000",
    category: "vision",
    priceValue: 45000,
  },
  {
    id: 3,
    name: "Wheelchair",
    description: "Lightweight, foldable wheelchair for easy mobility.",
    image: "/wheelchair.jpeg",
    alt: "Lightweight foldable wheelchair",
    price: "Rs 2500",
    category: "mobility",
    priceValue: 2500,
  },
  {
    id: 4,
    name: "Smart Cane (Obstacle Detector)",
    description: "Uses sensors to detect obstacles and provides alerts via vibrations.",
    image: "/ObstacleDetector.jpeg",
    alt: "Smart cane with obstacle detection sensors",
    price: "Rs 3000",
    category: "vision",
    priceValue: 3000,
  },
  {
    id: 5,
    name: "Behind-The-Ear (BTE) Digital Hearing Aid",
    description: "An entry-level hearing aid that is powerful and durable.",
    image: "/behind_the_ear.jpeg",
    alt: "Behind-the-ear digital hearing aid",
    price: "Rs 8000–25000",
    category: "hearing",
    priceValue: 8000,
  },
  {
    id: 6,
    name: "Sensory Toy Kit for Autism/ADHD",
    description: "A kit of sensory toys designed for children with Autism or ADHD.",
    image: "/SensoryToyKitforAutism.jpeg",
    alt: "Sensory toy kit for Autism and ADHD",
    price: "Rs 1500",
    category: "sensory",
    priceValue: 1500,
  },
];

const ProductsGrid = () => {
  // ✅ STEP 4a: Invoke useRovingIndex hook & pass required props to enable keyboard navigation.

  const gridNav = useRovingIndex({
    items: products,
    orientation: "both",
    // columnsCount: 2,
    defaultActiveKey: products.length > 0 ? products[0].id : null,
  });

  if (products.length === 0) {
    return null;
  }

  return (
    <Collection
      as="ul"
      itemAs="li"
      pattern="grid"
      ariaLabel="Product cards"
      className="grid grid-cols-2  gap-4"
      //  ✅ STEP 4b:  Spread the returned prop getters on Collection
      {...gridNav.getCollectionProps()}
    >
      {products.map((product) => (
        //  ✅ STEP 4c:  Spread the returned prop getters on Collection.Item
        <Collection.Item
          key={product.id}
          className="border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow focus-within:border-blue-500 focus-within:border-2"
          {...gridNav.getItemProps(product.id)}
        >
          <img
            src={product.image}
            alt={product.alt}
            className="w-full h-32 object-cover mb-3 rounded"
          />
          <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
          <p className="mb-2 text-sm line-clamp-2 h-10 overflow-hidden">{product.description}</p>
          <span className="block font-bold mb-2 text-blue-700">{product.price}</span>
          <Button
            onClick={() => {}}
            className="w-full px-3 py-1.5 text-sm focus:ring-0"
            ariaLabel={`Add ${product.name} to cart`}
            variant="primary"
          >
            Add to Cart
          </Button>
        </Collection.Item>
      ))}
    </Collection>

    // <ul className="grid grid-cols-2  gap-4">
    //   {products.map((product) => (
    //     <li
    //       key={product.id}
    //       className="border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-blue-500"
    //     >
    //       <img
    //         src={product.image}
    //         alt={product.alt}
    //         className="w-full h-32 object-cover mb-3 rounded"
    //       />
    //       <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
    //       <p className="mb-2 text-sm line-clamp-2 h-10 overflow-hidden">{product.description}</p>
    //       <span className="block font-bold mb-2 text-blue-700">{product.price}</span>
    //       <Button
    //         onClick={() => {}}
    //         className="w-full px-3 py-1.5 text-sm"
    //         ariaLabel={`Add ${product.name} to cart`}
    //         variant="primary"
    //       >
    //         Add to Cart
    //       </Button>
    //     </li>
    //   ))}
    // </ul>
  );
};

export default ProductsGrid;

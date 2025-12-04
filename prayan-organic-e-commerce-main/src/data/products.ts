import turmericImg from '@/assets/turmeric.jpg';
import chilliImg from '@/assets/chilli.jpg';
import corianderImg from '@/assets/coriander.jpg';
import cuminImg from '@/assets/cumin.jpg';
import garamMasalaImg from '@/assets/garam-masala.jpg';
import kitchenKingImg from '@/assets/kitchen-king.jpg';
import onionImg from '@/assets/onion.jpg';
import gingerImg from '@/assets/ginger.jpg';
import blackPepperImg from '@/assets/black-pepper.jpg';
import mustardImg from '@/assets/mustard.jpg';

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  weights: string[];
  description: string;
  longDescription: string;
  ingredients: string;
  nutrition: string;
  image: string;
  sku: string;
  rating: number;
  reviews: number;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Turmeric Powder",
    slug: "turmeric-powder",
    price: 60,
    weights: ["100g", "250g", "500g"],
    description: "Pure, organic turmeric with high curcumin content for vibrant color and health benefits.",
    longDescription: "Our premium Turmeric Powder is sourced from the finest organic farms in India. Known for its golden color and earthy flavor, this spice contains high levels of curcumin, a powerful antioxidant. Perfect for curries, golden milk, and traditional Indian dishes.",
    ingredients: "100% Pure Organic Turmeric (Curcuma longa)",
    nutrition: "Per 100g: Calories 312 kcal, Protein 9.7g, Fat 3.3g, Carbs 67g, Fiber 22g, Curcumin 3-5%",
    image: turmericImg,
    sku: "PR-TP-100",
    rating: 4.8,
    reviews: 124,
    category: "Essential Spices"
  },
  {
    id: 2,
    name: "Chilli Powder",
    slug: "chilli-powder",
    price: 55,
    weights: ["100g", "250g", "500g"],
    description: "Fiery red chilli powder with perfect heat balance for authentic Indian cuisine.",
    longDescription: "Our Chilli Powder is made from hand-picked, sun-dried red chillies that deliver consistent heat and vibrant color. Ground to perfection, it adds the authentic spicy kick to any dish while maintaining the natural aroma of fresh chillies.",
    ingredients: "100% Pure Red Chilli (Capsicum annuum)",
    nutrition: "Per 100g: Calories 282 kcal, Protein 13g, Fat 14g, Carbs 50g, Fiber 34g, Vitamin C 76mg",
    image: chilliImg,
    sku: "PR-CP-100",
    rating: 4.7,
    reviews: 98,
    category: "Essential Spices"
  },
  {
    id: 3,
    name: "Coriander Powder",
    slug: "coriander-powder",
    price: 50,
    weights: ["100g", "250g", "500g"],
    description: "Aromatic coriander powder with a citrusy, earthy flavor profile.",
    longDescription: "Freshly ground from premium coriander seeds, our powder captures the essence of this beloved spice. Its subtle citrus notes and earthy undertones make it essential for Indian cooking, marinades, and spice blends.",
    ingredients: "100% Pure Coriander Seeds (Coriandrum sativum)",
    nutrition: "Per 100g: Calories 298 kcal, Protein 12g, Fat 17g, Carbs 55g, Fiber 42g, Iron 16mg",
    image: corianderImg,
    sku: "PR-CRP-100",
    rating: 4.9,
    reviews: 156,
    category: "Essential Spices"
  },
  {
    id: 4,
    name: "Cumin Powder",
    slug: "cumin-powder",
    price: 65,
    weights: ["100g", "250g", "500g"],
    description: "Warm, earthy cumin powder that forms the backbone of Indian cooking.",
    longDescription: "Our Cumin Powder is made from carefully selected seeds, roasted and ground to release their maximum flavor. The warm, slightly nutty taste is indispensable in Indian, Middle Eastern, and Mexican cuisines.",
    ingredients: "100% Pure Cumin Seeds (Cuminum cyminum)",
    nutrition: "Per 100g: Calories 375 kcal, Protein 18g, Fat 22g, Carbs 44g, Fiber 10g, Iron 66mg",
    image: cuminImg,
    sku: "PR-CMP-100",
    rating: 4.8,
    reviews: 112,
    category: "Essential Spices"
  },
  {
    id: 5,
    name: "Garam Masala",
    slug: "garam-masala",
    price: 85,
    weights: ["100g", "250g", "500g"],
    description: "Traditional blend of warming spices for authentic Indian flavor.",
    longDescription: "Our signature Garam Masala is a harmonious blend of over 12 premium spices including cardamom, cinnamon, cloves, and black pepper. This aromatic mixture adds depth and warmth to curries, biryanis, and countless Indian preparations.",
    ingredients: "Coriander, Cumin, Black Pepper, Cardamom, Cinnamon, Cloves, Nutmeg, Bay Leaf, Fennel",
    nutrition: "Per 100g: Calories 340 kcal, Protein 14g, Fat 15g, Carbs 48g, Fiber 18g",
    image: garamMasalaImg,
    sku: "PR-GM-100",
    rating: 4.9,
    reviews: 203,
    category: "Spice Blends"
  },
  {
    id: 6,
    name: "Kitchen King",
    slug: "kitchen-king",
    price: 75,
    weights: ["100g", "250g", "500g"],
    description: "All-purpose spice blend that elevates every dish with royal flavors.",
    longDescription: "Kitchen King is our chef's secret weapon – a carefully crafted blend of spices that works magic on vegetables, lentils, and meats. One spoonful adds complex layers of flavor that would otherwise require a dozen different spices.",
    ingredients: "Coriander, Cumin, Turmeric, Red Chilli, Fenugreek, Dried Mango, Black Salt, Asafoetida, and more",
    nutrition: "Per 100g: Calories 320 kcal, Protein 11g, Fat 12g, Carbs 52g, Fiber 15g",
    image: kitchenKingImg,
    sku: "PR-KK-100",
    rating: 4.7,
    reviews: 87,
    category: "Spice Blends"
  },
  {
    id: 7,
    name: "Onion Powder",
    slug: "onion-powder",
    price: 70,
    weights: ["100g", "250g", "500g"],
    description: "Concentrated onion flavor in powder form for convenient cooking.",
    longDescription: "Made from premium dehydrated onions, our Onion Powder delivers intense, sweet onion flavor without the tears. Perfect for marinades, dry rubs, soups, and any recipe where you want onion flavor with smooth texture.",
    ingredients: "100% Pure Dehydrated Onion (Allium cepa)",
    nutrition: "Per 100g: Calories 341 kcal, Protein 10g, Fat 1g, Carbs 79g, Fiber 15g",
    image: onionImg,
    sku: "PR-OP-100",
    rating: 4.6,
    reviews: 65,
    category: "Essential Spices"
  },
  {
    id: 8,
    name: "Ginger Powder",
    slug: "ginger-powder",
    price: 80,
    weights: ["100g", "250g", "500g"],
    description: "Warm, zesty ginger powder with natural digestive benefits.",
    longDescription: "Our Ginger Powder is made from mature ginger roots, carefully dried and ground to preserve their pungent, warming properties. Essential for chai, curries, baking, and traditional Ayurvedic remedies.",
    ingredients: "100% Pure Dried Ginger (Zingiber officinale)",
    nutrition: "Per 100g: Calories 335 kcal, Protein 9g, Fat 4g, Carbs 72g, Fiber 14g, Gingerol 2%",
    image: gingerImg,
    sku: "PR-GP-100",
    rating: 4.8,
    reviews: 91,
    category: "Essential Spices"
  },
  {
    id: 9,
    name: "Black Pepper Powder",
    slug: "black-pepper-powder",
    price: 95,
    weights: ["100g", "250g", "500g"],
    description: "King of spices with bold, sharp flavor and piperine benefits.",
    longDescription: "Known as the 'King of Spices,' our Black Pepper is sourced from the Malabar coast. Freshly ground to order, it delivers the sharp, pungent kick that enhances virtually every savory dish while offering numerous health benefits.",
    ingredients: "100% Pure Black Pepper (Piper nigrum)",
    nutrition: "Per 100g: Calories 251 kcal, Protein 10g, Fat 3g, Carbs 64g, Fiber 25g, Piperine 5-9%",
    image: blackPepperImg,
    sku: "PR-BP-100",
    rating: 4.9,
    reviews: 178,
    category: "Essential Spices"
  },
  {
    id: 10,
    name: "Mustard Powder",
    slug: "mustard-powder",
    price: 55,
    weights: ["100g", "250g", "500g"],
    description: "Pungent mustard powder for pickles, marinades, and Bengali cuisine.",
    longDescription: "Our Mustard Powder is made from premium yellow and brown mustard seeds, ground to release their characteristic sharp, tangy flavor. Essential for making homemade mustard sauce, pickles, and traditional Bengali dishes.",
    ingredients: "100% Pure Mustard Seeds (Brassica juncea & Sinapis alba)",
    nutrition: "Per 100g: Calories 508 kcal, Protein 26g, Fat 36g, Carbs 28g, Fiber 12g",
    image: mustardImg,
    sku: "PR-MP-100",
    rating: 4.6,
    reviews: 54,
    category: "Essential Spices"
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};

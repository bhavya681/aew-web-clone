export type ProductCategory = "Apparel" | "T-Shirts" | "Hoodies" | "Accessories" | "Collectibles";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  badge?: string;
  description: string;
};

const shop = "https://shopaew.com/cdn/shop/files";

export const products: Product[] = [
  { id: "replica-world-belt", name: "AEW World Championship Replica Belt", category: "Collectibles", price: 429.95, image: `${shop}/aew4627-5.png`, badge: "Bestseller", description: "An officially licensed full-size replica of the AEW World Championship." },
  { id: "unified-belt", name: "AEW Unified Championship Replica Belt", category: "Collectibles", price: 399.95, image: `${shop}/aew5445-preview.webp`, description: "Celebrate the unification era with this detailed replica title." },
  { id: "ospreay-tee", name: "Will Ospreay Champion T-Shirt", category: "T-Shirts", price: 34.95, image: `${shop}/ospreay-champ.jpg`, badge: "New", description: "Premium cotton tee featuring Will Ospreay and the AEW World Championship." },
  { id: "mercedes-tee", name: "Mercedes Moné Champion T-Shirt", category: "T-Shirts", price: 34.95, image: `${shop}/mercedes-champ.jpg`, description: "A tribute to the history-making champion." },
  { id: "aminata-hoodie", name: "Queen Aminata Hoodie", category: "Hoodies", price: 64.95, image: `${shop}/815952_7e24752b2bcb48ec822ef443d.jpg`, description: "Heavyweight fleece hoodie with signature rider graphics." },
  { id: "moxley-hoodie", name: "Jon Moxley Hoodie", category: "Hoodies", price: 64.95, image: `${shop}/815952_8c1bc79e191a44e3832bfc4d9f3c3fad_mv2.jpg`, badge: "Popular", description: "Blackout hoodie for the fans who ‘till the end.’" },
  { id: "young-bucks-tee", name: "Young Bucks T-Shirt", category: "T-Shirts", price: 32.95, image: `${shop}/815952_4c2f1bbd858c4d4495510a7bf.jpg`, description: "Superkick party approved apparel." },
  { id: "darby-tee", name: "Darby Allin Champion T-Shirt", category: "T-Shirts", price: 34.95, image: `${shop}/darby-champ.jpg`, description: "Celebrate the relentless spirit of Darby Allin." },
  { id: "swerve-tee", name: "Swerve Strickland & The New Level T-Shirt", category: "T-Shirts", price: 36.95, image: `${shop}/swervenl-champs.jpg`, badge: "New", description: "A new level of dangerous — official tour tee." },
  { id: "okada-jacket", name: "Kazuchika Okada Championship Jacket", category: "Apparel", price: 119.95, image: `${shop}/815952_a0c7aa12d6a0497aba1a9c7840dae9b8_mv2.jpg`, description: "Premium outerwear inspired by the Rainmaker." },
  { id: "dragunov-tee", name: "Ilja Dragunov T-Shirt", category: "T-Shirts", price: 34.95, image: `${shop}/815952_12cfa600d59f4e709f50c2372.jpg`, description: "For the unhinged one." },
  { id: "fletcher-tee", name: "Kyle Fletcher T-Shirt", category: "T-Shirts", price: 34.95, image: `${shop}/kyle-fletcher-rp.jpg`, description: "The prototype has arrived." },
  { id: "andrade-tee", name: "Andrade El Idolo T-Shirt", category: "T-Shirts", price: 34.95, image: `${shop}/ANDRADE_EL_IDOLO.jpg`, description: "La Faccion Ingobernable official apparel." },
  { id: "harley-print", name: "Harley Cameron Signed Art Print", category: "Collectibles", price: 89.95, image: "https://storage.googleapis.com/allelitewrestling-com-prod/2026/11/20/3dccc317-15bb-4007-9054-51fc28c03bec.webp", badge: "Limited", description: "Autographed limited edition 11×14 Rob Schamberger art print." },
  { id: "luchador-mask", name: "AEW Luchador Mask", category: "Accessories", price: 29.95, image: "https://storage.googleapis.com/allelitewrestling-com-prod/2026/09/21/aca1ad7b-0094-4cd7-9a70-0c32b567b527.jpg", description: "Bring the arena energy home with an official luchador mask." },
  { id: "action-figures", name: "AEW x MyFandom Action Figure 3-Pack", category: "Collectibles", price: 74.95, image: "https://storage.googleapis.com/allelitewrestling-com-prod/2026/11/20/dfa71de8-f31d-48df-b2eb-1fdb6d78af12.jxl", badge: "Exclusive", description: "Sting, MJF, and Chris Jericho collectible figures." },
];

export const productCategories: ProductCategory[] = ["Apparel", "T-Shirts", "Hoodies", "Accessories", "Collectibles"];

export const getProduct = (id: string) => products.find((product) => product.id === id);

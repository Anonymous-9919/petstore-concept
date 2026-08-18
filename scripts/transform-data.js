const fs = require('fs');
const path = require('path');

// Read source data
const srcDir = 'E:/Web Developer - Work/Antigravity/Petstore 3/src/data';
const dstDir = 'E:/Web Developer - Work/Antigravity/Pet Store 2 - New Main/src/data';

const srcProducts = JSON.parse(fs.readFileSync(path.join(srcDir, 'products.json'), 'utf-8'));
const srcCategories = JSON.parse(fs.readFileSync(path.join(srcDir, 'categories.json'), 'utf-8'));

// --- Transform Categories ---
const srcCats = srcCategories.categories;
const transformedCategories = srcCats.map(cat => ({
  id: cat.id,
  name: cat.name,
  slug: cat.slug,
  image: cat.photo || '',
  description: cat.description || '',
  ar_description: cat.ar_description || '',
  parent: 0,
  count: 0,
}));

// Map category slug to pet_type for mega menu
const petTypeMap = {
  'special-offer': 'shop',
  'cat-wet-food': 'cat',
  'dog-wet-food': 'dog',
  'cat-dry-food': 'cat',
  'dog-dry-food': 'dog',
  'cat-treats': 'cat',
  'dog-treats': 'dog',
  'pets-carrier-travel-bags': 'shop',
  'cat-litter-and-boxes': 'cat',
  'pet-beds-houses': 'shop',
  'cat-accessories': 'cat',
  'dog-accessories': 'dog',
  'healthcare-supplements': 'shop',
  'grooming-hygiene': 'shop',
  'cat-scratchers': 'cat',
  'pet-cage': 'small_pets',
  'cat-toys': 'cat',
  'pet-milk': 'shop',
  'dog-toys': 'dog',
  'bird-food': 'bird',
  'bird-toys': 'bird',
  'bird-cage': 'bird',
  'bird-needs-accessories': 'bird',
  'rabbit-needs-accessories': 'small_pets',
  'fish-food': 'fish',
  'fish-needs-accessories': 'fish',
  'hamster-needs-accessories': 'small_pets',
  'reptile-food': 'small_pets',
  'reptile-needs-accessories': 'small_pets',
};

transformedCategories.forEach(cat => {
  cat.pet_type = petTypeMap[cat.slug] || 'shop';
});

fs.writeFileSync(path.join(dstDir, 'categories.json'), JSON.stringify(transformedCategories, null, 2), 'utf-8');
console.log(`Transformed ${transformedCategories.length} categories`);

// --- Transform Products ---
const transformedProducts = srcProducts.map(p => {
  // Map options to ProductAttribute format
  const attributes = (p.options || []).map(opt => ({
    id: opt.id,
    name: opt.name,
    slug: opt.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    options: (opt.choices || []).map(ch => ({
      id: ch.id,
      name: ch.value,
      slug: ch.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      price: ch.price,
      image: ch.photo || null,
    })),
  }));

  // Build images array
  const images = [];
  if (p.photo) {
    images.push({
      id: p.id,
      src: p.photo,
      name: p.name,
      alt: p.name,
    });
  }
  if (p.photo_thumb) {
    images.push({
      id: p.id + 1,
      src: p.photo_thumb,
      name: p.name + ' thumb',
      alt: p.name,
    });
  }
  if (p.photo_small) {
    images.push({
      id: p.id + 2,
      src: p.photo_small,
      name: p.name + ' small',
      alt: p.name,
    });
  }
  if (p.photo_medium) {
    images.push({
      id: p.id + 3,
      src: p.photo_medium,
      name: p.name + ' medium',
      alt: p.name,
    });
  }
  // Add gallery images
  if (p.gallery && p.gallery.length > 0) {
    p.gallery.forEach((g, i) => {
      if (g && g.photo) {
        images.push({
          id: p.id + 100 + i,
          src: g.photo,
          name: p.name + ' gallery ' + i,
          alt: p.name,
        });
      }
    });
  }

  // Determine stock status
  const stock_status = p.not_available ? 'outofstock' : 'instock';

  // Build categories array
  const categories = [];
  if (p.category_slug) {
    const catData = srcCats.find(c => c.slug === p.category_slug);
    if (catData) {
      categories.push({
        id: catData.id,
        name: catData.name,
        slug: catData.slug,
      });
    }
  }

  // Convert price fields
  const price = String(p.price || 0);
  const sale_price = (p.striked_price && p.striked_price > p.price) ? price : '';
  const regular_price = (p.striked_price && p.striked_price > p.price) ? String(p.striked_price) : price;

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: price,
    regular_price: regular_price,
    sale_price: sale_price,
    description: p.description || '',
    short_description: p.short_description || '',
    images: images,
    categories: categories,
    attributes: attributes,
    variations: [], // Will be populated later if needed
    stock_status: stock_status,
    average_rating: '0',
    rating_count: 0,
    on_sale: !!(p.striked_price && p.striked_price > p.price),
    featured: p.tag === 'featured' || false,
    date_created: p.published_date || new Date().toISOString(),
  };
});

fs.writeFileSync(path.join(dstDir, 'products.json'), JSON.stringify(transformedProducts, null, 2), 'utf-8');
console.log(`Transformed ${transformedProducts.length} products`);

// --- Create Store Settings ---
const storeSettings = {
  name: "Pet Store",
  name_ar: "بت ستور",
  slogan: "Your Dependable partner in PetHood",
  slogan_ar: "شريكك الموثوق في عالم الحيوانات الأليفة",
  logo: "/assets/5deedc14df01.jpg",
  logo_ar: "/assets/a2604690bc60.jpg",
  currency: "KD",
  currency_symbol: "KD",
  currency_decimals: 3,
  phone: "+965 98805010",
  whatsapp: "+96598805010",
  email: "petstorekw@gmail.com",
  instagram: "https://www.instagram.com/petstore.kw",
  address: "Kuwait",
  address_ar: "الكويت",
  free_delivery_threshold: 10,
  delivery_charge: 1,
};

fs.writeFileSync(path.join(dstDir, 'store.json'), JSON.stringify(storeSettings, null, 2), 'utf-8');
console.log('Created store.json');

console.log('Done!');

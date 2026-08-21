/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

// Read both products files
const ourProducts = JSON.parse(fs.readFileSync('src/data/products.json', 'utf8'));
const theirProducts = JSON.parse(fs.readFileSync('E:/Web Developer - Work/Antigravity/Petstore 3/src/data/products.json', 'utf8'));

// Build a map of their products by ID
const theirMap = {};
theirProducts.forEach(p => { theirMap[p.id] = p; });

// Merge Arabic fields
let mergedCount = 0;
ourProducts.forEach(p => {
  const theirP = theirMap[p.id];
  if (theirP) {
    p.ar_name = theirP.ar_name || p.name;
    p.ar_description = theirP.ar_description || p.description;
    p.ar_short_description = theirP.ar_short_description || p.short_description;
    mergedCount++;
  }
});

// Write merged data
fs.writeFileSync('src/data/products.json', JSON.stringify(ourProducts, null, 2));
console.log('Merged Arabic translations for', mergedCount, 'products');
console.log('Total products:', ourProducts.length);

const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const dbData = require('./db.json');

const seedDB = async () => {
  try {
    console.log('Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conexión exitosa.');

    // Limpiar productos
    await Product.deleteMany({});
    console.log('Productos existentes eliminados.');

    // Transformar productos (mapea categoryId a category, imageUrl a image)
    const productsToInsert = dbData.products.map(prod => ({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      stock: prod.stock,
      category: prod.categoryId,   // Puedes cambiar por el nombre si quieres
      image: prod.imageUrl
    }));

    await Product.insertMany(productsToInsert);
    console.log(`✅ ${productsToInsert.length} productos insertados correctamente`);
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedDB();
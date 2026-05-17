const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = './db.json';

function readDB() {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

if (!fs.existsSync(DB_PATH)) {
  const initialData = {
    categories: [
      { id: '1', name: 'Electrónicos' },
      { id: '2', name: 'Ropa' },
      { id: '3', name: 'Hogar' }
    ],
    products: [
      { id: '1', name: 'Laptop', description: 'Laptop gaming', price: 800, imageUrl: 'https://picsum.photos/200/150?random=1', categoryId: '1', stock: 10 },
      { id: '2', name: 'Camiseta', description: 'Camiseta de algodón', price: 20, imageUrl: 'https://picsum.photos/200/150?random=2', categoryId: '2', stock: 50 },
      { id: '3', name: 'Silla', description: 'Silla de oficina', price: 150, imageUrl: 'https://picsum.photos/200/150?random=3', categoryId: '3', stock: 5 },
      { id: '4', name: 'Mouse', description: 'Mouse inalámbrico', price: 25, imageUrl: 'https://picsum.photos/200/150?random=4', categoryId: '1', stock: 30 },
      { id: '5', name: 'Pantalón', description: 'Jeans azul', price: 45, imageUrl: 'https://picsum.photos/200/150?random=5', categoryId: '2', stock: 20 },
      { id: '6', name: 'Lámpara', description: 'Lámpara LED', price: 35, imageUrl: 'https://picsum.photos/200/150?random=6', categoryId: '3', stock: 15 },
      { id: '7', name: 'Teclado', description: 'Teclado mecánico', price: 60, imageUrl: 'https://picsum.photos/200/150?random=7', categoryId: '1', stock: 12 },
      { id: '8', name: 'Gorra', description: 'Gorra deportiva', price: 15, imageUrl: 'https://picsum.photos/200/150?random=8', categoryId: '2', stock: 40 }
    ]
  };
  writeDB(initialData);
}

app.get('/api/products', (req, res) => {
  const db = readDB();
  res.json(db.products);
});

app.get('/api/products/:id', (req, res) => {
  const db = readDB();
  const product = db.products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const db = readDB();
  const { name, description, price, imageUrl, categoryId, stock } = req.body;
  
  if (!name || !price || price <= 0 || !categoryId || stock < 0) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }
  
  const newProduct = {
    id: Date.now().toString(),
    name,
    description: description || '',
    price: Number(price),
    imageUrl: imageUrl || 'https://picsum.photos/200/150?random=' + Date.now(),
    categoryId,
    stock: Number(stock)
  };
  
  db.products.push(newProduct);
  writeDB(db);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const db = readDB();
  const index = db.products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });
  
  const { name, description, price, imageUrl, categoryId, stock } = req.body;
  if (!name || !price || price <= 0 || !categoryId || stock < 0) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }
  
  db.products[index] = {
    ...db.products[index],
    name,
    description: description || '',
    price: Number(price),
    imageUrl: imageUrl || db.products[index].imageUrl,
    categoryId,
    stock: Number(stock)
  };
  
  writeDB(db);
  res.json(db.products[index]);
});

app.delete('/api/products/:id', (req, res) => {
  const db = readDB();
  const newProducts = db.products.filter(p => p.id !== req.params.id);
  if (newProducts.length === db.products.length) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  db.products = newProducts;
  writeDB(db);
  res.status(204).send();
});

app.get('/api/categories', (req, res) => {
  const db = readDB();
  res.json(db.categories);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ API corriendo en http://localhost:${PORT}`);
});
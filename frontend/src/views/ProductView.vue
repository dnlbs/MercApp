<template>
  <div class="product-detail">
    <div v-if="loading" class="loading">Cargando producto...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="detail-content">
      <img :src="product.imageUrl" :alt="product.name" class="detail-image" />
      <div class="detail-info">
        <h1>{{ product.name }}</h1>
        <p class="price">${{ product.price }}</p>
        <p class="stock">Stock disponible: {{ product.stock }}</p>
        <p class="description">{{ product.description }}</p>
        <button @click="addToCart" class="add-button">🛒 Añadir al carrito</button>
        <router-link to="/" class="back-link">← Volver al catálogo</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const cartStore = useCartStore()

const product = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchProduct = async () => {
  loading.value = true
  try {
    const res = await fetch(`http://localhost:3000/api/products/${route.params.id}`)
    if (!res.ok) throw new Error('Producto no encontrado')
    product.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const addToCart = () => {
  cartStore.addToCart(product.value)
  alert(`${product.value.name} añadido al carrito`)
}

onMounted(() => {
  fetchProduct()
})
</script>

<style>
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.detail-content {
  display: flex;
  gap: 40px;
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.detail-image {
  width: 50%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
}

.detail-info {
  flex: 1;
}

h1 {
  font-size: 28px;
  margin-bottom: 15px;
  color: #333;
}

.price {
  font-size: 32px;
  color: #42b983;
  font-weight: bold;
  margin: 15px 0;
}

.stock {
  color: #666;
  margin-bottom: 15px;
}

.description {
  color: #555;
  line-height: 1.6;
  margin: 20px 0;
}

.add-button {
  background: #42b983;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  margin: 20px 0;
  width: 100%;
}

.add-button:hover {
  background: #359268;
}

.back-link {
  display: inline-block;
  color: #42b983;
  text-decoration: none;
  margin-top: 10px;
}

.loading, .error {
  text-align: center;
  padding: 50px;
  font-size: 18px;
}

.error {
  color: red;
}

@media (max-width: 768px) {
  .detail-content {
    flex-direction: column;
  }
  .detail-image {
    width: 100%;
  }
}
</style>
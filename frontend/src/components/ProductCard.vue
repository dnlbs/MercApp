<template>
  <div class="product-card">
    <img :src="product.imageUrl" :alt="product.name" class="product-image" />
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p class="price">${{ product.price }}</p>
      <p class="stock">Stock: {{ product.stock }}</p>
      <button @click="$emit('add-to-cart', product)" class="add-button">
        🛒 Añadir
      </button>
      <router-link :to="`/product/${product.id}`" class="details-link">
        Ver detalles
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps(['product'])
defineEmits(['add-to-cart'])
</script>

<style>
.product-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
}

.price {
  color: #42b983;
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
}

.stock {
  color: #666;
  font-size: 14px;
}

.add-button {
  width: 100%;
  background: #42b983;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
}

.add-button:hover {
  background: #359268;
}

.details-link {
  display: block;
  text-align: center;
  color: #42b983;
  text-decoration: none;
  font-size: 14px;
}
</style>
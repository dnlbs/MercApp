<template>
  <div class="cart-page">
    <h1>Carrito de Compras</h1>
    
    <div v-if="cartStore.items.length === 0" class="empty">
      🛒 El carrito está vacío
    </div>
    
    <div v-else>
      <div class="cart-items">
        <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
          <img :src="item.imageUrl" :alt="item.name" />
          <div class="info">
            <h3>{{ item.name }}</h3>
            <p>${{ item.price }}</p>
          </div>
          <div class="quantity">
            <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
          </div>
          <p class="subtotal">${{ item.price * item.quantity }}</p>
          <button @click="cartStore.removeFromCart(item.id)" class="remove">🗑️</button>
        </div>
      </div>
      
      <div class="total">
        <h2>Total: ${{ cartStore.totalPrice }}</h2>
        <button class="checkout">Proceder al pago</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

const updateQuantity = (id, quantity) => {
  cartStore.updateQuantity(id, quantity)
}
</script>

<style>
.cart-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.cart-items {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-bottom: 1px solid #eee;
  background: white;
}

.cart-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
}

.info {
  flex: 1;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity button {
  width: 30px;
  height: 30px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.remove {
  background: #ff4444;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.total {
  margin-top: 20px;
  text-align: right;
  padding: 20px;
  background: white;
  border-radius: 10px;
}

.checkout {
  background: #42b983;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.empty {
  text-align: center;
  font-size: 24px;
  padding: 50px;
  color: #666;
}
</style>
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const addToCart = (product) => {
    const existing = items.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    saveToLocalStorage()
  }

  const removeFromCart = (productId) => {
    items.value = items.value.filter(item => item.id !== productId)
    saveToLocalStorage()
  }

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find(item => item.id === productId)
    if (item && quantity > 0) {
      item.quantity = quantity
    } else if (quantity <= 0) {
      removeFromCart(productId)
    }
    saveToLocalStorage()
  }

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  })

  const saveToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      items.value = JSON.parse(saved)
    }
  }

  loadFromLocalStorage()

  return { items, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice }
})
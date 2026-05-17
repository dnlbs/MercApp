<template>
  <div class="home">
    <h1>Catálogo de Productos</h1>
    
    <div class="filters">
      <input 
        type="text" 
        v-model="searchTerm" 
        placeholder="Buscar productos..."
        class="search-input"
      />
      
      <select v-model="selectedCategory" class="category-select">
        <option value="">Todas las categorías</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <div v-if="loading" class="loading">Cargando productos...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="products-grid">
      <ProductCard 
        v-for="product in filteredProducts" 
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const products = ref([])
const categories = ref([])
const loading = ref(false)
const error = ref(null)
const searchTerm = ref('')
const selectedCategory = ref('')

const fetchProducts = async () => {
  loading.value = true
  try {
    const res = await fetch('http://localhost:3000/api/products')
    products.value = await res.json()
  } catch (err) {
    error.value = 'Error al cargar productos. ¿El backend está corriendo?'
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/categories')
    categories.value = await res.json()
  } catch (err) {
    console.error('Error cargando categorías')
  }
}

const filteredProducts = computed(() => {
  let result = products.value
  
  if (searchTerm.value) {
    result = result.filter(p => 
      p.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }
  
  if (selectedCategory.value) {
    result = result.filter(p => p.categoryId === selectedCategory.value)
  }
  
  return result
})

const addToCart = (product) => {
  cartStore.addToCart(product)
}

onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>

<style>
.home {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.search-input, .category-select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.search-input {
  flex: 1;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.loading, .error {
  text-align: center;
  padding: 50px;
  font-size: 18px;
}

.error {
  color: red;
}
</style>
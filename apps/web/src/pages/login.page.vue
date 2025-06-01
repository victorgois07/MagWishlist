<template>
  <div class="login-page">
    <h1>Login</h1>
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import LoginForm from '../components/molecules/LoginForm.vue'

defineOptions({
  name: 'LoginPage',
})
</script>

<style scoped>
.login-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}
</style>

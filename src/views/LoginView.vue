<script setup>
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { onMounted, ref } from 'vue'
import { auth } from '../firebase/firebase.js'
import router from '../router'

const email = ref('')
const password = ref('')
const error = ref('')
const errorMsg = ref('')

const login = () => {
  if(email.value != '' && password.value != ''){
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((cred)=>{
      console.log('logged in successfully')
      router.push('/dashboard')
    })
    .catch((err)=>{
      error.value = true
      errorMsg.value = err.message
    })
  } else {
    console.log('email and password fields cannot be empty!')
    errorMsg.value = 'email and password fields cannot be empty!'
  }
}
</script>

<template>
    <div class="h-full w-full bg-gradient-to-br from-amber-700">

        <div class="flex justify-center items-center">
            <div class="w-1/4 bg-gray-50 rounded-lg shadows-sm px-10 py-5 mt-10">
                <h1 class="text-center text-xl font-bold mb-3">Sign in with your account</h1>
                  
                <div v-if="errorMsg" class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-3" role="alert">
                  <p class="font-bold">Authentication Failed</p>
                  <p>{{ errorMsg }}</p>
                </div>

                <div class="mb-4">
                    <label class="text-sm" for="email">Email Address</label>
                    <input v-model="email" id="email" type="text" class="w-full">
                </div>
                <div class="mb-4">
                    <label class="text-sm" for="password">Password</label>
                    <input v-model="password" id="password" type="password" class="w-full">
                </div>
                <button @click="login()" class="w-full py-1 bg-blue-600 rounded-lg text-white hover:bg-blue-500">Sign in</button>
            </div>

        </div>
    </div>
</template>
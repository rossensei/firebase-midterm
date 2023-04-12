<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import {db} from './firebase/firebase.js'
// import {addDoc, collection, onSnapshot,deleteDoc, doc, updateDoc, getDoc, query, orderBy} from "firebase/firestore";
// import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, onMounted } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase/firebase.js'
import router from './router'

const isSignedIn = ref(false)
onMounted(()=>{
  onAuthStateChanged(auth, (user) => {
    if(user){
      console.log(user)
      isSignedIn.value = true
      console.log('you are now signed in')
      router.push('/dashboard')
    }else{
      console.log('you need to log in')
      router.push('/login')
    }
  })
})

const logOut = () =>{
  signOut(auth)
  .then(()=>{
    isSignedIn.value = false
  })
}
</script>

<template>
  <header>
   <nav class="border-b w-full px-3 shadow-md">
    <div class="flex justify-between items-center px-20">
      <div class="flex justify-center items-center">
        <RouterLink to="/" class="flex items-center flex-nowrap text-indigo-900 font-medium">
          <img src="https://brandeps.com/logo-download/V/Vue-JS-logo-vector-01.svg" class="h-10 w-auto" alt="">
          <span class="text-xl font-semibold text-indigo-900 mr-28">FirebaseAuth</span>
        </RouterLink>

        <ul class="flex flex-row justify-around items-center">
           <li v-if="isSignedIn" class="border-b-4 border-white mx-4 hover:text-indigo-600 text-indigo-900 font-medium h-full hover:border-indigo-600 py-4">
             <RouterLink class=" h-full " to="/dashboard">Dashboard</RouterLink>
           </li>
           <li v-if="isSignedIn" class="border-b-4 border-white mx-4 text-indigo-900 font-medium h-full hover:border-indigo-600 py-4">
              Team
           </li>
           <li v-if="isSignedIn" class="border-b-4 border-white mx-4 text-indigo-900 font-medium h-full hover:border-indigo-600 py-4">
             Projects
           </li>
           <li v-if="!isSignedIn" class="mx-4 cursor-default text-indigo-900 font-medium h-full py-4">
             &nbsp;
           </li>
         </ul>
      </div>
      <ul class="flex flex-row justify-around items-center w-auto">
        <li v-if="isSignedIn" class="text-gray-50 font-semibold bg-gray-500 hover:bg-gray-400 mx-1.5 px-4 py-1 rounded-lg">
          <button type="submit" @click="logOut()">Sign Out</button>
        </li>
        <li v-if="!isSignedIn" class="text-gray-50 font-normal bg-gray-500 hover:bg-gray-400 mx-1.5 px-4 py-1 rounded-lg">
          <RouterLink to="/signup">Sign Up</RouterLink>
        </li>
        <li v-if="!isSignedIn" class="text-gray-50 font-normal bg-blue-500 hover:bg-blue-400 mx-1.5 px-4 py-1 rounded-lg">
          <RouterLink class="" to="/login">Login</RouterLink>
        </li>

      </ul>
    </div>
   </nav>
  </header>

  <RouterView />
</template>

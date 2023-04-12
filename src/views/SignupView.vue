<script setup>
import { ref } from 'vue'
import {db} from '../firebase/firebase.js'
import {addDoc, collection} from "firebase/firestore";
import { auth } from '../firebase/firebase.js'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { RouterLink } from 'vue-router'
import router from '../router'

const fullname = ref('')
const address = ref('')
const gender = ref('')
const email = ref('')
const contactno = ref('')
const password = ref('')

const error = ref('')
const errorMsg = ref('')
const success = ref('')
const successMsg = ref('')

const register = async () => {
    if(fullname.value != '' && address.value != '' && gender.value != '' && email.value != '' && contactno.value != null && password != ''){
        await addDoc (collection(db,"users"),{
            fullname:fullname.value,
            address: address.value,
            gender: gender.value,
            email: email.value,
            contactno: contactno.value
        })
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((cred)=>{
            email.value = ""
            password.value = ""
            error.value = false
            success.value = true
            successMsg.value = "Registered Successfully"
        })
        .catch(()=>{
            error.value  = true
            errorMsg = "Invalid Email"
        })
        fullname.value = ''
        address.value = ''
        gender.value = ''
        email.value = ''
        contactno.value = null
        password.value = null
    }
    else{
        error.value = true
        errorMsg.value = "Please fill out all the fields"
    }
    
}
</script>

<template>
    <div class="h-screen w-full bg-gradient-to-br from-amber-700">


        <div class="flex justify-center items-center h-full">
            <div class="w-1/4 bg-gray-50 rounded-lg shadows-sm px-10 py-5 mt-10">
                <h1 class="text-center text-xl font-bold mb-3">Create User Account</h1>
                <div class="mb-4">
                    <label class="text-sm" for="email">Full Name:</label>
                    <input v-model="fullname" id="email" type="text" class="w-full">
                </div>
                <div class="mb-4">
                    <label class="text-sm" for="address">Address</label>
                    <input v-model="address" id="address" type="text" class="w-full">
                </div>
                <div class="mb-4">
                    <label class="text-sm" for="gender">Gender</label>
                    <input v-model="gender" id="gender" type="text" class="w-full">
                </div>
                <div class="mb-4">
                    <label class="text-sm" for="email">Email Address</label>
                    <input v-model="email" id="email" type="text" class="w-full">
                </div>
                <div class="mb-4">
                    <label class="text-sm" for="contactno">Contact Number</label>
                    <input v-model="contactno" id="contactno" type="text" class="w-full">
                </div>
                <div class="mb-4">
                    <label class="text-sm" for="password">Password</label>
                    <input v-model="password" id="password" type="password" class="w-full">
                </div>
                <button @click="register()" class="w-full py-1 bg-blue-600 rounded-lg text-white hover:bg-blue-500">Create</button>
            </div>

        </div>
    </div>
</template>
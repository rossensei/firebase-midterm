<script setup>
import { ref, onMounted } from 'vue'
import {db} from '../firebase/firebase.js'
import {addDoc, collection, onSnapshot,deleteDoc, doc, updateDoc, getDoc, query, orderBy} from "firebase/firestore";
import { auth } from '../firebase/firebase.js'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { RouterLink } from 'vue-router'
import router from '../router'

const users = ref([])
const id = ref(1)
const totalFemaleUsers = ref(0)
const totalMaleUsers = ref(0)

onMounted(async()=>{
    const q = (collection(db, "users"));
    onSnapshot(q,(snapshot)=> {
    const usersTmp = []
    let femaleCount = 0
    let maleCount = 0
    snapshot.forEach((doc) => {

    const users = {
        id: doc.id,
        fullname: doc.data().fullname,
        address: doc.data().address,
        gender: doc.data().gender,
        email: doc.data().email,
        contactno: doc.data().contactno
    }

    usersTmp.push(users)
    if(users.gender == 'Female'){
        femaleCount++
    }
    if(users.gender == 'Male'){
        maleCount++
    }
    });
    users.value = usersTmp
    totalFemaleUsers.value = femaleCount
    totalMaleUsers.value = maleCount
    })
})
</script>

<template>
    <div class="h-screen w-full px-20">

        <div class="mt-5 w-4/5 mx-auto">
            <h1 class="text-4xl font-bold text-black border-b-8 border-indigo-600 w-52">Dashboard</h1>
            
            <!-- {{ totalFemaleUsers }}
            {{ totalMaleUsers }} -->

            <div class="w-3/4 mx-auto mt-11">
                <div class="grid grid-cols-3 gap-4">
                    <div class="flex flex-col p-10 bg-orange-500 rounded-lg">
                        <p class="text-xl text-white font-semibold text-center">Total Users</p>
                        <p class="text-xl text-white font-normal text-center">{{ totalMaleUsers }}</p>
                    </div>
                    <div class="flex flex-col p-10 bg-orange-500 rounded-lg">
                        <p class="text-xl text-white font-semibold text-center">Total Male Users</p>
                        <p class="text-xl text-white font-normal text-center">{{ totalMaleUsers }}</p>
                    </div>
                    <div class="flex flex-col p-10 bg-orange-500 rounded-lg">
                        <p class="text-xl text-white font-semibold text-center">Total Female Users</p>
                        <p class="text-xl text-white font-normal text-center">{{ totalFemaleUsers }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
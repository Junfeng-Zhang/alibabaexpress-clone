<template>
    <MainLayout>
        <div id="ShoppingCartPage" class="mt-4 max-w-[1200px] mx-auto px-2">
            <div v-if="!userStore.cart.length" class="h-[500px] flex items-center justify-center">
                <div class="pt-20">
                    <img 
                        class="mx-auto"
                        width="250"
                        src="/cart-empty.png"
                    >

                    <div class="text-xl text-center mt-4">No items yet?</div>

                    <div v-if="!user" class="flex text-center">
                        <NuxtLink 
                            to="/auth"
                            class="
                                bg-[#FD374F] 
                                w-full 
                                text-white 
                                text-[21px] 
                                font-semibold 
                                p-1.5 
                                rounded-full
                                mt-4
                            "
                        >
                            Sign in
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <div v-else class="md:flex gap-4 justify-between mx-auto w-full">
                <div class="md:w-[65%]">
                    <div class="bg-white rounded-lg p-4">

                        <div class="text-2xl font-bold mb-2">
                            Shopping Cart ({{ userStore.cart.length }})
                        </div>

                    </div>

                    <div class="bg-[#FEEEEF] rounded-lg p-4 mt-4">
                        <div class="text-red-500 font-bold">Welcome Deal applicable on 1 item only</div>
                    </div>

                    <div id="Items" class="bg-white rounded-lg p-4 mt-4">
                        <div v-for="product in userStore.cart">
                            <CartItem 
                                :product="product" 
                                :selectedArray="selectedArray"
                                @selectedRadio="selectedRadioFunc"
                            />
                        </div>
                    </div>
                </div>

                <div class="md:hidden block my-4"/>
                <div class="md:w-[35%]">
                    <div id="Summary" class="bg-white rounded-lg p-4">
                        <div class="text-2xl font-extrabold mb-2">Summary</div>
                        <div class="flex items-center justify-between my-4">
                            <div class="font-semibold">Total</div>
                            <div class="text-2xl font-semibold">
                                $ <span class="font-extrabold">{{ totalPriceComputed }}</span>
                            </div>
                        </div>
                        <button 
                            @click="goToCheckout"
                            class="
                                flex
                                items-center
                                justify-center
                                bg-[#FD374F] 
                                w-full 
                                text-white 
                                text-[21px] 
                                font-semibold 
                                p-1.5 
                                rounded-full
                                mt-4
                            "
                        >
                            Checkout
                        </button>
                    </div>

                    <div id="PaymentProtection" class="bg-white rounded-lg p-4 mt-4">

                        <div class="text-lg font-semibold mb-2">Payment methods</div>
                        <div class="flex items-center justify-start gap-8 my-4">
                            <div v-for="card in cards">
                                <img class="h-6" :src="card">
                            </div>
                        </div>

                        <div class="border-b"/>

                        <div class="text-lg font-semibold mb-2 mt-2">Buyer Protection</div>
                        <p class="my-2">
                            Get full refund if the item is not as described or if is not delivered
                        </p>

                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue';
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()
const user = useSupabaseUser()

let selectedArray = ref([])

onMounted(() => {
    /* when we come to the page, we have the loader that comes up and Spins and then after it's mounted; we just close down
  Do this on every page
  */ 
    setTimeout(() => userStore.isLoading = false, 200)
})

const cards = ref([
    'visa.png',
    'mastercard.png',
    'paypal.png',
    'applepay.png',
])

const totalPriceComputed = computed(() => {
    let price = 0; // local variable of price which is be 0
    // loop through all of card
    userStore.cart.forEach(prod => {
        price += prod.price
    })
    return price / 100
})

const selectedRadioFunc = (e) => {

    if (!selectedArray.value.length) {
        selectedArray.value.push(e); // push the item to that array we've selected
        return
    }

    selectedArray.value.forEach((item, index) => {
      // which means doesn't exist in checkout[如果结账时不存在商品id]
        if (e.id != item.id) {
            selectedArray.value.push(e)
        } else {
            selectedArray.value.splice(index, 1);
        }
    })
}

const goToCheckout = () => {
    let ids = [];
      /* resetting to nothing, because when we go there we want to make sure that it's empty, 
  before we reset our checkout, because otherwise we'll just have duplicates in the checkout
  */ 
    userStore.checkout = [];
    // get all the selected arrays and loop through
    selectedArray.value.forEach(item => ids.push(item.id))

    let res = userStore.cart.filter((item) => {
        return ids.indexOf(item.id) != -1; // return the item has the same id
    })

    // don't get any proxy, wrapper that view puts on it. Just having a raw object being pushed to our checkout array
    res.forEach(item => userStore.checkout.push(toRaw(item)))

    return navigateTo('/checkout');
}
</script>

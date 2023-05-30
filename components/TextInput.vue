<template>
    <div>
        <client-only>
            <input 
                :placeholder="placeholder"
                :maxlength="max"
                class="
                    w-full
                    bg-white
                    text-gray-800
                    border
                    text-sm
                    border-[#EFF0EB]
                    rounded-lg
                    p-3
                    placeholder-gray-500
                    focus:outline-none
                " 
                @focus="isFocused = true"
                @blur="isFocused = false"
                :class="
                    {'border-gray-900': isFocused},
                    {'border-red-500': error}
                "
                :type="inputType"
                v-model="inputComputed"
                autocomplete="off"
            >
        </client-only>
        <span v-if="error" class="text-red-500 text-[14px] font-semibold">
            {{ error }}
        </span>
    </div>
                    
</template>

<script setup>
// define a emit which is going to update input, because we need to pass info out.
    const emit = defineEmits(['update:input'])
    // then we have props so we're defining those thing and then convert to refs;
    const props = defineProps(['input', 'placeholder', 'max', 'inputType', 'error'])
    const { input, placeholder, max, inputType, error } = toRefs(props)
    let isFocused = ref(false)
    const inputComputed = computed({
      // get the input value and then whenever it changes, we set the value and emit it out of this component
        get: () => input.value,
        set: (val) => emit('update:input', val)
    })
</script>
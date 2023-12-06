<template>
  <div class="header w-screen h-20 bg-white">
    <div class="p-4 flex">
      <div
        class="avatar w-12 h-12 bg-[#8CABD8] rounded-full flex items-center justify-center text-white mx-4"
      >
        <span class="text-xl">{{ initials }}</span>
      </div>
      <div class="">
        <p class="font-semibold text-xl">{{ props.name }}</p>
        <div class="flex">
          <img src="/whatsapp.svg" alt="whatsapp-icon" class="w-3.5 h-3.5" />
          <span class="text-[#636363] text-xs font-light ml-1">{{
            formattedPhoneNumber
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  phone_number: {
    type: String,
    default: "",
  },
});
const initials = computed(() => {
  const nameArray = props.name.split(" ");
  const initialsArray = nameArray.map((word) => word[0]);
  return initialsArray.join("").toUpperCase();
});
const formattedPhoneNumber = computed(() => {
  const cleaned = props.phone_number.replace(/\D/g, "");
  return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 6)} ${cleaned.slice(
    6,
    10
  )} ${cleaned.slice(10)}`;
});
</script>

<style></style>

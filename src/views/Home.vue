<template>
  <div class="bg-chat-pattern bg-[#8CABD8] w-screen h-screen flex flex-col">
    <Header :name="name" :phone_number="phone_number" />
    <Content />
    <InputBox />
  </div>
</template>

<script setup lang="ts">
import { toRef } from "vue";
import { globalState } from "../store";

import Header from "../components/Header.vue";
import InputBox from "../components/InputBox.vue";
import Content from "../components/Content.vue";

const name = toRef(globalState, "name");
const phone_number = toRef(globalState, "phone_number");
</script>

<template>
  <div class="bg-chat-pattern bg-[#8CABD8] w-screen h-screen flex flex-col">
    <Header :name="name" :phone_number="phone_number" />
    <Content :datachat="data_chat" />
    <InputBox />
  </div>
</template>

<script setup lang="ts">
import { toRef, onMounted, ref } from "vue";
import axios from "axios";
import { globalState } from "../store";

import Header from "../components/Header.vue";
import InputBox from "../components/InputBox.vue";
import Content from "../components/Content.vue";

const name = toRef(globalState, "name");
const phone_number = toRef(globalState, "phone_number");

const data_chat = ref([]);

const getChat = async () => {
  try {
    const response = await axios.get("/api/data?page=1&limit=10");
    data_chat.value = response.data;
  } catch (error) {
    console.error("Error fetching data from backend:", error);
  }
};
onMounted(() => {
  getChat();
});
</script>

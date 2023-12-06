<template>
  <form>
    <div
      class="input-box h-[67px] m-5 bg-white rounded-lg flex items-center py-2 px-3"
    >
      <button
        type="button"
        class="inline-flex justify-center p-2 rounded-lg cursor-pointer hover:bg-gray-100"
      >
        <img src="/icon_plus.svg" alt="icon_plus" />
      </button>
      <textarea
        id="chat"
        rows="1"
        class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Message..."
      ></textarea>
      <button
        type="submit"
        class="inline-flex justify-center p-2 rounded-lg cursor-pointer hover:bg-gray-100"
      >
        <img src="/icon_send.svg" alt="icon_send" />
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({
  typing: {
    type: String,
    default: "",
  },
});
</script>

<style></style>

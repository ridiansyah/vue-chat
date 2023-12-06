<template>
  <div class="content grow overflow-auto flex flex-col-reverse">
    <div class="py-2 px-5">
      <!-- DATE -->
      <div class="flex justify-center mb-2">
        <div
          class="rounded-xl py-1 px-4"
          style="background-color: rgba(61, 112, 184, 0.6)"
        >
          <p class="text-sm text-white">Today</p>
        </div>
      </div>

      <!-- FROM MYSELF -->
      <div class="flex justify-end mb-2">
        <div class="rounded-xl py-2 pl-3 bg-[#78E378]">
          <div class="flex">
            <div class="grow flex flex-col">
              <p class="grow text-base mt-1">Hello, World!</p>
              <div class="flex">
                <p class="grow text-right text-xs text-[#767676] mt-1">12:45</p>
                <img
                  class="pl-1"
                  src="/icon_doublecheckmark.svg"
                  alt="checkmark"
                />
              </div>
            </div>
            <button
              type="button"
              class="inline-flex justify-center p-1 rounded-lg cursor-pointer"
              @click="handleDropdown('R0')"
            >
              <img src="/icon_moregreen.svg" alt="icon_more" />
            </button>
            <!-- DROPDOWN MENU -->
            <div v-if="globalState.drop_down_open === 'R0'">
              <div class="overlay" @click="handleDropdown('')"></div>
              <div
                id="dropdown-menu"
                class="z-50 origin-top-right absolute right-2 mt-2 w-[124px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              >
                <div
                  class="py-2 p-2"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="dropdown-button"
                >
                  <a
                    class="flex block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                    role="menuitem"
                  >
                    Delete
                  </a>
                  <a
                    class="flex block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                    role="menuitem"
                  >
                    Reply
                  </a>
                </div>
              </div>
            </div>

            <!-- DROPDOWN MENU -->
          </div>
        </div>
      </div>

      <!-- FROM FRIEND -->
      <div class="flex mb-2">
        <div class="rounded-xl py-2 pr-3 bg-white">
          <div class="flex">
            <button
              type="button"
              class="inline-flex justify-center p-1 rounded-lg cursor-pointer"
              @click="handleDropdown('L0')"
            >
              <img src="/icon_moregrey.svg" alt="icon_more" />
            </button>
            <!-- DROPDOWN MENU -->
            <div v-if="globalState.drop_down_open === 'L0'">
              <div class="overlay" @click="handleDropdown('')"></div>
              <div
                id="dropdown-menu"
                class="z-50 origin-top-right absolute left-2 mt-2 w-[124px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              >
                <div
                  class="py-2 p-2"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="dropdown-button"
                >
                  <a
                    class="flex block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                    role="menuitem"
                  >
                    Delete
                  </a>
                  <a
                    class="flex block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                    role="menuitem"
                  >
                    Reply
                  </a>
                </div>
              </div>
            </div>

            <!-- DROPDOWN MENU -->
            <div class="grow flex flex-col">
              <p class="text-base mt-1">Hi Bro!</p>
              <div class="flex">
                <p class="grow text-right text-xs text-[#767676] mt-1">12:45</p>
                <img class="pl-1" src="/icon_checkmark.svg" alt="checkmark" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { globalState } from "../store";
// const props = defineProps({
//   typing: {
//     type: String,
//     default: "",
//   },
// });

const handleDropdown = (index: string) => {
  globalState.drop_down_open = index;
};
</script>

<style scoped>
/* Gaya untuk div overlay, menutupi seluruh layar */
.overlay {
  @apply fixed top-0 left-0 w-full h-full bg-opacity-0 flex justify-center items-center z-40;
}
</style>

<template>
  <div class="content grow overflow-auto flex flex-col-reverse">
    <div class="py-2 px-5">
      <div v-for="(item, index) in groupedData" :key="index">
        <div class="flex justify-center mb-2">
          <div
            class="rounded-xl py-1 px-4"
            style="background-color: rgba(61, 112, 184, 0.6)"
          >
            <p class="text-sm text-white">
              {{ item.data_date === currentDate ? "Today" : item.data_date }}
            </p>
          </div>
        </div>
        <div v-for="(items, indexs) in item.items" :key="indexs">
          <!-- FROM MYSELF -->
          <div
            v-if="items.froms === globalState.my_number"
            class="flex justify-end mb-2"
          >
            <div class="rounded-xl py-2 pl-3 bg-[#78E378]">
              <div class="flex">
                <div class="grow flex flex-col">
                  <p class="grow text-base mt-1">{{ items.text }}</p>
                  <div class="flex">
                    <p class="grow text-right text-xs text-[#767676] mt-1">
                      {{ JSON.parse(items.meta).time }}
                    </p>
                    <img
                      class="pl-1"
                      :src="
                        items.status === 'delivered'
                          ? 'icon_doublecheckmark.svg'
                          : '/icon_checkmark.svg'
                      "
                      alt="status"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  class="inline-flex justify-center p-1 rounded-lg cursor-pointer"
                  @click="handleDropdown(items.id)"
                >
                  <img src="/icon_moregreen.svg" alt="icon_more" />
                </button>
                <!-- DROPDOWN MENU -->
                <div v-if="globalState.drop_down_open === items.id">
                  <div class="overlay" @click="handleDropdown(0)"></div>
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
                        @click="$emit('delete', items.id)"
                      >
                        Delete
                      </a>
                      <a
                        class="flex block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
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
          <div
            v-else-if="items.froms === globalState.phone_number"
            class="flex mb-2"
          >
            <div class="rounded-xl py-2 pr-3 bg-white">
              <div class="flex">
                <button
                  type="button"
                  class="inline-flex justify-center p-1 rounded-lg cursor-pointer"
                  @click="handleDropdown(items.id)"
                >
                  <img src="/icon_moregrey.svg" alt="icon_more" />
                </button>
                <!-- DROPDOWN MENU -->
                <div v-if="globalState.drop_down_open === items.id">
                  <div class="overlay" @click="handleDropdown(0)"></div>
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
                        @click="$emit('delete', items.id)"
                      >
                        Delete
                      </a>
                      <a
                        class="flex block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                      >
                        Reply
                      </a>
                    </div>
                  </div>
                </div>

                <!-- DROPDOWN MENU -->
                <div class="grow flex flex-col">
                  <p class="text-base mt-1">{{ items.text }}</p>
                  <div class="flex">
                    <p class="grow text-right text-xs text-[#767676] mt-1">
                      {{ JSON.parse(items.meta).time }}
                    </p>
                    <img
                      class="pl-1"
                      :src="
                        items.status === 'delivered'
                          ? 'icon_doublecheckmark.svg'
                          : '/icon_checkmark.svg'
                      "
                      alt="status"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- DATE -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { globalState } from "../store";

interface DataItem {
  attachment: string;
  data_date: string;
  froms: string;
  id: number;
  meta: string;
  status: string;
  text: string;
  type: string;
}

interface GroupedData {
  data_date: string;
  items: DataItem[];
}

const props = defineProps({
  datachat: {
    type: Array,
    default: [],
  },
});

const handleDropdown = (index: number) => {
  globalState.drop_down_open = index;
};

const groupedData = computed<GroupedData[] | []>(() => {
  if (props.datachat.length > 0) {
    const result: { [key: string]: DataItem[] } = props.datachat.reduce(
      (acc: any, current: any) => {
        const dateKey = current.data_date;

        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }

        acc[dateKey].push({
          attachment: current.attachment,
          froms: current.froms,
          id: current.id,
          meta: current.meta,
          status: current.status,
          text: current.text,
          type: current.type,
        });

        return acc;
      },
      {}
    );

    return Object.keys(result).map((dateKey) => ({
      data_date: dateKey,
      items: result[dateKey],
    }));
  } else {
    return [];
  }
});

function getCurrentDate() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0, sehingga perlu ditambah 1
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}/${month}/${day}`;

  return formattedDate;
}

const currentDate = getCurrentDate();
</script>

<style scoped>
.overlay {
  @apply fixed top-0 left-0 w-full h-full bg-opacity-0 flex justify-center items-center z-40;
}
</style>

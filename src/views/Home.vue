<template>
  <div class="bg-chat-pattern bg-[#8CABD8] w-screen h-screen flex flex-col">
    <Header :name="name" :phone_number="phone_number" />
    <Content :datachat="data_chat" @delete="deleteChat" />
    <form @submit.prevent="submitChat">
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
          v-model="input_chat"
        ></textarea>
        <button
          type="submit"
          class="inline-flex justify-center p-2 rounded-lg cursor-pointer hover:bg-gray-100"
          :disabled="input_chat.trim() === ''"
        >
          <img src="/icon_send.svg" alt="icon_send" />
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { toRef, onMounted, ref, reactive } from "vue";
import axios from "axios";
import { globalState } from "../store";

import Header from "../components/Header.vue";
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

function getCurrentDate() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0, sehingga perlu ditambah 1
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}/${month}/${day}`;

  return formattedDate;
}
function getCurrentTime() {
  const currentTime = new Date();

  // Ambil jam dan menit dari objek Date
  const hours = String(currentTime.getHours()).padStart(2, "0");
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");

  // Gabungkan jam dan menit dengan format HH:mm
  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
}

const input_chat = ref("");
const response = ref(null);

const updateStatus = async (prevData: any) => {
  try {
    await axios.put("/api/data/" + prevData.id, prevData.dataSend);
  } catch (error: any) {
    console.error("Error:", error.message);
  }
};

const submitBalas = async (prevData: any) => {
  updateStatus(prevData);
  try {
    const dataToSend = {
      id: 0,
      type: "text",
      from: globalState.phone_number,
      status: "sent",
      text: "Hallo, pesan ini dibalas oleh komputer. Saya sedang sibuk, nanti saya akan menghubungi anda ketika tersedia.",
      attachment: "",
      meta: JSON.stringify({
        header: {
          text: "Lorem Ipsum",
        },
        body: [
          {
            index: 1,
            type: "text",
            text: "oke",
          },
          {
            index: 2,
            type: "image",
            attachmentUrl: "oke",
          },
          {
            index: 3,
            type: "text",
            text: "asdf",
          },
        ],
        time: getCurrentTime(),
      }),
      date: getCurrentDate(),
    };
    const axiosResponse = await axios.post("/api/data", dataToSend);
    response.value = axiosResponse.data;
    getChat();
  } catch (error: any) {
    console.error("Error:", error.message);
  }
};

const submitChat = async () => {
  try {
    const dataToSend = {
      id: 0,
      type: "text",
      from: globalState.my_number,
      status: "sent",
      text: input_chat.value,
      attachment: "",
      meta: JSON.stringify({
        header: {
          text: "Lorem Ipsum",
        },
        body: [
          {
            index: 1,
            type: "text",
            text: "oke",
          },
          {
            index: 2,
            type: "image",
            attachmentUrl: "oke",
          },
          {
            index: 3,
            type: "text",
            text: "asdf",
          },
        ],
        time: getCurrentTime(),
      }),
      date: getCurrentDate(),
    };
    const axiosResponse = await axios.post("/api/data", dataToSend);
    response.value = axiosResponse.data;
    if (axiosResponse.status == 200) {
      if (Number(axiosResponse.data) !== 1) {
        const dataByID = {
          attachment: "",
          date: "",
          from: "",
          meta: "",
          status: "",
          text: "",
          type: "",
        };
        const response = await axios.get(
          "/api/data/" + (Number(axiosResponse.data) - 1)
        );
        if (response.status !== 200) {
          dataByID.attachment = response.data?.attachment;
          dataByID.date = response.data?.data_date;
          dataByID.from = response.data?.froms;
          dataByID.meta = response.data?.meta;
          dataByID.status = "delivered";
          dataByID.text = response.data?.text;
          dataByID.type = response.data?.type;

          updateStatus({
            id: Number(axiosResponse.data) - 1,
            dataSend: dataByID,
          });
        }
      }
      if (input_chat.value.includes("#balas")) {
        input_chat.value = "";
        submitBalas({
          dataSend: {
            type: dataToSend.text,
            from: dataToSend.from,
            status: "delivered",
            text: dataToSend.text,
            attachment: dataToSend.attachment,
            meta: dataToSend.meta,
            date: dataToSend.date,
          },
          id: axiosResponse.data,
        });
      } else {
        input_chat.value = "";
        getChat();
      }
    }
  } catch (error: any) {
    console.error("Error:", error.message);
  }
};

const deleteChat = async (id: number) => {
  try {
    const axiosResponse = await axios.delete("/api/data/" + id);
    response.value = axiosResponse.data;
    if (axiosResponse.status == 200) {
      getChat();
    }
  } catch (error: any) {
    console.error("Error:", error.message);
  }
};
</script>

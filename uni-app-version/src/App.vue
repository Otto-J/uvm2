<template>
  <div className="w-full h-screen bg-gray-900 flex flex-col items-center justify-center space-y-6">
    <h1 className="text-4xl font-bold text-white">What version of `uni-app` should we use?</h1>
    <div class="flex justify-center items-center">
      <Select class="w-48" v-model="version">
        <SelectTrigger>
          <SelectValue placeholder="Select version" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="vue3">Vue3</SelectItem>
          <SelectItem value="vue3-alpha">Vue3 Alpha</SelectItem>
          <SelectItem value="vue2">Vue2</SelectItem>
          <SelectItem value="vue2-alpha">Vue2 Alpha</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div class="border rounded-md p-4">
      <h2 className="text-2xl font-semibold text-white underline">{{ source }}</h2>
    </div>
    <Button className="bg-green-500 text-white rounded-lg px-5 py-2" @click="setCopy">Copy</Button>
  </div>
</template>
<script lang="ts" setup>
import { useClipboard } from "@vueuse/core";
import { ref, watchEffect } from "vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/index";
import { Button } from "@/components/ui/button/index";

const source = ref("npx @dcloudio/uvm@latest abc");
const { copy, copied } = useClipboard({ source });

const version = ref("vue3");

const setCopy = () => {
  copy(source.value);
};

watchEffect(() => {
  if (version.value === "vue3") {
    source.value = "npx @dcloudio/uvm@latest vue3";
  } else if (version.value === "vue3-alpha") {
    source.value = "npx @dcloudio/uvm@latest vue3-alpha";
  } else if (version.value === "vue2") {
    source.value = "npx @dcloudio/uvm@latest vue2";
  } else if (version.value === "vue2-alpha") {
    source.value = "npx @dcloudio/uvm@latest vue2-alpha";
  }
});

watchEffect(() => {
  if (copied.value) {
    alert("Copied!");
  }
});
</script>

<style></style>

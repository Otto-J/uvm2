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
import { ref, watchEffect, onMounted } from "vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/index";
import { Button } from "@/components/ui/button/index";
import { getVersions, parseVersion, type IVersionInfo } from "./model";

const source = ref("npx @dcloudio/uvm@latest");
const { copy, copied } = useClipboard({ source });

const version = ref("");

const setCopy = () => {
  copy(source.value);
};
let versions: IVersionInfo[] = [];

watchEffect(() => {
  let arr: IVersionInfo[] = [];

  // debugger
  if (version.value === "vue3") {
    arr = versions.filter((item) => item.isVue3 && !item.version.includes("alpha"));
  } else if (version.value === "vue3-alpha") {
    arr = versions.filter((item) => item.isVue3 && item.version.includes("alpha"));
  } else if (version.value === "vue2") {
    arr = versions.filter((item) => item.isVue2 && !item.version.includes("alpha"));
  } else if (version.value === "vue2-alpha") {
    // debugger;
    arr = versions.filter((item) => item.isVue2 && item.version.includes("alpha"));
  } else {
    source.value = "Please select Vue's version";
    return;
  }
  const latest = Math.max(...arr.map((i) => i.buildTimeStamp));

  const final = arr
    .filter((i) => i.buildTimeStamp === latest)
    .sort((a, b) => Number(a.times) - Number(b.times));

  source.value = "npx @dcloudio/uvm@latest " + (final[0]?.rawVersion ?? "");
});

watchEffect(() => {
  if (copied.value) {
    alert("Copied!");
  }
});

onMounted(async () => {
  const _versions = await getVersions();

  const versionInfos = _versions.map((item) => parseVersion(item));
  console.log(versionInfos);
  versions = versionInfos;
});
</script>

<style></style>

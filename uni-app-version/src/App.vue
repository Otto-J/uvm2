<template>
  <div className="w-full h-screen bg-gray-900 flex flex-col items-center justify-center space-y-6">
    <h1 className="text-4xl font-bold text-white">What version of `uni-app` should we use?</h1>
    <Select className="bg-white text-gray-900">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select version" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="v1">Vue3</SelectItem>
        <SelectItem value="v2">Vue3 Alpha</SelectItem>
        <SelectItem value="v3">Vue2</SelectItem>
        <SelectItem value="v4">Vue2 Alpha</SelectItem>
      </SelectContent>
    </Select>
    <Button className="bg-green-500 text-white rounded-lg px-5 py-2">Confirm</Button>
    <h2 className="text-2xl font-semibold text-white underline">npx @dcloudio/uvm abc</h2>
  </div>
</template>
<script lang="ts" setup>
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select/index";
import { Button } from "@/components/ui/button/index";
</script>

<style></style>

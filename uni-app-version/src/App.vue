<template>
  <div className="w-full h-screen bg-gray-900 flex flex-col items-center justify-center space-y-6">
    <h1 className="text-4xl font-bold text-white">What version of `uni-app` should we use?</h1>
    <Select className="bg-white text-gray-900">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select version" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="v1">Version 1.0</SelectItem>
        <SelectItem value="v2">Version 2.0</SelectItem>
        <SelectItem value="v3">Version 3.0</SelectItem>
      </SelectContent>
    </Select>
    <Button className="bg-green-500 text-white rounded-lg px-5 py-2">Confirm</Button>
    <h2 className="text-2xl font-semibold text-white">Select your preferred version</h2>
  </div>
</template>
<script lang="ts" setup>
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
</script>

<style></style>

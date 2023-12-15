import versions from "./versions.json";

/**
 * 循环遍历版本，找到最新的版本
 * 1. 找到 isVue3=true ，不带 alpha 的最新版本
 * 2. 找到 isVue3=true ，带 alpha 的最新版本
 * 3. 找到 isVue2=true，不带 alpha 的最新版本
 * 4. 找到 isVue2=true，带 alpha 的最新版本
 */

const findVue3Alpha = versions.find(
  (item) => item.isVue3 && item.version.includes("alpha")
)?.rawVersion;
const findVue3 = versions.find(
  (item) => item.isVue3 && !item.version.includes("alpha")
)?.rawVersion;
const findVue2Alpha = versions.find(
  (item) => item.isVue2 && item.version.includes("alpha")
)?.rawVersion;
const findVue2 = versions.find(
  (item) => item.isVue2 && !item.version.includes("alpha")
)?.rawVersion;

console.log("findVue3Alpha: ", findVue3Alpha);
console.log("findVue3: ", findVue3);
console.log("findVue2Alpha: ", findVue2Alpha);
console.log("findVue2: ", findVue2);

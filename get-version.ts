const URL = "https://registry.npmmirror.com/@dcloudio/uni-app";
import fs from "node:fs";

export const main = async () => {
  const res = await fetch(URL);
  const data = await res.json();
  const versions = Object.keys(data.versions);
  console.log(versions);
  // fs write
  fs.writeFileSync("versions2.json", JSON.stringify(versions));
};

main();

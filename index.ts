import semver from "semver";
import versions from "./versions";
import fs from "node:fs";

const DEMO_RETURN = {
  version: "3.0.0",
  isVue3: true,
  isVue2: false,
  isAlpha: true,
  ideVersion: "4.0.0",
  ideVersionRaw: "40000",
  buildAt: "2023-12-14",
  buildTimeStamp: 0,
  times: "002",
  rawVersion: "",
};

type IVersionInfo = typeof DEMO_RETURN;

/**
 * 解析构建版本信息
 * example: 3.0.0-alpha-4000020231214002
 * example 3.0.0-3061420221215001
 * 返回信息 {
 *     version: '3.0.0-alpha',
 *      isVue3: true,
 *      isAlpha: true,
 *    ideVersion: '4.0.0',
 *    ideVersionRaw:'40000',
 *    buildAt:'2023-12-14',
 *    buildTimeStamp: 1671052800000,
 *  times: '002',
 *  rawVersion: '3.0.0-alpha-4000020231214002'
 * }
 * @param version 版本号
 * @return VersionInfo
 */
export function parseVersion(version: string): IVersionInfo {
  const versionInfo: IVersionInfo = {
    version: "",
    isVue3: false,
    isVue2: false,
    isAlpha: false,
    ideVersion: "",
    ideVersionRaw: "",
    buildAt: "",
    buildTimeStamp: 0,
    times: "",
    rawVersion: version,
  };

  // 对 version 进行 - 分割
  const versionSplit = version.split("-");

  // 判断分割后是否包含 alpha 判断，并且长度为是否为 alpha 版本 2 还是 3
  if (versionSplit.length === 2) {
    versionInfo.isAlpha = true;
    versionInfo.version = versionSplit[0];
  } else if (versionSplit.length === 3) {
    versionInfo.isAlpha = true;
    versionInfo.version = versionSplit[0] + "-" + versionSplit[1];
  } else {
    // log 未处理情况
    console.log("未处理情况", version);
    versionInfo.version = versionSplit[0];
  }

  // 判断是否为 vue2 vue3 版本，判断 semver 版本是 2 还是 3，使用 semver 进行判断
  const semverVersion = semver.parse(versionInfo.version);
  if (semverVersion) {
    if (semverVersion.major === 2) {
      versionInfo.isVue2 = true;
    } else if (semverVersion.major === 3) {
      versionInfo.isVue3 = true;
    } else {
      // log 未处理情况
      console.log("未处理情况", version);
      versionInfo.isVue2 = false;
      versionInfo.isVue3 = false;
    }
  }

  // 对最后一位进行判断，把类似 3090820231120001 处理为 30908-20231120-001

  const isOldVersionLength = 14;
  const isNewVersionLength = 16;

  const lastVersion = versionSplit[versionSplit.length - 1];
  const lastVersionSplitLength = lastVersion.length;

  // length 16
  if (lastVersionSplitLength === isNewVersionLength) {
    // 按照 30908-20231120-001 进行分割
    const ideVersionRaw = lastVersion.slice(0, 5);
    const buildAt = lastVersion.slice(5, 13);
    const times = lastVersion.slice(13, 16);
    // 把 30908 分给成 3.98，第一个 0 替换为 . 第二个零处理为空字符串，最后转 Number
    const ideVersion = Number(ideVersionRaw.replace("0", ".").replace("0", "")).toFixed(2);

    versionInfo.ideVersion = ideVersion;
    versionInfo.ideVersionRaw = ideVersionRaw;
    versionInfo.buildAt = buildAt.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
    versionInfo.buildTimeStamp = new Date(versionInfo.buildAt).getTime();
    versionInfo.times = times;
  } else if (lastVersionSplitLength === isOldVersionLength) {
    // 36920221121001 按照 369-20221121-001 进行分割
    const ideVersionRaw = lastVersion.slice(0, 3);
    const buildAt = lastVersion.slice(3, 11);
    const times = lastVersion.slice(11, 14);

    // 把 369 处理为 3.69
    const ideVersion = Number(ideVersionRaw[0] + "." + ideVersionRaw.slice(1)).toFixed(2);

    versionInfo.ideVersion = ideVersion;
    versionInfo.ideVersionRaw = ideVersionRaw;
    versionInfo.buildAt = buildAt.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
    versionInfo.buildTimeStamp = new Date(versionInfo.buildAt).getTime();
    versionInfo.times = times;
  } else {
    // log 未处理情况
    console.log("未处理情况3", version);
  }

  return versionInfo;
}

const a = versions.map(parseVersion);

fs.writeFileSync("./versions.json", JSON.stringify(a, null, 2));

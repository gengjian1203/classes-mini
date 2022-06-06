// child_process.execSync(command[, options])
// http://nodejs.cn/api/child_process.html#child_process_child_process_execsync_command_options
// git pretty-formats
// https://git-scm.com/docs/pretty-formats

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// 拷贝文件
const copyFile = (src, dst) => {
  if (fs.existsSync(src)) {
    fs.writeFileSync(dst, fs.readFileSync(src));
    // fs.createReadStream(src).pipe(fs.createWriteStream(dst));大文件复制
  } else {
    console.log(`copy ${src} files found`);
  }
};

// 获取指定时间字符串
const getStringDate = (date = new Date()) => {
  const YYYY = String(date.getFullYear());
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const DD = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  const timeString = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
  const monthString = `${YYYY}-${MM}`;
  const dayString = `${YYYY}-${MM}-${DD}`;

  return {
    date,
    YYYY,
    MM,
    DD,
    hh,
    mm,
    ss,
    timeString: timeString,
    monthString: monthString,
    todayString: dayString,
  };
};

// 获取git信息
const getGitInfo = () => {
  let res = {};
  try {
    res = JSON.parse(
      execSync(
        `git log -1 --pretty=format:"{\\"hash\\":\\"%H\\",\\"author\\":\\"%an\\",\\"date\\":\\"%ad\\",\\"commit\\":\\"%s\\"}"`,
        { encoding: "utf8" }
      )
    );
  } catch (e) {}

  return res;
};

// 获取时间戳信息
const getPublishInfo = () => {
  return {
    publish: getStringDate().timeString,
  };
};

// 写入文件
const writeBuildInfo = (content) => {
  const file = path.resolve("./client/src/config/buildInfo.json");
  console.log("writeBuildInfo", file);

  try {
    fs.writeFileSync(file, content);
    console.log(`写入成功`);
  } catch (e) {
    console.log(`write ${file} files found`, e);
  }
};

const main = () => {
  const resGit = getGitInfo() || {};
  const resTime = getPublishInfo() || {};

  const res = {
    ...resGit,
    ...resTime,
  };

  const content = `${JSON.stringify(res)}`;

  writeBuildInfo(content);

  console.log("main", content);
};

main();

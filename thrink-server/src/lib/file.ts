import fs from "fs";

export const convertBase64ToPngFile = async (
  uid: number,
  fileType: string,
  imgData: string
) => {
  // imgDataがURLの場合は処理しない
  console.log(imgData);
  console.log(`http出始めっているか ${imgData.startsWith("http")}`);
  if (imgData.startsWith("http") || imgData.startsWith("https")) {
    return imgData;
  }
  const path = `./src/userContent/${uid}-${fileType}.png`;
  // TODO 環境でURLを変更する
  const urlPath =
    process.env.APP_MODE === "development"
      ? `http://localhost:3000/user-content/${uid}-${fileType}.png`
      : `https://api.thrink.net/user-content/${uid}-${fileType}.png`;
  const base64Data = imgData.replace(/^data:([A-Za-z-+/]+);base64,/, "");
  fs.writeFileSync(path, base64Data, { encoding: "base64" });
  return urlPath;
};

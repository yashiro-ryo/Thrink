/**
 * 該当するページのコンテンツを返す関数
 * 存在しないページを指定した場合は1ページを返す
 * @param array ページング済みの配列
 * @param index 指定のページ数
 */
export const getTargetPage = (array: Array<Array<any>>, index: number) => {
  if (array.length < index || index <= 0) {
    return array[0];
  }
  return array[index - 1];
};

/**
 * ページに分割する関数
 * @param array tragetとなる配列
 * @param pageContentsNum 1ページに何個コンテンツを格納するかを指定する変数
 */
export const splitPage = (
  array: Array<any>,
  pageContentsNum: number
): Array<Array<any>> => {
  // 処理結果が格納される配列
  const results: Array<Array<any>> = [];
  // 1ページのコンテンツが格納される配列
  let result: Array<any> = [];
  let num = 0;
  array.forEach((v, i) => {
    result.push(v);
    num++;
    if (num >= pageContentsNum) {
      num = 0;
      results.push(result);
      result = [];
    } else if (i === array.length - 1) {
      results.push(result);
    }
  });
  console.log("split page result");
  console.log(results);
  return results;
};

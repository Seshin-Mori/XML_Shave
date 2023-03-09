"use strict";

// DOM要素の取得
const originalTextarea = document.getElementById("original-code");
const modifiedTextarea = document.getElementById("modified-code");
const modifyButton = document.getElementById("modify-button");

// XMLコードを修正する関数
function modifyXmlCode(code) {
  // objectタグのtooltip属性を削除する
  let modifiedCode = code.replace(/tooltip=".*?"/g, "");

  // paddingleft属性の値が5以外の数字だった場合、paddingleft属性の値を5にする
  modifiedCode = modifiedCode.replace(/paddingleft="(\d+)"/g, (match, p1) => {
    if (p1 !== "5") {
      // 5以外の数字だった場合 5に置換 5だった場合は何もしない
      return 'paddingleft="5"';
    } else {
      // 5だった場合 何もしない
      return match;
    }
  });

  //paddingright属性の値が5以外の数字だった場合、paddingright属性の値を5にする
  modifiedCode = modifiedCode.replace(/paddingright="(\d+)"/g, (match, p1) => {
    if (p1 !== "5") {
      // 5以外の数字だった場合 5に置換 5だった場合は何もしない
      return 'paddingright="5"';
    } else {
      // 5だった場合 何もしない
      return match;
    }
  });

  //objectタグの中に、値が#ffffffのbackground-color属性があった場合、同じタグのheight属性の値を30にする
  modifiedCode = modifiedCode.replace(
    /<object.*?background-color="#ffffff".*?height="(\d+)".*?>/g,
    (match, p1) => {
      if (p1 !== "30") {
        // 30以外の数字だった場合 30に置換 30だった場合は何もしない
        return match.replace(/height="\d+"/, 'height="30"');
      } else {
        // 30だった場合 何もしない
        return match;
      }
    }
  );

  //background-colorとheightの順序逆バージョン
  modifiedCode = modifiedCode.replace(
    /<object.*?height="(\d+)".*?background-color="#ffffff".*?>/g,
    (match, p1) => {
      if (p1 !== "30") {
        // 30以外の数字だった場合 30に置換 30だった場合は何もしない
        return match.replace(/height="\d+"/, 'height="30"');
      } else {
        // 30だった場合 何もしない
        return match;
      }
    }
  );

  //objectタグの中に、値が#ffffffのbackground-color属性があった場合、同じタグのwidth属性の値をvalue属性の値の文字数×6+25にする
  modifiedCode = modifiedCode.replace(
    /<object.*?background-color="#ffffff".*?value="(.+?)".*?>/g,
    (match, p1) => {
      // value属性の値の文字数を取得（全角2文字、半角1文字扱い）
      const valueLength = p1.replace(/[^\x00-\xff]/g, "aa").length;

      // width属性の値を計算
      const width = valueLength * 6 + 25;

      // width属性の値を置換
      return match.replace(/width="\d+"/, `width="${width}"`);
    }
  );

  //background-colorとvalueの順序逆バージョン
  modifiedCode = modifiedCode.replace(
    /<object.*?value="(.+?)".*?background-color="#ffffff".*?>/g,
    (match, p1) => {
      const valueLength = p1.replace(/[^\x00-\xff]/g, "aa").length;

      const width = valueLength * 6 + 25;

      return match.replace(/width="\d+"/, `width="${width}"`);
    }
  );

  // objectタグの中に、値が#ffffffのbackground-color属性があり、かつ、value属性の値が整数だった場合、同じタグのhorizontalalign属性の値を2にする
  modifiedCode = modifiedCode.replace(
    /<object.*?background-color="#ffffff".*?value="(\d+)".*?>/g,
    (match, p1) => {
      // value属性の値が整数だった場合
      if (p1.match(/^\d+$/)) {
        // horizontalalign属性の値を2に置換
        return match.replace(/horizontalalign="\d+"/, 'horizontalalign="2"');
      } else {
        // value属性の値が整数ではなかった場合 何もしない
        return match;
      }
    }
  );

  //background-colorとvalueの順序逆バージョン
  modifiedCode = modifiedCode.replace(
    /<object.*?value="(\d+)".*?background-color="#ffffff".*?>/g,
    (match, p1) => {
      if (p1.match(/^\d+$/)) {
        return match.replace(/horizontalalign="\d+"/, 'horizontalalign="2"');
      } else {
        return match;
      }
    }
  );

  return modifiedCode;
}

// 修正ボタンがクリックされた時の処理
modifyButton.addEventListener("click", () => {
  // 修正前のXMLコードを取得
  const originalCode = originalTextarea.value;

  // XMLコードを修正する
  const modifiedCode = modifyXmlCode(originalCode);

  // 修正後のXMLコードを表示
  modifiedTextarea.value = modifiedCode;
});

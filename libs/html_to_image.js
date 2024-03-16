const htmlToImage = require('node-html-to-image');
const fs = require('fs');

async function convertHtmlToPng(htmlFilePath) {
  try {
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
    const modifiedHtmlContent = htmlContent.replace(
      '<head>',
      `<head>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Noto Sans JP', sans-serif;
        }
      </style>`
    );
    await htmlToImage({
      output: htmlFilePath.replace('.html', '.png'),
      html: modifiedHtmlContent
    });
    console.log(`Converted ${htmlFilePath} to PNG.`);
  } catch (error) {
    console.error('Failed to convert HTML to PNG:', error);
  }
}

// コマンドライン引数からHTMLファイルのパスを取得
const htmlFilePath = process.argv[2];

// HTMLをPNGに変換
convertHtmlToPng(htmlFilePath);

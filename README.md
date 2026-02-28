# plantuml-editor

PlantUML のテキストをブラウザで編集し、**画像 URL** と **埋め込み用 HTML (`<img>`)** を作成できる、静的サイト構成のオンラインエディタです。

公開 URL: https://plantuml-editor.chroco.ooo/

## 主な機能

- CodeMirror ベースのエディタで PlantUML テキストを編集
- `描画` ボタンでプレビュー画像を生成
- PNG / SVG 形式の切り替え生成
- 生成した画像 URL と Embed 文字列をワンクリックでコピー
- `localStorage` への一時保存 / 復元
- 100 個のサンプルをカテゴリ別に読み込み

## 使い方

1. 左側エディタに PlantUML 記法を入力します。
2. `描画` を押してプレビューを生成します。
3. 必要に応じて `PNG` / `SVG` ボタンで出力形式を切り替えます。
4. `イメージURL` / `Embed` の `COPY` ボタンで貼り付け用データを取得します。
5. `保存` を押すと、編集中の内容をブラウザに一時保存できます。

### サンプルの利用

- 画面上部のプルダウンからサンプルを選択すると、カテゴリ別の PlantUML 例を読み込めます。
- `作業中を表示` を選ぶと、`localStorage` の一時保存内容（なければ初期サンプル）に戻ります。

## ローカルでの起動方法

このプロジェクトはビルド不要の静的ファイル構成です。`docs/` をドキュメントルートとして配信してください。

例:

```bash
cd docs
python -m http.server 8000
```

ブラウザで `http://localhost:8000` にアクセスします。

> `file://` 直開きでは `fetch("samples.json")` が制限される環境があるため、HTTP サーバ経由を推奨します。

## ディレクトリ構成

```text
.
├── README.md
└── docs/
    ├── index.html      # UI
    ├── index.js        # 画面ロジック（圧縮・URL生成・保存・コピーなど）
    ├── index.css       # スタイル
    ├── samples.json    # サンプル一覧
    ├── samples/*.pu    # PlantUML サンプル本体
    └── libs/js-deflate # PlantUML URL 生成用 deflate ライブラリ
```

## 仕組み（画像 URL 生成）

PlantUML テキストを UTF-8 化 → deflate 圧縮 → PlantUML 形式の Base64 変換を行い、
以下の形式の URL を組み立てて画像を表示します。

```text
https://app.livlog.xyz/plantuml/{png|svg}/{encoded}
```

## 利用している主なライブラリ

- [Bulma](https://bulma.io/)（UI）
- [CodeMirror 5](https://codemirror.net/5/)（テキストエディタ）
- [jQuery](https://jquery.com/)（DOM 操作）
- [SweetAlert2](https://sweetalert2.github.io/)（ダイアログ）
- `js-deflate`（圧縮処理）

## 注意事項

- 生成画像は外部の PlantUML 画像生成エンドポイントに依存します。
- クリップボードコピー機能は、ブラウザの `navigator.clipboard` が利用できる環境で動作します。
- 一時保存データはブラウザごとの `localStorage` に保存され、端末間では共有されません。

## ライセンス

リポジトリに明示的な LICENSE ファイルがないため、必要に応じて管理者へ確認してください。

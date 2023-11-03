# プログラミングコンテスト(卒業制作)

## フロント・UI 共通

### Prefix

ブランチ名・コミット・プルリク等で使用します。
基本的には feat だと思います。UI 班は style です。

| prefix   | 内容                               |
| -------- | ---------------------------------- |
| feat     | 新規機能追加、機能のアップデート   |
| fix      | バグの修正                         |
| hotfix   | 致命的なバグの修正                 |
| style    | CSS の追加・修正                   |
| test     | テストの追加・修正                 |
| clean    | リファクタリング、フォーマット修正 |
| delete   | ファイル・コードの削除             |
| rename   | ファイル名の変更                   |
| move     | ファイルの移動                     |
| revert   | 修正の取り消し                     |
| docs     | ドキュメントの追加・修正           |
| settings | 設定ファイルの追加・修正           |

### ブランチ運用

`{prefix}-作業対象`です。例えばサインアップページの追加であれば、`feat-signup-page`、CSSの作成であれば、`style-signup-page`です。基本的に 1 つの機能につき 1 つのブランチを切ります。


### コミット

ある程度小さい粒度でコミットしてください。例えばサインアップページであれば

1. UI 部分の作成
2. 入力フォーム部分の作成
3. API 通信部分の作成

などです。

メッセージは`{prefix}: 作業内容`です。例えば`feat: API通信部分の作成`などです。

## フロントエンド

### フォルダ構成

参考 : https://zenn.dev/yodaka/articles/eca2d4bf552aeb

ここで言う汎用的とは、複数のページや機能で呼び出すことのあるものを指します。例えば、アドレスと本文を渡すとメールを送信する関数は汎用的ですが、アドレスを渡すとパスワードリセットのメールを送信する関数は汎用的ではありません。

| フォルダ名               | 役割                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| src/components/elements/ | 汎用的なコンポーネント 検索バーとか                                                                          |
| src/components/layouts/  | 汎用的なレイアウトコンポーネント ヘッダーとかフッターとか                                                    |
| src/features/            | 特定の機能に関するhooks、定数、型など全て詰め込む                                                            |
| src/pages/               | ページ`components/features/`にある実体を呼び出す                                                             |
| src/styles/              | 全てのページに適用される CSS あんまりいじらない                                                              |
| src/types/               | 汎用的な型定義                                                                                               |
| src/utils/               | 汎用的な関数 文字列を数値に変換する関数とか                                                                  |

今回のシステムでは、3つの独立したページがあるので以下のようになります。

| フォルダ名               | 役割                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| src/pages/employee/\*    | 従業員側のページを呼び出します                                                                               |
| src/pages/order/\*       | 注文端末側のページを呼び出します                                                                             |
| src/pages/user/\*        | ユーザー側のページを呼び出します                                                                             |

基本的にファイル名ではなくフォルダ名で識別します。`foo/bar.ts`ではなく、`foo/bar/index.ts`です。

CSS ファイルは各コンポーネントごとに作成します。`~/Foo/index.tsx`に適用する CSS は`~/Foo/index.module.{css,scss}`に記述します。全てのページに適用させたいものは`styles/globals.css`をいじります。

例えばサインアップページを作る際には、`features/auth/`に実体、必要な関数を記述し`pages/signup.tsx`で呼び出すようにします。

### 命名規則

#### ファイル・フォルダ名

なお、index.\* は必ず index.\* です。

| path              | rule    |
| ----------------- | ------- |
| src/components/\* | FooBar  |
| src/pages/\*      | foo-bar |
| src/features/\*   | FooBar  |
| src/utils/\*      | FooBar  |
| src/types/\*      | FooBar  |
| src/styles/\*     | foo-bar |

#### 変数名

| 分類           | rule    |
| -------------- | ------- |
| 変数           | fooBar  |
| 関数           | fooBar  |
| コンポーネント | FooBar  |
| クラス         | FooBar  |
| 定数           | FOO_BAR |

### コーディングルール

#### 変数

- `any`型は使用しない。
- 変数宣言は基本的に`const`を使用してください。
  - どうしても再代入したい場合は`let`を使用してください。
- 文字列連結にはバッククォート(`)を使用してください。

```javascript
const str = "foo";
const num = 10;
console.log(`${str} bar ${num}`);
// foo bar 10
```

#### ループ

- `for`を使用した配列操作は非推奨です。
  - map, filter などを使用してください。<br>
    参考: [map](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [filter](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

```javascript
const arr = [1, 2, 3, 4, 5];

const arr2 = arr.map((val) => val * 2);
// [2, 4, 6, 8, 10]

const even = arr.filter((val) => val % 2 === 0);
// [2, 4]
```

- 配列をループで回したい場合は`forEach`もしくは`拡張for文`を使用してください。
  - index が必要な場合は`forEach`それ以外は`拡張for文`の使用を推奨します。

```javascript
const arr = ["foo", "bar", "buz"];

arr.forEach((value, index) => {
  console.log(`${index}:${value}`);
});
// 0:foo
// 1:bar
// 2:buz

for (const value of arr) {
  console.log(`${value}`);
}
// foo
// bar
// buz
```

#### 分岐

- 厳密等価演算子を使用してください。
  - `10 == "10"` -> `true`, `10 === "10"` -> `false`
- !foo は使用しない
  - `!foo` は`false`だけでなく`null`, `undefined`や`0`も`true`になってしまうため、意図しないバグを引き起こします。
- JSX 内での分岐は三項演算子を使用してください。
  - 複雑になる場合はコンポーネント設計を見直してください。

#### 関数

- 関数宣言は基本的にアロー関数を使用してください。
- 引数、返り値の型定義をしてください。
  - 返り値は型推論に任せてもよいです。
- 早期 return をする
  - if-else がネストする場合は早期 return を検討してください。

```javascript
const foo = () => {
  // BAD
  if (よくないこと) {
    alert("よくないです");
  } else {
    // なんやかんや
    if (よくないこと2) {
      alert("よくないです");
    } else {
      // なんやかんや
    }
  }

  // GOOD
  if (よくないこと) {
    alert("よくないです");
    return;
  }
  // なんやかんや
  if (よくないこと2) {
    alert("よくないです");
    return;
  }
  // なんやかんや
};
```

- フラグ引数は基本的に使用しないでください。
- 基本的に 1 ファイルにつき 1 export です。
- export default は src/pages/ 以外では使用しないでください。
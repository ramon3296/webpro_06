# webpro_06

## このプログラムについて

## ファイル一覧

| ファイル名         | 説明                 |
| ------------------ | -------------------- |
| app5.js            | プログラム本体       |
| public/janken.html | じゃんけんの開始画面 |



```mermaid
flowchart TD;
開始 --> 終了;
```

```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"条件に合うか"}
win["勝ち"]
loose["負け"]

start --> if
if -->|yes| win
win --> end1
if -->|no| loose
loose --> end1
```

app5.js
じゃんけんの勝ち負け判定

```mermaid
flowchart TD;

start["開始"];
input["入力（手：グー、チョキ、パー）"];
cpu["CPUの手をランダムに決定"];
check_result{"勝敗の判定"};
result_win["結果：勝ち"];
result_draw["結果：引き分け"];
result_lose["結果：負け"];
end1["終了"];

start --> input --> cpu --> check_result;

check_result -->|勝ち| result_win;
check_result -->|引き分け| result_draw;
check_result -->|負け| result_lose;

result_win --> end1;
result_draw --> end1;
result_lose --> end1;
```

bmi を計算

```mermaid
flowchart TD;

    start2["開始"];
    get_params["ユーザーの身長と体重を取得"];
    convert["bmiを計算"];
    calculate["体重÷身長の二乗を実行"];
    display_sum["結果を表示"];
    end2["終了"];
    start2 --> get_params --> convert --> calculate --> display_sum --> end2;
```

日付の表示

```mermaid
flowchart TD;

    start3["開始"];
    get_today["現在の日付を取得"];
    format_date["日付を YYYY-MM-DD 形式にフォーマット"];
    send_response["日付をクライアントに送信"];
    end3["終了"];
    start3 --> get_today --> format_date --> send_response --> end3;
```

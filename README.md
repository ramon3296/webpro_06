# webpro_06

## プログラムドキュメント

## ファイル一覧

| ファイル名         | 説明                 |
| ------------------ | -------------------- |
| app5.js            | プログラム本体       |
|views/janken.ejs| じゃんけん開始画面|
| views/bmi.ejs　　　 | bmi算出開始画面|
| views/weekday.ejs | 曜日算出開始画面|
| public/janken.html | じゃんけんの結果表示用HTMLファイル　|



## 起動方法
・ターミナルから node app5js を実行して、サーバー8080を立ち上げる

・ブラウザで以下のURLを検索する

じゃんけん：http://localhost:8080/janken

　　プレイヤーの手とCPUの手から勝敗を算出し public/janken.html に反映する

bmi：http://localhost:8080/bmi

　　入力された身長と体重からbmiを計算する
  
曜日表示：http://localhost:8080/weekday

　　入力された日付から曜日を計算し表示する




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

曜日の表示

```mermaid
flowchart TD;

    start3["開始"];
    get_today["現在の日付を取得"];
    format_date["日付を YYYY-MM-DD 形式にフォーマット"];
    send_response["日付をクライアントに送信"];
    end3["終了"];
    start3 --> get_today --> format_date --> send_response --> end3;
```

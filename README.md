# Thrink
![Thrink](https://github.com/yashiro-ryo/Thrink/blob/develop/thrink-client/docs/images/slide-top.png)

## 概要
Thrinkは部活動の地域移行に関する課題を解決するために制作されたWebアプリケーションです。

リンク: [Thrink](https://www.thrink.net)

## 制作背景

### 部活動地域移行の始まり

2023年度より教員の長時間勤務の解消を目的として、部活動を地域のクラブチームに移行する部活動の地域移行が始まりました。

参考: [運動部活動の地域移行について: スポーツ庁](https://www.mext.go.jp/content/20220727-mxt_kyoiku02-000023590_2-1.pdf)


### 地域移行の課題点
地域移行に関して以下の課題点が存在します。

1. 専門性や資質を有する指導者の量を確保する必要がある。 

2. 生徒・保護者がスポーツ団体の活動内容を知る機会が少ない。

### 実は多い受賞経験のある学生

これまでスポーツを長年続けてきて、不完全燃焼に終わってしまった学生も少なくなく、

県大会で上位の成績を残したり、全国大会に出場したりしたことのある実績をもつ学生も意外と多いです。 

上記の地域移行に関する課題の解消を目的に制作されたWebアプリケーションが、Thrinkです。

### Thrinkの目指している未来像

Thrinkによって、上記の課題を解消させるとともに、くすぶっている学生の心にもう一度火が灯されることが期待できる。

それにより、子どもたちにとっての地域との関わりが広がり、

子どもたちだけでなく指導者として勤める学生たちにも、郷土愛やスポーツ愛がさらに養われていくのではないかと考える。

## このアプリケーションでできること

### Chatによるコミュニケーション
![chatページの画像](https://github.com/yashiro-ryo/Thrink/blob/develop/thrink-client/docs/images/chat.png)

### 求人の登録、編集機能
![求人ページの画像](https://github.com/yashiro-ryo/Thrink/blob/develop/thrink-client/docs/images/job.png)
### プロフィールから気になった人にメッセージを送ることが可能

![メッセージを送るスライドの写真](https://github.com/yashiro-ryo/Thrink/blob/develop/thrink-client/docs/images/profile-to-message.png)
## 使用技術

### アプリケーション
![アプリケーション使用技術の写真](https://github.com/yashiro-ryo/Thrink/blob/develop/thrink-client/docs/images/tech.png)
### インフラストラクチャ
![インフラ構成図の写真](https://github.com/yashiro-ryo/Thrink/blob/develop/thrink-client/docs/images/infrastructure.png)

## 技術的に工夫した点
1. DBに保存されているユーザーのダイジェストをサーバー内にキャッシュしておくことでターンアラウンドタイムが短縮しました
2. チャットページを含む全ページをレスポンシブ対応しました
3. 配信する画像の容量削減やスケルトンPlaceholderの使用によるwebパフォーマンスチューニングを行いました

## 技術的に大変だった点
1. DBからデータを取得する際の非同期処理の実装 → async await の勉強になった
2. チャットページの状態管理 → Reduxを使用して管理した

## 今後の展望
![今後の展望のスライド](https://github.com/yashiro-ryo/Thrink/blob/develop/thrink-client/docs/images/feature.png)



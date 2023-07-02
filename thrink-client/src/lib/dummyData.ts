export type Student = {
  displayName: string
  uid: number
  affiliation: string
  comment: string
  tags: Array<string>
}

export const dummyStudentData: Array<Student> = [
  {
    displayName: '川上 洋平',
    uid: 123456789,
    affiliation: '広島大学',
    comment: '子供達にサッカーを指導したいです。',
    tags: ['サッカー', '全中経験', 'インターハイ経験'],
  },
  {
    displayName: '島田 用事',
    uid: 11111111,
    affiliation: '徳島大学',
    comment: '子供達に水泳を教えています。',
    tags: ['水泳', '経験者'],
  },
  {
    displayName: '矢代 涼',
    uid: 123456789,
    affiliation: '徳島大学',
    comment: '使い方よくわかりませんががんばります。',
    tags: ['プログラミング', '初心者'],
  },
  {
    displayName: '梁川 玲奈',
    uid: 123456789,
    affiliation: '香川大学',
    comment: '剣道を小学生の時から10年続けています。',
    tags: ['剣道', '全国大会経験'],
  },
]

export type Group = {
  displayName: string
  uid: number
  location: string
  comment: string
  tags: Array<string>
}

export const dummyGroupData: Array<Group> = [
  {
    displayName: '徳島中学校 剣道部',
    uid: 7970978097,
    location: '徳島県徳島市',
    comment: '2022年度全中出場',
    tags: ['剣道', '武道'],
  },
  {
    displayName: '徳島サッカー少年団',
    uid: 5659875876,
    location: '徳島県徳島市',
    comment: '子供の成長にあった練習をしています。',
    tags: ['サッカー', '小学生', '中学生'],
  },
  {
    displayName: '高松サッカー少年団',
    uid: 689787899,
    location: '香川県高松市',
    comment: 'サッカー日本一を目指しています',
    tags: ['日本一', 'サッカー', '少年少女'],
  },
]

export type Profile = {
  uid: number
  introduction: string
  career: string
  links: string
}

export const profiles: Array<Profile> = [
  {
    uid: 123456789,
    introduction:
      '私は徳島県出身です。徳島大学でChatGPTについて研究しています。¥n私は徳島大学でChatGPTの学習に活用をする研究をしています。',
    career: '徳島市立高校 -> 徳島大学¥n松浦研究室所属',
    links: 'Twitter: <rink>https://github.com</rink>¥nFaceBook: <rink>https://yahoo.co.jp</rink>',
  },
  {
    uid: 11111111,
    introduction:
      '私は水泳を12年やっています。高山高校に進学後、インターハイ出場、インカレ出場。現在では地元で更新の指導にあったています。',
    career: '高山高校 -> 広島大学',
    links: 'ブログ: https://hogehoge.com',
  },
]

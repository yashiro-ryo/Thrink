export class StudentsRepository {
  students = [
    {
      id: 1,
      name: "矢代 涼",
      organization: "徳島大学 理工学部 理工学科",
      comment: "プログラミングを教えることが得意です。",
    },
    {
      id: 2,
      name: "山田 太郎",
      organization: "広島大学 理学部 数学科",
      comment: "水泳を10年間やっています。全国大会出場経験あり。",
    },
    {
      id: 3,
      name: "川島 与四郎",
      organization: "岡山大学 理工学部 情報工学科",
      comment:
        "サッカーを小学校からやっています。インターハイ出場経験があります。",
    },
  ];

  studentsProfile = [
    {
      id: 1,
      introduction:
        "こんにちは、私の名前はエミリオです。私は情熱的な旅行者であり、世界中を巡りながら異なる文化と人々に触れることが大好きです。写真撮影や地元料理の試食など、旅の醍醐味を存分に楽しんでいます。",
      career:
        "私はイラストレーターとしての経歴を持っています。幅広いテーマに対応し、子供向けの絵本から雑誌のイラストまで様々なプロジェクトに携わってきました。鮮やかな色彩と独自のスタイルを駆使し、ストーリーをビジュアルで豊かに表現することを得意としています。",
      links: {
        twitter: "",
        facebook: "",
        instagram: "",
      },
    },
    {
      id: 2,
      introduction:
        "はじめまして、リサと申します。私は創造的なアーティストであり、主にキャンバスやデジタルメディアを使って表現しています。自然の美しさや内面の感情を捉えることに情熱を持ち、自分の作品を通じて人々に感動や共感を届けたいと思っています。",
      career:
        "私はデジタルマーケティングの分野で経験を積んできました。主にソーシャルメディア広告やコンテンツ戦略の策定、SEOの最適化などに従事しました。データ分析とクリエイティブなアプローチを組み合わせ、企業のオンラインプレゼンスを強化するための戦略を立案しました。",
      links: {
        twitter: "",
        facebook: "",
        instagram: "https://github.com/yashiro-ryo",
      },
    },
    {
      id: 3,
      introduction:
        "どうも、マックスです。私はスポーツ好きで、特にサッカーに情熱を注いでいます。競技の魅力や戦術について研究し、自身もアマチュアサッカーチームでプレーしています。スポーツは人々を結びつけ、健康で活気あるライフスタイルを促進する重要な要素だと信じています。",
      career:
        "私はソフトウェア開発者としても経験を持っています。主にWebアプリケーションの開発に従事し、フロントエンドとバックエンドの開発を担当してきました。最新のテクノロジーとベストプラクティスを駆使し、ユーザビリティとセキュリティに優れたアプリケーションを提供することに注力しました。",
      links: {
        twitter: "",
        facebook: "",
        instagram: "",
      },
    },
  ];

  getAllStudents() {
    // TODO: ページング実装
    return this.students;
  }

  getStudent(uid: number) {
    return this.students.filter((student) => {
      return student.id === uid;
    });
  }

  getStudentProfile(uid: number) {
    return this.studentsProfile.filter((profile) => {
      return profile.id === uid;
    });
  }
}

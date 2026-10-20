export type Note = { string: number; fret: number; beats: number };
export type Phrase = {
  id: string;
  title: string;
  subtitle: string;
  level: string;
  bpm: number;
  color: string;
  notes: Note[];
};
export const phrases: Phrase[] = [
  {
    id: "first",
    title: "はじめての4ビート",
    subtitle: "まずは、開放弦でリズムを感じよう。",
    level: "はじめの一歩",
    bpm: 60,
    color: "peach",
    notes: Array.from({ length: 8 }, () => ({ string: 4, fret: 0, beats: 1 })),
  },
  {
    id: "walk",
    title: "小さなウォーキング",
    subtitle: "0・2・3フレットを、ゆっくりつなぐ。",
    level: "かんたん",
    bpm: 70,
    color: "sage",
    notes: [0, 0, 2, 3, 0, 0, 3, 2].map((fret) => ({
      string: 4,
      fret,
      beats: 1,
    })),
  },
  {
    id: "strings",
    title: "2本の弦を行ったり来たり",
    subtitle: "E弦とA弦の移動に慣れよう。",
    level: "かんたん",
    bpm: 65,
    color: "lavender",
    notes: [
      { string: 4, fret: 0, beats: 2 },
      { string: 3, fret: 0, beats: 2 },
      { string: 4, fret: 3, beats: 2 },
      { string: 3, fret: 2, beats: 2 },
    ],
  },
  {
    id: "groove",
    title: "はじめての8ビート",
    subtitle: "短い音も長い音も、リズムにのせて。",
    level: "ステップアップ",
    bpm: 60,
    color: "blue",
    notes: [
      { string: 4, fret: 0, beats: 1 },
      { string: 4, fret: 0, beats: 0.5 },
      { string: 4, fret: 0, beats: 0.5 },
      { string: 4, fret: 3, beats: 1 },
      { string: 3, fret: 2, beats: 1 },
      { string: 3, fret: 0, beats: 1 },
      { string: 3, fret: 0, beats: 0.5 },
      { string: 3, fret: 2, beats: 0.5 },
      { string: 4, fret: 3, beats: 2 },
    ],
  },
];
export type Lesson = {
  id: number;
  title: string;
  subtitle: string;
  minutes: number;
  theme: string;
  steps: {
    title: string;
    text: string;
    tip: string;
    visual: "bass" | "strings" | "tab" | "rhythm" | "hand";
  }[];
};
export const lessons: Lesson[] = [
  {
    id: 1,
    title: "ベースって、どんな楽器？",
    subtitle: "各パーツの名前と、ベースの役割を知ろう。",
    minutes: 3,
    theme: "peach",
    steps: [
      {
        title: "音楽の土台をつくる、低い音。",
        text: "ベースは低い音でリズムとハーモニーを支える楽器。ドラムと一緒に曲の土台をつくります。まずは好きな曲の中から、低い音の動きを探してみましょう。",
        tip: "上手に弾こうとする前に、低い音を楽しむことから。",
        visual: "bass",
      },
      {
        title: "3つのパーツを覚えよう。",
        text: "弦を巻きつける「ヘッド」、左手で押さえる細長い「ネック」、音を拾うピックアップがついた「ボディ」。ネックの表側にある指板には、金属のフレットが並んでいます。",
        tip: "自分のベースで、ヘッド・ネック・ボディを指さしてみよう。",
        visual: "bass",
      },
    ],
  },
  {
    id: 2,
    title: "ベースの持ち方・構え方",
    subtitle: "無理のない姿勢で、楽器と仲よく。",
    minutes: 4,
    theme: "sage",
    steps: [
      {
        title: "肩の力を抜いて構えよう。",
        text: "椅子に浅く座り、右利きの場合は右太ももの上にボディのくぼみをのせます。背中を丸めすぎず、ネックを少し上向きに。左利きの場合は左右を反対にしてください。",
        tip: "座った状態でもストラップを使うと、楽器が安定します。",
        visual: "hand",
      },
      {
        title: "手首を自然な角度に。",
        text: "左手の親指をネックの裏に軽く添え、指先で弦に触れます。ネックを強く握り込まず、肘と手首に余裕を持たせましょう。右腕はボディに軽くのせます。",
        tip: "痛みを感じたら一度休んで、楽器の高さと手首の角度を調整しよう。",
        visual: "hand",
      },
    ],
  },
  {
    id: 3,
    title: "4本の弦とフレット",
    subtitle: "弦の名前と、押さえる場所を覚えよう。",
    minutes: 5,
    theme: "lavender",
    steps: [
      {
        title: "太い弦から、E・A・D・G。",
        text: "標準チューニングの4弦ベースは、いちばん太い4弦がE、3弦がA、2弦がD、いちばん細い1弦がGです。このアプリの指板は、上から1弦・2弦・3弦・4弦の順に表示します。",
        tip: "演奏前にチューナーで E・A・D・G に合わせておこう。",
        visual: "strings",
      },
      {
        title: "フレットのすぐ手前を押さえる。",
        text: "フレットはヘッド側から1、2、3…と数えます。3フレットなら、3番目の金属の棒のすぐ手前（ヘッド側）を押さえます。「0」はどこも押さえない開放弦です。",
        tip: "フレットの真上ではなく、その少し手前を指先で押さえよう。",
        visual: "strings",
      },
    ],
  },
  {
    id: 4,
    title: "はじめて音を出してみよう",
    subtitle: "指弾きとミュートの基本を体験。",
    minutes: 5,
    theme: "blue",
    steps: [
      {
        title: "人差し指と中指で、やさしく。",
        text: "右手の親指をピックアップなどに添え、人差し指で弦を軽く引っかけて鳴らします。慣れたら人差し指と中指を交互に。弦を強く引っ張りすぎず、小さな動きで弾きましょう。",
        tip: "最初は4弦の開放弦を、1音ずつ丁寧に。",
        visual: "hand",
      },
      {
        title: "音を止めることも、演奏のひとつ。",
        text: "鳴らしたくない弦に右手や左手で軽く触れて、余計な響きを止めます。これが「ミュート」。まずは、音を出す→指で触れて止める、をゆっくり繰り返しましょう。",
        tip: "押さえていた指を少し緩め、弦に触れたままにすると音を止められます。",
        visual: "strings",
      },
    ],
  },
  {
    id: 5,
    title: "TAB譜を読んでみよう",
    subtitle: "4本の線と数字が、演奏の道しるべ。",
    minutes: 5,
    theme: "peach",
    steps: [
      {
        title: "線が「弦」、数字が「フレット」。",
        text: "TAB譜の4本の横線は4本の弦。上から1弦（G）、2弦（D）、3弦（A）、4弦（E）です。線の上の数字は、押さえるフレットを表しています。左から右へ読み進めます。",
        tip: "いちばん下の線に「3」なら、4弦の3フレット。",
        visual: "tab",
      },
      {
        title: "0は、何も押さえずに弾く。",
        text: "数字の「0」は開放弦です。「0 → 2 → 3」と並んでいれば、開放弦、2フレット、3フレットの順番に弾きます。まずはテンポを気にせず、数字と指の位置を対応させましょう。",
        tip: "覚えたらTAB譜クイズで、理解を確かめてみよう。",
        visual: "tab",
      },
    ],
  },
  {
    id: 6,
    title: "リズムにのってみよう",
    subtitle: "一定のテンポで、一音ずつ。",
    minutes: 4,
    theme: "sage",
    steps: [
      {
        title: "BPMは、1分間の拍の数。",
        text: "BPM 60なら1秒に1拍、BPM 120なら0.5秒に1拍です。まずはBPM 60で「1・2・3・4」と数えながら、クリック音に合わせて手をたたいてみましょう。",
        tip: "速さより、一定のテンポを保つことを大切に。",
        visual: "rhythm",
      },
      {
        title: "4分音符と8分音符。",
        text: "4/4拍子では、4分音符が1拍。8分音符はその半分の長さです。「1と2と3と4と」と数えると、8分音符のリズムをつかみやすくなります。2分音符は2拍伸ばします。",
        tip: "このアプリの練習ガイドは、音符の長さに合わせて進みます。",
        visual: "rhythm",
      },
    ],
  },
  {
    id: 7,
    title: "最初のフレーズを弾こう",
    subtitle: "これまでの学びを、ひとつの演奏に。",
    minutes: 6,
    theme: "lavender",
    steps: [
      {
        title: "弾く前に、譜面を眺めよう。",
        text: "「小さなウォーキング」は4弦の0・2・3フレットを使うフレーズ。まずはTAB譜を見て、押さえる場所をゆっくり確認します。2フレットは人差し指、3フレットは中指を使ってみましょう。",
        tip: "指板のハイライトと、自分の指の位置を見比べよう。",
        visual: "tab",
      },
      {
        title: "4拍のカウントで、スタート。",
        text: "演奏練習でフレーズを選び、無理なく弾けるBPMに設定します。4拍のカウントが終わったら演奏開始。難しければ一時停止して確認し、繰り返し練習しましょう。",
        tip: "最後まで弾けたら、それが今日の成長。小さな一歩を積み重ねよう。",
        visual: "rhythm",
      },
    ],
  },
];
export const questions = [
  {
    id: 0,
    string: 4,
    fret: 3,
    kind: "choice",
    options: [
      "4弦の3フレット",
      "3弦の4フレット",
      "1弦の3フレット",
      "4弦の開放弦",
    ],
    correct: 0,
    explanation: "いちばん下の線は4弦（E）。数字の「3」は3フレットを表します。",
  },
  {
    id: 1,
    string: 3,
    fret: 0,
    kind: "choice",
    options: [
      "3弦を弾かない",
      "3弦の開放弦",
      "4弦の1フレット",
      "3弦の1フレット",
    ],
    correct: 1,
    explanation: "0は開放弦。左手でフレットを押さえず、3弦（A）を弾きます。",
  },
  {
    id: 2,
    string: 2,
    fret: 2,
    kind: "board",
    options: [],
    correct: 0,
    explanation: "上から2番目の線は2弦（D）。指板の2弦・2フレットが正解です。",
  },
  {
    id: 3,
    string: 1,
    fret: 5,
    kind: "choice",
    options: [
      "4弦の5フレット",
      "1弦の開放弦",
      "1弦の5フレット",
      "2弦の5フレット",
    ],
    correct: 2,
    explanation:
      "いちばん上の線は1弦（G）。数字の5なので、1弦の5フレットです。",
  },
  {
    id: 4,
    string: 4,
    fret: 2,
    kind: "board",
    options: [],
    correct: 0,
    explanation:
      "いちばん下の線は4弦（E）。2フレットのすぐ手前を押さえましょう。",
  },
];

import type { TimedNote, TimedRest } from "./music.ts";

type ScaleNote = {
  name: string;
  string: number;
  fret: number;
  finger: "人差し指" | "中指" | "薬指" | "小指";
  positionHint?: string;
};
export type Note = TimedNote & {
  fingering?: Omit<ScaleNote, "string" | "fret">;
};
export type PracticeNoteBeats = 1 | 0.5;
export type Phrase = {
  id: string;
  title: string;
  subtitle: string;
  level: string;
  bpm: number;
  color: string;
  notes: (Note | TimedRest)[];
  loopRest?: TimedRest;
  scaleTip?: string;
  positionGuide?: string;
};

const cMajorPosition: ScaleNote[] = [
  { name: "ド", string: 3, fret: 3, finger: "中指" },
  { name: "レ", string: 3, fret: 5, finger: "小指" },
  { name: "ミ", string: 2, fret: 2, finger: "人差し指" },
  { name: "ファ", string: 2, fret: 3, finger: "中指" },
  { name: "ソ", string: 2, fret: 5, finger: "小指" },
  { name: "ラ", string: 1, fret: 2, finger: "人差し指" },
  { name: "シ", string: 1, fret: 4, finger: "薬指" },
  { name: "ド", string: 1, fret: 5, finger: "小指" },
];

function scaleNotes(position: ScaleNote[], order: (number | ScaleNote)[]): Note[] {
  return order.map((step) => {
    const { string, fret, ...fingering } =
      typeof step === "number" ? position[step] : step;
    return { string, fret, beats: 1, fingering };
  });
}

const quarterRest: TimedRest = { rest: true, beats: 1 };

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
  {
    id: "scale-round-trip",
    title: "ドレミ 基本の往復",
    subtitle: "ドレミファソラシドを上り下りして、音階と指使いを覚える練習。",
    level: "初級",
    bpm: 60,
    color: "sage",
    notes: [
      ...scaleNotes(cMajorPosition, [0, 1, 2, 3, 4, 5, 6, 7]),
      quarterRest,
      ...scaleNotes(cMajorPosition, [7, 6, 5, 4, 3, 2, 1, 0]),
    ],
    loopRest: quarterRest,
    scaleTip: "ゆっくり始め、手の位置を保ったまま、音の長さと音量をそろえましょう。使わない弦は空いている指で軽く触れて、余計な音を止めます。",
  },
  {
    id: "scale-thirds",
    title: "ドレミ 3度インターバル",
    subtitle: "音を1つ飛ばして弾き、指板上の音の位置と指の移動に慣れる練習。",
    level: "初級〜中級",
    bpm: 60,
    color: "lavender",
    notes: scaleNotes(cMajorPosition, [
      0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7,
      {
        ...cMajorPosition[6],
        positionHint: "シを弾いたら、左手全体を高いフレット側へ移動。",
      },
      {
        name: "レ",
        string: 1,
        fret: 7,
        finger: "小指",
        positionHint: "4〜7Fの位置に移動し、小指で7Fを押さえます。",
      },
      // This C ends the ascent and starts the first descending pair.
      {
        ...cMajorPosition[7],
        finger: "中指",
        positionHint: "ドの次のラに備えて、左手を2〜5Fへ戻します。",
      },
      5, 6, 4, 5, 3, 4, 2, 3, 1, 2, 0,
    ]),
    scaleTip: "最初は音の位置をゆっくり確認しましょう。指を小さく動かし、音が飛ぶところも同じリズムで。慣れてきたら少しずつBPMを上げます。",
    positionGuide: "シ→レでは、指を無理に伸ばさず、左手全体を移動します。移動後は4Fを人差し指、5Fを中指、6Fを薬指、7Fを小指で担当します。7Fのレから5Fのドに中指で戻り、次のラで基本ポジションに戻ります。",
  },
];
export type TechniqueVisual = "pick" | "two-finger" | "slap";

export type Lesson = {
  id: number;
  title: string;
  subtitle: string;
  minutes: number;
  theme: string;
  technique?: { level: "基礎" | "発展"; comparison: string };
  steps: {
    title: string;
    text: string;
    tip: string;
    points?: string[];
    visual?: "bass" | "strings" | "tab" | "rhythm" | "hand" | TechniqueVisual;
  }[];
};
// Array order sets the course sequence. IDs are used in URLs and saved progress.
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
    id: 8,
    title: "ピック奏法",
    subtitle: "ピックの先で弦をはじき、輪郭のはっきりした音を出そう。",
    minutes: 6,
    theme: "peach",
    technique: {
      level: "基礎",
      comparison: "ピックで弦をはじく。音の出だしがくっきりしていて、ロックやパンクでよく使われます。",
    },
    steps: [
      {
        title: "奏法の概要",
        text: "ピックは、弦をはじくための小さな板です。右手でピックを持ち、先端を弦に軽く通して音を出します。このレッスンでは右利きの構えを例にします。左利き用のベースでは左右を反対にしてください。",
        tip: "いちばん太い4弦（E弦）を、左手で押さえずに1音鳴らしてみよう。",
      },
      {
        title: "音の特徴",
        text: "ピックが弦をはじく瞬間の音が目立ちます。この音の出だしを「アタック」と呼びます。アタックが強く、弦を弾くたびに輪郭のはっきりした音が出るため、ロックやパンクなどでよく使われます。",
        tip: "同じ弦を指とピックで弾き、音の出だしを聴き比べよう。",
      },
      {
        title: "基本的な弾き方",
        text: "ピックの先が弦に触れたら、手首を小さく動かして通り抜けます。",
        points: [
          "人差し指を軽く曲げ、その側面にピックをのせます。親指の腹で軽く挟み、先端を少しだけ出します。",
          "ピックを太い弦側から細い弦側へ動かすのがダウンピッキング、その逆がアップピッキングです。",
          "同じ弦でダウンとアップを交互に繰り返します。この弾き方を「オルタネイトピッキング」と呼びます。",
        ],
        tip: "アップでもダウンと同じくらい浅くピックを当てよう。",
        visual: "pick",
      },
      {
        title: "練習方法",
        text: "4弦の開放弦（左手で押さえていない弦）を使います。メトロノームをBPM 60（1秒に1拍）に設定し、クリック音1回につき1音弾きます。",
        points: [
          "ダウンだけで4音、次にアップだけで4音を弾きます。",
          "ダウン・アップ・ダウン・アップと4音弾き、同じ音量で弾けるまで繰り返します。",
        ],
        tip: "声に出して「下・上・下・上」と数えると、交互の動きを覚えやすくなります。",
      },
      {
        title: "注意点",
        text: "ピックが弦に引っかかるときは、弦に当てる先端を浅くします。ピックがずれない程度に軽く持ち、肩や手首の力を抜きましょう。鳴らしたくない弦には空いている指で軽く触れ、振動を止めます。",
        tip: "引っかかった方向だけをゆっくり4回練習してから、ダウンとアップを交互に弾こう。",
      },
    ],
  },
  {
    id: 9,
    title: "ツーフィンガー奏法",
    subtitle: "人差し指と中指を交互に使い、音の粒をそろえよう。",
    minutes: 6,
    theme: "sage",
    technique: {
      level: "基礎",
      comparison: "人差し指と中指で交互に弾く。温かみのある柔らかな音で、ポップスやジャズなど幅広いジャンルに使われます。",
    },
    steps: [
      {
        title: "奏法の概要",
        text: "ツーフィンガー奏法は、弦を弾く手の人差し指と中指を交互に使う指弾きです。2本の指が1音ずつ受け持ちます。図は右利きの構えです。左利き用のベースでは左右を反対にしてください。",
        tip: "まずは手を軽く開き、人差し指と中指を1本ずつ動かしてみよう。",
      },
      {
        title: "音の特徴",
        text: "指先の腹で弦をはじくと、温かみのある柔らかな音になります。弾く位置や力加減で音の出だしを調整でき、ポップス、ロック、ジャズなど幅広いジャンルで使われます。",
        tip: "同じ弦をピックアップの近くとネック寄りで弾き、音の違いを聴いてみよう。",
      },
      {
        title: "基本的な弾き方",
        text: "親指を支えにして、2本の指を同じ場所で、同じくらいの深さで弦に当てます。",
        points: [
          "右手の親指をピックアップ（弦の振動を拾う部品）の縁に軽く置きます。手首は自然な角度に保ち、指は軽く曲げます。",
          "3弦（A弦）に人差し指の腹を当て、太い弦側へなでるように通します。弾き終えた指は隣の4弦（E弦）に軽く触れます。",
          "次は中指で同じ動きをします。片方の音が大きいときは、弦に当てる深さや動く幅をそろえましょう。",
        ],
        tip: "3弦より細い弦を弾くときは、親指を4弦などに軽く移して支えにできます。",
        visual: "two-finger",
      },
      {
        title: "練習方法",
        text: "3弦（A弦）を左手で押さえずに弾きます。BPM 60（1秒に1拍）のクリック音に合わせ、1拍ずつ音を出します。",
        points: [
          "人差し指で4音、中指で4音を弾き、それぞれの音量を聴きます。",
          "人差し指・中指の順で計8音を弾きます。慣れたら中指からも始め、どちらも同じ音量になるか確かめます。",
        ],
        tip: "人差し指と中指の2音をひと組として聴き、音が大きいほうの指の力を少し抜こう。",
      },
      {
        title: "注意点",
        text: "弦を指板から浮かせる方向に強く引っ張ると、弦が指板に当たって大きな音が出ます。指の腹を弦の上で滑らせるように小さく動かしましょう。手首を曲げすぎたり、親指を押し付けたりすると疲れやすくなります。",
        tip: "どちらの指で弾いたか音だけで分からないくらい、音量をそろえてみよう。",
      },
    ],
  },
  {
    id: 10,
    title: "スラップ奏法",
    subtitle: "親指で叩く音と、指ではじく音を組み合わせよう。",
    minutes: 8,
    theme: "lavender",
    technique: {
      level: "発展",
      comparison: "親指で叩く動きと指で引いて離す動きを組み合わせる。打楽器のように歯切れのよい音で、ファンクでよく使われます。",
    },
    steps: [
      {
        title: "奏法の概要",
        text: "スラップ奏法では、親指で弦を叩く「サムピング」と、人差し指などで弦を引いて離す「プル」を組み合わせます。1音ずつ安定して鳴らしたり、余計な音を止めたりできるようになったら試してみましょう。図は右利きの構えです。左利き用のベースでは左右を反対にしてください。",
        tip: "最初はサムピングとプルを別々に練習しよう。",
      },
      {
        title: "音の特徴",
        text: "弦がフレット（指板上の金属の棒）に当たる音が混ざるため、打楽器のような歯切れのよい音が出ます。太い弦をサムピングで鳴らし、細い弦をプルではじくと、低い音と高い音の対比をつけやすくなります。ファンクなどでよく使われます。",
        tip: "4弦のサムピングと2弦のプルで、音の高さと出だしの違いを聴こう。",
      },
      {
        title: "基本的な弾き方",
        text: "弦を叩く場所は、ネックとボディがつながるあたりの指板の端が目安です。",
        points: [
          "サムピングは、親指を弦に沿わせ、手首をドアノブを回すように軽くひねります。親指の関節付近の側面を4弦に当て、弦が鳴るようすぐ離します。",
          "プルは、人差し指の先を2弦の下に浅くかけ、指板から少し離す方向に引いて離します。弦が戻る勢いで音が出ます。",
          "鳴らしたくない弦には空いている指を軽く添えます。こうして余計な響きを止める「ミュート」で、1音ずつはっきり聞こえるようになります。",
        ],
        tip: "まずは一方の動きだけで、狙った弦が小さな力で鳴る場所を見つけよう。",
        visual: "slap",
      },
      {
        title: "練習方法",
        text: "左手で押さえない開放弦を使い、各音の後に弦へ軽く触れて音を止めます。",
        points: [
          "4弦のサムピングを4回、次に2弦（D弦）のプルを4回、1音ずつ練習します。",
          "BPM 60（1秒に1拍）で、1拍目に4弦を叩き、3拍目に2弦をプルします。2拍目と4拍目は音を止めます。",
        ],
        tip: "弾いた弦以外が響くときは、速さを落として空いている指で軽く触れよう。",
      },
      {
        title: "注意点",
        text: "強く叩いたり大きく引っ張ったりすると、手が疲れやすく、ほかの弦も鳴りやすくなります。動きを小さくし、親指が弦に当たったらすぐ離します。手首や指に痛みが出たら練習を止めて休みましょう。",
        tip: "サムピングとプルを組み合わせる前に、1音鳴らす、止める、を繰り返そう。",
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

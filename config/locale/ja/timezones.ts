/**
 * タイムゾーン表示名 - 日本語
 */
const timezones: Record<string, string> = {
  // UTC ベース
  UTC: "(UTC+00:00) 協定世界時",

  // UTC-12 to UTC-9 (太平洋とアメリカ西部)
  "Pacific/Kwajalein": "(UTC+12:00) 国際日付変更線西",
  "Pacific/Apia": "(UTC+13:00) サモア",
  "Pacific/Midway": "(UTC-11:00) 協定世界時-11",
  "America/Adak": "(UTC-10:00) アリューシャン列島",
  "Pacific/Honolulu": "(UTC-10:00) ハワイ",
  "Pacific/Marquesas": "(UTC-09:30) マルケサス諸島",
  "America/Anchorage": "(UTC-09:00) アラスカ",
  "America/Whitehorse": "(UTC-07:00) ユーコン",

  // UTC-8 (太平洋時間帯)
  "America/Tijuana": "(UTC-08:00) バハカリフォルニア",
  "America/Los_Angeles": "(UTC-08:00) 太平洋時間 (米国およびカナダ)",

  // UTC-7 (山地時間帯)
  "America/Phoenix": "(UTC-07:00) アリゾナ",
  "America/Mazatlan": "(UTC-07:00) ラパス、マサトラン",
  "America/Denver": "(UTC-07:00) 山地時間 (米国およびカナダ)",

  // UTC-6 (中部時間帯)
  "America/Cancun": "(UTC-05:00) チェトゥマル",
  "America/Guatemala": "(UTC-06:00) 中央アメリカ",
  "America/Chicago": "(UTC-06:00) 中部時間 (米国およびカナダ)",
  "Pacific/Easter": "(UTC-06:00) イースター島",
  "America/Mexico_City": "(UTC-06:00) グアダラハラ、メキシコシティ、モンテレー",
  "America/Regina": "(UTC-06:00) サスカチュワン",

  // UTC-5 (東部時間帯)
  "America/Bogota": "(UTC-05:00) ボゴタ、リマ、キト、リオブランコ",
  "America/New_York": "(UTC-05:00) 東部時間 (米国およびカナダ)",
  "America/Port-au-Prince": "(UTC-05:00) ハイチ",
  "America/Havana": "(UTC-05:00) ハバナ",
  "America/Indianapolis": "(UTC-05:00) インディアナ (東部)",
  "America/Grand_Turk": "(UTC-05:00) タークス・カイコス諸島",

  // UTC-4 (大西洋時間帯)
  "America/Caracas": "(UTC-04:00) カラカス",
  "America/Punta_Arenas": "(UTC-03:00) プンタアレナス",
  "America/Asuncion": "(UTC-03:00) アスンシオン",
  "America/Halifax": "(UTC-04:00) 大西洋時間 (カナダ)",
  "America/Cuiaba": "(UTC-04:00) クイアバ",
  "America/La_Paz": "(UTC-04:00) ジョージタウン、ラパス、マナウス、サンファン",
  "America/Santiago": "(UTC-04:00) サンティアゴ",

  // UTC-3:30 to UTC-3
  "America/St_Johns": "(UTC-03:30) ニューファンドランド",
  "America/Araguaina": "(UTC-03:00) アラグアイナ",
  "America/Sao_Paulo": "(UTC-03:00) ブラジリア",
  "America/Fortaleza": "(UTC-03:00) カイエンヌ、フォルタレザ",
  "America/Buenos_Aires": "(UTC-03:00) ブエノスアイレス",
  "America/Montevideo": "(UTC-03:00) モンテビデオ",
  "America/Miquelon": "(UTC-03:00) サンピエール島・ミクロン島",
  "America/Bahia": "(UTC-03:00) サルバドール",

  // UTC-2 to UTC-1
  "America/Godthab": "(UTC-02:00) グリーンランド",
  "Atlantic/Azores": "(UTC-01:00) アゾレス諸島",
  "Atlantic/Cape_Verde": "(UTC-01:00) カーボベルデ諸島",

  // UTC+0 (GMT/WET)
  "Europe/London": "(UTC+00:00) ダブリン、エディンバラ、リスボン、ロンドン",
  "Africa/Monrovia": "(UTC+00:00) モンロビア、レイキャビク",
  "Africa/Casablanca": "(UTC+01:00) カサブランカ",

  // UTC+1 (CET)
  "Europe/Berlin":
    "(UTC+01:00) アムステルダム、ベルリン、ベルン、ローマ、ストックホルム、ウィーン",
  "Europe/Belgrade":
    "(UTC+01:00) ベオグラード、ブラチスラバ、ブダペスト、リュブリャナ、プラハ",
  "Europe/Paris": "(UTC+01:00) ブリュッセル、コペンハーゲン、マドリード、パリ",
  "Europe/Warsaw": "(UTC+01:00) サラエボ、スコピエ、ワルシャワ、ザグレブ",
  "Africa/Lagos": "(UTC+01:00) 西中央アフリカ",

  // UTC+2 (EET)
  "Africa/Tripoli": "(UTC+02:00) トリポリ",
  "Africa/Windhoek": "(UTC+02:00) ウィントフック",
  "Europe/Athens": "(UTC+02:00) アテネ、ブカレスト",
  "Asia/Beirut": "(UTC+02:00) ベイルート",
  "Africa/Cairo": "(UTC+02:00) カイロ",
  "Europe/Chisinau": "(UTC+02:00) キシナウ",
  "Asia/Damascus": "(UTC+03:00) ダマスカス",
  "Asia/Gaza": "(UTC+02:00) ガザ、ヘブロン",
  "Africa/Johannesburg": "(UTC+02:00) ハラレ、プレトリア",
  "Europe/Helsinki":
    "(UTC+02:00) ヘルシンキ、キエフ、リガ、ソフィア、タリン、ビリニュス",
  "Asia/Jerusalem": "(UTC+02:00) エルサレム",
  "Africa/Juba": "(UTC+02:00) ジュバ",
  "Europe/Kaliningrad": "(UTC+02:00) カリーニングラード",
  "Africa/Khartoum": "(UTC+02:00) ハルツーム",

  // UTC+3 (MSK/AST)
  "Asia/Amman": "(UTC+03:00) アンマン",
  "Europe/Istanbul": "(UTC+03:00) イスタンブール",
  "Europe/Minsk": "(UTC+03:00) ミンスク",
  "Asia/Baghdad": "(UTC+03:00) バグダッド",
  "Asia/Kuwait": "(UTC+03:00) クウェート、リヤド",
  "Europe/Moscow": "(UTC+03:00) モスクワ、サンクトペテルブルク",
  "Africa/Nairobi": "(UTC+03:00) ナイロビ",
  "Europe/Volgograd": "(UTC+03:00) ボルゴグラード",

  // UTC+4
  "Europe/Astrakhan": "(UTC+04:00) アストラハン、ウリヤノフスク",
  "Europe/Samara": "(UTC+04:00) イジェフスク、サマラ",
  "Europe/Saratov": "(UTC+04:00) サラトフ",
  "Asia/Tehran": "(UTC+03:30) テヘラン",
  "Asia/Dubai": "(UTC+04:00) アブダビ、マスカット",
  "Asia/Baku": "(UTC+04:00) バクー",
  "Indian/Mauritius": "(UTC+04:00) ポートルイス",
  "Asia/Tbilisi": "(UTC+04:00) トビリシ",
  "Asia/Yerevan": "(UTC+04:00) エレバン",

  // UTC+4:30 to UTC+5
  "Asia/Kabul": "(UTC+04:30) カブール",
  "Asia/Tashkent": "(UTC+05:00) アシュガバット、タシケント",
  "Asia/Almaty": "(UTC+05:00) アスタナ",
  "Asia/Yekaterinburg": "(UTC+05:00) エカテリンブルク",
  "Asia/Karachi": "(UTC+05:00) イスラマバード、カラチ",

  // UTC+5:30 to UTC+6
  "Asia/Kolkata": "(UTC+05:30) チェンナイ、コルカタ、ムンバイ、ニューデリー",
  "Asia/Colombo": "(UTC+05:30) スリジャヤワルダナプラコッテ",
  "Asia/Kathmandu": "(UTC+05:45) カトマンズ",
  "Asia/Bishkek": "(UTC+06:00) ビシュケク",
  "Asia/Dhaka": "(UTC+06:00) ダッカ",
  "Asia/Omsk": "(UTC+06:00) オムスク",

  // UTC+6:30 to UTC+7
  "Asia/Yangon": "(UTC+06:30) ヤンゴン (ラングーン)",
  "Asia/Barnaul": "(UTC+07:00) バルナウル、ゴルノ・アルタイスク",
  "Asia/Novosibirsk": "(UTC+07:00) ノボシビルスク",
  "Asia/Tomsk": "(UTC+07:00) トムスク",
  "Asia/Bangkok": "(UTC+07:00) バンコク、ハノイ、ジャカルタ",
  "Asia/Hovd": "(UTC+07:00) ホブド",
  "Asia/Krasnoyarsk": "(UTC+07:00) クラスノヤルスク",

  // UTC+8
  "Asia/Shanghai": "(UTC+08:00) 北京、重慶、香港、ウルムチ",
  "Asia/Irkutsk": "(UTC+08:00) イルクーツク",
  "Asia/Singapore": "(UTC+08:00) クアラルンプール、シンガポール",
  "Australia/Perth": "(UTC+08:00) パース",
  "Asia/Taipei": "(UTC+08:00) 台北",
  "Asia/Ulaanbaatar": "(UTC+08:00) ウランバートル",

  // UTC+8:45 to UTC+9
  "Australia/Eucla": "(UTC+08:45) ユークラ",
  "Asia/Chita": "(UTC+09:00) チタ",
  "Asia/Pyongyang": "(UTC+09:00) 平壌",
  "Asia/Tokyo": "(UTC+09:00) 大阪、札幌、東京",
  "Asia/Seoul": "(UTC+09:00) ソウル",
  "Asia/Yakutsk": "(UTC+09:00) ヤクーツク",

  // UTC+9:30 to UTC+10
  "Australia/Adelaide": "(UTC+09:30) アデレード",
  "Australia/Darwin": "(UTC+09:30) ダーウィン",
  "Australia/Brisbane": "(UTC+10:00) ブリスベン",
  "Australia/Sydney": "(UTC+10:00) キャンベラ、メルボルン、シドニー",
  "Pacific/Guam": "(UTC+10:00) グアム、ポートモレスビー",
  "Australia/Hobart": "(UTC+10:00) ホバート",
  "Asia/Vladivostok": "(UTC+10:00) ウラジオストク",

  // UTC+10:30 to UTC+11
  "Australia/Lord_Howe": "(UTC+10:30) ロードハウ島",
  "Pacific/Bougainville": "(UTC+11:00) ブーゲンビル島",
  "Asia/Magadan": "(UTC+11:00) マガダン",
  "Asia/Sakhalin": "(UTC+11:00) サハリン",
  "Asia/Srednekolymsk": "(UTC+11:00) チョクルダフ",
  "Pacific/Norfolk": "(UTC+11:00) ノーフォーク島",
  "Pacific/Noumea": "(UTC+11:00) ソロモン諸島、ニューカレドニア",

  // UTC+12 and beyond
  "Asia/Anadyr": "(UTC+12:00) アナディリ、ペトロパブロフスク・カムチャツキー",
  "Pacific/Auckland": "(UTC+12:00) オークランド、ウェリントン",
  "Pacific/Fiji": "(UTC+12:00) フィジー",
  "Pacific/Chatham": "(UTC+12:45) チャタム諸島",
  "Pacific/Tongatapu": "(UTC+13:00) ヌクアロファ",
  "Pacific/Kiritimati": "(UTC+14:00) キリティマティ島",
};

/**
 * タイムゾーン地域名 - 日本語
 */
export const regions = {
  utc: "UTC/GMT",
  america: "アメリカ大陸",
  northAmerica: "北アメリカ",
  centralAmerica: "中央アメリカ",
  southAmerica: "南アメリカ",
  europe: "ヨーロッパ",
  westernEurope: "西ヨーロッパ",
  centralEurope: "中央ヨーロッパ",
  easternEurope: "東ヨーロッパ",
  asia: "アジア",
  eastAsia: "東アジア",
  southeastAsia: "東南アジア",
  southAsia: "南アジア",
  centralAsia: "中央アジア",
  westAsia: "西アジア",
  africa: "アフリカ",
  northAfrica: "北アフリカ",
  eastAfrica: "東アフリカ",
  southAfrica: "南アフリカ",
  westAfrica: "西アフリカ",
  oceania: "オセアニア",
  australia: "オーストラリア",
  pacific: "太平洋",
  atlantic: "大西洋",
  indian: "インド洋",
};

export default timezones;

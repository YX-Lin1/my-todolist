/**
 * 时区显示名称 - 中文
 */
const timezones: Record<string, string> = {
  // UTC 基准
  UTC: "(UTC+00:00) 协调世界时",

  // UTC-12 to UTC-9 (太平洋和美洲西部)
  "Pacific/Kwajalein": "(UTC+12:00) 国际日期变更线西",
  "Pacific/Apia": "(UTC+13:00) 萨摩亚",
  "Pacific/Midway": "(UTC-11:00) 协调世界时-11",
  "America/Adak": "(UTC-10:00) 阿留申群岛",
  "Pacific/Honolulu": "(UTC-10:00) 夏威夷",
  "Pacific/Marquesas": "(UTC-09:30) 马克萨斯群岛",
  "America/Anchorage": "(UTC-09:00) 阿拉斯加",
  "America/Whitehorse": "(UTC-07:00) 育空",

  // UTC-8 (太平洋时区)
  "America/Tijuana": "(UTC-08:00) 下加利福尼亚",
  "America/Los_Angeles": "(UTC-08:00) 太平洋时间(美国和加拿大)",

  // UTC-7 (山地时区)
  "America/Phoenix": "(UTC-07:00) 亚利桑那",
  "America/Mazatlan": "(UTC-07:00) 拉巴斯，马萨特兰",
  "America/Denver": "(UTC-07:00) 山地时间(美国和加拿大)",

  // UTC-6 (中部时区)
  "America/Cancun": "(UTC-05:00) 切图马尔",
  "America/Guatemala": "(UTC-06:00) 中美洲",
  "America/Chicago": "(UTC-06:00) 中部时间(美国和加拿大)",
  "Pacific/Easter": "(UTC-06:00) 复活节岛",
  "America/Mexico_City": "(UTC-06:00) 瓜达拉哈拉，墨西哥城，蒙特雷",
  "America/Regina": "(UTC-06:00) 萨斯喀彻温",

  // UTC-5 (东部时区)
  "America/Bogota": "(UTC-05:00) 波哥大，利马，基多，里约布兰科",
  "America/New_York": "(UTC-05:00) 东部时间(美国和加拿大)",
  "America/Port-au-Prince": "(UTC-05:00) 海地",
  "America/Havana": "(UTC-05:00) 哈瓦那",
  "America/Indianapolis": "(UTC-05:00) 印第安纳州(东部)",
  "America/Grand_Turk": "(UTC-05:00) 特克斯和凯科斯群岛",

  // UTC-4 (大西洋时区)
  "America/Caracas": "(UTC-04:00) 加拉加斯",
  "America/Punta_Arenas": "(UTC-03:00) 蓬塔阿雷纳斯",
  "America/Asuncion": "(UTC-03:00) 亚松森",
  "America/Halifax": "(UTC-04:00) 大西洋时间(加拿大)",
  "America/Cuiaba": "(UTC-04:00) 库亚巴",
  "America/La_Paz": "(UTC-04:00) 乔治敦，拉巴斯，马瑙斯，圣胡安",
  "America/Santiago": "(UTC-04:00) 圣地亚哥",

  // UTC-3:30 to UTC-3
  "America/St_Johns": "(UTC-03:30) 纽芬兰",
  "America/Araguaina": "(UTC-03:00) 阿拉瓜伊纳",
  "America/Sao_Paulo": "(UTC-03:00) 巴西利亚",
  "America/Fortaleza": "(UTC-03:00) 卡宴，福塔雷萨",
  "America/Buenos_Aires": "(UTC-03:00) 布宜诺斯艾利斯",
  "America/Montevideo": "(UTC-03:00) 蒙得维的亚",
  "America/Miquelon": "(UTC-03:00) 圣皮埃尔和密克隆",
  "America/Bahia": "(UTC-03:00) 萨尔瓦多",

  // UTC-2 to UTC-1
  "America/Godthab": "(UTC-02:00) 格陵兰",
  "Atlantic/Azores": "(UTC-01:00) 亚速尔群岛",
  "Atlantic/Cape_Verde": "(UTC-01:00) 佛得角群岛",

  // UTC+0 (GMT/WET)
  "Europe/London": "(UTC+00:00) 都柏林，爱丁堡，里斯本，伦敦",
  "Africa/Monrovia": "(UTC+00:00) 蒙罗维亚，雷克雅未克",
  "Africa/Casablanca": "(UTC+01:00) 卡萨布兰卡",

  // UTC+1 (CET)
  "Europe/Berlin":
    "(UTC+01:00) 阿姆斯特丹，柏林，伯尔尼，罗马，斯德哥尔摩，维也纳",
  "Europe/Belgrade":
    "(UTC+01:00) 贝尔格莱德，布拉迪斯拉发，布达佩斯，卢布尔雅那，布拉格",
  "Europe/Paris": "(UTC+01:00) 布鲁塞尔，哥本哈根，马德里，巴黎",
  "Europe/Warsaw": "(UTC+01:00) 萨拉热窝，斯科普里，华沙，萨格勒布",
  "Africa/Lagos": "(UTC+01:00) 西中非",

  // UTC+2 (EET)
  "Africa/Tripoli": "(UTC+02:00) 的黎波里",
  "Africa/Windhoek": "(UTC+02:00) 温得和克",
  "Europe/Athens": "(UTC+02:00) 雅典，布加勒斯特",
  "Asia/Beirut": "(UTC+02:00) 贝鲁特",
  "Africa/Cairo": "(UTC+02:00) 开罗",
  "Europe/Chisinau": "(UTC+02:00) 基希讷乌",
  "Asia/Damascus": "(UTC+03:00) 大马士革",
  "Asia/Gaza": "(UTC+02:00) 加沙，希伯伦",
  "Africa/Johannesburg": "(UTC+02:00) 哈拉雷，比勒陀利亚",
  "Europe/Helsinki": "(UTC+02:00) 赫尔辛基，基辅，里加，索非亚，塔林，维尔纽斯",
  "Asia/Jerusalem": "(UTC+02:00) 耶路撒冷",
  "Africa/Juba": "(UTC+02:00) 朱巴",
  "Europe/Kaliningrad": "(UTC+02:00) 加里宁格勒",
  "Africa/Khartoum": "(UTC+02:00) 喀土穆",

  // UTC+3 (MSK/AST)
  "Asia/Amman": "(UTC+03:00) 安曼",
  "Europe/Istanbul": "(UTC+03:00) 伊斯坦布尔",
  "Europe/Minsk": "(UTC+03:00) 明斯克",
  "Asia/Baghdad": "(UTC+03:00) 巴格达",
  "Asia/Kuwait": "(UTC+03:00) 科威特，利雅得",
  "Europe/Moscow": "(UTC+03:00) 莫斯科，圣彼得堡",
  "Africa/Nairobi": "(UTC+03:00) 内罗毕",
  "Europe/Volgograd": "(UTC+03:00) 伏尔加格勒",

  // UTC+4
  "Europe/Astrakhan": "(UTC+04:00) 阿斯特拉罕，乌里扬诺夫斯克",
  "Europe/Samara": "(UTC+04:00) 伊热夫斯克，萨马拉",
  "Europe/Saratov": "(UTC+04:00) 萨拉托夫",
  "Asia/Tehran": "(UTC+03:30) 德黑兰",
  "Asia/Dubai": "(UTC+04:00) 阿布扎比，马斯喀特",
  "Asia/Baku": "(UTC+04:00) 巴库",
  "Indian/Mauritius": "(UTC+04:00) 路易港",
  "Asia/Tbilisi": "(UTC+04:00) 第比利斯",
  "Asia/Yerevan": "(UTC+04:00) 埃里温",

  // UTC+4:30 to UTC+5
  "Asia/Kabul": "(UTC+04:30) 喀布尔",
  "Asia/Tashkent": "(UTC+05:00) 阿什哈巴德，塔什干",
  "Asia/Almaty": "(UTC+05:00) 阿斯塔纳",
  "Asia/Yekaterinburg": "(UTC+05:00) 叶卡捷琳堡",
  "Asia/Karachi": "(UTC+05:00) 伊斯兰堡，卡拉奇",

  // UTC+5:30 to UTC+6
  "Asia/Kolkata": "(UTC+05:30) 钦奈，加尔各答，孟买，新德里",
  "Asia/Colombo": "(UTC+05:30) 斯里贾亚瓦德纳普拉",
  "Asia/Kathmandu": "(UTC+05:45) 加德满都",
  "Asia/Bishkek": "(UTC+06:00) 比什凯克",
  "Asia/Dhaka": "(UTC+06:00) 达卡",
  "Asia/Omsk": "(UTC+06:00) 鄂木斯克",

  // UTC+6:30 to UTC+7
  "Asia/Yangon": "(UTC+06:30) 仰光",
  "Asia/Barnaul": "(UTC+07:00) 巴尔瑙尔，戈尔诺-阿尔泰斯克",
  "Asia/Novosibirsk": "(UTC+07:00) 新西伯利亚",
  "Asia/Tomsk": "(UTC+07:00) 托木斯克",
  "Asia/Bangkok": "(UTC+07:00) 曼谷，河内，雅加达",
  "Asia/Hovd": "(UTC+07:00) 科布多",
  "Asia/Krasnoyarsk": "(UTC+07:00) 克拉斯诺亚尔斯克",

  // UTC+8
  "Asia/Shanghai": "(UTC+08:00) 北京，重庆，香港，乌鲁木齐",
  "Asia/Irkutsk": "(UTC+08:00) 伊尔库茨克",
  "Asia/Singapore": "(UTC+08:00) 吉隆坡，新加坡",
  "Australia/Perth": "(UTC+08:00) 珀斯",
  "Asia/Taipei": "(UTC+08:00) 台北",
  "Asia/Ulaanbaatar": "(UTC+08:00) 乌兰巴托",

  // UTC+8:45 to UTC+9
  "Australia/Eucla": "(UTC+08:45) 尤克拉",
  "Asia/Chita": "(UTC+09:00) 赤塔",
  "Asia/Pyongyang": "(UTC+09:00) 平壤",
  "Asia/Tokyo": "(UTC+09:00) 大阪，札幌，东京",
  "Asia/Seoul": "(UTC+09:00) 首尔",
  "Asia/Yakutsk": "(UTC+09:00) 雅库茨克",

  // UTC+9:30 to UTC+10
  "Australia/Adelaide": "(UTC+09:30) 阿德莱德",
  "Australia/Darwin": "(UTC+09:30) 达尔文",
  "Australia/Brisbane": "(UTC+10:00) 布里斯班",
  "Australia/Sydney": "(UTC+10:00) 堪培拉，墨尔本，悉尼",
  "Pacific/Guam": "(UTC+10:00) 关岛，莫尔兹比港",
  "Australia/Hobart": "(UTC+10:00) 霍巴特",
  "Asia/Vladivostok": "(UTC+10:00) 符拉迪沃斯托克",

  // UTC+10:30 to UTC+11
  "Australia/Lord_Howe": "(UTC+10:30) 豪勋爵岛",
  "Pacific/Bougainville": "(UTC+11:00) 布干维尔岛",
  "Asia/Magadan": "(UTC+11:00) 马加丹",
  "Asia/Sakhalin": "(UTC+11:00) 萨哈林",
  "Asia/Srednekolymsk": "(UTC+11:00) 乔库尔达赫",
  "Pacific/Norfolk": "(UTC+11:00) 诺福克岛",
  "Pacific/Noumea": "(UTC+11:00) 所罗门群岛，新喀里多尼亚",

  // UTC+12 and beyond
  "Asia/Anadyr": "(UTC+12:00) 阿纳德尔，彼得罗巴甫洛夫斯克-堪察加",
  "Pacific/Auckland": "(UTC+12:00) 奥克兰，惠灵顿",
  "Pacific/Fiji": "(UTC+12:00) 斐济",
  "Pacific/Chatham": "(UTC+12:45) 查塔姆群岛",
  "Pacific/Tongatapu": "(UTC+13:00) 努库阿洛法",
  "Pacific/Kiritimati": "(UTC+14:00) 基里蒂马蒂岛",
};

/**
 * 时区地区名称 - 中文
 */
export const regions = {
  utc: "UTC/GMT",
  america: "美洲",
  northAmerica: "北美洲",
  centralAmerica: "中美洲",
  southAmerica: "南美洲",
  europe: "欧洲",
  westernEurope: "西欧",
  centralEurope: "中欧",
  easternEurope: "东欧",
  asia: "亚洲",
  eastAsia: "东亚",
  southeastAsia: "东南亚",
  southAsia: "南亚",
  centralAsia: "中亚",
  westAsia: "西亚",
  africa: "非洲",
  northAfrica: "北非",
  eastAfrica: "东非",
  southAfrica: "南非",
  westAfrica: "西非",
  oceania: "大洋洲",
  australia: "澳大利亚",
  pacific: "太平洋",
  atlantic: "大西洋",
  indian: "印度洋",
};

export default timezones;

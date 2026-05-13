/**
 * Timezone display names - English
 */
const timezones: Record<string, string> = {
  // UTC Base
  UTC: "(UTC+00:00) Coordinated Universal Time",

  // UTC-12 to UTC-9 (Pacific and Americas West)
  "Pacific/Kwajalein": "(UTC+12:00) International Date Line West",
  "Pacific/Apia": "(UTC+13:00) Samoa",
  "Pacific/Midway": "(UTC-11:00) Coordinated Universal Time-11",
  "America/Adak": "(UTC-10:00) Aleutian Islands",
  "Pacific/Honolulu": "(UTC-10:00) Hawaii",
  "Pacific/Marquesas": "(UTC-09:30) Marquesas Islands",
  "America/Anchorage": "(UTC-09:00) Alaska",
  "America/Whitehorse": "(UTC-07:00) Yukon",

  // UTC-8 (Pacific Time Zone)
  "America/Tijuana": "(UTC-08:00) Baja California",
  "America/Los_Angeles": "(UTC-08:00) Pacific Time (US & Canada)",

  // UTC-7 (Mountain Time Zone)
  "America/Phoenix": "(UTC-07:00) Arizona",
  "America/Mazatlan": "(UTC-07:00) La Paz, Mazatlan",
  "America/Denver": "(UTC-07:00) Mountain Time (US & Canada)",

  // UTC-6 (Central Time Zone)
  "America/Cancun": "(UTC-05:00) Chetumal",
  "America/Guatemala": "(UTC-06:00) Central America",
  "America/Chicago": "(UTC-06:00) Central Time (US & Canada)",
  "Pacific/Easter": "(UTC-06:00) Easter Island",
  "America/Mexico_City": "(UTC-06:00) Guadalajara, Mexico City, Monterrey",
  "America/Regina": "(UTC-06:00) Saskatchewan",

  // UTC-5 (Eastern Time Zone)
  "America/Bogota": "(UTC-05:00) Bogota, Lima, Quito, Rio Branco",
  "America/New_York": "(UTC-05:00) Eastern Time (US & Canada)",
  "America/Port-au-Prince": "(UTC-05:00) Haiti",
  "America/Havana": "(UTC-05:00) Havana",
  "America/Indianapolis": "(UTC-05:00) Indiana (East)",
  "America/Grand_Turk": "(UTC-05:00) Turks and Caicos",

  // UTC-4 (Atlantic Time Zone)
  "America/Caracas": "(UTC-04:00) Caracas",
  "America/Punta_Arenas": "(UTC-03:00) Punta Arenas",
  "America/Asuncion": "(UTC-03:00) Asuncion",
  "America/Halifax": "(UTC-04:00) Atlantic Time (Canada)",
  "America/Cuiaba": "(UTC-04:00) Cuiaba",
  "America/La_Paz": "(UTC-04:00) Georgetown, La Paz, Manaus, San Juan",
  "America/Santiago": "(UTC-04:00) Santiago",

  // UTC-3:30 to UTC-3
  "America/St_Johns": "(UTC-03:30) Newfoundland",
  "America/Araguaina": "(UTC-03:00) Araguaina",
  "America/Sao_Paulo": "(UTC-03:00) Brasilia",
  "America/Fortaleza": "(UTC-03:00) Cayenne, Fortaleza",
  "America/Buenos_Aires": "(UTC-03:00) City of Buenos Aires",
  "America/Montevideo": "(UTC-03:00) Montevideo",
  "America/Miquelon": "(UTC-03:00) Saint Pierre and Miquelon",
  "America/Bahia": "(UTC-03:00) Salvador",

  // UTC-2 to UTC-1
  "America/Godthab": "(UTC-02:00) Greenland",
  "Atlantic/Azores": "(UTC-01:00) Azores",
  "Atlantic/Cape_Verde": "(UTC-01:00) Cabo Verde Is.",

  // UTC+0 (GMT/WET)
  "Europe/London": "(UTC+00:00) Dublin, Edinburgh, Lisbon, London",
  "Africa/Monrovia": "(UTC+00:00) Monrovia, Reykjavik",
  "Africa/Casablanca": "(UTC+01:00) Casablanca",

  // UTC+1 (CET)
  "Europe/Berlin":
    "(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
  "Europe/Belgrade":
    "(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague",
  "Europe/Paris": "(UTC+01:00) Brussels, Copenhagen, Madrid, Paris",
  "Europe/Warsaw": "(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb",
  "Africa/Lagos": "(UTC+01:00) West Central Africa",

  // UTC+2 (EET)
  "Africa/Tripoli": "(UTC+02:00) Tripoli",
  "Africa/Windhoek": "(UTC+02:00) Windhoek",
  "Europe/Athens": "(UTC+02:00) Athens, Bucharest",
  "Asia/Beirut": "(UTC+02:00) Beirut",
  "Africa/Cairo": "(UTC+02:00) Cairo",
  "Europe/Chisinau": "(UTC+02:00) Chisinau",
  "Asia/Damascus": "(UTC+03:00) Damascus",
  "Asia/Gaza": "(UTC+02:00) Gaza, Hebron",
  "Africa/Johannesburg": "(UTC+02:00) Harare, Pretoria",
  "Europe/Helsinki":
    "(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius",
  "Asia/Jerusalem": "(UTC+02:00) Jerusalem",
  "Africa/Juba": "(UTC+02:00) Juba",
  "Europe/Kaliningrad": "(UTC+02:00) Kaliningrad",
  "Africa/Khartoum": "(UTC+02:00) Khartoum",

  // UTC+3 (MSK/AST)
  "Asia/Amman": "(UTC+03:00) Amman",
  "Europe/Istanbul": "(UTC+03:00) Istanbul",
  "Europe/Minsk": "(UTC+03:00) Minsk",
  "Asia/Baghdad": "(UTC+03:00) Baghdad",
  "Asia/Kuwait": "(UTC+03:00) Kuwait, Riyadh",
  "Europe/Moscow": "(UTC+03:00) Moscow, St. Petersburg",
  "Africa/Nairobi": "(UTC+03:00) Nairobi",
  "Europe/Volgograd": "(UTC+03:00) Volgograd",

  // UTC+4
  "Europe/Astrakhan": "(UTC+04:00) Astrakhan, Ulyanovsk",
  "Europe/Samara": "(UTC+04:00) Izhevsk, Samara",
  "Europe/Saratov": "(UTC+04:00) Saratov",
  "Asia/Tehran": "(UTC+03:30) Tehran",
  "Asia/Dubai": "(UTC+04:00) Abu Dhabi, Muscat",
  "Asia/Baku": "(UTC+04:00) Baku",
  "Indian/Mauritius": "(UTC+04:00) Port Louis",
  "Asia/Tbilisi": "(UTC+04:00) Tbilisi",
  "Asia/Yerevan": "(UTC+04:00) Yerevan",

  // UTC+4:30 to UTC+5
  "Asia/Kabul": "(UTC+04:30) Kabul",
  "Asia/Tashkent": "(UTC+05:00) Ashgabat, Tashkent",
  "Asia/Almaty": "(UTC+05:00) Astana",
  "Asia/Yekaterinburg": "(UTC+05:00) Ekaterinburg",
  "Asia/Karachi": "(UTC+05:00) Islamabad, Karachi",

  // UTC+5:30 to UTC+6
  "Asia/Kolkata": "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
  "Asia/Colombo": "(UTC+05:30) Sri Jayawardenepura",
  "Asia/Kathmandu": "(UTC+05:45) Kathmandu",
  "Asia/Bishkek": "(UTC+06:00) Bishkek",
  "Asia/Dhaka": "(UTC+06:00) Dhaka",
  "Asia/Omsk": "(UTC+06:00) Omsk",

  // UTC+6:30 to UTC+7
  "Asia/Yangon": "(UTC+06:30) Yangon (Rangoon)",
  "Asia/Barnaul": "(UTC+07:00) Barnaul, Gorno-Altaysk",
  "Asia/Novosibirsk": "(UTC+07:00) Novosibirsk",
  "Asia/Tomsk": "(UTC+07:00) Tomsk",
  "Asia/Bangkok": "(UTC+07:00) Bangkok, Hanoi, Jakarta",
  "Asia/Hovd": "(UTC+07:00) Hovd",
  "Asia/Krasnoyarsk": "(UTC+07:00) Krasnoyarsk",

  // UTC+8
  "Asia/Shanghai": "(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi",
  "Asia/Irkutsk": "(UTC+08:00) Irkutsk",
  "Asia/Singapore": "(UTC+08:00) Kuala Lumpur, Singapore",
  "Australia/Perth": "(UTC+08:00) Perth",
  "Asia/Taipei": "(UTC+08:00) Taipei",
  "Asia/Ulaanbaatar": "(UTC+08:00) Ulaanbaatar",

  // UTC+8:45 to UTC+9
  "Australia/Eucla": "(UTC+08:45) Eucla",
  "Asia/Chita": "(UTC+09:00) Chita",
  "Asia/Pyongyang": "(UTC+09:00) Pyongyang",
  "Asia/Tokyo": "(UTC+09:00) Osaka, Sapporo, Tokyo",
  "Asia/Seoul": "(UTC+09:00) Seoul",
  "Asia/Yakutsk": "(UTC+09:00) Yakutsk",

  // UTC+9:30 to UTC+10
  "Australia/Adelaide": "(UTC+09:30) Adelaide",
  "Australia/Darwin": "(UTC+09:30) Darwin",
  "Australia/Brisbane": "(UTC+10:00) Brisbane",
  "Australia/Sydney": "(UTC+10:00) Canberra, Melbourne, Sydney",
  "Pacific/Guam": "(UTC+10:00) Guam, Port Moresby",
  "Australia/Hobart": "(UTC+10:00) Hobart",
  "Asia/Vladivostok": "(UTC+10:00) Vladivostok",

  // UTC+10:30 to UTC+11
  "Australia/Lord_Howe": "(UTC+10:30) Lord Howe Island",
  "Pacific/Bougainville": "(UTC+11:00) Bougainville Island",
  "Asia/Magadan": "(UTC+11:00) Magadan",
  "Asia/Sakhalin": "(UTC+11:00) Sakhalin",
  "Asia/Srednekolymsk": "(UTC+11:00) Chokurdakh",
  "Pacific/Norfolk": "(UTC+11:00) Norfolk Island",
  "Pacific/Noumea": "(UTC+11:00) Solomon Is., New Caledonia",

  // UTC+12 and beyond
  "Asia/Anadyr": "(UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky",
  "Pacific/Auckland": "(UTC+12:00) Auckland, Wellington",
  "Pacific/Fiji": "(UTC+12:00) Fiji",
  "Pacific/Chatham": "(UTC+12:45) Chatham Islands",
  "Pacific/Tongatapu": "(UTC+13:00) Nuku'alofa",
  "Pacific/Kiritimati": "(UTC+14:00) Kiritimati Island",
};

/**
 * Timezone region names - English
 */
export const regions = {
  utc: "UTC/GMT",
  america: "Americas",
  northAmerica: "North America",
  centralAmerica: "Central America",
  southAmerica: "South America",
  europe: "Europe",
  westernEurope: "Western Europe",
  centralEurope: "Central Europe",
  easternEurope: "Eastern Europe",
  asia: "Asia",
  eastAsia: "East Asia",
  southeastAsia: "Southeast Asia",
  southAsia: "South Asia",
  centralAsia: "Central Asia",
  westAsia: "West Asia",
  africa: "Africa",
  northAfrica: "North Africa",
  eastAfrica: "East Africa",
  southAfrica: "South Africa",
  westAfrica: "West Africa",
  oceania: "Oceania",
  australia: "Australia",
  pacific: "Pacific",
  atlantic: "Atlantic",
  indian: "Indian",
};

export default timezones;

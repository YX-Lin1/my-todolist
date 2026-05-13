/**
 * Timezone type definitions based on Microsoft Outlook timezone list
 * Comprehensive IANA timezone identifiers covering all major global regions
 */
export const timezones = [
  // UTC Base
  "UTC",

  // UTC-12 to UTC-9 (Pacific and Americas West)
  "Pacific/Kwajalein", // UTC+12/-12 International Date Line West
  "Pacific/Apia", // UTC+13 Samoa
  "Pacific/Midway", // UTC-11 Coordinated Universal Time-11
  "America/Adak", // UTC-10 Aleutian Islands
  "Pacific/Honolulu", // UTC-10 Hawaii
  "Pacific/Marquesas", // UTC-09:30 Marquesas Islands
  "America/Anchorage", // UTC-9 Alaska
  "America/Whitehorse", // UTC-7 Yukon

  // UTC-8 (Pacific Time Zone)
  "America/Tijuana", // UTC-8 Baja California
  "America/Los_Angeles", // UTC-8 Pacific Time (US & Canada)

  // UTC-7 (Mountain Time Zone)
  "America/Phoenix", // UTC-7 Arizona
  "America/Mazatlan", // UTC-7 La Paz, Mazatlan
  "America/Denver", // UTC-7 Mountain Time (US & Canada)

  // UTC-6 (Central Time Zone)
  "America/Cancun", // UTC-5 Chetumal
  "America/Guatemala", // UTC-6 Central America
  "America/Chicago", // UTC-6 Central Time (US & Canada)
  "Pacific/Easter", // UTC-6 Easter Island
  "America/Mexico_City", // UTC-6 Guadalajara, Mexico City, Monterrey
  "America/Regina", // UTC-6 Saskatchewan

  // UTC-5 (Eastern Time Zone)
  "America/Bogota", // UTC-5 Bogota, Lima, Quito, Rio Branco
  "America/New_York", // UTC-5 Eastern Time (US & Canada)
  "America/Port-au-Prince", // UTC-5 Haiti
  "America/Havana", // UTC-5 Havana
  "America/Indianapolis", // UTC-5 Indiana (East)
  "America/Grand_Turk", // UTC-5 Turks and Caicos

  // UTC-4 (Atlantic Time Zone)
  "America/Caracas", // UTC-4 Caracas
  "America/Punta_Arenas", // UTC-3 Punta Arenas
  "America/Asuncion", // UTC-3 Asuncion
  "America/Halifax", // UTC-4 Atlantic Time (Canada)
  "America/Cuiaba", // UTC-4 Cuiaba
  "America/La_Paz", // UTC-4 Georgetown, La Paz, Manaus, San Juan
  "America/Santiago", // UTC-4 Santiago

  // UTC-3:30 to UTC-3
  "America/St_Johns", // UTC-3:30 Newfoundland
  "America/Araguaina", // UTC-3 Araguaina
  "America/Sao_Paulo", // UTC-3 Brasilia
  "America/Fortaleza", // UTC-3 Cayenne, Fortaleza
  "America/Buenos_Aires", // UTC-3 City of Buenos Aires
  "America/Montevideo", // UTC-3 Montevideo
  "America/Miquelon", // UTC-3 Saint Pierre and Miquelon
  "America/Bahia", // UTC-3 Salvador

  // UTC-2 to UTC-1
  "America/Godthab", // UTC-2 Greenland
  "Atlantic/Azores", // UTC-1 Azores
  "Atlantic/Cape_Verde", // UTC-1 Cabo Verde Is.

  // UTC+0 (GMT/WET)
  "Europe/London", // UTC+0 Dublin, Edinburgh, Lisbon, London
  "Africa/Monrovia", // UTC+0 Monrovia, Reykjavik
  "Africa/Casablanca", // UTC+1 Casablanca

  // UTC+1 (CET)
  "Europe/Berlin", // UTC+1 Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna
  "Europe/Belgrade", // UTC+1 Belgrade, Bratislava, Budapest, Ljubljana, Prague
  "Europe/Paris", // UTC+1 Brussels, Copenhagen, Madrid, Paris
  "Europe/Warsaw", // UTC+1 Sarajevo, Skopje, Warsaw, Zagreb
  "Africa/Lagos", // UTC+1 West Central Africa

  // UTC+2 (EET)
  "Africa/Tripoli", // UTC+2 Tripoli
  "Africa/Windhoek", // UTC+2 Windhoek
  "Europe/Athens", // UTC+2 Athens, Bucharest
  "Asia/Beirut", // UTC+2 Beirut
  "Africa/Cairo", // UTC+2 Cairo
  "Europe/Chisinau", // UTC+2 Chisinau
  "Asia/Damascus", // UTC+3 Damascus
  "Asia/Gaza", // UTC+2 Gaza, Hebron
  "Africa/Johannesburg", // UTC+2 Harare, Pretoria
  "Europe/Helsinki", // UTC+2 Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius
  "Asia/Jerusalem", // UTC+2 Jerusalem
  "Africa/Juba", // UTC+2 Juba
  "Europe/Kaliningrad", // UTC+2 Kaliningrad
  "Africa/Khartoum", // UTC+2 Khartoum

  // UTC+3 (MSK/AST)
  "Asia/Amman", // UTC+3 Amman
  "Europe/Istanbul", // UTC+3 Istanbul
  "Europe/Minsk", // UTC+3 Minsk
  "Asia/Baghdad", // UTC+3 Baghdad
  "Asia/Kuwait", // UTC+3 Kuwait, Riyadh
  "Europe/Moscow", // UTC+3 Moscow, St. Petersburg
  "Africa/Nairobi", // UTC+3 Nairobi
  "Europe/Volgograd", // UTC+3 Volgograd

  // UTC+4
  "Europe/Astrakhan", // UTC+4 Astrakhan, Ulyanovsk
  "Europe/Samara", // UTC+4 Izhevsk, Samara
  "Europe/Saratov", // UTC+4 Saratov
  "Asia/Tehran", // UTC+3:30 Tehran
  "Asia/Dubai", // UTC+4 Abu Dhabi, Muscat
  "Asia/Baku", // UTC+4 Baku
  "Indian/Mauritius", // UTC+4 Port Louis
  "Asia/Tbilisi", // UTC+4 Tbilisi
  "Asia/Yerevan", // UTC+4 Yerevan

  // UTC+4:30 to UTC+5
  "Asia/Kabul", // UTC+4:30 Kabul
  "Asia/Tashkent", // UTC+5 Ashgabat, Tashkent
  "Asia/Almaty", // UTC+5 Astana
  "Asia/Yekaterinburg", // UTC+5 Ekaterinburg
  "Asia/Karachi", // UTC+5 Islamabad, Karachi

  // UTC+5:30 to UTC+6
  "Asia/Kolkata", // UTC+5:30 Chennai, Kolkata, Mumbai, New Delhi
  "Asia/Colombo", // UTC+5:30 Sri Jayawardenepura
  "Asia/Kathmandu", // UTC+5:45 Kathmandu
  "Asia/Bishkek", // UTC+6 Bishkek
  "Asia/Dhaka", // UTC+6 Dhaka
  "Asia/Omsk", // UTC+6 Omsk

  // UTC+6:30 to UTC+7
  "Asia/Yangon", // UTC+6:30 Yangon (Rangoon)
  "Asia/Barnaul", // UTC+7 Barnaul, Gorno-Altaysk
  "Asia/Novosibirsk", // UTC+7 Novosibirsk
  "Asia/Tomsk", // UTC+7 Tomsk
  "Asia/Bangkok", // UTC+7 Bangkok, Hanoi, Jakarta
  "Asia/Hovd", // UTC+7 Hovd
  "Asia/Krasnoyarsk", // UTC+7 Krasnoyarsk

  // UTC+8
  "Asia/Shanghai", // UTC+8 Beijing, Chongqing, Hong Kong, Urumqi
  "Asia/Irkutsk", // UTC+8 Irkutsk
  "Asia/Singapore", // UTC+8 Kuala Lumpur, Singapore
  "Australia/Perth", // UTC+8 Perth
  "Asia/Taipei", // UTC+8 Taipei
  "Asia/Ulaanbaatar", // UTC+8 Ulaanbaatar

  // UTC+8:45 to UTC+9
  "Australia/Eucla", // UTC+8:45 Eucla
  "Asia/Chita", // UTC+9 Chita
  "Asia/Pyongyang", // UTC+9 Pyongyang
  "Asia/Tokyo", // UTC+9 Osaka, Sapporo, Tokyo
  "Asia/Seoul", // UTC+9 Seoul
  "Asia/Yakutsk", // UTC+9 Yakutsk

  // UTC+9:30 to UTC+10
  "Australia/Adelaide", // UTC+9:30 Adelaide
  "Australia/Darwin", // UTC+9:30 Darwin
  "Australia/Brisbane", // UTC+10 Brisbane
  "Australia/Sydney", // UTC+10 Canberra, Melbourne, Sydney
  "Pacific/Guam", // UTC+10 Guam, Port Moresby
  "Australia/Hobart", // UTC+10 Hobart
  "Asia/Vladivostok", // UTC+10 Vladivostok

  // UTC+10:30 to UTC+11
  "Australia/Lord_Howe", // UTC+10:30 Lord Howe Island
  "Pacific/Bougainville", // UTC+11 Bougainville Island
  "Asia/Magadan", // UTC+11 Magadan
  "Asia/Sakhalin", // UTC+11 Sakhalin
  "Asia/Srednekolymsk", // UTC+11 Chokurdakh
  "Pacific/Norfolk", // UTC+11 Norfolk Island
  "Pacific/Noumea", // UTC+11 Solomon Is., New Caledonia

  // UTC+12 and beyond
  "Asia/Anadyr", // UTC+12 Anadyr, Petropavlovsk-Kamchatsky
  "Pacific/Auckland", // UTC+12 Auckland, Wellington
  "Pacific/Fiji", // UTC+12 Fiji
  "Pacific/Chatham", // UTC+12:45 Chatham Islands
  "Pacific/Tongatapu", // UTC+13 Nuku'alofa
  "Pacific/Kiritimati", // UTC+14 Kiritimati Island
];

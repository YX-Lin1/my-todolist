/**
 * Timezone grouping configuration for hierarchical display
 * Three-level structure: Region → Sub-region → Timezone
 */
export const regions = {
  utc: {
    timezones: ["UTC"],
  },
  america: {
    subRegions: {
      northAmerica: {
        timezones: [
          "America/New_York",
          "America/Chicago",
          "America/Denver",
          "America/Phoenix",
          "America/Los_Angeles",
          "America/Anchorage",
          "Pacific/Honolulu",
          "America/Halifax",
          "America/Indianapolis",
          "America/Regina",
          "America/Whitehorse",
          "America/Adak",
        ],
      },
      centralAmerica: {
        timezones: [
          "America/Guatemala",
          "America/Mexico_City",
          "America/Tijuana",
          "America/Mazatlan",
          "America/Cancun",
          "America/Havana",
        ],
      },
      southAmerica: {
        timezones: [
          "America/Sao_Paulo",
          "America/Buenos_Aires",
          "America/Santiago",
          "America/Bogota",
          "America/Caracas",
          "America/La_Paz",
          "America/Montevideo",
          "America/Asuncion",
          "America/Punta_Arenas",
          "America/St_Johns",
          "America/Araguaina",
          "America/Fortaleza",
          "America/Miquelon",
          "America/Bahia",
          "America/Cuiaba",
          "America/Port-au-Prince",
          "America/Grand_Turk",
          "America/Godthab",
        ],
      },
    },
  },
  europe: {
    subRegions: {
      westernEurope: {
        timezones: ["Europe/London", "Europe/Paris", "Europe/Berlin"],
      },
      centralEurope: {
        timezones: ["Europe/Warsaw", "Europe/Belgrade"],
      },
      easternEurope: {
        timezones: [
          "Europe/Helsinki",
          "Europe/Athens",
          "Europe/Istanbul",
          "Europe/Moscow",
          "Europe/Minsk",
          "Europe/Chisinau",
          "Europe/Kaliningrad",
          "Europe/Volgograd",
          "Europe/Astrakhan",
          "Europe/Samara",
          "Europe/Saratov",
        ],
      },
    },
  },
  asia: {
    subRegions: {
      eastAsia: {
        timezones: [
          "Asia/Tokyo",
          "Asia/Seoul",
          "Asia/Shanghai",
          "Asia/Taipei",
          "Asia/Pyongyang",
        ],
      },
      southeastAsia: {
        timezones: ["Asia/Singapore", "Asia/Bangkok", "Asia/Yangon"],
      },
      southAsia: {
        timezones: [
          "Asia/Kolkata",
          "Asia/Karachi",
          "Asia/Dhaka",
          "Asia/Colombo",
          "Asia/Kathmandu",
        ],
      },
      centralAsia: {
        timezones: [
          "Asia/Almaty",
          "Asia/Tashkent",
          "Asia/Bishkek",
          "Asia/Yekaterinburg",
          "Asia/Omsk",
          "Asia/Barnaul",
          "Asia/Novosibirsk",
          "Asia/Tomsk",
          "Asia/Hovd",
          "Asia/Krasnoyarsk",
          "Asia/Irkutsk",
          "Asia/Ulaanbaatar",
          "Asia/Chita",
          "Asia/Yakutsk",
          "Asia/Vladivostok",
          "Asia/Magadan",
          "Asia/Sakhalin",
          "Asia/Srednekolymsk",
          "Asia/Anadyr",
        ],
      },
      westAsia: {
        timezones: [
          "Asia/Dubai",
          "Asia/Tehran",
          "Asia/Baghdad",
          "Asia/Kuwait",
          "Asia/Beirut",
          "Asia/Damascus",
          "Asia/Gaza",
          "Asia/Jerusalem",
          "Asia/Amman",
          "Asia/Baku",
          "Asia/Tbilisi",
          "Asia/Yerevan",
          "Asia/Kabul",
        ],
      },
    },
  },
  africa: {
    subRegions: {
      northAfrica: {
        timezones: ["Africa/Cairo", "Africa/Casablanca", "Africa/Tripoli"],
      },
      eastAfrica: {
        timezones: ["Africa/Nairobi", "Africa/Khartoum", "Africa/Juba"],
      },
      southAfrica: {
        timezones: ["Africa/Johannesburg", "Africa/Windhoek"],
      },
      westAfrica: {
        timezones: ["Africa/Lagos", "Africa/Monrovia"],
      },
    },
  },
  oceania: {
    subRegions: {
      australia: {
        timezones: [
          "Australia/Sydney",
          "Australia/Brisbane",
          "Australia/Perth",
          "Australia/Adelaide",
          "Australia/Darwin",
          "Australia/Hobart",
          "Australia/Lord_Howe",
          "Australia/Eucla",
        ],
      },
      pacific: {
        timezones: [
          "Pacific/Auckland",
          "Pacific/Fiji",
          "Pacific/Guam",
          "Pacific/Kwajalein",
          "Pacific/Apia",
          "Pacific/Midway",
          "Pacific/Marquesas",
          "Pacific/Easter",
          "Pacific/Bougainville",
          "Pacific/Norfolk",
          "Pacific/Noumea",
          "Pacific/Chatham",
          "Pacific/Tongatapu",
          "Pacific/Kiritimati",
        ],
      },
    },
  },
  atlantic: {
    timezones: ["Atlantic/Azores", "Atlantic/Cape_Verde"],
  },
  indian: {
    timezones: ["Indian/Mauritius"],
  },
};

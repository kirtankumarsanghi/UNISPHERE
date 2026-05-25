export type FallbackCollege = {
  id: string;
  slug: string;
  name: string;
  abbreviation: string;
  city: string;
  state: string;
  location: string;
  type: "IIT" | "NIT" | "IIIT" | "GOVERNMENT" | "PRIVATE" | "DEEMED" | "AUTONOMOUS";
  established: number;
  annualFees: number;
  rating: number;
  totalReviews: number;
  nirf: number | null;
  gradientFrom: string;
  gradientTo: string;
  courses: { name: string; degree: string }[];
  placements: { avgPackage: number; highestPackage: number; medianPackage: number; placementPercent: number };
};

export const fallbackColleges: FallbackCollege[] = [
  {
    "id": "f-iit-madras-0",
    "slug": "iit-madras",
    "name": "IIT Madras",
    "abbreviation": "IITM",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "location": "Chennai, Tamil Nadu",
    "type": "IIT",
    "established": 1959,
    "annualFees": 212000,
    "rating": 4.9,
    "totalReviews": 4,
    "nirf": 1,
    "gradientFrom": "#0b1120",
    "gradientTo": "#1d4ed8",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1489519,
      "highestPackage": 5731333,
      "medianPackage": 1502535,
      "placementPercent": 94
    }
  },
  {
    "id": "f-iit-delhi-1",
    "slug": "iit-delhi",
    "name": "IIT Delhi",
    "abbreviation": "IITD",
    "city": "New Delhi",
    "state": "Delhi",
    "location": "New Delhi, Delhi",
    "type": "IIT",
    "established": 1961,
    "annualFees": 225000,
    "rating": 4.9,
    "totalReviews": 4,
    "nirf": 2,
    "gradientFrom": "#111827",
    "gradientTo": "#4c1d95",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1631592,
      "highestPackage": 4741347,
      "medianPackage": 1605204,
      "placementPercent": 89
    }
  },
  {
    "id": "f-iit-bombay-2",
    "slug": "iit-bombay",
    "name": "IIT Bombay",
    "abbreviation": "IITB",
    "city": "Mumbai",
    "state": "Maharashtra",
    "location": "Mumbai, Maharashtra",
    "type": "IIT",
    "established": 1958,
    "annualFees": 220000,
    "rating": 4.9,
    "totalReviews": 11,
    "nirf": 3,
    "gradientFrom": "#0f172a",
    "gradientTo": "#3730a3",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1937573,
      "highestPackage": 6394652,
      "medianPackage": 1545632,
      "placementPercent": 88
    }
  },
  {
    "id": "f-iit-kanpur-3",
    "slug": "iit-kanpur",
    "name": "IIT Kanpur",
    "abbreviation": "IITK",
    "city": "Kanpur",
    "state": "Uttar Pradesh",
    "location": "Kanpur, Uttar Pradesh",
    "type": "IIT",
    "established": 1959,
    "annualFees": 215000,
    "rating": 4.8,
    "totalReviews": 7,
    "nirf": 4,
    "gradientFrom": "#171717",
    "gradientTo": "#991b1b",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1862001,
      "highestPackage": 6786452,
      "medianPackage": 1436324,
      "placementPercent": 88
    }
  },
  {
    "id": "f-iit-kharagpur-4",
    "slug": "iit-kharagpur",
    "name": "IIT Kharagpur",
    "abbreviation": "IITKGP",
    "city": "Kharagpur",
    "state": "West Bengal",
    "location": "Kharagpur, West Bengal",
    "type": "IIT",
    "established": 1951,
    "annualFees": 210000,
    "rating": 4.7,
    "totalReviews": 12,
    "nirf": 5,
    "gradientFrom": "#1f2937",
    "gradientTo": "#065f46",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1574273,
      "highestPackage": 7452501,
      "medianPackage": 1369144,
      "placementPercent": 90
    }
  },
  {
    "id": "f-iit-roorkee-5",
    "slug": "iit-roorkee",
    "name": "IIT Roorkee",
    "abbreviation": "IITR",
    "city": "Roorkee",
    "state": "Uttarakhand",
    "location": "Roorkee, Uttarakhand",
    "type": "IIT",
    "established": 1847,
    "annualFees": 210000,
    "rating": 4.7,
    "totalReviews": 8,
    "nirf": 6,
    "gradientFrom": "#0f172a",
    "gradientTo": "#0f766e",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1480785,
      "highestPackage": 6107757,
      "medianPackage": 1287690,
      "placementPercent": 94
    }
  },
  {
    "id": "f-iit-hyderabad-6",
    "slug": "iit-hyderabad",
    "name": "IIT Hyderabad",
    "abbreviation": "IITH",
    "city": "Hyderabad",
    "state": "Telangana",
    "location": "Hyderabad, Telangana",
    "type": "IIT",
    "established": 2008,
    "annualFees": 220000,
    "rating": 4.6,
    "totalReviews": 8,
    "nirf": 7,
    "gradientFrom": "#18181b",
    "gradientTo": "#5b21b6",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1812333,
      "highestPackage": 7054826,
      "medianPackage": 1537277,
      "placementPercent": 89
    }
  },
  {
    "id": "f-iit-guwahati-7",
    "slug": "iit-guwahati",
    "name": "IIT Guwahati",
    "abbreviation": "IITG",
    "city": "Guwahati",
    "state": "Assam",
    "location": "Guwahati, Assam",
    "type": "IIT",
    "established": 1994,
    "annualFees": 215000,
    "rating": 4.6,
    "totalReviews": 11,
    "nirf": 8,
    "gradientFrom": "#111827",
    "gradientTo": "#0369a1",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1663169,
      "highestPackage": 6915710,
      "medianPackage": 1588667,
      "placementPercent": 93
    }
  },
  {
    "id": "f-iit-indore-8",
    "slug": "iit-indore",
    "name": "IIT Indore",
    "abbreviation": "IITI",
    "city": "Indore",
    "state": "Madhya Pradesh",
    "location": "Indore, Madhya Pradesh",
    "type": "IIT",
    "established": 2009,
    "annualFees": 215000,
    "rating": 4.5,
    "totalReviews": 8,
    "nirf": 9,
    "gradientFrom": "#0f172a",
    "gradientTo": "#3f6212",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1656138,
      "highestPackage": 5954685,
      "medianPackage": 1520745,
      "placementPercent": 87
    }
  },
  {
    "id": "f-iit-varanasi-bhu-9",
    "slug": "iit-varanasi-bhu",
    "name": "IIT Varanasi BHU",
    "abbreviation": "IITBHU",
    "city": "Varanasi",
    "state": "Uttar Pradesh",
    "location": "Varanasi, Uttar Pradesh",
    "type": "IIT",
    "established": 1919,
    "annualFees": 215000,
    "rating": 4.6,
    "totalReviews": 3,
    "nirf": 10,
    "gradientFrom": "#1f2937",
    "gradientTo": "#b45309",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1784527,
      "highestPackage": 5896937,
      "medianPackage": 1577674,
      "placementPercent": 94
    }
  },
  {
    "id": "f-iit-tirupati-10",
    "slug": "iit-tirupati",
    "name": "IIT Tirupati",
    "abbreviation": "IITTP",
    "city": "Tirupati",
    "state": "Andhra Pradesh",
    "location": "Tirupati, Andhra Pradesh",
    "type": "IIT",
    "established": 2015,
    "annualFees": 210000,
    "rating": 4.2,
    "totalReviews": 11,
    "nirf": 11,
    "gradientFrom": "#111827",
    "gradientTo": "#0ea5e9",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1638006,
      "highestPackage": 5883207,
      "medianPackage": 1295336,
      "placementPercent": 92
    }
  },
  {
    "id": "f-iit-bhubaneswar-11",
    "slug": "iit-bhubaneswar",
    "name": "IIT Bhubaneswar",
    "abbreviation": "IITBBS",
    "city": "Bhubaneswar",
    "state": "Odisha",
    "location": "Bhubaneswar, Odisha",
    "type": "IIT",
    "established": 2008,
    "annualFees": 215000,
    "rating": 4.3,
    "totalReviews": 10,
    "nirf": 13,
    "gradientFrom": "#0b1120",
    "gradientTo": "#7c3aed",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1593221,
      "highestPackage": 4950746,
      "medianPackage": 1569152,
      "placementPercent": 86
    }
  },
  {
    "id": "f-iit-dhanbad-ism-12",
    "slug": "iit-dhanbad-ism",
    "name": "IIT Dhanbad ISM",
    "abbreviation": "IITISM",
    "city": "Dhanbad",
    "state": "Jharkhand",
    "location": "Dhanbad, Jharkhand",
    "type": "IIT",
    "established": 1926,
    "annualFees": 210000,
    "rating": 4.4,
    "totalReviews": 11,
    "nirf": 17,
    "gradientFrom": "#111827",
    "gradientTo": "#86198f",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1530265,
      "highestPackage": 7249908,
      "medianPackage": 1464777,
      "placementPercent": 86
    }
  },
  {
    "id": "f-iit-gandhinagar-13",
    "slug": "iit-gandhinagar",
    "name": "IIT Gandhinagar",
    "abbreviation": "IITGN",
    "city": "Gandhinagar",
    "state": "Gujarat",
    "location": "Gandhinagar, Gujarat",
    "type": "IIT",
    "established": 2008,
    "annualFees": 220000,
    "rating": 4.5,
    "totalReviews": 6,
    "nirf": 18,
    "gradientFrom": "#09090b",
    "gradientTo": "#9d174d",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1836510,
      "highestPackage": 4604608,
      "medianPackage": 1431307,
      "placementPercent": 89
    }
  },
  {
    "id": "f-iit-mandi-14",
    "slug": "iit-mandi",
    "name": "IIT Mandi",
    "abbreviation": "IITMANDI",
    "city": "Mandi",
    "state": "Himachal Pradesh",
    "location": "Mandi, Himachal Pradesh",
    "type": "IIT",
    "established": 2009,
    "annualFees": 210000,
    "rating": 4.2,
    "totalReviews": 9,
    "nirf": 19,
    "gradientFrom": "#111827",
    "gradientTo": "#0c4a6e",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1731324,
      "highestPackage": 7199923,
      "medianPackage": 1462875,
      "placementPercent": 91
    }
  },
  {
    "id": "f-iit-patna-15",
    "slug": "iit-patna",
    "name": "IIT Patna",
    "abbreviation": "IITP",
    "city": "Patna",
    "state": "Bihar",
    "location": "Patna, Bihar",
    "type": "IIT",
    "established": 2008,
    "annualFees": 215000,
    "rating": 4.3,
    "totalReviews": 5,
    "nirf": 25,
    "gradientFrom": "#111827",
    "gradientTo": "#312e81",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1512417,
      "highestPackage": 3913286,
      "medianPackage": 1425873,
      "placementPercent": 87
    }
  },
  {
    "id": "f-iit-ropar-16",
    "slug": "iit-ropar",
    "name": "IIT Ropar",
    "abbreviation": "IITRPR",
    "city": "Rupnagar",
    "state": "Punjab",
    "location": "Rupnagar, Punjab",
    "type": "IIT",
    "established": 2008,
    "annualFees": 215000,
    "rating": 4.4,
    "totalReviews": 3,
    "nirf": 22,
    "gradientFrom": "#171717",
    "gradientTo": "#064e3b",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1892114,
      "highestPackage": 4467385,
      "medianPackage": 1342987,
      "placementPercent": 93
    }
  },
  {
    "id": "f-iit-jodhpur-17",
    "slug": "iit-jodhpur",
    "name": "IIT Jodhpur",
    "abbreviation": "IITJ",
    "city": "Jodhpur",
    "state": "Rajasthan",
    "location": "Jodhpur, Rajasthan",
    "type": "IIT",
    "established": 2008,
    "annualFees": 220000,
    "rating": 4.3,
    "totalReviews": 9,
    "nirf": 30,
    "gradientFrom": "#0f172a",
    "gradientTo": "#854d0e",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1557742,
      "highestPackage": 6811252,
      "medianPackage": 1507987,
      "placementPercent": 89
    }
  },
  {
    "id": "f-iit-palakkad-18",
    "slug": "iit-palakkad",
    "name": "IIT Palakkad",
    "abbreviation": "IITPKD",
    "city": "Palakkad",
    "state": "Kerala",
    "location": "Palakkad, Kerala",
    "type": "IIT",
    "established": 2015,
    "annualFees": 210000,
    "rating": 4.1,
    "totalReviews": 8,
    "nirf": 33,
    "gradientFrom": "#111827",
    "gradientTo": "#134e4a",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1694396,
      "highestPackage": 4043141,
      "medianPackage": 1337709,
      "placementPercent": 85
    }
  },
  {
    "id": "f-iit-dharwad-19",
    "slug": "iit-dharwad",
    "name": "IIT Dharwad",
    "abbreviation": "IITDH",
    "city": "Dharwad",
    "state": "Karnataka",
    "location": "Dharwad, Karnataka",
    "type": "IIT",
    "established": 2016,
    "annualFees": 210000,
    "rating": 4,
    "totalReviews": 5,
    "nirf": 50,
    "gradientFrom": "#0f172a",
    "gradientTo": "#701a75",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1726889,
      "highestPackage": 6991383,
      "medianPackage": 1369874,
      "placementPercent": 89
    }
  },
  {
    "id": "f-iit-bhilai-20",
    "slug": "iit-bhilai",
    "name": "IIT Bhilai",
    "abbreviation": "IITBH",
    "city": "Bhilai",
    "state": "Chhattisgarh",
    "location": "Bhilai, Chhattisgarh",
    "type": "IIT",
    "established": 2016,
    "annualFees": 210000,
    "rating": 4,
    "totalReviews": 8,
    "nirf": 55,
    "gradientFrom": "#111827",
    "gradientTo": "#7f1d1d",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1767198,
      "highestPackage": 7640449,
      "medianPackage": 1384888,
      "placementPercent": 85
    }
  },
  {
    "id": "f-iit-jammu-21",
    "slug": "iit-jammu",
    "name": "IIT Jammu",
    "abbreviation": "IITJMU",
    "city": "Jammu",
    "state": "Jammu and Kashmir",
    "location": "Jammu, Jammu and Kashmir",
    "type": "IIT",
    "established": 2016,
    "annualFees": 210000,
    "rating": 4,
    "totalReviews": 8,
    "nirf": 57,
    "gradientFrom": "#0b1120",
    "gradientTo": "#1c1917",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1794246,
      "highestPackage": 5829539,
      "medianPackage": 1299296,
      "placementPercent": 92
    }
  },
  {
    "id": "f-iit-goa-22",
    "slug": "iit-goa",
    "name": "IIT Goa",
    "abbreviation": "IITGOA",
    "city": "Goa",
    "state": "Goa",
    "location": "Goa, Goa",
    "type": "IIT",
    "established": 2016,
    "annualFees": 210000,
    "rating": 4,
    "totalReviews": 10,
    "nirf": 60,
    "gradientFrom": "#111827",
    "gradientTo": "#052e16",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1660505,
      "highestPackage": 7499275,
      "medianPackage": 1399648,
      "placementPercent": 85
    }
  },
  {
    "id": "f-nit-tiruchirappalli-23",
    "slug": "nit-tiruchirappalli",
    "name": "NIT Tiruchirappalli",
    "abbreviation": "NITT",
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "location": "Tiruchirappalli, Tamil Nadu",
    "type": "NIT",
    "established": 1964,
    "annualFees": 165000,
    "rating": 4.6,
    "totalReviews": 7,
    "nirf": 12,
    "gradientFrom": "#111827",
    "gradientTo": "#0f766e",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 912805,
      "highestPackage": 2205806,
      "medianPackage": 813860,
      "placementPercent": 78
    }
  },
  {
    "id": "f-nit-surathkal-24",
    "slug": "nit-surathkal",
    "name": "NIT Surathkal",
    "abbreviation": "NITK",
    "city": "Surathkal",
    "state": "Karnataka",
    "location": "Surathkal, Karnataka",
    "type": "NIT",
    "established": 1960,
    "annualFees": 150000,
    "rating": 4.5,
    "totalReviews": 8,
    "nirf": 16,
    "gradientFrom": "#0b1120",
    "gradientTo": "#b91c1c",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 786988,
      "highestPackage": 2045328,
      "medianPackage": 751549,
      "placementPercent": 80
    }
  },
  {
    "id": "f-nit-warangal-25",
    "slug": "nit-warangal",
    "name": "NIT Warangal",
    "abbreviation": "NITW",
    "city": "Warangal",
    "state": "Telangana",
    "location": "Warangal, Telangana",
    "type": "NIT",
    "established": 1959,
    "annualFees": 150000,
    "rating": 4.6,
    "totalReviews": 6,
    "nirf": 20,
    "gradientFrom": "#18181b",
    "gradientTo": "#b45309",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 843576,
      "highestPackage": 1913893,
      "medianPackage": 749072,
      "placementPercent": 84
    }
  },
  {
    "id": "f-nit-rourkela-26",
    "slug": "nit-rourkela",
    "name": "NIT Rourkela",
    "abbreviation": "NITR",
    "city": "Rourkela",
    "state": "Odisha",
    "location": "Rourkela, Odisha",
    "type": "NIT",
    "established": 1961,
    "annualFees": 155000,
    "rating": 4.5,
    "totalReviews": 10,
    "nirf": 21,
    "gradientFrom": "#0f172a",
    "gradientTo": "#1d4ed8",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 954377,
      "highestPackage": 1987385,
      "medianPackage": 713413,
      "placementPercent": 78
    }
  },
  {
    "id": "f-nit-calicut-27",
    "slug": "nit-calicut",
    "name": "NIT Calicut",
    "abbreviation": "NITC",
    "city": "Kozhikode",
    "state": "Kerala",
    "location": "Kozhikode, Kerala",
    "type": "NIT",
    "established": 1961,
    "annualFees": 155000,
    "rating": 4.4,
    "totalReviews": 4,
    "nirf": 23,
    "gradientFrom": "#111827",
    "gradientTo": "#4338ca",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 915833,
      "highestPackage": 2189600,
      "medianPackage": 802849,
      "placementPercent": 80
    }
  },
  {
    "id": "f-mnnit-allahabad-28",
    "slug": "mnnit-allahabad",
    "name": "MNNIT Allahabad",
    "abbreviation": "MNNIT",
    "city": "Prayagraj",
    "state": "Uttar Pradesh",
    "location": "Prayagraj, Uttar Pradesh",
    "type": "NIT",
    "established": 1961,
    "annualFees": 155000,
    "rating": 4.4,
    "totalReviews": 4,
    "nirf": 28,
    "gradientFrom": "#171717",
    "gradientTo": "#0369a1",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 946118,
      "highestPackage": 1937074,
      "medianPackage": 795591,
      "placementPercent": 78
    }
  },
  {
    "id": "f-vnit-nagpur-29",
    "slug": "vnit-nagpur",
    "name": "VNIT Nagpur",
    "abbreviation": "VNIT",
    "city": "Nagpur",
    "state": "Maharashtra",
    "location": "Nagpur, Maharashtra",
    "type": "NIT",
    "established": 1960,
    "annualFees": 150000,
    "rating": 4.3,
    "totalReviews": 5,
    "nirf": 31,
    "gradientFrom": "#0f172a",
    "gradientTo": "#15803d",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 789492,
      "highestPackage": 3264246,
      "medianPackage": 704018,
      "placementPercent": 86
    }
  },
  {
    "id": "f-mnit-jaipur-30",
    "slug": "mnit-jaipur",
    "name": "MNIT Jaipur",
    "abbreviation": "MNIT",
    "city": "Jaipur",
    "state": "Rajasthan",
    "location": "Jaipur, Rajasthan",
    "type": "NIT",
    "established": 1963,
    "annualFees": 145000,
    "rating": 4.4,
    "totalReviews": 12,
    "nirf": 35,
    "gradientFrom": "#1f2937",
    "gradientTo": "#9f1239",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 747313,
      "highestPackage": 1751636,
      "medianPackage": 746301,
      "placementPercent": 78
    }
  },
  {
    "id": "f-nit-durgapur-31",
    "slug": "nit-durgapur",
    "name": "NIT Durgapur",
    "abbreviation": "NITDGP",
    "city": "Durgapur",
    "state": "West Bengal",
    "location": "Durgapur, West Bengal",
    "type": "NIT",
    "established": 1960,
    "annualFees": 150000,
    "rating": 4.2,
    "totalReviews": 11,
    "nirf": 38,
    "gradientFrom": "#111827",
    "gradientTo": "#6d28d9",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 759951,
      "highestPackage": 1819102,
      "medianPackage": 800043,
      "placementPercent": 85
    }
  },
  {
    "id": "f-nit-silchar-32",
    "slug": "nit-silchar",
    "name": "NIT Silchar",
    "abbreviation": "NITS",
    "city": "Silchar",
    "state": "Assam",
    "location": "Silchar, Assam",
    "type": "NIT",
    "established": 1967,
    "annualFees": 140000,
    "rating": 4.1,
    "totalReviews": 10,
    "nirf": 40,
    "gradientFrom": "#1f2937",
    "gradientTo": "#a21caf",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 873382,
      "highestPackage": 1787793,
      "medianPackage": 725719,
      "placementPercent": 81
    }
  },
  {
    "id": "f-nit-kurukshetra-33",
    "slug": "nit-kurukshetra",
    "name": "NIT Kurukshetra",
    "abbreviation": "NITKKR",
    "city": "Kurukshetra",
    "state": "Haryana",
    "location": "Kurukshetra, Haryana",
    "type": "NIT",
    "established": 1963,
    "annualFees": 155000,
    "rating": 4.2,
    "totalReviews": 5,
    "nirf": 42,
    "gradientFrom": "#09090b",
    "gradientTo": "#7c2d12",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 881267,
      "highestPackage": 3027453,
      "medianPackage": 788677,
      "placementPercent": 84
    }
  },
  {
    "id": "f-svnit-surat-34",
    "slug": "svnit-surat",
    "name": "SVNIT Surat",
    "abbreviation": "SVNIT",
    "city": "Surat",
    "state": "Gujarat",
    "location": "Surat, Gujarat",
    "type": "NIT",
    "established": 1961,
    "annualFees": 145000,
    "rating": 4.2,
    "totalReviews": 6,
    "nirf": 44,
    "gradientFrom": "#0b1120",
    "gradientTo": "#047857",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 844087,
      "highestPackage": 2811134,
      "medianPackage": 777978,
      "placementPercent": 80
    }
  },
  {
    "id": "f-nit-jalandhar-35",
    "slug": "nit-jalandhar",
    "name": "NIT Jalandhar",
    "abbreviation": "NITJ",
    "city": "Jalandhar",
    "state": "Punjab",
    "location": "Jalandhar, Punjab",
    "type": "NIT",
    "established": 1987,
    "annualFees": 140000,
    "rating": 4.1,
    "totalReviews": 6,
    "nirf": 46,
    "gradientFrom": "#111827",
    "gradientTo": "#4f46e5",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 840272,
      "highestPackage": 2191927,
      "medianPackage": 636444,
      "placementPercent": 79
    }
  },
  {
    "id": "f-manit-bhopal-36",
    "slug": "manit-bhopal",
    "name": "MANIT Bhopal",
    "abbreviation": "MANIT",
    "city": "Bhopal",
    "state": "Madhya Pradesh",
    "location": "Bhopal, Madhya Pradesh",
    "type": "NIT",
    "established": 1960,
    "annualFees": 145000,
    "rating": 4.1,
    "totalReviews": 6,
    "nirf": 48,
    "gradientFrom": "#0f172a",
    "gradientTo": "#c2410c",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 874860,
      "highestPackage": 2977508,
      "medianPackage": 772719,
      "placementPercent": 78
    }
  },
  {
    "id": "f-nit-hamirpur-37",
    "slug": "nit-hamirpur",
    "name": "NIT Hamirpur",
    "abbreviation": "NITH",
    "city": "Hamirpur",
    "state": "Himachal Pradesh",
    "location": "Hamirpur, Himachal Pradesh",
    "type": "NIT",
    "established": 1986,
    "annualFees": 145000,
    "rating": 4,
    "totalReviews": 10,
    "nirf": 52,
    "gradientFrom": "#111827",
    "gradientTo": "#6b21a8",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 887730,
      "highestPackage": 2503597,
      "medianPackage": 754249,
      "placementPercent": 78
    }
  },
  {
    "id": "f-nit-agartala-38",
    "slug": "nit-agartala",
    "name": "NIT Agartala",
    "abbreviation": "NITA",
    "city": "Agartala",
    "state": "Tripura",
    "location": "Agartala, Tripura",
    "type": "NIT",
    "established": 1965,
    "annualFees": 135000,
    "rating": 4,
    "totalReviews": 6,
    "nirf": 56,
    "gradientFrom": "#0f172a",
    "gradientTo": "#1e3a5f",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 743692,
      "highestPackage": 2435616,
      "medianPackage": 707703,
      "placementPercent": 85
    }
  },
  {
    "id": "f-nit-jamshedpur-39",
    "slug": "nit-jamshedpur",
    "name": "NIT Jamshedpur",
    "abbreviation": "NITJSR",
    "city": "Jamshedpur",
    "state": "Jharkhand",
    "location": "Jamshedpur, Jharkhand",
    "type": "NIT",
    "established": 1960,
    "annualFees": 140000,
    "rating": 4,
    "totalReviews": 3,
    "nirf": 59,
    "gradientFrom": "#111827",
    "gradientTo": "#374151",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 816409,
      "highestPackage": 3162404,
      "medianPackage": 644049,
      "placementPercent": 80
    }
  },
  {
    "id": "f-nit-srinagar-40",
    "slug": "nit-srinagar",
    "name": "NIT Srinagar",
    "abbreviation": "NITSRI",
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "location": "Srinagar, Jammu and Kashmir",
    "type": "NIT",
    "established": 1960,
    "annualFees": 130000,
    "rating": 3.9,
    "totalReviews": 4,
    "nirf": 62,
    "gradientFrom": "#0f172a",
    "gradientTo": "#1e3a8a",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 724844,
      "highestPackage": 2425872,
      "medianPackage": 733040,
      "placementPercent": 83
    }
  },
  {
    "id": "f-nit-patna-41",
    "slug": "nit-patna",
    "name": "NIT Patna",
    "abbreviation": "NITP",
    "city": "Patna",
    "state": "Bihar",
    "location": "Patna, Bihar",
    "type": "NIT",
    "established": 1886,
    "annualFees": 140000,
    "rating": 4,
    "totalReviews": 4,
    "nirf": 65,
    "gradientFrom": "#111827",
    "gradientTo": "#7c2d12",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 729814,
      "highestPackage": 2089504,
      "medianPackage": 740073,
      "placementPercent": 80
    }
  },
  {
    "id": "f-nit-raipur-42",
    "slug": "nit-raipur",
    "name": "NIT Raipur",
    "abbreviation": "NITRR",
    "city": "Raipur",
    "state": "Chhattisgarh",
    "location": "Raipur, Chhattisgarh",
    "type": "NIT",
    "established": 1956,
    "annualFees": 140000,
    "rating": 3.9,
    "totalReviews": 12,
    "nirf": 68,
    "gradientFrom": "#0b1120",
    "gradientTo": "#15803d",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 712704,
      "highestPackage": 2260438,
      "medianPackage": 718123,
      "placementPercent": 84
    }
  },
  {
    "id": "f-nit-puducherry-43",
    "slug": "nit-puducherry",
    "name": "NIT Puducherry",
    "abbreviation": "NITPY",
    "city": "Karaikal",
    "state": "Puducherry",
    "location": "Karaikal, Puducherry",
    "type": "NIT",
    "established": 2009,
    "annualFees": 130000,
    "rating": 3.8,
    "totalReviews": 6,
    "nirf": 75,
    "gradientFrom": "#111827",
    "gradientTo": "#0891b2",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 749807,
      "highestPackage": 2111849,
      "medianPackage": 633078,
      "placementPercent": 79
    }
  },
  {
    "id": "f-nit-goa-44",
    "slug": "nit-goa",
    "name": "NIT Goa",
    "abbreviation": "NITGOA",
    "city": "Farmagudi",
    "state": "Goa",
    "location": "Farmagudi, Goa",
    "type": "NIT",
    "established": 2010,
    "annualFees": 130000,
    "rating": 3.8,
    "totalReviews": 9,
    "nirf": 78,
    "gradientFrom": "#0f172a",
    "gradientTo": "#166534",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 668485,
      "highestPackage": 2678610,
      "medianPackage": 620945,
      "placementPercent": 87
    }
  },
  {
    "id": "f-nit-manipur-45",
    "slug": "nit-manipur",
    "name": "NIT Manipur",
    "abbreviation": "NITM",
    "city": "Imphal",
    "state": "Manipur",
    "location": "Imphal, Manipur",
    "type": "NIT",
    "established": 2010,
    "annualFees": 125000,
    "rating": 3.7,
    "totalReviews": 5,
    "nirf": 85,
    "gradientFrom": "#111827",
    "gradientTo": "#7e22ce",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 824341,
      "highestPackage": 2778537,
      "medianPackage": 657515,
      "placementPercent": 84
    }
  },
  {
    "id": "f-nit-meghalaya-46",
    "slug": "nit-meghalaya",
    "name": "NIT Meghalaya",
    "abbreviation": "NITMGH",
    "city": "Shillong",
    "state": "Meghalaya",
    "location": "Shillong, Meghalaya",
    "type": "NIT",
    "established": 2010,
    "annualFees": 125000,
    "rating": 3.7,
    "totalReviews": 3,
    "nirf": 87,
    "gradientFrom": "#0f172a",
    "gradientTo": "#064e3b",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 708171,
      "highestPackage": 1817084,
      "medianPackage": 594973,
      "placementPercent": 78
    }
  },
  {
    "id": "f-nit-mizoram-47",
    "slug": "nit-mizoram",
    "name": "NIT Mizoram",
    "abbreviation": "NITMZO",
    "city": "Aizawl",
    "state": "Mizoram",
    "location": "Aizawl, Mizoram",
    "type": "NIT",
    "established": 2010,
    "annualFees": 120000,
    "rating": 3.7,
    "totalReviews": 3,
    "nirf": 90,
    "gradientFrom": "#111827",
    "gradientTo": "#374151",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 667701,
      "highestPackage": 1882632,
      "medianPackage": 579973,
      "placementPercent": 87
    }
  },
  {
    "id": "f-nit-nagaland-48",
    "slug": "nit-nagaland",
    "name": "NIT Nagaland",
    "abbreviation": "NITN",
    "city": "Dimapur",
    "state": "Nagaland",
    "location": "Dimapur, Nagaland",
    "type": "NIT",
    "established": 2010,
    "annualFees": 120000,
    "rating": 3.6,
    "totalReviews": 6,
    "nirf": 93,
    "gradientFrom": "#0b1120",
    "gradientTo": "#1f2937",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 711531,
      "highestPackage": 2882461,
      "medianPackage": 641790,
      "placementPercent": 79
    }
  },
  {
    "id": "f-nit-sikkim-49",
    "slug": "nit-sikkim",
    "name": "NIT Sikkim",
    "abbreviation": "NITSKM",
    "city": "Ravangla",
    "state": "Sikkim",
    "location": "Ravangla, Sikkim",
    "type": "NIT",
    "established": 2010,
    "annualFees": 120000,
    "rating": 3.6,
    "totalReviews": 5,
    "nirf": 95,
    "gradientFrom": "#111827",
    "gradientTo": "#164e63",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 768169,
      "highestPackage": 1853126,
      "medianPackage": 612818,
      "placementPercent": 82
    }
  },
  {
    "id": "f-nit-arunachal-pradesh-50",
    "slug": "nit-arunachal-pradesh",
    "name": "NIT Arunachal Pradesh",
    "abbreviation": "NITAP",
    "city": "Yupia",
    "state": "Arunachal Pradesh",
    "location": "Yupia, Arunachal Pradesh",
    "type": "NIT",
    "established": 2010,
    "annualFees": 120000,
    "rating": 3.6,
    "totalReviews": 5,
    "nirf": 98,
    "gradientFrom": "#0f172a",
    "gradientTo": "#1c1917",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 721289,
      "highestPackage": 2787955,
      "medianPackage": 629983,
      "placementPercent": 85
    }
  },
  {
    "id": "f-nit-andhra-pradesh-51",
    "slug": "nit-andhra-pradesh",
    "name": "NIT Andhra Pradesh",
    "abbreviation": "NITANP",
    "city": "Tadepalligudem",
    "state": "Andhra Pradesh",
    "location": "Tadepalligudem, Andhra Pradesh",
    "type": "NIT",
    "established": 2015,
    "annualFees": 125000,
    "rating": 3.7,
    "totalReviews": 10,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#1d4ed8",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 754313,
      "highestPackage": 2597676,
      "medianPackage": 632149,
      "placementPercent": 87
    }
  },
  {
    "id": "f-nit-uttarakhand-52",
    "slug": "nit-uttarakhand",
    "name": "NIT Uttarakhand",
    "abbreviation": "NITUK",
    "city": "Srinagar Garhwal",
    "state": "Uttarakhand",
    "location": "Srinagar Garhwal, Uttarakhand",
    "type": "NIT",
    "established": 2009,
    "annualFees": 125000,
    "rating": 3.7,
    "totalReviews": 4,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#134e4a",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 766872,
      "highestPackage": 1566279,
      "medianPackage": 709593,
      "placementPercent": 87
    }
  },
  {
    "id": "f-nit-delhi-53",
    "slug": "nit-delhi",
    "name": "NIT Delhi",
    "abbreviation": "NITDL",
    "city": "New Delhi",
    "state": "Delhi",
    "location": "New Delhi, Delhi",
    "type": "NIT",
    "established": 2010,
    "annualFees": 135000,
    "rating": 4,
    "totalReviews": 10,
    "nirf": 72,
    "gradientFrom": "#111827",
    "gradientTo": "#1e1b4b",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 711321,
      "highestPackage": 2299783,
      "medianPackage": 610872,
      "placementPercent": 84
    }
  },
  {
    "id": "f-iiit-hyderabad-54",
    "slug": "iiit-hyderabad",
    "name": "IIIT Hyderabad",
    "abbreviation": "IIITH",
    "city": "Hyderabad",
    "state": "Telangana",
    "location": "Hyderabad, Telangana",
    "type": "IIIT",
    "established": 1998,
    "annualFees": 420000,
    "rating": 4.7,
    "totalReviews": 5,
    "nirf": 47,
    "gradientFrom": "#111827",
    "gradientTo": "#065f46",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1399774,
      "highestPackage": 5197380,
      "medianPackage": 1251122,
      "placementPercent": 82
    }
  },
  {
    "id": "f-iiit-bangalore-55",
    "slug": "iiit-bangalore",
    "name": "IIIT Bangalore",
    "abbreviation": "IIITB",
    "city": "Bengaluru",
    "state": "Karnataka",
    "location": "Bengaluru, Karnataka",
    "type": "IIIT",
    "established": 1999,
    "annualFees": 440000,
    "rating": 4.6,
    "totalReviews": 6,
    "nirf": 50,
    "gradientFrom": "#0f172a",
    "gradientTo": "#0284c7",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1591053,
      "highestPackage": 4641246,
      "medianPackage": 1267767,
      "placementPercent": 89
    }
  },
  {
    "id": "f-iiit-delhi-56",
    "slug": "iiit-delhi",
    "name": "IIIT Delhi",
    "abbreviation": "IIITD",
    "city": "New Delhi",
    "state": "Delhi",
    "location": "New Delhi, Delhi",
    "type": "IIIT",
    "established": 2008,
    "annualFees": 450000,
    "rating": 4.5,
    "totalReviews": 10,
    "nirf": 53,
    "gradientFrom": "#171717",
    "gradientTo": "#dc2626",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1423058,
      "highestPackage": 5236026,
      "medianPackage": 1185059,
      "placementPercent": 82
    }
  },
  {
    "id": "f-iiit-allahabad-57",
    "slug": "iiit-allahabad",
    "name": "IIIT Allahabad",
    "abbreviation": "IIITA",
    "city": "Prayagraj",
    "state": "Uttar Pradesh",
    "location": "Prayagraj, Uttar Pradesh",
    "type": "IIIT",
    "established": 1999,
    "annualFees": 185000,
    "rating": 4.5,
    "totalReviews": 3,
    "nirf": 58,
    "gradientFrom": "#0b1120",
    "gradientTo": "#9333ea",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 676870,
      "highestPackage": 2510420,
      "medianPackage": 483691,
      "placementPercent": 82
    }
  },
  {
    "id": "f-iiitm-gwalior-58",
    "slug": "iiitm-gwalior",
    "name": "IIITM Gwalior",
    "abbreviation": "ABV-IIITM",
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "location": "Gwalior, Madhya Pradesh",
    "type": "IIIT",
    "established": 1997,
    "annualFees": 190000,
    "rating": 4.3,
    "totalReviews": 3,
    "nirf": 63,
    "gradientFrom": "#18181b",
    "gradientTo": "#ea580c",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 610708,
      "highestPackage": 2088356,
      "medianPackage": 526459,
      "placementPercent": 81
    }
  },
  {
    "id": "f-iiitdm-kancheepuram-59",
    "slug": "iiitdm-kancheepuram",
    "name": "IIITDM Kancheepuram",
    "abbreviation": "IIITDMK",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "location": "Chennai, Tamil Nadu",
    "type": "IIIT",
    "established": 2007,
    "annualFees": 150000,
    "rating": 4.2,
    "totalReviews": 9,
    "nirf": 70,
    "gradientFrom": "#09090b",
    "gradientTo": "#65a30d",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 715182,
      "highestPackage": 2860228,
      "medianPackage": 597429,
      "placementPercent": 87
    }
  },
  {
    "id": "f-iiitdm-jabalpur-60",
    "slug": "iiitdm-jabalpur",
    "name": "IIITDM Jabalpur",
    "abbreviation": "IIITDMJ",
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "location": "Jabalpur, Madhya Pradesh",
    "type": "IIIT",
    "established": 2005,
    "annualFees": 160000,
    "rating": 4.2,
    "totalReviews": 8,
    "nirf": 80,
    "gradientFrom": "#0f172a",
    "gradientTo": "#854d0e",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 644926,
      "highestPackage": 3128570,
      "medianPackage": 624599,
      "placementPercent": 84
    }
  },
  {
    "id": "f-iiit-pune-61",
    "slug": "iiit-pune",
    "name": "IIIT Pune",
    "abbreviation": "IIITP",
    "city": "Pune",
    "state": "Maharashtra",
    "location": "Pune, Maharashtra",
    "type": "IIIT",
    "established": 2016,
    "annualFees": 250000,
    "rating": 4.1,
    "totalReviews": 11,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#0891b2",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 994837,
      "highestPackage": 4082397,
      "medianPackage": 765837,
      "placementPercent": 89
    }
  },
  {
    "id": "f-iiit-lucknow-62",
    "slug": "iiit-lucknow",
    "name": "IIIT Lucknow",
    "abbreviation": "IIITL",
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "location": "Lucknow, Uttar Pradesh",
    "type": "IIIT",
    "established": 2015,
    "annualFees": 260000,
    "rating": 4.3,
    "totalReviews": 3,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#9f1239",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1043928,
      "highestPackage": 4586639,
      "medianPackage": 722742,
      "placementPercent": 84
    }
  },
  {
    "id": "f-iiit-nagpur-63",
    "slug": "iiit-nagpur",
    "name": "IIIT Nagpur",
    "abbreviation": "IIITN",
    "city": "Nagpur",
    "state": "Maharashtra",
    "location": "Nagpur, Maharashtra",
    "type": "IIIT",
    "established": 2016,
    "annualFees": 245000,
    "rating": 4.1,
    "totalReviews": 6,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#374151",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 826533,
      "highestPackage": 3867437,
      "medianPackage": 793281,
      "placementPercent": 80
    }
  },
  {
    "id": "f-iiit-naya-raipur-64",
    "slug": "iiit-naya-raipur",
    "name": "IIIT Naya Raipur",
    "abbreviation": "IIITNR",
    "city": "Naya Raipur",
    "state": "Chhattisgarh",
    "location": "Naya Raipur, Chhattisgarh",
    "type": "IIIT",
    "established": 2016,
    "annualFees": 240000,
    "rating": 4,
    "totalReviews": 3,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#064e3b",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1019030,
      "highestPackage": 3145325,
      "medianPackage": 743604,
      "placementPercent": 82
    }
  },
  {
    "id": "f-iiit-bhopal-65",
    "slug": "iiit-bhopal",
    "name": "IIIT Bhopal",
    "abbreviation": "IIITBPL",
    "city": "Bhopal",
    "state": "Madhya Pradesh",
    "location": "Bhopal, Madhya Pradesh",
    "type": "IIIT",
    "established": 2017,
    "annualFees": 245000,
    "rating": 4,
    "totalReviews": 7,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#86198f",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 752363,
      "highestPackage": 2804685,
      "medianPackage": 632793,
      "placementPercent": 80
    }
  },
  {
    "id": "f-iiit-vadodara-66",
    "slug": "iiit-vadodara",
    "name": "IIIT Vadodara",
    "abbreviation": "IIITV",
    "city": "Vadodara",
    "state": "Gujarat",
    "location": "Vadodara, Gujarat",
    "type": "IIIT",
    "established": 2013,
    "annualFees": 235000,
    "rating": 4.1,
    "totalReviews": 9,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#047857",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 767357,
      "highestPackage": 2394465,
      "medianPackage": 664345,
      "placementPercent": 82
    }
  },
  {
    "id": "f-iiit-bhagalpur-67",
    "slug": "iiit-bhagalpur",
    "name": "IIIT Bhagalpur",
    "abbreviation": "IIITBGP",
    "city": "Bhagalpur",
    "state": "Bihar",
    "location": "Bhagalpur, Bihar",
    "type": "IIIT",
    "established": 2017,
    "annualFees": 230000,
    "rating": 3.9,
    "totalReviews": 12,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#7c2d12",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 707637,
      "highestPackage": 3002742,
      "medianPackage": 707604,
      "placementPercent": 81
    }
  },
  {
    "id": "f-iiit-surat-68",
    "slug": "iiit-surat",
    "name": "IIIT Surat",
    "abbreviation": "IIITSRT",
    "city": "Surat",
    "state": "Gujarat",
    "location": "Surat, Gujarat",
    "type": "IIIT",
    "established": 2017,
    "annualFees": 235000,
    "rating": 3.9,
    "totalReviews": 5,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#0c4a6e",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 889488,
      "highestPackage": 3872469,
      "medianPackage": 683463,
      "placementPercent": 84
    }
  },
  {
    "id": "f-iiit-agartala-69",
    "slug": "iiit-agartala",
    "name": "IIIT Agartala",
    "abbreviation": "IIITAGE",
    "city": "Agartala",
    "state": "Tripura",
    "location": "Agartala, Tripura",
    "type": "IIIT",
    "established": 2015,
    "annualFees": 220000,
    "rating": 3.8,
    "totalReviews": 6,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#1c1917",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 683667,
      "highestPackage": 3479041,
      "medianPackage": 741783,
      "placementPercent": 81
    }
  },
  {
    "id": "f-iiit-kalyani-70",
    "slug": "iiit-kalyani",
    "name": "IIIT Kalyani",
    "abbreviation": "IIITKALYANI",
    "city": "Kalyani",
    "state": "West Bengal",
    "location": "Kalyani, West Bengal",
    "type": "IIIT",
    "established": 2019,
    "annualFees": 225000,
    "rating": 3.8,
    "totalReviews": 4,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#312e81",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 965754,
      "highestPackage": 4063725,
      "medianPackage": 788799,
      "placementPercent": 81
    }
  },
  {
    "id": "f-iiit-kurnool-71",
    "slug": "iiit-kurnool",
    "name": "IIIT Kurnool",
    "abbreviation": "IIITKRNL",
    "city": "Kurnool",
    "state": "Andhra Pradesh",
    "location": "Kurnool, Andhra Pradesh",
    "type": "IIIT",
    "established": 2015,
    "annualFees": 230000,
    "rating": 3.9,
    "totalReviews": 11,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#7c3aed",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 922720,
      "highestPackage": 4071704,
      "medianPackage": 756997,
      "placementPercent": 80
    }
  },
  {
    "id": "f-iiit-manipur-72",
    "slug": "iiit-manipur",
    "name": "IIIT Manipur",
    "abbreviation": "IIITMAN",
    "city": "Imphal",
    "state": "Manipur",
    "location": "Imphal, Manipur",
    "type": "IIIT",
    "established": 2015,
    "annualFees": 215000,
    "rating": 3.8,
    "totalReviews": 10,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#6b21a8",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 884929,
      "highestPackage": 3095175,
      "medianPackage": 782272,
      "placementPercent": 82
    }
  },
  {
    "id": "f-iiit-ranchi-73",
    "slug": "iiit-ranchi",
    "name": "IIIT Ranchi",
    "abbreviation": "IIITRCHI",
    "city": "Ranchi",
    "state": "Jharkhand",
    "location": "Ranchi, Jharkhand",
    "type": "IIIT",
    "established": 2016,
    "annualFees": 225000,
    "rating": 3.9,
    "totalReviews": 10,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#1e3a5f",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 678505,
      "highestPackage": 3445199,
      "medianPackage": 701411,
      "placementPercent": 80
    }
  },
  {
    "id": "f-iiit-sonepat-74",
    "slug": "iiit-sonepat",
    "name": "IIIT Sonepat",
    "abbreviation": "IIITSNP",
    "city": "Sonepat",
    "state": "Haryana",
    "location": "Sonepat, Haryana",
    "type": "IIIT",
    "established": 2015,
    "annualFees": 220000,
    "rating": 3.9,
    "totalReviews": 7,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#b45309",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 687047,
      "highestPackage": 2970753,
      "medianPackage": 585617,
      "placementPercent": 87
    }
  },
  {
    "id": "f-iiit-sri-city-75",
    "slug": "iiit-sri-city",
    "name": "IIIT Sri City",
    "abbreviation": "IIITSC",
    "city": "Sri City",
    "state": "Andhra Pradesh",
    "location": "Sri City, Andhra Pradesh",
    "type": "IIIT",
    "established": 2013,
    "annualFees": 300000,
    "rating": 4,
    "totalReviews": 7,
    "nirf": null,
    "gradientFrom": "#18181b",
    "gradientTo": "#0284c7",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 925245,
      "highestPackage": 3784085,
      "medianPackage": 851984,
      "placementPercent": 87
    }
  },
  {
    "id": "f-iiit-una-76",
    "slug": "iiit-una",
    "name": "IIIT Una",
    "abbreviation": "IIITUNA",
    "city": "Una",
    "state": "Himachal Pradesh",
    "location": "Una, Himachal Pradesh",
    "type": "IIIT",
    "established": 2014,
    "annualFees": 220000,
    "rating": 3.9,
    "totalReviews": 3,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#134e4a",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 694154,
      "highestPackage": 2331670,
      "medianPackage": 574141,
      "placementPercent": 89
    }
  },
  {
    "id": "f-iiit-tiruchirappalli-77",
    "slug": "iiit-tiruchirappalli",
    "name": "IIIT Tiruchirappalli",
    "abbreviation": "IIITTRY",
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "location": "Tiruchirappalli, Tamil Nadu",
    "type": "IIIT",
    "established": 2013,
    "annualFees": 235000,
    "rating": 4,
    "totalReviews": 9,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#ea580c",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 888459,
      "highestPackage": 2467991,
      "medianPackage": 660442,
      "placementPercent": 82
    }
  },
  {
    "id": "f-iiit-vadodara-icd-diu-78",
    "slug": "iiit-vadodara-icd-diu",
    "name": "IIIT Vadodara ICD Diu",
    "abbreviation": "IIITVD",
    "city": "Diu",
    "state": "Dadra and NH",
    "location": "Diu, Dadra and NH",
    "type": "IIIT",
    "established": 2017,
    "annualFees": 210000,
    "rating": 3.8,
    "totalReviews": 10,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#15803d",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 742497,
      "highestPackage": 3309181,
      "medianPackage": 571054,
      "placementPercent": 88
    }
  },
  {
    "id": "f-iiit-dharwad-79",
    "slug": "iiit-dharwad",
    "name": "IIIT Dharwad",
    "abbreviation": "IIITDWD",
    "city": "Dharwad",
    "state": "Karnataka",
    "location": "Dharwad, Karnataka",
    "type": "IIIT",
    "established": 2015,
    "annualFees": 230000,
    "rating": 3.9,
    "totalReviews": 5,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#c2410c",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 984375,
      "highestPackage": 2550316,
      "medianPackage": 641383,
      "placementPercent": 81
    }
  },
  {
    "id": "f-assam-university-silchar-80",
    "slug": "assam-university-silchar",
    "name": "Assam University Silchar",
    "abbreviation": "AU-SIL",
    "city": "Silchar",
    "state": "Assam",
    "location": "Silchar, Assam",
    "type": "GOVERNMENT",
    "established": 1994,
    "annualFees": 45000,
    "rating": 3.8,
    "totalReviews": 10,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#065f46",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1497357,
      "highestPackage": 4419438,
      "medianPackage": 1124777,
      "placementPercent": 77
    }
  },
  {
    "id": "f-birla-institute-of-technology-mesra-81",
    "slug": "birla-institute-of-technology-mesra",
    "name": "Birla Institute of Technology Mesra",
    "abbreviation": "BIT-MESRA",
    "city": "Ranchi",
    "state": "Jharkhand",
    "location": "Ranchi, Jharkhand",
    "type": "GOVERNMENT",
    "established": 1955,
    "annualFees": 175000,
    "rating": 4.2,
    "totalReviews": 9,
    "nirf": 32,
    "gradientFrom": "#0f172a",
    "gradientTo": "#b45309",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1050739,
      "highestPackage": 5429604,
      "medianPackage": 813586,
      "placementPercent": 86
    }
  },
  {
    "id": "f-bit-mesra-deoghar-off-campus-82",
    "slug": "bit-mesra-deoghar-off-campus",
    "name": "BIT Mesra Deoghar Off Campus",
    "abbreviation": "BIT-DEO",
    "city": "Deoghar",
    "state": "Jharkhand",
    "location": "Deoghar, Jharkhand",
    "type": "GOVERNMENT",
    "established": 2013,
    "annualFees": 175000,
    "rating": 3.7,
    "totalReviews": 11,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#7c2d12",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1483490,
      "highestPackage": 3555402,
      "medianPackage": 1120413,
      "placementPercent": 78
    }
  },
  {
    "id": "f-bit-mesra-patna-off-campus-83",
    "slug": "bit-mesra-patna-off-campus",
    "name": "BIT Mesra Patna Off Campus",
    "abbreviation": "BIT-PAT",
    "city": "Patna",
    "state": "Bihar",
    "location": "Patna, Bihar",
    "type": "GOVERNMENT",
    "established": 2013,
    "annualFees": 175000,
    "rating": 3.7,
    "totalReviews": 3,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#1d4ed8",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1066823,
      "highestPackage": 4322189,
      "medianPackage": 1096668,
      "placementPercent": 79
    }
  },
  {
    "id": "f-central-institute-of-technology-kokrajhar-84",
    "slug": "central-institute-of-technology-kokrajhar",
    "name": "Central Institute of Technology Kokrajhar",
    "abbreviation": "CIT-KOK",
    "city": "Kokrajhar",
    "state": "Assam",
    "location": "Kokrajhar, Assam",
    "type": "GOVERNMENT",
    "established": 2006,
    "annualFees": 75000,
    "rating": 3.7,
    "totalReviews": 5,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#166534",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1210159,
      "highestPackage": 4763296,
      "medianPackage": 1088958,
      "placementPercent": 73
    }
  },
  {
    "id": "f-central-university-of-haryana-85",
    "slug": "central-university-of-haryana",
    "name": "Central University of Haryana",
    "abbreviation": "CUH",
    "city": "Mahendragarh",
    "state": "Haryana",
    "location": "Mahendragarh, Haryana",
    "type": "GOVERNMENT",
    "established": 2009,
    "annualFees": 30000,
    "rating": 3.6,
    "totalReviews": 4,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#7e22ce",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1429170,
      "highestPackage": 4340313,
      "medianPackage": 1103463,
      "placementPercent": 74
    }
  },
  {
    "id": "f-central-university-of-jammu-86",
    "slug": "central-university-of-jammu",
    "name": "Central University of Jammu",
    "abbreviation": "CUJ",
    "city": "Jammu",
    "state": "Jammu and Kashmir",
    "location": "Jammu, Jammu and Kashmir",
    "type": "GOVERNMENT",
    "established": 2011,
    "annualFees": 30000,
    "rating": 3.5,
    "totalReviews": 9,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#1e3a5f",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1113923,
      "highestPackage": 3496298,
      "medianPackage": 804976,
      "placementPercent": 75
    }
  },
  {
    "id": "f-central-university-of-jharkhand-87",
    "slug": "central-university-of-jharkhand",
    "name": "Central University of Jharkhand",
    "abbreviation": "CUJ-RAN",
    "city": "Ranchi",
    "state": "Jharkhand",
    "location": "Ranchi, Jharkhand",
    "type": "GOVERNMENT",
    "established": 2009,
    "annualFees": 28000,
    "rating": 3.5,
    "totalReviews": 4,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#374151",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1283650,
      "highestPackage": 4424576,
      "medianPackage": 967862,
      "placementPercent": 77
    }
  },
  {
    "id": "f-central-university-of-rajasthan-88",
    "slug": "central-university-of-rajasthan",
    "name": "Central University of Rajasthan",
    "abbreviation": "CURAJ",
    "city": "Ajmer",
    "state": "Rajasthan",
    "location": "Ajmer, Rajasthan",
    "type": "GOVERNMENT",
    "established": 2009,
    "annualFees": 28000,
    "rating": 3.5,
    "totalReviews": 3,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#854d0e",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1182169,
      "highestPackage": 4021344,
      "medianPackage": 846120,
      "placementPercent": 84
    }
  },
  {
    "id": "f-chhattisgarh-swami-vivekanand-technical-university-89",
    "slug": "chhattisgarh-swami-vivekanand-technical-university",
    "name": "Chhattisgarh Swami Vivekanand Technical University",
    "abbreviation": "CSVTU",
    "city": "Bhilai",
    "state": "Chhattisgarh",
    "location": "Bhilai, Chhattisgarh",
    "type": "GOVERNMENT",
    "established": 2004,
    "annualFees": 60000,
    "rating": 3.4,
    "totalReviews": 8,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#7f1d1d",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1194845,
      "highestPackage": 4457583,
      "medianPackage": 1107867,
      "placementPercent": 82
    }
  },
  {
    "id": "f-gati-shakti-vishwavidyalaya-90",
    "slug": "gati-shakti-vishwavidyalaya",
    "name": "Gati Shakti Vishwavidyalaya",
    "abbreviation": "GSV",
    "city": "Vadodara",
    "state": "Gujarat",
    "location": "Vadodara, Gujarat",
    "type": "GOVERNMENT",
    "established": 2022,
    "annualFees": 100000,
    "rating": 3.6,
    "totalReviews": 10,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#0369a1",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1205187,
      "highestPackage": 5356759,
      "medianPackage": 891573,
      "placementPercent": 73
    }
  },
  {
    "id": "f-ghani-khan-choudhury-institute-of-engineering-and-technology-91",
    "slug": "ghani-khan-choudhury-institute-of-engineering-and-technology",
    "name": "Ghani Khan Choudhury Institute of Engineering and Technology",
    "abbreviation": "GKCIET",
    "city": "Malda",
    "state": "West Bengal",
    "location": "Malda, West Bengal",
    "type": "GOVERNMENT",
    "established": 2012,
    "annualFees": 70000,
    "rating": 3.6,
    "totalReviews": 9,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#312e81",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1152584,
      "highestPackage": 4660703,
      "medianPackage": 1074494,
      "placementPercent": 74
    }
  },
  {
    "id": "f-gurukul-kangri-university-92",
    "slug": "gurukul-kangri-university",
    "name": "Gurukul Kangri University",
    "abbreviation": "GKV",
    "city": "Haridwar",
    "state": "Uttarakhand",
    "location": "Haridwar, Uttarakhand",
    "type": "GOVERNMENT",
    "established": 1902,
    "annualFees": 40000,
    "rating": 3.7,
    "totalReviews": 11,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#065f46",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1334058,
      "highestPackage": 4948770,
      "medianPackage": 866140,
      "placementPercent": 81
    }
  },
  {
    "id": "f-indian-institute-of-carpet-technology-bhadohi-93",
    "slug": "indian-institute-of-carpet-technology-bhadohi",
    "name": "Indian Institute of Carpet Technology Bhadohi",
    "abbreviation": "IICT-BHD",
    "city": "Bhadohi",
    "state": "Uttar Pradesh",
    "location": "Bhadohi, Uttar Pradesh",
    "type": "GOVERNMENT",
    "established": 1995,
    "annualFees": 35000,
    "rating": 3.5,
    "totalReviews": 11,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#b45309",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1210912,
      "highestPackage": 5160355,
      "medianPackage": 860979,
      "placementPercent": 83
    }
  },
  {
    "id": "f-indian-institute-of-handloom-technology-salem-94",
    "slug": "indian-institute-of-handloom-technology-salem",
    "name": "Indian Institute of Handloom Technology Salem",
    "abbreviation": "IIHT-SAL",
    "city": "Salem",
    "state": "Tamil Nadu",
    "location": "Salem, Tamil Nadu",
    "type": "GOVERNMENT",
    "established": 1956,
    "annualFees": 20000,
    "rating": 3.4,
    "totalReviews": 5,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#15803d",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1271503,
      "highestPackage": 4743710,
      "medianPackage": 1130109,
      "placementPercent": 82
    }
  },
  {
    "id": "f-indian-institute-of-handloom-technology-varanasi-95",
    "slug": "indian-institute-of-handloom-technology-varanasi",
    "name": "Indian Institute of Handloom Technology Varanasi",
    "abbreviation": "IIHT-VNS",
    "city": "Varanasi",
    "state": "Uttar Pradesh",
    "location": "Varanasi, Uttar Pradesh",
    "type": "GOVERNMENT",
    "established": 1952,
    "annualFees": 20000,
    "rating": 3.4,
    "totalReviews": 11,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#a16207",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1050495,
      "highestPackage": 4863573,
      "medianPackage": 961011,
      "placementPercent": 73
    }
  },
  {
    "id": "f-ict-mumbai-odisha-campus-bhubaneswar-96",
    "slug": "ict-mumbai-odisha-campus-bhubaneswar",
    "name": "ICT Mumbai Odisha Campus Bhubaneswar",
    "abbreviation": "ICT-OD",
    "city": "Bhubaneswar",
    "state": "Odisha",
    "location": "Bhubaneswar, Odisha",
    "type": "GOVERNMENT",
    "established": 2021,
    "annualFees": 120000,
    "rating": 3.7,
    "totalReviews": 9,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#dc2626",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1190323,
      "highestPackage": 4477617,
      "medianPackage": 967963,
      "placementPercent": 85
    }
  },
  {
    "id": "f-institute-of-engineering-and-technology-dr-hari-singh-gour-university-97",
    "slug": "institute-of-engineering-and-technology-dr-hari-singh-gour-university",
    "name": "Institute of Engineering and Technology Dr Hari Singh Gour University",
    "abbreviation": "IET-SAGAR",
    "city": "Sagar",
    "state": "Madhya Pradesh",
    "location": "Sagar, Madhya Pradesh",
    "type": "GOVERNMENT",
    "established": 1946,
    "annualFees": 50000,
    "rating": 3.6,
    "totalReviews": 3,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#1d4ed8",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1199625,
      "highestPackage": 3634635,
      "medianPackage": 1199325,
      "placementPercent": 76
    }
  },
  {
    "id": "f-institute-of-infrastructure-technology-research-and-management-98",
    "slug": "institute-of-infrastructure-technology-research-and-management",
    "name": "Institute of Infrastructure Technology Research and Management",
    "abbreviation": "IITRAM",
    "city": "Ahmedabad",
    "state": "Gujarat",
    "location": "Ahmedabad, Gujarat",
    "type": "GOVERNMENT",
    "established": 2013,
    "annualFees": 100000,
    "rating": 3.8,
    "totalReviews": 3,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#0891b2",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1010050,
      "highestPackage": 4541110,
      "medianPackage": 809051,
      "placementPercent": 74
    }
  },
  {
    "id": "f-institute-of-technology-guru-ghasidas-vishwavidyalaya-99",
    "slug": "institute-of-technology-guru-ghasidas-vishwavidyalaya",
    "name": "Institute of Technology Guru Ghasidas Vishwavidyalaya",
    "abbreviation": "IT-GGV",
    "city": "Bilaspur",
    "state": "Chhattisgarh",
    "location": "Bilaspur, Chhattisgarh",
    "type": "GOVERNMENT",
    "established": 1983,
    "annualFees": 45000,
    "rating": 3.6,
    "totalReviews": 10,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#7c2d12",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1444677,
      "highestPackage": 5449361,
      "medianPackage": 1179936,
      "placementPercent": 76
    }
  },
  {
    "id": "f-iiit-bhubaneswar-100",
    "slug": "iiit-bhubaneswar",
    "name": "IIIT Bhubaneswar",
    "abbreviation": "IIITBBSR",
    "city": "Bhubaneswar",
    "state": "Odisha",
    "location": "Bhubaneswar, Odisha",
    "type": "GOVERNMENT",
    "established": 2006,
    "annualFees": 250000,
    "rating": 4,
    "totalReviews": 5,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#9333ea",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1226845,
      "highestPackage": 3906363,
      "medianPackage": 1161747,
      "placementPercent": 79
    }
  },
  {
    "id": "f-dr-shyama-prasad-mukherjee-international-institute-of-information-technology-naya-raipur-101",
    "slug": "dr-shyama-prasad-mukherjee-international-institute-of-information-technology-naya-raipur",
    "name": "Dr Shyama Prasad Mukherjee International Institute of Information Technology Naya Raipur",
    "abbreviation": "IIITNR-G",
    "city": "Naya Raipur",
    "state": "Chhattisgarh",
    "location": "Naya Raipur, Chhattisgarh",
    "type": "GOVERNMENT",
    "established": 2016,
    "annualFees": 170000,
    "rating": 3.9,
    "totalReviews": 8,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#6d28d9",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1060298,
      "highestPackage": 3440346,
      "medianPackage": 1084090,
      "placementPercent": 82
    }
  },
  {
    "id": "f-islamic-university-of-science-and-technology-102",
    "slug": "islamic-university-of-science-and-technology",
    "name": "Islamic University of Science and Technology",
    "abbreviation": "IUST",
    "city": "Pulwama",
    "state": "Jammu and Kashmir",
    "location": "Pulwama, Jammu and Kashmir",
    "type": "GOVERNMENT",
    "established": 2005,
    "annualFees": 50000,
    "rating": 3.5,
    "totalReviews": 4,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#1e3a5f",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1421586,
      "highestPackage": 3804601,
      "medianPackage": 964527,
      "placementPercent": 73
    }
  },
  {
    "id": "f-jk-institute-of-applied-physics-and-technology-allahabad-103",
    "slug": "jk-institute-of-applied-physics-and-technology-allahabad",
    "name": "JK Institute of Applied Physics and Technology Allahabad",
    "abbreviation": "JKIAP",
    "city": "Allahabad",
    "state": "Uttar Pradesh",
    "location": "Allahabad, Uttar Pradesh",
    "type": "GOVERNMENT",
    "established": 1964,
    "annualFees": 40000,
    "rating": 3.6,
    "totalReviews": 10,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#374151",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1224288,
      "highestPackage": 3926435,
      "medianPackage": 1154143,
      "placementPercent": 86
    }
  },
  {
    "id": "f-jawaharlal-nehru-university-104",
    "slug": "jawaharlal-nehru-university",
    "name": "Jawaharlal Nehru University",
    "abbreviation": "JNU",
    "city": "New Delhi",
    "state": "Delhi",
    "location": "New Delhi, Delhi",
    "type": "GOVERNMENT",
    "established": 1969,
    "annualFees": 25000,
    "rating": 4.3,
    "totalReviews": 8,
    "nirf": 38,
    "gradientFrom": "#111827",
    "gradientTo": "#1d4ed8",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1403865,
      "highestPackage": 3046445,
      "medianPackage": 868561,
      "placementPercent": 74
    }
  },
  {
    "id": "f-mizoram-university-105",
    "slug": "mizoram-university",
    "name": "Mizoram University",
    "abbreviation": "MZU",
    "city": "Aizawl",
    "state": "Mizoram",
    "location": "Aizawl, Mizoram",
    "type": "GOVERNMENT",
    "established": 2001,
    "annualFees": 20000,
    "rating": 3.5,
    "totalReviews": 11,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#134e4a",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1239455,
      "highestPackage": 3836521,
      "medianPackage": 876301,
      "placementPercent": 77
    }
  },
  {
    "id": "f-national-institute-of-advanced-manufacturing-technology-106",
    "slug": "national-institute-of-advanced-manufacturing-technology",
    "name": "National Institute of Advanced Manufacturing Technology",
    "abbreviation": "NIAMT",
    "city": "Ranchi",
    "state": "Jharkhand",
    "location": "Ranchi, Jharkhand",
    "type": "GOVERNMENT",
    "established": 1966,
    "annualFees": 120000,
    "rating": 3.9,
    "totalReviews": 6,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#b45309",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1314680,
      "highestPackage": 4257285,
      "medianPackage": 1080738,
      "placementPercent": 78
    }
  },
  {
    "id": "f-nielit-chhatrapati-sambhaji-nagar-107",
    "slug": "nielit-chhatrapati-sambhaji-nagar",
    "name": "NIELIT Chhatrapati Sambhaji Nagar",
    "abbreviation": "NIELIT-CSN",
    "city": "Chhatrapati Sambhaji Nagar",
    "state": "Maharashtra",
    "location": "Chhatrapati Sambhaji Nagar, Maharashtra",
    "type": "GOVERNMENT",
    "established": 1994,
    "annualFees": 80000,
    "rating": 3.5,
    "totalReviews": 7,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#9a3412",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1388180,
      "highestPackage": 3136910,
      "medianPackage": 1186108,
      "placementPercent": 77
    }
  },
  {
    "id": "f-nielit-ajmer-108",
    "slug": "nielit-ajmer",
    "name": "NIELIT Ajmer",
    "abbreviation": "NIELIT-AJ",
    "city": "Ajmer",
    "state": "Rajasthan",
    "location": "Ajmer, Rajasthan",
    "type": "GOVERNMENT",
    "established": 1994,
    "annualFees": 80000,
    "rating": 3.5,
    "totalReviews": 10,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#854d0e",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1204213,
      "highestPackage": 3587649,
      "medianPackage": 1039291,
      "placementPercent": 88
    }
  },
  {
    "id": "f-nielit-gorakhpur-109",
    "slug": "nielit-gorakhpur",
    "name": "NIELIT Gorakhpur",
    "abbreviation": "NIELIT-GKP",
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "location": "Gorakhpur, Uttar Pradesh",
    "type": "GOVERNMENT",
    "established": 1994,
    "annualFees": 80000,
    "rating": 3.5,
    "totalReviews": 9,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#312e81",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1010783,
      "highestPackage": 5149053,
      "medianPackage": 929722,
      "placementPercent": 74
    }
  },
  {
    "id": "f-nielit-patna-110",
    "slug": "nielit-patna",
    "name": "NIELIT Patna",
    "abbreviation": "NIELIT-PAT",
    "city": "Patna",
    "state": "Bihar",
    "location": "Patna, Bihar",
    "type": "GOVERNMENT",
    "established": 1994,
    "annualFees": 80000,
    "rating": 3.5,
    "totalReviews": 8,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#7c2d12",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1401613,
      "highestPackage": 4336599,
      "medianPackage": 921127,
      "placementPercent": 71
    }
  },
  {
    "id": "f-nielit-ropar-111",
    "slug": "nielit-ropar",
    "name": "NIELIT Ropar",
    "abbreviation": "NIELIT-RPR",
    "city": "Ropar",
    "state": "Punjab",
    "location": "Ropar, Punjab",
    "type": "GOVERNMENT",
    "established": 1994,
    "annualFees": 80000,
    "rating": 3.5,
    "totalReviews": 11,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#4f46e5",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1305736,
      "highestPackage": 4893172,
      "medianPackage": 834393,
      "placementPercent": 73
    }
  },
  {
    "id": "f-national-institute-of-food-technology-entrepreneurship-and-management-sonepat-112",
    "slug": "national-institute-of-food-technology-entrepreneurship-and-management-sonepat",
    "name": "National Institute of Food Technology Entrepreneurship and Management Sonepat",
    "abbreviation": "NIFTEM-S",
    "city": "Sonepat",
    "state": "Haryana",
    "location": "Sonepat, Haryana",
    "type": "GOVERNMENT",
    "established": 2012,
    "annualFees": 90000,
    "rating": 3.7,
    "totalReviews": 10,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#166534",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1359492,
      "highestPackage": 4387646,
      "medianPackage": 974180,
      "placementPercent": 81
    }
  },
  {
    "id": "f-national-institute-of-food-technology-entrepreneurship-and-management-thanjavur-113",
    "slug": "national-institute-of-food-technology-entrepreneurship-and-management-thanjavur",
    "name": "National Institute of Food Technology Entrepreneurship and Management Thanjavur",
    "abbreviation": "NIFTEM-T",
    "city": "Thanjavur",
    "state": "Tamil Nadu",
    "location": "Thanjavur, Tamil Nadu",
    "type": "GOVERNMENT",
    "established": 2012,
    "annualFees": 90000,
    "rating": 3.7,
    "totalReviews": 3,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#065f46",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1288977,
      "highestPackage": 5478459,
      "medianPackage": 983395,
      "placementPercent": 75
    }
  },
  {
    "id": "f-nerist-itanagar-114",
    "slug": "nerist-itanagar",
    "name": "NERIST Itanagar",
    "abbreviation": "NERIST",
    "city": "Itanagar",
    "state": "Arunachal Pradesh",
    "location": "Itanagar, Arunachal Pradesh",
    "type": "GOVERNMENT",
    "established": 1984,
    "annualFees": 55000,
    "rating": 3.7,
    "totalReviews": 12,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#1c1917",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1426961,
      "highestPackage": 4850237,
      "medianPackage": 1038406,
      "placementPercent": 71
    }
  },
  {
    "id": "f-north-eastern-hill-university-115",
    "slug": "north-eastern-hill-university",
    "name": "North Eastern Hill University",
    "abbreviation": "NEHU",
    "city": "Shillong",
    "state": "Meghalaya",
    "location": "Shillong, Meghalaya",
    "type": "GOVERNMENT",
    "established": 1973,
    "annualFees": 20000,
    "rating": 3.6,
    "totalReviews": 5,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#064e3b",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1399191,
      "highestPackage": 4509718,
      "medianPackage": 1001275,
      "placementPercent": 80
    }
  },
  {
    "id": "f-puducherry-technological-university-116",
    "slug": "puducherry-technological-university",
    "name": "Puducherry Technological University",
    "abbreviation": "PTU",
    "city": "Puducherry",
    "state": "Puducherry",
    "location": "Puducherry, Puducherry",
    "type": "GOVERNMENT",
    "established": 1986,
    "annualFees": 75000,
    "rating": 3.7,
    "totalReviews": 11,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#0891b2",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1012734,
      "highestPackage": 3513299,
      "medianPackage": 869912,
      "placementPercent": 89
    }
  },
  {
    "id": "f-punjab-engineering-college-117",
    "slug": "punjab-engineering-college",
    "name": "Punjab Engineering College",
    "abbreviation": "PEC",
    "city": "Chandigarh",
    "state": "Chandigarh",
    "location": "Chandigarh, Chandigarh",
    "type": "GOVERNMENT",
    "established": 1921,
    "annualFees": 175000,
    "rating": 4.3,
    "totalReviews": 11,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#7c3aed",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1209251,
      "highestPackage": 4302524,
      "medianPackage": 928206,
      "placementPercent": 87
    }
  },
  {
    "id": "f-rajiv-gandhi-national-aviation-university-118",
    "slug": "rajiv-gandhi-national-aviation-university",
    "name": "Rajiv Gandhi National Aviation University",
    "abbreviation": "RGNAU",
    "city": "Fursatganj",
    "state": "Uttar Pradesh",
    "location": "Fursatganj, Uttar Pradesh",
    "type": "GOVERNMENT",
    "established": 2013,
    "annualFees": 90000,
    "rating": 3.6,
    "totalReviews": 8,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#0ea5e9",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1379024,
      "highestPackage": 4417598,
      "medianPackage": 1079219,
      "placementPercent": 79
    }
  },
  {
    "id": "f-sant-longowal-institute-of-engineering-and-technology-119",
    "slug": "sant-longowal-institute-of-engineering-and-technology",
    "name": "Sant Longowal Institute of Engineering and Technology",
    "abbreviation": "SLIET",
    "city": "Longowal",
    "state": "Punjab",
    "location": "Longowal, Punjab",
    "type": "GOVERNMENT",
    "established": 1989,
    "annualFees": 115000,
    "rating": 3.9,
    "totalReviews": 5,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#9f1239",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1291843,
      "highestPackage": 4343876,
      "medianPackage": 1186898,
      "placementPercent": 87
    }
  },
  {
    "id": "f-school-of-engineering-tezpur-university-120",
    "slug": "school-of-engineering-tezpur-university",
    "name": "School of Engineering Tezpur University",
    "abbreviation": "TEZU-ENG",
    "city": "Tezpur",
    "state": "Assam",
    "location": "Tezpur, Assam",
    "type": "GOVERNMENT",
    "established": 1994,
    "annualFees": 85000,
    "rating": 4,
    "totalReviews": 12,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#065f46",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1006759,
      "highestPackage": 5136437,
      "medianPackage": 1164545,
      "placementPercent": 76
    }
  },
  {
    "id": "f-school-of-planning-and-architecture-bhopal-121",
    "slug": "school-of-planning-and-architecture-bhopal",
    "name": "School of Planning and Architecture Bhopal",
    "abbreviation": "SPA-BHO",
    "city": "Bhopal",
    "state": "Madhya Pradesh",
    "location": "Bhopal, Madhya Pradesh",
    "type": "GOVERNMENT",
    "established": 2008,
    "annualFees": 50000,
    "rating": 3.8,
    "totalReviews": 5,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#a16207",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1393464,
      "highestPackage": 4976910,
      "medianPackage": 818959,
      "placementPercent": 70
    }
  },
  {
    "id": "f-school-of-planning-and-architecture-new-delhi-122",
    "slug": "school-of-planning-and-architecture-new-delhi",
    "name": "School of Planning and Architecture New Delhi",
    "abbreviation": "SPA-ND",
    "city": "New Delhi",
    "state": "Delhi",
    "location": "New Delhi, Delhi",
    "type": "GOVERNMENT",
    "established": 1955,
    "annualFees": 50000,
    "rating": 4.1,
    "totalReviews": 10,
    "nirf": 82,
    "gradientFrom": "#0b1120",
    "gradientTo": "#1d4ed8",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1112982,
      "highestPackage": 4287433,
      "medianPackage": 891999,
      "placementPercent": 71
    }
  },
  {
    "id": "f-school-of-planning-and-architecture-vijayawada-123",
    "slug": "school-of-planning-and-architecture-vijayawada",
    "name": "School of Planning and Architecture Vijayawada",
    "abbreviation": "SPA-VJW",
    "city": "Vijayawada",
    "state": "Andhra Pradesh",
    "location": "Vijayawada, Andhra Pradesh",
    "type": "GOVERNMENT",
    "established": 2008,
    "annualFees": 50000,
    "rating": 3.7,
    "totalReviews": 7,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#0f766e",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1099277,
      "highestPackage": 5394883,
      "medianPackage": 891030,
      "placementPercent": 74
    }
  },
  {
    "id": "f-shri-gs-institute-of-technology-and-science-124",
    "slug": "shri-gs-institute-of-technology-and-science",
    "name": "Shri GS Institute of Technology and Science",
    "abbreviation": "SGSITS",
    "city": "Indore",
    "state": "Madhya Pradesh",
    "location": "Indore, Madhya Pradesh",
    "type": "GOVERNMENT",
    "established": 1952,
    "annualFees": 110000,
    "rating": 4,
    "totalReviews": 3,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#7c2d12",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1080964,
      "highestPackage": 3295239,
      "medianPackage": 1155313,
      "placementPercent": 73
    }
  },
  {
    "id": "f-shri-mata-vaishno-devi-university-125",
    "slug": "shri-mata-vaishno-devi-university",
    "name": "Shri Mata Vaishno Devi University",
    "abbreviation": "SMVDU",
    "city": "Katra",
    "state": "Jammu and Kashmir",
    "location": "Katra, Jammu and Kashmir",
    "type": "GOVERNMENT",
    "established": 1999,
    "annualFees": 140000,
    "rating": 4,
    "totalReviews": 10,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#0284c7",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1431418,
      "highestPackage": 3523441,
      "medianPackage": 1157038,
      "placementPercent": 86
    }
  },
  {
    "id": "f-university-of-hyderabad-126",
    "slug": "university-of-hyderabad",
    "name": "University of Hyderabad",
    "abbreviation": "UOH",
    "city": "Hyderabad",
    "state": "Telangana",
    "location": "Hyderabad, Telangana",
    "type": "GOVERNMENT",
    "established": 1974,
    "annualFees": 20000,
    "rating": 4.3,
    "totalReviews": 5,
    "nirf": 66,
    "gradientFrom": "#0f172a",
    "gradientTo": "#4338ca",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1095477,
      "highestPackage": 3975518,
      "medianPackage": 1138503,
      "placementPercent": 72
    }
  },
  {
    "id": "f-jadavpur-university-127",
    "slug": "jadavpur-university",
    "name": "Jadavpur University",
    "abbreviation": "JU",
    "city": "Kolkata",
    "state": "West Bengal",
    "location": "Kolkata, West Bengal",
    "type": "GOVERNMENT",
    "established": 1955,
    "annualFees": 10000,
    "rating": 4.6,
    "totalReviews": 8,
    "nirf": 11,
    "gradientFrom": "#111827",
    "gradientTo": "#1d4ed8",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1229296,
      "highestPackage": 4182444,
      "medianPackage": 859182,
      "placementPercent": 80
    }
  },
  {
    "id": "f-delhi-technological-university-128",
    "slug": "delhi-technological-university",
    "name": "Delhi Technological University",
    "abbreviation": "DTU",
    "city": "New Delhi",
    "state": "Delhi",
    "location": "New Delhi, Delhi",
    "type": "GOVERNMENT",
    "established": 1941,
    "annualFees": 210000,
    "rating": 4.4,
    "totalReviews": 4,
    "nirf": 29,
    "gradientFrom": "#0f172a",
    "gradientTo": "#0f766e",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1429862,
      "highestPackage": 4887104,
      "medianPackage": 1095585,
      "placementPercent": 83
    }
  },
  {
    "id": "f-netaji-subhas-university-of-technology-129",
    "slug": "netaji-subhas-university-of-technology",
    "name": "Netaji Subhas University of Technology",
    "abbreviation": "NSUT",
    "city": "New Delhi",
    "state": "Delhi",
    "location": "New Delhi, Delhi",
    "type": "GOVERNMENT",
    "established": 1983,
    "annualFees": 210000,
    "rating": 4.3,
    "totalReviews": 11,
    "nirf": 45,
    "gradientFrom": "#1f2937",
    "gradientTo": "#b91c1c",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1253641,
      "highestPackage": 4804419,
      "medianPackage": 1028378,
      "placementPercent": 71
    }
  },
  {
    "id": "f-iiest-shibpur-130",
    "slug": "iiest-shibpur",
    "name": "IIEST Shibpur",
    "abbreviation": "IIEST",
    "city": "Howrah",
    "state": "West Bengal",
    "location": "Howrah, West Bengal",
    "type": "GOVERNMENT",
    "established": 1856,
    "annualFees": 140000,
    "rating": 4.3,
    "totalReviews": 7,
    "nirf": 39,
    "gradientFrom": "#111827",
    "gradientTo": "#065f46",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1046917,
      "highestPackage": 3631703,
      "medianPackage": 1006111,
      "placementPercent": 88
    }
  },
  {
    "id": "f-ict-mumbai-131",
    "slug": "ict-mumbai",
    "name": "ICT Mumbai",
    "abbreviation": "ICTM",
    "city": "Mumbai",
    "state": "Maharashtra",
    "location": "Mumbai, Maharashtra",
    "type": "AUTONOMOUS",
    "established": 1933,
    "annualFees": 175000,
    "rating": 4.4,
    "totalReviews": 5,
    "nirf": 37,
    "gradientFrom": "#0b1120",
    "gradientTo": "#c2410c",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1281398,
      "highestPackage": 4599050,
      "medianPackage": 1191473,
      "placementPercent": 77
    }
  },
  {
    "id": "f-college-of-engineering-pune-132",
    "slug": "college-of-engineering-pune",
    "name": "College of Engineering Pune",
    "abbreviation": "COEP",
    "city": "Pune",
    "state": "Maharashtra",
    "location": "Pune, Maharashtra",
    "type": "AUTONOMOUS",
    "established": 1854,
    "annualFees": 90000,
    "rating": 4.4,
    "totalReviews": 10,
    "nirf": 54,
    "gradientFrom": "#0b1120",
    "gradientTo": "#be185d",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1152004,
      "highestPackage": 3675234,
      "medianPackage": 1198750,
      "placementPercent": 76
    }
  },
  {
    "id": "f-vjti-mumbai-133",
    "slug": "vjti-mumbai",
    "name": "VJTI Mumbai",
    "abbreviation": "VJTI",
    "city": "Mumbai",
    "state": "Maharashtra",
    "location": "Mumbai, Maharashtra",
    "type": "AUTONOMOUS",
    "established": 1887,
    "annualFees": 85000,
    "rating": 4.4,
    "totalReviews": 4,
    "nirf": 66,
    "gradientFrom": "#171717",
    "gradientTo": "#7e22ce",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1310489,
      "highestPackage": 3158835,
      "medianPackage": 969035,
      "placementPercent": 78
    }
  },
  {
    "id": "f-anna-university-134",
    "slug": "anna-university",
    "name": "Anna University",
    "abbreviation": "AU",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "location": "Chennai, Tamil Nadu",
    "type": "GOVERNMENT",
    "established": 1978,
    "annualFees": 65000,
    "rating": 4.4,
    "totalReviews": 7,
    "nirf": 26,
    "gradientFrom": "#111827",
    "gradientTo": "#0891b2",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1449890,
      "highestPackage": 4889379,
      "medianPackage": 1007399,
      "placementPercent": 73
    }
  },
  {
    "id": "f-psg-college-of-technology-135",
    "slug": "psg-college-of-technology",
    "name": "PSG College of Technology",
    "abbreviation": "PSGCT",
    "city": "Coimbatore",
    "state": "Tamil Nadu",
    "location": "Coimbatore, Tamil Nadu",
    "type": "AUTONOMOUS",
    "established": 1951,
    "annualFees": 190000,
    "rating": 4.3,
    "totalReviews": 9,
    "nirf": 63,
    "gradientFrom": "#082f49",
    "gradientTo": "#164e63",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1446938,
      "highestPackage": 3130485,
      "medianPackage": 1157208,
      "placementPercent": 83
    }
  },
  {
    "id": "f-rv-college-of-engineering-136",
    "slug": "rv-college-of-engineering",
    "name": "RV College of Engineering",
    "abbreviation": "RVCE",
    "city": "Bengaluru",
    "state": "Karnataka",
    "location": "Bengaluru, Karnataka",
    "type": "AUTONOMOUS",
    "established": 1963,
    "annualFees": 280000,
    "rating": 4.3,
    "totalReviews": 4,
    "nirf": 76,
    "gradientFrom": "#111827",
    "gradientTo": "#c2410c",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1184992,
      "highestPackage": 5077041,
      "medianPackage": 822576,
      "placementPercent": 82
    }
  },
  {
    "id": "f-bms-college-of-engineering-137",
    "slug": "bms-college-of-engineering",
    "name": "BMS College of Engineering",
    "abbreviation": "BMSCE",
    "city": "Bengaluru",
    "state": "Karnataka",
    "location": "Bengaluru, Karnataka",
    "type": "AUTONOMOUS",
    "established": 1946,
    "annualFees": 260000,
    "rating": 4.2,
    "totalReviews": 9,
    "nirf": 82,
    "gradientFrom": "#0f172a",
    "gradientTo": "#4338ca",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1207778,
      "highestPackage": 3840706,
      "medianPackage": 1054810,
      "placementPercent": 86
    }
  },
  {
    "id": "f-ms-ramaiah-institute-of-technology-138",
    "slug": "ms-ramaiah-institute-of-technology",
    "name": "MS Ramaiah Institute of Technology",
    "abbreviation": "MSRIT",
    "city": "Bengaluru",
    "state": "Karnataka",
    "location": "Bengaluru, Karnataka",
    "type": "AUTONOMOUS",
    "established": 1962,
    "annualFees": 270000,
    "rating": 4.2,
    "totalReviews": 6,
    "nirf": 78,
    "gradientFrom": "#1f2937",
    "gradientTo": "#9333ea",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1207391,
      "highestPackage": 4614242,
      "medianPackage": 1186045,
      "placementPercent": 73
    }
  },
  {
    "id": "f-pes-university-139",
    "slug": "pes-university",
    "name": "PES University",
    "abbreviation": "PESU",
    "city": "Bengaluru",
    "state": "Karnataka",
    "location": "Bengaluru, Karnataka",
    "type": "PRIVATE",
    "established": 1988,
    "annualFees": 360000,
    "rating": 4.2,
    "totalReviews": 4,
    "nirf": 88,
    "gradientFrom": "#111827",
    "gradientTo": "#16a34a",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1376410,
      "highestPackage": 3313139,
      "medianPackage": 962440,
      "placementPercent": 88
    }
  },
  {
    "id": "f-isi-kolkata-140",
    "slug": "isi-kolkata",
    "name": "ISI Kolkata",
    "abbreviation": "ISI",
    "city": "Kolkata",
    "state": "West Bengal",
    "location": "Kolkata, West Bengal",
    "type": "GOVERNMENT",
    "established": 1931,
    "annualFees": 15000,
    "rating": 4.7,
    "totalReviews": 3,
    "nirf": 14,
    "gradientFrom": "#111827",
    "gradientTo": "#0284c7",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1146086,
      "highestPackage": 3715085,
      "medianPackage": 829356,
      "placementPercent": 80
    }
  },
  {
    "id": "f-osmania-university-college-of-engineering-141",
    "slug": "osmania-university-college-of-engineering",
    "name": "Osmania University College of Engineering",
    "abbreviation": "OUCE",
    "city": "Hyderabad",
    "state": "Telangana",
    "location": "Hyderabad, Telangana",
    "type": "GOVERNMENT",
    "established": 1929,
    "annualFees": 25000,
    "rating": 4.1,
    "totalReviews": 7,
    "nirf": 96,
    "gradientFrom": "#0f172a",
    "gradientTo": "#a16207",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1018287,
      "highestPackage": 4705278,
      "medianPackage": 1009490,
      "placementPercent": 87
    }
  },
  {
    "id": "f-daiict-gandhinagar-142",
    "slug": "daiict-gandhinagar",
    "name": "DAIICT Gandhinagar",
    "abbreviation": "DAIICT",
    "city": "Gandhinagar",
    "state": "Gujarat",
    "location": "Gandhinagar, Gujarat",
    "type": "AUTONOMOUS",
    "established": 2001,
    "annualFees": 320000,
    "rating": 4.3,
    "totalReviews": 11,
    "nirf": 67,
    "gradientFrom": "#111827",
    "gradientTo": "#0f766e",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1396865,
      "highestPackage": 3697279,
      "medianPackage": 932364,
      "placementPercent": 82
    }
  },
  {
    "id": "f-bits-pilani-143",
    "slug": "bits-pilani",
    "name": "BITS Pilani",
    "abbreviation": "BITSP",
    "city": "Pilani",
    "state": "Rajasthan",
    "location": "Pilani, Rajasthan",
    "type": "PRIVATE",
    "established": 1964,
    "annualFees": 540000,
    "rating": 4.7,
    "totalReviews": 4,
    "nirf": 20,
    "gradientFrom": "#1f2937",
    "gradientTo": "#7c2d12",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1469742,
      "highestPackage": 3085664,
      "medianPackage": 1191939,
      "placementPercent": 77
    }
  },
  {
    "id": "f-bits-goa-144",
    "slug": "bits-goa",
    "name": "BITS Goa",
    "abbreviation": "BITSG",
    "city": "Sancoale",
    "state": "Goa",
    "location": "Sancoale, Goa",
    "type": "PRIVATE",
    "established": 2004,
    "annualFees": 540000,
    "rating": 4.6,
    "totalReviews": 5,
    "nirf": null,
    "gradientFrom": "#09090b",
    "gradientTo": "#0f766e",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1173825,
      "highestPackage": 5173403,
      "medianPackage": 1093485,
      "placementPercent": 74
    }
  },
  {
    "id": "f-bits-hyderabad-145",
    "slug": "bits-hyderabad",
    "name": "BITS Hyderabad",
    "abbreviation": "BITSH",
    "city": "Hyderabad",
    "state": "Telangana",
    "location": "Hyderabad, Telangana",
    "type": "PRIVATE",
    "established": 2008,
    "annualFees": 540000,
    "rating": 4.6,
    "totalReviews": 5,
    "nirf": null,
    "gradientFrom": "#171717",
    "gradientTo": "#be185d",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1466196,
      "highestPackage": 4530776,
      "medianPackage": 1050262,
      "placementPercent": 88
    }
  },
  {
    "id": "f-vit-vellore-146",
    "slug": "vit-vellore",
    "name": "VIT Vellore",
    "abbreviation": "VIT",
    "city": "Vellore",
    "state": "Tamil Nadu",
    "location": "Vellore, Tamil Nadu",
    "type": "PRIVATE",
    "established": 1984,
    "annualFees": 420000,
    "rating": 4.2,
    "totalReviews": 9,
    "nirf": 8,
    "gradientFrom": "#111827",
    "gradientTo": "#ea580c",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1162678,
      "highestPackage": 3194798,
      "medianPackage": 891507,
      "placementPercent": 71
    }
  },
  {
    "id": "f-vit-chennai-147",
    "slug": "vit-chennai",
    "name": "VIT Chennai",
    "abbreviation": "VITC",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "location": "Chennai, Tamil Nadu",
    "type": "PRIVATE",
    "established": 2010,
    "annualFees": 430000,
    "rating": 4.1,
    "totalReviews": 8,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#dc2626",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1252495,
      "highestPackage": 5156402,
      "medianPackage": 991423,
      "placementPercent": 78
    }
  },
  {
    "id": "f-vit-bhopal-148",
    "slug": "vit-bhopal",
    "name": "VIT Bhopal",
    "abbreviation": "VITB",
    "city": "Bhopal",
    "state": "Madhya Pradesh",
    "location": "Bhopal, Madhya Pradesh",
    "type": "PRIVATE",
    "established": 2017,
    "annualFees": 410000,
    "rating": 3.9,
    "totalReviews": 8,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#7c3aed",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1168772,
      "highestPackage": 3894754,
      "medianPackage": 1129237,
      "placementPercent": 78
    }
  },
  {
    "id": "f-vit-andhra-pradesh-149",
    "slug": "vit-andhra-pradesh",
    "name": "VIT Andhra Pradesh",
    "abbreviation": "VITAP",
    "city": "Amaravati",
    "state": "Andhra Pradesh",
    "location": "Amaravati, Andhra Pradesh",
    "type": "PRIVATE",
    "established": 2017,
    "annualFees": 420000,
    "rating": 4,
    "totalReviews": 10,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#0369a1",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1074859,
      "highestPackage": 3561509,
      "medianPackage": 875319,
      "placementPercent": 80
    }
  },
  {
    "id": "f-srm-institute-of-science-and-technology-150",
    "slug": "srm-institute-of-science-and-technology",
    "name": "SRM Institute of Science and Technology",
    "abbreviation": "SRM",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "location": "Chennai, Tamil Nadu",
    "type": "DEEMED",
    "established": 1985,
    "annualFees": 450000,
    "rating": 4,
    "totalReviews": 3,
    "nirf": 13,
    "gradientFrom": "#111827",
    "gradientTo": "#9a3412",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1305622,
      "highestPackage": 3972653,
      "medianPackage": 1191729,
      "placementPercent": 72
    }
  },
  {
    "id": "f-srm-university-ap-151",
    "slug": "srm-university-ap",
    "name": "SRM University AP",
    "abbreviation": "SRMAP",
    "city": "Amaravati",
    "state": "Andhra Pradesh",
    "location": "Amaravati, Andhra Pradesh",
    "type": "PRIVATE",
    "established": 2017,
    "annualFees": 350000,
    "rating": 4,
    "totalReviews": 10,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#b91c1c",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1491857,
      "highestPackage": 4411376,
      "medianPackage": 1002205,
      "placementPercent": 70
    }
  },
  {
    "id": "f-manipal-institute-of-technology-152",
    "slug": "manipal-institute-of-technology",
    "name": "Manipal Institute of Technology",
    "abbreviation": "MIT",
    "city": "Manipal",
    "state": "Karnataka",
    "location": "Manipal, Karnataka",
    "type": "PRIVATE",
    "established": 1957,
    "annualFees": 430000,
    "rating": 4.2,
    "totalReviews": 9,
    "nirf": 61,
    "gradientFrom": "#0f172a",
    "gradientTo": "#0369a1",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1254166,
      "highestPackage": 5173757,
      "medianPackage": 851751,
      "placementPercent": 89
    }
  },
  {
    "id": "f-thapar-institute-of-engineering-and-technology-153",
    "slug": "thapar-institute-of-engineering-and-technology",
    "name": "Thapar Institute of Engineering and Technology",
    "abbreviation": "TIET",
    "city": "Patiala",
    "state": "Punjab",
    "location": "Patiala, Punjab",
    "type": "DEEMED",
    "established": 1956,
    "annualFees": 450000,
    "rating": 4.2,
    "totalReviews": 5,
    "nirf": 24,
    "gradientFrom": "#0b1120",
    "gradientTo": "#86198f",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1036232,
      "highestPackage": 3331569,
      "medianPackage": 1086209,
      "placementPercent": 73
    }
  },
  {
    "id": "f-kiit-university-154",
    "slug": "kiit-university",
    "name": "KIIT University",
    "abbreviation": "KIIT",
    "city": "Bhubaneswar",
    "state": "Odisha",
    "location": "Bhubaneswar, Odisha",
    "type": "DEEMED",
    "established": 1992,
    "annualFees": 420000,
    "rating": 4,
    "totalReviews": 8,
    "nirf": 39,
    "gradientFrom": "#18181b",
    "gradientTo": "#16a34a",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1244980,
      "highestPackage": 3129749,
      "medianPackage": 1166891,
      "placementPercent": 82
    }
  },
  {
    "id": "f-amrita-vishwa-vidyapeetham-155",
    "slug": "amrita-vishwa-vidyapeetham",
    "name": "Amrita Vishwa Vidyapeetham",
    "abbreviation": "AMRITA",
    "city": "Coimbatore",
    "state": "Tamil Nadu",
    "location": "Coimbatore, Tamil Nadu",
    "type": "DEEMED",
    "established": 1994,
    "annualFees": 380000,
    "rating": 4.2,
    "totalReviews": 4,
    "nirf": 36,
    "gradientFrom": "#111827",
    "gradientTo": "#d97706",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1330326,
      "highestPackage": 3186694,
      "medianPackage": 862821,
      "placementPercent": 81
    }
  },
  {
    "id": "f-shiv-nadar-university-156",
    "slug": "shiv-nadar-university",
    "name": "Shiv Nadar University",
    "abbreviation": "SNU",
    "city": "Greater Noida",
    "state": "Uttar Pradesh",
    "location": "Greater Noida, Uttar Pradesh",
    "type": "PRIVATE",
    "established": 2011,
    "annualFees": 450000,
    "rating": 4.3,
    "totalReviews": 3,
    "nirf": 62,
    "gradientFrom": "#171717",
    "gradientTo": "#0891b2",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1132550,
      "highestPackage": 4707267,
      "medianPackage": 1069194,
      "placementPercent": 84
    }
  },
  {
    "id": "f-sastra-university-157",
    "slug": "sastra-university",
    "name": "Sastra University",
    "abbreviation": "SASTRA",
    "city": "Thanjavur",
    "state": "Tamil Nadu",
    "location": "Thanjavur, Tamil Nadu",
    "type": "DEEMED",
    "established": 1984,
    "annualFees": 180000,
    "rating": 4.1,
    "totalReviews": 5,
    "nirf": 34,
    "gradientFrom": "#0f172a",
    "gradientTo": "#65a30d",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1250570,
      "highestPackage": 3270553,
      "medianPackage": 847900,
      "placementPercent": 83
    }
  },
  {
    "id": "f-siksha-o-anusandhan-university-158",
    "slug": "siksha-o-anusandhan-university",
    "name": "Siksha O Anusandhan University",
    "abbreviation": "SOA",
    "city": "Bhubaneswar",
    "state": "Odisha",
    "location": "Bhubaneswar, Odisha",
    "type": "DEEMED",
    "established": 2007,
    "annualFees": 300000,
    "rating": 3.9,
    "totalReviews": 8,
    "nirf": 27,
    "gradientFrom": "#09090b",
    "gradientTo": "#dc2626",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1036927,
      "highestPackage": 5354946,
      "medianPackage": 1158457,
      "placementPercent": 87
    }
  },
  {
    "id": "f-nirma-university-159",
    "slug": "nirma-university",
    "name": "Nirma University",
    "abbreviation": "NIRMA",
    "city": "Ahmedabad",
    "state": "Gujarat",
    "location": "Ahmedabad, Gujarat",
    "type": "DEEMED",
    "established": 2003,
    "annualFees": 260000,
    "rating": 4.2,
    "totalReviews": 5,
    "nirf": 55,
    "gradientFrom": "#0f172a",
    "gradientTo": "#0ea5e9",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1135430,
      "highestPackage": 3380739,
      "medianPackage": 1091591,
      "placementPercent": 80
    }
  },
  {
    "id": "f-lovely-professional-university-160",
    "slug": "lovely-professional-university",
    "name": "Lovely Professional University",
    "abbreviation": "LPU",
    "city": "Phagwara",
    "state": "Punjab",
    "location": "Phagwara, Punjab",
    "type": "PRIVATE",
    "established": 2005,
    "annualFees": 350000,
    "rating": 3.9,
    "totalReviews": 6,
    "nirf": 32,
    "gradientFrom": "#0f172a",
    "gradientTo": "#b45309",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1396105,
      "highestPackage": 4423790,
      "medianPackage": 1035235,
      "placementPercent": 80
    }
  },
  {
    "id": "f-chandigarh-university-161",
    "slug": "chandigarh-university",
    "name": "Chandigarh University",
    "abbreviation": "CU",
    "city": "Mohali",
    "state": "Punjab",
    "location": "Mohali, Punjab",
    "type": "PRIVATE",
    "established": 2012,
    "annualFees": 450000,
    "rating": 4.1,
    "totalReviews": 11,
    "nirf": 27,
    "gradientFrom": "#0f172a",
    "gradientTo": "#7c2d12",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1006767,
      "highestPackage": 3938283,
      "medianPackage": 988924,
      "placementPercent": 78
    }
  },
  {
    "id": "f-amity-university-162",
    "slug": "amity-university",
    "name": "Amity University",
    "abbreviation": "AMITY",
    "city": "Noida",
    "state": "Uttar Pradesh",
    "location": "Noida, Uttar Pradesh",
    "type": "PRIVATE",
    "established": 2005,
    "annualFees": 380000,
    "rating": 3.8,
    "totalReviews": 3,
    "nirf": 31,
    "gradientFrom": "#1f2937",
    "gradientTo": "#ca8a04",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1208734,
      "highestPackage": 5224086,
      "medianPackage": 851392,
      "placementPercent": 79
    }
  },
  {
    "id": "f-symbiosis-institute-of-technology-163",
    "slug": "symbiosis-institute-of-technology",
    "name": "Symbiosis Institute of Technology",
    "abbreviation": "SIT",
    "city": "Pune",
    "state": "Maharashtra",
    "location": "Pune, Maharashtra",
    "type": "DEEMED",
    "established": 2008,
    "annualFees": 390000,
    "rating": 4,
    "totalReviews": 12,
    "nirf": 84,
    "gradientFrom": "#111827",
    "gradientTo": "#0891b2",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1275301,
      "highestPackage": 5404751,
      "medianPackage": 1189140,
      "placementPercent": 71
    }
  },
  {
    "id": "f-chitkara-university-164",
    "slug": "chitkara-university",
    "name": "Chitkara University",
    "abbreviation": "CHITKARA",
    "city": "Rajpura",
    "state": "Punjab",
    "location": "Rajpura, Punjab",
    "type": "PRIVATE",
    "established": 2002,
    "annualFees": 340000,
    "rating": 4,
    "totalReviews": 6,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#7e22ce",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1416248,
      "highestPackage": 3195943,
      "medianPackage": 1145990,
      "placementPercent": 71
    }
  },
  {
    "id": "f-graphic-era-university-165",
    "slug": "graphic-era-university",
    "name": "Graphic Era University",
    "abbreviation": "GEU",
    "city": "Dehradun",
    "state": "Uttarakhand",
    "location": "Dehradun, Uttarakhand",
    "type": "DEEMED",
    "established": 1993,
    "annualFees": 290000,
    "rating": 3.9,
    "totalReviews": 8,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#065f46",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1082882,
      "highestPackage": 3139980,
      "medianPackage": 1014284,
      "placementPercent": 84
    }
  },
  {
    "id": "f-bennett-university-166",
    "slug": "bennett-university",
    "name": "Bennett University",
    "abbreviation": "BU",
    "city": "Greater Noida",
    "state": "Uttar Pradesh",
    "location": "Greater Noida, Uttar Pradesh",
    "type": "PRIVATE",
    "established": 2016,
    "annualFees": 390000,
    "rating": 3.9,
    "totalReviews": 5,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#4c1d95",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1348446,
      "highestPackage": 4685524,
      "medianPackage": 1113471,
      "placementPercent": 81
    }
  },
  {
    "id": "f-mahindra-university-167",
    "slug": "mahindra-university",
    "name": "Mahindra University",
    "abbreviation": "MU",
    "city": "Hyderabad",
    "state": "Telangana",
    "location": "Hyderabad, Telangana",
    "type": "PRIVATE",
    "established": 2020,
    "annualFees": 500000,
    "rating": 4.1,
    "totalReviews": 5,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#1d4ed8",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1125163,
      "highestPackage": 5321710,
      "medianPackage": 849486,
      "placementPercent": 82
    }
  },
  {
    "id": "f-woxsen-university-168",
    "slug": "woxsen-university",
    "name": "Woxsen University",
    "abbreviation": "WOXSEN",
    "city": "Hyderabad",
    "state": "Telangana",
    "location": "Hyderabad, Telangana",
    "type": "PRIVATE",
    "established": 2020,
    "annualFees": 500000,
    "rating": 4,
    "totalReviews": 12,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#065f46",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1424972,
      "highestPackage": 3279894,
      "medianPackage": 1126156,
      "placementPercent": 71
    }
  },
  {
    "id": "f-ashoka-university-169",
    "slug": "ashoka-university",
    "name": "Ashoka University",
    "abbreviation": "ASHOKA",
    "city": "Sonepat",
    "state": "Haryana",
    "location": "Sonepat, Haryana",
    "type": "PRIVATE",
    "established": 2014,
    "annualFees": 850000,
    "rating": 4.4,
    "totalReviews": 12,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#b45309",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1301817,
      "highestPackage": 4667606,
      "medianPackage": 858180,
      "placementPercent": 85
    }
  },
  {
    "id": "f-plaksha-university-170",
    "slug": "plaksha-university",
    "name": "Plaksha University",
    "abbreviation": "PLAKSHA",
    "city": "Mohali",
    "state": "Punjab",
    "location": "Mohali, Punjab",
    "type": "PRIVATE",
    "established": 2022,
    "annualFees": 950000,
    "rating": 4.2,
    "totalReviews": 9,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#065f46",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1176075,
      "highestPackage": 4564369,
      "medianPackage": 975176,
      "placementPercent": 71
    }
  },
  {
    "id": "f-krea-university-171",
    "slug": "krea-university",
    "name": "Krea University",
    "abbreviation": "KREA",
    "city": "Sri City",
    "state": "Andhra Pradesh",
    "location": "Sri City, Andhra Pradesh",
    "type": "PRIVATE",
    "established": 2018,
    "annualFees": 700000,
    "rating": 4.1,
    "totalReviews": 5,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#7c2d12",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1412698,
      "highestPackage": 4980813,
      "medianPackage": 856598,
      "placementPercent": 80
    }
  },
  {
    "id": "f-kalasalingam-academy-of-research-and-education-172",
    "slug": "kalasalingam-academy-of-research-and-education",
    "name": "Kalasalingam Academy of Research and Education",
    "abbreviation": "KARE",
    "city": "Krishnankoil",
    "state": "Tamil Nadu",
    "location": "Krishnankoil, Tamil Nadu",
    "type": "DEEMED",
    "established": 1984,
    "annualFees": 180000,
    "rating": 3.9,
    "totalReviews": 10,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#15803d",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1489527,
      "highestPackage": 3050110,
      "medianPackage": 818144,
      "placementPercent": 74
    }
  },
  {
    "id": "f-vel-tech-rangarajan-dr-sagunthala-institute-173",
    "slug": "vel-tech-rangarajan-dr-sagunthala-institute",
    "name": "Vel Tech Rangarajan Dr Sagunthala Institute",
    "abbreviation": "VELTECH",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "location": "Chennai, Tamil Nadu",
    "type": "DEEMED",
    "established": 1997,
    "annualFees": 210000,
    "rating": 3.9,
    "totalReviews": 3,
    "nirf": null,
    "gradientFrom": "#0f172a",
    "gradientTo": "#0891b2",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1372000,
      "highestPackage": 3306457,
      "medianPackage": 957348,
      "placementPercent": 80
    }
  },
  {
    "id": "f-karunya-institute-of-technology-174",
    "slug": "karunya-institute-of-technology",
    "name": "Karunya Institute of Technology",
    "abbreviation": "KARUNYA",
    "city": "Coimbatore",
    "state": "Tamil Nadu",
    "location": "Coimbatore, Tamil Nadu",
    "type": "DEEMED",
    "established": 1986,
    "annualFees": 195000,
    "rating": 4,
    "totalReviews": 11,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#7c2d12",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1166019,
      "highestPackage": 3245719,
      "medianPackage": 801393,
      "placementPercent": 70
    }
  },
  {
    "id": "f-koneru-lakshmaiah-education-foundation-175",
    "slug": "koneru-lakshmaiah-education-foundation",
    "name": "Koneru Lakshmaiah Education Foundation",
    "abbreviation": "KLEF",
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "location": "Guntur, Andhra Pradesh",
    "type": "DEEMED",
    "established": 1980,
    "annualFees": 200000,
    "rating": 4,
    "totalReviews": 7,
    "nirf": null,
    "gradientFrom": "#0b1120",
    "gradientTo": "#b45309",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1229148,
      "highestPackage": 5126494,
      "medianPackage": 1008273,
      "placementPercent": 80
    }
  },
  {
    "id": "f-presidency-university-bengaluru-176",
    "slug": "presidency-university-bengaluru",
    "name": "Presidency University Bengaluru",
    "abbreviation": "PRESI",
    "city": "Bengaluru",
    "state": "Karnataka",
    "location": "Bengaluru, Karnataka",
    "type": "PRIVATE",
    "established": 2013,
    "annualFees": 320000,
    "rating": 3.8,
    "totalReviews": 11,
    "nirf": null,
    "gradientFrom": "#111827",
    "gradientTo": "#c2410c",
    "courses": [
      {
        "name": "Computer Science and Engineering",
        "degree": "B.Tech"
      },
      {
        "name": "Electronics and Communication",
        "degree": "B.Tech"
      },
      {
        "name": "Mechanical Engineering",
        "degree": "B.Tech"
      }
    ],
    "placements": {
      "avgPackage": 1434118,
      "highestPackage": 4481513,
      "medianPackage": 1115616,
      "placementPercent": 83
    }
  }
];

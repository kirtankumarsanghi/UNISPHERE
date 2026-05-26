/**
 * Realistic cutoff data based on publicly available JoSAA 2023-2024 trends.
 * category multipliers approximate the ratio of reserved category closing ranks
 * to general category closing ranks for that college type.
 */

export type CutoffEntry = {
  collegeSlug: string;
  exam: string;
  courseName: string;
  closingRankGeneral: number;
};

/** Multiplier applied to general closing rank for reserved categories */
export const categoryMultipliers: Record<string, number> = {
  General: 1.0,
  OBC: 1.35,
  SC: 2.8,
  ST: 3.5,
  EWS: 1.15,
  "PwD": 4.0,
};

/** Convert JEE Main percentile to approximate rank (out of ~12 lakh candidates) */
export function percentileToRank(percentile: number): number {
  if (percentile >= 100) return 1;
  if (percentile <= 0) return 1200000;
  return Math.round(((100 - percentile) / 100) * 1200000);
}

/** Static cutoff data for top colleges */
export const cutoffData: CutoffEntry[] = [
  // IIT Bombay — JEE Advanced
  { collegeSlug: "iit-bombay", exam: "JEE Advanced", courseName: "Computer Science and Engineering", closingRankGeneral: 66 },
  { collegeSlug: "iit-bombay", exam: "JEE Advanced", courseName: "Electronics and Communication", closingRankGeneral: 265 },
  { collegeSlug: "iit-bombay", exam: "JEE Advanced", courseName: "Electrical Engineering", closingRankGeneral: 494 },
  { collegeSlug: "iit-bombay", exam: "JEE Advanced", courseName: "Mechanical Engineering", closingRankGeneral: 1150 },

  // IIT Delhi
  { collegeSlug: "iit-delhi", exam: "JEE Advanced", courseName: "Computer Science and Engineering", closingRankGeneral: 95 },
  { collegeSlug: "iit-delhi", exam: "JEE Advanced", courseName: "Electronics and Communication", closingRankGeneral: 550 },
  { collegeSlug: "iit-delhi", exam: "JEE Advanced", courseName: "Electrical Engineering", closingRankGeneral: 950 },
  { collegeSlug: "iit-delhi", exam: "JEE Advanced", courseName: "Mechanical Engineering", closingRankGeneral: 2100 },

  // IIT Madras
  { collegeSlug: "iit-madras", exam: "JEE Advanced", courseName: "Computer Science and Engineering", closingRankGeneral: 120 },
  { collegeSlug: "iit-madras", exam: "JEE Advanced", courseName: "Electronics and Communication", closingRankGeneral: 680 },
  { collegeSlug: "iit-madras", exam: "JEE Advanced", courseName: "Data Science", closingRankGeneral: 310 },
  { collegeSlug: "iit-madras", exam: "JEE Advanced", courseName: "Mechanical Engineering", closingRankGeneral: 2400 },

  // IIT Kanpur
  { collegeSlug: "iit-kanpur", exam: "JEE Advanced", courseName: "Computer Science and Engineering", closingRankGeneral: 200 },
  { collegeSlug: "iit-kanpur", exam: "JEE Advanced", courseName: "Electronics and Communication", closingRankGeneral: 870 },
  { collegeSlug: "iit-kanpur", exam: "JEE Advanced", courseName: "Electrical Engineering", closingRankGeneral: 1350 },

  // IIT Kharagpur
  { collegeSlug: "iit-kharagpur", exam: "JEE Advanced", courseName: "Computer Science and Engineering", closingRankGeneral: 230 },
  { collegeSlug: "iit-kharagpur", exam: "JEE Advanced", courseName: "Electronics and Communication", closingRankGeneral: 1100 },
  { collegeSlug: "iit-kharagpur", exam: "JEE Advanced", courseName: "Mechanical Engineering", closingRankGeneral: 2600 },

  // IIT Roorkee
  { collegeSlug: "iit-roorkee", exam: "JEE Advanced", courseName: "Computer Science and Engineering", closingRankGeneral: 650 },
  { collegeSlug: "iit-roorkee", exam: "JEE Advanced", courseName: "Electronics and Communication", closingRankGeneral: 2200 },
  { collegeSlug: "iit-roorkee", exam: "JEE Advanced", courseName: "Civil Engineering", closingRankGeneral: 4800 },

  // IIT Guwahati
  { collegeSlug: "iit-guwahati", exam: "JEE Advanced", courseName: "Computer Science and Engineering", closingRankGeneral: 850 },
  { collegeSlug: "iit-guwahati", exam: "JEE Advanced", courseName: "Electronics and Communication", closingRankGeneral: 2800 },

  // IIT Hyderabad
  { collegeSlug: "iit-hyderabad", exam: "JEE Advanced", courseName: "Computer Science and Engineering", closingRankGeneral: 700 },
  { collegeSlug: "iit-hyderabad", exam: "JEE Advanced", courseName: "Electronics and Communication", closingRankGeneral: 2500 },

  // NIT Trichy — JEE Main
  { collegeSlug: "nit-trichy", exam: "JEE Main", courseName: "Computer Science and Engineering", closingRankGeneral: 3500 },
  { collegeSlug: "nit-trichy", exam: "JEE Main", courseName: "Electronics and Communication", closingRankGeneral: 8200 },
  { collegeSlug: "nit-trichy", exam: "JEE Main", courseName: "Mechanical Engineering", closingRankGeneral: 18000 },

  // NIT Surathkal
  { collegeSlug: "nit-surathkal", exam: "JEE Main", courseName: "Computer Science and Engineering", closingRankGeneral: 4200 },
  { collegeSlug: "nit-surathkal", exam: "JEE Main", courseName: "Electronics and Communication", closingRankGeneral: 9500 },

  // NIT Warangal
  { collegeSlug: "nit-warangal", exam: "JEE Main", courseName: "Computer Science and Engineering", closingRankGeneral: 5100 },
  { collegeSlug: "nit-warangal", exam: "JEE Main", courseName: "Electronics and Communication", closingRankGeneral: 11000 },

  // BITS Pilani — BITSAT
  { collegeSlug: "bits-pilani", exam: "BITSAT", courseName: "Computer Science and Engineering", closingRankGeneral: 350 },
  { collegeSlug: "bits-pilani", exam: "BITSAT", courseName: "Electronics and Communication", closingRankGeneral: 800 },
  { collegeSlug: "bits-pilani", exam: "BITSAT", courseName: "Mechanical Engineering", closingRankGeneral: 2000 },

  // IIIT Hyderabad
  { collegeSlug: "iiit-hyderabad", exam: "JEE Main", courseName: "Computer Science and Engineering", closingRankGeneral: 2500 },
  { collegeSlug: "iiit-hyderabad", exam: "JEE Main", courseName: "Electronics and Communication", closingRankGeneral: 6000 },

  // IIIT Delhi
  { collegeSlug: "iiit-delhi", exam: "JEE Main", courseName: "Computer Science and Engineering", closingRankGeneral: 6500 },
  { collegeSlug: "iiit-delhi", exam: "JEE Main", courseName: "Electronics and Communication", closingRankGeneral: 14000 },

  // DTU
  { collegeSlug: "delhi-technological-university", exam: "JEE Main", courseName: "Computer Science and Engineering", closingRankGeneral: 5500 },
  { collegeSlug: "delhi-technological-university", exam: "JEE Main", courseName: "Electronics and Communication", closingRankGeneral: 13000 },

  // VIT Vellore
  { collegeSlug: "vit-vellore", exam: "JEE Main", courseName: "Computer Science and Engineering", closingRankGeneral: 25000 },
  { collegeSlug: "vit-vellore", exam: "JEE Main", courseName: "Electronics and Communication", closingRankGeneral: 45000 },

  // SRM
  { collegeSlug: "srm-university", exam: "JEE Main", courseName: "Computer Science and Engineering", closingRankGeneral: 35000 },
  { collegeSlug: "srm-university", exam: "JEE Main", courseName: "Electronics and Communication", closingRankGeneral: 60000 },
];

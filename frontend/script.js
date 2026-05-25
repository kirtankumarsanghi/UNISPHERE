const fs = require("fs");

const CollegeType = { IIT: "IIT", NIT: "NIT", IIIT: "IIIT", GOVERNMENT: "GOVERNMENT", PRIVATE: "PRIVATE", DEEMED: "DEEMED", AUTONOMOUS: "AUTONOMOUS" };

const colleges = [
  ["IIT Madras", "IITM", "Chennai", "Tamil Nadu", CollegeType.IIT, 1959, 212000, 4.9, 1, "#0b1120", "#1d4ed8"],
  ["IIT Delhi", "IITD", "New Delhi", "Delhi", CollegeType.IIT, 1961, 225000, 4.9, 2, "#111827", "#4c1d95"],
  ["IIT Bombay", "IITB", "Mumbai", "Maharashtra", CollegeType.IIT, 1958, 220000, 4.9, 3, "#0f172a", "#3730a3"],
  ["IIT Kanpur", "IITK", "Kanpur", "Uttar Pradesh", CollegeType.IIT, 1959, 215000, 4.8, 4, "#171717", "#991b1b"],
  ["IIT Kharagpur", "IITKGP", "Kharagpur", "West Bengal", CollegeType.IIT, 1951, 210000, 4.7, 5, "#1f2937", "#065f46"],
  ["IIT Roorkee", "IITR", "Roorkee", "Uttarakhand", CollegeType.IIT, 1847, 210000, 4.7, 6, "#0f172a", "#0f766e"],
  ["IIT Hyderabad", "IITH", "Hyderabad", "Telangana", CollegeType.IIT, 2008, 220000, 4.6, 7, "#18181b", "#5b21b6"],
  ["IIT Guwahati", "IITG", "Guwahati", "Assam", CollegeType.IIT, 1994, 215000, 4.6, 8, "#111827", "#0369a1"],
  ["IIT Indore", "IITI", "Indore", "Madhya Pradesh", CollegeType.IIT, 2009, 215000, 4.5, 9, "#0f172a", "#3f6212"],
  ["IIT Varanasi BHU", "IITBHU", "Varanasi", "Uttar Pradesh", CollegeType.IIT, 1919, 215000, 4.6, 10, "#1f2937", "#b45309"],
  ["IIT Tirupati", "IITTP", "Tirupati", "Andhra Pradesh", CollegeType.IIT, 2015, 210000, 4.2, 11, "#111827", "#0ea5e9"],
  ["IIT Bhubaneswar", "IITBBS", "Bhubaneswar", "Odisha", CollegeType.IIT, 2008, 215000, 4.3, 13, "#0b1120", "#7c3aed"],
  ["IIT Dhanbad ISM", "IITISM", "Dhanbad", "Jharkhand", CollegeType.IIT, 1926, 210000, 4.4, 17, "#111827", "#86198f"],
  ["IIT Gandhinagar", "IITGN", "Gandhinagar", "Gujarat", CollegeType.IIT, 2008, 220000, 4.5, 18, "#09090b", "#9d174d"],
  ["IIT Mandi", "IITMANDI", "Mandi", "Himachal Pradesh", CollegeType.IIT, 2009, 210000, 4.2, 19, "#111827", "#0c4a6e"],
  ["IIT Patna", "IITP", "Patna", "Bihar", CollegeType.IIT, 2008, 215000, 4.3, 25, "#111827", "#312e81"],
  ["IIT Ropar", "IITRPR", "Rupnagar", "Punjab", CollegeType.IIT, 2008, 215000, 4.4, 22, "#171717", "#064e3b"],
  ["IIT Jodhpur", "IITJ", "Jodhpur", "Rajasthan", CollegeType.IIT, 2008, 220000, 4.3, 30, "#0f172a", "#854d0e"],
  ["IIT Palakkad", "IITPKD", "Palakkad", "Kerala", CollegeType.IIT, 2015, 210000, 4.1, 33, "#111827", "#134e4a"],
  ["IIT Dharwad", "IITDH", "Dharwad", "Karnataka", CollegeType.IIT, 2016, 210000, 4.0, 50, "#0f172a", "#701a75"],
  ["IIT Bhilai", "IITBH", "Bhilai", "Chhattisgarh", CollegeType.IIT, 2016, 210000, 4.0, 55, "#111827", "#7f1d1d"],
  ["IIT Jammu", "IITJMU", "Jammu", "Jammu and Kashmir", CollegeType.IIT, 2016, 210000, 4.0, 57, "#0b1120", "#1c1917"],
  ["IIT Goa", "IITGOA", "Goa", "Goa", CollegeType.IIT, 2016, 210000, 4.0, 60, "#111827", "#052e16"],
  ["NIT Tiruchirappalli", "NITT", "Tiruchirappalli", "Tamil Nadu", CollegeType.NIT, 1964, 165000, 4.6, 12, "#111827", "#0f766e"],
  ["NIT Surathkal", "NITK", "Surathkal", "Karnataka", CollegeType.NIT, 1960, 150000, 4.5, 16, "#0b1120", "#b91c1c"],
  ["NIT Warangal", "NITW", "Warangal", "Telangana", CollegeType.NIT, 1959, 150000, 4.6, 20, "#18181b", "#b45309"],
  ["NIT Rourkela", "NITR", "Rourkela", "Odisha", CollegeType.NIT, 1961, 155000, 4.5, 21, "#0f172a", "#1d4ed8"],
  ["NIT Calicut", "NITC", "Kozhikode", "Kerala", CollegeType.NIT, 1961, 155000, 4.4, 23, "#111827", "#4338ca"],
  ["MNNIT Allahabad", "MNNIT", "Prayagraj", "Uttar Pradesh", CollegeType.NIT, 1961, 155000, 4.4, 28, "#171717", "#0369a1"],
  ["VNIT Nagpur", "VNIT", "Nagpur", "Maharashtra", CollegeType.NIT, 1960, 150000, 4.3, 31, "#0f172a", "#15803d"],
  ["MNIT Jaipur", "MNIT", "Jaipur", "Rajasthan", CollegeType.NIT, 1963, 145000, 4.4, 35, "#1f2937", "#9f1239"],
  ["NIT Durgapur", "NITDGP", "Durgapur", "West Bengal", CollegeType.NIT, 1960, 150000, 4.2, 38, "#111827", "#6d28d9"],
  ["NIT Silchar", "NITS", "Silchar", "Assam", CollegeType.NIT, 1967, 140000, 4.1, 40, "#1f2937", "#a21caf"],
  ["NIT Kurukshetra", "NITKKR", "Kurukshetra", "Haryana", CollegeType.NIT, 1963, 155000, 4.2, 42, "#09090b", "#7c2d12"],
  ["SVNIT Surat", "SVNIT", "Surat", "Gujarat", CollegeType.NIT, 1961, 145000, 4.2, 44, "#0b1120", "#047857"],
  ["NIT Jalandhar", "NITJ", "Jalandhar", "Punjab", CollegeType.NIT, 1987, 140000, 4.1, 46, "#111827", "#4f46e5"],
  ["MANIT Bhopal", "MANIT", "Bhopal", "Madhya Pradesh", CollegeType.NIT, 1960, 145000, 4.1, 48, "#0f172a", "#c2410c"],
  ["NIT Hamirpur", "NITH", "Hamirpur", "Himachal Pradesh", CollegeType.NIT, 1986, 145000, 4.0, 52, "#111827", "#6b21a8"],
  ["NIT Agartala", "NITA", "Agartala", "Tripura", CollegeType.NIT, 1965, 135000, 4.0, 56, "#0f172a", "#1e3a5f"],
  ["NIT Jamshedpur", "NITJSR", "Jamshedpur", "Jharkhand", CollegeType.NIT, 1960, 140000, 4.0, 59, "#111827", "#374151"],
  ["NIT Srinagar", "NITSRI", "Srinagar", "Jammu and Kashmir", CollegeType.NIT, 1960, 130000, 3.9, 62, "#0f172a", "#1e3a8a"],
  ["NIT Patna", "NITP", "Patna", "Bihar", CollegeType.NIT, 1886, 140000, 4.0, 65, "#111827", "#7c2d12"],
  ["NIT Raipur", "NITRR", "Raipur", "Chhattisgarh", CollegeType.NIT, 1956, 140000, 3.9, 68, "#0b1120", "#15803d"],
  ["NIT Puducherry", "NITPY", "Karaikal", "Puducherry", CollegeType.NIT, 2009, 130000, 3.8, 75, "#111827", "#0891b2"],
  ["NIT Goa", "NITGOA", "Farmagudi", "Goa", CollegeType.NIT, 2010, 130000, 3.8, 78, "#0f172a", "#166534"],
  ["NIT Manipur", "NITM", "Imphal", "Manipur", CollegeType.NIT, 2010, 125000, 3.7, 85, "#111827", "#7e22ce"],
  ["NIT Meghalaya", "NITMGH", "Shillong", "Meghalaya", CollegeType.NIT, 2010, 125000, 3.7, 87, "#0f172a", "#064e3b"],
  ["NIT Mizoram", "NITMZO", "Aizawl", "Mizoram", CollegeType.NIT, 2010, 120000, 3.7, 90, "#111827", "#374151"],
  ["NIT Nagaland", "NITN", "Dimapur", "Nagaland", CollegeType.NIT, 2010, 120000, 3.6, 93, "#0b1120", "#1f2937"],
  ["NIT Sikkim", "NITSKM", "Ravangla", "Sikkim", CollegeType.NIT, 2010, 120000, 3.6, 95, "#111827", "#164e63"],
  ["NIT Arunachal Pradesh", "NITAP", "Yupia", "Arunachal Pradesh", CollegeType.NIT, 2010, 120000, 3.6, 98, "#0f172a", "#1c1917"],
  ["NIT Andhra Pradesh", "NITANP", "Tadepalligudem", "Andhra Pradesh", CollegeType.NIT, 2015, 125000, 3.7, 0, "#111827", "#1d4ed8"],
  ["NIT Uttarakhand", "NITUK", "Srinagar Garhwal", "Uttarakhand", CollegeType.NIT, 2009, 125000, 3.7, 0, "#0f172a", "#134e4a"],
  ["NIT Delhi", "NITDL", "New Delhi", "Delhi", CollegeType.NIT, 2010, 135000, 4.0, 72, "#111827", "#1e1b4b"],
  ["IIIT Hyderabad", "IIITH", "Hyderabad", "Telangana", CollegeType.IIIT, 1998, 420000, 4.7, 47, "#111827", "#065f46"],
  ["IIIT Bangalore", "IIITB", "Bengaluru", "Karnataka", CollegeType.IIIT, 1999, 440000, 4.6, 50, "#0f172a", "#0284c7"],
  ["IIIT Delhi", "IIITD", "New Delhi", "Delhi", CollegeType.IIIT, 2008, 450000, 4.5, 53, "#171717", "#dc2626"],
  ["IIIT Allahabad", "IIITA", "Prayagraj", "Uttar Pradesh", CollegeType.IIIT, 1999, 185000, 4.5, 58, "#0b1120", "#9333ea"],
  ["IIITM Gwalior", "ABV-IIITM", "Gwalior", "Madhya Pradesh", CollegeType.IIIT, 1997, 190000, 4.3, 63, "#18181b", "#ea580c"],
  ["IIITDM Kancheepuram", "IIITDMK", "Chennai", "Tamil Nadu", CollegeType.IIIT, 2007, 150000, 4.2, 70, "#09090b", "#65a30d"],
  ["IIITDM Jabalpur", "IIITDMJ", "Jabalpur", "Madhya Pradesh", CollegeType.IIIT, 2005, 160000, 4.2, 80, "#0f172a", "#854d0e"],
  ["IIIT Pune", "IIITP", "Pune", "Maharashtra", CollegeType.IIIT, 2016, 250000, 4.1, 0, "#111827", "#0891b2"],
  ["IIIT Lucknow", "IIITL", "Lucknow", "Uttar Pradesh", CollegeType.IIIT, 2015, 260000, 4.3, 0, "#0f172a", "#9f1239"],
  ["IIIT Nagpur", "IIITN", "Nagpur", "Maharashtra", CollegeType.IIIT, 2016, 245000, 4.1, 0, "#111827", "#374151"],
  ["IIIT Naya Raipur", "IIITNR", "Naya Raipur", "Chhattisgarh", CollegeType.IIIT, 2016, 240000, 4.0, 0, "#0f172a", "#064e3b"],
  ["IIIT Bhopal", "IIITBPL", "Bhopal", "Madhya Pradesh", CollegeType.IIIT, 2017, 245000, 4.0, 0, "#111827", "#86198f"],
  ["IIIT Vadodara", "IIITV", "Vadodara", "Gujarat", CollegeType.IIIT, 2013, 235000, 4.1, 0, "#0b1120", "#047857"],
  ["IIIT Bhagalpur", "IIITBGP", "Bhagalpur", "Bihar", CollegeType.IIIT, 2017, 230000, 3.9, 0, "#111827", "#7c2d12"],
  ["IIIT Surat", "IIITSRT", "Surat", "Gujarat", CollegeType.IIIT, 2017, 235000, 3.9, 0, "#0f172a", "#0c4a6e"],
  ["IIIT Agartala", "IIITAGE", "Agartala", "Tripura", CollegeType.IIIT, 2015, 220000, 3.8, 0, "#111827", "#1c1917"],
  ["IIIT Kalyani", "IIITKALYANI", "Kalyani", "West Bengal", CollegeType.IIIT, 2019, 225000, 3.8, 0, "#111827", "#312e81"],
  ["IIIT Kurnool", "IIITKRNL", "Kurnool", "Andhra Pradesh", CollegeType.IIIT, 2015, 230000, 3.9, 0, "#0b1120", "#7c3aed"],
  ["IIIT Manipur", "IIITMAN", "Imphal", "Manipur", CollegeType.IIIT, 2015, 215000, 3.8, 0, "#0f172a", "#6b21a8"],
  ["IIIT Ranchi", "IIITRCHI", "Ranchi", "Jharkhand", CollegeType.IIIT, 2016, 225000, 3.9, 0, "#111827", "#1e3a5f"],
  ["IIIT Sonepat", "IIITSNP", "Sonepat", "Haryana", CollegeType.IIIT, 2015, 220000, 3.9, 0, "#0f172a", "#b45309"],
  ["IIIT Sri City", "IIITSC", "Sri City", "Andhra Pradesh", CollegeType.IIIT, 2013, 300000, 4.0, 0, "#18181b", "#0284c7"],
  ["IIIT Una", "IIITUNA", "Una", "Himachal Pradesh", CollegeType.IIIT, 2014, 220000, 3.9, 0, "#111827", "#134e4a"],
  ["IIIT Tiruchirappalli", "IIITTRY", "Tiruchirappalli", "Tamil Nadu", CollegeType.IIIT, 2013, 235000, 4.0, 0, "#0f172a", "#ea580c"],
  ["IIIT Vadodara ICD Diu", "IIITVD", "Diu", "Dadra and NH", CollegeType.IIIT, 2017, 210000, 3.8, 0, "#111827", "#15803d"],
  ["IIIT Dharwad", "IIITDWD", "Dharwad", "Karnataka", CollegeType.IIIT, 2015, 230000, 3.9, 0, "#0b1120", "#c2410c"],
  ["Assam University Silchar", "AU-SIL", "Silchar", "Assam", CollegeType.GOVERNMENT, 1994, 45000, 3.8, 0, "#111827", "#065f46"],
  ["Birla Institute of Technology Mesra", "BIT-MESRA", "Ranchi", "Jharkhand", CollegeType.GOVERNMENT, 1955, 175000, 4.2, 32, "#0f172a", "#b45309"],
  ["BIT Mesra Deoghar Off Campus", "BIT-DEO", "Deoghar", "Jharkhand", CollegeType.GOVERNMENT, 2013, 175000, 3.7, 0, "#111827", "#7c2d12"],
  ["BIT Mesra Patna Off Campus", "BIT-PAT", "Patna", "Bihar", CollegeType.GOVERNMENT, 2013, 175000, 3.7, 0, "#0b1120", "#1d4ed8"],
  ["Central Institute of Technology Kokrajhar", "CIT-KOK", "Kokrajhar", "Assam", CollegeType.GOVERNMENT, 2006, 75000, 3.7, 0, "#0f172a", "#166534"],
  ["Central University of Haryana", "CUH", "Mahendragarh", "Haryana", CollegeType.GOVERNMENT, 2009, 30000, 3.6, 0, "#111827", "#7e22ce"],
  ["Central University of Jammu", "CUJ", "Jammu", "Jammu and Kashmir", CollegeType.GOVERNMENT, 2011, 30000, 3.5, 0, "#0b1120", "#1e3a5f"],
  ["Central University of Jharkhand", "CUJ-RAN", "Ranchi", "Jharkhand", CollegeType.GOVERNMENT, 2009, 28000, 3.5, 0, "#0f172a", "#374151"],
  ["Central University of Rajasthan", "CURAJ", "Ajmer", "Rajasthan", CollegeType.GOVERNMENT, 2009, 28000, 3.5, 0, "#111827", "#854d0e"],
  ["Chhattisgarh Swami Vivekanand Technical University", "CSVTU", "Bhilai", "Chhattisgarh", CollegeType.GOVERNMENT, 2004, 60000, 3.4, 0, "#0b1120", "#7f1d1d"],
  ["Gati Shakti Vishwavidyalaya", "GSV", "Vadodara", "Gujarat", CollegeType.GOVERNMENT, 2022, 100000, 3.6, 0, "#111827", "#0369a1"],
  ["Ghani Khan Choudhury Institute of Engineering and Technology", "GKCIET", "Malda", "West Bengal", CollegeType.GOVERNMENT, 2012, 70000, 3.6, 0, "#0f172a", "#312e81"],
  ["Gurukul Kangri University", "GKV", "Haridwar", "Uttarakhand", CollegeType.GOVERNMENT, 1902, 40000, 3.7, 0, "#111827", "#065f46"],
  ["Indian Institute of Carpet Technology Bhadohi", "IICT-BHD", "Bhadohi", "Uttar Pradesh", CollegeType.GOVERNMENT, 1995, 35000, 3.5, 0, "#0b1120", "#b45309"],
  ["Indian Institute of Handloom Technology Salem", "IIHT-SAL", "Salem", "Tamil Nadu", CollegeType.GOVERNMENT, 1956, 20000, 3.4, 0, "#0f172a", "#15803d"],
  ["Indian Institute of Handloom Technology Varanasi", "IIHT-VNS", "Varanasi", "Uttar Pradesh", CollegeType.GOVERNMENT, 1952, 20000, 3.4, 0, "#111827", "#a16207"],
  ["ICT Mumbai Odisha Campus Bhubaneswar", "ICT-OD", "Bhubaneswar", "Odisha", CollegeType.GOVERNMENT, 2021, 120000, 3.7, 0, "#0b1120", "#dc2626"],
  ["Institute of Engineering and Technology Dr Hari Singh Gour University", "IET-SAGAR", "Sagar", "Madhya Pradesh", CollegeType.GOVERNMENT, 1946, 50000, 3.6, 0, "#0f172a", "#1d4ed8"],
  ["Institute of Infrastructure Technology Research and Management", "IITRAM", "Ahmedabad", "Gujarat", CollegeType.GOVERNMENT, 2013, 100000, 3.8, 0, "#111827", "#0891b2"],
  ["Institute of Technology Guru Ghasidas Vishwavidyalaya", "IT-GGV", "Bilaspur", "Chhattisgarh", CollegeType.GOVERNMENT, 1983, 45000, 3.6, 0, "#0b1120", "#7c2d12"],
  ["IIIT Bhubaneswar", "IIITBBSR", "Bhubaneswar", "Odisha", CollegeType.GOVERNMENT, 2006, 250000, 4.0, 0, "#0f172a", "#9333ea"],
  ["Dr Shyama Prasad Mukherjee International Institute of Information Technology Naya Raipur", "IIITNR-G", "Naya Raipur", "Chhattisgarh", CollegeType.GOVERNMENT, 2016, 170000, 3.9, 0, "#111827", "#6d28d9"],
  ["Islamic University of Science and Technology", "IUST", "Pulwama", "Jammu and Kashmir", CollegeType.GOVERNMENT, 2005, 50000, 3.5, 0, "#0b1120", "#1e3a5f"],
  ["JK Institute of Applied Physics and Technology Allahabad", "JKIAP", "Allahabad", "Uttar Pradesh", CollegeType.GOVERNMENT, 1964, 40000, 3.6, 0, "#0f172a", "#374151"],
  ["Jawaharlal Nehru University", "JNU", "New Delhi", "Delhi", CollegeType.GOVERNMENT, 1969, 25000, 4.3, 38, "#111827", "#1d4ed8"],
  ["Mizoram University", "MZU", "Aizawl", "Mizoram", CollegeType.GOVERNMENT, 2001, 20000, 3.5, 0, "#0b1120", "#134e4a"],
  ["National Institute of Advanced Manufacturing Technology", "NIAMT", "Ranchi", "Jharkhand", CollegeType.GOVERNMENT, 1966, 120000, 3.9, 0, "#0f172a", "#b45309"],
  ["NIELIT Chhatrapati Sambhaji Nagar", "NIELIT-CSN", "Chhatrapati Sambhaji Nagar", "Maharashtra", CollegeType.GOVERNMENT, 1994, 80000, 3.5, 0, "#111827", "#9a3412"],
  ["NIELIT Ajmer", "NIELIT-AJ", "Ajmer", "Rajasthan", CollegeType.GOVERNMENT, 1994, 80000, 3.5, 0, "#0b1120", "#854d0e"],
  ["NIELIT Gorakhpur", "NIELIT-GKP", "Gorakhpur", "Uttar Pradesh", CollegeType.GOVERNMENT, 1994, 80000, 3.5, 0, "#0f172a", "#312e81"],
  ["NIELIT Patna", "NIELIT-PAT", "Patna", "Bihar", CollegeType.GOVERNMENT, 1994, 80000, 3.5, 0, "#111827", "#7c2d12"],
  ["NIELIT Ropar", "NIELIT-RPR", "Ropar", "Punjab", CollegeType.GOVERNMENT, 1994, 80000, 3.5, 0, "#0b1120", "#4f46e5"],
  ["National Institute of Food Technology Entrepreneurship and Management Sonepat", "NIFTEM-S", "Sonepat", "Haryana", CollegeType.GOVERNMENT, 2012, 90000, 3.7, 0, "#0f172a", "#166534"],
  ["National Institute of Food Technology Entrepreneurship and Management Thanjavur", "NIFTEM-T", "Thanjavur", "Tamil Nadu", CollegeType.GOVERNMENT, 2012, 90000, 3.7, 0, "#111827", "#065f46"],
  ["NERIST Itanagar", "NERIST", "Itanagar", "Arunachal Pradesh", CollegeType.GOVERNMENT, 1984, 55000, 3.7, 0, "#0b1120", "#1c1917"],
  ["North Eastern Hill University", "NEHU", "Shillong", "Meghalaya", CollegeType.GOVERNMENT, 1973, 20000, 3.6, 0, "#0f172a", "#064e3b"],
  ["Puducherry Technological University", "PTU", "Puducherry", "Puducherry", CollegeType.GOVERNMENT, 1986, 75000, 3.7, 0, "#111827", "#0891b2"],
  ["Punjab Engineering College", "PEC", "Chandigarh", "Chandigarh", CollegeType.GOVERNMENT, 1921, 175000, 4.3, 0, "#0f172a", "#7c3aed"],
  ["Rajiv Gandhi National Aviation University", "RGNAU", "Fursatganj", "Uttar Pradesh", CollegeType.GOVERNMENT, 2013, 90000, 3.6, 0, "#111827", "#0ea5e9"],
  ["Sant Longowal Institute of Engineering and Technology", "SLIET", "Longowal", "Punjab", CollegeType.GOVERNMENT, 1989, 115000, 3.9, 0, "#0b1120", "#9f1239"],
  ["School of Engineering Tezpur University", "TEZU-ENG", "Tezpur", "Assam", CollegeType.GOVERNMENT, 1994, 85000, 4.0, 0, "#0f172a", "#065f46"],
  ["School of Planning and Architecture Bhopal", "SPA-BHO", "Bhopal", "Madhya Pradesh", CollegeType.GOVERNMENT, 2008, 50000, 3.8, 0, "#111827", "#a16207"],
  ["School of Planning and Architecture New Delhi", "SPA-ND", "New Delhi", "Delhi", CollegeType.GOVERNMENT, 1955, 50000, 4.1, 82, "#0b1120", "#1d4ed8"],
  ["School of Planning and Architecture Vijayawada", "SPA-VJW", "Vijayawada", "Andhra Pradesh", CollegeType.GOVERNMENT, 2008, 50000, 3.7, 0, "#0f172a", "#0f766e"],
  ["Shri GS Institute of Technology and Science", "SGSITS", "Indore", "Madhya Pradesh", CollegeType.GOVERNMENT, 1952, 110000, 4.0, 0, "#111827", "#7c2d12"],
  ["Shri Mata Vaishno Devi University", "SMVDU", "Katra", "Jammu and Kashmir", CollegeType.GOVERNMENT, 1999, 140000, 4.0, 0, "#0b1120", "#0284c7"],
  ["University of Hyderabad", "UOH", "Hyderabad", "Telangana", CollegeType.GOVERNMENT, 1974, 20000, 4.3, 66, "#0f172a", "#4338ca"],
  ["Jadavpur University", "JU", "Kolkata", "West Bengal", CollegeType.GOVERNMENT, 1955, 10000, 4.6, 11, "#111827", "#1d4ed8"],
  ["Delhi Technological University", "DTU", "New Delhi", "Delhi", CollegeType.GOVERNMENT, 1941, 210000, 4.4, 29, "#0f172a", "#0f766e"],
  ["Netaji Subhas University of Technology", "NSUT", "New Delhi", "Delhi", CollegeType.GOVERNMENT, 1983, 210000, 4.3, 45, "#1f2937", "#b91c1c"],
  ["IIEST Shibpur", "IIEST", "Howrah", "West Bengal", CollegeType.GOVERNMENT, 1856, 140000, 4.3, 39, "#111827", "#065f46"],
  ["ICT Mumbai", "ICTM", "Mumbai", "Maharashtra", CollegeType.AUTONOMOUS, 1933, 175000, 4.4, 37, "#0b1120", "#c2410c"],
  ["College of Engineering Pune", "COEP", "Pune", "Maharashtra", CollegeType.AUTONOMOUS, 1854, 90000, 4.4, 54, "#0b1120", "#be185d"],
  ["VJTI Mumbai", "VJTI", "Mumbai", "Maharashtra", CollegeType.AUTONOMOUS, 1887, 85000, 4.4, 66, "#171717", "#7e22ce"],
  ["Anna University", "AU", "Chennai", "Tamil Nadu", CollegeType.GOVERNMENT, 1978, 65000, 4.4, 26, "#111827", "#0891b2"],
  ["PSG College of Technology", "PSGCT", "Coimbatore", "Tamil Nadu", CollegeType.AUTONOMOUS, 1951, 190000, 4.3, 63, "#082f49", "#164e63"],
  ["RV College of Engineering", "RVCE", "Bengaluru", "Karnataka", CollegeType.AUTONOMOUS, 1963, 280000, 4.3, 76, "#111827", "#c2410c"],
  ["BMS College of Engineering", "BMSCE", "Bengaluru", "Karnataka", CollegeType.AUTONOMOUS, 1946, 260000, 4.2, 82, "#0f172a", "#4338ca"],
  ["MS Ramaiah Institute of Technology", "MSRIT", "Bengaluru", "Karnataka", CollegeType.AUTONOMOUS, 1962, 270000, 4.2, 78, "#1f2937", "#9333ea"],
  ["PES University", "PESU", "Bengaluru", "Karnataka", CollegeType.PRIVATE, 1988, 360000, 4.2, 88, "#111827", "#16a34a"],
  ["ISI Kolkata", "ISI", "Kolkata", "West Bengal", CollegeType.GOVERNMENT, 1931, 15000, 4.7, 14, "#111827", "#0284c7"],
  ["Osmania University College of Engineering", "OUCE", "Hyderabad", "Telangana", CollegeType.GOVERNMENT, 1929, 25000, 4.1, 96, "#0f172a", "#a16207"],
  ["DAIICT Gandhinagar", "DAIICT", "Gandhinagar", "Gujarat", CollegeType.AUTONOMOUS, 2001, 320000, 4.3, 67, "#111827", "#0f766e"],
  ["BITS Pilani", "BITSP", "Pilani", "Rajasthan", CollegeType.PRIVATE, 1964, 540000, 4.7, 20, "#1f2937", "#7c2d12"],
  ["BITS Goa", "BITSG", "Sancoale", "Goa", CollegeType.PRIVATE, 2004, 540000, 4.6, 0, "#09090b", "#0f766e"],
  ["BITS Hyderabad", "BITSH", "Hyderabad", "Telangana", CollegeType.PRIVATE, 2008, 540000, 4.6, 0, "#171717", "#be185d"],
  ["VIT Vellore", "VIT", "Vellore", "Tamil Nadu", CollegeType.PRIVATE, 1984, 420000, 4.2, 8, "#111827", "#ea580c"],
  ["VIT Chennai", "VITC", "Chennai", "Tamil Nadu", CollegeType.PRIVATE, 2010, 430000, 4.1, 0, "#0f172a", "#dc2626"],
  ["VIT Bhopal", "VITB", "Bhopal", "Madhya Pradesh", CollegeType.PRIVATE, 2017, 410000, 3.9, 0, "#111827", "#7c3aed"],
  ["VIT Andhra Pradesh", "VITAP", "Amaravati", "Andhra Pradesh", CollegeType.PRIVATE, 2017, 420000, 4.0, 0, "#0b1120", "#0369a1"],
  ["SRM Institute of Science and Technology", "SRM", "Chennai", "Tamil Nadu", CollegeType.DEEMED, 1985, 450000, 4.0, 13, "#111827", "#9a3412"],
  ["SRM University AP", "SRMAP", "Amaravati", "Andhra Pradesh", CollegeType.PRIVATE, 2017, 350000, 4.0, 0, "#0b1120", "#b91c1c"],
  ["Manipal Institute of Technology", "MIT", "Manipal", "Karnataka", CollegeType.PRIVATE, 1957, 430000, 4.2, 61, "#0f172a", "#0369a1"],
  ["Thapar Institute of Engineering and Technology", "TIET", "Patiala", "Punjab", CollegeType.DEEMED, 1956, 450000, 4.2, 24, "#0b1120", "#86198f"],
  ["KIIT University", "KIIT", "Bhubaneswar", "Odisha", CollegeType.DEEMED, 1992, 420000, 4.0, 39, "#18181b", "#16a34a"],
  ["Amrita Vishwa Vidyapeetham", "AMRITA", "Coimbatore", "Tamil Nadu", CollegeType.DEEMED, 1994, 380000, 4.2, 36, "#111827", "#d97706"],
  ["Shiv Nadar University", "SNU", "Greater Noida", "Uttar Pradesh", CollegeType.PRIVATE, 2011, 450000, 4.3, 62, "#171717", "#0891b2"],
  ["Sastra University", "SASTRA", "Thanjavur", "Tamil Nadu", CollegeType.DEEMED, 1984, 180000, 4.1, 34, "#0f172a", "#65a30d"],
  ["Siksha O Anusandhan University", "SOA", "Bhubaneswar", "Odisha", CollegeType.DEEMED, 2007, 300000, 3.9, 27, "#09090b", "#dc2626"],
  ["Nirma University", "NIRMA", "Ahmedabad", "Gujarat", CollegeType.DEEMED, 2003, 260000, 4.2, 55, "#0f172a", "#0ea5e9"],
  ["Lovely Professional University", "LPU", "Phagwara", "Punjab", CollegeType.PRIVATE, 2005, 350000, 3.9, 32, "#0f172a", "#b45309"],
  ["Chandigarh University", "CU", "Mohali", "Punjab", CollegeType.PRIVATE, 2012, 450000, 4.1, 27, "#0f172a", "#7c2d12"],
  ["Amity University", "AMITY", "Noida", "Uttar Pradesh", CollegeType.PRIVATE, 2005, 380000, 3.8, 31, "#1f2937", "#ca8a04"],
  ["Symbiosis Institute of Technology", "SIT", "Pune", "Maharashtra", CollegeType.DEEMED, 2008, 390000, 4.0, 84, "#111827", "#0891b2"],
  ["Chitkara University", "CHITKARA", "Rajpura", "Punjab", CollegeType.PRIVATE, 2002, 340000, 4.0, 0, "#111827", "#7e22ce"],
  ["Graphic Era University", "GEU", "Dehradun", "Uttarakhand", CollegeType.DEEMED, 1993, 290000, 3.9, 0, "#0f172a", "#065f46"],
  ["Bennett University", "BU", "Greater Noida", "Uttar Pradesh", CollegeType.PRIVATE, 2016, 390000, 3.9, 0, "#0f172a", "#4c1d95"],
  ["Mahindra University", "MU", "Hyderabad", "Telangana", CollegeType.PRIVATE, 2020, 500000, 4.1, 0, "#111827", "#1d4ed8"],
  ["Woxsen University", "WOXSEN", "Hyderabad", "Telangana", CollegeType.PRIVATE, 2020, 500000, 4.0, 0, "#0b1120", "#065f46"],
  ["Ashoka University", "ASHOKA", "Sonepat", "Haryana", CollegeType.PRIVATE, 2014, 850000, 4.4, 0, "#111827", "#b45309"],
  ["Plaksha University", "PLAKSHA", "Mohali", "Punjab", CollegeType.PRIVATE, 2022, 950000, 4.2, 0, "#0b1120", "#065f46"],
  ["Krea University", "KREA", "Sri City", "Andhra Pradesh", CollegeType.PRIVATE, 2018, 700000, 4.1, 0, "#0f172a", "#7c2d12"],
  ["Kalasalingam Academy of Research and Education", "KARE", "Krishnankoil", "Tamil Nadu", CollegeType.DEEMED, 1984, 180000, 3.9, 0, "#0b1120", "#15803d"],
  ["Vel Tech Rangarajan Dr Sagunthala Institute", "VELTECH", "Chennai", "Tamil Nadu", CollegeType.DEEMED, 1997, 210000, 3.9, 0, "#0f172a", "#0891b2"],
  ["Karunya Institute of Technology", "KARUNYA", "Coimbatore", "Tamil Nadu", CollegeType.DEEMED, 1986, 195000, 4.0, 0, "#111827", "#7c2d12"],
  ["Koneru Lakshmaiah Education Foundation", "KLEF", "Guntur", "Andhra Pradesh", CollegeType.DEEMED, 1980, 200000, 4.0, 0, "#0b1120", "#b45309"],
  ["Presidency University Bengaluru", "PRESI", "Bengaluru", "Karnataka", CollegeType.PRIVATE, 2013, 320000, 3.8, 0, "#111827", "#c2410c"]
];

const fallbackColleges = colleges.map((c, idx) => {
  const [name, abbr, city, state, type, est, fees, rat, nrf, gF, gT] = c;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  let avg = 0, high = 0, med = 0, pct = 0;
  const ts = type;
  const numFees = fees;
  if (ts === "IIT") {
    avg = numFees * 7 + Math.random() * 400000;
    high = numFees * 18 + Math.random() * 4000000;
    med = numFees * 6 + Math.random() * 300000;
    pct = 85 + Math.floor(Math.random() * 10);
  } else if (ts === "IIIT") {
    avg = numFees * 3 + Math.random() * 300000;
    high = numFees * 10 + Math.random() * 2000000;
    med = numFees * 2.5 + Math.random() * 250000;
    pct = 80 + Math.floor(Math.random() * 10);
  } else if (ts === "NIT") {
    avg = numFees * 5 + Math.random() * 200000;
    high = numFees * 12 + Math.random() * 1500000;
    med = numFees * 4.5 + Math.random() * 150000;
    pct = 78 + Math.floor(Math.random() * 10);
  } else {
    avg = 1000000 + Math.random() * 500000;
    high = 3000000 + Math.random() * 2500000;
    med = 800000 + Math.random() * 400000;
    pct = 70 + Math.floor(Math.random() * 20);
  }
  
  return {
    id: `f-${slug}-${idx}`,
    slug,
    name: name,
    abbreviation: abbr,
    city: city,
    state: state,
    location: `${city}, ${state}`,
    type: ts,
    established: est,
    annualFees: numFees,
    rating: rat,
    totalReviews: 3 + Math.floor(Math.random() * 10),
    nirf: nrf === 0 ? null : nrf,
    gradientFrom: gF,
    gradientTo: gT,
    courses: [
      { name: "Computer Science and Engineering", degree: "B.Tech" },
      { name: "Electronics and Communication", degree: "B.Tech" },
      { name: "Mechanical Engineering", degree: "B.Tech" }
    ],
    placements: {
      avgPackage: Math.round(avg),
      highestPackage: Math.round(high),
      medianPackage: Math.round(med),
      placementPercent: pct
    }
  };
});

fs.writeFileSync("lib/fallback-colleges.ts", `export type FallbackCollege = {
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

export const fallbackColleges: FallbackCollege[] = ${JSON.stringify(fallbackColleges, null, 2)};
`);

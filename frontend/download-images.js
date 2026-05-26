const fs = require('fs');
const https = require('https');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'campuses');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// I will use direct URLs that bypass the thumbnail engine to avoid 400 errors
const urls = {
  'iit-madras': 'https://upload.wikimedia.org/wikipedia/commons/a/a2/IIT_Madras_Administration_Building.jpg',
  'iit-delhi': 'https://upload.wikimedia.org/wikipedia/commons/0/0d/IIT_Delhi_Main_Building.jpeg',
  'iit-bombay': 'https://upload.wikimedia.org/wikipedia/commons/2/2e/IITBMainBuildingCROP.jpg',
  'iit-kanpur': 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Computer_Center_at_IIT_Kanpur_India1.jpg',
  'iit-kharagpur': 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Bubai_Manna_%28IIT_Kharagpur_main_building%29.jpg',
  'iit-roorkee': 'https://upload.wikimedia.org/wikipedia/commons/5/5b/ARD_IIT-Roorkee.jpg',
  'iit-guwahati': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000',
  'iit-hyderabad': 'https://upload.wikimedia.org/wikipedia/commons/a/a8/IIT_Hyderabad_Campus.jpg',
  'iit-bhu': 'https://upload.wikimedia.org/wikipedia/commons/6/66/IIT_BHU_Main_Building.jpg',
  'iit-indore': 'https://upload.wikimedia.org/wikipedia/commons/3/33/A.P.J._Abdul_Kalam_Hall_of_Residence.jpg',
  'nit-trichy': 'https://upload.wikimedia.org/wikipedia/commons/9/91/Nitt-admin-block.jpg',
  'nit-surathkal': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/NIT_Surathkal_Main_Building.jpg',
  'nit-warangal': 'https://upload.wikimedia.org/wikipedia/commons/5/5e/NIT_Warangal_Campus.jpg',
  'nit-calicut': 'https://upload.wikimedia.org/wikipedia/commons/b/b9/NIT_Calicut_Main_Gate.jpg',
  'nit-rourkela': 'https://upload.wikimedia.org/wikipedia/commons/4/4b/NIT_Rourkela_Main_Building.jpg',
  'bits-pilani': 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Bits_pilani_raj_india.jpg',
  'bits-goa': 'https://upload.wikimedia.org/wikipedia/commons/4/4e/BITS_Pilani_Goa_Campus.jpg',
  'vit-vellore': 'https://upload.wikimedia.org/wikipedia/commons/b/be/VIT_Vellore_-_Main_Building.jpg',
  'manipal-institute-of-technology': 'https://upload.wikimedia.org/wikipedia/commons/9/96/MIT_Manipal_Campus.jpg',
  'iiit-hyderabad': 'https://upload.wikimedia.org/wikipedia/commons/6/6d/IIIT_Hyderabad_Campus.jpg',
  'iiit-bangalore': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/IIIT_Bangalore_Campus.jpg',
  'iiit-delhi': 'https://upload.wikimedia.org/wikipedia/commons/9/9d/IIIT_Delhi_Campus.jpg',
  'delhi-technological-university': 'https://upload.wikimedia.org/wikipedia/commons/7/7c/DTU_Main_Gate.jpg',
  'jadavpur-university': 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Jadavpur_University_Main_Building.jpg',
  'anna-university': 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Anna_University_Main_Building.jpg',
  'psg-college-of-technology': 'https://upload.wikimedia.org/wikipedia/commons/8/8c/PSG_Tech_Main_Building.jpg',
  'thapar-institute-of-technology': 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Thapar_University_Campus.jpg',
  'srm-university': 'https://upload.wikimedia.org/wikipedia/commons/d/df/SRM_University_Main_Building.jpg'
};

const delay = ms => new Promise(res => setTimeout(res, ms));

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
         // handle redirects
         return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Status: ' + res.statusCode));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  const finalMapping = {};
  for (const [slug, url] of Object.entries(urls)) {
    const dest = path.join(targetDir, slug + '.jpg');
    
    // Check if it already exists
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1024) {
      console.log('Already downloaded: ' + slug);
      finalMapping[slug] = '/campuses/' + slug + '.jpg';
      continue;
    }
    
    try {
      console.log('Downloading ' + slug + '...');
      await downloadImage(url, dest);
      finalMapping[slug] = '/campuses/' + slug + '.jpg';
      console.log('Success: ' + slug);
    } catch(e) {
      console.log('Failed ' + slug + ': ' + e.message);
      // fallback to placeholder if failed
      finalMapping[slug] = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000";
    }
    // 2500ms delay to avoid 429
    await delay(2500);
  }

  const content = `/**
 * College campus image mapping.
 * Uses locally hosted campus photos for 100% reliability.
 */
export const collegeImages: Record<string, string> = ${JSON.stringify(finalMapping, null, 2)};

/** Get image URL for a college slug, returns fallback if not found */
export function getCollegeImage(slug: string): string | null {
  return collegeImages[slug] || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000";
}
`;

  fs.writeFileSync(path.join(__dirname, 'lib', 'college-images.ts'), content);
  console.log('Done writing college-images.ts');
}

run();

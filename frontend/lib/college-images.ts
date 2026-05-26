export const collegeImages: Record<string, string> = {
  "iit-delhi": "/campuses/iit-delhi.jpg",
  "iit-bombay": "/campuses/iit-bombay.jpg",
  "iit-kanpur": "/campuses/iit-kanpur.jpg",
  "iit-roorkee": "/campuses/iit-roorkee.jpg",
  "iit-madras": "/campuses/iit-madras.jpg",
  "iit-kharagpur": "/campuses/iit-kharagpur.jpg",
  "iit-guwahati": "/campuses/iit-guwahati.jpg",
  "iit-hyderabad": "/campuses/iit-hyderabad.png",
  "iit-bhu": "/campuses/iit-bhu.png",
  "iit-indore": "/campuses/iit-indore.png",
  "nit-trichy": "/campuses/nit-trichy.jpg",
  "nit-surathkal": "/campuses/nit-surathkal.jpg",
  "nit-warangal": "/campuses/nit-warangal.jpg",
  "nit-calicut": "/campuses/nit-calicut.jpg",
  "nit-rourkela": "/campuses/nit-rourkela.jpg",
  "bits-pilani": "/campuses/bits-pilani.jpg",
  "bits-goa": "/campuses/bits-goa.jpg",
  "vit-vellore": "/campuses/vit-vellore.jpg",
  "manipal-institute-of-technology": "/campuses/manipal-institute-of-technology.jpg",
  "iiit-hyderabad": "/campuses/iiit-hyderabad.jpg",
  "iiit-bangalore": "/campuses/iiit-bangalore.jpg",
  "iiit-delhi": "/campuses/iiit-delhi.jpg",
  "delhi-technological-university": "/campuses/delhi-technological-university.webp",
  "jadavpur-university": "/campuses/jadavpur-university.jpg",
  "anna-university": "/campuses/anna-university.jpg",
  "psg-college-of-technology": "/campuses/psg-college-of-technology.jpg",
  "thapar-institute-of-technology": "/campuses/thapar-institute-of-technology.png",
  "srm-university": "/campuses/srm-university.jpg",
};

const fallbackImages = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1562774053716-65f018d36eb0?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1576495199011-4691b5c464ef?auto=format&fit=crop&q=80&w=1000"
];
export function getCollegeImage(slug: string): string | null {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % fallbackImages.length;
  return collegeImages[slug] || fallbackImages[index];
}

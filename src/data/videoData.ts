export interface Video {
  id: string;
  title: string;
  vimeoId: string;
  embedUrl: string;
  thumbnailUrl: string;
  description?: string;
  category: string;
  /** Fuzzy-matched NPI/LA action slugs */
  matchedActionSlugs: string[];
  sourcePage: "homepage" | "videos" | "actions-explorer";
}

export const videos: Video[] = [
  // Homepage featured videos
  {
    id: "planting-hedges",
    title: "Planting Hedges",
    vimeoId: "959077064",
    embedUrl: "https://player.vimeo.com/video/959077064",
    thumbnailUrl: "https://vumbnail.com/959077064.jpg",
    description:
      "Learn about the NPI for planting new native hedgerows to enhance field boundaries for biodiversity and landscape connectivity.",
    category: "Habitat Creation",
    matchedActionSlugs: [
      "npi-planting-new-hedges",
      "npi-hedgerow-rejuvenation",
    ],
    sourcePage: "homepage",
  },
  {
    id: "wild-bird-cover-strips-homepage",
    title: "Wild Bird Cover Strips",
    vimeoId: "957828180",
    embedUrl: "https://player.vimeo.com/video/957828180",
    thumbnailUrl: "https://vumbnail.com/957828180.jpg",
    description:
      "Discover how wild bird cover strips provide essential food and shelter for farmland birds during winter months.",
    category: "Wildlife",
    matchedActionSlugs: [
      "npi-wild-bird-cover-strips",
      "npi-wild-bird-cover-plot",
    ],
    sourcePage: "homepage",
  },
  // Videos page
  {
    id: "grassland-habitats",
    title: "Grassland Habitats",
    vimeoId: "468190694",
    embedUrl: "https://player.vimeo.com/video/468190694",
    thumbnailUrl: "https://vumbnail.com/468190694.jpg",
    description:
      "Exploring the rich biodiversity found in Irish grassland habitats and how farming practices support these ecosystems.",
    category: "Grassland",
    matchedActionSlugs: [],
    sourcePage: "videos",
  },
  {
    id: "grassland-management",
    title: "Grassland Management",
    vimeoId: "468215250",
    embedUrl: "https://player.vimeo.com/video/468215250",
    thumbnailUrl: "https://vumbnail.com/468215250.jpg",
    description:
      "Best practices for managing grasslands to balance agricultural productivity with environmental conservation.",
    category: "Grassland",
    matchedActionSlugs: [],
    sourcePage: "videos",
  },
  {
    id: "grazing-infrastructure",
    title: "Grazing Infrastructure",
    vimeoId: "468184358",
    embedUrl: "https://player.vimeo.com/video/468184358",
    thumbnailUrl: "https://vumbnail.com/468184358.jpg",
    description:
      "Essential grazing infrastructure for sustainable livestock management including water points and fencing.",
    category: "Infrastructure",
    matchedActionSlugs: [
      "npi-pasture-pumps",
      "npi-solar-pumps",
      "npi-water-troughs",
      "npi-fencing-permanent-electric",
    ],
    sourcePage: "videos",
  },
  {
    id: "land-management-hill-1",
    title: "Land Management on the Hill",
    vimeoId: "532238574",
    embedUrl: "https://player.vimeo.com/video/532238574",
    thumbnailUrl: "https://vumbnail.com/532238574.jpg",
    description:
      "Managing upland and hill areas to protect peatland habitats while maintaining farming viability.",
    category: "Land Management",
    matchedActionSlugs: [
      "npi-bracken-strimming",
      "npi-bracken-mechanical",
    ],
    sourcePage: "videos",
  },
  {
    id: "land-management-hill-2",
    title: "Land Management on the Hill",
    vimeoId: "468179457",
    embedUrl: "https://player.vimeo.com/video/468179457",
    thumbnailUrl: "https://vumbnail.com/468179457.jpg",
    description:
      "Further insights into hill land management techniques for environmental protection.",
    category: "Land Management",
    matchedActionSlugs: [
      "npi-bracken-strimming",
      "npi-bracken-mechanical",
    ],
    sourcePage: "videos",
  },
  {
    id: "stop-nest-disturbance",
    title: "Let's Stop Nest Disturbance",
    vimeoId: "545007981",
    embedUrl: "https://player.vimeo.com/video/545007981",
    thumbnailUrl: "https://vumbnail.com/545007981.jpg",
    description:
      "Raising awareness about ground nesting bird protection during the breeding season.",
    category: "Wildlife",
    matchedActionSlugs: [
      "npi-wader-scrapes",
      "npi-swift-nest-boxes",
      "npi-swallow-nest-boxes",
      "npi-barn-owl-box-kestrel-box",
    ],
    sourcePage: "videos",
  },
  {
    id: "mob-grazing-goats",
    title: "Mob Grazing Goats",
    vimeoId: "467933103",
    embedUrl: "https://player.vimeo.com/video/467933103",
    thumbnailUrl: "https://vumbnail.com/467933103.jpg",
    description:
      "Using goats for targeted grazing to manage invasive vegetation and improve habitat quality.",
    category: "Grazing",
    matchedActionSlugs: [],
    sourcePage: "videos",
  },
  {
    id: "protecting-the-bog",
    title: "Protecting the Bog",
    vimeoId: "545003951",
    embedUrl: "https://player.vimeo.com/video/545003951",
    thumbnailUrl: "https://vumbnail.com/545003951.jpg",
    description:
      "The importance of protecting Irish boglands for carbon storage, water management, and unique biodiversity.",
    category: "Peatland",
    matchedActionSlugs: [],
    sourcePage: "videos",
  },
  {
    id: "scrub-habitats",
    title: "Scrub Habitats on the Farm",
    vimeoId: "527293520",
    embedUrl: "https://player.vimeo.com/video/527293520",
    thumbnailUrl: "https://vumbnail.com/527293520.jpg",
    description:
      "Understanding the ecological value of scrub habitats and managing them sustainably on farmland.",
    category: "Habitat",
    matchedActionSlugs: [],
    sourcePage: "videos",
  },
  {
    id: "targeted-grazing-gorse",
    title: "Targeted Grazing on Gorse",
    vimeoId: "536015188",
    embedUrl: "https://player.vimeo.com/video/536015188",
    thumbnailUrl: "https://vumbnail.com/536015188.jpg",
    description:
      "Using targeted grazing techniques to manage gorse while maintaining its ecological benefits.",
    category: "Grazing",
    matchedActionSlugs: [],
    sourcePage: "videos",
  },
  {
    id: "wild-bird-cover-strips-video",
    title: "Wild Bird Cover Strips",
    vimeoId: "468661265",
    embedUrl: "https://player.vimeo.com/video/468661265",
    thumbnailUrl: "https://vumbnail.com/468661265.jpg",
    description:
      "How to establish and maintain wild bird cover strips on your farm for maximum wildlife benefit.",
    category: "Wildlife",
    matchedActionSlugs: [
      "npi-wild-bird-cover-strips",
      "npi-wild-bird-cover-plot",
    ],
    sourcePage: "videos",
  },
];

/** Additional hosted video (from Hen Harrier Programme CDN) */
export const hostedVideos = [
  {
    id: "hen-harrier-programme",
    title: "Hen Harrier Programme",
    url: "https://henharrierprogram.euvidecdn.com/videos/68f8e31f3b4c45f08d7e7458/1/video/mp4/video-1080p.mp4",
    type: "hosted" as const,
    sourcePage: "homepage",
  },
];

/**
 * Get videos matching a specific action slug using the fuzzy-match data
 */
export function getVideosForAction(actionSlug: string): Video[] {
  return videos.filter((v) => v.matchedActionSlugs.includes(actionSlug));
}

/**
 * Get featured videos for the homepage
 */
export function getHomepageVideos(): Video[] {
  return videos.filter((v) => v.sourcePage === "homepage");
}

/**
 * Get all videos for the videos gallery page
 */
export function getAllGalleryVideos(): Video[] {
  return videos;
}

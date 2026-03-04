/**
 * Hero images scraped from acresireland.ie action pages (March 2026)
 * Maps NPI action slugs to their WordPress-hosted hero images
 */

const WP = "https://acresireland.ie/wp-content/uploads";

export const actionHeroImages: Record<string, string> = {
  "npi-wild-bird-cover-strips": `${WP}/2024/05/David-Trant-WBC-1-1024x576.jpg`,
  "npi-conservation-of-cultural-heritage-sites-on-grassland": `${WP}/2024/05/Ringfort-ACRES-Drone-shots-1024x341.jpg`,
  "npi-planting-small-woodlands-300-trees-0-09ha": `${WP}/2024/05/Small-Woodlands-1024x768.webp`,
  "npi-planting-new-hedges": `${WP}/2024/05/NPI-Planting-New-Hedge-4.png`,
  "npi-planting-trees": `${WP}/2024/05/Planting-Trees-1024x768.webp`,
  "npi-riparian-margin": `${WP}/2024/06/ACRES-CP-actions-explorer-riparian-marginUntitled-1-01-1024x682.webp`,
  "npi-planting-traditional-orchards-10-trees": `${WP}/2024/05/20240505_201331-1024x768.jpg`,
  "npi-pasture-pumps": `${WP}/2024/05/20221022_1409431-1024x768.jpg`,
  "npi-solar-electric-fence-unit": `${WP}/2024/05/NPI-Solar-Powered-Fencer-2.jpg`,
  "npi-solar-pumps": `${WP}/2024/05/Solar-Pump.png`,
  "npi-repair-of-traditional-stonewalls-2-sides": `${WP}/2024/06/Stone-walls-NPI-Action-1-1024x768.webp`,
  "npi-culverts": `${WP}/2024/05/NPI-Culvert.jpg`,
  "npi-hedgerow-rejuvenation": `${WP}/2024/05/Hedgerow-1024x768.webp`,
  "npi-bracken-strimming": `${WP}/2024/05/NPI-Bracken-Management-Strimming-1024x768.jpg`,
  "npi-swift-nest-boxes": `${WP}/2024/05/Swift-1024x768.webp`,
  "npi-wader-scrapes": `${WP}/2024/05/Wader-Scrapes-4.jpg`,
  "npi-bat-boxes": `${WP}/2024/05/NPI-Bat-Box-576x1024.jpg`,
  "npi-riparian-zone-tree-planting": `${WP}/2024/06/ACRES-CP-actions-explorer-Jun-06-202401-1024x682.webp`,
  "npi-planting-small-woodland-160-trees-0-05ha": `${WP}/2024/05/Small-Woodland--1024x768.webp`,
  "npi-swallow-nest-boxes": `${WP}/2024/05/Swallow-Box-1024x768.webp`,
  "npi-barn-owl-box-kestrel-box": `${WP}/2024/04/Good-Location-for-a-Barn-Owl-Box-tree-3-1024x764.jpg`,
  "npi-repair-of-traditional-stonewalls-1-side": `${WP}/2024/05/NPI-Traditional-Stonewall-Repair-768x1024.jpg`,
  "npi-installation-of-gates": `${WP}/2024/05/Gates-2.png`,
  "npi-water-troughs": `${WP}/2024/05/Water-Trough-5.jpg`,
  "npi-water-storage-tanks": `${WP}/2024/05/ACRES-Water-Storage-Tank.jpg`,
  "npi-riparian-zone-sheep-fencing": `${WP}/2024/05/Sheep-Fencing-1024x768.webp`,
  "npi-fencing-permanent-electric": `${WP}/2024/05/NPI-Fencing-Permanent-Electric-3.jpg`,
  "npi-fencing-barbed-wire": `${WP}/2024/05/NPI-Fencing-Barbed-Wire.jpg`,
  "npi-fencing-sheep-wire-2": `${WP}/2024/05/NPI-Fencing-Sheepwire-3.png`,
  "npi-mobile-feed-storage-bins": `${WP}/2024/05/ACRES-CP-actions-explorer-Jun-10-202402-jpg.webp`,
  "npi-bracken-mechanical": `${WP}/2024/05/Dense-Bracken-in-Summer-scaled.jpg`,
  "npi-field-margins-3m-2": `${WP}/2024/05/Field-Margin-jpg.webp`,
  "npi-installation-of-heritage-gates": `${WP}/2024/06/Heritage-gates-NPI-action-1024x768.webp`,
  "npi-winter-stubble": `${WP}/2024/05/Winter-Stubble-1-1024x768.jpg`,
  "npi-conservation-of-cultural-heritage-sites-on-arable-land": `${WP}/2024/07/Arable-Lands-1024x768.webp`,
  "npi-rodenticide-free-rodent-control": `${WP}/2024/05/20240503_1459281-1024x768.jpg`,
};

/** Homepage region images from acresireland.ie */
export const regionImages = {
  munsterSouthConnacht: `${WP}/2024/04/Acres-2.01.jpg`,
  breifne: `${WP}/2024/04/Acres-2.03.jpg`,
  leinster: `${WP}/2024/04/Acres-2.02.jpg`,
};

/** Site-wide imagery */
export const siteImages = {
  logo: `${WP}/2024/03/Acres-Logo.png`,
  logoSmall: `${WP}/2024/03/cropped-Acres-Logo.png`,
  henHarrierFlight: `${WP}/2024/04/Male-Harrier-in-Flight-2-1024x680.jpg`,
  dafmLogo: `${WP}/2024/04/1.png`,
  euCapLogo: `${WP}/2024/04/2.png`,
};

/**
 * Get hero image for an action slug, with fallback
 */
export function getActionHeroImage(slug: string): string | undefined {
  return actionHeroImages[slug];
}

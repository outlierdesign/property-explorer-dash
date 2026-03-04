export interface NPIResource {
  id: string;
  title: string;
  slug: string;
  pdfUrl: string;
  /** Matched action slug for cross-referencing */
  matchedActionSlug?: string;
}

const WP_BASE = "https://acresireland.ie/wp-content/uploads/2025/03";

export const npiResources: NPIResource[] = [
  { id: "npi-intro", title: "NPI Introduction", slug: "npi-introduction", pdfUrl: `${WP_BASE}/NPI-Introduction.pdf` },
  { id: "appendix-npis", title: "NPIs Allowed on LPIS with ACRES General Action", slug: "appendix-npis-lpis", pdfUrl: `${WP_BASE}/Appendix-NPIs-allowed-on-LPIS-with-ACRES-General-Action.pdf` },
  { id: "barn-owl-kestrel", title: "Barn Owl / Kestrel Nest Box", slug: "barn-owl-kestrel-nest-box", pdfUrl: `${WP_BASE}/Barn-OwlKestrel-Nest-Box.pdf`, matchedActionSlug: "npi-barn-owl-box-kestrel-box" },
  { id: "bat-boxes", title: "Bat Boxes", slug: "bat-boxes", pdfUrl: `${WP_BASE}/Bat-Boxes.pdf`, matchedActionSlug: "npi-bat-boxes" },
  { id: "bracken-mechanical", title: "Bracken Mechanical", slug: "bracken-mechanical", pdfUrl: `${WP_BASE}/Bracken-Mechanical.pdf`, matchedActionSlug: "npi-bracken-mechanical" },
  { id: "bracken-strimming", title: "Bracken Strimming", slug: "bracken-strimming", pdfUrl: `${WP_BASE}/Bracken-Strimming.pdf`, matchedActionSlug: "npi-bracken-strimming" },
  { id: "conservation-arable", title: "Conservation of Cultural Heritage Sites on Arable Land", slug: "conservation-heritage-arable", pdfUrl: `${WP_BASE}/Conservation-of-Cultural-Heritage-Sites-on-Arable-Land.pdf`, matchedActionSlug: "npi-conservation-of-cultural-heritage-sites-on-arable-land" },
  { id: "conservation-grassland", title: "Conservation of Cultural Heritage Sites on Grassland", slug: "conservation-heritage-grassland", pdfUrl: `${WP_BASE}/Conservation-of-Cultural-Heritage-Sites-on-Grassland.pdf`, matchedActionSlug: "npi-conservation-of-cultural-heritage-sites-on-grassland" },
  { id: "culverts", title: "Culverts", slug: "culverts", pdfUrl: `${WP_BASE}/Culverts.pdf`, matchedActionSlug: "npi-culverts" },
  { id: "fencing-barbed", title: "Fencing - Barbed Wire", slug: "fencing-barbed-wire", pdfUrl: `${WP_BASE}/Fencing-Barbed-Wire.pdf`, matchedActionSlug: "npi-fencing-barbed-wire" },
  { id: "fencing-electric", title: "Fencing - Permanent Electric", slug: "fencing-permanent-electric", pdfUrl: `${WP_BASE}/Fencing-Permanent-Electric.pdf`, matchedActionSlug: "npi-fencing-permanent-electric" },
  { id: "fencing-sheep", title: "Fencing - Sheep Wire", slug: "fencing-sheep-wire", pdfUrl: `${WP_BASE}/Fencing-Sheep-Wire.pdf`, matchedActionSlug: "npi-fencing-sheep-wire-2" },
  { id: "field-margins", title: "Field Margins", slug: "field-margins", pdfUrl: `${WP_BASE}/Field-Margins.pdf`, matchedActionSlug: "npi-field-margins-3m-2" },
  { id: "hedge-rejuvenation", title: "Hedge Rejuvenation", slug: "hedge-rejuvenation", pdfUrl: `${WP_BASE}/Hedge-Rejuvenation.pdf`, matchedActionSlug: "npi-hedgerow-rejuvenation" },
  { id: "gates", title: "Installation of Gates", slug: "installation-of-gates", pdfUrl: `${WP_BASE}/Installation-of-Gates.pdf`, matchedActionSlug: "npi-installation-of-gates" },
  { id: "heritage-gates", title: "Installation of Heritage Gates", slug: "installation-heritage-gates", pdfUrl: `${WP_BASE}/Installation-of-Heritage-Gates.pdf`, matchedActionSlug: "npi-installation-of-heritage-gates" },
  { id: "mobile-feed-troughs", title: "Mobile Cattle Feed Troughs", slug: "mobile-cattle-feed-troughs", pdfUrl: `${WP_BASE}/Mobile-Cattle-Feed-Troughs.pdf` },
  { id: "mobile-feed-bins", title: "Mobile Feed Storage Bins", slug: "mobile-feed-storage-bins", pdfUrl: `${WP_BASE}/Mobile-Feed-Storage-Bins.pdf`, matchedActionSlug: "npi-mobile-feed-storage-bins" },
  { id: "pasture-pumps", title: "Pasture Pumps", slug: "pasture-pumps", pdfUrl: `${WP_BASE}/Pasture-Pumps.pdf`, matchedActionSlug: "npi-pasture-pumps" },
  { id: "traditional-orchards", title: "Planting Traditional Orchards", slug: "planting-traditional-orchards", pdfUrl: `${WP_BASE}/Planting-Traditional-Orchards.pdf`, matchedActionSlug: "npi-planting-traditional-orchards-10-trees" },
  { id: "planting-trees", title: "Planting Trees", slug: "planting-trees", pdfUrl: `${WP_BASE}/Planting-Trees.pdf`, matchedActionSlug: "npi-planting-trees" },
  { id: "rainwater-catchers", title: "Rainwater Catchers", slug: "rainwater-catchers", pdfUrl: `${WP_BASE}/Rainwater-Catchers.pdf` },
  { id: "stonewalls", title: "Repair of Traditional Stone Walls (1 & 2 sides)", slug: "stonewalls", pdfUrl: `${WP_BASE}/Repair-of-Traditional-Stone-Walls-1-side-and-2-sides.pdf`, matchedActionSlug: "npi-repair-of-traditional-stonewalls-2-sides" },
  { id: "stonewalls-1side", title: "Repair of Traditional Stone Walls (1 side)", slug: "stonewalls-1-side", pdfUrl: `${WP_BASE}/Repair-of-Traditional-Stone-Walls-1-side-and-2-sides.pdf`, matchedActionSlug: "npi-repair-of-traditional-stonewalls-1-side" },
  { id: "riparian-margin", title: "Riparian Margin & Sheep Fencing", slug: "riparian-margin", pdfUrl: `${WP_BASE}/Riparian-Margin-and-Riparian-Margin-Sheep-fencing.pdf`, matchedActionSlug: "npi-riparian-margin" },
  { id: "riparian-sheep", title: "Riparian Margin (Sheep Fencing)", slug: "riparian-margin-sheep-fencing", pdfUrl: `${WP_BASE}/Riparian-Margin-and-Riparian-Margin-Sheep-fencing.pdf`, matchedActionSlug: "npi-riparian-zone-sheep-fencing" },
  { id: "riparian-trees", title: "Riparian Margin Tree Planting", slug: "riparian-margin-tree-planting", pdfUrl: `${WP_BASE}/Riparian-Margin-Tree-Planting.pdf`, matchedActionSlug: "npi-riparian-zone-tree-planting" },
  { id: "rodenticide-free", title: "Rodenticide Free Rodent Control", slug: "rodenticide-free-rodent-control", pdfUrl: `${WP_BASE}/Rodenticide-Free-Rodent-Control.pdf`, matchedActionSlug: "npi-rodenticide-free-rodent-control" },
  { id: "scrub-removal-areas", title: "Scrub Removal Areas (Hand Tools)", slug: "scrub-removal-areas", pdfUrl: `${WP_BASE}/Scrub-Removal-Areas-Hand-Tools.pdf` },
  { id: "scrub-removal-strips", title: "Scrub Removal Strips (Hand Tools)", slug: "scrub-removal-strips", pdfUrl: `${WP_BASE}/Scrub-Removal-Strips-Hand-Tools.pdf` },
  { id: "small-woodland", title: "Small Woodland", slug: "small-woodland", pdfUrl: `${WP_BASE}/Small-Woodland.pdf`, matchedActionSlug: "npi-planting-small-woodlands-300-trees-0-09ha" },
  { id: "solar-electric-fencer", title: "Solar Electric Fencer Unit", slug: "solar-electric-fencer", pdfUrl: `${WP_BASE}/Solar-Electric-Fencer-Unit.pdf`, matchedActionSlug: "npi-solar-electric-fence-unit" },
  { id: "solar-pumps", title: "Solar Pumps", slug: "solar-pumps", pdfUrl: `${WP_BASE}/Solar-Pumps.pdf`, matchedActionSlug: "npi-solar-pumps" },
  { id: "swallow-nest-boxes", title: "Swallow Nest Boxes", slug: "swallow-nest-boxes", pdfUrl: `${WP_BASE}/Swallow-Nest-Boxes.pdf`, matchedActionSlug: "npi-swallow-nest-boxes" },
  { id: "swift-boxes", title: "Swift Boxes", slug: "swift-boxes", pdfUrl: `${WP_BASE}/Swift-Boxes.pdf`, matchedActionSlug: "npi-swift-nest-boxes" },
  { id: "track-resurfacing", title: "Track Re-surfacing Gravel", slug: "track-resurfacing-gravel", pdfUrl: `${WP_BASE}/Track-Re-surfacing-Gravel.pdf` },
  { id: "wader-scrapes", title: "Wader Scrapes", slug: "wader-scrapes", pdfUrl: `${WP_BASE}/Wader-Scrapes.pdf`, matchedActionSlug: "npi-wader-scrapes" },
  { id: "water-storage-tanks", title: "Water Storage Tanks", slug: "water-storage-tanks", pdfUrl: `${WP_BASE}/Water-Storage-Tanks.pdf`, matchedActionSlug: "npi-water-storage-tanks" },
  { id: "water-troughs", title: "Water Troughs", slug: "water-troughs", pdfUrl: `${WP_BASE}/Water-Troughs.pdf`, matchedActionSlug: "npi-water-troughs" },
  { id: "wild-bird-cover-plots", title: "Wild Bird Cover Plots", slug: "wild-bird-cover-plots", pdfUrl: `${WP_BASE}/Wild-Bird-Cover-Plots.pdf` },
  { id: "wild-bird-cover-strips", title: "Wild Bird Cover Strips", slug: "wild-bird-cover-strips", pdfUrl: `${WP_BASE}/Wild-Bird-Cover-Strips.pdf`, matchedActionSlug: "npi-wild-bird-cover-strips" },
  { id: "winter-stubble", title: "Winter Stubble", slug: "winter-stubble", pdfUrl: `${WP_BASE}/Winter-Stubble.pdf`, matchedActionSlug: "npi-winter-stubble" },
];

/** Official government NPI specifications document */
export const npiSpecsUrl = "https://assets.gov.ie/static/documents/NPI_Specifications_V2.1_010825.pdf";

export function getResourceForAction(actionSlug: string): NPIResource | undefined {
  return npiResources.find((r) => r.matchedActionSlug === actionSlug);
}

export function getAllResources(): NPIResource[] {
  return npiResources;
}

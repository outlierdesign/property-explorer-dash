export interface NPIResource {
  id: string;
  title: string;
  slug: string;
  pdfUrl: string;
  /** Matched action slug for cross-referencing */
  matchedActionSlug?: string;
}

const WP_BASE = "https://acresireland.ie/wp-content/uploads";

export const npiResources: NPIResource[] = [
  { id: "npi-intro", title: "NPI Introduction", slug: "npi-introduction", pdfUrl: `${WP_BASE}/2024/06/NPI-Introduction.pdf` },
  { id: "barn-owl-kestrel", title: "Barn Owl / Kestrel Nest Box", slug: "barn-owl-kestrel-nest-box", pdfUrl: `${WP_BASE}/2024/06/Barn-Owl-Kestrel-Nest-Box.pdf`, matchedActionSlug: "npi-barn-owl-box-kestrel-box" },
  { id: "bat-boxes", title: "Bat Boxes", slug: "bat-boxes", pdfUrl: `${WP_BASE}/2024/06/Bat-Boxes.pdf`, matchedActionSlug: "npi-bat-boxes" },
  { id: "bracken-mechanical", title: "Bracken Mechanical", slug: "bracken-mechanical", pdfUrl: `${WP_BASE}/2024/06/Bracken-Mechanical.pdf`, matchedActionSlug: "npi-bracken-mechanical" },
  { id: "bracken-strimming", title: "Bracken Strimming", slug: "bracken-strimming", pdfUrl: `${WP_BASE}/2024/06/Bracken-Strimming.pdf`, matchedActionSlug: "npi-bracken-strimming" },
  { id: "conservation-arable", title: "Conservation of Cultural Heritage Sites on Arable Land", slug: "conservation-heritage-arable", pdfUrl: `${WP_BASE}/2024/06/Conservation-Heritage-Arable.pdf`, matchedActionSlug: "npi-conservation-of-cultural-heritage-sites-on-arable-land" },
  { id: "conservation-grassland", title: "Conservation of Cultural Heritage Sites on Grassland", slug: "conservation-heritage-grassland", pdfUrl: `${WP_BASE}/2024/06/Conservation-Heritage-Grassland.pdf`, matchedActionSlug: "npi-conservation-of-cultural-heritage-sites-on-grassland" },
  { id: "culverts", title: "Culverts", slug: "culverts", pdfUrl: `${WP_BASE}/2024/06/Culverts.pdf`, matchedActionSlug: "npi-culverts" },
  { id: "fencing-barbed", title: "Fencing - Barbed Wire", slug: "fencing-barbed-wire", pdfUrl: `${WP_BASE}/2024/06/Fencing-Barbed-Wire.pdf`, matchedActionSlug: "npi-fencing-barbed-wire" },
  { id: "fencing-electric", title: "Fencing - Permanent Electric", slug: "fencing-permanent-electric", pdfUrl: `${WP_BASE}/2024/06/Fencing-Permanent-Electric.pdf`, matchedActionSlug: "npi-fencing-permanent-electric" },
  { id: "fencing-sheep", title: "Fencing - Sheep Wire", slug: "fencing-sheep-wire", pdfUrl: `${WP_BASE}/2024/06/Fencing-Sheep-Wire.pdf`, matchedActionSlug: "npi-fencing-sheep-wire-2" },
  { id: "field-margins", title: "Field Margins", slug: "field-margins", pdfUrl: `${WP_BASE}/2024/06/Field-Margins.pdf`, matchedActionSlug: "npi-field-margins-3m-2" },
  { id: "hedge-rejuvenation", title: "Hedge Rejuvenation", slug: "hedge-rejuvenation", pdfUrl: `${WP_BASE}/2024/06/Hedge-Rejuvenation.pdf`, matchedActionSlug: "npi-hedgerow-rejuvenation" },
  { id: "gates", title: "Installation of Gates", slug: "installation-of-gates", pdfUrl: `${WP_BASE}/2024/06/Installation-of-Gates.pdf`, matchedActionSlug: "npi-installation-of-gates" },
  { id: "heritage-gates", title: "Installation of Heritage Gates", slug: "installation-heritage-gates", pdfUrl: `${WP_BASE}/2024/06/Heritage-Gates.pdf`, matchedActionSlug: "npi-installation-of-heritage-gates" },
  { id: "mobile-feed-troughs", title: "Mobile Cattle Feed Troughs", slug: "mobile-cattle-feed-troughs", pdfUrl: `${WP_BASE}/2024/06/Mobile-Cattle-Feed-Troughs.pdf`, matchedActionSlug: "npi-mobile-cattle-feed-troughs" },
  { id: "mobile-feed-bins", title: "Mobile Feed Storage Bins", slug: "mobile-feed-storage-bins", pdfUrl: `${WP_BASE}/2024/06/Mobile-Feed-Storage-Bins.pdf`, matchedActionSlug: "npi-mobile-feed-storage-bins" },
  { id: "pasture-pumps", title: "Pasture Pumps", slug: "pasture-pumps", pdfUrl: `${WP_BASE}/2024/06/Pasture-Pumps.pdf`, matchedActionSlug: "npi-pasture-pumps" },
  { id: "traditional-orchards", title: "Planting Traditional Orchards", slug: "planting-traditional-orchards", pdfUrl: `${WP_BASE}/2024/06/Planting-Traditional-Orchards.pdf`, matchedActionSlug: "npi-planting-traditional-orchards-10-trees" },
  { id: "planting-trees", title: "Planting Trees", slug: "planting-trees", pdfUrl: `${WP_BASE}/2024/06/Planting-Trees.pdf`, matchedActionSlug: "npi-planting-trees" },
  { id: "rainwater-catchers", title: "Rainwater Catchers", slug: "rainwater-catchers", pdfUrl: `${WP_BASE}/2024/06/Rainwater-Catchers.pdf` },
  { id: "stonewalls-1side", title: "Repair of Traditional Stone Walls (1 side)", slug: "stonewalls-1-side", pdfUrl: `${WP_BASE}/2024/06/Stone-Walls-1-Side.pdf`, matchedActionSlug: "npi-repair-of-traditional-stonewalls-1-side" },
  { id: "stonewalls-2sides", title: "Repair of Traditional Stone Walls (2 sides)", slug: "stonewalls-2-sides", pdfUrl: `${WP_BASE}/2024/06/Stone-Walls-2-Sides.pdf`, matchedActionSlug: "npi-repair-of-traditional-stonewalls-2-sides" },
  { id: "riparian-margin", title: "Riparian Margin", slug: "riparian-margin", pdfUrl: `${WP_BASE}/2024/06/Riparian-Margin.pdf`, matchedActionSlug: "npi-riparian-margin" },
  { id: "riparian-sheep", title: "Riparian Margin (Sheep Fencing)", slug: "riparian-margin-sheep-fencing", pdfUrl: `${WP_BASE}/2024/06/Riparian-Margin-Sheep-Fencing.pdf`, matchedActionSlug: "npi-riparian-zone-sheep-fencing" },
  { id: "riparian-trees", title: "Riparian Margin Tree Planting", slug: "riparian-margin-tree-planting", pdfUrl: `${WP_BASE}/2024/06/Riparian-Margin-Tree-Planting.pdf`, matchedActionSlug: "npi-riparian-zone-tree-planting" },
  { id: "rodenticide-free", title: "Rodenticide Free Rodent Control", slug: "rodenticide-free-rodent-control", pdfUrl: `${WP_BASE}/2024/06/Rodenticide-Free-Rodent-Control.pdf`, matchedActionSlug: "npi-rodenticide-free-rodent-control" },
  { id: "scrub-removal-areas", title: "Scrub Removal Areas (Hand Tools)", slug: "scrub-removal-areas", pdfUrl: `${WP_BASE}/2024/06/Scrub-Removal-Areas.pdf` },
  { id: "scrub-removal-strips", title: "Scrub Removal Strips (Hand Tools)", slug: "scrub-removal-strips", pdfUrl: `${WP_BASE}/2024/06/Scrub-Removal-Strips.pdf` },
  { id: "small-woodland", title: "Small Woodland", slug: "small-woodland", pdfUrl: `${WP_BASE}/2024/06/Small-Woodland.pdf`, matchedActionSlug: "npi-planting-small-woodlands-300-trees-0-09ha" },
  { id: "solar-electric-fencer", title: "Solar Electric Fencer Unit", slug: "solar-electric-fencer", pdfUrl: `${WP_BASE}/2024/06/Solar-Electric-Fencer.pdf`, matchedActionSlug: "npi-solar-electric-fence-unit" },
  { id: "solar-pumps", title: "Solar Pumps", slug: "solar-pumps", pdfUrl: `${WP_BASE}/2024/06/Solar-Pumps.pdf`, matchedActionSlug: "npi-solar-pumps" },
  { id: "swallow-nest-boxes", title: "Swallow Nest Boxes", slug: "swallow-nest-boxes", pdfUrl: `${WP_BASE}/2024/06/Swallow-Nest-Boxes.pdf`, matchedActionSlug: "npi-swallow-nest-boxes" },
  { id: "swift-boxes", title: "Swift Boxes", slug: "swift-boxes", pdfUrl: `${WP_BASE}/2024/06/Swift-Boxes.pdf`, matchedActionSlug: "npi-swift-nest-boxes" },
  { id: "track-resurfacing", title: "Track Re-surfacing Gravel", slug: "track-resurfacing-gravel", pdfUrl: `${WP_BASE}/2024/06/Track-Resurfacing-Gravel.pdf` },
  { id: "wader-scrapes", title: "Wader Scrapes", slug: "wader-scrapes", pdfUrl: `${WP_BASE}/2024/06/Wader-Scrapes.pdf`, matchedActionSlug: "npi-wader-scrapes" },
  { id: "water-storage-tanks", title: "Water Storage Tanks", slug: "water-storage-tanks", pdfUrl: `${WP_BASE}/2024/06/Water-Storage-Tanks.pdf`, matchedActionSlug: "npi-water-storage-tanks" },
  { id: "water-troughs", title: "Water Troughs", slug: "water-troughs", pdfUrl: `${WP_BASE}/2024/06/Water-Troughs.pdf`, matchedActionSlug: "npi-water-troughs" },
  { id: "wild-bird-cover-plots", title: "Wild Bird Cover Plots", slug: "wild-bird-cover-plots", pdfUrl: `${WP_BASE}/2024/06/Wild-Bird-Cover-Plots.pdf`, matchedActionSlug: "npi-wild-bird-cover-plot" },
  { id: "wild-bird-cover-strips", title: "Wild Bird Cover Strips", slug: "wild-bird-cover-strips", pdfUrl: `${WP_BASE}/2024/06/Wild-Bird-Cover-Strips.pdf`, matchedActionSlug: "npi-wild-bird-cover-strips" },
  { id: "winter-stubble", title: "Winter Stubble", slug: "winter-stubble", pdfUrl: `${WP_BASE}/2024/06/Winter-Stubble.pdf`, matchedActionSlug: "npi-winter-stubble" },
];

export function getResourceForAction(actionSlug: string): NPIResource | undefined {
  return npiResources.find((r) => r.matchedActionSlug === actionSlug);
}

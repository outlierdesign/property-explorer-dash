-- Add type field to eco_actions table to distinguish between NPIs and LAs
ALTER TABLE public.eco_actions 
ADD COLUMN IF NOT EXISTS type text NOT NULL DEFAULT 'NPI';

-- Add check constraint to ensure type is either 'NPI' or 'LA'
ALTER TABLE public.eco_actions 
ADD CONSTRAINT eco_actions_type_check CHECK (type IN ('NPI', 'LA'));

-- Create index on type for better query performance
CREATE INDEX IF NOT EXISTS idx_eco_actions_type ON public.eco_actions(type);

-- Insert Landscape Actions data

-- HABITAT AND WILDLIFE SUPPORT
INSERT INTO public.eco_actions (type, title, slug, description, payment_rate, payment_unit, category, image_url) VALUES
('LA', '3 Hour Training Habitat Support', '3hr-training-habitat-support', 'Comprehensive training on habitat support and wildlife conservation techniques for landowners and farmers.', 125.00, '3hr course', 'Habitat and Wildlife Support', NULL),
('LA', 'Breeding Wader Delayed Mowing', 'breeding-wader-delayed-mowing', 'Delay mowing operations to protect breeding wader nests and chicks during critical nesting period.', 135.00, 'hectare', 'Habitat and Wildlife Support', NULL),
('LA', 'Construction of Lesser Horseshoe Bat Roost', 'construction-lesser-horseshoe-bat-roost', 'Build specialized roost structures to support endangered Lesser Horseshoe Bat populations.', 963.00, 'roost', 'Habitat and Wildlife Support', NULL),
('LA', 'Corncrake Early Late Cover Crop', 'corncrake-early-late-cover-crop', 'Establish crop cover to provide essential habitat for corncrakes during breeding season.', 4665.00, 'hectare', 'Habitat and Wildlife Support', NULL),
('LA', 'Corncrake Early Late Cover Natural', 'corncrake-early-late-cover-natural', 'Maintain natural vegetation cover to support corncrake breeding and feeding.', 15341.00, 'hectare', 'Habitat and Wildlife Support', NULL),
('LA', 'Corncrake Delayed Mowing and Grazing', 'corncrake-delayed-mowing-grazing', 'Delay mowing and grazing activities to protect corncrake nests and young birds.', 185.00, 'hectare', 'Habitat and Wildlife Support', NULL),
('LA', 'Exclosure Fencing', 'exclosure-fencing', 'Install fencing to exclude livestock and allow habitat regeneration in sensitive areas.', 1562.00, 'hectare', 'Habitat and Wildlife Support', NULL),
('LA', 'Geese and Swans on Grassland', 'geese-swans-grassland', 'Manage grassland to provide winter feeding habitat for migratory geese and swan populations.', 150.00, 'hectare', 'Habitat and Wildlife Support', NULL),
('LA', 'Predator Proof Fence', 'predator-proof-fence', 'Install specialized fencing to protect ground-nesting birds from predators.', 3.40, 'metre', 'Habitat and Wildlife Support', NULL),
('LA', 'Post Fire Molinia Management', 'post-fire-molinia-management', 'Restore and manage Molinia grassland following fire damage to support biodiversity.', 840.00, 'hectare', 'Habitat and Wildlife Support', NULL),
('LA', 'Wildlife-Friendly Mowing', 'wildlife-friendly-mowing', 'Implement mowing practices that protect wildlife during cutting operations.', 76.00, 'hectare', 'Habitat and Wildlife Support', NULL),
('LA', 'Bracken Strimming', 'bracken-strimming', 'Control invasive bracken through strimming to restore native grassland habitats.', 835.44, 'hectare', 'Habitat and Wildlife Support', NULL),
('LA', 'Riparian Margin Tree Planting', 'riparian-margin-tree-planting', 'Plant native trees along watercourses to create wildlife corridors and improve water quality.', 13.93, 'tree', 'Habitat and Wildlife Support', NULL),
('LA', 'Riparian Margin', 'riparian-margin', 'Establish buffer zones along watercourses to protect water quality and create wildlife habitat.', 5.50, 'metre', 'Habitat and Wildlife Support', NULL),
('LA', 'Wader Scrapes', 'wader-scrapes', 'Create shallow wetland scrapes to provide feeding and breeding habitat for wading birds.', 265.28, 'scrape', 'Habitat and Wildlife Support', NULL);

-- INVASIVE SPECIES
INSERT INTO public.eco_actions (type, title, slug, description, payment_rate, payment_unit, category, image_url) VALUES
('LA', '3 Hour Training Invasive Species and Scrub', '3hr-training-invasive-scrub', 'Specialized training on identifying and managing invasive plant species.', 125.00, '3hr course', 'Invasive Species', NULL),
('LA', 'Giant Hogweed Management Manual', 'giant-hogweed-management-manual', 'Manual removal and management of toxic Giant Hogweed plants to protect biodiversity and public health.', 9881.00, 'hectare', 'Invasive Species', NULL),
('LA', 'Giant Hogweed Management Chemical', 'giant-hogweed-management-chemical', 'Chemical treatment of Giant Hogweed infestations using approved herbicides.', 7987.00, 'hectare', 'Invasive Species', NULL),
('LA', 'Himalayan Balsam Management', 'himalayan-balsam-management', 'Control invasive Himalayan Balsam to restore native riparian vegetation.', 5647.00, 'hectare', 'Invasive Species', NULL),
('LA', 'Japanese Knotweed Foliar Spray', 'japanese-knotweed-foliar-spray', 'Treat Japanese Knotweed through foliar herbicide application.', 8279.00, 'hectare', 'Invasive Species', NULL),
('LA', 'Japanese Knotweed Stem Injection', 'japanese-knotweed-stem-injection', 'Intensive Japanese Knotweed treatment using stem injection method.', 30490.00, 'hectare', 'Invasive Species', NULL),
('LA', 'Rhododendron and Cherry Laurel Removal Severe', 'rhododendron-cherry-laurel-severe', 'Remove severe infestations of invasive Rhododendron and Cherry Laurel from woodlands.', 20250.00, 'hectare', 'Invasive Species', NULL),
('LA', 'Rhododendron and Cherry Laurel Removal High', 'rhododendron-cherry-laurel-high', 'Clear high-density Rhododendron and Cherry Laurel to restore native woodland.', 14120.00, 'hectare', 'Invasive Species', NULL);

-- HYDROMORPHOLOGY
INSERT INTO public.eco_actions (type, title, slug, description, payment_rate, payment_unit, category, image_url) VALUES
('LA', '3 Hour Training Hydromorphology', '3hr-training-hydromorphology', 'Training on water management and hydrological restoration techniques.', 125.00, '3hr course', 'Hydromorphology', NULL),
('LA', 'Check Dam Stone', 'check-dam-stone', 'Install stone check dams to slow water flow and reduce erosion.', 266.00, 'dam', 'Hydromorphology', NULL),
('LA', 'Check Dam Wood', 'check-dam-wood', 'Construct wooden check dams for natural water flow management.', 156.00, 'dam', 'Hydromorphology', NULL),
('LA', 'Drain Blocking Peat Plug', 'drain-blocking-peat-plug', 'Block drains with peat plugs to restore peatland hydrology.', 74.00, 'dam', 'Hydromorphology', NULL),
('LA', 'Drain Blocking Timber Dam', 'drain-blocking-timber-dam', 'Install timber dams to block drains and rewet peatlands.', 144.00, 'dam', 'Hydromorphology', NULL),
('LA', 'Wildlife Pond', 'wildlife-pond', 'Create new pond habitats to support amphibians, invertebrates and other wildlife.', 588.00, 'pond', 'Hydromorphology', NULL),
('LA', 'Livestock Crossing Point', 'livestock-crossing-point', 'Install crossing points to allow livestock access while protecting watercourse banks.', 1022.00, 'crossing', 'Hydromorphology', NULL),
('LA', 'Sediment Capture Pond', 'sediment-capture-pond', 'Construct ponds to capture sediment and improve water quality.', 317.00, 'pond', 'Hydromorphology', NULL);

-- SCRUB REMOVAL AND TRACK INSTALLATION
INSERT INTO public.eco_actions (type, title, slug, description, payment_rate, payment_unit, category, image_url) VALUES
('LA', 'Machine Scrub Removal Area High Density', 'machine-scrub-removal-high', 'Remove high-density scrub using machinery to restore open habitat.', 2006.00, 'hectare', 'Scrub Removal', NULL),
('LA', 'Machine Scrub Removal Area Medium Density', 'machine-scrub-removal-medium', 'Clear medium-density scrub to maintain habitat quality.', 854.00, 'hectare', 'Scrub Removal', NULL),
('LA', 'Machine Scrub Removal Area Low Density', 'machine-scrub-removal-low', 'Remove scattered scrub to prevent habitat encroachment.', 360.00, 'hectare', 'Scrub Removal', NULL),
('LA', 'Hand Tools Scrub Removal High Density', 'hand-scrub-removal-high', 'Manual scrub removal in sensitive or inaccessible areas with high scrub density.', 14784.90, 'hectare', 'Scrub Removal', NULL),
('LA', 'New Vehicle Access Track Installation', 'new-vehicle-access-track', 'Install new access tracks to facilitate habitat management in remote areas.', 5.98, 'metre', 'Infrastructure', NULL),
('LA', 'Track Re-Surfacing Gravel', 'track-resurfacing-gravel', 'Resurface existing tracks with gravel to maintain access for management activities.', 2.99, 'metre', 'Infrastructure', NULL);

-- INFRASTRUCTURE
INSERT INTO public.eco_actions (type, title, slug, description, payment_rate, payment_unit, category, image_url) VALUES
('LA', 'Fencing Barbed Wire', 'fencing-barbed-wire', 'Install barbed wire fencing for livestock management in appropriate areas.', 2.60, 'metre', 'Infrastructure', NULL),
('LA', 'Fencing Sheep Wire', 'fencing-sheep-wire', 'Install sheep-proof wire fencing to manage grazing patterns.', 3.44, 'metre', 'Infrastructure', NULL),
('LA', 'Installation of Gates', 'installation-gates', 'Install gates to facilitate access and livestock management.', 185.61, 'gate', 'Infrastructure', NULL),
('LA', 'Installation of Heritage Gates', 'installation-heritage-gates', 'Install traditional heritage-style gates in keeping with local character.', 496.61, 'gate', 'Infrastructure', NULL),
('LA', 'Solar Pumps', 'solar-pumps', 'Install solar-powered water pumps to provide livestock water in remote areas.', 1852.50, 'pump', 'Infrastructure', NULL),
('LA', 'Water Storage Tanks', 'water-storage-tanks', 'Install water storage tanks to improve livestock water access.', 798.66, 'tank', 'Infrastructure', NULL),
('LA', 'Water Troughs', 'water-troughs', 'Install water troughs to provide livestock drinking water away from watercourses.', 290.66, 'trough', 'Infrastructure', NULL),
('LA', 'Culverts', 'culverts', 'Install culverts to manage water flow and maintain track access.', 476.22, 'culvert', 'Infrastructure', NULL);
import { PropertyCard } from "./PropertyCard";
import treehouseImage from "@/assets/property-treehouse.jpg";
import cabinImage from "@/assets/property-cabin.jpg";
import farmImage from "@/assets/property-farm.jpg";

const properties = [
  {
    id: 1,
    image: treehouseImage,
    title: "Forest Canopy Treehouse Retreat",
    location: "Pacific Northwest, USA",
    rating: 4.9,
    reviews: 127,
    price: 245,
    ecoFeatures: ["Small Woodland", "Wild Bird Cover", "Solar Power"],
    featured: true,
  },
  {
    id: 2,
    image: cabinImage,
    title: "Alpine Lake Eco Cabin",
    location: "Swiss Alps, Switzerland",
    rating: 4.8,
    reviews: 94,
    price: 320,
    ecoFeatures: ["Riparian Buffer", "Native Hedgerows", "Geothermal"],
    featured: true,
  },
  {
    id: 3,
    image: farmImage,
    title: "Wildflower Meadow Farmhouse",
    location: "Cotswolds, England",
    rating: 5.0,
    reviews: 156,
    price: 180,
    ecoFeatures: ["Wild Bird Cover", "Traditional Orchard", "Wind Energy"],
    featured: false,
  },
  {
    id: 4,
    image: treehouseImage,
    title: "Redwood Forest Sanctuary",
    location: "California, USA",
    rating: 4.9,
    reviews: 203,
    price: 275,
    ecoFeatures: ["Small Woodland", "Wetland Habitat", "Carbon Neutral"],
    featured: false,
  },
  {
    id: 5,
    image: cabinImage,
    title: "Nordic Fjord Hideaway",
    location: "Norway",
    rating: 4.7,
    reviews: 82,
    price: 290,
    ecoFeatures: ["Riparian Buffer", "Native Hedgerows", "Hydropower"],
    featured: false,
  },
  {
    id: 6,
    image: farmImage,
    title: "Organic Valley Homestead",
    location: "Tuscany, Italy",
    rating: 4.9,
    reviews: 145,
    price: 210,
    ecoFeatures: ["Traditional Orchard", "Native Hedgerows", "Solar Power"],
    featured: false,
  },
];

export const FeaturedProperties = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Eco-Properties
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hand-picked sustainable accommodations that prioritize environmental responsibility and comfort
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="px-8 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-[var(--transition-smooth)]">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
};

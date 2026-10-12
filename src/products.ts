// Product photos live in src/assets/products. Each photo has two files:
//   <slug>.jpg       full-size version, shown in the viewer
//   <slug>-card.jpg  lighter version, shown on the product cards
const files = import.meta.glob("./assets/products/*.jpg", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>

export function photo(slug: string, card = false): string {
  return files[`./assets/products/${slug}${card ? "-card" : ""}.jpg`] ?? ""
}

export const productCategories = [
  "Water pumps",
  "Power tools",
  "Engines & generators",
  "Construction equipment",
  "Welding machines",
  "Garden & farm",
  "Workshop & cleaning",
] as const

export type ProductCategory = (typeof productCategories)[number]

export type Product = {
  id: string
  name: string
  category: ProductCategory
  /** Photo slugs. The first one is the card image. */
  photos: string[]
  /** Where to centre the crop on the card, e.g. "50% 30%" */
  focus?: string
  note?: string
}

export const products: Product[] = [
  // Water pumps
  { id: "honda-pump", name: "Honda Petrol Water Pump", category: "Water pumps", photos: ["honda-petrol-water-pump"], note: "Engine-driven, frame mounted" },
  { id: "powermate-pump", name: "PowerMate Petrol Water Pump", category: "Water pumps", photos: ["powermate-petrol-water-pump"], note: "Engine-driven" },
  { id: "usk-ob60", name: "USK OB-60 Water Pump", category: "Water pumps", photos: ["usk-ob60-water-pump"], note: "Electric surface pump" },
  { id: "usk-submersible", name: "USK Submersible Pump", category: "Water pumps", photos: ["usk-submersible-pump-boxed", "usk-submersible-pump"], note: "Borehole / deep well" },
  { id: "dc-solar-pump", name: "DC Solar Water Pump", category: "Water pumps", photos: ["dc-solar-surface-pump"], note: "Surface pump for solar systems" },
  { id: "solar-submersible", name: "Solar Submersible Water Pump", category: "Water pumps", photos: ["solar-submersible-pump"], note: "Complete with cable" },

  // Power tools
  { id: "bosch-jigsaw", name: "Bosch GST 65 PBE Jigsaw", category: "Power tools", photos: ["bosch-gst65-jigsaw"], note: "With carry case" },
  { id: "dca-router", name: "DCA Router", category: "Power tools", photos: ["dca-router"], focus: "50% 35%" },
  { id: "makita-spray-gun", name: "Makita Cordless Spray Gun", category: "Power tools", photos: ["makita-cordless-spray-gun"], focus: "50% 35%", note: "With two batteries" },
  { id: "bench-drill", name: "Bench Drill Presses", category: "Power tools", photos: ["bench-drill-presses"], focus: "50% 40%", note: "Several sizes available" },
  { id: "laser-levels", name: "Laser Levels (4D, 16-line)", category: "Power tools", photos: ["laser-levels"], note: "Royce and Kzubr" },
  { id: "tool-range", name: "Grinders, Drills, Saws & More", category: "Power tools", photos: ["power-tools-wall"], focus: "50% 30%", note: "Wide range in store. Ask for your brand" },

  // Engines & generators
  { id: "tlac-generator", name: "TLAC TLD 6500W Diesel Welding Generator", category: "Engines & generators", photos: ["tlac-diesel-welding-generator"] },
  { id: "aico-diesel", name: "AICO Diesel Engine", category: "Engines & generators", photos: ["aico-diesel-engine"] },
  { id: "diesel-stationary", name: "Stationary Diesel Engine", category: "Engines & generators", photos: ["diesel-engine-stationary"], focus: "50% 40%", note: "For pumps and machinery" },

  // Construction equipment
  { id: "floor-saw", name: "Concrete Floor Saw", category: "Construction equipment", photos: ["concrete-floor-saw"], note: "Petrol powered" },
  { id: "power-trowel", name: "Power Trowel", category: "Construction equipment", photos: ["power-trowel-a", "power-trowel-b"], note: "Petrol, for concrete finishing" },
  { id: "road-roller", name: "AICO Walk-behind Road Roller", category: "Construction equipment", photos: ["aico-road-roller"], focus: "50% 55%" },
  { id: "aico-vibrator", name: "AICO Concrete Vibrator", category: "Construction equipment", photos: ["aico-concrete-vibrator"], note: "Petrol engine with poker" },
  { id: "windsor-vibrator", name: "Windsor Concrete Vibrator", category: "Construction equipment", photos: ["windsor-concrete-vibrator"], note: "Petrol engine with hose and poker" },

  // Welding machines
  { id: "mma400", name: "MMA-400 IGBT Welding Machine", category: "Welding machines", photos: ["mma400-welding-machine"], focus: "50% 30%" },
  { id: "makita-welder", name: "Makita Welding Machine (Inverter)", category: "Welding machines", photos: ["makita-welding-machine"], focus: "50% 35%" },
  { id: "welding-combos", name: "Welding Machine Combos (Makita, DeWalt, Royce)", category: "Welding machines", photos: ["welding-combos"], focus: "50% 40%", note: "Special combo offers. Ask for the current price" },
  { id: "zx7", name: "ZX7 IGBT Welding Machines", category: "Welding machines", photos: ["zx7-welding-machines"], note: "Several amperage ratings" },

  // Garden & farm
  { id: "chainsaw", name: "Husqvarna Chainsaw", category: "Garden & farm", photos: ["husqvarna-chainsaw-a", "husqvarna-chainsaw-b"], focus: "50% 45%" },
  { id: "lawn-mower", name: "Petrol Lawn Mower", category: "Garden & farm", photos: ["petrol-lawn-mower"], focus: "50% 40%" },
  { id: "fogger", name: "Thermal Fogger", category: "Garden & farm", photos: ["thermal-fogger"], note: "Complete with accessories" },
  { id: "chaff-green", name: "Chaff Cutter (Green)", category: "Garden & farm", photos: ["chaff-cutter-green"], focus: "50% 35%" },
  { id: "chaff-red", name: "Electric Chaff Cutter (Red)", category: "Garden & farm", photos: ["chaff-cutter-red"] },

  // Workshop & cleaning
  { id: "pressure-washers", name: "Pressure Washers", category: "Workshop & cleaning", photos: ["pressure-washers"], note: "Several models in stock" },
  { id: "wet-dry-vac", name: "Wet & Dry Vacuum Cleaner", category: "Workshop & cleaning", photos: ["wet-dry-vacuum"], note: "With cleaning attachments" },
  { id: "vacuum-sealer", name: "Commercial Vacuum Sealer", category: "Workshop & cleaning", photos: ["vacuum-sealer"], focus: "50% 55%" },
]

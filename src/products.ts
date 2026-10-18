// Product photos live in src/assets/products.
// Each product's `photos` entries are filenames WITHOUT the .jpg extension.
// If a "<slug>-card.jpg" exists it is used on the cards; otherwise the full photo is used.
const modules = import.meta.glob(
  "./assets/products/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, import: "default", query: "?url" },
) as Record<string, string>

// Index by lowercase filename without extension
const files: Record<string, string> = {}
for (const [path, url] of Object.entries(modules)) {
  const name = path.split("/").pop()!.replace(/\.[^.]+$/, "").toLowerCase()
  files[name] = url
}

export function photo(slug: string, card = false): string {
  const key = slug.toLowerCase()
  const full = files[key]
  const thumb = files[`${key}-card`]
  const url = card ? (thumb ?? full) : full
  if (!url && import.meta.env.DEV) {
    console.warn(`Missing photo: "${slug}"${card ? " (card)" : ""}`)
  }
  return url ?? ""
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
  /** Photo slugs (filename without .jpg). The first one is the card image. */
  photos: string[]
  /** Where to centre the crop on the card, e.g. "50% 30%" */
  focus?: string
  note?: string
}

export const products: Product[] = [
  // Water pumps
  { id: "honda-pump", name: "Honda Petrol Water Pump", category: "Water pumps", photos: ["honda-petrol-water-pump", "honda-petrol-water-pump-red"], note: "Engine-driven, frame mounted" },
  { id: "powermate-pump", name: "PowerMate Petrol Water Pump", category: "Water pumps", photos: ["powermate-petrol-water-pump"], note: "Engine-driven" },
  { id: "usk-qb60", name: "USK QB-60 Water Pump", category: "Water pumps", photos: ["usk-water-pump-qb60"], note: "Electric surface pump" },
  { id: "usk-submersible", name: "USK Submersible Pump", category: "Water pumps", photos: ["usk-submersible-pump", "usk-submersible-pump-stainless"], note: "Borehole / deep well" },
  { id: "edon-submersible", name: "Edon Submersible Pump", category: "Water pumps", photos: ["edon-submersible-pump"], note: "Borehole / deep well" },
  { id: "dc-solar-pump", name: "DC Solar Water Pump", category: "Water pumps", photos: ["dc-solar-pump"], note: "Surface pump for solar systems" },
  { id: "solar-submersible", name: "Solar Submersible Water Pump", category: "Water pumps", photos: ["solar-water-pump-submersible"], note: "Complete with cable" },
  { id: "red-diesel-pump", name: "Diesel Water Pump", category: "Water pumps", photos: ["red-diesel-water-pump"], note: "Engine-driven" },
  { id: "diesel-pump-trolley", name: "Diesel Engine Water Pump on Trolley", category: "Water pumps", photos: ["diesel-engine-water-pump-trolley"], note: "Easy to move around the site" },

  // Power tools
  { id: "bosch-jigsaw", name: "Bosch GST 65 PBE Jigsaw", category: "Power tools", photos: ["bosch-jigsaw-gst-65-pbe"], note: "With carry case" },
  { id: "green-jigsaw", name: "Electric Jigsaw", category: "Power tools", photos: ["green-electric-jigsaw-case"], note: "With carry case" },
  { id: "dca-router", name: "DCA Wood Router", category: "Power tools", photos: ["dca-wood-router"] },
  { id: "makita-router", name: "Makita Electric Router", category: "Power tools", photos: ["makita-electric-router"] },
  { id: "dca-circular-saw", name: "DCA 185mm Circular Saw", category: "Power tools", photos: ["dca-circular-saw-185mm", "dca-circular-saw-boxed"] },
  { id: "makita-circular-saw", name: "Makita Circular Saw", category: "Power tools", photos: ["makita-circular-saw"] },
  { id: "dca-planer", name: "DCA Electric Planer AMB82", category: "Power tools", photos: ["dca-electric-planer-amb82"] },
  { id: "maxmech-planer", name: "Maxmech Electric Planer EP500-82", category: "Power tools", photos: ["maxmech-electric-planer-ep500-82"] },
  { id: "makita-angle-grinder", name: "Makita Angle Grinder", category: "Power tools", photos: ["makita-angle-grinder"] },
  { id: "makita-sander", name: "Makita Random Orbit Sander 125mm", category: "Power tools", photos: ["makita-random-orbit-sander-125mm"] },
  { id: "total-drywall-sander", name: "Total Drywall Sander", category: "Power tools", photos: ["total-drywall-sander"] },
  { id: "makita-hammer-drill", name: "Makita HP1630 Hammer Drill", category: "Power tools", photos: ["makita-hammer-drill-hp1630"] },
  { id: "makita-hammer-drill-kit", name: "Makita Hammer Drill Tool Kit", category: "Power tools", photos: ["makita-hammer-drill-tool-kit-orange-handles"], note: "Kit with accessories" },
  { id: "royce-rotary-hammer", name: "Royce Rotary Hammer Drill Kit", category: "Power tools", photos: ["royce-rotary-hammer-drill-kit"] },
  { id: "royce-impact-drill", name: "Royce 21V Brushless Impact Drill", category: "Power tools", photos: ["royce-21v-brushless-impact-drill"], note: "Cordless" },
  { id: "makita-cordless-drill", name: "Makita Cordless Drill Set", category: "Power tools", photos: ["makita-cordless-drill-set-case"], note: "With case" },
  { id: "makita-drill-grinder-kit", name: "Makita Drill & Grinder Kit", category: "Power tools", photos: ["makita-drill-grinder-kit-blue-case"], note: "In blue case" },
  { id: "makita-drill-kit", name: "Makita Drill Tool Kit Set", category: "Power tools", photos: ["makita-drill-tool-kit-set"] },
  { id: "cordless-drill-kit", name: "Cordless Drill Tool Kit", category: "Power tools", photos: ["cordless-drill-tool-kit-blue-case"], note: "In blue case" },
  { id: "bench-drill", name: "Bench Drill Press", category: "Power tools", photos: ["bench-drill-press"], note: "Several sizes available" },
  { id: "makita-spray-gun", name: "Makita Cordless Spray Gun", category: "Power tools", photos: ["makita-cordless-spray-gun"] },
  { id: "dewalt-spray-gun", name: "DeWalt Cordless Spray Gun", category: "Power tools", photos: ["dewalt-cordless-spray-gun"] },
  { id: "cordless-spray-gun-21v", name: "21V Cordless Spray Gun", category: "Power tools", photos: ["cordless-spray-gun-21v-with-batteries"], note: "With batteries" },
  { id: "ibell-spray-gun", name: "iBell Spray Gun", category: "Power tools", photos: ["ibell-red-spray-gun"] },
  { id: "makita-paint-sprayer", name: "Makita PH-101 Paint Sprayer", category: "Power tools", photos: ["makita-paint-sprayer-ph-101"] },
  { id: "airless-sprayer", name: "Airless Paint Sprayer Machine", category: "Power tools", photos: ["airless-paint-sprayer-machine"] },
  { id: "laser-level", name: "Royce Kzubr Laser Level", category: "Power tools", photos: ["royce-kzubr-laser-level"] },
  { id: "hex-key-set", name: "Power Action Hex Key Set (9 pcs)", category: "Power tools", photos: ["power-action-hex-key-set-9pcs"] },
  { id: "chisel-bits", name: "Chisel Bits Set", category: "Power tools", photos: ["chisel-bits-set"] },
  { id: "armatures", name: "Power Tool Armatures", category: "Power tools", photos: ["power-tool-armatures-assorted"], note: "Assorted. Send us your tool model" },
  { id: "tool-range", name: "Grinders, Drills, Saws & More", category: "Power tools", photos: ["power-tools-assorted-display"], note: "Wide range in store. Ask for your brand" },

  // Engines & generators
  { id: "tlo-generator", name: "TLO 6500W Diesel Welding Generator", category: "Engines & generators", photos: ["tlo-6500w-diesel-welding-generator"] },
  { id: "windsor-generator", name: "Windsor WD6500E Diesel Generator", category: "Engines & generators", photos: ["windsor-wd6500e-diesel-generator"] },
  { id: "aicg-diesel", name: "AICG Diesel Engine", category: "Engines & generators", photos: ["aicg-diesel-engine-blue"] },
  { id: "aicg-petrol-engine", name: "AICG Petrol Engine", category: "Engines & generators", photos: ["aicg-petrol-engine"] },
  { id: "diesel-water-cooled", name: "Water-cooled Diesel Engine", category: "Engines & generators", photos: ["diesel-engine-water-cooled"], note: "For pumps and machinery" },

  // Construction equipment
  { id: "road-cutter", name: "Petrol Road & Concrete Cutter", category: "Construction equipment", photos: ["road-concrete-cutter-petrol"] },
  { id: "power-trowel", name: "Petrol Power Trowel", category: "Construction equipment", photos: ["power-trowel-petrol", "power-trowel-honda-engine"], note: "For concrete finishing" },
  { id: "single-roller", name: "AICG Single Drum Road Roller", category: "Construction equipment", photos: ["aicg-single-drum-road-roller"] },
  { id: "double-roller", name: "AICG Double Drum Road Roller", category: "Construction equipment", photos: ["aicg-double-drum-road-roller"] },
  { id: "aicg-plate-compactor", name: "AICG Petrol Plate Compactor", category: "Construction equipment", photos: ["aicg-plate-compactor-petrol"] },
  { id: "plate-compactors", name: "Plate Compactors", category: "Construction equipment", photos: ["plate-compactors-assorted"], note: "Several models available" },
  { id: "aicg-rammer", name: "AICG Tamping Rammer", category: "Construction equipment", photos: ["aicg-tamping-rammer-yellow"] },
  { id: "honda-rammer", name: "Tamping Rammer (Honda Engine)", category: "Construction equipment", photos: ["tamping-rammer-orange-honda-engine"] },
  { id: "aicg-vibrator", name: "AICG Petrol Concrete Vibrator", category: "Construction equipment", photos: ["aicg-petrol-concrete-vibrator"] },
  { id: "vibrator-orange", name: "Petrol Concrete Vibrator (Orange Engine)", category: "Construction equipment", photos: ["petrol-concrete-vibrator-orange-engine"] },
  { id: "vibrator-red", name: "Petrol Concrete Vibrator (Red)", category: "Construction equipment", photos: ["petrol-concrete-vibrator-red"] },
  { id: "mixer-orange", name: "Concrete Mixer (Orange)", category: "Construction equipment", photos: ["concrete-mixer-orange"] },
  { id: "mixer-teal", name: "Concrete Mixer (Teal)", category: "Construction equipment", photos: ["concrete-mixer-teal"] },
  { id: "block-machine", name: "Concrete Block Making Machine", category: "Construction equipment", photos: ["concrete-block-making-machine"] },

  // Welding machines
  { id: "mma400", name: "MMA-400 IGBT Welding Machine", category: "Welding machines", photos: ["igbt-mma-400-welding-machine"] },
  { id: "zx7", name: "ZX7 IGBT Welding Machines", category: "Welding machines", photos: ["igbt-zx7-welding-machines"], note: "Several amperage ratings" },
  { id: "yellow-igbt", name: "IGBT Welding Machine (Yellow)", category: "Welding machines", photos: ["yellow-igbt-welding-machine"] },
  { id: "makita-welder", name: "Makita Welding Machine", category: "Welding machines", photos: ["makita-welding-machine"] },
  { id: "makita-inverter-welder", name: "Makita Inverter Welding Machine", category: "Welding machines", photos: ["makita-inverter-welding-machine-boxed"], note: "Boxed" },
  { id: "dewalt-welder", name: "DeWalt Digital Welding Machine MT-950", category: "Welding machines", photos: ["dewalt-digital-welding-machine-mt-950", "dewalt-welding-machine-boxed"] },
  { id: "royce-welder", name: "Royce MMA Welding Machine Set", category: "Welding machines", photos: ["royce-mma-welding-machine-set"] },
  { id: "edon-welder", name: "Edon Smart Inverter Welder", category: "Welding machines", photos: ["edon-smart-welder-inverter"] },
  { id: "welding-combos", name: "Welding Machine Combos (Makita, DeWalt, Royce)", category: "Welding machines", photos: ["welding-discounts-combo-makita-dewalt-royce"], note: "Special combo offers. Ask for the current price" },

  // Garden & farm
  { id: "chainsaw", name: "Husqvarna Chainsaw", category: "Garden & farm", photos: ["husqvarna-chainsaw", "husqvarna-chainsaw-orange", "husqvarna-chainsaws-stock"] },
  { id: "orange-chainsaw", name: "Petrol Chainsaw", category: "Garden & farm", photos: ["orange-petrol-chainsaw"] },
  { id: "lawn-mower", name: "Petrol Lawn Mower", category: "Garden & farm", photos: ["petrol-lawn-mower"] },
  { id: "lithium-mower", name: "Lithium Cordless Lawn Mower / Trimmer", category: "Garden & farm", photos: ["lithium-cordless-lawn-mower-trimmer"] },
  { id: "brush-cutter", name: "Petrol Brush Cutter with Tiller Attachments", category: "Garden & farm", photos: ["petrol-brush-cutter-tiller-attachments"] },
  { id: "power-tiller", name: "Multipurpose Power Tiller / Harvester", category: "Garden & farm", photos: ["red-multipurpose-power-tiller-harvester"] },
  { id: "knapsack-sprayer", name: "Windsor Petrol Knapsack Sprayer", category: "Garden & farm", photos: ["windsor-petrol-knapsack-sprayer"] },
  { id: "fogger", name: "Thermal Fogging Machine", category: "Garden & farm", photos: ["thermal-fogging-machine"] },
  { id: "sprinklers", name: "Garden Rotary Sprinklers", category: "Garden & farm", photos: ["garden-rotary-sprinklers"] },
  { id: "chaff-green", name: "Chaff Cutter (Green)", category: "Garden & farm", photos: ["green-chaff-cutter"] },
  { id: "chaff-red", name: "Chaff Cutter (Red)", category: "Garden & farm", photos: ["red-chaff-cutter"] },
  { id: "hammer-mill", name: "Maize Grinder / Hammer Mill", category: "Garden & farm", photos: ["green-maize-grinder-hammer-mill"] },
  { id: "pellet-machines", name: "Animal Feed Pellet Machines", category: "Garden & farm", photos: ["animal-feed-pellet-machines"] },

  // Workshop & cleaning
  { id: "pressure-washers", name: "High Pressure Washers", category: "Workshop & cleaning", photos: ["high-pressure-washers-assorted"], note: "Several models in stock" },
  { id: "car-washers", name: "High Pressure Car Washers", category: "Workshop & cleaning", photos: ["high-pressure-car-washers"] },
  { id: "maxdow-washer", name: "Maxdow Petrol High Pressure Washer", category: "Workshop & cleaning", photos: ["maxdow-petrol-high-pressure-washer"] },
  { id: "wet-dry-vac", name: "Wet & Dry Vacuum Cleaner", category: "Workshop & cleaning", photos: ["wet-and-dry-vacuum-cleaner"] },
  { id: "vacuum-sealer", name: "Vacuum Sealing Machine", category: "Workshop & cleaning", photos: ["vacuum-sealing-machine"] },
  { id: "floor-polisher", name: "Floor Polisher / Scrubber Machine", category: "Workshop & cleaning", photos: ["floor-polisher-scrubber-machine"] },
  { id: "floor-jacks", name: "Hydraulic Floor Jacks", category: "Workshop & cleaning", photos: ["hydraulic-floor-jacks-assorted"], note: "Assorted sizes" },
  { id: "tyre-changer", name: "Roadbuck Tyre Changer Machine", category: "Workshop & cleaning", photos: ["roadbuck-tyre-changer-machine"] },
]
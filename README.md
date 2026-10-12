# Chedutech Enterprises website

Product showcase and price-enquiry site for Chedutech Enterprises, River Road, Nairobi.
Dealers in power tools, water pumps, engines, construction and welding equipment, and spare parts.

Customers browse the product photos, tap **Ask for price**, and the enquiry is sent to the
shop's WhatsApp. No prices are shown on the site.

**Stack:** React 19, Vite 8, Tailwind CSS 4, TypeScript.

## Run it

```bash
npm install        # or: pnpm install
npm run dev        # local development server
npm run build      # production build into dist/
npm run preview    # serve the built dist/ locally
```

Deploy the contents of `dist/` to any static host.

## Project layout

| Path | What it is |
| --- | --- |
| `src/App.tsx` | The whole page: header, hero, product gallery, enquiry form, contact, footer |
| `src/products.ts` | **The product list.** Names, categories, notes and which photos each product uses |
| `src/assets/products/` | Product photos (see below) |
| `src/index.css` | All styling |
| `public/favicon.svg` | Company logo. Used as the browser-tab icon and in the header and footer |
| `public/og-image.png` | Image shown when the link is shared |
| `.figma/make/site.json` | Page title, description and icon settings |

## Managing products

All products live in `src/products.ts`. Each one looks like this:

```ts
{
  id: "usk-ob60",                       // unique, no spaces
  name: "USK OB-60 Water Pump",         // shown on the card
  category: "Water pumps",              // must be one of the categories at the top of the file
  photos: ["usk-ob60-water-pump"],      // photo file names, without .jpg. First one is the card image
  focus: "50% 35%",                     // optional: which part of the photo the card crop centres on
  note: "Electric surface pump",        // optional: short line under the name
}
```

### Add a product

1. Put two files in `src/assets/products/`:
   - `my-product.jpg`: the full-size photo, shown in the viewer. Use the sharpest image you have.
   - `my-product-card.jpg`: a lighter copy, about 900 px on the long side, used on the grid.
2. Add an entry to `src/products.ts` with `photos: ["my-product"]`.
3. Run `npm run build`.

A product can have several photos (`photos: ["a", "b"]`). The viewer shows thumbnails for them.

### Add or rename a category

Edit the `productCategories` list at the top of `src/products.ts`. The filter buttons and the
enquiry form's dropdown follow it automatically.

### Photo quality

The supplied photos came through WhatsApp, so they are compressed (mostly 700 to 1,600 px).
The smallest ones were enlarged and sharpened slightly but will still look soft at full size.
Replace any photo with the original camera file, keeping the same file name, for a sharper result.

## Things to set before launch

- **TikTok and Facebook links** (`TIKTOK_URL`, `FACEBOOK_URL` near the top of `src/App.tsx`).
  Both currently open a search for "Edwin Osundwa". Replace them with the direct profile links.
- **Instagram link** (`INSTAGRAM_URL`, same place). Still a placeholder.
- **Product names and notes** were taken from the photos. Check them and add specifications
  where useful.
- **"Welding Machine Combos" card** uses a promotional flyer that says "50% discount".
  Remove that product from `src/products.ts` when the offer ends.

## Contact details used on the site

- Phones: 0707 807 422, 0737 918 217
- WhatsApp number: 254707807422 (change `whatsapp()` in `src/App.tsx` to use another number)
- Address: River Road, Nairobi
# chedutech-site.

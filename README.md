# So Familiar Candles

Website for So Familiar Candle Co., hand-poured soy candles made to order.

- `public/index.html`: shop with collections, the "Make it yours" label designer, and the order form
- `public/craft.html`: how a candle is made, step by step
- `public/app.js`: products, sizes, prices and order handling (edit `PRODUCTS`, `SIZES` and `ORDER_EMAIL` at the top)
- `public/img/`: product photos; candle-making photos are from Pexels (free for commercial use)

Deploys to Cloudflare Workers as a static site (`wrangler.jsonc` serves the `public/` folder). Deploy command: `npx wrangler deploy`, no build command.

# HIPZ — dima s7ab

Bilingual French/Arabic campaign presentation site built with React, TypeScript and Vite.

## Local development and deployment

- `pnpm --filter @workspace/hipz-brand-site dev` starts Vite.
- `pnpm --filter @workspace/hipz-brand-site build` creates the static production bundle in `dist/`.
- `pnpm --filter @workspace/hipz-brand-site typecheck` runs TypeScript checks.
- Deploy the contents of `dist/` to Vercel or another static host. cPanel hosting works when it can serve the Vite output and preserve the `/assets/` paths.

## Content and asset notes

The provided logo, full campaign collage, wide duo campaign, Lemon and Peach campaign visuals, duo front/back product imagery, and lifestyle image are in `public/assets/`. The collage intentionally stays a single complete visual; its panels are not represented as separate image files. Flavor visuals and gallery imagery use the individual supplied images without cropping packaging into fabricated product views. Replace those files only with approved official assets, retaining the existing filenames or updating the references in `src/App.tsx`.

Flavor descriptions and brand-universe text are editable campaign draft copy, not product or company facts. The phone numbers and Instagram/TikTok profile links were supplied for publication. Before launch, the brand owner should still provide the legal company name, approved company introduction, location, distribution details, and any approved product descriptions.

## Contact form integration

The contact form validates locally and explicitly reports that it is a demo; it does not transmit or store submissions. To enable real submissions, configure an approved backend endpoint or email service, add server-side validation and spam protection, and connect the form submit handler in `src/App.tsx`. Do not replace the demo feedback with a delivery confirmation until the service confirms successful delivery.

# Visual assets

## Tidy mascot

- File: `public/tidy-mascot.png`
- Created specifically for this prototype using the built-in OpenAI image-generation tool.
- Original PNG, 1280 × 1280 pixels, with transparency.
- Animated in the interface without altering the original image. There is no external API dependency at runtime.

### Generation prompt

Use case: stylized-concept. Asset type: transparent PNG mascot for a premium residential cleaning website called TidyUp! Midland. Create ONE original endearing high-end 3D character, full body centered with generous clear padding. Subject: a rounded pearl-white and translucent pale sage water droplet creature, plump soft triangular droplet silhouette, two deep forest-green glossy oval eyes with tiny catchlights, gentle warm little smile, subtle peach cheek tint, little rounded hands and feet. A tiny elegant four-point lime-green sparkle sits on the top tip. One hand raised in a friendly welcoming wave; other hand holds a small folded sage microfiber cloth. Clean design, sophisticated, premium Pixar-like product render with glassy silicone and ceramic materials, soft subsurface scattering, physically convincing dimensional highlights and ambient occlusion. Palette pearl ivory, sage mint #bad2ba, forest green #173f35, faint warm champagne accents. Three-quarter front view, friendly eye contact. Transparent background with real alpha, no floor plane, no environment, no cast shadow outside the character, no extra objects, no words, no logo, no lettering, no frame, no watermark. Crisp silhouette readable when rendered at 80 pixels. Character itself fills about 75 percent of square canvas.

## Photography

The images are editorial illustrations of residential interiors, not representations of work performed by TidyUp!.

1. Living room — [Point3D Commercial Imaging Ltd. on Unsplash](https://unsplash.com/photos/0BTn_jX0roU), free under the Unsplash License. Image identifier: `photo-1630699295509-a199b5370538`.
2. Bedroom — [Spacejoy on Unsplash](https://unsplash.com/photos/white-bed-linen-with-white-pillow-vOa-PSimwg4), free under the Unsplash License. Image identifier: `photo-1618221118493-9cfa1a1c00da`.

Remote photos are served through Next.js image optimization. Their source pages and license statements were checked during implementation.

## Typography and icons

- DM Sans and Cormorant Garamond, loaded with `next/font/google` and self-hosted in the build.
- Lucide icons via `lucide-react`.
- Original SVG favicon matching the mascot palette.

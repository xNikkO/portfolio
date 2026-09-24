# Portrait with updated hairstyle

Generated with the built-in `image_gen` tool. Optimized asset: `public/portraits/nikodem-illustrated-v2.webp`.

The first illustrated portrait is the base. The second illustration, derived from the user's newer photo, supplies only the hairstyle. The published asset is WebP; the original PNG is not retained in this repository.

## Final prompt

Use case: precise-object-edit / identity-preserve.
Edit target is INPUT 1, the first generated black-and-white illustrated portrait of Nikodem in a plain black crew-neck T-shirt. INPUT 2, the newer illustration with a jacket, is ONLY a reference for the replacement HAIRSTYLE.
Change ONLY the hair on the head of INPUT 1 to match the hair in INPUT 2: shorter, lower-volume wavy fringe, loose separated locks resting across the forehead, and closely trimmed sides. Match the shape, hairline, length and strand direction of INPUT 2's hairstyle, while rendering it in INPUT 1's bold simple black-ink illustration style.
Strict invariants: preserve INPUT 1's face, eye shapes, eyebrows, nose, subtle closed-mouth smile, moustache, short beard, ears, neck, plain black crew-neck T-SHIRT, shoulders, bust outline, body proportions, drawing line weight, framing, scale and position. Do NOT use the jacket, zipper, white shoulder panels, facial proportions, or facial linework of INPUT 2. Everything should be the same as INPUT 1 except the hairstyle. Preserve the same friendly expression without adding teeth.
Keep genuinely transparent background around the bust and opaque white face and highlights. Same square composition, no text, no extra objects, no card layout, no background scenery. Output only the completed portrait.

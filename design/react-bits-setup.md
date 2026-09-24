# React Bits integration

Aurora is adapted from the supplied React Bits source and used for the main page backdrop. Its grayscale palette follows the selected theme. The original Grainient remains inside the contact card. Both renderers support reduced motion, pause when offscreen or hidden, and keep a CSS fallback for browsers without WebGL 2.

Grainient is adapted from the source supplied for this portfolio. It uses the existing `ogl` dependency, a neutral palette, theme-aware rendering, a CSS fallback, and reduced-motion support. It pauses outside the viewport and when the tab is hidden, and releases WebGL resources on unmount.

`components/ui/staggered-greeting.tsx` is an original local word-reveal animation. It is not the React Bits Pro Staggered Text component. The requested CLI installation was attempted but could not proceed because `REACTBITS_LICENSE_KEY` was unavailable.

The official Starter and Pro registries are configured in `components.json`. To install the licensed component, add `REACTBITS_LICENSE_KEY` to `.env.local` (ignored by Git), then run from the repository root:

```sh
npx shadcn@latest add @reactbits-starter/staggered-text-tw
```

Replace the local greeting with the installed component, using `Hey, I'm Nikodem`, word segmentation, upward reveal, and reduced-motion support.

- Installation: https://pro.reactbits.dev/docs/installation
- Component: https://pro.reactbits.dev/docs/components/staggered-text

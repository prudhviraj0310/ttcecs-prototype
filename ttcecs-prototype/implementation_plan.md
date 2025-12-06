# Professional Redesign Implementation Plan

## Goal
Enhance the visual appeal of the website to make it look more professional, corporate, and premium. This involves refining the color palette, simplifying animations, and cleaning up the layout of key components.

## User Review Required
> [!IMPORTANT]
> I will be modifying the `tailwind.config.cjs` and `styles/globals.css` which will affect the entire site. I am moving away from the "rainbow" aesthetic to a more refined "corporate fintech" look.

## Proposed Changes

### Configuration & Global Styles
#### [MODIFY] [tailwind.config.cjs](file:///Users/prudhviraj/xyz/ttcecs-prototype/ttcecs-prototype/tailwind.config.cjs)
- Add `brand-navy` and `brand-gold` colors.
- Refine the `gradient-primary` to be more subtle.

#### [MODIFY] [globals.css](file:///Users/prudhviraj/xyz/ttcecs-prototype/ttcecs-prototype/styles/globals.css)
- Update `glass` class for a more premium look (higher blur, lower opacity).
- Remove `bg-gradient-rainbow` and replace with a professional gradient.
- Refine scrollbar styles.

### Components
#### [MODIFY] [Header.js](file:///Users/prudhviraj/xyz/ttcecs-prototype/ttcecs-prototype/components/Header.js)
- Remove rainbow underline.
- Replace text font-size toggle with icons.
- Update "Become a Member" button style.
- Improve mobile menu styling.

#### [MODIFY] [Hero3D.js](file:///Users/prudhviraj/xyz/ttcecs-prototype/ttcecs-prototype/components/Hero3D.js)
- Remove spinning decorative elements.
- Simplify the ROI card design (remove rainbow border).
- Clean up the background overlay.
- Standardize CTA buttons.

#### [MODIFY] [Footer.js](file:///Users/prudhviraj/xyz/ttcecs-prototype/ttcecs-prototype/components/Footer.js)
- Add a solid background color (light gray / dark navy).
- Improve spacing and typography for better readability.

## Verification Plan
### Manual Verification
- Check the Homepage to ensure the new Hero section looks clean and professional.
- Verify the Header looks good on both desktop and mobile.
- Check the Footer for proper spacing and background.
- Ensure the "Dark Mode" still looks good with the new palette.

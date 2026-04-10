# Implementation Plan - Website Metadata & SEO Optimization

This document outlines the plan to replace default "Bolt previews" and basic metadata with a robust, professional SEO and social media configuration for Fix Roofing LLC, including a high-quality snapshot of the live site.

## 1. Objectives
- Replace default Bolt URL previews with branded Fix Roofing content.
- Implement comprehensive Open Graph (OG) and Twitter metadata.
- Generate and configure a high-quality website snapshot for social sharing.
- Optimize the `logo.png` usage for favicon and social icons.

## 2. Phase 1: Asset Preparation
### 2.1 Website Snapshot (OG Image)
- **Task**: Capture a high-resolution screenshot of the landing page hero section.
- **Tool**: Use `browser_subagent` to render the local dev server and capture the viewport.
- **Output**: `public/og-main.png` (Recommended size: 1200x630 pixels).

### 2.2 Branded Assets
- **Logo Optimization**: Use @[/Users/jafar/Desktop/WEB LANDING SALES FUNNEL PORMPTING/santoswebsite/santoswebsite/public/logo.png] as the source for:
    - Favicon (via `favicon.ico`).
    - Apple Touch Icon.
- **Branding**: Ensure the snapshot captures the premium aesthetics (glassmorphism, clean typography) to "WOW" viewers on social media.

## 3. Phase 2: Metadata Implementation
### 3.1 Global Metadata Configuration
Modify `src/app/layout.tsx` to include the following:
- **Basic SEO**:
    - `title`: Fix Roofing LLC | Tampa's #1 Premium Roofing
    - `description`: Expert roofing solutions in Tampa. Specialized in repairs, replacements, and storm damage. Get your free inspection today.
- **Open Graph (OG)**:
    - `type`: website
    - `url`: [Site URL]
    - `title`: Fix Roofing LLC - Premium Roofing Services in Tampa
    - `description`: High-performance roofing solutions with localized expertise.
    - `images`: Reference `/og-main.png`.
- **Twitter Card**:
    - `card`: summary_large_image
    - `title`: Fix Roofing LLC | Premium Tampa Roofing
    - `images`: Reference `/og-main.png`.
- **Alternate Icons**:
    - `icon`: `/favicon.ico`
    - `apple`: `/apple-touch-icon.png` (to be generated).

### 3.2 Local SEO (JSON-LD)
- Add `Schema.org` script to `layout.tsx` for `RoofingContractor` type.
- Include: Name, Logo, URL, Contact Points, Area Served (Tampa, FL), and License Number (CCC1336136).

## 4. Phase 3: Verification
- **Local Validation**: Inspect `<head>` tags in the browser to ensure all meta tags are populated correctly.
- **Preview Emulation**: Use internal tools to verify how the snapshot looks in a card format.

## 5. Next Steps
1. **User Approval**: Review this plan.
2. **Execution**: I will proceed with generating the snapshot and updating the metadata once approved.

# Portable Roofing Home Page Template

This folder contains everything you need to replicate the home page in another Next.js project.

## How to use:

1. **Paste Files**: 
   - Copy the `components`, `lib`, `hooks`, and `public` folders into your new project's root.
   - Replace your `app/page.tsx` with the one in this folder (or rename it if you already have a home page).

2. **Install Dependencies**:
   Run the following command in your new project to ensure all animations and icons work:
   ```bash
   npm install lucide-react framer-motion clsx tailwind-merge
   ```

3. **Tailwind Config**:
   If your buttons or colors look off, check the `tailwind.config.ts` in this folder. You may need to copy the `theme.extend.colors` section into your new project's tailwind config:
   - `premiumAccent`
   - `trustBlue`
   - etc.

4. **Styles**:
   Ensure you have the scroll animation CSS. Add this to your `globals.css`:
   ```css
   .animate-on-scroll {
     opacity: 0;
     transform: translateY(20px);
     transition: all 0.6s ease-out;
   }

   .animate-on-scroll.is-visible {
     opacity: 1;
     transform: translateY(0);
   }

   .stagger-1 { transition-delay: 0.1s; }
   .stagger-2 { transition-delay: 0.2s; }
   .stagger-3 { transition-delay: 0.3s; }
   ```

5. **Assets**:
   Make sure the images in `public/` are correctly referenced. The Hero section uses `/hero backgorund.jpg`.

## Notes:
- This uses **Next.js App Router**.
- It assumes you are using **Tailwind CSS**.
- The forms depend on `LeadFormModal` and `UniversalLeadFormInner`. Ensure those are functional in your new environment (e.g., check API routes if you have them).

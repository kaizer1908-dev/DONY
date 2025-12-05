# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains custom footer components and a complete e-commerce page layout for the AFTER DAWN brand, designed for integration with Cafe24 (Korean e-commerce platform). The project is in Korean (한국어) and uses the Pretendard font family.

## Architecture

### Core Components

1. **Footer Component** (Production-ready)
   - [footer.html](footer.html) - Cafe24 production version with template variables
   - [footer.css](footer.css) - Standalone stylesheet with `custom-` prefixed classes
   - [footer-preview.html](footer-preview.html) - Local preview version with embedded styles

2. **Main Page Template**
   - [afterdawn_test_v2.html](afterdawn_test_v2.html) - Complete page layout with sections for banner, SNS content, products, reviews, and footer

### Design System

**CSS Class Naming Convention:**
- All production classes use `custom-` prefix to prevent conflicts with Cafe24's default styles
- Example: `.custom-footer`, `.custom-social-link`, `.custom-footer-content`

**Layout Structure:**
```
Footer Layout (3-column flexbox):
├── Left: Logo + Social Links (380px fixed width)
├── Center: COMPANY accordion section
└── Right: 3 info columns (TERMS, CUSTOMER CENTER, CONTACT)
```

**Responsive Breakpoints:**
- Desktop: Default (1200px max-width container)
- Tablet: 1024px and below
- Mobile: 768px and below
- Small Mobile: 480px and below

### Cafe24 Integration

**Template Variables Used:**
- `{$company_name}` - Company name
- `{$president_name}` - President/CEO name
- `{$company_regno}` - Business registration number
- `{$mall_zipcode}`, `{$mall_addr1}`, `{$mall_addr2}` - Address components
- `{$network_regno}` - E-commerce registration number

**File Upload Paths:**
- Logo: `/web/upload/logo.png`
- CSS: `/web/upload/footer.css`
- Footer HTML: Replace content in `layout/footer.html`

## Key Features

### Footer Component

1. **Accordion Functionality**
   - COMPANY section toggles open/closed on click
   - JavaScript wrapped in IIFE to prevent conflicts
   - CSS transitions for smooth animations

2. **Social Media Links**
   - Two-line text structure: platform name + brand handle
   - Instagram and KakaoTalk with inline SVG icons
   - Both icons aligned to left with `.custom-social-left` class

3. **Responsive Design**
   - Desktop: Horizontal 3-column layout
   - Mobile: Stacked vertical layout
   - Logo scales from 60px (desktop) to 40px (mobile)

### Page Layout (afterdawn_test_v2.html)

1. **Banner Section** - PC/Mobile responsive Swiper banners
2. **SNS Content Grid** - 4 columns (PC) / 3 columns (mobile) for Instagram/YouTube embeds
3. **Product Display** - Sticky left banner + scrollable 2-column product grid
4. **Review Section** - 4×2 grid of customer reviews
5. **Footer** - Integrated footer component

## Preview Files

To preview the footer locally:
1. Open [footer-preview.html](footer-preview.html) in a browser
2. Logo uses inline SVG placeholder (replace with actual PNG in production)
3. All styles are self-contained for easy testing

## Documentation

- **[README-footer.md](README-footer.md)** - Quick integration guide (Korean)
- **[INTEGRATION-GUIDE.md](INTEGRATION-GUIDE.md)** - Detailed step-by-step integration instructions (Korean)

## Important Notes

1. **Font Loading:** Pretendard font loaded via CDN from jsdelivr
2. **JavaScript Isolation:** All JavaScript uses IIFEs or explicit null checks to prevent conflicts
3. **CSS Specificity:** Use `custom-` prefix for all new classes to avoid Cafe24 style conflicts
4. **Image Paths:** Production uses `/web/upload/` for Cafe24, preview uses inline SVG/data URIs
5. **Links:** Update placeholder `#` links with actual URLs before deployment

## Common Modifications

### Adjusting Logo Size
In [footer.css](footer.css:41-45):
```css
.custom-footer-logo img {
    height: 60px; /* Change this value */
    width: auto;
    max-width: 100%;
}
```

### Changing Layout Spacing
In [footer.css](footer.css:21-26):
```css
.custom-footer-content {
    gap: 40px; /* Adjust spacing between sections */
}
```

### Updating Social Links
In [footer.html](footer.html:12-25), replace `href="#"` with actual URLs:
- Instagram: `https://instagram.com/your_account`
- KakaoTalk: `https://pf.kakao.com/_your_channel_id`

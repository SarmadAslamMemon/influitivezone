# Portfolio Images Organization Guide

## Current Setup

**Currently all portfolio pages are using the same placeholder images** from:
- `1.jpg` through `7.jpg` in `/public/assets/imgs/portfolio/detail/`

This allows the pages to work immediately while you prepare service-specific images.

## Image Folder Structure (For Future Customization)

When you're ready to add unique images for each service, create these files in your `public/assets/imgs/portfolio/detail/` directory:

### For Web & Mobile Development Portfolio:
- `web-mobile-1.jpg` - Main hero image showcasing web/mobile development
- `web-mobile-2.jpg` - Development process or code screenshot
- `web-mobile-3.jpg` - Web application interface
- `web-mobile-4.jpg` - Mobile application interface
- `web-mobile-5.jpg` - Full project showcase or dashboard
- `web-mobile-6.jpg` - Responsive design examples
- `web-mobile-7.jpg` - Technology stack or final results

### For Digital Marketing Portfolio:
- `marketing-1.jpg` - Main hero image for marketing campaigns
- `marketing-2.jpg` - Marketing strategy visualization
- `marketing-3.jpg` - SEO/Analytics dashboard
- `marketing-4.jpg` - Social media campaign results
- `marketing-5.jpg` - Marketing performance metrics
- `marketing-6.jpg` - Campaign analytics
- `marketing-7.jpg` - ROI or conversion results

### Image Requirements:
- **Recommended dimensions**: 1200x800px (3:2 aspect ratio)
- **Format**: JPG or PNG
- **File size**: Keep under 500KB for optimal loading
- **Quality**: High resolution for crisp display

### Image Content Suggestions:

#### Web & Mobile Development:
1. **Hero Image**: Clean mockup of website/app on multiple devices
2. **Process**: Code editor, wireframes, or development workflow
3. **Web Interface**: Beautiful website interface screenshot
4. **Mobile Interface**: Mobile app interface on phone mockup
5. **Showcase**: Full project overview or dashboard
6. **Responsive**: Same interface on different screen sizes
7. **Tech Stack**: Icons or logos of technologies used

#### Digital Marketing:
1. **Hero Image**: Marketing campaign visuals or brand materials
2. **Strategy**: Marketing funnel, strategy diagram, or planning
3. **SEO Dashboard**: Google Analytics or search ranking results
4. **Social Media**: Instagram, Facebook, or social campaign results
5. **Metrics**: Charts, graphs, or performance dashboards
6. **Analytics**: Detailed campaign analytics and insights
7. **Results**: ROI, conversions, or success metrics

## How to Add Custom Images (Optional):

**Option 1: Keep using shared images (current setup)**
- All portfolio pages will continue using the same images
- No additional work needed
- Pages are fully functional now

**Option 2: Add service-specific images**
1. **Prepare your images** according to the specifications above
2. **Name them correctly** using the naming convention provided
3. **Update the import statements** in the component files:
   - Change `Detail1 from "../../../public/assets/imgs/portfolio/detail/1.jpg"` 
   - To `Detail1 from "../../../public/assets/imgs/portfolio/detail/web-mobile-1.jpg"`
4. **Place the images** in `/public/assets/imgs/portfolio/detail/` folder
5. **Test the pages** to ensure images load correctly

## Navigation Between Pages:

The portfolio pages are now interconnected:
- **Graphic Design** → **Web & Mobile Development** → **Digital Marketing** → **Graphic Design** (circular navigation)

Each page has "Prev Work" and "Next Work" buttons for easy navigation between different service portfolios.

## URL Structure:

- Graphic Design: `/portfolio-details-graphic-dark`
- Web & Mobile Development: `/portfolio-details-mobile-dark`
- Digital Marketing: `/portfolio-details-marketing-dark`
- Original (redirects to Graphic): `/portfolio-details-dark`
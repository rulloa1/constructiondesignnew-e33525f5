# constructiondesignnew - Project Status

## Overview
Construction design portfolio website with extensive project galleries.

## Development Status
- **Status**: 🔄 Active Development
- **Last Updated**: December 13, 2025
- **Active Branch**: main
- **Latest Commit**: beede96 - Visual edit in Lovable

## Deployment
- **Platform**: Vercel
- **Repository**: https://github.com/rulloa1/constructiondesignnew-e33525f5
- **Last Deployment**: December 13, 2025

## Technology Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Database**: Supabase
- **UI Library**: shadcn/ui (Radix UI components)
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **Forms**: React Hook Form + Zod
- **Package Manager**: npm

## Key Features
- Project portfolio with extensive image galleries
- Pool design showcase
- Development projects gallery
- Contact forms
- Admin functionality
- Database-backed content

## Development Setup

### Prerequisites
- Node.js 18+
- Supabase account and project

### Installation
```bash
cd C:\Users\roryu\Projects\active\constructiondesignnew
npm install
```

### Environment Variables
Create a `.env` file with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## Project Structure
- `src/` - Application source code
  - `assets/` - Images and videos (1+ GB)
  - `components/` - React components
  - `data/` - Static data files
  - `pages/` - Page components
- `public/` - Public static files
- `supabase/` - Database schema and migrations
- `scripts/` - Utility scripts (favicon generation, image processing)

## Asset Optimization Needed ⚠️

### Current State
- **Total Assets**: ~1.1 GB
- **Images**: 1,080 MB (mostly JPG)
- **Videos**: 15 MB (MP4/MOV)

### Recommended Actions
1. **Convert images to WebP**: Potential 30-50% size reduction
2. **Implement lazy loading**: Improve initial page load
3. **Consider CDN**: Use Cloudinary or Imgix for on-the-fly optimization
4. **Large files identified** (>5MB each):
   - hero-video.mp4 (10 MB)
   - development-3.jpg (7.5 MB)
   - Multiple pool-design-*.jpg files (5-7 MB each)

### Optimization Script Available
```bash
npm run generate-favicons  # For favicon generation
# Consider adding: npm run optimize-images
```

## Known Issues
- Large asset files need optimization
- Some uncommitted changes in project data
- Nested duplicate folder was removed (saved 1.35 GB)

## Performance Considerations
- Initial load time affected by large images
- Consider implementing progressive image loading
- Evaluate Git LFS for large binary assets

## Maintenance
- Monitor asset sizes when adding new projects
- Regular Supabase backup recommended
- Update dependencies quarterly

## Recent Cleanup
- ✅ Removed nested duplicate folder (saved 1.35 GB)
- ✅ Removed node_modules (can be reinstalled)
- ✅ Moved to organized project structure

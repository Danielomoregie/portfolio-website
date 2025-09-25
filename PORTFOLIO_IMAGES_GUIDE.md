# Portfolio Images Setup Guide

This guide will help you add images to your portfolio's "My Work" section.

## 📁 Image Files Needed

You need to add the following image files to the `assets/` folder:

### 1. YouTube Channel Thumbnail
- **File**: `assets/youtube-thumbnail.jpg`
- **Description**: Your YouTube channel thumbnail or a screenshot from one of your videos
- **Recommended Size**: 400x300 pixels or larger
- **Aspect Ratio**: 4:3 or 16:9

### 2. Leadership Initiatives
- **File**: `assets/leadership-bg.jpg`
- **Description**: Image related to your leadership roles (NSBE, team management, etc.)
- **Recommended Size**: 400x300 pixels or larger
- **Aspect Ratio**: 4:3 or 16:9

### 3. Technical Projects
- **File**: `assets/tech-projects-bg.jpg`
- **Description**: Screenshot of your code, applications, or technical work
- **Recommended Size**: 400x300 pixels or larger
- **Aspect Ratio**: 4:3 or 16:9

### 4. NASA Internship
- **File**: `assets/nasa-internship-bg.jpg`
- **Description**: Professional image related to your NASA experience
- **Recommended Size**: 400x300 pixels or larger
- **Aspect Ratio**: 4:3 or 16:9

## 🖼️ How to Add Your Images

### Step 1: Prepare Your Images
1. **Resize images** to approximately 400x300 pixels (or maintain aspect ratio)
2. **Optimize file size** - keep under 500KB for faster loading
3. **Use high quality** - ensure images are clear and professional
4. **Save as JPG** - for best compatibility and file size

### Step 2: Replace Placeholder Files
1. Navigate to the `assets/` folder in your portfolio
2. Replace the placeholder files with your actual images:
   - Replace `youtube-thumbnail.jpg` with your YouTube thumbnail
   - Replace `leadership-bg.jpg` with your leadership image
   - Replace `tech-projects-bg.jpg` with your technical projects image
   - Replace `nasa-internship-bg.jpg` with your NASA-related image

### Step 3: Test Your Portfolio
1. Open `index.html` in your browser
2. Navigate to the "My Work" section
3. Verify that all images display correctly
4. Check that the hover effects work properly

## 🎨 Image Suggestions

### YouTube Channel Image
- Screenshot from your most popular video
- Your channel banner or logo
- A professional headshot with YouTube branding
- Thumbnail from a tech/lifestyle video

### Leadership Image
- Photo from NSBE events or meetings
- Team collaboration or group work
- Professional headshot in business attire
- Conference or presentation photos

### Technical Projects Image
- Screenshot of your portfolio website
- Code editor with your projects
- Application interface or dashboard
- GitHub profile or repository view

### NASA Internship Image
- Professional headshot in business attire
- NASA-related imagery (space, technology, etc.)
- Office or work environment photo
- Achievement or recognition photos

## 🔧 Customization Options

### Adding More Portfolio Items
To add more portfolio items with images:

1. **Add new HTML structure**:
```html
<div class="portfolio-item" data-category="your-category">
    <div class="portfolio-image">
        <img src="assets/your-image.jpg" alt="Your Description" class="portfolio-bg-image">
        <div class="portfolio-overlay">
            <div class="portfolio-content">
                <h3>Your Title</h3>
                <p>Your description</p>
                <a href="your-link" target="_blank" class="portfolio-link">
                    <i class="your-icon"></i>
                    View Project
                </a>
            </div>
        </div>
    </div>
</div>
```

2. **Add your image** to the `assets/` folder
3. **Update the filter buttons** if needed

### Changing Image Effects
You can modify the CSS in `styles.css` to change how images behave:

```css
/* Different hover effects */
.portfolio-item:hover .portfolio-bg-image {
    transform: scale(1.1); /* More zoom */
    filter: brightness(0.8); /* Darker on hover */
}

/* Different image positioning */
.portfolio-bg-image {
    object-position: top; /* Focus on top of image */
    object-position: center; /* Center focus (default) */
    object-position: bottom; /* Focus on bottom */
}
```

## 📱 Responsive Considerations

The images will automatically:
- **Scale properly** on different screen sizes
- **Maintain aspect ratio** across devices
- **Load efficiently** with optimized file sizes
- **Work with hover effects** on desktop and mobile

## 🚀 Performance Tips

1. **Optimize images** before adding them
2. **Use appropriate file formats** (JPG for photos, PNG for graphics)
3. **Keep file sizes small** (under 500KB each)
4. **Test loading speed** on slower connections

## 🎯 Final Checklist

- [ ] All 4 image files added to `assets/` folder
- [ ] Images are properly sized and optimized
- [ ] Portfolio section displays correctly
- [ ] Hover effects work on all images
- [ ] Images look good on mobile devices
- [ ] File names match exactly (case-sensitive)

## 📞 Need Help?

If you need assistance with:
- Image resizing or optimization
- Adding more portfolio items
- Customizing the design
- Technical issues

Feel free to reach out for support!

---

**Your portfolio will look amazing with these professional images!** 🎨✨

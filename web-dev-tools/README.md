# Web Development Tools & Utilities

A collection of reusable components, utilities, and tools for modern web development. Built with vanilla JavaScript, HTML, and CSS for maximum compatibility and performance.

## 🚀 Features

- **Zero Dependencies**: Pure vanilla JavaScript, HTML, and CSS
- **Modular Design**: Use individual components or the entire toolkit
- **Responsive**: Mobile-first approach with responsive design
- **Accessible**: WCAG compliant components
- **Lightweight**: Optimized for performance
- **Cross-browser**: Compatible with all modern browsers

## 📦 Components

### 🎨 UI Components
- **Button Styles**: Modern button variants with hover effects
- **Card Components**: Flexible card layouts for content
- **Form Elements**: Styled form inputs with validation
- **Navigation**: Responsive navigation components
- **Modals**: Accessible modal dialogs
- **Loading Spinners**: Various loading animations

### 🛠️ Utilities
- **Animation Helpers**: CSS animation utilities
- **Responsive Helpers**: Media query utilities
- **Color Palette**: Consistent color system
- **Typography**: Typography scale and utilities
- **Spacing System**: Consistent spacing utilities

### 📱 Layout Components
- **Grid System**: CSS Grid utilities
- **Flexbox Helpers**: Flexbox utility classes
- **Container System**: Responsive container components
- **Section Layouts**: Pre-built section layouts

## 🚀 Quick Start

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Danielomoregie/web-dev-tools.git
   cd web-dev-tools
   ```

2. **Include the CSS**
   ```html
   <link rel="stylesheet" href="css/tools.css">
   ```

3. **Include the JavaScript (optional)**
   ```html
   <script src="js/tools.js"></script>
   ```

### Basic Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
    <link rel="stylesheet" href="css/tools.css">
</head>
<body>
    <!-- Use the components -->
    <button class="btn btn-primary">Click Me</button>
    <div class="card">
        <h3>Card Title</h3>
        <p>Card content goes here.</p>
    </div>
</body>
</html>
```

## 📚 Documentation

### Button Components

```html
<!-- Primary Button -->
<button class="btn btn-primary">Primary</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">Secondary</button>

<!-- Outline Button -->
<button class="btn btn-outline">Outline</button>

<!-- Button Sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Normal</button>
<button class="btn btn-primary btn-lg">Large</button>
```

### Card Components

```html
<!-- Basic Card -->
<div class="card">
    <div class="card-header">
        <h3>Card Title</h3>
    </div>
    <div class="card-body">
        <p>Card content goes here.</p>
    </div>
    <div class="card-footer">
        <button class="btn btn-primary">Action</button>
    </div>
</div>

<!-- Card with Image -->
<div class="card">
    <img src="image.jpg" alt="Card Image" class="card-image">
    <div class="card-body">
        <h3>Card Title</h3>
        <p>Card content goes here.</p>
    </div>
</div>
```

### Form Components

```html
<!-- Form Group -->
<div class="form-group">
    <label for="email">Email Address</label>
    <input type="email" id="email" class="form-control" placeholder="Enter your email">
</div>

<!-- Form with Validation -->
<div class="form-group">
    <label for="password">Password</label>
    <input type="password" id="password" class="form-control" required>
    <div class="form-error">Password is required</div>
</div>
```

### Grid System

```html
<!-- 12 Column Grid -->
<div class="grid">
    <div class="col-12 col-md-6 col-lg-4">
        <div class="card">Content 1</div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
        <div class="card">Content 2</div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
        <div class="card">Content 3</div>
    </div>
</div>
```

## 🎨 Customization

### CSS Custom Properties

The toolkit uses CSS custom properties for easy theming:

```css
:root {
  /* Colors */
  --primary-color: #1E3A8A;
  --secondary-color: #1E40AF;
  --success-color: #34C759;
  --warning-color: #FF9500;
  --error-color: #FF3B30;
  
  /* Typography */
  --font-family: 'Inter', sans-serif;
  --font-size-base: 16px;
  --line-height-base: 1.6;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Border Radius */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
}
```

### Custom Theme

```css
/* Override default variables */
:root {
  --primary-color: #your-color;
  --secondary-color: #your-secondary-color;
  /* ... other customizations */
}
```

## 📱 Responsive Design

The toolkit is mobile-first and includes responsive utilities:

```css
/* Mobile first breakpoints */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large Desktop */ }
```

## ♿ Accessibility

All components are built with accessibility in mind:

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and roles
- **Color Contrast**: WCAG AA compliant color combinations
- **Focus Management**: Clear focus indicators
- **Semantic HTML**: Proper HTML structure

## 🧪 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

- **Email**: omoregiebusiness@gmail.com
- **LinkedIn**: [linkedin.com/in/omoregiedaniel](https://www.linkedin.com/in/omoregiedaniel/)
- **Portfolio**: [danielomoregie.github.io](https://danielomoregie.github.io/portfolio-website)

## 🙏 Acknowledgments

- The web development community for inspiration
- Modern CSS features and best practices
- Accessibility guidelines and standards

---

**Built with ❤️ by Daniel Omoregie**

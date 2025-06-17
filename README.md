# Portfolio Configuration Generator

A user-friendly, **no-code solution** for generating `config.json` files for the Developer Portfolio Template. This tool provides a Typeform-like interface that guides users through creating their portfolio configuration step-by-step.

## 🎯 Purpose

This companion app solves the main barrier for non-technical users who want to use the Developer Portfolio Template but feel intimidated by editing JSON files. It transforms the configuration process into an intuitive, guided experience.

## ✨ Features

### User Experience
- **🚫 Zero Code Required** - Visual interface for all configuration
- **📝 Typeform-like Design** - Clean, step-by-step wizard interface
- **👁️ Live Preview** - See your configuration as you build it
- **💾 Instant Download** - Get your `config.json` file immediately
- **📱 Mobile Responsive** - Works perfectly on phones and tablets
- **♿ Accessible Design** - Follows WCAG guidelines for accessibility

### Smart Features
- **🎨 Smart Defaults** - Sensible fallbacks for all optional fields
- **✅ Input Validation** - Prevents common configuration errors
- **🔄 Dynamic Lists** - Add/remove social links, projects, jobs, and skills
- **🎛️ Feature Toggles** - Enable/disable portfolio sections visually
- **📊 Progress Tracking** - Shows completion percentage
- **💡 Contextual Help** - Tips and examples for each field

## 🏗️ Architecture

### Modular Design
```
pages/
├── README.md           # This documentation (also serves as landing page)
├── index.html          # Alternative HTML entry point
├── css/                # Modular CSS architecture
│   ├── main.css       # CSS imports
│   ├── base.css       # Variables, reset, typography
│   ├── components.css # Buttons, forms, cards
│   ├── wizard.css     # Step-by-step interface
│   └── responsive.css # Mobile/tablet optimizations
└── js/                # Modular JavaScript
    ├── main.js            # App entry point
    ├── wizard-controller.js # Manages step navigation
    ├── wizard-steps.js      # HTML templates for each step
    ├── config-generator.js  # Converts wizard data to config.json
    └── preview-manager.js   # Live preview functionality
```

### Design Principles
- **Progressive Enhancement** - Works without JavaScript for basic content
- **Mobile-First** - Designed for mobile, enhanced for desktop
- **Modular CSS** - Follows the same architecture as the main portfolio
- **ES6 Modules** - Clean, maintainable JavaScript architecture
- **Event-Driven** - Loose coupling between components

## 🚀 How to Use

### For End Users

1. **Open the Generator**
   - Navigate to the `pages/` directory in your browser
   - Open `README.md` in a markdown viewer or `index.html` in a browser

2. **Follow the 7-Step Wizard**
   - **Step 1:** Basic Information (name, tagline, GitHub username)
   - **Step 2:** Social Links (GitHub, LinkedIn, Twitter, etc.)
   - **Step 3:** About Section (your story in paragraphs)
   - **Step 4:** Professional Experience (jobs, roles, achievements)
   - **Step 5:** Projects (featured work with descriptions)
   - **Step 6:** Skills & Technologies (organized by categories)
   - **Step 7:** Settings (feature toggles, SEO, footer)

3. **Preview & Download**
   - Use the live preview to see your configuration
   - Click "Generate Config" to download your `config.json`
   - Replace the existing config file in your portfolio

### For Developers

The generator can be easily customized or extended:

```javascript
// Add new step to wizard
const newStep = {
    title: "Custom Section",
    template: this.getCustomStepTemplate(),
    validator: this.validateCustomStep
};

// Extend config generation
generateCustomConfig(data) {
    return {
        customSection: {
            title: data.customTitle,
            items: data.customItems
        }
    };
}
```

## 🎨 Customization

### Styling
The CSS follows the same design system as the main portfolio:
- Uses CSS custom properties for theming
- Supports dark/light mode (follows system preference)
- Fully responsive design
- Consistent with portfolio visual design

### Adding New Fields
1. Update the appropriate step template in `wizard-steps.js`
2. Add data collection logic in `wizard-controller.js`
3. Update config generation in `config-generator.js`
4. Test the complete flow

### Internationalization
The wizard can be easily internationalized:
- All text is in template strings
- Form labels and help text are centralized
- Error messages are configurable

## 🔧 Technical Details

### Dependencies
- **Zero External Dependencies** - Pure vanilla JavaScript and CSS
- **Modern ES6+** - Uses modules, async/await, and modern APIs
- **Progressive Enhancement** - Graceful degradation for older browsers

### Browser Support
- **Modern Browsers** - Chrome 80+, Firefox 72+, Safari 13+, Edge 80+
- **Mobile Browsers** - iOS Safari 13+, Chrome Mobile 80+
- **Accessibility** - Screen reader compatible, keyboard navigation

### Performance
- **Lightweight** - Total size under 50KB uncompressed
- **Fast Loading** - Modular CSS/JS for optimal caching
- **Efficient Rendering** - Minimal DOM manipulation

## 🤝 Contributing

### Adding New Features
1. Create feature branch from main
2. Add new step or enhance existing functionality
3. Test across different devices and browsers
4. Update documentation
5. Submit pull request

### Reporting Issues
- Use GitHub issues for bug reports
- Include browser version and steps to reproduce
- Screenshots help for UI issues

## 📚 Implementation Examples

### Custom Validation
```javascript
validateStep(stepData) {
    const errors = [];
    
    if (!stepData.githubUsername) {
        errors.push('GitHub username is required');
    }
    
    if (stepData.socialLinks?.length === 0) {
        errors.push('At least one social link recommended');
    }
    
    return errors;
}
```

### Custom Preview
```javascript
updatePreview(config) {
    const preview = `
        <div class="preview-section">
            <h4>Portfolio Preview</h4>
            <p>Name: ${config.name}</p>
            <p>Sections: ${Object.keys(config.features).length}</p>
        </div>
    `;
    return preview;
}
```

## 🎯 Target Audience

### Primary Users
- **Non-technical professionals** who want a portfolio but don't code
- **Students and bootcamp graduates** new to web development
- **Designers and marketers** who need a quick professional presence
- **Anyone intimidated by JSON** but comfortable with forms

### Secondary Users
- **Developers who want quick setup** without manual JSON editing
- **Teams setting up multiple portfolios** with consistent structure
- **Educators demonstrating** the portfolio template to students

---

**Ready to create your portfolio configuration?** Open this README in a browser or use the `index.html` file to get started!

<div class="wizard-container" id="wizard-container" style="display: none;">
  <!-- The wizard will be dynamically loaded here -->
</div>

<link rel="stylesheet" href="css/main.css">
<script type="module" src="js/main.js"></script>

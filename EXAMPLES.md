# Portfolio Configuration Generator - Examples & Help

## Example Configurations

### Minimal Configuration
```json
{
  "features": {
    "about": true,
    "projects": true,
    "experience": true,
    "skills": true,
    "github_projects": true
  },
  "site": {
    "title": "John Doe",
    "description": "Developer Portfolio"
  },
  "header": {
    "greeting": "John Doe",
    "tagline": "Full Stack Developer"
  },
  "github_username": "johndoe",
  "social_links": [
    {
      "name": "GitHub",
      "url": "https://github.com/johndoe",
      "icon": "github",
      "required": true
    }
  ],
  "about": {
    "paragraphs": [
      "I'm a passionate full stack developer with 3 years of experience building web applications."
    ]
  }
}
```

### Complete Configuration
```json
{
  "features": {
    "about": true,
    "projects": true,
    "experience": true,
    "skills": true,
    "github_projects": true
  },
  "site": {
    "title": "Jane Smith",
    "description": "Senior Frontend Developer & UI Designer",
    "seo": {
      "title": "Jane Smith - Frontend Developer Portfolio",
      "description": "Portfolio of Jane Smith - Senior Frontend Developer specializing in React, TypeScript, and modern web technologies",
      "keywords": "frontend developer, react, typescript, ui design, portfolio",
      "author": "Jane Smith",
      "og_image": "https://avatars.githubusercontent.com/janesmith",
      "twitter_card": "summary_large_image",
      "base_url": "https://janesmith.dev"
    }
  },
  "header": {
    "greeting": "Jane Smith",
    "tagline": "Senior Frontend Developer & UI Designer"
  },
  "social_links": [
    {
      "name": "GitHub",
      "url": "https://github.com/janesmith",
      "icon": "github",
      "required": true
    },
    {
      "name": "LinkedIn",
      "url": "https://linkedin.com/in/janesmith",
      "icon": "linkedin"
    },
    {
      "name": "Portfolio",
      "url": "https://janesmith.dev",
      "icon": "website"
    }
  ],
  "github_username": "janesmith",
  "about": {
    "paragraphs": [
      "I'm a Senior Frontend Developer with 6+ years of experience creating beautiful, performant web applications. I specialize in React, TypeScript, and modern CSS techniques.",
      "Currently leading the frontend team at TechCorp, where I've helped scale our platform to serve over 1M users. I'm passionate about creating accessible, user-friendly interfaces and mentoring junior developers.",
      "When I'm not coding, you can find me contributing to open source projects, writing technical blog posts, or experimenting with new design trends."
    ]
  },
  "projects": {
    "title": "Featured Projects",
    "items": [
      {
        "name": "E-commerce Dashboard",
        "date": "2024",
        "description": [
          "Built a comprehensive admin dashboard for an e-commerce platform using React and TypeScript",
          "Implemented real-time analytics with Chart.js and WebSocket connections",
          "Reduced page load times by 40% through code splitting and lazy loading"
        ],
        "picture": "assets/projects/ecommerce-dashboard.jpg",
        "link": {
          "url": "https://demo.janesmith.dev/dashboard",
          "title": "View Live Demo"
        }
      },
      {
        "name": "Design System Library",
        "date": "2023",
        "description": [
          "Created a comprehensive design system and component library for the company",
          "Built with Storybook, TypeScript, and styled-components",
          "Adopted by 15+ teams, reducing development time by 30%"
        ],
        "link": {
          "url": "https://github.com/janesmith/design-system",
          "title": "View Repository"
        }
      }
    ]
  },
  "experience": {
    "title": "Professional Experience",
    "jobs": [
      {
        "company": "TechCorp",
        "role": "Senior Frontend Developer",
        "date": "2022 - Present",
        "responsibilities": [
          "Lead a team of 4 frontend developers building scalable React applications",
          "Architected and implemented micro-frontend architecture serving 1M+ users",
          "Mentored junior developers and established code review best practices",
          "Improved application performance by 50% through optimization techniques"
        ],
        "logo": "assets/logos/TechCorp_Logo.png",
        "logo_dark": "assets/logos/TechCorp_Logo_White.png"
      },
      {
        "company": "StartupInc",
        "role": "Frontend Developer",
        "date": "2019 - 2022",
        "responsibilities": [
          "Built responsive web applications using React, Redux, and TypeScript",
          "Collaborated with designers to implement pixel-perfect UI components",
          "Integrated RESTful APIs and GraphQL endpoints",
          "Participated in agile development process and sprint planning"
        ],
        "logo": "assets/logos/StartupInc_Logo.png",
        "logo_dark": "assets/logos/StartupInc_Logo_White.png"
      }
    ]
  },
  "skills": {
    "title": "Skills & Technologies",
    "categories": [
      {
        "name": "Frontend Technologies",
        "items": [
          "React",
          "TypeScript",
          "Next.js",
          "Vue.js",
          "HTML5",
          "CSS3",
          "Sass/SCSS"
        ]
      },
      {
        "name": "Tools & Platforms",
        "items": [
          "Git",
          "Webpack",
          "Vite",
          "Docker",
          "AWS",
          "Vercel",
          "Figma"
        ]
      },
      {
        "name": "Certifications",
        "items": [
          {
            "name": "AWS Certified Developer",
            "url": "https://credly.com/badges/example"
          },
          {
            "name": "Google UX Design Certificate",
            "url": "https://coursera.org/verify/example"
          }
        ]
      }
    ]
  },
  "github_projects": {
    "title": "Open Source Projects"
  },
  "footer": {
    "show_social_links": true,
    "show_built_with": true,
    "built_with_text": "Built with ❤️ using vanilla JavaScript",
    "tagline": "Let's build something amazing together!"
  }
}
```

## Common Use Cases

### For Students
- Minimal configuration focusing on projects and skills
- Emphasis on learning journey and coursework
- Include bootcamp projects and personal learning projects

### For Career Changers
- Highlight transferable skills from previous careers
- Focus on recent projects and new technical skills
- Include learning path and motivation for the change

### For Experienced Developers
- Comprehensive work history with specific achievements
- Mix of technical and leadership responsibilities
- Open source contributions and community involvement

### For Freelancers
- Portfolio of client work and case studies
- Diverse skill set across different technologies
- Testimonials and client success stories

## Tips for Better Portfolios

### Writing Effective Descriptions
- Use action verbs (built, implemented, architected, optimized)
- Include specific metrics and outcomes
- Focus on impact rather than just responsibilities
- Keep it concise but informative

### Choosing Projects
- Select projects that showcase different skills
- Include both personal and professional work
- Show progression and growth over time
- Ensure projects are accessible and well-documented

### Organizing Skills
- Group related technologies together
- Order by proficiency or relevance
- Include both technical and soft skills
- Keep the list current and relevant

### SEO Optimization
- Use relevant keywords in descriptions
- Include location if seeking local opportunities
- Optimize meta descriptions and titles
- Use descriptive alt text for images

## Troubleshooting

### Common Issues

**Configuration not working?**
- Check that all required fields are filled
- Validate JSON syntax using online validators
- Ensure GitHub username is correct and public

**Images not displaying?**
- Verify image paths are correct
- Check that images exist in the assets folder
- Use web-compatible formats (jpg, png, webp)

**Social links not appearing?**
- Ensure icon names match available options
- Check that URLs are complete and valid
- Verify social_links array is properly formatted

**GitHub projects not loading?**
- Confirm GitHub username is correct
- Add "featured" topic to repositories you want to showcase
- Check that repositories are public

### Getting Help

1. **Documentation**: Check the main portfolio README for configuration details
2. **Examples**: Use the example configurations as templates
3. **Community**: Open an issue on GitHub for support
4. **Testing**: Use the live preview to validate your configuration

---

Return to the [Configuration Generator](README.md) to create your portfolio configuration.

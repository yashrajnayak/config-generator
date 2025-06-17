// Wizard Steps - Contains HTML templates for each step
export class WizardSteps {
    
    getBasicInfoStep(data = {}) {
        return `
            <h2>Basic Information</h2>
            <p class="step-description">
                Let's start with your basic details. This information will appear in your portfolio header and SEO metadata.
            </p>

            <div class="form-section">
                <h3>Personal Details</h3>
                
                <div class="form-group">
                    <label for="name" class="form-label required">Full Name</label>
                    <input type="text" id="name" name="name" class="form-input" 
                           placeholder="e.g., John Doe" value="${data.name || ''}" required>
                    <span class="form-help">This will be displayed as your main heading</span>
                </div>

                <div class="form-group">
                    <label for="tagline" class="form-label required">Professional Tagline</label>
                    <input type="text" id="tagline" name="tagline" class="form-input" 
                           placeholder="e.g., Full Stack Developer & UI/UX Designer" value="${data.tagline || ''}" required>
                    <span class="form-help">A brief description of what you do</span>
                </div>

                <div class="form-group">
                    <label for="github-username" class="form-label required">GitHub Username</label>
                    <input type="text" id="github-username" name="githubUsername" class="form-input" 
                           placeholder="e.g., johndoe" value="${data.githubUsername || ''}" required>
                    <span class="form-help">Used for profile picture and GitHub projects integration</span>
                </div>

                <div class="form-group">
                    <label for="description" class="form-label">Portfolio Description</label>
                    <input type="text" id="description" name="description" class="form-input" 
                           placeholder="e.g., Developer Portfolio" value="${data.description || ''}">
                    <span class="form-help">Short description for browser tabs and SEO</span>
                </div>
            </div>

            <div class="form-section">
                <h3>SEO & Website Settings</h3>
                
                <div class="form-group">
                    <label for="website-url" class="form-label">Website URL</label>
                    <input type="url" id="website-url" name="websiteUrl" class="form-input" 
                           placeholder="https://yourdomain.com" value="${data.websiteUrl || ''}">
                    <span class="form-help">Your portfolio's live URL (optional, for SEO)</span>
                </div>

                <div class="form-group">
                    <label for="keywords" class="form-label">Keywords</label>
                    <input type="text" id="keywords" name="keywords" class="form-input" 
                           placeholder="developer, portfolio, javascript, react" value="${data.keywords || ''}">
                    <span class="form-help">Comma-separated keywords for SEO</span>
                </div>
            </div>

            <div class="alert alert-info">
                <strong>💡 Pro Tip:</strong> Your GitHub username will automatically fetch your profile picture and repositories marked with the "featured" topic.
            </div>
        `;
    }

    getSocialLinksStep(data = {}) {
        const existingLinks = data.socialLinks || [];
        
        return `
            <h2>Social Links</h2>
            <p class="step-description">
                Add your professional social media profiles. These will appear in your portfolio header and footer.
            </p>

            <div class="form-section">
                <h3>Professional Profiles</h3>
                
                <div class="dynamic-list" data-list="social-links">
                    ${existingLinks.map(link => this.getSocialLinkItemTemplate(link)).join('')}
                    ${existingLinks.length === 0 ? this.getSocialLinkItemTemplate() : ''}
                </div>
                
                <button type="button" class="btn btn-add" data-list-type="social-links">
                    ➕ Add Another Social Link
                </button>
            </div>

            <div class="alert alert-info">
                <strong>Available Icons:</strong> github, linkedin, twitter, instagram, youtube, website, email, medium, discord, code
            </div>
        `;
    }

    getSocialLinkItemTemplate(data = {}) {
        return `
            <div class="dynamic-list-item">
                <div class="dynamic-list-header">
                    <h4>Social Profile</h4>
                    <button type="button" class="btn-remove">Remove</button>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Platform Name</label>
                        <input type="text" name="social-name" class="form-input" 
                               placeholder="e.g., LinkedIn" value="${data.name || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Profile URL</label>
                        <input type="url" name="social-url" class="form-input" 
                               placeholder="https://linkedin.com/in/username" value="${data.url || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Icon</label>
                        <select name="social-icon" class="form-select">
                            <option value="">Select...</option>
                            <option value="github" ${data.icon === 'github' ? 'selected' : ''}>GitHub</option>
                            <option value="linkedin" ${data.icon === 'linkedin' ? 'selected' : ''}>LinkedIn</option>
                            <option value="twitter" ${data.icon === 'twitter' ? 'selected' : ''}>Twitter</option>
                            <option value="instagram" ${data.icon === 'instagram' ? 'selected' : ''}>Instagram</option>
                            <option value="youtube" ${data.icon === 'youtube' ? 'selected' : ''}>YouTube</option>
                            <option value="website" ${data.icon === 'website' ? 'selected' : ''}>Website</option>
                            <option value="email" ${data.icon === 'email' ? 'selected' : ''}>Email</option>
                            <option value="medium" ${data.icon === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="discord" ${data.icon === 'discord' ? 'selected' : ''}>Discord</option>
                            <option value="code" ${data.icon === 'code' ? 'selected' : ''}>Code</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    }

    getAboutStep(data = {}) {
        return `
            <h2>About Section</h2>
            <p class="step-description">
                Tell your story! Add multiple paragraphs to describe your background, experience, and what makes you unique.
            </p>

            <div class="form-section">
                <h3>Your Story</h3>
                
                <div class="form-group">
                    <label for="about-paragraph-1" class="form-label">First Paragraph</label>
                    <textarea id="about-paragraph-1" name="aboutParagraph1" class="form-textarea" 
                              placeholder="Introduce yourself and your background...">${data.aboutParagraph1 || ''}</textarea>
                    <span class="form-help">Start with your professional background or journey</span>
                </div>

                <div class="form-group">
                    <label for="about-paragraph-2" class="form-label">Second Paragraph</label>
                    <textarea id="about-paragraph-2" name="aboutParagraph2" class="form-textarea" 
                              placeholder="Share more details about your expertise and interests...">${data.aboutParagraph2 || ''}</textarea>
                    <span class="form-help">Talk about your skills, interests, or current role</span>
                </div>

                <div class="form-group">
                    <label for="about-paragraph-3" class="form-label">Third Paragraph (Optional)</label>
                    <textarea id="about-paragraph-3" name="aboutParagraph3" class="form-textarea" 
                              placeholder="Add any additional information you'd like to share...">${data.aboutParagraph3 || ''}</textarea>
                    <span class="form-help">Optional: Goals, achievements, or personal touch</span>
                </div>
            </div>

            <div class="alert alert-info">
                <strong>💡 Writing Tips:</strong> Keep paragraphs concise and engaging. Focus on your unique value proposition and what sets you apart as a professional.
            </div>
        `;
    }

    getExperienceStep(data = {}) {
        const existingExperience = data.experience || [];
        
        return `
            <h2>Professional Experience</h2>
            <p class="step-description">
                Add your work history, including companies, roles, dates, and key achievements or responsibilities.
            </p>

            <div class="form-section">
                <h3>Work History</h3>
                
                <div class="dynamic-list" data-list="experience">
                    ${existingExperience.map(exp => this.getExperienceItemTemplate(exp)).join('')}
                    ${existingExperience.length === 0 ? this.getExperienceItemTemplate() : ''}
                </div>
                
                <button type="button" class="btn btn-add" data-list-type="experience">
                    ➕ Add Another Position
                </button>
            </div>

            <div class="alert alert-info">
                <strong>💡 Pro Tip:</strong> List your experience in reverse chronological order (most recent first). Include specific achievements and technologies used.
            </div>
        `;
    }

    getExperienceItemTemplate(data = {}) {
        return `
            <div class="dynamic-list-item">
                <div class="dynamic-list-header">
                    <h4>Position</h4>
                    <button type="button" class="btn-remove">Remove</button>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Company Name</label>
                        <input type="text" name="exp-company" class="form-input" 
                               placeholder="e.g., Google" value="${data.company || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Job Title</label>
                        <input type="text" name="exp-role" class="form-input" 
                               placeholder="e.g., Senior Software Engineer" value="${data.role || ''}">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Employment Period</label>
                    <input type="text" name="exp-date" class="form-input" 
                           placeholder="e.g., Jan 2022 - Present" value="${data.date || ''}">
                    <span class="form-help">Use format like "Jan 2022 - Present" or "2020 - 2022"</span>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Key Responsibilities & Achievements</label>
                    <textarea name="exp-responsibilities" class="form-textarea" 
                              placeholder="List one responsibility or achievement per line:
• Developed and maintained web applications using React and Node.js
• Led a team of 5 developers and improved deployment speed by 40%
• Implemented CI/CD pipelines reducing bug reports by 60%">${Array.isArray(data.responsibilities) ? data.responsibilities.join('\n') : (data.responsibilities || '')}</textarea>
                    <span class="form-help">One responsibility or achievement per line. Be specific and include metrics when possible.</span>
                </div>
            </div>
        `;
    }

    getProjectsStep(data = {}) {
        const existingProjects = data.projects || [];
        
        return `
            <h2>Projects</h2>
            <p class="step-description">
                Showcase your best work! Add projects with descriptions, images, and links to demos or repositories.
            </p>

            <div class="form-section">
                <h3>Featured Projects</h3>
                
                <div class="dynamic-list" data-list="projects">
                    ${existingProjects.map(project => this.getProjectItemTemplate(project)).join('')}
                    ${existingProjects.length === 0 ? this.getProjectItemTemplate() : ''}
                </div>
                
                <button type="button" class="btn btn-add" data-list-type="projects">
                    ➕ Add Another Project
                </button>
            </div>

            <div class="alert alert-info">
                <strong>💡 GitHub Integration:</strong> Projects with the "featured" topic on GitHub will automatically appear in a separate section. Add projects here that you want to describe in detail.
            </div>
        `;
    }

    getProjectItemTemplate(data = {}) {
        return `
            <div class="dynamic-list-item">
                <div class="dynamic-list-header">
                    <h4>Project</h4>
                    <button type="button" class="btn-remove">Remove</button>
                </div>
                
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Project Name</label>
                        <input type="text" name="project-name" class="form-input" 
                               placeholder="e.g., E-commerce Platform" value="${data.name || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Date/Year</label>
                        <input type="text" name="project-date" class="form-input" 
                               placeholder="e.g., 2024" value="${data.date || ''}">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Project Description</label>
                    <textarea name="project-description" class="form-textarea" 
                              placeholder="Describe your project, technologies used, and key features:
• Built with React, Node.js, and MongoDB
• Implemented secure payment processing with Stripe
• Reduced checkout time by 35% through UX improvements">${Array.isArray(data.description) ? data.description.join('\n') : (data.description || '')}</textarea>
                    <span class="form-help">One feature or detail per line</span>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Project Link (Optional)</label>
                        <input type="url" name="project-link" class="form-input" 
                               placeholder="https://demo.example.com" value="${data.link || ''}">
                        <span class="form-help">Link to live demo, repository, or case study</span>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Image Path (Optional)</label>
                        <input type="text" name="project-picture" class="form-input" 
                               placeholder="assets/projects/project-image.jpg" value="${data.picture || ''}">
                        <span class="form-help">Path to project screenshot (you'll upload this later)</span>
                    </div>
                </div>
            </div>
        `;
    }

    getSkillsStep(data = {}) {
        const existingSkills = data.skillCategories || [];
        
        return `
            <h2>Skills & Technologies</h2>
            <p class="step-description">
                Organize your skills into categories like "Programming Languages", "Frameworks", "Tools", or "Certifications".
            </p>

            <div class="form-section">
                <h3>Skill Categories</h3>
                
                <div class="dynamic-list" data-list="skills">
                    ${existingSkills.map(category => this.getSkillCategoryTemplate(category)).join('')}
                    ${existingSkills.length === 0 ? this.getSkillCategoryTemplate() : ''}
                </div>
                
                <button type="button" class="btn btn-add" data-list-type="skills">
                    ➕ Add Another Category
                </button>
            </div>

            <div class="alert alert-info">
                <strong>💡 Category Ideas:</strong> Programming Languages, Frameworks & Libraries, Tools & Platforms, Databases, Cloud Services, Certifications, Soft Skills
            </div>
        `;
    }

    getSkillCategoryTemplate(data = {}) {
        return `
            <div class="dynamic-list-item">
                <div class="dynamic-list-header">
                    <h4>Skill Category</h4>
                    <button type="button" class="btn-remove">Remove</button>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Category Name</label>
                    <input type="text" name="skill-category-name" class="form-input" 
                           placeholder="e.g., Programming Languages" value="${data.name || ''}">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Skills</label>
                    <textarea name="skill-items" class="form-textarea" 
                              placeholder="List your skills, one per line:
JavaScript
Python
React
Node.js
Docker">${Array.isArray(data.items) ? data.items.join('\n') : (data.items || '')}</textarea>
                    <span class="form-help">One skill per line. For certifications, you can add links later in the config file.</span>
                </div>
            </div>
        `;
    }

    getSettingsStep(data = {}) {
        return `
            <h2>Settings & Features</h2>
            <p class="step-description">
                Customize which sections appear on your portfolio and configure additional settings.
            </p>

            <div class="form-section">
                <h3>Portfolio Sections</h3>
                <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Toggle which sections you want to include in your portfolio:</p>
                
                <div class="feature-toggle">
                    <div>
                        <strong>About Section</strong>
                        <p style="margin: 0; color: var(--text-muted); font-size: 0.9rem;">Show your personal story and background</p>
                    </div>
                    <div class="toggle-switch active" data-feature="aboutEnabled"></div>
                </div>
                
                <div class="feature-toggle">
                    <div>
                        <strong>Experience Section</strong>
                        <p style="margin: 0; color: var(--text-muted); font-size: 0.9rem;">Display your work history and achievements</p>
                    </div>
                    <div class="toggle-switch active" data-feature="experienceEnabled"></div>
                </div>
                
                <div class="feature-toggle">
                    <div>
                        <strong>Projects Section</strong>
                        <p style="margin: 0; color: var(--text-muted); font-size: 0.9rem;">Showcase your featured projects</p>
                    </div>
                    <div class="toggle-switch active" data-feature="projectsEnabled"></div>
                </div>
                
                <div class="feature-toggle">
                    <div>
                        <strong>Skills Section</strong>
                        <p style="margin: 0; color: var(--text-muted); font-size: 0.9rem;">List your technical and professional skills</p>
                    </div>
                    <div class="toggle-switch active" data-feature="skillsEnabled"></div>
                </div>
                
                <div class="feature-toggle">
                    <div>
                        <strong>GitHub Projects</strong>
                        <p style="margin: 0; color: var(--text-muted); font-size: 0.9rem;">Automatically show repositories with "featured" topic</p>
                    </div>
                    <div class="toggle-switch active" data-feature="githubProjectsEnabled"></div>
                </div>
            </div>

            <div class="form-section">
                <h3>Footer Settings</h3>
                
                <div class="feature-toggle">
                    <div>
                        <strong>Show Social Links in Footer</strong>
                        <p style="margin: 0; color: var(--text-muted); font-size: 0.9rem;">Display your social links at the bottom of the page</p>
                    </div>
                    <div class="toggle-switch active" data-feature="footerSocialLinks"></div>
                </div>
                
                <div class="form-group">
                    <label for="footer-tagline" class="form-label">Footer Tagline</label>
                    <input type="text" id="footer-tagline" name="footerTagline" class="form-input" 
                           placeholder="Let's connect and build something amazing together!" 
                           value="${data.footerTagline || 'Let\'s connect and build something amazing together!'}">
                    <span class="form-help">A call-to-action or inspiring message for your footer</span>
                </div>
            </div>

            <div class="form-section">
                <h3>Custom Section Titles</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label for="projects-title" class="form-label">Projects Section Title</label>
                        <input type="text" id="projects-title" name="projectsTitle" class="form-input" 
                               placeholder="Latest Projects" value="${data.projectsTitle || 'Latest Projects'}">
                    </div>
                    
                    <div class="form-group">
                        <label for="experience-title" class="form-label">Experience Section Title</label>
                        <input type="text" id="experience-title" name="experienceTitle" class="form-input" 
                               placeholder="Professional Experience" value="${data.experienceTitle || 'Professional Experience'}">
                    </div>
                    
                    <div class="form-group">
                        <label for="skills-title" class="form-label">Skills Section Title</label>
                        <input type="text" id="skills-title" name="skillsTitle" class="form-input" 
                               placeholder="Skills & Technologies" value="${data.skillsTitle || 'Skills & Technologies'}">
                    </div>
                    
                    <div class="form-group">
                        <label for="github-title" class="form-label">GitHub Projects Title</label>
                        <input type="text" id="github-title" name="githubProjectsTitle" class="form-input" 
                               placeholder="Projects on GitHub" value="${data.githubProjectsTitle || 'Projects on GitHub'}">
                    </div>
                </div>
            </div>

            <div class="alert alert-success">
                <strong>🎉 Almost Done!</strong> Review your settings and click "Generate Config" to create your portfolio configuration file.
            </div>
        `;
    }
}

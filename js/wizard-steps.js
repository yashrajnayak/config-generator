// Modern Wizard Steps with Typeform-like interface
export class WizardSteps {
    
    getBasicInfoStep(data = {}) {
        return `
            <div class="step-header">
                <div class="step-number">1</div>
                <h2 class="step-title">Let's start with the basics</h2>
                <p class="step-subtitle">Tell us about yourself and we'll create your professional portfolio</p>
            </div>

            <div class="step-form">
                <div class="form-group">
                    <label for="name" class="form-label">What's your full name? *</label>
                    <input type="text" id="name" name="name" class="form-input" 
                           placeholder="e.g., Sarah Johnson" value="${data.name || ''}" required>
                    <span class="form-help">This will be the main heading on your portfolio</span>
                </div>

                <div class="form-group">
                    <label for="tagline" class="form-label">How would you describe what you do? *</label>
                    <input type="text" id="tagline" name="tagline" class="form-input" 
                           placeholder="e.g., Full Stack Developer & UI Designer" value="${data.tagline || ''}" required>
                    <span class="form-help">A brief, compelling description of your professional role</span>
                </div>

                <div class="form-group">
                    <label for="github-username" class="form-label">What's your GitHub username? *</label>
                    <input type="text" id="github-username" name="githubUsername" class="form-input" 
                           placeholder="e.g., sarahjohnson" value="${data.githubUsername || ''}" required>
                    <span class="form-help">We'll use this to fetch your profile picture and featured repositories</span>
                </div>

                <div class="form-group">
                    <label for="description" class="form-label">Brief portfolio description</label>
                    <input type="text" id="description" name="description" class="form-input" 
                           placeholder="e.g., Creative developer passionate about user experience" value="${data.description || ''}">
                    <span class="form-help">This appears in browser tabs and search results</span>
                </div>
            </div>
        `;
    }

    getSocialLinksStep(data = {}) {
        const existingLinks = data.socialLinks || [];
        
        return `
            <div class="step-header">
                <div class="step-number">2</div>
                <h2 class="step-title">Connect your profiles</h2>
                <p class="step-subtitle">Add your professional social media and portfolio links</p>
            </div>

            <div class="step-form">
                <div class="dynamic-list" id="social-links-list">
                    ${existingLinks.length > 0 
                        ? existingLinks.map(link => this.getSocialLinkItem(link)).join('')
                        : this.getSocialLinkItem()
                    }
                </div>
                
                <button type="button" class="add-button" id="add-social-link">
                    <span>+ Add another social link</span>
                </button>

                <div class="alert alert-info mt-6">
                    <strong>💡 Available icons:</strong> github, linkedin, twitter, instagram, youtube, website, email, medium, discord
                </div>
            </div>
        `;
    }

    getSocialLinkItem(data = {}) {
        return `
            <div class="dynamic-item">
                <div class="dynamic-item-header">
                    <h4 class="dynamic-item-title">Social Profile</h4>
                    <button type="button" class="remove-button" onclick="this.closest('.dynamic-item').remove()">
                        ✕
                    </button>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Platform</label>
                        <input type="text" name="social-name" class="form-input" 
                               placeholder="LinkedIn" value="${data.name || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Profile URL</label>
                        <input type="url" name="social-url" class="form-input" 
                               placeholder="https://linkedin.com/in/username" value="${data.url || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Icon</label>
                        <select name="social-icon" class="form-select">
                            <option value="">Choose...</option>
                            <option value="github" ${data.icon === 'github' ? 'selected' : ''}>GitHub</option>
                            <option value="linkedin" ${data.icon === 'linkedin' ? 'selected' : ''}>LinkedIn</option>
                            <option value="twitter" ${data.icon === 'twitter' ? 'selected' : ''}>Twitter</option>
                            <option value="instagram" ${data.icon === 'instagram' ? 'selected' : ''}>Instagram</option>
                            <option value="youtube" ${data.icon === 'youtube' ? 'selected' : ''}>YouTube</option>
                            <option value="website" ${data.icon === 'website' ? 'selected' : ''}>Website</option>
                            <option value="email" ${data.icon === 'email' ? 'selected' : ''}>Email</option>
                            <option value="medium" ${data.icon === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="discord" ${data.icon === 'discord' ? 'selected' : ''}>Discord</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    }

    getAboutStep(data = {}) {
        return `
            <div class="step-header">
                <div class="step-number">3</div>
                <h2 class="step-title">Tell your story</h2>
                <p class="step-subtitle">Share your background, experience, and what makes you unique</p>
            </div>

            <div class="step-form">
                <div class="form-group">
                    <label for="about-paragraph-1" class="form-label">Introduction paragraph</label>
                    <textarea id="about-paragraph-1" name="aboutParagraph1" class="form-textarea" 
                              placeholder="Start with your professional background or journey. For example: 'I'm a passionate full-stack developer with 5 years of experience building scalable web applications...'">${data.aboutParagraph1 || ''}</textarea>
                    <span class="form-help">Introduce yourself and your professional background</span>
                </div>

                <div class="form-group">
                    <label for="about-paragraph-2" class="form-label">Skills & expertise paragraph</label>
                    <textarea id="about-paragraph-2" name="aboutParagraph2" class="form-textarea" 
                              placeholder="Share details about your expertise and interests. For example: 'I specialize in React, Node.js, and cloud technologies. I love solving complex problems and creating intuitive user experiences...'">${data.aboutParagraph2 || ''}</textarea>
                    <span class="form-help">Talk about your skills, interests, or current role</span>
                </div>

                <div class="form-group">
                    <label for="about-paragraph-3" class="form-label">Personal touch (optional)</label>
                    <textarea id="about-paragraph-3" name="aboutParagraph3" class="form-textarea" 
                              placeholder="Add any additional information you'd like to share. For example: 'When I'm not coding, you can find me contributing to open source projects or mentoring junior developers...'">${data.aboutParagraph3 || ''}</textarea>
                    <span class="form-help">Goals, achievements, or personal interests</span>
                </div>

                <div class="alert alert-info">
                    <strong>✍️ Writing tip:</strong> Keep each paragraph focused and engaging. Use specific examples and avoid generic statements.
                </div>
            </div>
        `;
    }

    getExperienceStep(data = {}) {
        const existingExperience = data.experience || [];
        
        return `
            <div class="step-header">
                <div class="step-number">4</div>
                <h2 class="step-title">Your professional journey</h2>
                <p class="step-subtitle">Add your work experience, roles, and key achievements</p>
            </div>

            <div class="step-form">
                <div class="dynamic-list" id="experience-list">
                    ${existingExperience.length > 0 
                        ? existingExperience.map(exp => this.getExperienceItem(exp)).join('')
                        : this.getExperienceItem()
                    }
                </div>
                
                <button type="button" class="add-button" id="add-experience">
                    <span>+ Add another position</span>
                </button>

                <div class="alert alert-info mt-6">
                    <strong>💼 Pro tip:</strong> List your experience in reverse chronological order (most recent first). Include specific achievements and technologies used.
                </div>
            </div>
        `;
    }

    getExperienceItem(data = {}) {
        return `
            <div class="dynamic-item">
                <div class="dynamic-item-header">
                    <h4 class="dynamic-item-title">Work Experience</h4>
                    <button type="button" class="remove-button" onclick="this.closest('.dynamic-item').remove()">
                        ✕
                    </button>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Company</label>
                        <input type="text" name="exp-company" class="form-input" 
                               placeholder="Google" value="${data.company || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Job Title</label>
                        <input type="text" name="exp-role" class="form-input" 
                               placeholder="Senior Software Engineer" value="${data.role || ''}">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Employment Period</label>
                    <input type="text" name="exp-date" class="form-input" 
                           placeholder="Jan 2022 - Present" value="${data.date || ''}">
                    <span class="form-help">Use format like "Jan 2022 - Present" or "2020 - 2022"</span>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Key Achievements & Responsibilities</label>
                    <textarea name="exp-responsibilities" class="form-textarea" 
                              placeholder="• Developed and maintained web applications using React and Node.js&#10;• Led a team of 5 developers and improved deployment speed by 40%&#10;• Implemented CI/CD pipelines reducing bug reports by 60%">${Array.isArray(data.responsibilities) ? data.responsibilities.join('\n') : (data.responsibilities || '')}</textarea>
                    <span class="form-help">One achievement per line. Be specific and include metrics when possible.</span>
                </div>
            </div>
        `;
    }

    getProjectsStep(data = {}) {
        const existingProjects = data.projects || [];
        
        return `
            <div class="step-header">
                <div class="step-number">5</div>
                <h2 class="step-title">Showcase your work</h2>
                <p class="step-subtitle">Add your best projects with descriptions and links</p>
            </div>

            <div class="step-form">
                <div class="dynamic-list" id="projects-list">
                    ${existingProjects.length > 0 
                        ? existingProjects.map(project => this.getProjectItem(project)).join('')
                        : this.getProjectItem()
                    }
                </div>
                
                <button type="button" class="add-button" id="add-project">
                    <span>+ Add another project</span>
                </button>

                <div class="alert alert-info mt-6">
                    <strong>🚀 GitHub Integration:</strong> Projects with the "featured" topic on GitHub will automatically appear in a separate section.
                </div>
            </div>
        `;
    }

    getProjectItem(data = {}) {
        return `
            <div class="dynamic-item">
                <div class="dynamic-item-header">
                    <h4 class="dynamic-item-title">Project</h4>
                    <button type="button" class="remove-button" onclick="this.closest('.dynamic-item').remove()">
                        ✕
                    </button>
                </div>
                
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Project Name</label>
                        <input type="text" name="project-name" class="form-input" 
                               placeholder="E-commerce Platform" value="${data.name || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Year</label>
                        <input type="text" name="project-date" class="form-input" 
                               placeholder="2024" value="${data.date || ''}">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Project Description</label>
                    <textarea name="project-description" class="form-textarea" 
                              placeholder="• Built with React, Node.js, and MongoDB&#10;• Implemented secure payment processing with Stripe&#10;• Reduced checkout time by 35% through UX improvements">${Array.isArray(data.description) ? data.description.join('\n') : (data.description || '')}</textarea>
                    <span class="form-help">One feature or detail per line</span>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Project Link (optional)</label>
                        <input type="url" name="project-link" class="form-input" 
                               placeholder="https://demo.example.com" value="${data.link || ''}">
                        <span class="form-help">Link to live demo or repository</span>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Image Path (optional)</label>
                        <input type="text" name="project-picture" class="form-input" 
                               placeholder="assets/projects/project-image.jpg" value="${data.picture || ''}">
                        <span class="form-help">You'll upload this image later</span>
                    </div>
                </div>
            </div>
        `;
    }

    getSkillsStep(data = {}) {
        const existingSkills = data.skillCategories || [];
        
        return `
            <div class="step-header">
                <div class="step-number">6</div>
                <h2 class="step-title">Your skills & expertise</h2>
                <p class="step-subtitle">Organize your skills into categories like languages, frameworks, and tools</p>
            </div>

            <div class="step-form">
                <div class="dynamic-list" id="skills-list">
                    ${existingSkills.length > 0 
                        ? existingSkills.map(category => this.getSkillCategoryItem(category)).join('')
                        : this.getSkillCategoryItem()
                    }
                </div>
                
                <button type="button" class="add-button" id="add-skill-category">
                    <span>+ Add another category</span>
                </button>

                <div class="alert alert-info mt-6">
                    <strong>💡 Category ideas:</strong> Programming Languages, Frameworks, Tools & Platforms, Databases, Cloud Services, Certifications
                </div>
            </div>
        `;
    }

    getSkillCategoryItem(data = {}) {
        return `
            <div class="dynamic-item">
                <div class="dynamic-item-header">
                    <h4 class="dynamic-item-title">Skill Category</h4>
                    <button type="button" class="remove-button" onclick="this.closest('.dynamic-item').remove()">
                        ✕
                    </button>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Category Name</label>
                    <input type="text" name="skill-category-name" class="form-input" 
                           placeholder="Programming Languages" value="${data.name || ''}">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Skills</label>
                    <textarea name="skill-items" class="form-textarea" 
                              placeholder="JavaScript&#10;Python&#10;React&#10;Node.js&#10;Docker">${Array.isArray(data.items) ? data.items.join('\n') : (data.items || '')}</textarea>
                    <span class="form-help">One skill per line</span>
                </div>
            </div>
        `;
    }

    getSettingsStep(data = {}) {
        return `
            <div class="step-header">
                <div class="step-number">7</div>
                <h2 class="step-title">Final touches</h2>
                <p class="step-subtitle">Configure which sections to include and customize your portfolio</p>
            </div>

            <div class="step-form">
                <div class="form-group">
                    <label class="form-label">Portfolio Sections</label>
                    <p class="form-help mb-4">Choose which sections to include in your portfolio</p>
                    
                    <div class="feature-toggle">
                        <div class="feature-info">
                            <h4>About Section</h4>
                            <p>Show your personal story and background</p>
                        </div>
                        <div class="toggle-switch active" data-feature="aboutEnabled"></div>
                    </div>
                    
                    <div class="feature-toggle">
                        <div class="feature-info">
                            <h4>Experience Section</h4>
                            <p>Display your work history and achievements</p>
                        </div>
                        <div class="toggle-switch active" data-feature="experienceEnabled"></div>
                    </div>
                    
                    <div class="feature-toggle">
                        <div class="feature-info">
                            <h4>Projects Section</h4>
                            <p>Showcase your featured projects</p>
                        </div>
                        <div class="toggle-switch active" data-feature="projectsEnabled"></div>
                    </div>
                    
                    <div class="feature-toggle">
                        <div class="feature-info">
                            <h4>Skills Section</h4>
                            <p>List your technical and professional skills</p>
                        </div>
                        <div class="toggle-switch active" data-feature="skillsEnabled"></div>
                    </div>
                    
                    <div class="feature-toggle">
                        <div class="feature-info">
                            <h4>GitHub Projects</h4>
                            <p>Automatically show repositories with "featured" topic</p>
                        </div>
                        <div class="toggle-switch active" data-feature="githubProjectsEnabled"></div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="footer-tagline" class="form-label">Footer Message</label>
                    <input type="text" id="footer-tagline" name="footerTagline" class="form-input" 
                           placeholder="Let's connect and build something amazing together!" 
                           value="${data.footerTagline || 'Let\'s connect and build something amazing together!'}">
                    <span class="form-help">A call-to-action or inspiring message for your footer</span>
                </div>

                <div class="alert alert-success">
                    <strong>🎉 Almost done!</strong> Review your settings and click "Generate Config" to create your portfolio configuration file.
                </div>
            </div>
        `;
    }
}
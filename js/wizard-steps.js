// Enhanced Wizard Steps with Modern UI
export class WizardSteps {
    
    getBasicInfoStep(data = {}) {
        return `
            <div class="step-header">
                <div class="step-number">1</div>
                <h2 class="step-title">Let's get to know you</h2>
                <p class="step-subtitle">Tell us about yourself and we'll create a stunning professional portfolio that showcases your unique story</p>
            </div>

            <div class="step-form">
                <div class="form-group">
                    <label for="name" class="form-label required">What's your full name?</label>
                    <input type="text" id="name" name="name" class="form-input" 
                           placeholder="e.g., Sarah Johnson" value="${data.name || ''}" required>
                    <span class="form-help">This will be the main heading on your portfolio and appear in search results</span>
                </div>

                <div class="form-group">
                    <label for="tagline" class="form-label required">How would you describe what you do?</label>
                    <input type="text" id="tagline" name="tagline" class="form-input" 
                           placeholder="e.g., Full Stack Developer & UI Designer" value="${data.tagline || ''}" required>
                    <span class="form-help">A compelling one-liner that captures your professional identity</span>
                </div>

                <div class="form-group">
                    <label for="github-username" class="form-label required">What's your GitHub username?</label>
                    <input type="text" id="github-username" name="githubUsername" class="form-input" 
                           placeholder="e.g., sarahjohnson" value="${data.githubUsername || ''}" required>
                    <span class="form-help">We'll automatically fetch your profile picture and showcase your featured repositories</span>
                </div>

                <div class="form-group">
                    <label for="description" class="form-label">Brief portfolio description</label>
                    <input type="text" id="description" name="description" class="form-input" 
                           placeholder="e.g., Creative developer passionate about user experience and clean code" value="${data.description || ''}">
                    <span class="form-help">This appears in browser tabs, search results, and social media previews</span>
                </div>

                <div class="alert alert-info">
                    <strong>💡 Pro tip:</strong> Make your tagline specific and memorable. Instead of "Software Developer," try "React Developer who loves building accessible web apps" or "Full-stack Engineer specializing in fintech solutions."
                </div>
            </div>
        `;
    }

    getSocialLinksStep(data = {}) {
        const existingLinks = data.socialLinks || [];
        
        return `
            <div class="step-header">
                <div class="step-number">2</div>
                <h2 class="step-title">Connect your digital presence</h2>
                <p class="step-subtitle">Add your professional social media profiles and portfolio links to help visitors connect with you</p>
            </div>

            <div class="step-form">
                <div class="dynamic-list" id="social-links-list">
                    ${existingLinks.length > 0 
                        ? existingLinks.map(link => this.getSocialLinkItem(link)).join('')
                        : this.getSocialLinkItem()
                    }
                </div>
                
                <button type="button" class="add-button" id="add-social-link">
                    <span>Add another social profile</span>
                </button>

                <div class="alert alert-info">
                    <strong>🎨 Available icons:</strong> github, linkedin, twitter, instagram, youtube, website, email, medium, discord, behance, dribbble, stackoverflow
                </div>

                <div class="alert alert-success">
                    <strong>✨ Quality over quantity:</strong> It's better to have 3-4 active, professional profiles than 10 outdated ones. Focus on platforms where you're genuinely active and showcase your best work.
                </div>
            </div>
        `;
    }

    getSocialLinkItem(data = {}) {
        return `
            <div class="dynamic-item">
                <div class="dynamic-item-header">
                    <h4 class="dynamic-item-title">Social Profile</h4>
                    <button type="button" class="remove-button" onclick="this.closest('.dynamic-item').remove()" title="Remove this profile">
                        ✕
                    </button>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: var(--space-4);">
                    <div class="form-group">
                        <label class="form-label">Platform</label>
                        <input type="text" name="social-name" class="form-input" 
                               placeholder="LinkedIn" value="${data.name || ''}">
                        <span class="form-help">Platform name</span>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Profile URL</label>
                        <input type="url" name="social-url" class="form-input" 
                               placeholder="https://linkedin.com/in/username" value="${data.url || ''}">
                        <span class="form-help">Full URL to your profile</span>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Icon</label>
                        <select name="social-icon" class="form-select">
                            <option value="">Choose icon...</option>
                            <option value="github" ${data.icon === 'github' ? 'selected' : ''}>GitHub</option>
                            <option value="linkedin" ${data.icon === 'linkedin' ? 'selected' : ''}>LinkedIn</option>
                            <option value="twitter" ${data.icon === 'twitter' ? 'selected' : ''}>Twitter</option>
                            <option value="instagram" ${data.icon === 'instagram' ? 'selected' : ''}>Instagram</option>
                            <option value="youtube" ${data.icon === 'youtube' ? 'selected' : ''}>YouTube</option>
                            <option value="website" ${data.icon === 'website' ? 'selected' : ''}>Website</option>
                            <option value="email" ${data.icon === 'email' ? 'selected' : ''}>Email</option>
                            <option value="medium" ${data.icon === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="discord" ${data.icon === 'discord' ? 'selected' : ''}>Discord</option>
                            <option value="behance" ${data.icon === 'behance' ? 'selected' : ''}>Behance</option>
                            <option value="dribbble" ${data.icon === 'dribbble' ? 'selected' : ''}>Dribbble</option>
                            <option value="stackoverflow" ${data.icon === 'stackoverflow' ? 'selected' : ''}>Stack Overflow</option>
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
                <h2 class="step-title">Tell your unique story</h2>
                <p class="step-subtitle">Share your background, journey, and what makes you passionate about what you do</p>
            </div>

            <div class="step-form">
                <div class="form-group">
                    <label for="about-paragraph-1" class="form-label">Introduction & Background</label>
                    <textarea id="about-paragraph-1" name="aboutParagraph1" class="form-textarea" 
                              placeholder="Start with your professional journey or current role. For example: 'I'm a passionate full-stack developer with 5 years of experience building scalable web applications. My journey began during college when I built my first website for a local business...'">${data.aboutParagraph1 || ''}</textarea>
                    <span class="form-help">Introduce yourself and share how you got started in your field</span>
                </div>

                <div class="form-group">
                    <label for="about-paragraph-2" class="form-label">Skills & Expertise</label>
                    <textarea id="about-paragraph-2" name="aboutParagraph2" class="form-textarea" 
                              placeholder="Highlight your technical skills and what you love about your work. For example: 'I specialize in React, Node.js, and cloud technologies. I'm particularly passionate about creating intuitive user experiences and writing clean, maintainable code. Recently, I've been exploring AI integration in web applications...'">${data.aboutParagraph2 || ''}</textarea>
                    <span class="form-help">Share your technical expertise, interests, and what drives you professionally</span>
                </div>

                <div class="form-group">
                    <label for="about-paragraph-3" class="form-label">Personal Touch & Goals</label>
                    <textarea id="about-paragraph-3" name="aboutParagraph3" class="form-textarea" 
                              placeholder="Add personality and future aspirations. For example: 'When I'm not coding, you can find me contributing to open source projects, mentoring junior developers, or hiking with my dog. I'm always excited to collaborate on projects that make a positive impact...'">${data.aboutParagraph3 || ''}</textarea>
                    <span class="form-help">Share your personality, hobbies, goals, or what you're excited about next</span>
                </div>

                <div class="alert alert-success">
                    <strong>✍️ Writing tips:</strong> Be authentic and specific. Use concrete examples instead of generic statements. Show your personality while maintaining professionalism. Each paragraph should flow naturally to the next.
                </div>
            </div>
        `;
    }

    getExperienceStep(data = {}) {
        const existingExperience = data.experience || [];
        
        return `
            <div class="step-header">
                <div class="step-number">4</div>
                <h2 class="step-title">Showcase your professional journey</h2>
                <p class="step-subtitle">Highlight your work experience, key achievements, and the impact you've made</p>
            </div>

            <div class="step-form">
                <div class="dynamic-list" id="experience-list">
                    ${existingExperience.length > 0 
                        ? existingExperience.map(exp => this.getExperienceItem(exp)).join('')
                        : this.getExperienceItem()
                    }
                </div>
                
                <button type="button" class="add-button" id="add-experience">
                    <span>Add another position</span>
                </button>

                <div class="alert alert-info">
                    <strong>💼 Pro tips:</strong> List experiences in reverse chronological order (most recent first). Focus on achievements and impact rather than just responsibilities. Use specific metrics and numbers when possible.
                </div>

                <div class="alert alert-warning">
                    <strong>🏢 Company logos:</strong> After downloading your config, you'll need to add company logos to the <code>assets/logos/</code> folder. We'll generate the correct file paths for you.
                </div>
            </div>
        `;
    }

    getExperienceItem(data = {}) {
        return `
            <div class="dynamic-item">
                <div class="dynamic-item-header">
                    <h4 class="dynamic-item-title">Work Experience</h4>
                    <button type="button" class="remove-button" onclick="this.closest('.dynamic-item').remove()" title="Remove this experience">
                        ✕
                    </button>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-bottom: var(--space-4);">
                    <div class="form-group">
                        <label class="form-label">Company Name</label>
                        <input type="text" name="exp-company" class="form-input" 
                               placeholder="Google" value="${data.company || ''}">
                        <span class="form-help">Full company name</span>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Job Title</label>
                        <input type="text" name="exp-role" class="form-input" 
                               placeholder="Senior Software Engineer" value="${data.role || ''}">
                        <span class="form-help">Your official job title</span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Employment Period</label>
                    <input type="text" name="exp-date" class="form-input" 
                           placeholder="Jan 2022 - Present" value="${data.date || ''}">
                    <span class="form-help">Use format like "Jan 2022 - Present" or "2020 - 2022"</span>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Key Achievements & Impact</label>
                    <textarea name="exp-responsibilities" class="form-textarea" 
                              placeholder="• Led development of a React-based dashboard that increased user engagement by 40%&#10;• Mentored 5 junior developers and established code review best practices&#10;• Architected microservices infrastructure that reduced deployment time by 60%&#10;• Collaborated with product team to deliver 15+ features ahead of schedule">${Array.isArray(data.responsibilities) ? data.responsibilities.join('\n') : (data.responsibilities || '')}</textarea>
                    <span class="form-help">Focus on achievements and impact. Use bullet points (•) and include specific metrics when possible.</span>
                </div>
            </div>
        `;
    }

    getProjectsStep(data = {}) {
        const existingProjects = data.projects || [];
        
        return `
            <div class="step-header">
                <div class="step-number">5</div>
                <h2 class="step-title">Highlight your best work</h2>
                <p class="step-subtitle">Showcase the projects you're most proud of with detailed descriptions and links</p>
            </div>

            <div class="step-form">
                <div class="dynamic-list" id="projects-list">
                    ${existingProjects.length > 0 
                        ? existingProjects.map(project => this.getProjectItem(project)).join('')
                        : this.getProjectItem()
                    }
                </div>
                
                <button type="button" class="add-button" id="add-project">
                    <span>Add another project</span>
                </button>

                <div class="alert alert-info">
                    <strong>🚀 GitHub Integration:</strong> Projects with the "featured" topic on your GitHub repositories will automatically appear in a separate section. This is for additional featured projects.
                </div>

                <div class="alert alert-success">
                    <strong>📸 Project images:</strong> After downloading your config, add project screenshots to the <code>assets/projects/</code> folder. High-quality images make a huge difference in showcasing your work!
                </div>
            </div>
        `;
    }

    getProjectItem(data = {}) {
        return `
            <div class="dynamic-item">
                <div class="dynamic-item-header">
                    <h4 class="dynamic-item-title">Featured Project</h4>
                    <button type="button" class="remove-button" onclick="this.closest('.dynamic-item').remove()" title="Remove this project">
                        ✕
                    </button>
                </div>
                
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-4); margin-bottom: var(--space-4);">
                    <div class="form-group">
                        <label class="form-label">Project Name</label>
                        <input type="text" name="project-name" class="form-input" 
                               placeholder="E-commerce Platform" value="${data.name || ''}">
                        <span class="form-help">Give your project a clear, descriptive name</span>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Year/Date</label>
                        <input type="text" name="project-date" class="form-input" 
                               placeholder="2024" value="${data.date || ''}">
                        <span class="form-help">When you completed this project</span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Project Description & Features</label>
                    <textarea name="project-description" class="form-textarea" 
                              placeholder="• Built a full-stack e-commerce platform using React, Node.js, and PostgreSQL&#10;• Implemented secure payment processing with Stripe integration&#10;• Designed responsive UI/UX that increased conversion rates by 35%&#10;• Deployed on AWS with CI/CD pipeline for automated testing and deployment">${Array.isArray(data.description) ? data.description.join('\n') : (data.description || '')}</textarea>
                    <span class="form-help">Describe what you built, technologies used, and key features. Use bullet points for better readability.</span>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
                    <div class="form-group">
                        <label class="form-label">Live Demo / Repository Link</label>
                        <input type="url" name="project-link" class="form-input" 
                               placeholder="https://demo.example.com" value="${data.link || ''}">
                        <span class="form-help">Link to live demo, GitHub repo, or case study</span>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Screenshot Path</label>
                        <input type="text" name="project-picture" class="form-input" 
                               placeholder="assets/projects/ecommerce-platform.jpg" value="${data.picture || ''}">
                        <span class="form-help">Path where you'll upload the project image</span>
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
                <h2 class="step-title">Showcase your expertise</h2>
                <p class="step-subtitle">Organize your skills into categories to give visitors a clear picture of your capabilities</p>
            </div>

            <div class="step-form">
                <div class="dynamic-list" id="skills-list">
                    ${existingSkills.length > 0 
                        ? existingSkills.map(category => this.getSkillCategoryItem(category)).join('')
                        : this.getSkillCategoryItem()
                    }
                </div>
                
                <button type="button" class="add-button" id="add-skill-category">
                    <span>Add another skill category</span>
                </button>

                <div class="alert alert-info">
                    <strong>💡 Category suggestions:</strong> Programming Languages, Frontend Frameworks, Backend Technologies, Databases, Cloud Platforms, DevOps Tools, Design Software, Certifications
                </div>

                <div class="alert alert-success">
                    <strong>🎯 Quality tip:</strong> Focus on skills you're genuinely proficient in. It's better to list 5 skills you know well than 20 you've only touched briefly. Employers appreciate honesty and depth over breadth.
                </div>
            </div>
        `;
    }

    getSkillCategoryItem(data = {}) {
        return `
            <div class="dynamic-item">
                <div class="dynamic-item-header">
                    <h4 class="dynamic-item-title">Skill Category</h4>
                    <button type="button" class="remove-button" onclick="this.closest('.dynamic-item').remove()" title="Remove this category">
                        ✕
                    </button>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Category Name</label>
                    <input type="text" name="skill-category-name" class="form-input" 
                           placeholder="Programming Languages" value="${data.name || ''}">
                    <span class="form-help">Name for this group of skills</span>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Skills in this Category</label>
                    <textarea name="skill-items" class="form-textarea" 
                              placeholder="JavaScript&#10;TypeScript&#10;Python&#10;React&#10;Node.js&#10;PostgreSQL">${Array.isArray(data.items) ? data.items.join('\n') : (data.items || '')}</textarea>
                    <span class="form-help">List one skill per line. Order them by proficiency or importance.</span>
                </div>
            </div>
        `;
    }

    getSettingsStep(data = {}) {
        return `
            <div class="step-header">
                <div class="step-number">7</div>
                <h2 class="step-title">Final customizations</h2>
                <p class="step-subtitle">Choose which sections to include and add the finishing touches to your portfolio</p>
            </div>

            <div class="step-form">
                <div class="form-group">
                    <label class="form-label">Portfolio Sections</label>
                    <p class="form-help mb-6">Toggle the sections you want to include in your portfolio. All sections are enabled by default.</p>
                    
                    <div class="feature-toggle" onclick="this.querySelector('.toggle-switch').click()">
                        <div class="feature-info">
                            <h4>📖 About Section</h4>
                            <p>Display your personal story and background</p>
                        </div>
                        <div class="toggle-switch active" data-feature="aboutEnabled" tabindex="0"></div>
                    </div>
                    
                    <div class="feature-toggle" onclick="this.querySelector('.toggle-switch').click()">
                        <div class="feature-info">
                            <h4>💼 Experience Section</h4>
                            <p>Showcase your work history and achievements</p>
                        </div>
                        <div class="toggle-switch active" data-feature="experienceEnabled" tabindex="0"></div>
                    </div>
                    
                    <div class="feature-toggle" onclick="this.querySelector('.toggle-switch').click()">
                        <div class="feature-info">
                            <h4>🚀 Featured Projects</h4>
                            <p>Highlight your best work and case studies</p>
                        </div>
                        <div class="toggle-switch active" data-feature="projectsEnabled" tabindex="0"></div>
                    </div>
                    
                    <div class="feature-toggle" onclick="this.querySelector('.toggle-switch').click()">
                        <div class="feature-info">
                            <h4>🛠️ Skills Section</h4>
                            <p>Display your technical and professional skills</p>
                        </div>
                        <div class="toggle-switch active" data-feature="skillsEnabled" tabindex="0"></div>
                    </div>
                    
                    <div class="feature-toggle" onclick="this.querySelector('.toggle-switch').click()">
                        <div class="feature-info">
                            <h4>📂 GitHub Projects</h4>
                            <p>Automatically show repositories with "featured" topic</p>
                        </div>
                        <div class="toggle-switch active" data-feature="githubProjectsEnabled" tabindex="0"></div>
                    </div>
                </div>

                <div class="divider"></div>

                <div class="form-group">
                    <label for="footer-tagline" class="form-label">Footer Call-to-Action</label>
                    <input type="text" id="footer-tagline" name="footerTagline" class="form-input" 
                           placeholder="Let's connect and build something amazing together!" 
                           value="${data.footerTagline || 'Let\'s connect and build something amazing together!'}">
                    <span class="form-help">An inspiring message or call-to-action for your footer</span>
                </div>

                <div class="alert alert-success">
                    <strong>🎉 Almost there!</strong> Review your settings and click "Generate Configuration" to create your portfolio config file. You're just one step away from having a professional portfolio!
                </div>
            </div>
        `;
    }
}
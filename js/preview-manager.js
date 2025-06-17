// Preview Manager - Handles the live preview functionality
export class PreviewManager {
    constructor() {
        this.previewPanel = null;
        this.isOpen = false;
        this.currentConfig = {};
    }

    init() {
        this.createPreviewPanel();
        this.setupEventListeners();
    }

    createPreviewPanel() {
        // Create preview panel HTML
        const panel = document.createElement('div');
        panel.className = 'preview-panel';
        panel.id = 'preview-panel';
        
        panel.innerHTML = `
            <div class="preview-panel-header">
                <h3>Live Preview</h3>
                <button class="btn btn-secondary" id="close-preview">✕</button>
            </div>
            <div class="preview-panel-content" id="preview-content">
                <p class="text-muted">Start filling out the form to see a preview of your configuration.</p>
            </div>
        `;

        document.body.appendChild(panel);
        this.previewPanel = panel;
    }

    setupEventListeners() {
        // Listen for preview toggle events
        document.addEventListener('preview:toggle', () => {
            this.toggle();
        });

        // Close button
        const closeBtn = document.getElementById('close-preview');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.close();
            });
        }

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Close when clicking outside (on mobile)
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.previewPanel.contains(e.target) && 
                !e.target.closest('#preview-btn')) {
                this.close();
            }
        });
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        if (this.previewPanel) {
            this.previewPanel.classList.add('open');
            this.isOpen = true;
            this.updatePreviewContent();
        }
    }

    close() {
        if (this.previewPanel) {
            this.previewPanel.classList.remove('open');
            this.isOpen = false;
        }
    }

    updatePreview(config) {
        this.currentConfig = config;
        if (this.isOpen) {
            this.updatePreviewContent();
        }
    }

    updatePreviewContent() {
        const content = document.getElementById('preview-content');
        if (!content) return;

        const config = this.currentConfig;
        
        if (Object.keys(config).length === 0) {
            content.innerHTML = '<p class="text-muted">Start filling out the form to see a preview of your configuration.</p>';
            return;
        }

        let previewHTML = '<div class="preview-sections">';

        // Header preview
        if (config.name || config.tagline) {
            previewHTML += `
                <div class="preview-section">
                    <h4>Header</h4>
                    ${config.name ? `<p><strong>Name:</strong> ${config.name}</p>` : ''}
                    ${config.tagline ? `<p><strong>Tagline:</strong> ${config.tagline}</p>` : ''}
                    ${config.githubUsername ? `<p><strong>GitHub:</strong> @${config.githubUsername}</p>` : ''}
                </div>
            `;
        }

        // Social Links preview
        if (config.socialLinks && config.socialLinks.length > 0) {
            previewHTML += `
                <div class="preview-section">
                    <h4>Social Links (${config.socialLinks.length})</h4>
                    <ul class="preview-list">
                        ${config.socialLinks.map(link => 
                            `<li><strong>${link.name}:</strong> ${link.icon || 'No icon'}</li>`
                        ).join('')}
                    </ul>
                </div>
            `;
        }

        // About preview
        const aboutText = [config.aboutParagraph1, config.aboutParagraph2, config.aboutParagraph3]
            .filter(p => p && p.trim()).length;
        if (aboutText > 0) {
            previewHTML += `
                <div class="preview-section">
                    <h4>About Section</h4>
                    <p>${aboutText} paragraph${aboutText > 1 ? 's' : ''} written</p>
                </div>
            `;
        }

        // Experience preview
        if (config.experience && config.experience.length > 0) {
            previewHTML += `
                <div class="preview-section">
                    <h4>Experience (${config.experience.length} position${config.experience.length > 1 ? 's' : ''})</h4>
                    <ul class="preview-list">
                        ${config.experience.map(exp => 
                            `<li><strong>${exp.role}</strong> at ${exp.company}</li>`
                        ).join('')}
                    </ul>
                </div>
            `;
        }

        // Projects preview
        if (config.projects && config.projects.length > 0) {
            previewHTML += `
                <div class="preview-section">
                    <h4>Projects (${config.projects.length})</h4>
                    <ul class="preview-list">
                        ${config.projects.map(project => 
                            `<li><strong>${project.name}</strong>${project.date ? ` (${project.date})` : ''}</li>`
                        ).join('')}
                    </ul>
                </div>
            `;
        }

        // Skills preview
        if (config.skillCategories && config.skillCategories.length > 0) {
            const totalSkills = config.skillCategories.reduce((total, cat) => 
                total + (Array.isArray(cat.items) ? cat.items.length : 0), 0);
            previewHTML += `
                <div class="preview-section">
                    <h4>Skills (${config.skillCategories.length} categories, ${totalSkills} skills)</h4>
                    <ul class="preview-list">
                        ${config.skillCategories.map(cat => 
                            `<li><strong>${cat.name}:</strong> ${Array.isArray(cat.items) ? cat.items.length : 0} skills</li>`
                        ).join('')}
                    </ul>
                </div>
            `;
        }

        // Feature flags preview
        const enabledFeatures = [];
        if (config.aboutEnabled !== false) enabledFeatures.push('About');
        if (config.experienceEnabled !== false) enabledFeatures.push('Experience');
        if (config.projectsEnabled !== false) enabledFeatures.push('Projects');
        if (config.skillsEnabled !== false) enabledFeatures.push('Skills');
        if (config.githubProjectsEnabled !== false) enabledFeatures.push('GitHub Projects');

        if (enabledFeatures.length > 0) {
            previewHTML += `
                <div class="preview-section">
                    <h4>Enabled Sections</h4>
                    <p>${enabledFeatures.join(', ')}</p>
                </div>
            `;
        }

        previewHTML += '</div>';

        // Add completion status
        const completionPercentage = this.calculateCompletionPercentage(config);
        previewHTML = `
            <div class="preview-completion">
                <h4>Completion Status</h4>
                <div class="progress-bar" style="margin-bottom: 1rem;">
                    <div class="progress-fill" style="width: ${completionPercentage}%;"></div>
                </div>
                <p>${completionPercentage}% Complete</p>
            </div>
            ${previewHTML}
        `;

        content.innerHTML = previewHTML;
    }

    calculateCompletionPercentage(config) {
        let completed = 0;
        let total = 0;

        // Basic info (30% weight)
        total += 3;
        if (config.name && config.name.trim()) completed += 1;
        if (config.tagline && config.tagline.trim()) completed += 1;
        if (config.githubUsername && config.githubUsername.trim()) completed += 1;

        // Social links (10% weight)
        total += 1;
        if (config.socialLinks && config.socialLinks.length > 0) completed += 1;

        // About section (15% weight)
        total += 1;
        const aboutParagraphs = [config.aboutParagraph1, config.aboutParagraph2, config.aboutParagraph3]
            .filter(p => p && p.trim()).length;
        if (aboutParagraphs > 0) completed += 1;

        // Experience (15% weight)
        total += 1;
        if (config.experience && config.experience.length > 0) completed += 1;

        // Projects (15% weight)
        total += 1;
        if (config.projects && config.projects.length > 0) completed += 1;

        // Skills (15% weight)
        total += 1;
        if (config.skillCategories && config.skillCategories.length > 0) completed += 1;

        return Math.round((completed / total) * 100);
    }
}

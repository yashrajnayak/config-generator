// Wizard Controller - Manages the step-by-step interface
import { WizardSteps } from './wizard-steps.js';

export class WizardController {
    constructor() {
        this.currentStep = 0;
        this.totalSteps = 7; // Basic Info, Social Links, About, Experience, Projects, Skills, Settings
        this.stepData = {};
        this.container = null;
        this.wizardSteps = new WizardSteps();
    }

    init(container) {
        this.container = container;
        this.render();
        this.showStep(0);
    }

    render() {
        this.container.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill" id="progress-fill"></div>
            </div>
            
            <div class="step-navigation" id="step-navigation">
                <div class="step-indicator">
                    <div class="step-number active" id="step-number">1</div>
                    <div class="step-info">
                        <h3 id="step-title">Basic Information</h3>
                        <p id="step-subtitle">Let's start with your basic details</p>
                    </div>
                </div>
                <div class="step-counter">
                    <span id="step-counter">Step 1 of ${this.totalSteps}</span>
                </div>
            </div>

            <div class="step-content" id="step-content">
                <!-- Step content will be loaded here -->
            </div>

            <div class="step-actions">
                <button class="btn btn-secondary" id="prev-btn" style="visibility: hidden;">
                    ← Previous
                </button>
                <div class="btn-group">
                    <button class="btn btn-secondary" id="preview-btn">
                        👁️ Preview
                    </button>
                    <button class="btn" id="next-btn">
                        Next →
                    </button>
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const previewBtn = document.getElementById('preview-btn');

        prevBtn.addEventListener('click', () => this.previousStep());
        nextBtn.addEventListener('click', () => this.nextStep());
        previewBtn.addEventListener('click', () => this.togglePreview());
    }

    showStep(stepIndex) {
        this.currentStep = stepIndex;
        this.updateProgress();
        this.updateNavigation();
        this.loadStepContent();
        this.updateButtons();
    }

    updateProgress() {
        const progress = ((this.currentStep + 1) / this.totalSteps) * 100;
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
    }

    updateNavigation() {
        const stepNumber = document.getElementById('step-number');
        const stepTitle = document.getElementById('step-title');
        const stepSubtitle = document.getElementById('step-subtitle');
        const stepCounter = document.getElementById('step-counter');

        const steps = [
            { title: 'Basic Information', subtitle: 'Your name, tagline, and GitHub username' },
            { title: 'Social Links', subtitle: 'Connect your professional profiles' },
            { title: 'About Section', subtitle: 'Tell your story' },
            { title: 'Experience', subtitle: 'Your work history and achievements' },
            { title: 'Projects', subtitle: 'Showcase your best work' },
            { title: 'Skills', subtitle: 'Your technical and professional abilities' },
            { title: 'Settings', subtitle: 'SEO, features, and final touches' }
        ];

        if (stepNumber) stepNumber.textContent = this.currentStep + 1;
        if (stepTitle) stepTitle.textContent = steps[this.currentStep].title;
        if (stepSubtitle) stepSubtitle.textContent = steps[this.currentStep].subtitle;
        if (stepCounter) stepCounter.textContent = `Step ${this.currentStep + 1} of ${this.totalSteps}`;
    }

    loadStepContent() {
        const stepContent = document.getElementById('step-content');
        if (!stepContent) return;

        // Add animation class
        stepContent.classList.remove('prev');
        void stepContent.offsetWidth; // Force reflow
        
        switch (this.currentStep) {
            case 0:
                stepContent.innerHTML = this.wizardSteps.getBasicInfoStep(this.stepData);
                break;
            case 1:
                stepContent.innerHTML = this.wizardSteps.getSocialLinksStep(this.stepData);
                break;
            case 2:
                stepContent.innerHTML = this.wizardSteps.getAboutStep(this.stepData);
                break;
            case 3:
                stepContent.innerHTML = this.wizardSteps.getExperienceStep(this.stepData);
                break;
            case 4:
                stepContent.innerHTML = this.wizardSteps.getProjectsStep(this.stepData);
                break;
            case 5:
                stepContent.innerHTML = this.wizardSteps.getSkillsStep(this.stepData);
                break;
            case 6:
                stepContent.innerHTML = this.wizardSteps.getSettingsStep(this.stepData);
                break;
        }

        // Setup step-specific event listeners
        this.setupStepEventListeners();
    }

    setupStepEventListeners() {
        // Add dynamic list functionality
        this.setupDynamicLists();
        
        // Setup form change listeners
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.collectStepData());
            input.addEventListener('change', () => this.collectStepData());
        });

        // Setup toggle switches
        const toggles = document.querySelectorAll('.toggle-switch');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                this.collectStepData();
            });
        });
    }

    setupDynamicLists() {
        // Add item buttons
        const addButtons = document.querySelectorAll('.btn-add');
        addButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const listType = e.target.dataset.listType;
                this.addListItem(listType);
            });
        });

        // Remove item buttons
        const removeButtons = document.querySelectorAll('.btn-remove');
        removeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const item = e.target.closest('.dynamic-list-item');
                if (item) {
                    item.remove();
                    this.collectStepData();
                }
            });
        });
    }

    addListItem(listType) {
        const container = document.querySelector(`[data-list="${listType}"]`);
        if (!container) return;

        let itemHTML = '';
        switch (listType) {
            case 'social-links':
                itemHTML = this.wizardSteps.getSocialLinkItemTemplate();
                break;
            case 'experience':
                itemHTML = this.wizardSteps.getExperienceItemTemplate();
                break;
            case 'projects':
                itemHTML = this.wizardSteps.getProjectItemTemplate();
                break;
            case 'skills':
                itemHTML = this.wizardSteps.getSkillCategoryTemplate();
                break;
        }

        const wrapper = document.createElement('div');
        wrapper.innerHTML = itemHTML;
        const newItem = wrapper.firstElementChild;
        
        container.appendChild(newItem);
        this.setupStepEventListeners();
        
        // Focus on first input
        const firstInput = newItem.querySelector('input, textarea');
        if (firstInput) {
            firstInput.focus();
        }
    }

    collectStepData() {
        const stepContent = document.getElementById('step-content');
        if (!stepContent) return;

        const formData = new FormData();
        const inputs = stepContent.querySelectorAll('input, textarea, select');
        
        const data = {};
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                data[input.name] = input.checked;
            } else if (input.value.trim()) {
                data[input.name] = input.value.trim();
            }
        });

        // Handle toggle switches
        const toggles = stepContent.querySelectorAll('.toggle-switch.active');
        toggles.forEach(toggle => {
            const name = toggle.dataset.feature;
            if (name) {
                data[name] = true;
            }
        });

        // Handle dynamic lists
        this.collectDynamicListData(data, stepContent);

        this.stepData[this.currentStep] = data;
        
        // Emit config update event
        document.dispatchEvent(new CustomEvent('wizard:configUpdated', {
            detail: this.getAllStepData()
        }));
    }

    collectDynamicListData(data, container) {
        // Social links
        const socialItems = container.querySelectorAll('[data-list="social-links"] .dynamic-list-item');
        if (socialItems.length > 0) {
            data.socialLinks = Array.from(socialItems).map(item => ({
                name: item.querySelector('[name="social-name"]')?.value || '',
                url: item.querySelector('[name="social-url"]')?.value || '',
                icon: item.querySelector('[name="social-icon"]')?.value || ''
            })).filter(link => link.name && link.url);
        }

        // Experience items
        const expItems = container.querySelectorAll('[data-list="experience"] .dynamic-list-item');
        if (expItems.length > 0) {
            data.experience = Array.from(expItems).map(item => ({
                company: item.querySelector('[name="exp-company"]')?.value || '',
                role: item.querySelector('[name="exp-role"]')?.value || '',
                date: item.querySelector('[name="exp-date"]')?.value || '',
                responsibilities: item.querySelector('[name="exp-responsibilities"]')?.value.split('\n').filter(r => r.trim()) || []
            })).filter(exp => exp.company && exp.role);
        }

        // Projects
        const projectItems = container.querySelectorAll('[data-list="projects"] .dynamic-list-item');
        if (projectItems.length > 0) {
            data.projects = Array.from(projectItems).map(item => ({
                name: item.querySelector('[name="project-name"]')?.value || '',
                date: item.querySelector('[name="project-date"]')?.value || '',
                description: item.querySelector('[name="project-description"]')?.value.split('\n').filter(d => d.trim()) || [],
                link: item.querySelector('[name="project-link"]')?.value || '',
                picture: item.querySelector('[name="project-picture"]')?.value || ''
            })).filter(project => project.name);
        }

        // Skills
        const skillCategories = container.querySelectorAll('[data-list="skills"] .dynamic-list-item');
        if (skillCategories.length > 0) {
            data.skillCategories = Array.from(skillCategories).map(item => ({
                name: item.querySelector('[name="skill-category-name"]')?.value || '',
                items: item.querySelector('[name="skill-items"]')?.value.split('\n').filter(s => s.trim()) || []
            })).filter(category => category.name && category.items.length > 0);
        }
    }

    getAllStepData() {
        // Combine all step data into a cohesive config object
        const allData = {};
        Object.values(this.stepData).forEach(stepData => {
            Object.assign(allData, stepData);
        });
        return allData;
    }

    updateButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (prevBtn) {
            prevBtn.style.visibility = this.currentStep === 0 ? 'hidden' : 'visible';
        }

        if (nextBtn) {
            if (this.currentStep === this.totalSteps - 1) {
                nextBtn.textContent = '✅ Generate Config';
                nextBtn.classList.add('btn-download');
            } else {
                nextBtn.textContent = 'Next →';
                nextBtn.classList.remove('btn-download');
            }
        }
    }

    nextStep() {
        this.collectStepData();
        
        if (this.currentStep < this.totalSteps - 1) {
            this.showStep(this.currentStep + 1);
        } else {
            // Complete wizard
            document.dispatchEvent(new CustomEvent('wizard:completed'));
        }
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.showStep(this.currentStep - 1);
            
            // Add animation class for reverse direction
            const stepContent = document.getElementById('step-content');
            if (stepContent) {
                stepContent.classList.add('prev');
            }
        }
    }

    togglePreview() {
        document.dispatchEvent(new CustomEvent('preview:toggle'));
    }
}

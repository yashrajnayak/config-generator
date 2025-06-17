// Modern Wizard Controller with smooth animations and better UX
import { WizardSteps } from './wizard-steps.js';

export class WizardController {
    constructor() {
        this.currentStep = 0;
        this.totalSteps = 7;
        this.stepData = {};
        this.wizardSteps = new WizardSteps();
        this.isAnimating = false;
    }

    init() {
        this.setupEventListeners();
        this.showStep(0);
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('prev-button').addEventListener('click', () => this.previousStep());
        document.getElementById('next-button').addEventListener('click', () => this.nextStep());
        document.getElementById('close-wizard').addEventListener('click', () => this.closeWizard());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeWizard();
            }
        });
    }

    showStep(stepIndex) {
        if (this.isAnimating) return;
        
        this.currentStep = stepIndex;
        this.updateProgress();
        this.updateNavigation();
        this.loadStepContent();
    }

    updateProgress() {
        const progress = ((this.currentStep + 1) / this.totalSteps) * 100;
        const progressFill = document.getElementById('progress-fill');
        const stepCounter = document.getElementById('step-counter');
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        if (stepCounter) {
            stepCounter.textContent = `Step ${this.currentStep + 1} of ${this.totalSteps}`;
        }
    }

    updateNavigation() {
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');

        // Previous button
        prevButton.disabled = this.currentStep === 0;
        
        // Next button
        if (this.currentStep === this.totalSteps - 1) {
            nextButton.textContent = '✨ Generate Config';
            nextButton.classList.add('btn-primary');
        } else {
            nextButton.textContent = 'Next →';
            nextButton.classList.remove('btn-primary');
        }
    }

    async loadStepContent() {
        const stepInner = document.getElementById('step-inner');
        if (!stepInner) return;

        // Add fade out animation
        this.isAnimating = true;
        stepInner.style.opacity = '0';
        stepInner.style.transform = 'translateY(20px)';

        // Wait for animation
        await new Promise(resolve => setTimeout(resolve, 200));

        // Load new content
        let content = '';
        switch (this.currentStep) {
            case 0:
                content = this.wizardSteps.getBasicInfoStep(this.getAllStepData());
                break;
            case 1:
                content = this.wizardSteps.getSocialLinksStep(this.getAllStepData());
                break;
            case 2:
                content = this.wizardSteps.getAboutStep(this.getAllStepData());
                break;
            case 3:
                content = this.wizardSteps.getExperienceStep(this.getAllStepData());
                break;
            case 4:
                content = this.wizardSteps.getProjectsStep(this.getAllStepData());
                break;
            case 5:
                content = this.wizardSteps.getSkillsStep(this.getAllStepData());
                break;
            case 6:
                content = this.wizardSteps.getSettingsStep(this.getAllStepData());
                break;
        }

        stepInner.innerHTML = content;

        // Setup step-specific event listeners
        this.setupStepEventListeners();

        // Fade in animation
        stepInner.style.opacity = '1';
        stepInner.style.transform = 'translateY(0)';
        
        this.isAnimating = false;

        // Focus first input
        const firstInput = stepInner.querySelector('input, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 300);
        }
    }

    setupStepEventListeners() {
        // Form input listeners
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.collectStepData());
            input.addEventListener('change', () => this.collectStepData());
        });

        // Toggle switches
        const toggles = document.querySelectorAll('.toggle-switch');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                this.collectStepData();
            });
        });

        // Dynamic list buttons
        this.setupDynamicListButtons();
    }

    setupDynamicListButtons() {
        // Add buttons
        const addButtons = document.querySelectorAll('.add-button');
        addButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const buttonId = e.target.closest('button').id;
                this.addListItem(buttonId);
            });
        });

        // Remove buttons are handled inline with onclick
    }

    addListItem(buttonId) {
        let listContainer, template;
        
        switch (buttonId) {
            case 'add-social-link':
                listContainer = document.getElementById('social-links-list');
                template = this.wizardSteps.getSocialLinkItem();
                break;
            case 'add-experience':
                listContainer = document.getElementById('experience-list');
                template = this.wizardSteps.getExperienceItem();
                break;
            case 'add-project':
                listContainer = document.getElementById('projects-list');
                template = this.wizardSteps.getProjectItem();
                break;
            case 'add-skill-category':
                listContainer = document.getElementById('skills-list');
                template = this.wizardSteps.getSkillCategoryItem();
                break;
        }

        if (listContainer && template) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = template;
            const newItem = wrapper.firstElementChild;
            
            // Add animation
            newItem.style.opacity = '0';
            newItem.style.transform = 'translateY(20px)';
            
            listContainer.appendChild(newItem);
            
            // Animate in
            setTimeout(() => {
                newItem.style.opacity = '1';
                newItem.style.transform = 'translateY(0)';
            }, 50);

            // Setup event listeners for new item
            this.setupStepEventListeners();
            
            // Focus first input
            const firstInput = newItem.querySelector('input, textarea');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 300);
            }
        }
    }

    collectStepData() {
        const stepInner = document.getElementById('step-inner');
        if (!stepInner) return;

        const data = {};
        
        // Collect form inputs
        const inputs = stepInner.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                data[input.name] = input.checked;
            } else if (input.value.trim()) {
                data[input.name] = input.value.trim();
            }
        });

        // Collect toggle switches
        const toggles = stepInner.querySelectorAll('.toggle-switch');
        toggles.forEach(toggle => {
            const feature = toggle.dataset.feature;
            if (feature) {
                data[feature] = toggle.classList.contains('active');
            }
        });

        // Collect dynamic lists
        this.collectDynamicListData(data, stepInner);

        // Store step data
        this.stepData[this.currentStep] = data;

        // Emit update event
        document.dispatchEvent(new CustomEvent('wizard:configUpdated', {
            detail: this.getAllStepData()
        }));
    }

    collectDynamicListData(data, container) {
        // Social links
        const socialItems = container.querySelectorAll('#social-links-list .dynamic-item');
        if (socialItems.length > 0) {
            data.socialLinks = Array.from(socialItems).map(item => ({
                name: item.querySelector('[name="social-name"]')?.value || '',
                url: item.querySelector('[name="social-url"]')?.value || '',
                icon: item.querySelector('[name="social-icon"]')?.value || ''
            })).filter(link => link.name && link.url);
        }

        // Experience
        const expItems = container.querySelectorAll('#experience-list .dynamic-item');
        if (expItems.length > 0) {
            data.experience = Array.from(expItems).map(item => ({
                company: item.querySelector('[name="exp-company"]')?.value || '',
                role: item.querySelector('[name="exp-role"]')?.value || '',
                date: item.querySelector('[name="exp-date"]')?.value || '',
                responsibilities: item.querySelector('[name="exp-responsibilities"]')?.value.split('\n').filter(r => r.trim()) || []
            })).filter(exp => exp.company && exp.role);
        }

        // Projects
        const projectItems = container.querySelectorAll('#projects-list .dynamic-item');
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
        const skillItems = container.querySelectorAll('#skills-list .dynamic-item');
        if (skillItems.length > 0) {
            data.skillCategories = Array.from(skillItems).map(item => ({
                name: item.querySelector('[name="skill-category-name"]')?.value || '',
                items: item.querySelector('[name="skill-items"]')?.value.split('\n').filter(s => s.trim()) || []
            })).filter(category => category.name && category.items.length > 0);
        }
    }

    getAllStepData() {
        const allData = {};
        Object.values(this.stepData).forEach(stepData => {
            Object.assign(allData, stepData);
        });
        return allData;
    }

    async nextStep() {
        if (this.isAnimating) return;
        
        this.collectStepData();
        
        if (this.currentStep < this.totalSteps - 1) {
            this.showStep(this.currentStep + 1);
        } else {
            // Complete wizard
            document.dispatchEvent(new CustomEvent('wizard:completed'));
        }
    }

    async previousStep() {
        if (this.isAnimating || this.currentStep === 0) return;
        
        this.showStep(this.currentStep - 1);
    }

    closeWizard() {
        const welcomeScreen = document.getElementById('welcome-screen');
        const wizardContainer = document.getElementById('wizard-container');
        
        if (welcomeScreen && wizardContainer) {
            wizardContainer.style.display = 'none';
            welcomeScreen.style.display = 'flex';
        }
    }
}
// Main application entry point
import { WizardController } from './wizard-controller.js';
import { ConfigGenerator } from './config-generator.js';
import { PreviewManager } from './preview-manager.js';

class PortfolioConfigApp {
    constructor() {
        this.wizardController = new WizardController();
        this.configGenerator = new ConfigGenerator();
        this.previewManager = new PreviewManager();
        
        this.currentConfig = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
    }

    setupEventListeners() {
        // Start generator button
        const startBtn = document.getElementById('start-generator');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.startWizard();
            });
        }

        // Listen for wizard events
        document.addEventListener('wizard:stepCompleted', (e) => {
            this.handleStepCompleted(e.detail);
        });

        document.addEventListener('wizard:configUpdated', (e) => {
            this.currentConfig = { ...this.currentConfig, ...e.detail };
            this.previewManager.updatePreview(this.currentConfig);
        });

        document.addEventListener('wizard:completed', () => {
            this.handleWizardCompleted();
        });
    }

    initializeComponents() {
        this.previewManager.init();
    }

    startWizard() {
        // Hide the welcome content and show the wizard
        const wizardContainer = document.getElementById('wizard-container');
        if (wizardContainer) {
            wizardContainer.style.display = 'block';
            wizardContainer.innerHTML = ''; // Clear any existing content
            
            this.wizardController.init(wizardContainer);
            
            // Scroll to wizard
            wizardContainer.scrollIntoView({ behavior: 'smooth' });
        }
    }

    handleStepCompleted(stepData) {
        console.log('Step completed:', stepData);
        // You could add analytics or other tracking here
    }

    handleWizardCompleted() {
        const finalConfig = this.configGenerator.generateFinalConfig(this.currentConfig);
        this.downloadConfig(finalConfig);
    }

    downloadConfig(config) {
        // Create and download the config.json file
        const configJson = JSON.stringify(config, null, 2);
        const blob = new Blob([configJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'config.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Show success message
        this.showSuccessMessage();
    }

    showSuccessMessage() {
        const wizardContainer = document.getElementById('wizard-container');
        if (wizardContainer) {
            wizardContainer.innerHTML = `
                <div class="completion-screen">
                    <span class="success-icon">🎉</span>
                    <h2>Configuration Complete!</h2>
                    <p>Your config.json file has been downloaded successfully.</p>
                    
                    <div class="download-section">
                        <h3>Next Steps:</h3>
                        <ol style="text-align: left; display: inline-block; margin: 1rem 0;">
                            <li>Replace the config.json file in your portfolio repository</li>
                            <li>Add any project images to the assets/projects/ folder</li>
                            <li>Add company logos to the assets/logos/ folder</li>
                            <li>Commit and push your changes to GitHub</li>
                            <li>Your portfolio will update automatically!</li>
                        </ol>
                    </div>

                    <div class="alert alert-info">
                        <strong>Pro Tip:</strong> You can run this generator again anytime to update your portfolio configuration.
                    </div>

                    <button class="btn start-btn" onclick="location.reload()">
                        🔄 Create Another Configuration
                    </button>
                </div>
            `;
        }
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioConfigApp();
});

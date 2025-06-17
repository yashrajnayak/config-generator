// Main application with modern UX
import { WizardController } from './wizard-controller.js';
import { ConfigGenerator } from './config-generator.js';

class PortfolioConfigApp {
    constructor() {
        this.wizardController = new WizardController();
        this.configGenerator = new ConfigGenerator();
        this.currentConfig = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Start wizard button
        const startButton = document.getElementById('start-wizard');
        if (startButton) {
            startButton.addEventListener('click', () => {
                this.startWizard();
            });
        }

        // Listen for wizard events
        document.addEventListener('wizard:configUpdated', (e) => {
            this.currentConfig = { ...this.currentConfig, ...e.detail };
        });

        document.addEventListener('wizard:completed', () => {
            this.handleWizardCompleted();
        });
    }

    startWizard() {
        const welcomeScreen = document.getElementById('welcome-screen');
        const wizardContainer = document.getElementById('wizard-container');
        
        if (welcomeScreen && wizardContainer) {
            // Hide welcome screen with animation
            welcomeScreen.style.opacity = '0';
            welcomeScreen.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                wizardContainer.style.display = 'block';
                
                // Initialize wizard
                this.wizardController.init();
                
                // Animate wizard in
                wizardContainer.style.opacity = '0';
                setTimeout(() => {
                    wizardContainer.style.opacity = '1';
                }, 50);
            }, 300);
        }
    }

    handleWizardCompleted() {
        const finalConfig = this.configGenerator.generateFinalConfig(this.currentConfig);
        this.showCompletionScreen(finalConfig);
    }

    showCompletionScreen(config) {
        const wizardContainer = document.getElementById('wizard-container');
        if (!wizardContainer) return;

        wizardContainer.innerHTML = `
            <div class="completion-screen">
                <div class="completion-content">
                    <span class="success-icon">🎉</span>
                    <h2>Your portfolio is ready!</h2>
                    <p>We've generated your configuration file. Download it and follow the setup instructions to get your portfolio live.</p>
                    
                    <div class="download-section">
                        <h3 style="color: white; margin-bottom: 1rem;">Next Steps:</h3>
                        <ol style="text-align: left; display: inline-block; margin: 1rem 0; color: rgba(255,255,255,0.9);">
                            <li>Download your config.json file</li>
                            <li>Replace the existing config.json in your portfolio repository</li>
                            <li>Add project images to assets/projects/ folder</li>
                            <li>Add company logos to assets/logos/ folder</li>
                            <li>Commit and push your changes to GitHub</li>
                        </ol>
                        
                        <button class="download-button" id="download-config">
                            📥 Download config.json
                        </button>
                    </div>

                    <button class="btn btn-ghost" onclick="location.reload()" style="color: rgba(255,255,255,0.8); border: 1px solid rgba(255,255,255,0.3); margin-top: 2rem;">
                        🔄 Create Another Configuration
                    </button>
                </div>
            </div>
        `;

        // Setup download button
        document.getElementById('download-config').addEventListener('click', () => {
            this.downloadConfig(config);
        });
    }

    downloadConfig(config) {
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

        // Show success feedback
        const downloadButton = document.getElementById('download-config');
        if (downloadButton) {
            const originalText = downloadButton.textContent;
            downloadButton.textContent = '✅ Downloaded!';
            downloadButton.style.background = 'var(--accent)';
            
            setTimeout(() => {
                downloadButton.textContent = originalText;
                downloadButton.style.background = 'var(--white)';
            }, 2000);
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioConfigApp();
});
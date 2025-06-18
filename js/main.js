// Enhanced Main Application with Better UX
import { WizardController } from './wizard-controller.js';
import { ConfigGenerator } from './config-generator.js';

class PortfolioConfigApp {
    constructor() {
        this.wizardController = new WizardController();
        this.configGenerator = new ConfigGenerator();
        this.currentConfig = {};
        this.isInitialized = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAccessibility();
        this.preloadResources();
    }

    setupEventListeners() {
        // Start wizard button
        const startButton = document.getElementById('start-wizard');
        if (startButton) {
            startButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.startWizard();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Escape key to close wizard
            if (e.key === 'Escape' && this.isWizardOpen()) {
                this.closeWizard();
            }
            
            // Enter key on welcome screen
            if (e.key === 'Enter' && !this.isWizardOpen()) {
                const welcomeScreen = document.getElementById('welcome-screen');
                if (welcomeScreen && welcomeScreen.style.display !== 'none') {
                    this.startWizard();
                }
            }
        });

        // Listen for wizard events
        document.addEventListener('wizard:configUpdated', (e) => {
            this.currentConfig = { ...this.currentConfig, ...e.detail };
            this.saveProgress();
        });

        document.addEventListener('wizard:completed', () => {
            this.handleWizardCompleted();
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.step !== undefined) {
                this.wizardController.showStep(e.state.step);
            }
        });

        // Auto-save on page unload
        window.addEventListener('beforeunload', () => {
            this.saveProgress();
        });
    }

    setupAccessibility() {
        // Add skip link for keyboard users
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only';
        skipLink.style.position = 'absolute';
        skipLink.style.top = '10px';
        skipLink.style.left = '10px';
        skipLink.style.zIndex = '9999';
        skipLink.addEventListener('focus', () => {
            skipLink.classList.remove('sr-only');
        });
        skipLink.addEventListener('blur', () => {
            skipLink.classList.add('sr-only');
        });
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content landmark
        const welcomeScreen = document.getElementById('welcome-screen');
        if (welcomeScreen) {
            welcomeScreen.setAttribute('id', 'main-content');
            welcomeScreen.setAttribute('role', 'main');
        }
    }

    preloadResources() {
        // Preload wizard steps for better performance
        const wizardSteps = import('./wizard-steps.js');
        const previewManager = import('./preview-manager.js');
        
        Promise.all([wizardSteps, previewManager]).then(() => {
            console.log('Resources preloaded successfully');
        }).catch(error => {
            console.warn('Failed to preload resources:', error);
        });
    }

    startWizard() {
        const welcomeScreen = document.getElementById('welcome-screen');
        const wizardContainer = document.getElementById('wizard-container');
        
        if (!welcomeScreen || !wizardContainer) {
            console.error('Required elements not found');
            return;
        }

        // Show loading indicator
        this.showLoading();

        // Animate welcome screen out
        welcomeScreen.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        welcomeScreen.style.opacity = '0';
        welcomeScreen.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            wizardContainer.style.display = 'block';
            
            // Initialize wizard if not already done
            if (!this.isInitialized) {
                this.wizardController.init();
                this.isInitialized = true;
                this.loadSavedProgress();
            }
            
            // Animate wizard in
            wizardContainer.style.opacity = '0';
            wizardContainer.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                wizardContainer.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                wizardContainer.style.opacity = '1';
                wizardContainer.style.transform = 'translateY(0)';
                this.hideLoading();
                
                // Focus first input for accessibility
                const firstInput = wizardContainer.querySelector('input, textarea');
                if (firstInput) {
                    setTimeout(() => firstInput.focus(), 100);
                }
            }, 50);
        }, 400);

        // Update URL for better UX
        history.pushState({ wizard: true, step: 0 }, '', '#wizard');
    }

    closeWizard() {
        const welcomeScreen = document.getElementById('welcome-screen');
        const wizardContainer = document.getElementById('wizard-container');
        
        if (!welcomeScreen || !wizardContainer) return;

        // Animate wizard out
        wizardContainer.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        wizardContainer.style.opacity = '0';
        wizardContainer.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            wizardContainer.style.display = 'none';
            welcomeScreen.style.display = 'flex';
            
            // Animate welcome screen in
            welcomeScreen.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            welcomeScreen.style.opacity = '1';
            welcomeScreen.style.transform = 'scale(1)';
        }, 300);

        // Update URL
        history.pushState({}, '', window.location.pathname);
    }

    isWizardOpen() {
        const wizardContainer = document.getElementById('wizard-container');
        return wizardContainer && wizardContainer.style.display !== 'none';
    }

    handleWizardCompleted() {
        this.showLoading();
        
        try {
            const finalConfig = this.configGenerator.generateFinalConfig(this.currentConfig);
            const summary = this.configGenerator.generateConfigSummary(finalConfig);
            
            setTimeout(() => {
                this.showCompletionScreen(finalConfig, summary);
                this.hideLoading();
                this.clearSavedProgress();
            }, 1000);
        } catch (error) {
            console.error('Error generating config:', error);
            this.showError('Failed to generate configuration. Please try again.');
            this.hideLoading();
        }
    }

    showCompletionScreen(config, summary) {
        const wizardContainer = document.getElementById('wizard-container');
        if (!wizardContainer) return;

        wizardContainer.innerHTML = `
            <div class="completion-screen">
                <div class="completion-content">
                    <span class="success-icon">🎉</span>
                    <h2>Your portfolio configuration is ready!</h2>
                    <p>Congratulations! We've generated a professional configuration file with ${summary.sectionsEnabled} sections, ${summary.totalProjects} projects, and ${summary.totalExperience} work experiences.</p>
                    
                    <div class="download-section">
                        <h3 style="color: white; margin-bottom: 1.5rem; font-size: 1.5rem;">Next Steps:</h3>
                        <ol style="text-align: left; display: inline-block; margin: 1.5rem 0; color: rgba(255,255,255,0.9); line-height: 1.8; font-size: 1.1rem;">
                            <li style="margin-bottom: 0.5rem;">📥 Download your config.json file</li>
                            <li style="margin-bottom: 0.5rem;">🔄 Replace the existing config.json in your portfolio repository</li>
                            <li style="margin-bottom: 0.5rem;">🖼️ Add project images to <code style="background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px;">assets/projects/</code> folder</li>
                            <li style="margin-bottom: 0.5rem;">🏢 Add company logos to <code style="background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px;">assets/logos/</code> folder</li>
                            <li style="margin-bottom: 0.5rem;">🚀 Commit and push your changes to GitHub</li>
                            <li>🌟 Your portfolio will be live automatically!</li>
                        </ol>
                        
                        <button class="download-button" id="download-config">
                            📥 Download config.json
                        </button>
                        
                        <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(255,255,255,0.1); border-radius: 12px; font-size: 0.9rem;">
                            <strong>💡 Pro tip:</strong> Keep this tab open while setting up your portfolio in case you need to make changes!
                        </div>
                    </div>

                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem; flex-wrap: wrap;">
                        <button class="btn btn-ghost" onclick="location.reload()" style="color: rgba(255,255,255,0.8); border: 1px solid rgba(255,255,255,0.3);">
                            🔄 Create Another Configuration
                        </button>
                        <button class="btn btn-ghost" onclick="window.open('https://github.com/your-repo/portfolio-template', '_blank')" style="color: rgba(255,255,255,0.8); border: 1px solid rgba(255,255,255,0.3);">
                            📚 View Documentation
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Setup download button
        const downloadButton = document.getElementById('download-config');
        if (downloadButton) {
            downloadButton.addEventListener('click', () => {
                this.downloadConfig(config);
            });
        }

        // Update URL
        history.pushState({ completed: true }, '', '#completed');
    }

    downloadConfig(config) {
        try {
            const configJson = JSON.stringify(config, null, 2);
            const blob = new Blob([configJson], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'config.json';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // Show success feedback with animation
            const downloadButton = document.getElementById('download-config');
            if (downloadButton) {
                const originalText = downloadButton.innerHTML;
                downloadButton.innerHTML = '✅ Downloaded Successfully!';
                downloadButton.style.background = 'var(--success)';
                downloadButton.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    downloadButton.innerHTML = originalText;
                    downloadButton.style.background = 'var(--white)';
                    downloadButton.style.transform = 'scale(1)';
                }, 3000);
            }

            // Track download event (if analytics is set up)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    event_category: 'Portfolio Config',
                    event_label: 'Config JSON'
                });
            }
        } catch (error) {
            console.error('Download failed:', error);
            this.showError('Failed to download configuration file. Please try again.');
        }
    }

    saveProgress() {
        try {
            localStorage.setItem('portfolio-wizard-progress', JSON.stringify({
                config: this.currentConfig,
                timestamp: Date.now(),
                step: this.wizardController?.currentStep || 0
            }));
        } catch (error) {
            console.warn('Failed to save progress:', error);
        }
    }

    loadSavedProgress() {
        try {
            const saved = localStorage.getItem('portfolio-wizard-progress');
            if (saved) {
                const data = JSON.parse(saved);
                // Only load if saved within last 24 hours
                if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
                    this.currentConfig = data.config || {};
                    // Optionally restore to saved step
                    // this.wizardController.showStep(data.step || 0);
                }
            }
        } catch (error) {
            console.warn('Failed to load saved progress:', error);
        }
    }

    clearSavedProgress() {
        try {
            localStorage.removeItem('portfolio-wizard-progress');
        } catch (error) {
            console.warn('Failed to clear saved progress:', error);
        }
    }

    showLoading() {
        const loading = document.getElementById('loading-indicator');
        if (loading) {
            loading.style.display = 'block';
        }
    }

    hideLoading() {
        const loading = document.getElementById('loading-indicator');
        if (loading) {
            loading.style.display = 'none';
        }
    }

    showError(message) {
        // Create and show error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-error';
        errorDiv.style.position = 'fixed';
        errorDiv.style.top = '20px';
        errorDiv.style.right = '20px';
        errorDiv.style.zIndex = '9999';
        errorDiv.style.maxWidth = '400px';
        errorDiv.innerHTML = `
            <strong>Error:</strong> ${message}
            <button onclick="this.parentElement.remove()" style="margin-left: 1rem; background: none; border: none; color: inherit; cursor: pointer;">✕</button>
        `;
        
        document.body.appendChild(errorDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 5000);
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioConfigApp();
});

// Handle page visibility changes for better UX
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page became visible, could refresh data or check for updates
        console.log('Page became visible');
    }
});
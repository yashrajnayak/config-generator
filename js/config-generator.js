// Config Generator - Converts wizard data into portfolio config.json format
export class ConfigGenerator {
    
    generateFinalConfig(wizardData) {
        // Create the complete config.json structure
        const config = {
            features: this.generateFeatures(wizardData),
            site: this.generateSiteConfig(wizardData),
            header: this.generateHeaderConfig(wizardData),
            social_links: this.generateSocialLinks(wizardData),
            github_username: wizardData.githubUsername || "",
            about: this.generateAboutConfig(wizardData),
            projects: this.generateProjectsConfig(wizardData),
            experience: this.generateExperienceConfig(wizardData),
            skills: this.generateSkillsConfig(wizardData),
            github_projects: this.generateGitHubProjectsConfig(wizardData),
            footer: this.generateFooterConfig(wizardData)
        };

        // Remove empty sections
        return this.cleanupConfig(config);
    }

    generateFeatures(data) {
        return {
            about: data.aboutEnabled !== false,
            projects: data.projectsEnabled !== false,
            experience: data.experienceEnabled !== false,
            skills: data.skillsEnabled !== false,
            github_projects: data.githubProjectsEnabled !== false
        };
    }

    generateSiteConfig(data) {
        const baseUrl = data.websiteUrl || `https://${data.githubUsername}.github.io`;
        
        return {
            title: data.name || "Developer Portfolio",
            description: data.description || "Developer Portfolio",
            seo: {
                title: `${data.name || "Developer"} - Portfolio`,
                description: data.description || `Portfolio of ${data.name || "Developer"}`,
                keywords: data.keywords || "developer, portfolio, programming",
                author: data.name || "",
                og_image: `https://avatars.githubusercontent.com/${data.githubUsername || ""}`,
                twitter_card: "summary_large_image",
                base_url: baseUrl
            }
        };
    }

    generateHeaderConfig(data) {
        return {
            greeting: data.name || "",
            tagline: data.tagline || ""
        };
    }

    generateSocialLinks(data) {
        if (!data.socialLinks || !Array.isArray(data.socialLinks)) {
            return [];
        }

        return data.socialLinks
            .filter(link => link.name && link.url && link.icon)
            .map(link => ({
                name: link.name,
                url: link.url,
                icon: link.icon,
                ...(link.icon === 'github' && { required: true })
            }));
    }

    generateAboutConfig(data) {
        const paragraphs = [];
        
        if (data.aboutParagraph1 && data.aboutParagraph1.trim()) {
            paragraphs.push(data.aboutParagraph1.trim());
        }
        if (data.aboutParagraph2 && data.aboutParagraph2.trim()) {
            paragraphs.push(data.aboutParagraph2.trim());
        }
        if (data.aboutParagraph3 && data.aboutParagraph3.trim()) {
            paragraphs.push(data.aboutParagraph3.trim());
        }

        return {
            paragraphs: paragraphs
        };
    }

    generateProjectsConfig(data) {
        const config = {
            title: data.projectsTitle || "Latest Projects",
            items: []
        };

        if (data.projects && Array.isArray(data.projects)) {
            config.items = data.projects
                .filter(project => project.name && project.name.trim())
                .map(project => {
                    const projectConfig = {
                        name: project.name,
                        description: Array.isArray(project.description) 
                            ? project.description.filter(d => d.trim())
                            : project.description ? [project.description] : []
                    };

                    if (project.date && project.date.trim()) {
                        projectConfig.date = project.date;
                    }

                    if (project.picture && project.picture.trim()) {
                        projectConfig.picture = project.picture;
                    }

                    if (project.link && project.link.trim()) {
                        projectConfig.link = {
                            url: project.link,
                            title: "View Project"
                        };
                    }

                    return projectConfig;
                });
        }

        return config;
    }

    generateExperienceConfig(data) {
        const config = {
            title: data.experienceTitle || "Professional Experience",
            jobs: []
        };

        if (data.experience && Array.isArray(data.experience)) {
            config.jobs = data.experience
                .filter(exp => exp.company && exp.role)
                .map(exp => {
                    const jobConfig = {
                        company: exp.company,
                        role: exp.role,
                        responsibilities: Array.isArray(exp.responsibilities)
                            ? exp.responsibilities.filter(r => r.trim())
                            : exp.responsibilities ? [exp.responsibilities] : []
                    };

                    if (exp.date && exp.date.trim()) {
                        jobConfig.date = exp.date;
                    }

                    // Add placeholder for logo paths (user will need to add these manually)
                    jobConfig.logo = `assets/logos/${exp.company.replace(/\s+/g, '_')}_Logo.png`;
                    jobConfig.logo_dark = `assets/logos/${exp.company.replace(/\s+/g, '_')}_Logo_White.png`;

                    return jobConfig;
                });
        }

        return config;
    }

    generateSkillsConfig(data) {
        const config = {
            title: data.skillsTitle || "Skills & Technologies",
            categories: []
        };

        if (data.skillCategories && Array.isArray(data.skillCategories)) {
            config.categories = data.skillCategories
                .filter(category => category.name && category.items && category.items.length > 0)
                .map(category => ({
                    name: category.name,
                    items: Array.isArray(category.items) 
                        ? category.items.filter(item => item.trim())
                        : [category.items]
                }));
        }

        return config;
    }

    generateGitHubProjectsConfig(data) {
        return {
            title: data.githubProjectsTitle || "Projects on GitHub"
        };
    }

    generateFooterConfig(data) {
        return {
            show_social_links: data.footerSocialLinks !== false,
            show_built_with: true,
            built_with_text: "Built with ❤️ using vanilla JavaScript",
            tagline: data.footerTagline || "Let's connect and build something amazing together!"
        };
    }

    cleanupConfig(config) {
        // Remove sections with empty content
        const cleaned = { ...config };

        // Keep features as is - they control visibility
        
        // Clean up about section
        if (!cleaned.about.paragraphs || cleaned.about.paragraphs.length === 0) {
            cleaned.about.paragraphs = ["Welcome to my portfolio!"];
        }

        // Clean up projects section
        if (!cleaned.projects.items || cleaned.projects.items.length === 0) {
            // Keep the projects section structure even if empty
            cleaned.projects.items = [];
        }

        // Clean up experience section
        if (!cleaned.experience.jobs || cleaned.experience.jobs.length === 0) {
            // Keep the experience section structure even if empty
            cleaned.experience.jobs = [];
        }

        // Clean up skills section
        if (!cleaned.skills.categories || cleaned.skills.categories.length === 0) {
            // Keep the skills section structure even if empty
            cleaned.skills.categories = [];
        }

        // Clean up social links
        if (!cleaned.social_links || cleaned.social_links.length === 0) {
            cleaned.social_links = [];
        }

        return cleaned;
    }

    // Generate a summary of what was configured
    generateConfigSummary(config) {
        const summary = {
            sectionsEnabled: 0,
            totalSocialLinks: config.social_links?.length || 0,
            totalProjects: config.projects?.items?.length || 0,
            totalExperience: config.experience?.jobs?.length || 0,
            totalSkillCategories: config.skills?.categories?.length || 0,
            aboutParagraphs: config.about?.paragraphs?.length || 0
        };

        // Count enabled sections
        Object.values(config.features).forEach(enabled => {
            if (enabled) summary.sectionsEnabled++;
        });

        return summary;
    }
}

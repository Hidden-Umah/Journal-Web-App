class AnimationManager {
    constructor() {
        this.initializeAnimations();
        this.setupIntersectionObserver();
        this.bindThemeToggle();
        this.setupTypewriter();
    }

    initializeAnimations() {
        // Animate elements on page load
        this.animateOnLoad();
        
        // Setup hover effects
        this.setupHoverEffects();
        
        // Initialize progress animations
        this.setupProgressAnimations();
    }

    animateOnLoad() {
        // Stagger animation for toolbar buttons
        const toolbarBtns = document.querySelectorAll('.toolbar-btn');
        toolbarBtns.forEach((btn, index) => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                btn.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, index * 50);
        });

        // Animate status bar items
        const statusItems = document.querySelectorAll('.stat-item');
        statusItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 1000 + (index * 100));
        });

        // Animate floating shapes
        this.animateFloatingShapes();
    }

    setupHoverEffects() {
        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('.toolbar-btn, .fab, .header-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.createRippleEffect(e, btn);
            });
        });

        // Add magnetic effect to FABs
        const fabs = document.querySelectorAll('.fab');
        fabs.forEach(fab => {
            fab.addEventListener('mousemove', (e) => {
                this.magneticEffect(e, fab);
            });
            
            fab.addEventListener('mouseleave', () => {
                fab.style.transform = 'scale(1) translate(0, 0)';
            });
        });

        // Add glow effect to editor on focus
        const editor = document.getElementById('textEditor');
        if (editor) {
            editor.addEventListener('focus', () => {
                editor.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.2)';
                editor.style.transition = 'box-shadow 0.3s ease';
            });

            editor.addEventListener('blur', () => {
                editor.style.boxShadow = 'none';
            });
        }
    }

    createRippleEffect(event, element) {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;

        // Add ripple keyframes if not exists
        if (!document.querySelector('#ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    magneticEffect(event, element) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.15;
        const moveY = y * 0.15;
        
        element.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
        element.style.transition = 'transform 0.1s ease';
    }

    setupProgressAnimations() {
        const progressRing = document.querySelector('.progress-circle');
        if (progressRing) {
            // Animate progress based on scroll or typing activity
            let progress = 0;
            const updateProgress = () => {
                const circumference = 2 * Math.PI * 10; // radius = 10
                const offset = circumference - (progress / 100) * circumference;
                progressRing.style.strokeDashoffset = offset;
            };

            // Simulate progress updates
            setInterval(() => {
                progress = Math.random() * 100;
                updateProgress();
            }, 3000);
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.
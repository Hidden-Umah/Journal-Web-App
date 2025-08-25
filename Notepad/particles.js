class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isActive = false;
        
        this.initCanvas();
        this.bindEvents();
        this.createParticles();
        this.animate();
    }

    initCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    bindEvents() {
        // Mouse events
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Typing events
        const textEditor = document.getElementById('textEditor');
        if (textEditor) {
            textEditor.addEventListener('input', () => {
                this.isActive = true;
                this.createBurst(this.mouse.x, this.mouse.y);
                setTimeout(() => this.isActive = false, 1000);
            });
        }
    }

    createParticles() {
        const particleCount = Math.min(50, Math.floor(window.innerWidth * window.innerHeight / 10000));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height
            ));
        }
    }

    createBurst(x, y) {
        for (let i = 0; i < 5; i++) {
            this.particles.push(new BurstParticle(x, y));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update(this.mouse);
            particle.draw(this.ctx);
            
            // Remove dead particles
            if (particle.isDead()) {
                this.particles.splice(i, 1);
            }
        }
        
        // Maintain minimum particle count
        while (this.particles.filter(p => p instanceof Particle).length < 30) {
            this.particles.push(new Particle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height
            ));
        }
        
        // Draw connections
        this.drawConnections();
        
        requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        const maxDistance = 100;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.1;
                    this.ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = this.getRandomColor();
        this.life = 1;
        this.maxLife = 1;
    }

    getRandomColor() {
        const colors = [
            '99, 102, 241',   // Indigo
            '236, 72, 153',   // Pink
            '6, 182, 212',    // Cyan
            '16, 185, 129',   // Emerald
            '245, 158, 11'    // Amber
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update(mouse) {
        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            const force = (100 - distance) / 100;
            this.vx += (dx / distance) * force * 0.01;
            this.vy += (dy / distance) * force * 0.01;
        }
        
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Apply friction
        this.vx *= 0.99;
        this.vy *= 0.99;
        
        // Boundary check
        if (this.x < 0 || this.x > window.innerWidth) this.vx *= -0.5;
        if (this.y < 0 || this.y > window.innerHeight) this.vy *= -0.5;
        
        // Keep within bounds
        this.x = Math.max(0, Math.min(window.innerWidth, this.x));
        this.y = Math.max(0, Math.min(window.innerHeight, this.y));
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = `rgba(${this.color}, 1)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = `rgba(${this.color}, 0.8)`;
        ctx.shadowBlur = 10;
        ctx.fill();
        
        ctx.restore();
    }

    isDead() {
        return false; // Base particles don't die
    }
}

class BurstParticle extends Particle {
    constructor(x, y) {
        super(x, y);
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.size = Math.random() * 3 + 2;
        this.life = 1;
        this.maxLife = 1;
        this.decay = 0.02;
    }

    update(mouse) {
        super.update(mouse);
        
        this.life -= this.decay;
        this.opacity = this.life;
        this.size *= 0.98;
        
        // Add some sparkle effect
        if (Math.random() < 0.1) {
            this.size *= 1.2;
        }
    }

    isDead() {
        return this.life <= 0 || this.size <= 0.1;
    }
}

class WritingParticle extends Particle {
    constructor(x, y, char) {
        super(x, y);
        this.char = char;
        this.fontSize = Math.random() * 20 + 15;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
        this.life = 1;
        this.decay = 0.01;
    }

    update(mouse) {
        super.update(mouse);
        
        this.rotation += this.rotationSpeed;
        this.life -= this.decay;
        this.opacity = this.life * 0.7;
        this.fontSize *= 0.99;
        
        // Float upward
        this.vy -= 0.02;
    }

    draw(ctx) {
        if (this.char && this.fontSize > 5) {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = `rgba(${this.color}, 1)`;
            ctx.font = `${this.fontSize}px 'Inter', sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            // Add text shadow
            ctx.shadowColor = `rgba(${this.color}, 0.5)`;
            ctx.shadowBlur = 5;
            ctx.fillText(this.char, 0, 0);
            
            ctx.restore();
        }
    }

    isDead() {
        return this.life <= 0 || this.fontSize <= 5;
    }
}

// Initialize particle system when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});

// Export for use in other modules
window.ParticleSystem = ParticleSystem;
window.WritingParticle = WritingParticle;
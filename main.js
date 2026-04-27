document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Tracking form submission mockup
    const trackForm = document.getElementById('track-form');
    const trackInput = document.getElementById('tracking-number');
    const trackResult = document.getElementById('tracking-result');

    if (trackForm) {
        trackForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const trackingNo = trackInput.value.trim();
            if (!trackingNo) return;

            // Mock loading state
            const btn = trackForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;

                // Show result
                trackResult.classList.remove('hidden');

                // Mock data
                trackResult.innerHTML = `
                    <div style="margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">
                        <h3>Shipment: <span class="highlight">${trackingNo.toUpperCase()}</span></h3>
                        <p style="color: var(--primary-color);">Status: In Transit</p>
                    </div>
                    <div class="status-step">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <h4>Departed Origin Port</h4>
                            <p>Shanghai, China - Oct 24, 2026 08:00 AM</p>
                        </div>
                    </div>
                    <div class="status-step">
                        <i class="fas fa-ship"></i>
                        <div>
                            <h4>In Transit</h4>
                            <p>Ocean Vessel MAHE EXPLORER - Estimated Arrival: Nov 15, 2026</p>
                        </div>
                    </div>
                    <div class="status-step" style="opacity: 0.5;">
                        <i class="fas fa-anchor"></i>
                        <div>
                            <h4>Arrival at Destination Port</h4>
                            <p>Los Angeles, USA - Pending</p>
                        </div>
                    </div>
                `;
            }, 1500);
        });
    }

    // Simulation form mockup
    const simForm = document.getElementById('simulation-form');
    if (simForm) {
        simForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = simForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> CALCULANDO...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;

                const resultBox = document.getElementById('simulation-result');
                resultBox.classList.remove('hidden');

                // Get form values
                const type = document.getElementById('transport-type');
                const typeText = type.options[type.selectedIndex].text;

                // Random mock price based on inputs (just for show)
                const basePrice = Math.floor(Math.random() * 2000) + 800;

                resultBox.innerHTML = `
                    <h3>Cotización Estimada</h3>
                    <div class="result-detail">
                        <span>Modalidad:</span>
                        <strong>${typeText}</strong>
                    </div>
                    <div class="result-detail">
                        <span>Costo de Flete:</span>
                        <strong>$${basePrice.toLocaleString()} USD</strong>
                    </div>
                    <div class="result-detail">
                        <span>Cargos Adicionales (Aprox):</span>
                        <strong>$${(basePrice * 0.15).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</strong>
                    </div>
                    <div class="result-detail result-total">
                        <span>TOTAL ESTIMADO:</span>
                        <span style="color: var(--primary-color)">$${(basePrice * 1.15).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</span>
                    </div>
                    <p style="margin-top: 20px; font-size: 0.85rem; color: var(--text-muted);">* Esta es una cotización simulada y no representa un compromiso legal. Un agente de MAHE NEUTRAL SHIPPING se contactará contigo para confirmar el precio real.</p>
                `;

                // Scroll to result
                resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 1800);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Chatbot Logic
    const chatToggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const chatClose = document.getElementById('chatbot-close');
    const chatInput = document.getElementById('chatbot-text');
    const chatSend = document.getElementById('chatbot-send');
    const chatMessages = document.getElementById('chatbot-messages');

    if (chatToggle && chatWindow) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('hidden');
        });

        chatClose.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
        });

        const sendMessage = () => {
            const text = chatInput.value.trim();
            if (text === '') return;

            // Add user message
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-message user-message';
            userMsg.textContent = text;
            chatMessages.appendChild(userMsg);

            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Mock bot response
            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'chat-message bot-message';
                botMsg.textContent = 'Gracias por comunicarte. Un ejecutivo de MAHE revisará tu mensaje y te contactará pronto.';
                chatMessages.appendChild(botMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        };

        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // Number Counter Animation for Stats Section
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.querySelector('.stats');
    
    if (counters.length > 0 && statsSection) {
        const speed = 200; // Cuanto más bajo, más rápido

        const animateCounters = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    
                    // Velocidad de incremento
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        };

        // Intersection Observer para activar la animación solo cuando se vea la sección
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect(); // Ejecutar solo una vez
            }
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }
});

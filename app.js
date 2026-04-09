document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------
    // 1. Loader & Frame Preloading
    // -----------------------------------------
    const frameCount = 294; // Utilized user's existing 294 frame sequence
    const frames = [];
    let loadedFrames = 0;
    const loader = document.getElementById('loader');
    const loaderBar = document.getElementById('loaderBar');

    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = `frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
        img.onload = () => {
            loadedFrames++;
            const pct = (loadedFrames / frameCount) * 100;
            loaderBar.style.width = pct + '%';
            if (loadedFrames === frameCount) {
                // All loaded
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 0.6s ease';
                setTimeout(() => loader.style.display = 'none', 600);
            }
        };
        img.onerror = () => {
            // Error handling just in case
            loadedFrames++;
            if (loadedFrames === frameCount) {
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 0.6s ease';
                setTimeout(() => loader.style.display = 'none', 600);
            }
        };
        frames.push(img);
    }

    // -----------------------------------------
    // 2. Starscape Background
    // -----------------------------------------
    const starCanvas = document.getElementById('starscape');
    const sCtx = starCanvas.getContext('2d');
    let stars = [];

    function initStars() {
        const dpr = window.devicePixelRatio || 1;
        starCanvas.width = window.innerWidth * dpr;
        starCanvas.height = window.innerHeight * dpr;
        starCanvas.style.width = window.innerWidth + 'px';
        starCanvas.style.height = window.innerHeight + 'px';
        sCtx.scale(dpr, dpr);

        stars = [];
        for (let i = 0; i < 180; i++) {
            stars.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                radius: 0.3 + Math.random() * 1.2,
                baseOpacity: 0.1 + Math.random() * 0.5,
                driftX: (Math.random() - 0.5) * 0.04,
                driftY: (Math.random() - 0.5) * 0.02,
                twinkleSpeed: 0.001 + Math.random() * 0.002,
                twinklePhase: Math.random() * Math.PI * 2
            });
        }
    }

    function animateStars() {
        sCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
        const w = parseInt(starCanvas.style.width, 10);
        const h = parseInt(starCanvas.style.height, 10);

        stars.forEach(star => {
            star.x += star.driftX;
            star.y += star.driftY;
            if (star.x < 0) star.x = w;
            if (star.x > w) star.x = 0;
            if (star.y < 0) star.y = h;
            if (star.y > h) star.y = 0;

            const twinkle = Math.sin(Date.now() * star.twinkleSpeed + star.twinklePhase);
            const opacity = star.baseOpacity + twinkle * 0.3;

            sCtx.beginPath();
            sCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            sCtx.fillStyle = `rgba(212, 175, 55, ${Math.max(0, opacity)})`; // Using accent color for a lux vibe
            sCtx.fill();
        });
        requestAnimationFrame(animateStars);
    }
    
    window.addEventListener('resize', initStars);
    initStars();
    animateStars();

    // -----------------------------------------
    // 3. Scroll Progress & Navbar
    // -----------------------------------------
    const scrollProgress = document.getElementById('scrollProgress');
    const navbar = document.getElementById('navbar');

    // -----------------------------------------
    // 4. Scroll Animation Canvas
    // -----------------------------------------
    const frameCanvas = document.getElementById('frameCanvas');
    const fCtx = frameCanvas.getContext('2d');
    let currentFrame = -1;
    let ticking = false;

    function resizeFrameCanvas() {
        const dpr = window.devicePixelRatio || 1;
        frameCanvas.width = window.innerWidth * dpr;
        frameCanvas.height = window.innerHeight * dpr;
        frameCanvas.style.width = window.innerWidth + 'px';
        frameCanvas.style.height = window.innerHeight + 'px';
        if (currentFrame >= 0) drawFrame(currentFrame);
    }
    window.addEventListener('resize', resizeFrameCanvas);

    function drawFrame(index) {
        const img = frames[index];
        if (!img || !img.complete || img.naturalHeight === 0) return;
        
        const dpr = window.devicePixelRatio || 1;
        const cw = frameCanvas.width;
        const ch = frameCanvas.height;

        fCtx.clearRect(0, 0, cw, ch);

        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = cw / ch;
        let drawW, drawH, drawX, drawY;

        if (window.innerWidth > 768) {
            // Desktop: cover-fit
            if (canvasRatio > imgRatio) {
                drawW = cw;
                drawH = cw / imgRatio;
            } else {
                drawH = ch;
                drawW = ch * imgRatio;
            }
        } else {
            // Mobile: zoomed contain-fit
            const zoom = 1.2;
            if (canvasRatio > imgRatio) {
                drawH = ch * zoom;
                drawW = drawH * imgRatio;
            } else {
                drawW = cw * zoom;
                drawH = drawW / imgRatio;
            }
        }
        
        drawX = (cw - drawW) / 2;
        drawY = (ch - drawH) / 2;

        fCtx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    // -----------------------------------------
    // 5. Annotation Cards & Snap-Stop
    // -----------------------------------------
    const SNAP_ZONES = [];
    const HOLD_DURATION = 600;
    let isSnapping = false;
    const annotationCards = document.querySelectorAll('.annotation-card');

    annotationCards.forEach(card => {
        SNAP_ZONES.push({
            show: parseFloat(card.dataset.show),
            hide: parseFloat(card.dataset.hide),
            snapped: false
        });
    });

    function updateCards(progress) {
        annotationCards.forEach((card, i) => {
            const zone = SNAP_ZONES[i];
            const visible = progress >= zone.show && progress <= zone.hide;
            card.classList.toggle('visible', visible);

            if (visible && !zone.snapped && !isSnapping) {
                zone.snapped = true;
                isSnapping = true;
                document.body.style.overflow = 'hidden';
                setTimeout(() => {
                    document.body.style.overflow = '';
                    isSnapping = false;
                }, HOLD_DURATION);
            }
            if (!visible) {
                zone.snapped = false;
            }
        });
    }

    // Main scroll mapping
    window.addEventListener('scroll', () => {
        // Overall progress
        const overallPct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = overallPct + '%';
        navbar.classList.toggle('nav-scrolled', window.scrollY > 80);

        // Frame progress
        if (!ticking) {
            requestAnimationFrame(() => {
                const section = document.querySelector('.scroll-animation');
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const scrollableHeight = section.offsetHeight - window.innerHeight;
                    const progress = Math.min(1, Math.max(0, -rect.top / scrollableHeight));
                    const frameIndex = Math.min(frameCount - 1, Math.floor(progress * frameCount));

                    if (frameIndex !== currentFrame) {
                        currentFrame = frameIndex;
                        drawFrame(frameIndex);
                    }
                    updateCards(progress);
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial resize to get things sorted
    resizeFrameCanvas();

    // Force draw first frame if ready
    setTimeout(() => {
        if (currentFrame === -1) {
            currentFrame = 0;
            drawFrame(0);
        }
    }, 1000);

    // -----------------------------------------
    // 6. Specs Count-Up
    // -----------------------------------------
    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function countUp(el, target, suffix = '', duration = 2000) {
        const start = performance.now();
        el.classList.add('counting');

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutExpo(progress);
            const current = eased * target;

            el.textContent = (target % 1 === 0 ? Math.floor(current) : current.toFixed(1)) + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target + suffix;
                el.classList.remove('counting');
            }
        }
        requestAnimationFrame(update);
    }

    const specElements = document.querySelectorAll('.spec-item');
    if (specElements.length > 0) {
        const specObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.spec-item');
                    items.forEach((item, i) => {
                        setTimeout(() => {
                            const numEl = item.querySelector('.spec-number');
                            const target = parseFloat(item.dataset.target);
                            const suffix = item.dataset.suffix || '';
                            countUp(numEl, target, suffix);
                        }, i * 200);
                    });
                    specObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        specObserver.observe(document.getElementById('specs'));
    }
});

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

    // -----------------------------------------
    // 7. Portfolio Grids Animation
    // -----------------------------------------
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    if (portfolioCards.length > 0) {
        const portfolioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Slight delay based on element's DOM index relative to currently intersecting items
                    setTimeout(() => {
                        entry.target.classList.add('in-view');
                    }, 100);
                    portfolioObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        portfolioCards.forEach((card, index) => {
            // Apply inline transition delay for a staggering effect
            card.style.transitionDelay = `${(index % 3) * 0.15}s`;
            portfolioObserver.observe(card);
        });
    }
});


/* =========================================================================
   LIGHTBOX & GALLERY LOGIC
========================================================================= */
(function() {
    const BASE = 'projects/assets/';

    const GALLERIES = {
        'miami-beach-condo': { title: 'S. Florida High Rise Luxe Condo', images: [BASE + 'miami-beach-cover.webp', ...Array.from({length:47}, (_,i) => BASE + 'miami-beach-' + (i+1) + '.webp'), BASE + 'detail-wood-paneling.png'] },
        'high-alpine-ranch': { title: 'High Alpine Mtn. Ranch Luxe Retreat', images: [BASE + 'alpine-ranch-cover.webp', ...Array.from({length:12}, (_,i) => BASE + 'alpine-ranch-' + (i+1) + '.webp')] },
        'syracuse-house': { title: 'Syracuse House', images: ['projects/syracuse-cover.png', ...Array.from({length:46}, (_,i) => BASE + 'syracuse-' + (i+1) + '.webp')] },
        'montana-condo': { title: 'Mtn. Mid-Rise Luxe Condo', images: [BASE + 'montana-cover.webp', ...Array.from({length:10}, (_,i) => BASE + 'montana-' + (i+1) + '.webp'), BASE + 'montana-11.jpg'] },
        'hospitality-pool': { title: 'Ultra Luxe Private Club Resort Pool', images: ['projects/hospitality-pool-cover-v2.jpg', BASE + 'pool-design-1.png', BASE + 'pool-design-2.png', BASE + 'pool-design-3.png', BASE + 'pool-design-4.png', BASE + 'pool-design-5.png', BASE + 'pool-design-6.png', BASE + 'pool-design-9.png', ...Array.from({length:28}, (_,i) => BASE + 'pool-design-' + (i+10) + '.webp'), BASE + 'hospitality-pool-1.webp'] },
        'southcoast-remodel': { title: 'South Coast Renovation', images: [BASE + 'southcoast-cover.webp', ...Array.from({length:52}, (_,i) => BASE + 'southcoast-' + (i+2) + '.webp')] },
        'carmel-valley-new': { title: 'Carmel Valley New Custom Residence', images: ['projects/carmel-valley-new/carmel_valley_new1 cover.png', ...Array.from({length:4}, (_,i) => BASE + 'carmel-valley-new-' + (i+1) + '.webp')] },
        'north-florida-renovation': { title: 'North Florida Renovation & Addition', images: ['projects/north-florida/NIMG_9178.jpg', ...Array.from({length:14}, (_,i) => BASE + 'north-florida-' + (i+1) + '.webp')] },
        'bahamas-abaco-development': { title: 'Abaco Luxe Boat House', images: [BASE + 'abaco-luxe-boathouse-cover.webp', BASE + 'abaco-luxe-boathouse-1.webp'] },
        'carmel-house-2': { title: 'Carmel Forest to Ocean View Custom Addition', images: [BASE + 'carmel-2-cover.webp', ...Array.from({length:5}, (_,i) => BASE + 'carmel-2-' + (i+1) + '.webp')] },
        'bigsur-mountain-remodel': { title: 'Coastal Mountain Residence', images: [BASE + 'bigsur-cover.webp', ...Array.from({length:15}, (_,i) => BASE + 'bigsur-' + (i+1) + '.webp')] },
        'carmel-knolls': { title: 'Carmel Knolls Remodel', images: ['projects/carmel-knolls/001.10 COVER.jpg', ...Array.from({length:25}, (_,i) => BASE + 'carmel-knolls-' + (i+1) + '.webp')] },
        'coastal-restoration': { title: 'Coastal Restoration', images: ['projects/coastal-restoration/001 COVER.JPG', ...Array.from({length:15}, (_,i) => BASE + 'coastal-restoration-' + (i+1) + '.webp')] },
        'bahamas-beachfront-estate': { title: 'Beachfront Estate Residence', images: Array.from({length:7}, (_,i) => BASE + 'beachfront-' + (i+1) + '.webp') },
        'development-civil': { title: 'Development Civil Construction', images: ['projects/development-civil/development (1).jpg', ...Array.from({length:21}, (_,i) => BASE + 'civil-' + (i+1) + '.webp')] },
        'pacific-grove-design-build': { title: 'New Residential Construction', images: ['projects/pacific-grove/001 COVER.JPG', ...Array.from({length:10}, (_,i) => BASE + 'pg-' + (i+1) + '.webp')] },
        'hillside-cleanup': { title: 'Hillside Restoration', images: ['projects/hillside-cleanup/001 COVER.jpg', ...Array.from({length:15}, (_,i) => BASE + 'hillside-cleanup-' + (i+1) + '.webp')] },
        'laguna-grande-design-build': { title: 'Laguna Grande', images: [BASE + 'laguna-grande-cover.webp', ...Array.from({length:6}, (_,i) => BASE + 'laguna-grande-' + (i+1) + '.webp')] },
        'carmel-house-3': { title: 'Carmel House Remodel No.23', images: [BASE + 'carmel-3-cover.webp', ...Array.from({length:25}, (_,i) => BASE + 'carmel-3-' + (i+1) + '.webp')] }
    };

    let currentImages = [];
    let currentIndex  = 0;
    let preloadImg    = new Image();

    const lb       = document.getElementById('lightbox');
    const lbImg    = document.getElementById('lb-img');
    const lbTitle  = document.getElementById('lb-title');
    const lbCtr    = document.getElementById('lb-counter');
    const lbThumbs = document.getElementById('lb-thumbs');
    const lbClose  = document.getElementById('lb-close');
    const lbPrev   = document.getElementById('lb-prev');
    const lbNext   = document.getElementById('lb-next');

    // If lightbox isn't in DOM, skip logic
    if (!lb) return;

    function buildThumbs() {
        lbThumbs.innerHTML = '';
        currentImages.forEach((src, i) => {
            const img = document.createElement('img');
            img.className = 'lb-thumb';
            img.src = src;
            img.alt = 'Thumbnail ' + (i + 1);
            img.addEventListener('click', () => showImage(i));
            // Basic error handling for missing thumbnails
            img.onerror = () => { img.style.display = 'none'; };
            lbThumbs.appendChild(img);
        });
    }

    function showImage(idx) {
        idx = (idx + currentImages.length) % currentImages.length;
        currentIndex = idx;
        lbCtr.textContent = ' — ' + (idx + 1) + ' / ' + currentImages.length;

        lbImg.classList.remove('loaded');
        const src = currentImages[idx];
        lbImg.alt = lbTitle.textContent + ' — image ' + (idx + 1);

        const tmp = new Image();
        tmp.onload = () => { lbImg.src = src; lbImg.classList.add('loaded'); };
        tmp.onerror = () => { lbImg.src = src; lbImg.classList.add('loaded'); };
        tmp.src = src;

        if(currentImages.length > 1) {
             preloadImg.src = currentImages[(idx + 1) % currentImages.length];
        }

        const thumbEls = lbThumbs.querySelectorAll('.lb-thumb');
        thumbEls.forEach((t, i) => t.classList.toggle('active', i === idx));
        if (thumbEls[idx] && typeof thumbEls[idx].scrollIntoView === 'function') {
            thumbEls[idx].scrollIntoView({block:'nearest', inline:'center', behavior:'smooth'});
        }
    }

    function navigate(dir) {
        showImage(currentIndex + dir);
    }

    function openLightbox(projectId) {
        const data = GALLERIES[projectId];
        if (!data) return;
        currentImages = data.images;
        currentIndex  = 0;
        lbTitle.textContent = data.title;
        buildThumbs();
        showImage(0);
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
        lb.focus();
    }

    function closeLightbox() {
        lb.classList.remove('open');
        document.body.style.overflow = '';
        lbImg.classList.remove('loaded');
        lbImg.src = '';
    }

    // Bind to portfolio cards
    document.querySelectorAll('.portfolio-card[data-project]').forEach(card => {
        card.addEventListener('click', () => openLightbox(card.dataset.project));
    });

    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click',  (e) => { e.stopPropagation(); navigate(-1); });
    lbNext.addEventListener('click',  (e) => { e.stopPropagation(); navigate(1);  });

    lb.addEventListener('click', (e) => {
        if (e.target === lb || e.target === document.getElementById('lb-img-wrap')) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lb.classList.contains('open')) return;
        if (e.key === 'ArrowLeft')  navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
        if (e.key === 'Escape')     closeLightbox();
    });

    let touchStartX = 0;
    lb.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, {passive:true});
    lb.addEventListener('touchend',   (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) navigate(dx < 0 ? 1 : -1);
    }, {passive:true});

})();

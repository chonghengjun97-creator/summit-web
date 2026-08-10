/* ===== 云顶大会 2026 · 会务系统 ===== */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initNavHighlight();
    initCountdown();
    initGuideTabs();
    initFAQ();
    initVideoModal();
    initCarousel('reviewCarousel', 'reviewTrack', 'reviewPrev', 'reviewNext', 'reviewDots');
    initCarousel('videoCarousel', 'videoTrack', 'videoPrev', 'videoNext', 'videoDots');
    initHeroParticles();
    initSmoothScroll();
    initScrollReveal();
});

/* ===== 顶部导航栏滚动效果 ===== */
function initHeaderScroll() {
    const header = document.getElementById('header');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ===== 移动端菜单 ===== */
function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // 点击导航链接后关闭菜单
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            nav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

/* ===== 导航高亮 ===== */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        let current = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                highlightNav();
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ===== 倒计时 ===== */
function initCountdown() {
    // 大会日期：2026年9月8日
    const targetDate = new Date('2026-09-08T09:00:00+08:00').getTime();

    function updateCountdown() {
        const now = Date.now();
        const diff = targetDate - now;

        const daysEl = document.getElementById('countDays');
        const hoursEl = document.getElementById('countHours');
        const minsEl = document.getElementById('countMins');
        const secsEl = document.getElementById('countSecs');

        if (diff <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minsEl.textContent = '00';
            secsEl.textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minsEl.textContent = String(mins).padStart(2, '0');
        secsEl.textContent = String(secs).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ===== 日程Tab切换 ===== */
function initScheduleTabs() {
    const tabs = document.querySelectorAll('#scheduleTabs .tab-btn');
    const days = document.querySelectorAll('#scheduleContent .schedule-day');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const day = tab.getAttribute('data-day');

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            days.forEach(d => {
                d.classList.remove('active');
                if (d.getAttribute('data-day') === day) {
                    d.classList.add('active');
                }
            });
        });
    });
}

/* ===== 指南Tab切换 ===== */
function initGuideTabs() {
    const tabs = document.querySelectorAll('#guideTabs .tab-btn');
    const panels = document.querySelectorAll('#guideContent .guide-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            panels.forEach(p => {
                p.classList.remove('active');
                if (p.getAttribute('data-tab') === target) {
                    p.classList.add('active');
                }
            });
        });
    });
}

/* ===== FAQ 折叠 ===== */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // 关闭其他已打开项
            faqItems.forEach(other => {
                if (other !== item && other.classList.contains('open')) {
                    other.classList.remove('open');
                }
            });
            // 切换当前项
            item.classList.toggle('open');
        });
    });
}

/* ===== 视频弹窗 ===== */
function initVideoModal() {
    const modal = document.getElementById('videoModal');
    const closeBtn = document.getElementById('videoModalClose');
    const container = document.getElementById('videoContainer');
    const titleEl = document.getElementById('videoModalTitle');
    const videoCards = document.querySelectorAll('.video-card');

    const videoData = {
        '2026': '2026云顶大会宣传片 · 从「联接」走向「价值共创」',
        '2025': '2025云顶大会精彩回顾 · 「联接 让孤岛成为大陆」',
        '2024': '2024云顶大会精华剪辑 · 「沿着旧地图，找不到新大陆」'
    };

    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const year = card.getAttribute('data-video');
            titleEl.textContent = videoData[year] || '视频播放中...';
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
}

/* ===== 轮播组件 ===== */
function initCarousel(carouselId, trackId, prevId, nextId, dotsId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    const dotsContainer = document.getElementById(dotsId);
    const slides = track.querySelectorAll('.carousel-slide');

    let currentIndex = 0;
    let slidesPerView = 1;
    let totalSlides = slides.length;

    function updateSlidesPerView() {
        const w = window.innerWidth;
        if (w >= 1024) slidesPerView = 3;
        else if (w >= 768) slidesPerView = 2;
        else slidesPerView = 1;
    }

    function renderDots() {
        if (!dotsContainer) return;
        const dotCount = Math.max(1, totalSlides - slidesPerView + 1);
        dotsContainer.innerHTML = '';
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
            dot.setAttribute('aria-label', `第${i + 1}组`);
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        }
    }

    function goTo(index) {
        const maxIndex = Math.max(0, totalSlides - slidesPerView);
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        const offset = -(100 / slidesPerView) * currentIndex;
        track.style.transform = `translateX(${offset}%)`;
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;
        // Update dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
        }
    }

    function next() {
        const maxIndex = Math.max(0, totalSlides - slidesPerView);
        if (currentIndex < maxIndex) goTo(currentIndex + 1);
    }

    function prev() {
        if (currentIndex > 0) goTo(currentIndex - 1);
    }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    // Touch swipe
    let touchStartX = 0;
    let touchEndX = 0;
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) next();
            else prev();
        }
    });

    updateSlidesPerView();
    renderDots();
    goTo(0);

    window.addEventListener('resize', () => {
        const oldSlides = slidesPerView;
        updateSlidesPerView();
        if (oldSlides !== slidesPerView) {
            renderDots();
            goTo(currentIndex);
        }
    });
}

/* ===== Hero 粒子动画 Canvas ===== */
function initHeroParticles() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 60;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.3 + 0.05;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(29, 78, 216, ${this.opacity})`;
            ctx.fill();
        }
    }

    function init() {
        resize();
        particles = Array.from({ length: particleCount }, () => new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // 绘制连线
        particles.forEach((p1, i) => {
            p1.update();
            p1.draw();

            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(29, 78, 216, ${0.03 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    init();
    animate();
    window.addEventListener('resize', resize);
}

/* ===== 平滑滚动（移动端） ===== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            const headerHeight = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

/* ===== 滚动渐入动画（Intersection Observer） ===== */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-up');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

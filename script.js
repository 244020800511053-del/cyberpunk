if (typeof gsap !== 'undefined') {
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
  if (typeof Flip !== 'undefined') gsap.registerPlugin(Flip);

  gsap.defaults({
    duration: 0.75,
    ease: 'power3.out'
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined') {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 800px)',
        isMobile: '(max-width: 799px)',
        reduceMotion: '(prefers-reduced-motion: reduce)'
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions;

        if (reduceMotion) {
          gsap.set(
            '.gs-hero-elem, .gs-st-fade, .gs-st-left, .gs-st-right, .gs-prota-card, .gs-lore-card, .data-row, .gal-item',
            { autoAlpha: 1, y: 0, x: 0 }
          );
          return;
        }

        // Scroll progress bar
        gsap.to('#scrollProgress', {
          width: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.2
          }
        });

        // Active nav link tracking
        const navLinks = document.querySelectorAll('.nav-link');
        ['historia', 'personajes', 'mundo', 'galeria', 'datos'].forEach((secId) => {
          const sectionEl = document.getElementById(secId);
          if (!sectionEl) return;

          ScrollTrigger.create({
            trigger: sectionEl,
            start: 'top 45%',
            end: 'bottom 45%',
            onToggle: (self) => {
              if (self.isActive) {
                navLinks.forEach((link) => {
                  link.classList.toggle('active', link.dataset.section === secId);
                });
              }
            }
          });
        });

        // Hero intro timeline
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        gsap.set('#cyberMoonWrap', { scale: 0.86, autoAlpha: 0, y: 32 });
        gsap.set('#heroBgImg', { scale: 1.06, autoAlpha: 0 });
        gsap.set('.gs-hero-elem', { autoAlpha: 0, y: 20 });
        gsap.set('#mainNav', { y: -48, autoAlpha: 0 });

        heroTl
          .to('#mainNav', { y: 0, autoAlpha: 1, duration: 0.6 })
          .to('#heroBgImg', { scale: 1, autoAlpha: 0.48, duration: 1.2, ease: 'power2.out' }, '<')
          .to('#cyberMoonWrap', { scale: 1, autoAlpha: 1, y: 0, duration: 1.3, ease: 'power2.out' }, '<0.1')
          .to(
            '.gs-hero-elem',
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              clearProps: 'y'
            },
            '-=0.95'
          );

        // Hero backdrop & Moon parallax
        gsap.to('#heroBgImg', {
          yPercent: 14,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: '#top',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });

        gsap.to('#cyberMoon', {
          y: -12,
          rotation: 2.5,
          duration: 6.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

        gsap.to('.moon-halo', {
          scale: 1.1,
          opacity: 0.9,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

        gsap.to('#cyberMoonWrap', {
          yPercent: 32,
          xPercent: -10,
          scale: 0.9,
          ease: 'none',
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8
          }
        });

        gsap.to('#starsLayer1', {
          yPercent: -16,
          ease: 'none',
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
          }
        });

        gsap.to('#starsLayer2', {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
          }
        });

        // Numeric counters
        document.querySelectorAll('[data-counter]').forEach((el) => {
          const targetVal = parseInt(el.dataset.counter, 10);
          const startVal = targetVal > 1900 ? targetVal - 40 : 0;
          const counterObj = { val: startVal };

          gsap.to(counterObj, {
            val: targetVal,
            duration: 1.4,
            delay: 0.35,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(counterObj.val);
            }
          });
        });

        // Section scroll reveals
        gsap.utils.toArray('.gs-st-fade').forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 24,
            duration: 0.7,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          });
        });

        gsap.from('.gs-st-left', {
          x: -32,
          autoAlpha: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.story-grid',
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        });

        gsap.from('.story-p', {
          y: 24,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.story-grid',
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        });

        gsap.from('.gs-prota-card', {
          y: 40,
          autoAlpha: 0,
          scale: 0.97,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.protas-container',
            start: 'top 84%',
            toggleActions: 'play none none none'
          }
        });

        gsap.from('.gs-lore-card', {
          y: 32,
          autoAlpha: 0,
          scale: 0.98,
          duration: 0.75,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.lore-bento',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });

        gsap.from('.data-row', {
          x: -18,
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.06,
          scrollTrigger: {
            trigger: '#dataTable',
            start: 'top 86%',
            toggleActions: 'play none none none'
          }
        });

        // Pointer spotlight & subtle 3D tilt on desktop cards
        if (isDesktop) {
          document.querySelectorAll('[data-spotlight]').forEach((card) => {
            const img = card.querySelector('.prota-img');

            card.addEventListener('mousemove', (e) => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              card.style.setProperty('--mouse-x', `${x}px`);
              card.style.setProperty('--mouse-y', `${y}px`);

              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = ((y - centerY) / centerY) * -4.5;
              const rotateY = ((x - centerX) / centerX) * 4.5;

              gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1100,
                duration: 0.3,
                ease: 'power2.out'
              });

              if (img) {
                gsap.to(img, {
                  scale: 1.05,
                  x: (x - centerX) * 0.018,
                  y: (y - centerY) * 0.018,
                  duration: 0.3,
                  ease: 'power2.out'
                });
              }
            });

            card.addEventListener('mouseleave', () => {
              gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.55,
                ease: 'power3.out'
              });
              if (img) {
                gsap.to(img, {
                  scale: 1.02,
                  x: 0,
                  y: 0,
                  duration: 0.55,
                  ease: 'power3.out'
                });
              }
            });
          });
        }
      }
    );
  }

  // 3D cylinder gallery filtering, rotation toggle & drag handling
  const filterButtons = document.querySelectorAll('.filter-btn');
  const allGalleryItems = Array.from(document.querySelectorAll('.gal-item'));
  const galleryRing = document.getElementById('gallery');
  const cylinderChamber = document.getElementById('cylinderChamber');
  const cylinderViewport = document.getElementById('cylinderViewport');
  const cylinderHudStatus = document.getElementById('cylinderHudStatus');
  const cylPauseBtn = document.getElementById('cylPauseBtn');
  const cylPauseLabel = document.getElementById('cylPauseLabel');
  const cylViewToggle = document.getElementById('cylViewToggle');
  const cylViewLabel = document.getElementById('cylViewLabel');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;

      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let matchCount = 0;

      allGalleryItems.forEach((item) => {
        const match = filter === 'all' || item.dataset.cat === filter;
        if (match) {
          matchCount++;
          item.classList.remove('is-dimmed');
          item.classList.toggle('is-highlighted', filter !== 'all');
        } else {
          item.classList.add('is-dimmed');
          item.classList.remove('is-highlighted');
        }
      });

      if (cylinderHudStatus) {
        cylinderHudStatus.textContent =
          filter === 'all'
            ? 'ROTACIÓN CONTINUA 360° · PRESIONA CUALQUIER IMAGEN PARA ABRIR'
            : `FILTRO ACTIVO: ${btn.textContent.toUpperCase()} (${matchCount} ARCHIVOS DESTACADOS)`;
      }
    });
  });

  if (cylPauseBtn && galleryRing) {
    cylPauseBtn.addEventListener('click', () => {
      const paused = galleryRing.classList.toggle('is-paused');
      cylPauseBtn.classList.toggle('is-active', paused);
      cylPauseBtn.setAttribute('aria-pressed', String(paused));
      if (cylPauseLabel) {
        cylPauseLabel.textContent = paused ? 'Giro 360°: Pausado' : 'Giro 360°: Activo';
      }
      if (cylinderHudStatus) {
        cylinderHudStatus.textContent = paused
          ? 'ROTACIÓN EN PAUSA · ARRASTRA O PRESIONA UNA TARJETA'
          : 'ROTACIÓN CONTINUA 360° · PRESIONA CUALQUIER IMAGEN PARA ABRIR';
      }
    });
  }

  if (cylViewToggle && cylinderChamber) {
    cylViewToggle.addEventListener('click', () => {
      const isGrid = cylinderChamber.classList.toggle('is-grid-mode');
      cylViewToggle.classList.toggle('is-active', isGrid);
      cylViewToggle.setAttribute('aria-pressed', String(isGrid));
      if (cylViewLabel) {
        cylViewLabel.textContent = isGrid ? 'Vista Cilindro 3D' : 'Vista Mosaico';
      }
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    });
  }

  let isDraggingCylinder = false;
  let wasDragged = false;
  let dragStartX = 0;
  let currentDragRot = 0;
  let dragBaseRot = 0;
  let pressedGalleryItem = null;

  if (cylinderViewport && galleryRing) {
    cylinderViewport.addEventListener('pointerdown', (e) => {
      if (cylinderChamber && cylinderChamber.classList.contains('is-grid-mode')) return;
      isDraggingCylinder = true;
      wasDragged = false;
      dragStartX = e.clientX;
      dragBaseRot = currentDragRot;
      pressedGalleryItem = e.target.closest('.gal-item');
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDraggingCylinder) return;
      const deltaX = e.clientX - dragStartX;
      if (Math.abs(deltaX) > 10) {
        wasDragged = true;
      }
      if (wasDragged) {
        currentDragRot = dragBaseRot + deltaX * 0.28;
        galleryRing.style.setProperty('--drag-rot', `${currentDragRot.toFixed(2)}deg`);
      }
    });

    window.addEventListener('pointerup', () => {
      if (!isDraggingCylinder) return;
      isDraggingCylinder = false;
      const targetItem = pressedGalleryItem;
      pressedGalleryItem = null;

      if (!wasDragged && targetItem && !targetItem.classList.contains('is-dimmed')) {
        openLightboxForItem(targetItem);
      }

      setTimeout(() => {
        wasDragged = false;
      }, 60);
    });
  }

  // Lightbox modal & dynamic counter
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbTitle = document.getElementById('lb-title');
  const lbDesc = document.getElementById('lb-desc');
  const lbCounter = document.getElementById('lb-counter');
  const lbFigure = lightbox?.querySelector('.lb-figure');
  const lbClose = lightbox?.querySelector('.lb-close');
  const prevBtn = lightbox?.querySelector('.prev');
  const nextBtn = lightbox?.querySelector('.next');

  let currentIndex = 0;

  function getVisibleItems() {
    return allGalleryItems.filter(
      (item) => !item.classList.contains('is-dimmed') && item.style.display !== 'none'
    );
  }

  function updateLightbox(index, animate = false) {
    const visible = getVisibleItems();
    if (visible.length === 0) return;

    currentIndex = (index + visible.length) % visible.length;
    const currentItem = visible[currentIndex];

    if (lbCounter) {
      lbCounter.textContent = `${currentIndex + 1} / ${visible.length}`;
    }

    const applySlide = () => {
      lbImg.src = currentItem.dataset.src;
      lbImg.alt = currentItem.dataset.title;
      lbTitle.textContent = currentItem.dataset.title;
      lbDesc.textContent = currentItem.dataset.desc;
    };

    if (animate && typeof gsap !== 'undefined') {
      gsap.to(lbImg, {
        scale: 0.96,
        autoAlpha: 0.3,
        duration: 0.12,
        ease: 'power2.in',
        onComplete: () => {
          applySlide();
          gsap.to(lbImg, { scale: 1, autoAlpha: 1, duration: 0.22, ease: 'power3.out' });
        }
      });
    } else {
      applySlide();
    }
  }

  function openLightboxForItem(item) {
    if (!lightbox || lightbox.open) return;
    const visible = getVisibleItems();
    const idx = visible.indexOf(item);
    updateLightbox(idx >= 0 ? idx : 0, false);

    lightbox.showModal();

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(lightbox, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: 'power2.out' });
      gsap.fromTo(
        lbFigure,
        { scale: 0.95, y: 14 },
        { scale: 1, y: 0, duration: 0.28, ease: 'power3.out' }
      );
    }
  }

  allGalleryItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      // Prevent click after drag gesture
      if (wasDragged) {
        e.preventDefault();
        return;
      }
      openLightboxForItem(item);
    });
  });

  const closeLightbox = () => {
    if (!lightbox) return;
    if (typeof gsap !== 'undefined') {
      gsap.to(lbFigure, { scale: 0.96, y: 10, duration: 0.15, ease: 'power2.in' });
      gsap.to(lightbox, {
        autoAlpha: 0,
        duration: 0.16,
        ease: 'power2.in',
        onComplete: () => {
          lightbox.close();
          gsap.set([lightbox, lbFigure], { clearProps: 'all' });
        }
      });
    } else {
      lightbox.close();
    }
  };

  lbClose?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', () => updateLightbox(currentIndex - 1, true));
  nextBtn?.addEventListener('click', () => updateLightbox(currentIndex + 1, true));

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox?.open) return;
    if (e.key === 'ArrowLeft') updateLightbox(currentIndex - 1, true);
    if (e.key === 'ArrowRight') updateLightbox(currentIndex + 1, true);
    if (e.key === 'Escape') {
      e.preventDefault();
      closeLightbox();
    }
  });

  // Theme toggle (Dark / Light)
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');
  const rootHtml = document.documentElement;

  const applyThemeUI = (isLight, animate = false) => {
    if (isLight) {
      rootHtml.setAttribute('data-theme', 'light');
      themeToggle?.setAttribute('aria-pressed', 'true');
      themeToggle?.setAttribute('aria-label', 'Volver a modo oscuro');
      if (themeIcon) themeIcon.textContent = '☾';
      if (themeLabel) themeLabel.textContent = 'Modo Oscuro';
    } else {
      rootHtml.removeAttribute('data-theme');
      themeToggle?.setAttribute('aria-pressed', 'false');
      themeToggle?.setAttribute('aria-label', 'Cambiar a colores claros');
      if (themeIcon) themeIcon.textContent = '☀';
      if (themeLabel) themeLabel.textContent = 'Modo Claro';
    }

    if (animate && typeof gsap !== 'undefined') {
      gsap.fromTo(
        themeIcon,
        { rotation: -90, scale: 0.5 },
        { rotation: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
      );
      gsap.fromTo(
        '#cyberMoon',
        { scale: 0.95 },
        { scale: 1, duration: 0.55, ease: 'power3.out' }
      );
    }
  };

  if (themeToggle) {
    const savedTheme = localStorage.getItem('edgerunners_theme');
    if (savedTheme === 'light') {
      applyThemeUI(true, false);
    }

    themeToggle.addEventListener('click', () => {
      const nextIsLight = rootHtml.getAttribute('data-theme') !== 'light';
      applyThemeUI(nextIsLight, true);
      localStorage.setItem('edgerunners_theme', nextIsLight ? 'light' : 'dark');
    });
  }

  // Audio player: user-initiated playback avoids NotAllowedError in console
  const bgMusic = document.getElementById('bgMusic');
  const audioWidget = document.getElementById('audioWidget');
  const vmpPlayBtn = document.getElementById('vmpPlayBtn');
  const vmpPrevBtn = document.getElementById('vmpPrevBtn');
  const vmpEqBtn = document.getElementById('vmpEqBtn');
  const vmpCollapseBtn = document.getElementById('vmpCollapseBtn');
  const vmpProgressTrack = document.getElementById('vmpProgressTrack');
  const vmpProgressFill = document.getElementById('vmpProgressFill');

  if (bgMusic && audioWidget) {
    bgMusic.volume = 0.45;

    const updateAudioUI = () => {
      const isPlaying = !bgMusic.paused && !bgMusic.muted;
      audioWidget.classList.toggle('is-playing', isPlaying);
      vmpPlayBtn?.setAttribute('aria-pressed', String(isPlaying));
    };

    bgMusic.addEventListener('timeupdate', () => {
      const cur = bgMusic.currentTime || 0;
      const dur = bgMusic.duration || 0;
      if (vmpProgressFill && dur > 0) {
        const pct = Math.min(100, Math.max(0, (cur / dur) * 100));
        vmpProgressFill.style.width = `${pct}%`;
        vmpProgressTrack?.setAttribute('aria-valuenow', String(Math.round(pct)));
      }
    });

    vmpProgressTrack?.addEventListener('click', (e) => {
      if (!bgMusic.duration) return;
      const rect = vmpProgressTrack.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      bgMusic.currentTime = ratio * bgMusic.duration;
    });

    const togglePlayPause = async () => {
      if (bgMusic.paused) {
        bgMusic.muted = false;
        try {
          await bgMusic.play();
        } catch {
          // Playback blocked by browser policy or network error
        }
      } else {
        bgMusic.pause();
      }
      updateAudioUI();
    };

    vmpPlayBtn?.addEventListener('click', togglePlayPause);
    vmpEqBtn?.addEventListener('click', togglePlayPause);

    vmpPrevBtn?.addEventListener('click', () => {
      bgMusic.currentTime = Math.max(0, (bgMusic.currentTime || 0) - 10);
      if (vmpProgressFill && bgMusic.duration > 0) {
        const pct = Math.min(100, Math.max(0, (bgMusic.currentTime / bgMusic.duration) * 100));
        vmpProgressFill.style.width = `${pct}%`;
      }
      updateAudioUI();
    });

    vmpCollapseBtn?.addEventListener('click', () => {
      const collapsed = audioWidget.classList.toggle('is-collapsed');
      vmpCollapseBtn.setAttribute('aria-expanded', String(!collapsed));
    });
  }
});

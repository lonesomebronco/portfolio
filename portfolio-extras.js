/* Progressive enhancements. The original portfolio works without these extras. */
(() => {
  'use strict';
  const pdfPath = 'src/pdf/Vaibhav_Sharma_Resume.pdf';
  const dialog = document.querySelector('#resume-dialog');
  const openButton = document.querySelector('#open-resume');
  const closeButton = document.querySelector('#close-resume');
  const pdfFrame = document.querySelector('#resume-pdf-frame');
  let returnFocus = null;

  if (dialog && openButton && closeButton && pdfFrame) {
    const closeViewer = () => {
      if (dialog.open) dialog.close();
    };
    openButton.addEventListener('click', () => {
      returnFocus = document.activeElement;
      pdfFrame.src = pdfPath + '#toolbar=1&navpanes=0&view=FitH';
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
        closeButton.focus({preventScroll: true});
      } else {
        // Very old browsers retain a working PDF link rather than a dead button.
        window.open(pdfPath, '_blank', 'noopener');
      }
    });
    closeButton.addEventListener('click', closeViewer);
    dialog.addEventListener('click', (event) => {
      // Close on the backdrop, not when interacting with the PDF or toolbar.
      if (event.target === dialog) closeViewer();
    });
    dialog.addEventListener('close', () => {
      pdfFrame.removeAttribute('src');
      if (returnFocus && typeof returnFocus.focus === 'function') {
        returnFocus.focus({preventScroll: true});
      }
    });
  }

  // Display local vector artwork instantly. If online, upgrade to official Devicon logos.
  // Never let failed CDN requests leave empty circles.
  document.querySelectorAll('.skill-orb img[data-official]').forEach(img => {
    const preferred = img.dataset.official;
    const requested = new Image();
    requested.onload = () => { if (requested.naturalWidth > 0) img.src = preferred; };
    requested.src = preferred;
  });


  // Skill clusters: a single accessible category opens at once; click it again to close.
  const clusterButtons = [...document.querySelectorAll('.skill-cluster[data-cluster]')];
  const clusterPanels = [...document.querySelectorAll('.skill-cluster-panel[data-panel]')];
  const skillHint = document.querySelector('.skills-universe-hint');
  let activeCluster = null;
  const setCluster = (key, focusReturn = false) => {
    const activeButton = clusterButtons.find(button => button.dataset.cluster === key);
    const shouldOpen = key && activeCluster !== key;
    activeCluster = shouldOpen ? key : null;
    clusterButtons.forEach(button => {
      const selected = button.dataset.cluster === activeCluster;
      button.setAttribute('aria-expanded', String(selected));
    });
    clusterPanels.forEach(panel => {
      const show = panel.dataset.panel === activeCluster;
      panel.hidden = !show;
      panel.classList.remove('is-open');
      if (show) requestAnimationFrame(() => panel.classList.add('is-open'));
    });
    if (skillHint) skillHint.hidden = !!activeCluster;
    if (focusReturn && activeButton) activeButton.focus({preventScroll:true});
  };
  clusterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const alreadyOpen = activeCluster === button.dataset.cluster;
      setCluster(button.dataset.cluster);
      if (!alreadyOpen && window.innerWidth < 680) {
        const panel = document.querySelector('#skill-panel-' + button.dataset.cluster);
        if (panel) {
          const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          panel.scrollIntoView({block:'nearest',behavior:reduceMotion ? 'instant':'smooth'});
        }
      }
    });
  });
  document.querySelectorAll('[data-close-skills]').forEach(close => {
    close.addEventListener('click', () => setCluster(activeCluster, true));
  });

  // One accessible source of truth: aria-expanded. All role cards render CLOSED
  // in the HTML, before JavaScript or any animations have run.
  const cards = [...document.querySelectorAll('#workex .work-box')];
  const setExpanded = (card, expanded, instant = false) => {
    const details = card.querySelector('.responsibilities');
    if (!details) return;
    const wasOpen = card.getAttribute('aria-expanded') === 'true';
    if (expanded === wasOpen && !instant) return;
    if (instant) details.style.transition = 'none';
    // Measure content independently of the element's animated current height.
    card.setAttribute('aria-expanded', String(expanded));
    card.classList.toggle('clicked', expanded);
    details.style.height = expanded ? `${details.scrollHeight}px` : '0px';
    if (instant) requestAnimationFrame(() => { details.style.transition = ''; });
    const hint = card.querySelector('.experience-explore');
    if (hint) hint.setAttribute('aria-label', expanded ? 'Hide highlights' : 'Read highlights');
  };
  cards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    setExpanded(card, false, true);
    const toggle = () => setExpanded(card, card.getAttribute('aria-expanded') !== 'true');
    card.addEventListener('click', event => {
      if (event.target.closest('a, button')) return;
      toggle();
    });
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle(); }
      else if (event.key === 'Escape') { setExpanded(card, false); }
    });
  });
  window.addEventListener('resize', () => {
    cards.forEach(card => {
      if (card.getAttribute('aria-expanded') === 'true') {
        const details = card.querySelector('.responsibilities');
        details.style.height = `${details.scrollHeight}px`;
      }
    });
  }, { passive:true });

  // Elegant, small staggered entrance transitions. Content remains fully visible
  // if JS fails or reduced motion is requested.
  const wantsMotion = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (wantsMotion && 'IntersectionObserver' in window) {
    const targets = [...document.querySelectorAll(
      '#workex .work-box, .leadership-card, .project-box-wrapper, .healthcare-copy, .healthcare-visual, .healthcare-values > div'
    )];
    const viewport = window.innerHeight;
    targets.forEach((item, i) => {
      const box = item.getBoundingClientRect();
      // Don't hide elements already in view, e.g. a user following an anchor.
      if (box.top > viewport + 30) {
        item.classList.add('motion-reveal');
        item.style.setProperty('--motion-delay', `${Math.min(i % 3, 2) * 85}ms`);
      }
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {rootMargin:'0px 0px 70px 0px',threshold:.03});
    targets.filter(item => item.classList.contains('motion-reveal')).forEach(item => observer.observe(item));
  }

  const projectButtons = [...document.querySelectorAll('.project-filter')];
  const projectCards = [...document.querySelectorAll('.project-box-wrapper')];
  const projectCounter = document.querySelector('#project-count');
  projectButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      let visibleCount = 0;
      projectButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      projectCards.forEach((card, index) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.hidden = !show;
        if (show) {
          visibleCount += 1;
          card.style.setProperty('--reveal-delay', `${Math.min(index, 3) * 40}ms`);
          card.classList.remove('filter-reveal');
          // Re-trigger the very short entrance animation when switching categories.
          void card.offsetWidth;
          card.classList.add('filter-reveal');
        }
      });
      if (projectCounter) projectCounter.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'}`;
    });
  });

  // Animate soft card illumination only for precise desktop pointing devices.
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.project-box, .work-box, .leadership-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        const bounds = card.getBoundingClientRect();
        card.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
        card.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
      }, {passive: true});
    });
  }

  const line = document.querySelector('.page-progress-line');
  if (line) {
    let ticking = false;
    const updateProgress = () => {
      const length = document.documentElement.scrollHeight - window.innerHeight;
      line.style.transform = `scaleX(${length > 0 ? Math.min(1, window.scrollY / length) : 0})`;
      ticking = false;
    };
    document.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, {passive: true});
    window.addEventListener('resize', updateProgress, {passive: true});
    updateProgress();
  }
})();

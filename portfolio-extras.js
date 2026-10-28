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

  const cards = [...document.querySelectorAll('.work-box')];
  const setExpanded = (card, expanded) => {
    const details = card.querySelector('.responsibilities');
    if (!details) return;
    card.classList.toggle('clicked', expanded);
    card.setAttribute('aria-expanded', String(expanded));
    details.style.height = expanded ? details.scrollHeight + 'px' : '0px';
  };
  cards.forEach((card, index) => {
    const details = card.querySelector('.responsibilities');
    if (!details) return;
    card.tabIndex = 0;
    card.setAttribute('role','button');
    card.setAttribute('aria-expanded','false');
    // The current role tells the main story immediately; earlier roles are optional details.
    setExpanded(card, index === 0);
    const toggle = () => setExpanded(card, !card.classList.contains('clicked'));
    card.addEventListener('click', (event) => {
      if (event.target.closest('a, button')) return;
      toggle();
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
      if (event.key === 'Escape') setExpanded(card, false);
    });
  });
  window.addEventListener('resize', () => cards.forEach(card => {
    if (card.classList.contains('clicked')) setExpanded(card, true);
  }), {passive: true});

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

export const smoothScrollTo = (elementId: string, offset: number = 0) => {
  const element = document.getElementById(elementId) ||
                 document.querySelector(`[data-scroll-id="${elementId}"]`);

  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const lerpScrollTo = (
  targetY: number,
  duration: number = 1000,
  offset: number = 0
) => {
  const startY = window.pageYOffset;
  const distance = targetY - startY - offset;
  const startTime = Date.now();

  const scrollStep = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * easeProgress);

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  };

  requestAnimationFrame(scrollStep);
};
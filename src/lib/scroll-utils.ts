export const scrollToActivities = () => {
  // If we're not on the homepage, first navigate there
  if (window.location.pathname !== '/') {
    window.location.href = '/#activities';
    return;
  }
  
  // If we're already on the homepage, scroll to the section
  const element = document.getElementById('activities');
  if (element) {
    const isMobile = window.innerWidth < 1024;
    const header = document.querySelector('header');
    const headerHeight = header?.getBoundingClientRect().height || 0;
    
    // Calculate the element's position
    const elementTop = element.getBoundingClientRect().top;
    const elementPosition = elementTop + window.pageYOffset;
    
    // Calculate offset based on device
    const offset = isMobile ? 80 : 100; // Increased mobile offset for better visibility
    
    // Calculate final scroll position
    const scrollPosition = elementPosition - headerHeight - offset;

    // Add smooth scroll with easing
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  }
};

export const scrollToAbout = () => {
  // If we're not on the homepage, first navigate there
  if (window.location.pathname !== '/') {
    window.location.href = '/#about';
    return;
  }
  
  // If we're already on the homepage, scroll to the section
  const element = document.getElementById('about');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const scrollToContact = () => {
  // If we're not on the homepage, first navigate there
  if (window.location.pathname !== '/') {
    window.location.href = '/#contact';
    return;
  }
  
  // If we're already on the homepage, scroll to the section
  const element = document.getElementById('contact');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Add new function for booking section scroll
export const scrollToBookingSection = (ref: React.RefObject<HTMLElement>) => {
  const isMobile = window.innerWidth < 1024;
  
  // On mobile, scroll to the mobile booking section by ID
  if (isMobile) {
    const mobileBookingSection = document.getElementById('mobile-booking-section');
    if (mobileBookingSection) {
      const header = document.querySelector('header');
      const headerHeight = header?.getBoundingClientRect().height || 0;
      
      const elementTop = mobileBookingSection.getBoundingClientRect().top;
      const elementPosition = elementTop + window.scrollY;
      
      // Increased offset for mobile to account for sticky header and spacing
      const scrollPosition = elementPosition - headerHeight - 120;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
    return;
  }
  
  // Desktop behavior: scroll to the booking section ref
  if (!ref.current) return;
  
  const header = document.querySelector('header');
  const headerHeight = header?.getBoundingClientRect().height || 0;
  
  const elementTop = ref.current.getBoundingClientRect().top;
  const elementPosition = elementTop + window.scrollY;
  
  // Increased offset for desktop to account for sticky header and better spacing
  const scrollPosition = elementPosition - headerHeight - 140;

  window.scrollTo({
    top: scrollPosition,
    behavior: 'smooth'
  });
}; 
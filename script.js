document.addEventListener('DOMContentLoaded', function() {
  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
  
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀' : '🌙';
  }
  
  setTheme(currentTheme);
  
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(currentTheme);
  });

  // Mobile Menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  hamburger.addEventListener('click', () => {
    const isHidden = mobileMenu.hidden;
    mobileMenu.hidden = !isHidden;
    hamburger.textContent = isHidden ? '✕' : '☰';
    hamburger.setAttribute('aria-label', isHidden ? 'Close menu' : 'Open menu');
    
    // Animate menu items
    if (isHidden) {
      const menuItems = mobileMenu.querySelectorAll('a');
      menuItems.forEach((item, index) => {
        item.style.animation = `slideUp 0.4s ease-out ${index * 0.1}s both`;
      });
    }
  });

  // Counter Animation
  const counterUsers = document.getElementById('counterUsers');
  const targetCount = 5000000;
  let currentCount = 0;
  const increment = targetCount / 50;
  
  const counterInterval = setInterval(() => {
    currentCount += increment;
    if (currentCount >= targetCount) {
      currentCount = targetCount;
      clearInterval(counterInterval);
    }
    counterUsers.textContent = Math.floor(currentCount).toLocaleString();
    counterUsers.classList.add('counter-animate');
    setTimeout(() => counterUsers.classList.remove('counter-animate'), 500);
  }, 50);

  // Ride Type Selection
  const rideTypes = document.querySelectorAll('.chip');
  rideTypes.forEach(chip => {
    chip.addEventListener('click', () => {
      rideTypes.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      
      // Add ripple effect
      chip.classList.add('ripple');
      setTimeout(() => chip.classList.remove('ripple'), 600);
      
      // Update booking form
      updateEstimate();
    });
  });

  // Book from Pricing Cards
  const bookButtons = document.querySelectorAll('.bookFromCard');
  bookButtons.forEach(button => {
    button.addEventListener('click', () => {
      const type = button.dataset.type;
      
      // Animate button
      button.classList.add('pulse');
      setTimeout(() => button.classList.remove('pulse'), 300);
      
      // Update ride type
      rideTypes.forEach(chip => {
        chip.classList.remove('active');
        if (chip.dataset.type === type) chip.classList.add('active');
      });
      
      // Scroll to booking form
      document.querySelector('.booking').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      
      // Add highlight animation
      const bookingForm = document.querySelector('.booking');
      bookingForm.style.boxShadow = '0 0 0 3px rgba(255, 210, 30, 0.5)';
      setTimeout(() => {
        bookingForm.style.boxShadow = 'var(--shadow)';
      }, 1500);
      
      updateEstimate();
    });
  });

  // City Selection
  const cityButtons = document.querySelectorAll('.cityBtn');
  const cityName = document.getElementById('cityName');
  const cityDesc = document.getElementById('cityDesc');
  const cityEta = document.getElementById('cityEta');
  const cityFare = document.getElementById('cityFare');
  
  const cityData = {
    'Bengaluru': {
      desc: 'India\'s tech capital with fastest bike rides',
      eta: '5-8 min',
      fare: '₹6/km'
    },
    'Hyderabad': {
      desc: 'Pearl city with affordable auto rides',
      eta: '7-10 min',
      fare: '₹5/km'
    },
    'Delhi': {
      desc: 'Metro city with quick cab availability',
      eta: '10-15 min',
      fare: '₹8/km'
    },
    'Mumbai': {
      desc: 'Maximum auto rides in minimum time',
      eta: '8-12 min',
      fare: '₹7/km'
    },
    'Chennai': {
      desc: 'Reliable bike rides in busy streets',
      eta: '6-9 min',
      fare: '₹5.5/km'
    },
    'Pune': {
      desc: 'Student-friendly bike sharing',
      eta: '5-7 min',
      fare: '₹5/km'
    },
    'Kolkata': {
      desc: 'Heritage city with smooth cab rides',
      eta: '12-15 min',
      fare: '₹7.5/km'
    }
  };
  
  cityButtons.forEach(button => {
    button.addEventListener('click', () => {
      const city = button.dataset.city;
      const data = cityData[city];
      
      // Animate button
      button.classList.add('pulse');
      setTimeout(() => button.classList.remove('pulse'), 300);
      
      // Animate city panel
      const cityPanel = document.getElementById('cityPanel');
      cityPanel.style.transform = 'scale(0.95)';
      setTimeout(() => {
        cityPanel.style.transform = 'scale(1)';
        
        // Update content
        cityName.textContent = city;
        cityDesc.textContent = data.desc;
        cityEta.textContent = data.eta;
        cityFare.textContent = data.fare;
        
        // Add gradient animation to city name
        cityName.classList.add('gradient-text');
      }, 300);
    });
  });

  // Booking Form
  const bookingForm = document.getElementById('bookingForm');
  const etaElement = document.getElementById('eta');
  const fareElement = document.getElementById('fare');
  
  function updateEstimate() {
    const activeType = document.querySelector('.chip.active').dataset.type;
    const baseFare = document.querySelector(`.price h3:contains(${activeType})`).parentElement.querySelector('[data-base-fare]').dataset.baseFare;
    
    // Randomize ETA and fare for demo
    const eta = Math.floor(Math.random() * 10) + 5;
    const fare = Math.floor(Math.random() * 50) + 50;
    
    etaElement.textContent = `${eta} min`;
    fareElement.textContent = `₹${fare}`;
    
    // Add animation
    etaElement.classList.add('counter-animate');
    fareElement.classList.add('counter-animate');
    setTimeout(() => {
      etaElement.classList.remove('counter-animate');
      fareElement.classList.remove('counter-animate');
    }, 500);
  }
  
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    openBookingModal();
  });

  // Modal Functions
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add animation to modal content
    const content = modal.querySelector('.content');
    content.style.animation = 'slideUp 0.4s ease-out both';
  }
  
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Close modals when clicking overlay
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });
  
  // Close modals with close buttons
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(btn.dataset.close);
    });
  });
  
  // Sign In Modal
  document.getElementById('signinBtn').addEventListener('click', () => {
    openModal('signinModal');
  });
  
  document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault();
    showToast('Signed in successfully!');
    closeModal('signinModal');
  });

  // Booking Modal
  function openBookingModal() {
    openModal('bookingModal');
    
    // Update booking summary
    const activeType = document.querySelector('.chip.active').dataset.type;
    const pickup = document.getElementById('pickup').value || 'Current location';
    const drop = document.getElementById('drop').value || 'Destination';
    const time = document.getElementById('time').value || 'Now';
    const coupon = document.getElementById('coupon').value || 'None';
    
    const summary = `
      <h3>${activeType} Ride</h3>
      <p><b>From:</b> ${pickup}</p>
      <p><b>To:</b> ${drop}</p>
      <p><b>Time:</b> ${time}</p>
      <p><b>Coupon:</b> ${coupon}</p>
    `;
    
    document.getElementById('bookingSummary').innerHTML = summary;
    
    // Payment options
    document.getElementById('upiBtn').addEventListener('click', function() {
      document.getElementById('upiQRCode').style.display = 'block';
      this.classList.add('btn-primary');
      this.classList.remove('btn-outline');
      document.getElementById('cashBtn').classList.remove('btn-primary');
      document.getElementById('cashBtn').classList.add('btn-outline');
    });
    
    document.getElementById('cashBtn').addEventListener('click', function() {
      document.getElementById('upiQRCode').style.display = 'none';
      this.classList.add('btn-primary');
      this.classList.remove('btn-outline');
      document.getElementById('upiBtn').classList.remove('btn-primary');
      document.getElementById('upiBtn').classList.add('btn-outline');
    });
    
    // Confirm button
    document.getElementById('confirmBtn').addEventListener('click', function() {
      showToast('Ride confirmed! Your captain is on the way.');
      closeModal('bookingModal');
      
      // Add floating bike animation
      const floatingBike = document.createElement('div');
      floatingBike.innerHTML = `
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm14 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="var(--brand)" stroke-width="2"/>
          <path d="M9 17l3-7h3l3 7" stroke="var(--brand)" stroke-width="2" stroke-linecap="round"/>
          <path d="M7 9l3 2" stroke="var(--brand)" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
      floatingBike.style.position = 'fixed';
      floatingBike.style.bottom = '20px';
      floatingBike.style.right = '20px';
      floatingBike.style.zIndex = '1000';
      floatingBike.style.animation = 'float 2s ease-in-out infinite';
      document.body.appendChild(floatingBike);
      
      setTimeout(() => {
        floatingBike.style.transition = 'all 1s ease-in-out';
        floatingBike.style.transform = 'translateX(-100vw)';
        setTimeout(() => floatingBike.remove(), 1000);
      }, 3000);
    });
    
    // Cancel button
    document.getElementById('cancelBtn').addEventListener('click', function() {
      showToast('Ride cancelled');
      closeModal('bookingModal');
    });
  }

  // Support Modal
  document.getElementById('openSupport').addEventListener('click', () => {
    openModal('supportModal');
  });
  
  document.getElementById('supportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    showToast('Support request sent! We\'ll contact you soon.');
    closeModal('supportModal');
  });

  // Drive With Us
  document.getElementById('driveNow').addEventListener('click', function() {
    showToast('Redirecting to driver application...');
    // In a real app, this would redirect to a driver signup page
  });

  // Newsletter
  document.getElementById('newsletter').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('newsEmail').value;
    document.getElementById('newsMsg').textContent = `Thanks for subscribing with ${email}!`;
    document.getElementById('newsMsg').style.color = 'var(--brand)';
    this.reset();
    
    // Add confetti effect
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.top = '0';
    confetti.style.left = '0';
    confetti.style.width = '100%';
    confetti.style.height = '100%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '1000';
    document.body.appendChild(confetti);
    
    for (let i = 0; i < 50; i++) {
      const dot = document.createElement('div');
      dot.style.position = 'absolute';
      dot.style.width = '8px';
      dot.style.height = '8px';
      dot.style.backgroundColor = `hsl(${Math.random() * 60 + 30}, 100%, 50%)`;
      dot.style.borderRadius = '50%';
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${Math.random() * 100}%`;
      dot.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;
      
      // Add keyframes dynamically
      const style = document.createElement('style');
      style.textContent = `
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(${Math.random() * 360}deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
      
      confetti.appendChild(dot);
    }
    
    setTimeout(() => confetti.remove(), 2000);
  });

  // Toast Notification
  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Back to Top Button
  document.getElementById('topFab').addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Help Button
  document.getElementById('helpFab').addEventListener('click', () => {
    showToast('Need help? Contact our support team!');
  });

  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Initialize form time to now
  const now = new Date();
  const timeInput = document.getElementById('time');
  timeInput.value = now.toISOString().slice(0, 16);
  
  // Update estimate on form changes
  bookingForm.addEventListener('input', updateEstimate);
  updateEstimate();
  
  // Add scroll animations
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.card, .feature, .section-title, .section-sub');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.animation = 'slideUp 0.6s ease-out both';
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load
});
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    navbar.classList.remove('scroll-up');
    return;
  }
  
  if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
    // Scroll Down
    navbar.classList.remove('scroll-up');
    navbar.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
    // Scroll Up
    navbar.classList.remove('scroll-down');
    navbar.classList.add('scroll-up');
  }
  lastScroll = currentScroll;
});

// Function to send email using EmailJS
function sendMail(name, subject, email, message) {
  return emailjs.send('service_6nvr1e8', 'template_t2yx6et', {
    from_name: name,
    from_email: email,
    message: message,
    to_email: 'ethanreilly.casal@gmail.com',
    subject: subject,
    reply_to: email
  });
}

// Form submission handler
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const name = document.getElementById('name').value;
  const subject = document.getElementById('subject').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Show loading state
  const submitButton = this.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  
  // Send email using the sendMail function
  sendMail(name, subject, email, message)
    .then(function() {
  // Show success message
  alert('Thank you for your message! I will get back to you soon.');
  // Reset the form
      document.getElementById('contact-form').reset();
    })
    .catch(function(error) {
      // Show error message
      alert('Sorry, there was an error sending your message. Please try again later.');
      console.error('EmailJS error:', error);
    })
    .finally(function() {
      // Reset button state
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    });
});

// Testimonials load more functionality
const testimonialsGrid = document.querySelector('.testimonials-grid');
const loadMoreBtn = document.getElementById('load-more-testimonials');
const loadLessBtn = document.getElementById('load-less-testimonials');
const initialTestimonials = testimonialsGrid.innerHTML;

const newTestimonials = [
  {
    quote: "Thanks to Ethan — he helped edit a few of my videos, and it was incredibly helpful. He did a great job with the edits, and the turnaround time was impressively quick. I had the fully edited videos back within just a couple of days. I definitely recommend him to anyone looking to hire a video editor.",
    name: "Keaton  Pistilli",
    title: "Online Fitness Coach, Pistili Performance"
  },
  {
    quote: "Working with Ethan has helped my brand grow exponentially. I’ve gained more impressions, more views, and more subscribers on both my YouTube and Facebook channels. I’m truly grateful to be working with him, and I highly recommend that you do the same.",
    name: "Tanner Schock",
    title: "Real Estate Agent, Brokers12"
  },
  {
    quote: "He helped me out a lot with my social media marketing. He’s the kindest, most patient guy. I’m not really good at understanding the social media side of things, but he was so helpful and understanding. Even with the time difference, he worked around my schedule. He made a bunch of content for me — videos, pictures promoting my listings — and the quality was top-notch. Just from that, I even got some leads. Strongly recommend him. Wonderful person and super effective at what he does.",
    name: "John Taylor",
    title: "Real Estate Agent, Right At Home Realty"
  },

];

loadMoreBtn.addEventListener('click', function() {
  newTestimonials.forEach(testimonial => {
    const testimonialCard = document.createElement('div');
    testimonialCard.className = 'testimonial-card';
    testimonialCard.innerHTML = `
      <blockquote>${testimonial.quote}</blockquote>
      <div class="testimonial-author">
        <div class="author-info">
        <h4>${testimonial.name}</h4>
          <div class="stars">★★★★★</div>
        </div>
        <p>${testimonial.title}</p>
      </div>
    `;
    testimonialsGrid.appendChild(testimonialCard);
  });

  // Toggle buttons
  this.style.display = 'none';
  loadLessBtn.style.display = 'inline-block';
});

loadLessBtn.addEventListener('click', function() {
  // Restore initial testimonials
  testimonialsGrid.innerHTML = initialTestimonials;
  
  // Toggle buttons
  this.style.display = 'none';
  loadMoreBtn.style.display = 'inline-block';
});

// Mobile Menu Functionality
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
`;

const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu';
mobileMenu.innerHTML = `
  <button class="mobile-menu-close">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
  <div class="nav-links">
    <a href="../index.html#about">About</a>
    <a href="../index.html#projects">Projects</a>
    <a href="../index.html#testimonials">Testimonials</a>
    <a href="../index.html#contact">Contact</a>
  </div>
`;

document.querySelector('.navbar .container').appendChild(mobileMenuBtn);
document.body.appendChild(mobileMenu);

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.add('active');
  document.body.style.overflow = 'hidden';
});

document.querySelector('.mobile-menu-close').addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  document.body.style.overflow = '';
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (mobileMenu.classList.contains('active') && 
      !mobileMenu.contains(e.target) && 
      !mobileMenuBtn.contains(e.target)) {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});
  
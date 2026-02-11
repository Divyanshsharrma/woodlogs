// WoodLogs Preschool & Day Care - JavaScript

let currentMediaIndex = 0;
let mediaList = [];

// Career Application Function
function submitCareerApplication() {
  const position = document.getElementById('position').value;
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  
  if (!position || !name || !phone || !email) {
    alert('Please fill in all fields');
    return;
  }
  
  // Create WhatsApp message
  const message = `Hi WoodLogs! I want to apply for the position of ${position}.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}`;
  const whatsappUrl = `https://wa.me/918126258665?text=${encodeURIComponent(message)}`;
  
  // Open WhatsApp with pre-filled message
  window.open(whatsappUrl, '_blank');
}

// Contact Form WhatsApp Function
function submitContactForm() {
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const program = document.getElementById('program').value;
  const message = document.getElementById('message').value;
  
  if (!name || !phone || !email || !program) {
    alert('Please fill in all required fields');
    return;
  }
  
  // Get program name from select
  const programSelect = document.getElementById('program');
  const programName = programSelect.options[programSelect.selectedIndex].text;
  
  // Create WhatsApp message
  const whatsappMessage = `Hi WoodLogs! I'm interested in your preschool program.\n\nParent's Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nProgram: ${programName}\nMessage: ${message}`;
  const whatsappUrl = `https://wa.me/918126258665?text=${encodeURIComponent(whatsappMessage)}`;
  
  // Open WhatsApp with pre-filled message
  window.open(whatsappUrl, '_blank');
}

// Header fade animations on scroll
let lastScrollTop = 0;
let scrollDirection = 'down';

window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const header = document.querySelector('header');
  
  // Determine scroll direction
  if (scrollTop > lastScrollTop) {
    scrollDirection = 'down';
  } else if (scrollTop < lastScrollTop) {
    scrollDirection = 'up';
  }
  
  // Add fade-out class to header when scrolling down
  if (scrollDirection === 'down') {
    header.classList.add('fade-out');
  } else {
    header.classList.remove('fade-out');
  }
  
  lastScrollTop = scrollTop;
});

function openFullscreen(src, type) {
  console.log('openFullscreen called with:', src, type);
  
  const modal = document.getElementById('fullscreenModal');
  const content = document.getElementById('fullscreenContent');
  
  // Collect all media sources directly
  mediaList = [];
  
  // Get all images
  document.querySelectorAll('.gallery-item img').forEach(img => {
    mediaList.push({ src: img.src, type: 'image' });
  });
  
  // Get all videos
  document.querySelectorAll('.gallery-item video source').forEach(source => {
    mediaList.push({ src: source.src, type: 'video' });
  });
  
  console.log('Media list:', mediaList);
  
  // Find current index
  currentMediaIndex = mediaList.findIndex(item => item.src === src);
  if (currentMediaIndex === -1) {
    currentMediaIndex = 0; // fallback to first item
  }
  
  console.log('Current index:', currentMediaIndex);
  
  showCurrentMedia();
  modal.classList.add('active');
}

function showCurrentMedia() {
  const content = document.getElementById('fullscreenContent');
  const current = mediaList[currentMediaIndex];
  
  console.log('Showing media:', current);
  
  if (current.type === 'image') {
    content.innerHTML = `<img src="${current.src}" style="max-width:70%; max-height:70%; object-fit:contain;">`;
  } else {
    content.innerHTML = `<video controls autoplay style="max-width:70%; max-height:70%; object-fit:contain;">
      <source src="${current.src}" type="video/mp4">
    </video>`;
  }
}

function navigateMedia(direction) {
  if (direction === 'next') {
    currentMediaIndex = (currentMediaIndex + 1) % mediaList.length;
  } else {
    currentMediaIndex = (currentMediaIndex - 1 + mediaList.length) % mediaList.length;
  }
  showCurrentMedia();
}

function closeFullscreen() {
  const modal = document.getElementById('fullscreenModal');
  modal.classList.remove('active');
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  const modal = document.getElementById('fullscreenModal');
  if (!modal.classList.contains('active')) return;
  
  if (e.key === 'Escape') {
    closeFullscreen();
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    navigateMedia('next');
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    navigateMedia('prev');
  }
});

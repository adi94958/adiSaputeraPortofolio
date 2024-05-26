// Initialize AOS
document.addEventListener('DOMContentLoaded', function () {
    AOS.init();
});

// Function to handle smooth scrolling
function scrollHandler(event) {
    event.preventDefault();

    // Get the target href
    const href = this.getAttribute('href');

    // Scroll to the target element
    document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
    });

    // Close the mobile menu if open
    closeMobileMenu();
}

// Add click event listeners to all navbar links
const navbarLinks = document.querySelectorAll('nav a');
navbarLinks.forEach(link => {
    link.addEventListener('click', scrollHandler);
});

// Function to toggle the mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Function to close the mobile menu
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.add('hidden');
}

// Add click event listener to the mobile menu button
const mobileMenuButton = document.getElementById('mobile-menu-button');
mobileMenuButton.addEventListener('click', toggleMobileMenu);

// Typed text effect
const typedTextSpan = document.getElementById('typed-text');
const textArray = ['Frontend Developer', 'Web Designer', 'Web Programming'];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Function to toggle details
function toggleDetails(id) {
    const details = document.getElementById(id);
    details.classList.toggle('hidden');
    details.classList.toggle('block');

    const link = document.querySelector(`[onclick="toggleDetails('${id}')"]`);
    const linkText = details.classList.contains('hidden') ? 'View details' : 'Hide details';
    link.textContent = linkText;
}

// Form submission handling
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const topic = document.getElementById('topic').value;
    const message = document.getElementById('message').value;

    // Send email using EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        topic: topic,
        message: message
    }).then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Your message has been sent!');
        document.getElementById('contactForm').reset();
    }, function (error) {
        console.log('FAILED...', error);
        alert('Sorry, there was an error sending your message. Please try again later.');
    });
});

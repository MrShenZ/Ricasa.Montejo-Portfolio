document.addEventListener("DOMContentLoaded", function() {
    const socialIcons = document.querySelectorAll(".Social-icon a");
    const menuIcon = document.getElementById('Menu-icon');
    const navbar = document.querySelector('.navbar');
    const profile1Container = document.getElementById('profile1Container');
    const profile2Container = document.getElementById('profile2Container');
    let currentProfile = 1; // Variable to track the currently displayed profile

    // Function to toggle visibility and animate profiles
    function toggleProfiles() {
        if (currentProfile === 1) {
            profile1Container.style.display = 'none';
            profile2Container.style.display = 'block';
            currentProfile = 2;
        } else {
            profile1Container.style.display = 'block';
            profile2Container.style.display = 'none';
            currentProfile = 1;
        }
        profile1Container.classList.toggle('fadeIn');
        profile2Container.classList.toggle('fadeIn');
    }

    // Initial call to start the animation
    setTimeout(() => {
        profile1Container.style.display = 'block';
        profile1Container.classList.add('fadeIn');
    }, 500); // Delay to ensure initial visibility

    // Interval to switch profiles every 5 seconds
    setInterval(toggleProfiles, 5000);

    // Menu icon click event to toggle navbar
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    // Contact form submission handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.getAttribute('action'), {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                formMessage.classList.remove('error-message');
                formMessage.classList.add('success-message');
                formMessage.style.display = 'block';
                formMessage.textContent = 'Message sent successfully!';
                contactForm.reset();
            } else {
                formMessage.classList.remove('success-message');
                formMessage.classList.add('error-message');
                formMessage.style.display = 'block';
                formMessage.textContent = result.message || 'Something went wrong. Please try again.';
            }
        } catch (error) {
            formMessage.classList.remove('success-message');
            formMessage.classList.add('error-message');
            formMessage.style.display = 'block';
            formMessage.textContent = 'Something went wrong. Please try again.';
        }
    });

    // Animation for social icons
    socialIcons.forEach((icon, index) => {
        icon.style.transitionDelay = `${index * 0.1}s`;
        icon.addEventListener("mouseover", () => {
            icon.classList.add("animate");
        });

        icon.addEventListener("mouseout", () => {
            icon.classList.remove("animate");
        });
    });
});

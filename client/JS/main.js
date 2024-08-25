document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch and display images
        const response = await fetch('http://localhost:3000/images-render');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const images = await response.json();
        console.log(images); // Log the images array

        const swiperWrapper = document.getElementById('swiper-wrapper');
        const gallerySection = document.getElementById('gallery-section');

        images.forEach(image => {
            const imageUrl = `http://localhost:3000/uploads/${image.image.split('/').pop()}`;
            console.log(imageUrl); // Log each image URL

            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.innerHTML = `<img src="${imageUrl}" alt="${image.title}">`;
            swiperWrapper.appendChild(slide);

            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            galleryItem.innerHTML = `
                <img src="${imageUrl}" alt="${image.title}">
                <h3>${image.title}</h3>
                <p>${image.description || 'No description available'}</p>
            `;
            gallerySection.appendChild(galleryItem);
        });

        // Initialize Swiper
        const swiper = new Swiper('.swiper-container', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
            speed: 600,
        });

        // Handle mouse events
        const swiperContainer = document.querySelector('.swiper-container');
        const moveElement = document.getElementById('move');

        swiperContainer.addEventListener('mouseenter', () => {
            moveElement.style.backgroundColor = '#ffffff';
        });

        swiperContainer.addEventListener('mouseleave', () => {
            moveElement.style.backgroundColor = '#000000';
        });

        // Display logged-in username and handle buttons visibility
        function updateUI() {
            const token = localStorage.getItem('token');
            const adminButton = document.querySelector('.admin-button');
            const logoutButton = document.getElementById('logout-button');
            const loginAsAdminButton = document.getElementById('login-as-admin-button');

            if (token) {
                const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
                document.getElementById('username').textContent = `Logged in as: ${payload.username}`;
                adminButton.style.display = 'block'; // Show admin panel button
                logoutButton.style.display = 'block'; // Show logout button
                loginAsAdminButton.style.display = 'none'; // Hide login as admin button
            } else {
                document.getElementById('username').textContent = 'Not logged in';
                adminButton.style.display = 'none'; // Hide admin panel button
                logoutButton.style.display = 'none'; // Hide logout button
                loginAsAdminButton.style.display = 'block'; // Show login as admin button
            }
        }

        // Call the function to update UI
        updateUI();

        // Logout button functionality
        document.getElementById('logout-button').addEventListener('click', () => {
            localStorage.removeItem('token'); // Remove the token from localStorage
            window.location.href = 'index.html'; // Redirect to the homepage or login page
        });

        // Login as Admin button functionality (example action)
        document.getElementById('login-as-admin-button').addEventListener('click', () => {
            window.location.href = 'login.html'; // Redirect to a login page or admin login page
        });

    } catch (error) {
        console.error('Error fetching images:', error);
    }
});
    
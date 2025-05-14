// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('nav ul li a');
    
    // Close mobile menu when a nav link is clicked
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            document.getElementById('check').checked = false;
        });
    });
});

// Add to your existing script.js file
// filepath: c:\vscode-projects\Brews-Bites-Cafe\script.js
// Menu tab navigation
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.menu-tabs a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            menuLinks.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Scroll to the corresponding section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Offset for sticky header and menu navigation
            const offset = 140;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('h4').textContent;
            const itemPrice = menuItem.querySelector('.menu-item-price span').textContent;
            
            // Here you would typically add the item to a cart object and update the UI
            console.log(`Added to cart: ${itemName} - ${itemPrice}`);
            
            // Show a brief confirmation
            const confirmation = document.createElement('div');
            confirmation.className = 'add-confirmation';
            confirmation.textContent = 'Added to cart!';
            menuItem.appendChild(confirmation);
            
            setTimeout(() => {
                confirmation.remove();
            }, 1500);
        });
    });
});
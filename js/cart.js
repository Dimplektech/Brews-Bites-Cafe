console.log("Menu page Script.js loaded");

document.addEventListener('DOMContentLoaded',function(){
    // Initialize the cart in local storage
    if(!localStorage.getItem('cart')){
        localStorage.setItem('cart',JSON.stringify([]));
    }

    //Elements on cart page
   const cartItemsContainer = document.getElementById('cart-items');
   const subtotalElement = document.getElementById('subtotal');
   const taxElement = document.getElementById('tax');
   const totalElement = document.getElementById('total');
   const clearCartButton=document.getElementById('clear-cart');
   const checkoutButton=document.getElementById('checkout-btn');
   const checkoutForm=document.getElementById('checkout-form');
   const paymentForm = document.getElementById('payment-form');
   const receiptSection=document.getElementById('receipt');
   const receiptItemsContainer=document.getElementById('receipt-items');
   const receiptSubtotal=document.getElementById('receipt-subtotal');
   const receiptTax=document.getElementById('receipt-tax');
   const receiptTotal=document.getElementById('receipt-total');
   const printReceiptButton=document.getElementById('print-receipt');
   const backToHomeButton = document.getElementById('back-to-home');
   const emptyCartMessage = document.getElementById('empty-cart-message');
    // Function to update the cart display
    // get the cart from local Storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [] ;
    
     // Only run cart-specific code if we're on the cart page
    if(window.location.pathname.includes('cart.html')){
        updateCartView();
    }
    function updateCartView(){
         console.log("updateCartView running");
          console.log("Cart contents:", cart);
        if(!cartItemsContainer) return;

        cartItemsContainer.innerHTML = ''; // Clear the container
        
        if (cart.length === 0){
            cartItemsContainer.innerHTML = "";
            document.querySelector(".cart-summary").classList.add('hidden');
            emptyCartMessage.classList.remove('hidden');
        } else {
            emptyCartMessage.classList.add('hidden');
            document.querySelector(".cart-summary").classList.remove('hidden');

            // clear the cart items container
            cartItemsContainer.innerHTML = '';

            // Add each cart item to the container

            cart.forEach((item,index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item'
                cartItem.innerHTML = `
                <div class="cart-item-info">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <span class="cart-item-price">£${item.price.toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <div class="cart-item-actions">
                        <div class="cart-item-quantity">
                            
                            
                            <button class="decrease-quantity" data-index="${index}">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase-quantity" data-index="${index}">+</button>
                            
                        </div>
                        <div class="cart-item-total">£${(item.price * item.quantity).toFixed(2)}</div>
                        <button class="cart-item-remove" data-index="${index}"><i class="fas fa-trash"></i></button>
                </div>
                `;
                    cartItemsContainer.appendChild(cartItem);
                });
    
                // Add event listeners to the buttons
                addCartItemEventListener();

                // Update totals
                updateTotals();
            }
    }
  


    // functions Upadate cart count indicator
    function updateCartCount(){
        const cartCountElement=document.querySelector('.cart-count');
        if (cartCountElement){
            const count = cart.reduce((total,item)=>
            total+ item.quantity,0);
        
        cartCountElement.textContent = count;
        cartCountElement.classList.remove('hidden');
        if(count > 0){
            cartCountElement.style.display = 'inline-flex';
        } else {
             cartCountElement.style.display = 'none';
        }
      }
    }



    function addCartItemEventListener(){
        // Decrease quantity 
        document.querySelectorAll('.decrease-quantity').forEach(button =>{
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if(cart[index].quantity>1){
                    cart[index].quantity--;
                } else {
                    cart.splice(index,1);
                }
                localStorage.setItem('cart',JSON.stringify(cart));
                updateCartView();
                updateCartCount();
                
            });
        });

        //Increase Quantity
        document.querySelectorAll('.increase-quantity').forEach(button =>{
            button.addEventListener('click', function(){
                const index = parseInt(this.getAttribute('data-index'));
                cart[index].quantity++;
                localStorage.setItem('cart',JSON.stringify(cart));
                updateCartView();
                updateCartCount();
            })
        })

        // Remove item
        document.querySelectorAll('.cart-item-remove').forEach(button =>{
            button.addEventListener('click',function(){
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index,1);
                localStorage.setItem('cart',JSON.stringify(cart));
                updateCartView();
                updateCartCount();
            })
        })
    }    
    
    function updateTotals(){
        if(!subtotalElement) return;

        const subTotal = cart.reduce((total,item)=>
        total +(item.price *item.quantity),0);
        const tax = subTotal * 0.08;
        const total = subTotal + tax;
        subtotalElement.textContent = `£${subTotal.toFixed(2)}`;
        taxElement.textContent =`£${tax.toFixed(2)}`;
        totalElement.textContent =`£${total.toFixed(2)}`;
    }

    //Intialize the cart count on page load

    updateCartCount();


});


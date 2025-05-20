document.addEventListener("DOMContentLoaded",function(){
    console.log("search script loaded");

    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const clearSearchButton = document.getElementById("clear-search-button");
    const searchResults = document.getElementById("search-results");
    const searchResultsItems = document.getElementById("search-results-items");
    const menuSections = document.querySelectorAll(".menu-section");


    function performSearch(){
        const searchTerm = searchInput.textContent.toLowerCase().trim();
        searchResultsItems.innerHTML = ""; // clear previous results

        // don't search if term is too short
        if(searchTerm<2){
            return;
        }

        // Finding matching items
        const allMenuItems = document.querySelectorAll(".menu-items");
        let matchFound = false;
        allMenuItems.forEach(item=>{
            const itemName = item.querySelector("menu-item-name").value.toLowerCase();
            const itemDescription = item.querySelector("menu-item-description").value.toLowerCase();

            if (itemName.includes(itemName) || itemDescription.includes(itemDescription)) {
                // Clone the item and add it to the search results
                const clonedItem = item.cloneNode(true);
                
                // Re-attach event listeners to the clone 
                const addButton = clonedItem.querySelector(".add-button");
                addButton.addEventListener("click", function(){
                    const menuItem = this.closest(".menu-item");
                    const itemName = menuItem.querySelector("h4").textContent;
                    const itemPriceText = menuItem.querySelector(".meni-item-price span").textContent;
                    const itemPrice = parseFloat(itemPriceText.replace("£", ""));

                    // Use the same function addTocart function to add item to the basket
                    addToCart(itemName, itemPrice);                

                    // Show a brief Confirmation messagew
                    const confirmationMessage = document.createElement("div");
                    confirmationMessage.classList.add("confirmation-message");
                    confirmationMessage.textContent = `${itemName} Added to the Cart`;
                    menuItem.appendChild(confirmationMessage);
                    setTimeout(() => {
                        confirmationMessage.remove();
                    },1500); // 1.5 seconds

                    });

                    searchResultsItems.appendChild(clonedItem);
                    matchFound = true;
            }    
        });

// Show "No Results Found" if no matches found
        if(!matchFound){
            searchResultsItems.innerHTML =`
            <div class="no-results">
                <p>No Menu item found matching "${searchTerm}"</p>
                <p> Try searching for something else!</p>

            </div>
            `;
        }
    }

    searchButton.addEventListener("click",performSearch);
    searchInput.addEventListener("keydown",function(e){
        if(e.key === "Enter"){
            performSearch();
        }
    })

    clearSearchButton.addEventListener("click",function(){
        searchInput.value = "";
        searchResultsItems.innerHTML = ""; // clear previous results
        searchResults.classList.add("hidden");
    })
});     
                   

         


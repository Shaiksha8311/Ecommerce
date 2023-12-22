function Men() {
    showCategory('menProducts');
}

function Women() {
    showCategory('womenProducts');
}

function Kids() {
    showCategory('kidsProducts');
}

function showCategory(categoryId) {
    // Hide all category containers
    document.getElementById('menProducts').style.display = 'none';
    document.getElementById('womenProducts').style.display = 'none';
    document.getElementById('kidsProducts').style.display = 'none';

    // Remove "active" class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show the selected category container
    document.getElementById(categoryId).style.display = 'block';

    // Add "active" class to the clicked tab
    event.target.classList.add('active');

    fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json")
        .then(response => response.json())
        .then(apiData => {
            apiData.categories.forEach(category => {
                if (category.category_name === "Men" && categoryId === 'menProducts') {
                    populateProducts(category.category_products, 'menProducts');
                } else if (category.category_name === "Women" && categoryId === 'womenProducts') {
                    populateProducts(category.category_products, 'womenProducts');
                } else if (category.category_name === "Kids" && categoryId === 'kidsProducts') {
                    populateProducts(category.category_products, 'kidsProducts');
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function populateProducts(products, categoryId) {
    const container = document.getElementById(categoryId);
    container.innerHTML = ''; // Clear previous content

    products.forEach(items => {
        const card = document.createElement("div");
        card.classList.add('product-card');

        // Calculate discount percentage
        const price = parseFloat(items.price);
        const compareAtPrice = parseFloat(items.compare_at_price);
        const discountPercentage = ((compareAtPrice - price) / compareAtPrice) * 100;

        card.innerHTML = `
            <div class="product-img-container">
                <img src="${items.image}" alt="${items.title}" class="product-image"/>
                <img src="${items.second_image}" alt="${items.title}" class="product-image"/>
                <div class="badge">${items.badge_text}</div>
            </div>
            <div class="product-details">
                <h3>${items.title}</h3>
                <p class="vendor">Vendor: ${items.vendor}</p>
                <p class="price">Price: $${price.toFixed(2)}</p>
                <p class="compare-at-price">Compare at Price: $${compareAtPrice.toFixed(2)}</p>
                <p class="discount">Discount: ${discountPercentage.toFixed(2)}%</p>
                <button class="add-to-cart-btn">Add to Cart</button>
            </div>
        `;

        container.appendChild(card);
    });
}

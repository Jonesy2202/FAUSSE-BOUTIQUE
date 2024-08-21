let products = [];

async function getItems() {

    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (response.ok) {
            products = await response.json();
        } else {
            throw new Error("Unable get products at this time!");
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
    }

}

async function displayItems() {

    await getItems();
    fillItemTable(products);

}

function fillItemTable(products) {
    const $products = $('#products');
    $products.empty();

    products.forEach(function (product) {
        let productOption = `
            <div class="col-lg-3 col-md-4 col-sm-10">
                <div class="card productCard mb-4">
                    <img src="${product.image}" class="card-img-top cardImage" alt="...">
                    <div class="card-body productCard">
                        <h6 class="card-title">${product.title}</h6>
                        <h5 class="currency">${formatPoundSterling(product.price)}</h5>
                        <div class="stars"></div>
                    </div>
                </div>
            </div>
        `;

        let fullStarDisplay = '<span class="material-symbols-outlined">star</span>';
        let halfStarDisplay = '<span class="material-symbols-outlined">star_rate_half</span>';

        const fullStars = Math.floor(product.rating.rate);
        const hasHalfStar = product.rating.rate % 1 >= 0.5;

        $products.append(productOption);

        const $stars = $products.find('.stars').last();

        for (let i = 0; i < fullStars; i++) {
            $stars.append(fullStarDisplay);
        }
        
        if (hasHalfStar) {
            $stars.append(halfStarDisplay);
        }

        let reviewCount = "  " + product.rating.count;
        $stars.append(reviewCount);
    });
}

function formatPoundSterling(value) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    }).format(value);
}
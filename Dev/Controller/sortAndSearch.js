let filterProducts = [];
let isFiltered;

$(document).ready(function () {
    $('#categories').on('change', function () {
        let category = $(this).val();
        filterByCategory(category);
    });
})

$(document).ready(function () {
    $('#sortItems').on('change', function () {
        if ($('#categories').val()!='') {
            sortItems($(this).val(), filterProducts);
        } else {
            sortItems($(this).val(), products);
        }
    });
})

function filterByCategory(category) {
    filterProducts = [];
    if (category) {
        products.forEach(function (product) {
            if (product.category == category) {
                filterProducts.push(product);
            }
        })
        isFiltered = true;
        fillItemTable(filterProducts);
    }else{
        isFiltered = false;
        fillItemTable(products);
    }

}

function sortItems(value, products) {
    switch (value) {
        case "price01":
            fillItemTable(products.sort((a, b) => a.price - b.price));
            break;
        case "price10":
            fillItemTable(products.sort((a, b) => b.price - a.price));
            break;
        case "rating01":
            fillItemTable(products.sort((a, b) => a.rating.rate - b.rating.rate));
            break;
        case "rating10":
            fillItemTable(products.sort((a, b) => b.rating.rate - a.rating.rate));
            break;
        default:
            fillItemTable(products.sort((a, b) => a.id - b.id));
            break;
    }
    products.sort((a, b) => a.price - b.price);
}

function undoSortFilter() {
    $('#sortItems').val('');
    $('#categories').val('');
    fillItemTable(products);
}
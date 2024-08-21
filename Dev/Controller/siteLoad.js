let categories = [];

function populateSite() {
    populateDropdownCategories();
    populateDropdownSort();
    displayItems();
}

async function getCategories() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if(response.ok){
        categories = await response.json();
        }else{
            throw new Error("Unable get categories at this time!");
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

async function populateDropdownCategories() {
    await getCategories();

        const $dropdown = $('#categories');

        $dropdown.append($('<option>').text(' - Filter - ').attr('value', ''));

        categories.forEach(function (category) {
            let catOption = $('<option></option>');

            catOption.text(category).attr('value', category);

            $dropdown.append(catOption);
        });

}

async function populateDropdownSort() {
    await getCategories();

        const $dropdown = $('#sortItems');

        $dropdown.append($('<option>').text('- Sort - ').attr('value', ''));

        $dropdown.append($('<option>').text('Price - Low to High').attr('value', 'price01'));
        $dropdown.append($('<option>').text('Price - High to Low').attr('value', 'price10'));
        $dropdown.append($('<option>').text('Rating - Low to High').attr('value', 'rating01'));
        $dropdown.append($('<option>').text('Rating - High to Low').attr('value', 'rating10'));


}
export default function createFiltersAndHeaders(data) {
    // Create Filters Div
    const filters = document.querySelector('.filters');
    filters.innerHTML = '';

    // Create H2 Title
    const title = document.createElement('h2');
    title.textContent = "Filters";
    filters.appendChild(title);

    // Getting object keys
    const keys = Object.keys(data[0]);

    keys.forEach(key => {
        const filterDiv = document.createElement('div');
        filterDiv.className = 'filter';

        const label = document.createElement('label');
        label.htmlFor = `search-${key}`;
        label.textContent = `${key}:`;

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `search-${key}`;
        input.className = 'search';
        input.dataset.column = key;


        filterDiv.appendChild(label);
        filterDiv.appendChild(input);

        filters.appendChild(filterDiv);
    });

    // Create Headers for Table
    const headers = document.querySelector('thead tr');
    headers.innerHTML = '';

    keys.forEach(key => {
        const header = document.createElement('th');
        header.className = 'sortable';
        header.dataset.column = key;
        header.textContent = key;

        headers.appendChild(header);
    });
}
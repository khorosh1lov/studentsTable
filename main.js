import createFiltersAndHeaders from './createFiltersAndHeaders.js';
import createTable from './createTable.js';
import fetchData from './fetchData.js';
import filterTable from './filterTable.js';

function downloadCSV(csv, filename) {
	let csvFile;
	let downloadLink;

	// CSV File
	csvFile = new Blob([csv], {
		type: 'text/csv',
	});

	// Download link
	downloadLink = document.createElement('a');

	// File name
	downloadLink.download = filename;

	// Create a link to the file
	downloadLink.href = window.URL.createObjectURL(csvFile);

	// Hide link
	downloadLink.style.display = 'none';

	// Add link to the DOM
	document.body.appendChild(downloadLink);

	// Click the link
	downloadLink.click();
}

function exportTableToCSV(filename) {
	let csv = [];
	let rows = document.querySelectorAll('table tr');

	for (let i = 0; i < rows.length; i++) {
		let row = [];
		let cols = rows[i].querySelectorAll('td, th');

		for (let j = 0; j < cols.length; j++) {
			row.push(cols[j].innerText);
		}

		csv.push(row.join(','));
	}

	// Download CSV
	downloadCSV(csv.join('\n'), filename);
}

const init = async (url) => {
	const tableBody = document.querySelector('tbody[data-tbody-id="data"]');

	let data = await fetchData(url);

	createFiltersAndHeaders(data);
	createTable(tableBody, data);

	const sortData = {};
	Object.keys(data[0]).forEach(key => {
		sortData[key] = true;
	})

	const searchInputs = document.querySelectorAll('.search');
	const headers = document.querySelectorAll('.sortable');

	let filteredData = [...data];

	const updateTable = (data) => {
		tableBody.innerHTML = '';
		createTable(tableBody, data);
	};
	
	headers.forEach((header) => {
		header.addEventListener('click', () => {
			const column = header.getAttribute('data-column');

			filteredData = filteredData.sort((a, b) => {
				const valueA = a[column];
				const valueB = b[column];

				if (!isNaN(valueA) && !isNaN(valueB)) {
					return sortData[column] ? valueA - valueB : valueB - valueA;
				} else {
					const stringValueA = a[column].toString().toLowerCase();
					const stringValueB = b[column].toString().toLowerCase();

					return sortData[column] ? stringValueA.localeCompare(stringValueB) : stringValueB.localeCompare(stringValueA);
				}
			});

			sortData[column] = !sortData[column];

			updateTable(filteredData);
		});
	});

	const searchValues = {};

	searchInputs.forEach((input) => {
		input.addEventListener('input', () => {
			const column = input.getAttribute('data-column');
			searchValues[column] = input.value;

			filteredData = filterTable(data, searchValues);

			updateTable(filteredData);
		});
	});
};

const saveBtn = document.querySelector('#save-table');
saveBtn.addEventListener('click', () => {
	let filename = prompt("Save as:", "");
	if (filename) exportTableToCSV(`${filename}.csv`);
})

init('https://jsonplaceholder.typicode.com/users');

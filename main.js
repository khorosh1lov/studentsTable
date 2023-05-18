import createTable from './createTable.js';
import fetchData from './fetchData.js';
import filterTable from './filterTable.js';

const init = async (url) => {
	const tableBody = document.querySelector('tbody[data-tbody-id="data"]');

	const updateTable = (data) => {
		tableBody.innerHTML = '';
		createTable(tableBody, data);
	};
	
	let data = await fetchData(url);
	let filteredData = [...data];

	createTable(tableBody, data);

	const searchInputs = document.querySelectorAll('.search');
	const headers = document.querySelectorAll('.sortable');

	const sortData = {
		id: true,
		firstName: true,
		lastName: true,
		grade: true
	}

	headers.forEach(header => {
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

	searchInputs.forEach(input => {
		input.addEventListener('input', () => {
			const column = input.getAttribute('data-column');
			searchValues[column] = input.value;

			filteredData = filterTable(data, searchValues);

			updateTable(filteredData);
		});
	});
};

init('./studentsGroupB.json');

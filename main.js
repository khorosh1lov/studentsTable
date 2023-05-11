import createTable from './createTable.js';
import fetchStudents from './fetchStudents.js';
import filterTable from './filterTable.js';

const init = async () => {
	const tableBody = document.querySelector('tbody[data-tbody-id="students"]');

	const updateTable = (students) => {
		tableBody.innerHTML = '';
		createTable(tableBody, students);
	};
	
	let students = await fetchStudents(2);
	let filteredStudents = [...students];

	createTable(tableBody, students);

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

			filteredStudents = filteredStudents.sort((a, b) => {
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

			updateTable(filteredStudents);
		});
	});

	const searchValues = {};

	searchInputs.forEach(input => {
		input.addEventListener('input', () => {
			const column = input.getAttribute('data-column');
			searchValues[column] = input.value;

			filteredStudents = filterTable(students, searchValues);

			updateTable(filteredStudents);
		});
	});
};

init();

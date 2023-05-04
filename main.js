import createTable from './createTable.js';
import filterTable from './filterTable.js';

async function fetchStudents(group = 1) {
	let response;

	switch (group) {
		case 1:
			response = await fetch('./studentsGroupA.json');
			break;
		case 2:
			response = await fetch('./studentsGroupB.json');
			break;
		default:
			console.error('Invalid group number provided');
			return;
	}
	
	const students = await response.json();
	return students;
}

const init = async () => {
	const tableBody = document.querySelector('tbody[data-tbody-id="students"]');
	let students = await fetchStudents(2);

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

			students = students.sort((a, b) => {
				const valueA = a[column].toString().toLowerCase();
				const valueB = b[column].toString().toLowerCase();

				if (sortData[column]) {
					return valueA.localeCompare(valueB);
				} else {
					return valueB.localeCompare(valueA);
				}
			});

			sortData[column] = !sortData[column];

			tableBody.innerHTML = '';
			createTable(tableBody, students);
		});
	});

	searchInputs.forEach(input => {
		const searchValues = {};

		input.addEventListener('input', () => {
			searchInputs.forEach(input => {
				searchValues[input.getAttribute('data-column')] = input.value;
			});

			const filteredStudents = filterTable(students, searchValues);

			tableBody.innerHTML = '';
			createTable(tableBody, filteredStudents);
		});
	});
};

init();

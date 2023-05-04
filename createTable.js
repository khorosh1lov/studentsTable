export default function createTable(body, items) {
	 items.map((item) => {
		const row = document.createElement('tr');

		const itemKeys = Object.keys(item);

		itemKeys.map((value) => {
			const cell = document.createElement('td');
			cell.textContent = item[value];
			row.appendChild(cell);
		});

		body.appendChild(row);
	});
}
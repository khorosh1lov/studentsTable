export default function createTable(body, data) {
	 data.forEach((item) => {
		const row = document.createElement('tr');

		Object.values(item).forEach((value) => {
			const cell = document.createElement('td');
			cell.textContent = value;
			row.appendChild(cell);
		})

		body.appendChild(row);
	});
}
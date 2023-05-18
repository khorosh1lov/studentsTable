export default function filterTable(data, searchValues) {
    const filteredData = data.filter((data) => {
		return Object.keys(searchValues).every((key) => {
			return data[key].toString().toLowerCase().includes(searchValues[key].toLowerCase());
		});
	});

    return filteredData;
}
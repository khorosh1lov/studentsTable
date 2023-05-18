export default async function fetchData(url) {
	const response = await fetch(url);

	if (!response.ok) {
		console.error('Error fetching data');
		return;
	}

	const data = await response.json();
	return data;
}



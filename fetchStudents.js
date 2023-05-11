export default async function fetchStudents(group = 1) {
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



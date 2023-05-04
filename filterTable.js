export default function filterTable(students, searchValues) {
    const filteredStudents = students.filter((student) => {
		return Object.keys(searchValues).every((key) => {
			return student[key].toString().toLowerCase().includes(searchValues[key].toLowerCase());
		});
	});

    return filteredStudents;
}
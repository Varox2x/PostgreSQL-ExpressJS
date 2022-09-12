const getStudents = "SELECT * FROM students";
const getStudentById = "SELECT * FROM students WHERE id = $1";
const checkEmailExists = "SELECT s FROM students s WHERE s.email = $1";


module.exports = {
    getStudents,
    getStudentById,
    checkEmailExists
}
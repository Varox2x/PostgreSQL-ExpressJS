const pool = require('../../db');
const queries = require('./queries');

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;

    //check if email exists
     pool.query(queries.checkEmailExists, [email], (error, results) => {
        if(results.rows.length) {
            res.send("Email already exists.");
        }

        else{
    // add studnt to database
            pool.query(
                queries.addStudent, 
                [name, email, age, dob], 
                (error, results) => {
                if(error) {error};
                res.status(201).send("Student Create Successfully!");
                console.log("Adding student");
                })
        }

    })
}

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if(noStudentFound){
            res.send("Student doesn't exist in the databse, could not remove");
        }
        else {
            console.log(results);
            pool.query(queries.removeStudent, [id], (error, results) => {
                if(error) {throw error};
                res.status(200).send("students removed successfully");
            })
        }
    })
}

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent
}
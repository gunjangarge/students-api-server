const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.firstname || !req.body.lastname || !req.body.phonenumber || !req.body.emailaddress || !req.body.city || !req.body.country) {
        res.status(400).send({
            message: "Content cannot be empty."
        });
    }

    const student = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        emailaddress: req.body.emailaddress,
        city: req.body.city,
        country: req.body.country
    };

    Student.create(student)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500)
                .send({
                    message: err.message || "Some error occurred while creating a student."
                })
        });
};
exports.findAll = (req, res) => {
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;
    const phonenumber = req.query.phonenumber;
    const emailaddress = req.query.emailaddress;
    const city = req.query.city;
    const country = req.query.country;
    var condition = '';

    if (firstname) {
        condition = { firstname: { [Op.iLike]: `%${firstname}%` } }
    }
    if (lastname) {
        condition = { lastname: { [Op.iLike]: `%${lastname}%` } }
    }
    if (phonenumber) {
        condition = { phonenumber: { [Op.iLike]: `%${phonenumber}%` } }
    }
    if (emailaddress) {
        condition = { emailaddress: { [Op.iLike]: `%${emailaddress}%` } }
    }
    if (city) {
        condition = { city: { [Op.iLike]: `%${city}%` } }
    }
    if (country) {
        condition = { country: { [Op.iLike]: `%${country}%` } }
    }

    console.log(condition);

    Student.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500)
                .send({
                    message: err.message || "Some error occurred while retrieving data."
                });
        })

};
exports.findOne = (req, res) => {
    const id = req.params.id;

    Student.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            req.status(500)
                .send({
                    message: err.message || "Some error occurred while retrieving data."
                })
        })
};
exports.update = (req, res) => {
    const id = req.params.id;
    Student.update(req.body, {
        where: { id: id }
    })
        .then(count => {
            if (count == 1) {
                res.send({
                    message: "Student was modified successfully."
                });
            } else {
                res.send({
                    message: `Could not update student with id ${id}`
                })
            }
        }).catch(err => {
            res.status(500)
                .send({
                    message: "Error updating student record."
                })
        })

};
exports.delete = (req, res) => {
    const id = req.params.id;
    Student.destroy({
        where: { id: id }
    })
        .then(count => {
            if (count == 1) {
                res.send({
                    message: "Student was deleted successfully."
                });
            } else {
                res.send({
                    message: `Could not delete student with id ${id}`
                })
            }
        }).catch(err => {
            res.status(500)
                .send({
                    message: "Error deleting student record."
                })
        })
};
exports.deleteAll = (req, res) => {
    Student.destroy({
        where: {},
        truncate: false
    })
    .then(count => {
        res.send({
            message: `${count} records deleted successfully.`
        });
    })
    .catch(err => {
        res.status(500)
        .send({
            message: 'Error occurred deleting all records.'
        })
    });
};

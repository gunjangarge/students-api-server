module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        phonenumber: {
            type: Sequelize.BIGINT
        },
        emailaddress: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        }
    });

    return Student;

};

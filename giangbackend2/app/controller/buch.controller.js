const Buch = require("../model/buch.model.js");

// Create and Save a new Member
// Create and Save a new Member
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Member
    const buch = new Buch({
        Buchname: req.body.Buchname,
        Autor: req.body.Autor,
        Inhalt: req.body.Inhalt,
        Seite: req.body.Seite,
        Note: req.body.Note
    });

    // Save Customer in the database
    Buch.create(buch, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Member."
            });
        else res.send(data);
    });
};

// Retrieve all Members from the database.
// Retrieve all Members from the database.
exports.findAll = (req, res) => {
    Buch.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving members."
            });
        else res.send(data);
    });
};

// Find a single Member with a memberId
// Find a single Member with a memberId
exports.findOne = (req, res) => {
    Buch.findById(req.params.buchId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Member with id ${req.params.buchId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Member with id " + req.params.buchId
                });
            }
        } else res.send(data);
    });
};

// Update a Member identified by the memberId in the request
// Update a Member identified by the memberId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

   Buch.updateById(
        req.params.buchId,
        new Buch(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Member with id ${req.params.buchId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Member with id " + req.params.buchId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Member with the specified memberId in the request
// Delete a Member with the specified memberId in the request
exports.delete = (req, res) => {
    Buch.remove(req.params.buchId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Member with id ${req.params.buchId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Member with id " + req.params.buchId
                });
            }
        } else res.send({ message: `Member was deleted successfully!` });
    });
};

// Delete all Members from the database.
// Delete all Members from the database.
exports.deleteAll = (req, res) => {
    Buch.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all members."
            });
        else res.send({ message: `All Members were deleted successfully!` });
    });
};


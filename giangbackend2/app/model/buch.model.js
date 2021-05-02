const sql = require("./db.js");

// constructor
const Buch = function(buch) {
    this.Buchname = buch.Buchname;
    this.Autor = buch.Autor;
    this.Inhalt = buch.Inhalt;
    this.Seite = buch.Seite;
    this.Note = buch.Note;
};

Buch.create = (newBuch, result) => {
    sql.query("INSERT INTO buch SET ?", newBuch, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created buch: ", { id: res.insertId, ...newBuch });
        result(null, { id: res.insertId, ...newBuch });
    });
};

Buch.findById = (buchId, result) => {
    sql.query(`SELECT * FROM buch WHERE id = ${buchId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found buch: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Member with the id
        result({ kind: "not_found" }, null);
    });
};

Buch.getAll = result => {
    sql.query("SELECT * FROM buch", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("buch: ", res);
        result(null, res);
    });
};

Buch.updateById = (id, buch, result) => {
    sql.query(
        "UPDATE buch SET Buchname = ?, Autor = ?, Inhalt = ?, Seite = ?, Note = ? WHERE id = ?",
        [buch.Buchname, buch.Autor, buch.Inhalt,buch.Seite, buch.Note, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated buch: ", { id: id, ...buch });
            result(null, { id: id, ...buch });
        }
    );
};

Buch.remove = (id, result) => {
    sql.query("DELETE FROM buch WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Member with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted buch with id: ", id);
        result(null, res);
    });
};

Buch.removeAll = result => {
    sql.query("DELETE FROM buch", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} buch`);
        result(null, res);
    });
};

module.exports = Buch;
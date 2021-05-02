module.exports = app => {
    const buch = require("../controller/buch.controller.js");

    // Create a new Member
    app.post("/buch", buch.create);

    // GET all Members
    app.get("/buch", buch.findAll);

    // GET one single FMember with memberId
    app.get("/buch/:buchId", buch.findOne);

    // Update one Member with memberId
    app.put("/buch/:buchId", buch.update);

    // Delete the Member with memberId
    app.delete("/buch/:buchId", buch.delete);

    // Delete all members
    app.delete("/buch", buch.deleteAll);
};
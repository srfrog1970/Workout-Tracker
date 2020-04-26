router.get("/api/workouts", (req, res) => {
  db.Workout.find({}) // Collection (Table) and query type
    .sort({})
    .populate() //Set up to populate a child
    .exec() // Execute the query
    .then((dbDoc) => {
      res.json(dbDoc);
    })
    .catch((err) => {
      res.json(err);
    });
});
// https://mongoosejs.com/docs/queries.html
//https://mongoosejs.com/docs/populate.html#populate_multiple_documents
//https://mongoosejs.com/docs/api.html#query_Query-exec

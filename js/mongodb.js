const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://anam:Anam1234@cluster0.8orkxlh.mongodb.net/Cluster0?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log("failed to connect");
  });

const LogInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("Collection1", LogInSchema);

module.exports = collection;

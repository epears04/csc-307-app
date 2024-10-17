import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose.connect("mongodb://localhost:27017/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

const getNewID = () => {
  return Math.floor(Math.random() * 1000001).toString();
}

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    const success = addUser(userToAdd);
    if(success) {
      userToAdd.id = getNewID();
      res.status(201).send({
        message: "User created successfully",
        user: userToAdd
      });
    } else {
      res.status(500).send({
        message: "Failed to add user"
      });
    }
});

const deleteUser = (id) => {
  const indexToDelete = users["users_list"].findIndex(user => user.id === id);
  if (indexToDelete !== -1) {
    users["users_list"].splice(indexToDelete, 1);
    return indexToDelete;
  }
  return -1;
}

//given id deletes user associated with id
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const userIndex = deleteUser(id);
  if (userIndex >= 0) {
    res.status(200).send({
      message: "User successfully deleted",
      index: userIndex
    });
  } else {
    res.status(404).send({message: "User not found."});
  }
});

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    userModel.getUsers(name, job)
      .then((users) => {
        if(users.length === 0) {
          res.status(404).send("No user found.");
        } else {
          res.send({ users_list: users });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Could not get users");
      })
    });
    /*
    if (job !== undefined && name !== undefined) {
      let result = findUserByNameAndJob(name, job);
      if (result.length === 0) {
        res.status(404).send("Resource not found.")
      } else {
        result = { users_list: result };
        res.send(result);
      }
    } else if (job !== undefined) {
        let result = findUserByJob(job);
        if (result.length === 0) {
          res.status(404).send("Resource not found.")
        } else {
          result = { users_list: result };
          res.send(result);
        }
    } else if (name !== undefined) {
        let result = findUserByName(name);
        if (result.length === 0) {
          res.status(404).send("Resource not found.")
        } else {
          result = { users_list: result };
          res.send(result);
        }
    } else {
        res.send(users);
    }*/

app.listen(port, () => {
    console.log(
      `Example app listening at http://localhost:${port}/users`
    );
});
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
};

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
};

const findUserByJob = (job) => {
    return users["users_list"].filter(
        (user) => user["job"] === job
    );
};

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

const getNewID = (user) => {
  const newID = Math.floor(Math.random() * 1000001);
  const userIndex = users["users_list"].indexOf(user);
  users["users_list"][userIndex].id = newID.toString();
}

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    const success = addUser(userToAdd);
    getNewID(userToAdd);
    if(success) {
      res.status(201).send({
        message: "User created successfully",
        user: userToAdd
      });
    }
    else {
      res.status(500).send({
        message: "Failed to add user"
      });
    }
});

const deleteUser = (id) => {
  const indexToDelete = users["users_list"].findIndex(user => user.id === id);
  if (indexToDelete !== -1) {
    users["users_list"].splice(indexToDelete, 1);
  }
}

//given id deletes user associated with id
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  deleteUser(id);
  res.send()
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
    const job = req.query.job;
    const name = req.query.name;

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
    }
});

app.listen(port, () => {
    console.log(
      `Example app listening at http://localhost:${port}`
    );
});
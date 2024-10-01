import express from "express";

const app = express();
const port = 8000;

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

app.get("/users", (req, res) => {
    const job = req.query.job;
    if (job != undefined) {
        let result = findUserByJob(job);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});

app.listen(port, () => {
    console.log(
      `Example app listening at http://localhost:${port}`
    );
});
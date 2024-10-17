// database schema definition
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        job: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if(value.length < 2)
                    throw new Error("Invalid job, must be at least 2 characters.");
            },
        },
    },
    {collection: "users_list"}
);

const User = mongoose.model("User", UserSchema);

function getUsers(name, job) {
    let promise;
    if (name === undefined && job === undefined) {
      promise = User.find();
    } else if (name && !job) {
      promise = findUserByName(name);
    } else if (job && !name) {
      promise = findUserByJob(job);
    } else { //name and user provided
			promise = findUserByNameAndJob(name, job);
    }
    return promise; 
  }
  
  function findUserById(id) {
    return User.findById(id);
  }

  function findByIdAndDelete(id) {
    return User.findByIdAndDelete(id);
  }
  
  function addUser(user) {
    const userToAdd = new User(user);
    const promise = userToAdd.save();
    return promise;
  }

  function findUserByNameAndJob(name, job) {
    return User.find({ name: name, job: job});
  }
  
  function findUserByName(name) {
    return User.find({ name: name });
  }
  
  function findUserByJob(job) {
    return User.find({ job: job });
  }
  
  export default {
    addUser,
    getUsers,
    findUserById,
    findByIdAndDelete,
    findUserByName,
    findUserByJob,
  };
// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
	const [characters, setCharacters] = useState([]);

	function removeOneCharacter(index) {
		const charID = characters[index].id;
		deleteUser(charID)
			.then((response) => {
				if(response.status === 200) {
					return response.json();
				} else {
					throw new Error('Failed to find user');
				}
			})
			.then(() => {
				setCharacters(characters.filter((_, i) => i !== index));
			})
			.catch((error) => {
				console.log(error);
			})
	}

	function deleteUser(id) {
		const promise = fetch(`http://localhost:8000/users/${id}`, {
			method: "DELETE"
		});
		return promise;
	}

	function updateList(person) {
		postUser(person)
			.then((response) => {
				if(response.status === 201) {
					return response.json();
				} else {
					throw new Error('Failed to create user');
				}
			})
			.then((data) => setCharacters([...characters, data.user]))
			.catch((error) => {
				console.log(error);
			})
	}

	function fetchUsers() {
		const promise = fetch("http://localhost:8000/users")
		return promise;
	}

	useEffect(() => {
		fetchUsers()
			.then((res) => res.json())	//parse json into JS object, promise itself (chaining)
			.then((json) => setCharacters(json["users_list"]))
			.catch((error) => { console.log(error); });
	}, [] );

	function postUser(person) {
		const promise = fetch("http://localhost:8000/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(person),
		});
		return promise;
	}
  
	return (
	  	<div className="container">
		  <Table
			characterData={characters}
			removeCharacter={removeOneCharacter}
		  />
		  <Form handleSubmit={updateList} />
		</div>
	);
}


export default MyApp;
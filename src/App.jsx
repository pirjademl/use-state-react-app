import { useState } from "react";
import { data } from "./data/userData";
import './App.css';
import { useRef } from "react";


const App = () => {
  const [people, setPeople] = useState(data);
  const [user, setUser] = useState({
    name: '',
    email: '',
    website: ''
  });
  const userListRef = useRef(null);
  const removePerson = (id) => {
    const newPeople = people.filter((person) => person.id !== id);
    setPeople(newPeople);
  };
  const removeAllPersons = () => {
    setPeople([]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { ...user };
    setUser(newUser);
    setPeople([...people, newUser]);

  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
    userListRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (

    <>
      <div className="create-user-all-users">
        <div className="create-user-wrapper">
          <form onSubmit={handleSubmit} className="create-user-form">
            <h2 className="crt-user-heading">Create user</h2>
            <div className="user-name">
              <label htmlFor="name">Enter Name </label>
              <input onChange={handleChange} type="text" name="name" />
            </div>
            <div className="user-email">
              <label htmlFor="email">Enter Email </label>
              <input onChange={handleChange} type="email" name="email" />
            </div>
            <div className="user-website">
              <label htmlFor="website">Enter Website </label>
              <input onChange={handleChange} type="text" name="website" />
            </div>
            <button>Create User</button>
          </form>
        </div>

        <div ref={userListRef} className="wrapper">

          {people.map((user) => {
            const { id, name, email, website } = user;
            return (
              <div key={id} className="container">
                <div className="card">
                  <div className="person-wrapper">
                    <h3>{name}</h3>
                    <p>{email}</p>
                    <p>{website}</p>
                    <button onClick={() => removePerson(id)}>Remove</button>
                  </div>
                </div>

              </div>


            );
          })}
          <button style={{ marginTop: '2rem' }} onClick={removeAllPersons}>Clear All</button>
        </div>

      </div>
    </>

  );
}
export default App;
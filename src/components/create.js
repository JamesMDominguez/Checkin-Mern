import React, { useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

 
export default function Create() {
 const [form, setForm] = useState({
   first_name: "",
   last_name: "",
   time: "",
 });
 const navigate = useNavigate();
 
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();

    const newPerson = { ...form };
    newPerson.time = new Date()

   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ first_name: "", last_name: "", time: "" });
   navigate("/");
 }
 return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={form.first_name}
            onChange={(e) => updateForm({ first_name: e.target.value })}
          />

          <label>Last Name</label>
          <input
            type="text"
            value={form.last_name}
            onChange={(e) => updateForm({ last_name: e.target.value })}
            />
       <div>
         <input type="submit" value="Check-In"/>
       </div>
     </form>
     <NavLink className="nav-link" to="/">
       Record List
     </NavLink>
   </div>
 );
}
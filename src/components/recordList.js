import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Record = (props) => (
 <tr>
   <td>{props.record.first_name}</td>
   <td>{props.record.last_name}</td>
   <td>{props.record.time}</td>
   <td>{props.record._id}</td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/record/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);

 
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         key={record._id}
       />
     );
   });
 }
 
 return (
   <div>
     <h3>Record List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Last Name</th>
           <th>Time</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
     <NavLink className="nav-link" to="/create">
      Create Record
      </NavLink>
   </div>
 );
}
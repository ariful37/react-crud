import { useState,useEffect } from "react";
import http from "../http";
import { Link } from "react-router-dom";

export default function(){
    const [users,setUsers] = useState([]);
    useEffect(()=>{
        fetchAllUsers();
    },[]);
    const fetchAllUsers = ()=>{
        http.get('/users').then(res=>{
            setUsers(res.data);
        })
    }
    const deleteUser =(id)=>{
        http.get('/users').then(res=>{
            fetchAllUsers();
        })
    }
    return(
       <div>
         <div className="container">
            <div className="row">
                <div className="col-md-12">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user,index)=>(
                        <tr key={user.id}>
                        <td>{++index}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <Link className="btn btn-success" to={{ pathname:"/edit/" + user.id}}>Edit</Link>
                            <Link className="btn btn-info" to={{ pathname:"/view/" + user.id}}>View</Link>
                            <button type="button" onClick={()=>{deleteUser(user.id)}}
                            className="btn btn-danger">Delete</button>
                        </td>
                    </tr>  
                    ))}
                       
                    </tbody>
                    </table>
                </div>
            </div>
         </div>
       </div>
    )
}
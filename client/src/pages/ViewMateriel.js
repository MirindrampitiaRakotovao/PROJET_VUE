import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";


const ViewMateriel = () => {
    const [user, setUser] = useState({});

    const {num_materiel} = useParams();

    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/get/${num_materiel}`)
          .then((resp) => setUser({ ...resp.data[0]}));
    }, [num_materiel]);
    return (
        <div style={{marginTop: "150px"}}>
            <div className="card">
                <div className="card-header">
                    <p>Informations sur les matériels</p>
                </div>
                <div className="container">
                    <strong> Numéro Matériel : </strong>
                    <span>{num_materiel}</span>
                    <br />
                    <br />

                    <strong> Designation : </strong>
                    <span>{user.designation}</span>
                    <br />
                    <br />     

                    <strong> Etat : </strong>
                    <span>{user.etat}</span>
                    <br />
                    <br />         

                    <strong> Quantité : </strong>
                    <span>{user.quantite}</span>
                    <br />
                    <br />     

                    <Link to="/">
                        <div className="btn btn-edit"> Retour </div>
                    </Link>   
                </div>
            </div>
            
        </div>
    )
}

export default ViewMateriel;



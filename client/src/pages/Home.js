import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [mauvaisQuantity, setMauvaisQuantity] = useState(0);
  const [bonQuantity, setBonQuantity] = useState(0);
  const [abimeQuantity, setAbimeQuantity] = useState(0);

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get");
      setData(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Une erreur s'est produite lors du chargement des données.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    calculateQuantities();
  }, [data]);

  const calculateQuantities = () => {
    let total = 0;
    let mauvais = 0;
    let bon = 0;
    let abime = 0;

    data.forEach((item) => {
      total += item.quantite;
      if (item.etat === "Mauvais") {
        mauvais += item.quantite;
      } else if (item.etat === "Bon") {
        bon += item.quantite;
      } else if (item.etat === "Abîmé") {
        abime += item.quantite;
      }
    });

    setTotalQuantity(total);
    setMauvaisQuantity(mauvais);
    setBonQuantity(bon);
    setAbimeQuantity(abime);
  };

  const deleteContact = (num_materiel) => {
    if (window.confirm("Voulez-vous vraiment effacer ce matériel ?")) {
      axios.delete(`http://localhost:5000/api/remove/${num_materiel}`);
      toast.success("Matériel supprimé avec succès");
      setTimeout(() => loadData(), 500);
    }
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <h1> Home </h1>
      <h3 style={{ fontWeight: "normal" }}>
        Bienvenue sur notre application de gestion de matériel !
      </h3>
      <Link to="/addContact">
        <button className="btn btn-contact">Ajouter du matériel</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>N°</th>
            <th style={{ textAlign: "center" }}>Numéro Matériel</th>
            <th style={{ textAlign: "center" }}>Désignation</th>
            <th style={{ textAlign: "center" }}>État</th>
            <th style={{ textAlign: "center" }}>Quantité</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.num_materiel}>
                <td>{index + 1}</td>
                <td>{item.num_materiel}</td>
                <td>{item.designation}</td>
                <td>{item.etat}</td>
                <td>{item.quantite}</td>
                <td>
                  <Link to={`/update/${item.num_materiel}`}>
                    <button className="btn btn-edit">Modifier</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteContact(item.num_materiel)}
                  >
                    Supprimer
                  </button>
                  <Link to={`/view/${item.num_materiel}`}>
                    <button className="btn btn-view">Afficher</button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Aucune donnée disponible</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total :</td>
            <td>{totalQuantity}</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="4">Mauvais :</td>
            <td>{mauvaisQuantity}</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="4">Bon :</td>
            <td>{bonQuantity}</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="4">Abîmé :</td>
            <td>{abimeQuantity}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Home;



import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const EditMateriel = () => {
  const [materiel, setMateriel] = useState({
    num_materiel: "",
    designation: "",
    etat: "",
    quantite: ""
  });

  const navigate = useNavigate();

  const { num_materiel } = useParams();

  useEffect(() => {
    if (num_materiel) {
      axios
        .get(`http://localhost:5000/api/get/${num_materiel}`)
        .then((resp) => setMateriel({ ...resp.data[0] }))
        .catch((error) => {
          console.log(error);
          toast.error("Erreur lors de la récupération des données.");
        });
    }
  }, [num_materiel]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!materiel.num_materiel || !materiel.designation || !materiel.etat || !materiel.quantite) {
      toast.error("S'il vous plaît, entrez des valeurs dans les champs");
    } else {
      axios
        .put(`http://localhost:5000/api/update/${num_materiel}`, materiel)
        .then(() => {
          toast.success("Matériel modifié avec succès");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Erreur lors de la modification du matériel.");
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMateriel((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="num_materiel">Numero du matériel: </label>
        <input
          type="text"
          id="num_materiel"
          name="num_materiel"
          value={materiel.num_materiel}
          placeholder="Entrez le numéro du matériel...."
          onChange={handleInputChange}
        />

        <br />
        <label htmlFor="designation">Désignation du matériel : </label>
        <input
          type="text"
          id="designation"
          name="designation"
          value={materiel.designation}
          placeholder="Entrez la désignation du matériel ...."
          onChange={handleInputChange}
        />

        <br />
        <label htmlFor="etat">Etat du matériel: </label>
        <select
          id="etat"
          name="etat"
          value={materiel.etat}
          onChange={handleInputChange}
        >
          <option value="">Sélectionnez l'état</option>
          <option value="Bon">Bon</option>
          <option value="Mauvais">Mauvais</option>
          <option value="Abîmé">Abîmé</option>
        </select>

        <br />
        <label htmlFor="quantite">Quantité du matériel: </label>
        <input
          type="number"
          id="quantite"
          name="quantite"
          value={materiel.quantite}
          placeholder="Entrez la quantité du matériel ...."
          onChange={handleInputChange}
        />
        <input
          type="submit"
          value="Modifier"
        />
        <Link to="/">
          <input type="button" value="Retour" />
        </Link>
      </form>
    </div>
  );
};

export default EditMateriel;


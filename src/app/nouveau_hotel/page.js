"use client";  // Ajoutez cette ligne en haut du fichier

import Link from 'next/link';
import { useState } from 'react';
import { FaArrowLeftLong, FaCamera } from "react-icons/fa6";

const NouveauHotel = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    price_per_night: '',
    currency: 'USD',
    photo: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, photo: files[0] }); 
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    // Validation des données du formulaire
    if (!formData.name) {
      alert('Le champ "Nom" est obligatoire');
      return;
    }
    if (!formData.email || !isValidEmail(formData.email)) {
      alert('L\'adresse e-mail est invalide');
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('price_per_night', formData.price_per_night);
    formDataToSend.append('currency', formData.currency);
    if (formData.photo) {
      formDataToSend.append('photo', formData.photo);
    }
  
    try {
      const response = await fetch('https://redhoteldjango.onrender.com/api/hotels/', {
        method: 'POST',
        body: formDataToSend
      });
  
      if (response.ok) {
        alert('Hôtel ajouté avec succès');
      } else {
        const errorData = await response.json();
        console.error('Erreur:', errorData);
        alert(`Erreur: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
    }
  };
  
  // Fonction pour valider une adresse e-mail
  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" >
      <div className="row gutters w-100">
        <div className="col-xl-8 col-lg-10 col-md-12 col-sm-12 mx-auto">
          <div className="card h-100 shadow-sm" style={{ padding: '35px' }}>
            <div className="card-body">
              <div className="row gutters">
                <div className="col-12">
                  <Link href="/hotels" style={{ textDecoration: 'none', color: 'black' }}>
                    <h6 className="mb-3" style={{ textTransform: 'uppercase', fontSize: 12 }}>
                      <FaArrowLeftLong style={{ marginRight: 10 }} />
                      Créer un nouveau hôtel
                    </h6>
                  </Link>
                </div>
                <hr className='mb-4' />

                {/* Champs du formulaire */}
                <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                  <div className="form-group">
                    <label htmlFor="name" style={{ marginBottom: '0.5rem' }}>Nom de l&apos;hôtel</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Entrez le nom complet"
                      style={{ height: '40px' }}
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm -12 mb-3">
                  <div className="form-group">
                    <label htmlFor="address" style={{ marginBottom: '0.5rem' }}>Adresse</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      placeholder="Entrez l&apos;adresse"
                      style={{ height: '40px' }}
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                  <div className="form-group">
                    <label htmlFor="email" style={{ marginBottom: '0.5rem' }}>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Entrez l&apos;email"
                      style={{ height: '40px' }}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                  <div className="form-group">
                    <label htmlFor="phone" style={{ marginBottom: '0.5rem' }}>Numéro de téléphone</label>
                    <input
                      type="phone"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="Entrez votre numéro de téléphone"
                      style={{ height: '40px' }}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                  <div className="form-group">
                    <label htmlFor="pricePerNight" style={{ marginBottom: '0.5rem' }}>Prix par nuit</label>
                    <input
                      type="text"
                      className="form-control"
                      id="price_per_night"
                      name="price_per_night"
                      placeholder="Entrez votre montant"
                      style={{ height: '40px' }}
                      value={formData.price_per_night}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                  <div className="form-group">
                    <label htmlFor="currency" style={{ marginBottom: '0.5rem' }}>Devise</label>
                    <select
                      className="form-select"
                      id="currency"
                      name="currency"
                      style={{ height: '40px' }}
                      value={formData.currency}
                      onChange={handleChange}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="XOF">XOF</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Ajouter une photo */}
              <div className="row gutters mt-4">
                <div className="col-12">
                  <h6 className="mb-3">Ajouter une photo</h6>
                </div>

                <div className="col-12">
                  <div
                    className="photo-upload-container d-flex justify-content-center align-items-center"
                    style={{
                      border: "1px solid gray",
                      height: 150,
                      borderRadius: 10,
                      cursor: "pointer",
                      position: "relative"
                    }}
                  >
                    <input
                      type="file"
                      className="form-control-file"
                      id="photo"
                      name="photo"
                      onChange={handleChange}
                      style={{
                        position: "absolute",
                        opacity: 0,
                        width: "100%",
                        height: "100%",
                        cursor: "pointer"
                      }}
                    />
                    <FaCamera size={40} style={{ color: "gray" }} />
                    <span style={{ marginLeft: 10, color: "gray" }}>Cliquez pour ajouter une photo</span>
                  </div>
                </div>
              </div>

              {/* Boutons */}
              <div className="row gutters mt-3">
                <div className="col-12 text-left">
                  <button type="button" className="btn btn-secondary me-2" style={{ float: 'right' }} onClick={handleSubmit}>
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NouveauHotel;
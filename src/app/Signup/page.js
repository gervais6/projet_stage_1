"use client";  // Indique à Next.js que ce fichier doit être traité côté client

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Assurez-vous d'importer depuis 'next/navigation'
import Link from 'next/link';
import Image from 'next/image'; // Import de Image depuis next/image
import SVG from '../SVG.png'; // Assurez-vous que le chemin vers l'image est correct

import './inscrire.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Pour afficher les erreurs
  const [successMessage, setSuccessMessage] = useState(''); // Pour afficher le succès
  const [isClient, setIsClient] = useState(false); // Nouvel état pour vérifier si on est côté client
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Assurez-vous que le composant s'exécute côté client
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      setErrorMessage('Veuillez accepter les termes et la politique.');
      return;
    }

    // Créer un objet avec les données du formulaire
    const userData = { name, email, password };

    try {
      const response = await fetch('https://projet-stage-1-3.onrender.com/auth/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
              'Content-Type': 'application/json',

        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Inscription réussie !');
        setErrorMessage(''); // Réinitialiser les erreurs
        // Rediriger vers la page de login après inscription si côté client
        if (isClient) {
          setTimeout(() => {
            router.push('/Login'); // Redirection vers la page de connexion après 2 secondes
          }, 2000);
        }
      } else {
        // Si le serveur répond avec une erreur
        setErrorMessage(data.message || 'Une erreur est survenue lors de l\'inscription.');
      }
    } catch (error) {
      // Gestion des erreurs réseau ou autres
      console.error('Erreur lors de la requête:', error);
      setErrorMessage('Une erreur est survenue lors de la requête.');
    }
  };

  return (
    <div id="main-wrapper" className="container-fluid">
      <p className="text-muted text-center mt-5 mb-2" style={{ fontSize: 26, fontFamily: 'Roboto', fontWeight: 1000, lineHeight: '21.33px' }}>
        <a href="login.html" className="text-white d-flex justify-content-center align-items-center" style={{ textDecoration: 'none' }}>
          <Image src={SVG} alt="Logo RED PRODUCT" /> {/* Image importée localement */}
          <span style={{ marginLeft: '20px', marginTop: 7 }}>RED PRODUCT</span> {/* Texte aligné au centre à côté de l'image */}
        </a>
      </p>
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8"> {/* Largeur du formulaire réduite */}
          <div className="card border-0" style={{ marginTop: 50 }}>
            <div className="card-body p-0">
              <div className="row no-gutters">
                <div className="col-lg-12">
                  <div className="p-5">
                    <div className="mb-5">
                      <h3 className="h4 font-weight-bold text-theme" style={{ marginBottom: 50, fontSize: 18 }}>
                        Inscrivez-vous en tant que Admin
                      </h3>
                    </div>

                    {/* Affichage des messages d'erreur */}
                    {errorMessage && (
                      <div className="alert alert-danger" role="alert">
                        {errorMessage}
                      </div>
                    )}

                    {/* Affichage des messages de succès */}
                    {successMessage && (
                      <div className="alert alert-success" role="alert">
                        {successMessage}
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="name" style={{ color: '#9E9E9E', fontSize: 16 }}>Nom</label>
                        <input
                          type="text"
                          className="form-control"
                          style={{ marginBottom: 20 }}
                          id="name"
                          aria-label="Entrez votre nom"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)} // Mise à jour de l'état
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email" style={{ color: '#9E9E9E', fontSize: 16 }}>E-mail</label>
                        <input
                          type="email"
                          className="form-control"
                          style={{ marginBottom: 20 }}
                          id="email"
                          aria-label="Entrez votre adresse e-mail"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)} // Mise à jour de l'état
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password" style={{ color: '#9E9E9E', fontSize: 16 }}>Mot de passe</label>
                        <input
                          type="password"
                          className="form-control"
                          style={{ marginBottom: 50 }}
                          id="password"
                          aria-label="Entrez votre mot de passe"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)} // Mise à jour de l'état
                        />
                      </div>
                      <div className="form-group form-check mb-4">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          style={{
                            marginBottom: 50,
                            border: '3px solid #9E9E9E', // Couleur de la bordure
                            width: '20px',
                            height: '20px',
                          }}
                          id="rememberMe"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)} // Mise à jour de l'état
                        />
                        <label
                          className="form-check-label"
                          htmlFor="rememberMe"
                          style={{
                            fontSize: '18px', // Augmenter la taille de la police
                            color: '#212529', // Couleur originale
                            marginLeft: 10,
                          }}
                        >
                          Accepter les termes et la politique
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-theme btn-block"
                        style={{
                          backgroundColor: '#45484B',
                          fontFamily: 'Roboto',
                          fontSize: '21.33px',
                          fontWeight: 500,
                          lineHeight: '26.67px',
                          textAlign: 'center',
                        }}
                      >
                        S'inscrire 
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-muted text-center mt-4 mb-3" style={{ fontSize: 20 }}>
            <Link href="/Login" className="text-white ml-1" style={{ textDecoration: 'none' }}>
            Vous avez déjà un compte?
            </Link> <Link href="/Login" style={{textDecoration:"none"}}><span className="forgot-password">Se connecter</span> </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

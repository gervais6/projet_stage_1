"use client"; // Indique à Next.js que ce fichier doit être traité côté client

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import de Image depuis next/image
import { useRouter } from 'next/navigation'; // Importer useRouter pour rediriger l'utilisateur après la connexion
import SVG from '../SVG.png'; // Assurez-vous que le chemin vers l'image est correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import de FontAwesome
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import des icônes d'œil

import './connecte.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Pour afficher les erreurs
  const [successMessage, setSuccessMessage] = useState(''); // Pour afficher le succès
  const [showPassword, setShowPassword] = useState(false); // État pour gérer la visibilité du mot de passe
  const router = useRouter(); // Pour rediriger après connexion réussie

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Créer un objet avec les données du formulaire
    const loginData = { email, password };

    try {
      const response = await fetch('https://projet-stage-1-3.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Connexion réussie !');
        setErrorMessage(''); // Réinitialiser les erreurs

        // Rediriger l'utilisateur vers une autre page après la connexion (par exemple, le tableau de bord)
        setTimeout(() => {
          router.push('/dashboard'); // Redirection vers la page dashboard après 2 secondes
        }, 2000);
      } else {
        // Si le serveur répond avec une erreur
        setErrorMessage(data.message || 'Erreur de connexion.');
      }
    } catch (error) {
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
                        Connectez-vous en tant que Admin
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
                        <label htmlFor="exampleInputEmail1" style={{ color: '#9E9E9E', fontSize: 16 }}>E-mail</label>
                        <input
                          type="email"
                          className="form-control"
                          style={{ marginBottom: 20 }}
                          id="exampleInputEmail1"
                          aria-label="Entrez votre adresse e-mail"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)} // Mettre à jour l'état email
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1" style={{ color: '#9E9E9E', fontSize: 16 }}>Mot de passe</label>
                        <div className="input-group">
                          <input
                            type={showPassword ? 'text' : 'password'} // Bascule entre 'text' et 'password'
                            className="form-control"
                            style={{ marginBottom: 20 }}
                            id="exampleInputPassword1"
                            aria-label="Entrez votre mot de passe"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Mettre à jour l'état password
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text"
                              style={{ cursor: 'pointer' }}
                              onClick={() => setShowPassword(!showPassword)} // Bascule la visibilité
                            >
                              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}
                               style={{ fontSize: '31px' }}  /> {/* Icône de visibilité */}
                            </span>
                          </div>
                        </div>
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
                          Gardez-moi connecté
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
                        Se connecter
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-muted text-center mt-4 mb-3" style={{ fontSize: 20 }}>
            <Link href="/mdp" style={{ textDecoration: 'none' }}>
              <span className="forgot-password">Mot de passe oublié ?</span><br /><br />
            </Link>
            <Link href="/Signup" className="text-white ml-1" style={{ textDecoration: 'none' }}>
              Vous n'avez pas de compte?
            </Link> <Link href="/Signup"  style={{textDecoration:"none"}}><span className="forgot-password">S'inscrire</span> </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;


"use client";  // Indique à Next.js que ce fichier doit être traité côté client

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SVG from '../SVG.png'; // Assurez-vous que le chemin vers l'image est correct

import './mdpo.css';

const Mdp = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div id="main-wrapper" className="container-fluid">
      <p className="text-muted text-center mt-5 mb-2" style={{ fontSize: 26, fontFamily: 'Roboto', fontWeight: 1000, lineHeight: '21.33px' }}>
        <Link href="login.html" legacyBehavior>
          <a className="text-white d-flex justify-content-center align-items-center" style={{ textDecoration: 'none' }}>
            <Image src={SVG} alt="Logo RED PRODUCT" /> {/* Image importée localement */}
            <span style={{ marginLeft: '20px', marginTop: 7 }}>RED PRODUCT</span>
          </a>
        </Link>
      </p>
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8 col-10"> {/* Largeur ajustée pour différents écrans */}
          <div className="card border-0" style={{ marginTop: 50 }}>
            <div className="card-body p-0">
              <div className="row no-gutters">
                <div className="col-12">
                  <div className="p-5">
                    <div className="mb-5">
                      <h3 className="h4 font-weight-bold text-theme" style={{ marginBottom: 30, fontSize: 18 }}>
                        Mot de passe oublié?
                      </h3>
                      <p style={{ color: '#000000DE' }}>
                        Entrez votre adresse e-mail ci-dessous et nous vous enverrons des instructions sur comment modifier votre mot de passe.
                      </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1" style={{ color: '#9E9E9E', fontSize: 16 }}>Votre e-mail</label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-label="Entrez votre adresse e-mail"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
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
                        Envoyer
                      </button>
                    </form>
                    {message && <p className="mt-3 text-center">{message}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-muted text-center mt-4 mb-3" style={{ fontSize: 20 }}>
            <Link href="login.html" legacyBehavior>
              <a className="text-white ml-1" style={{ textDecoration: 'none' }}>
                Revenir à la
              </a>
            </Link> <span className="forgot-password mb-5">Connexion</span>
          </p>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

        </div>
      </div>
    </div>
  );
};

export default Mdp;

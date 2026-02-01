// "use client";
// import React from "react";
// import Link from "next/link";
// export default function Register() {
//   return (
//     <div
//       className="modal modalCentered fade form-sign-in modal-part-content"
//       id="register"
//     >
//       <div className="modal-dialog modal-dialog-centered">
//         <div className="modal-content">
//           <div className="header">
//             <div className="demo-title">Register</div>
//             <span
//               className="icon-close icon-close-popup"
//               data-bs-dismiss="modal"
//             />
//           </div>
//           <div className="tf-login-form">
//             <form onSubmit={(e) => e.preventDefault()} className="">
//               <div className="tf-field style-1">
//                 <input
//                   className="tf-field-input tf-input"
//                   placeholder=" "
//                   type="text"
//                   required
//                   name=""
//                 />
//                 <label className="tf-field-label" htmlFor="">
//                   First name
//                 </label>
//               </div>
//               <div className="tf-field style-1">
//                 <input
//                   className="tf-field-input tf-input"
//                   placeholder=" "
//                   type="text"
//                   required
//                   name=""
//                 />
//                 <label className="tf-field-label" htmlFor="">
//                   Last name
//                 </label>
//               </div>
//               <div className="tf-field style-1">
//                 <input
//                   className="tf-field-input tf-input"
//                   placeholder=" "
//                   type="email"
//                   autoComplete="abc@xyz.com"
//                   required
//                   name=""
//                 />
//                 <label className="tf-field-label" htmlFor="">
//                   Email *
//                 </label>
//               </div>
//               <div className="tf-field style-1">
//                 <input
//                   className="tf-field-input tf-input"
//                   placeholder=" "
//                   type="password"
//                   required
//                   name=""
//                   autoComplete="current-password"
//                 />
//                 <label className="tf-field-label" htmlFor="">
//                   Password *
//                 </label>
//               </div>
//               <div className="bottom">
//                 <div className="w-100">
//                   <Link
//                     href={`/register`}
//                     className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
//                   >
//                     <span>Register</span>
//                   </Link>
//                 </div>
//                 <div className="w-100">
//                   <a
//                     href="#login"
//                     data-bs-toggle="modal"
//                     className="btn-link fw-6 w-100 link"
//                   >
//                     Already have an account? Log in here
//                     <i className="icon icon-arrow1-top-left" />
//                   </a>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import React, { useState } from "react";
// import { registerUser } from "@/src/lib/auth";
// import { useContextElement } from "@/context/Context";

// export default function Register() {
//   const { setUser } = useContextElement();

//   const [first, setFirst] = useState("");
//   const [last, setLast] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [password2, setPassword2] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const closeModal = () => {
//     try {
//       const bootstrap = require("bootstrap");
//       const el = document.getElementById("register");
//       const modal = bootstrap.Modal.getInstance(el);
//       modal?.hide();
//     } catch {}
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (password !== password2) {
//       setError("Password and Confirm Password must match.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const name = `${first} ${last}`.trim();
//       const json = await registerUser({
//         name,
//         email,
//         password,
//         password_confirmation: password2,
//       });

//       setUser(json.user);
//       closeModal();
//     } catch (err) {
//       setError(err?.message || "Register failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modal modalCentered fade form-sign-in modal-part-content" id="register">
//       <div className="modal-dialog modal-dialog-centered">
//         <div className="modal-content">
//           <div className="header">
//             <div className="demo-title">Register</div>
//             <span className="icon-close icon-close-popup" data-bs-dismiss="modal" />
//           </div>

//           <div className="tf-login-form">
//             <form onSubmit={submit}>
//               {error ? (
//                 <div style={{ color: "red", paddingBottom: 10 }}>{error}</div>
//               ) : null}

//               <div className="tf-field style-1">
//                 <input className="tf-field-input tf-input" placeholder=" " type="text" required value={first} onChange={(e) => setFirst(e.target.value)} />
//                 <label className="tf-field-label">First name</label>
//               </div>

//               <div className="tf-field style-1">
//                 <input className="tf-field-input tf-input" placeholder=" " type="text" required value={last} onChange={(e) => setLast(e.target.value)} />
//                 <label className="tf-field-label">Last name</label>
//               </div>

//               <div className="tf-field style-1">
//                 <input className="tf-field-input tf-input" placeholder=" " type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
//                 <label className="tf-field-label">Email *</label>
//               </div>

//               <div className="tf-field style-1">
//                 <input className="tf-field-input tf-input" placeholder=" " type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
//                 <label className="tf-field-label">Password *</label>
//               </div>

//               <div className="tf-field style-1">
//                 <input className="tf-field-input tf-input" placeholder=" " type="password" required value={password2} onChange={(e) => setPassword2(e.target.value)} />
//                 <label className="tf-field-label">Confirm Password *</label>
//               </div>

//               <div className="bottom">
//                 <div className="w-100">
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
//                   >
//                     <span>{loading ? "Registering..." : "Register"}</span>
//                   </button>
//                 </div>

//                 <div className="w-100">
//                   <a href="#login" data-bs-toggle="modal" className="btn-link fw-6 w-100 link">
//                     Already have an account? Log in here <i className="icon icon-arrow1-top-left" />
//                   </a>
//                 </div>
//               </div>
//             </form>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

'use client';
import React, { useState } from 'react';
import { apiRegister } from '@/src/lib/api';

export default function Register() {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const closeModal = () => {
    try {
      const bootstrap = require('bootstrap');
      const el = document.getElementById('register');
      if (!el) return;

      let instance = bootstrap.Modal.getInstance(el);
      if (!instance) instance = new bootstrap.Modal(el);

      instance.hide();
    } catch {}
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== password2) {
      setError('Password and Confirm Password must match.');
      return;
    }

    setLoading(true);

    try {
      const name = `${first} ${last}`.trim();

      const { user, token } = await apiRegister({
        name,
        email,
        password,
        password_confirmation: password2,
      });

      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));

      // ✅ Notify header (and any component) that auth changed
      window.dispatchEvent(new Event('auth:changed'));

      closeModal();
    } catch (err) {
      setError(err?.message || 'Register failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal modalCentered fade form-sign-in modal-part-content"
      id="register"
      tabIndex={-1}
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="demo-title">Register</div>
            <span className="icon-close icon-close-popup" data-bs-dismiss="modal" />
          </div>

          <div className="tf-login-form">
            <form onSubmit={submit}>
              {error ? <div style={{ color: 'red', paddingBottom: 10 }}>{error}</div> : null}

              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  required
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                  autoComplete="given-name"
                />
                <label className="tf-field-label">First name</label>
              </div>

              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  required
                  value={last}
                  onChange={(e) => setLast(e.target.value)}
                  autoComplete="family-name"
                />
                <label className="tf-field-label">Last name</label>
              </div>

              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <label className="tf-field-label">Email *</label>
              </div>

              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <label className="tf-field-label">Password *</label>
              </div>

              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="password"
                  required
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  autoComplete="new-password"
                />
                <label className="tf-field-label">Confirm Password *</label>
              </div>

              <div className="bottom">
                <div className="w-100">
                  <button
                    type="submit"
                    disabled={loading}
                    className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center">
                    <span>{loading ? 'Registering...' : 'Register'}</span>
                  </button>
                </div>

                <div className="w-100">
                  <a href="#login" data-bs-toggle="modal" className="btn-link fw-6 w-100 link">
                    Already have an account? Log in here <i className="icon icon-arrow1-top-left" />
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

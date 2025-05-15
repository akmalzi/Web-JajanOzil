import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginsubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      console.log("hahah");
      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", "true"); // ✅ tambahkan ini
        console.log("Login successful:", response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Error during login:", error);
      if (error.response && error.response.status === 401) {
        alert("Email atau password salah!");
      } else {
        alert("Terjadi kesalahan saat login.");
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f6e9b2" }}
    >
      <div
        className="card shadow-sm p-4"
        style={{ width: "100%", maxWidth: "380px", borderRadius: "16px" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#9e2a2b" }}>
            Dompet<span style={{ fontWeight: "normal" }}>Ozil.</span>
          </h2>
          <p className="text-muted small">Kelola Keuangan Lebih Mudah!</p>
        </div>
        <form onSubmit={handleLoginsubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-danger fw-semibold">
              Login
            </button>
          </div>
        </form>
        <p className="mt-3 text-center small">
          Belum punya akun?{" "}
          <a href="/signup" className="text-decoration-none text-danger">
            Daftar sekarang
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;

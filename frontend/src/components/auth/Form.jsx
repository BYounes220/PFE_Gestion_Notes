import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import LoadingIndicator from "./LoadingIndicator";
import { jwtDecode } from "jwt-decode";
import authBackground from "../../assets/Authbackground.jpg";
import logoESTM from "../../assets/LOGO_EST.png";

function Form({ route, method }) {
  const [user_id, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { user_id, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        
        // Redirection basée sur le rôle
        const decoded = jwtDecode(res.data.access);
        const roleRoutes = {
          student: "/student",
          teacher: "/teacher",
          staff: "/admin"
        };
        navigate(roleRoutes[decoded.role] || "/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert("Identifiants invalides");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background avec effets */}
      <div className="absolute inset-0">
        <img
          src={authBackground}
          alt="background"
          className="w-full h-full object-cover"
        />
        {/* Overlay amélioré */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600/40 via-orange-400/30 to-yellow-400/40 backdrop-blur-sm"></div>
      </div>

      {/* Conteneur du formulaire optimisé */}
      <div className="bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl overflow-hidden w-full max-w-[380px] relative z-10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-500 ease-in-out m-4">
        <div className="p-6 sm:p-8">
          {/* Logo ESTM avec taille optimisée */}
          <div className="flex justify-center mb-8">
            <img src={logoESTM} alt="ESTM Logo" className="h-20 w-auto transform hover:scale-105 transition-transform duration-300" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col justify-center space-y-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent text-center">
              {name}
            </h1>
            <p className="text-center text-gray-600 text-sm">
              Bienvenue ! Veuillez saisir vos informations pour vous connecter.
            </p>
            
            <div className="space-y-4">
              <input
                className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 focus:outline-none transition-all duration-300 hover:border-gray-300"
                type="text"
                value={user_id}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <input
                className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 focus:outline-none transition-all duration-300 hover:border-gray-300"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-sky-400 via-orange-400 to-yellow-300 text-white py-4 rounded-2xl font-semibold hover:bg-gradient-to-r hover:from-sky-500 hover:via-orange-500 hover:to-yellow-300 ${loading ? 'opacity-80' : 'hover:scale-[1.02]'}`}>
              {loading ? <LoadingIndicator /> : name}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
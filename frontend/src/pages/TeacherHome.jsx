import { motion, AnimatePresence } from "framer-motion";
import GradesHeader from "../components/Grades/GradesHeader";
import teacherLogo from "../assets/teacher.png";
import { useState } from "react";
import fourSqLogo from "../assets/fourSquares.png";
import GroupPfeLogo from "../assets/user.png";
import briefCaseLogo from "../assets/briefcase.png";
import clipBoardLogo from "../assets/clipboard.png";
import { useNavigate } from "react-router-dom";

// Updated animation variants for vertical entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const slideUpVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15
    }
  }
};

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.6
    }
  })
};

function TeacherHome() {
  const [btnClicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setClicked(true);
  };

  const StatisticCard = ({ logo, Title, Num }) => {
    return (
      <motion.div
        className="bg-white lg:w-[400px] lg:h-[150px] md:w-[317px] rounded-lg shadow-xl p-6"
        variants={slideUpVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div>
          <img
            src={logo}
            alt="four squares logo"
            className="w-7 h-7 mb-2"
          />
          <p className="font-semibold mb-2 text-lg">{Title}</p>
          <p className="font-semibold text-3xl">{Num}</p>
        </div>
      </motion.div>
    );
  };

  const GateCard = ({ logo, Title, Subtext, bg, func }) => {
    return (
      <motion.div
        className={`${bg} lg:w-[400px] lg:h-[210px] md:w-[317px] rounded-lg shadow-xl p-6`}
        variants={slideUpVariants}
        onClick={func}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="mt-3">
          <img
            src={logo}
            alt="four squares logo"
            className="w-7 h-7 mb-2 ml-auto mr-auto"
          />
          <p className="font-semibold mb-2 text-center text-xl text-white">
            {Title}
          </p>
          <p className="text-center text-white ">{Subtext}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      {!btnClicked ? (
        <motion.div
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col gap-6 justify-center bg-gray-50 items-center"
        >
          <GradesHeader />
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="flex flex-col gap-2 p-8 lg:w-11/12 mb-10 w-10/12 h-[700px] sm:h-[500px] bg-gradient-to-r from-yellow-400 via-blue-500 to-orange-500 rounded-lg shadow-2xl"
          >
            <motion.div
              className="w-full h-1/3"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={teacherLogo}
                alt="teacherLogo"
                className="m-auto w-32 h-32 rounded-full border-4 border-white shadow-md"
              />
            </motion.div>
            <motion.p
              className="font-bold text-white text-center text-2xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Bienvenue, Professeur ! Votre portail académique vous attend
            </motion.p>
            <motion.p
              className="text-center text-white lg:w-2/3 ml-auto mr-auto text-lg"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              En tant que professeur, vous avez accès à des outils complets pour
              gérer vos responsabilités académiques. Vous pouvez superviser les
              projets des étudiants, gérer les notes et suivre les stages, le
              tout en un seul endroit. Notre plateforme simplifie vos tâches
              administratives pour que vous puissiez vous concentrer sur ce qui
              compte le plus : l'enseignement.
            </motion.p>
            <motion.button
              className="rounded-3xl bg-white w-[226px] h-[50px] m-auto font-semibold text-blue-600 shadow-md"
              onClick={handleClick}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continuez vers les services
            </motion.button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col gap-6 items-center w-screen min-h-screen bg-gray-50"
        >
          <GradesHeader />
          <motion.div
            className="flex flex-col justify-center gap-6 w-screen"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Statistics Cards */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center w-screen min-h-40 pl-4 pr-4 cursor-pointer"
              variants={containerVariants}
            >
              {[fourSqLogo, GroupPfeLogo, briefCaseLogo].map((logo, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={slideUpVariants}
                  className="flex-1"
                >
                  <StatisticCard
                    logo={logo}
                    Title={[
                      "Matières enseignées",
                      "PFE supervisés",
                      "Stages supervisés"
                    ][i]}
                    Num={[4, 4, 8][i]}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Gate Cards */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center w-screen min-h-56 pl-4 pr-4 cursor-pointer"
              variants={containerVariants}
            >
              {[clipBoardLogo, GroupPfeLogo, briefCaseLogo].map((logo, i) => (
                <motion.div
                  key={i}
                  variants={slideUpVariants}
                  className="flex-1"
                >
                  <GateCard
                    logo={logo}
                    Title={["Notes", "PFE", "Stage"][i]}
                    Subtext={[
                      "Gérer et mettre à jour les notes des étudiants pour vos matières",
                      "Voir et attribuer les sujets des groupes",
                      "Suivre l'avancement des stages des étudiants et leurs rapports"
                    ][i]}
                    bg={[
                      "bg-gradient-to-r from-yellow-400 to-orange-500",
                      "bg-gradient-to-r from-green-400 to-green-700",
                      "bg-gradient-to-r from-blue-400 to-blue-700"
                    ][i]}
                    func={i === 0 ? () => navigate("/professors/grades") : undefined}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TeacherHome;
import { useEffect, useState, useMemo } from "react";

import LandingPage from "./views/LandingPage";
import Auth from "./views/Auth";

import OAuthSuccess from "./views/OAuthSuccess";


import Dashboard from "./views/Dashboard";
import CareerRoadmap from "./views/CareerRoadmap";
import TodoList from "./views/TodoList";
import Progress from "./views/Progress";
import Profile from "./views/Profile";
import Report from "./views/Report";

import ArtsDetails from "./views/ArtsDetails";
import CommerceDetails from "./views/CommerceDetails";
import ScienceDetails from "./views/ScienceDetails";
import LawDetails from "./views/LawDetails";
import AllStreamsDetails from "./views/AllStreamsDetails";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const STORAGE_KEY = "edupath_ai_data";

const DEFAULT_PROFILE = {
  fullName: "",
  age: "",
  city: "",
  careerGoal: "Private IT",
  interests: [],
  onboarded: false,
};

export default function App() {
  const [view, setView] = useState("landing");
  const [user, setUser] = useState(DEFAULT_PROFILE);
  const [tasks, setTasks] = useState([]);

  /* ================= LOAD ================= */
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      // If OAuth token exists → switch to oauth view
      if (token) {
        setView("oauth");
        return;
      }

      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const data = JSON.parse(saved);

      setUser(data.user || DEFAULT_PROFILE);
      setTasks(data.tasks || []);

      if (data.user?.onboarded) {
        setView("dashboard");
      }

    } catch (error) {
      console.error("Corrupted storage. Resetting...");
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  /* ================= SAVE ================= */
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ user, tasks })
    );
  }, [user, tasks]);

  /* ================= ROUTING ================= */

  const views = useMemo(
    () => ({

      landing: (
        <LandingPage onStart={() => setView("onboarding")} />
      ),

      onboarding: (
        <Auth
          onComplete={(profile) => {
            setUser({ ...profile, onboarded: true });
            setView("dashboard");
          }}
        />
      ),

      oauth: (
        <OAuthSuccess
          setUser={setUser}
          setView={setView}
        />
      ),

      dashboard: <Dashboard user={user} />,

      roadmap: (
        <CareerRoadmap
          goal={user.careerGoal}
          setView={setView}
        />
      ),

      todo: <TodoList tasks={tasks} setTasks={setTasks} />,

      progress: <Progress tasks={tasks} />,

      profile: <Profile user={user} setUser={setUser} />,

      report: <Report user={user} tasks={tasks} />,

      arts: <ArtsDetails onBack={() => setView("roadmap")} />,

      commerce: (
        <CommerceDetails onBack={() => setView("roadmap")} />
      ),

      science: (
        <ScienceDetails onBack={() => setView("roadmap")} />
      ),

      law: <LawDetails onBack={() => setView("roadmap")} />,

      all: (
        <AllStreamsDetails onBack={() => setView("roadmap")} />
      ),

    }),
    [user, tasks]
  );

  /* ================= NAV VISIBILITY ================= */

  const showNav = !["landing", "onboarding", "oauth"].includes(view);

  return (
    <div className="h-screen flex overflow-hidden">

      {showNav && (
        <Sidebar currentView={view} setView={setView} />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">

        {showNav && <Header user={user} />}

        <main className="flex-1 overflow-y-auto p-6 fade-in">
          {views[view] || views.landing}
        </main>

      </div>
    </div>
  );
}

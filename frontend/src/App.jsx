import { useEffect, useState } from "react";

import LandingPage from "./views/LandingPage";
import Auth from "./views/Auth";
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

  /* LOAD */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      setUser(data.user || DEFAULT_PROFILE);
      setTasks(data.tasks || []);
      if (data.user?.onboarded) setView("dashboard");
    }
  }, []);

  /* SAVE */
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ user, tasks })
    );
  }, [user, tasks]);

  const renderView = () => {
    switch (view) {
      case "landing":
        return <LandingPage onStart={() => setView("onboarding")} />;

      case "onboarding":
        return (
          <Auth
            onComplete={(profile) => {
              setUser({ ...profile, onboarded: true });
              setView("dashboard");
            }}
          />
        );

      case "dashboard":
        return <Dashboard user={user} />;

      case "roadmap":
        return (
          <CareerRoadmap
            goal={user.careerGoal}
            setView={setView}
          />
        );

      case "todo":
        return <TodoList tasks={tasks} setTasks={setTasks} />;

      case "progress":
        return <Progress tasks={tasks} />;

      case "profile":
        return <Profile user={user} setUser={setUser} />;

      case "report":
        return <Report user={user} tasks={tasks} />;

      case "arts":
        return <ArtsDetails onBack={() => setView("roadmap")} />;

      case "commerce":
        return <CommerceDetails onBack={() => setView("roadmap")} />;

      case "science":
        return <ScienceDetails onBack={() => setView("roadmap")} />;

      case "law":
        return <LawDetails onBack={() => setView("roadmap")} />;

      case "all":
        return <AllStreamsDetails onBack={() => setView("roadmap")} />;

      default:
        return <LandingPage onStart={() => setView("onboarding")} />;
    }
  };

  const showNav = view !== "landing" && view !== "onboarding";

  return (
    /* ✅ SINGLE HEIGHT + NO BODY SCROLL */
    <div className="h-screen bg-slate-950 flex overflow-hidden">
      {showNav && <Sidebar currentView={view} setView={setView} />}

      <div className="flex-1 flex flex-col overflow-hidden">
        {showNav && <Header user={user} />}

        {/* ✅ ONLY THIS SCROLLS */}
        <main className="flex-1 overflow-y-auto p-6 fade-in">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

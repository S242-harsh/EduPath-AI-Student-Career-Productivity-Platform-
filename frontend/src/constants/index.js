import {
  LayoutDashboard,
  Map,
  CheckSquare,
  TrendingUp,
  User,
  FileText
} from "lucide-react";

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "roadmap", label: "Career Path", icon: <Map size={18} /> },
  { id: "todo", label: "Todo", icon: <CheckSquare size={18} /> },
  { id: "progress", label: "Progress", icon: <TrendingUp size={18} /> },
  { id: "report", label: "Report", icon: <FileText size={18} /> },
  { id: "profile", label: "Profile", icon: <User size={18} /> }
];

export const CAREER_ROADMAPS = {
  "Private IT": [
    "Learn DSA basics",
    "Build React projects",
    "Prepare for interviews",
    "Apply for jobs"
  ],
  "Govt Job": [
    "Aptitude & reasoning",
    "Current affairs",
    "Mock tests"
  ],
  "Higher Studies": [
    "Exam preparation",
    "Strong fundamentals",
    "University research"
  ],
  "Business": [
    "Idea validation",
    "MVP development",
    "Networking"
  ]
};

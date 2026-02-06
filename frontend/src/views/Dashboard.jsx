import React, { useReducer, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Circle,
  Play,
  Pause,
  Plus,
  Trash2,
  Brain,
} from "lucide-react";

/* ===================== CONSTANT ===================== */
const POMODORO_TIME = 25 * 60;

/* ===================== REDUCER ===================== */
function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload;

    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          {
            id: crypto.randomUUID(),
            text: action.text,
            time: action.time || "Today",
            completed: false,
            focusTime: 0,
          },
          ...state.tasks,
        ],
      };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, completed: !t.completed } : t
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.id),
      };

    case "START_FOCUS":
      return {
        ...state,
        focus: {
          taskId: action.id,
          seconds: POMODORO_TIME,
          running: true,
        },
      };

    case "TICK":
      return {
        ...state,
        focus: {
          ...state.focus,
          seconds: Math.max(0, state.focus.seconds - 1),
        },
      };

    case "STOP_FOCUS":
      return { ...state, focus: null };

    case "SAVE_FOCUS":
      if (!state.focus) return state;

      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === state.focus.taskId
            ? { ...t, focusTime: t.focusTime + POMODORO_TIME }
            : t
        ),
        focus: null,
      };

    default:
      return state;
  }
}

/* ===================== COMPONENT ===================== */
export default function Dashboard({ user }) {
  const [state, dispatch] = useReducer(reducer, {
    tasks: [],
    focus: null,
  });

  const [text, setText] = useState("");
  const [time, setTime] = useState("");

  /* ---------- Load / Save ---------- */
  useEffect(() => {
    const saved = localStorage.getItem("dashboard");
    if (saved) dispatch({ type: "INIT", payload: JSON.parse(saved) });
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboard", JSON.stringify(state));
  }, [state]);

  /* ---------- Timer ---------- */
  useEffect(() => {
    if (!state.focus?.running) return;

    const timer = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.focus]);

  useEffect(() => {
    if (state.focus?.seconds === 0) {
      dispatch({ type: "SAVE_FOCUS" });
    }
  }, [state.focus?.seconds]);

  /* ---------- Derived ---------- */
  const completed = useMemo(
    () => state.tasks.filter((t) => t.completed).length,
    [state.tasks]
  );

  const percent = state.tasks.length
    ? Math.round((completed / state.tasks.length) * 100)
    : 0;

  const totalFocus = useMemo(
    () => Math.round(state.tasks.reduce((a, b) => a + b.focusTime, 0) / 60),
    [state.tasks]
  );

  const focusTask = state.tasks.find(
    (t) => t.id === state.focus?.taskId
  );

  /* ===================== UI ===================== */
  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* HEADER */}
      <header className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {user?.fullName || "Student"}
          </h1>
          <p className="text-emerald-500">Discipline creates freedom.</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-400">Total Focus</p>
          <p className="text-2xl font-bold text-orange-500">
            {totalFocus} min
          </p>
        </div>
      </header>

      {/* PROGRESS */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div className="flex justify-between mb-2">
          <span>Daily Progress</span>
          <span className="text-emerald-500 font-bold">{percent}%</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full">
          <div
            className="h-full bg-emerald-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* GRID */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* TASK LIST */}
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-xl font-bold mb-4">Daily Tasks</h3>

          <div className="flex gap-3 mb-6">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Task name"
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3"
            />
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Time"
              className="w-28 bg-slate-950 border border-slate-700 rounded-xl px-3"
            />
            <button
              onClick={() => {
                if (!text) return;
                dispatch({ type: "ADD_TASK", text, time });
                setText("");
                setTime("");
              }}
              className="bg-emerald-500 px-4 rounded-xl text-slate-950 font-bold"
            >
              <Plus />
            </button>
          </div>

          <div className="space-y-3">
            {state.tasks.map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800"
              >
                <div
                  onClick={() =>
                    dispatch({ type: "TOGGLE_TASK", id: t.id })
                  }
                  className="flex items-center gap-3 cursor-pointer"
                >
                  {t.completed ? (
                    <CheckCircle2 className="text-emerald-500" />
                  ) : (
                    <Circle className="text-slate-500" />
                  )}

                  <div>
                    <p className={t.completed ? "line-through text-slate-500" : ""}>
                      {t.text}
                    </p>
                    <p className="text-xs text-slate-500">
                      Focus: {Math.round(t.focusTime / 60)} min
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  {!t.completed && (
                    <button
                      onClick={() =>
                        dispatch({ type: "START_FOCUS", id: t.id })
                      }
                      className="text-emerald-500"
                    >
                      <Play size={18} />
                    </button>
                  )}
                  <button
                    onClick={() =>
                      dispatch({ type: "DELETE_TASK", id: t.id })
                    }
                    className="text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOCUS PANEL */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
          <p className="text-xs uppercase font-bold text-emerald-400 mb-2">
            Focus Engine
          </p>

          {focusTask ? (
            <>
              <h3 className="text-xl font-bold mb-4">{focusTask.text}</h3>
              <p className="text-4xl font-mono mb-6">
                {Math.floor(state.focus.seconds / 60)}:
                {String(state.focus.seconds % 60).padStart(2, "0")}
              </p>

              <button
                onClick={() => dispatch({ type: "STOP_FOCUS" })}
                className="bg-emerald-500 text-slate-950 px-6 py-3 rounded-xl font-bold flex gap-2"
              >
                <Pause /> Stop
              </button>
            </>
          ) : (
            <div className="text-slate-400">
              <Brain className="mb-3" />
              Pick a task to start a focus session.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

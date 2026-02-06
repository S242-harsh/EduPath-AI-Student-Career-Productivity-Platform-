import React, { useReducer, useEffect, useMemo, useState } from "react";
import { Plus, Trash2, Check, Edit2 } from "lucide-react";

/* ===================== REDUCER ===================== */

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];

    case "TOGGLE":
      return state.map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed } : t
      );

    case "DELETE":
      return state.filter((t) => t.id !== action.id);

    case "EDIT":
      return state.map((t) =>
        t.id === action.id ? { ...t, text: action.text } : t
      );

    default:
      return state;
  }
}

/* ===================== COMPONENT ===================== */

export default function TodoList({ tasks, setTasks }) {
  const [state, dispatch] = useReducer(reducer, tasks || []);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  /* ---------- Persist to parent & localStorage ---------- */
  useEffect(() => {
    setTasks(state);
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state, setTasks]);

  /* ---------- Derived values ---------- */
  const completedCount = useMemo(
    () => state.filter((t) => t.completed).length,
    [state]
  );

  const filteredTasks = useMemo(() => {
    if (filter === "active") return state.filter((t) => !t.completed);
    if (filter === "completed") return state.filter((t) => t.completed);
    return state;
  }, [state, filter]);

  /* ---------- Handlers ---------- */
  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch({
      type: "ADD",
      payload: {
        id: crypto.randomUUID(),
        text,
        completed: false,
        time: new Date().toLocaleString(),
      },
    });

    setText("");
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-10">

      {/* ================= HEADER ================= */}
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold">Today's Tasks</h2>
          <p className="text-slate-400 mt-1">
            Focus on what matters most today.
          </p>
        </div>

        <div className="text-right">
          <p className="text-4xl font-bold text-emerald-500">
            {completedCount}/{state.length}
          </p>
          <p className="text-xs text-slate-500 uppercase font-bold">
            Completed
          </p>
        </div>
      </header>

      {/* ================= INPUT ================= */}
      <form onSubmit={addTask} className="relative">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-5 pr-20 text-lg focus:outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-3 rounded-xl transition"
        >
          <Plus size={22} />
        </button>
      </form>

      {/* ================= FILTERS ================= */}
      <div className="flex gap-3">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition
              ${
                filter === f
                  ? "bg-emerald-500 text-slate-950"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ================= TASK LIST ================= */}
      <div className="space-y-4">
        {filteredTasks.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            No tasks here.
          </div>
        )}

        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
}

/* ===================== TASK ITEM ===================== */

function TaskItem({ task, dispatch }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.text);

  const saveEdit = () => {
    if (!value.trim()) return;
    dispatch({ type: "EDIT", id: task.id, text: value });
    setEditing(false);
  };

  return (
    <div
      className={`flex justify-between items-center p-5 rounded-2xl border transition
        ${
          task.completed
            ? "bg-emerald-500/5 border-emerald-500/20 opacity-70"
            : "bg-slate-900 border-slate-800 hover:border-emerald-500/30"
        }`}
    >
      <div className="flex items-center gap-5 flex-1">
        <button
          onClick={() => dispatch({ type: "TOGGLE", id: task.id })}
          className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center
            ${
              task.completed
                ? "bg-emerald-500 border-emerald-500"
                : "border-slate-700"
            }`}
        >
          {task.completed && <Check size={18} className="text-slate-950" />}
        </button>

        <div className="flex-1">
          {editing ? (
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={(e) => e.key === "Enter" && saveEdit()}
              className="w-full bg-transparent border-b border-emerald-500 focus:outline-none"
              autoFocus
            />
          ) : (
            <p
              className={`text-lg font-medium ${
                task.completed
                  ? "line-through text-slate-500"
                  : "text-slate-200"
              }`}
            >
              {task.text}
            </p>
          )}
          <p className="text-xs text-slate-500">{task.time}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setEditing(true)}
          className="p-3 text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition"
        >
          <Edit2 size={18} />
        </button>

        <button
          onClick={() => dispatch({ type: "DELETE", id: task.id })}
          className="p-3 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

const STORAGE_KEY = "edupath_ai_data";

export default function OAuthSuccess({ setUser, setView }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    const processOAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        setView("landing");
        return;
      }

      try {
        // 1️⃣ Save JWT token
        localStorage.setItem("token", token);

        // 2️⃣ Fetch real user from backend
        const response = await fetch("http://localhost:5000/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Unable to fetch user");
        }

        const userData = await response.json();

        const updatedUser = {
          fullName: userData.fullName,
          email: userData.email,
          age: "",
          city: "",
          careerGoal: "Private IT",
          interests: [],
          onboarded: true,
        };

        // 3️⃣ Save inside main storage
        const savedData = localStorage.getItem(STORAGE_KEY);
        const parsedData = savedData ? JSON.parse(savedData) : {};

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...parsedData,
            user: updatedUser,
            tasks: parsedData.tasks || [],
          })
        );

        // 4️⃣ Update React state
        setUser(updatedUser);

        // 5️⃣ Remove token from URL
        window.history.replaceState({}, document.title, "/");

        // 6️⃣ Redirect to dashboard
        setView("dashboard");

      } catch (err) {
        console.error("OAuth Error:", err);
        setError("Authentication failed. Please try again.");
        setView("landing");
      }
    };

    processOAuth();
  }, [setUser, setView]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <>
            <h2 className="text-xl font-semibold">Logging you in...</h2>
            <p className="text-sm text-gray-400 mt-2">
              Please wait while we verify your account
            </p>
          </>
        )}
      </div>
    </div>
  );
}

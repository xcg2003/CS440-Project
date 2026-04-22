document.getElementById("signupForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const errorEl = document.getElementById("error");

    try {
        const res = await fetch("/api/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();

        if (!res.ok) {
            errorEl.textContent = data.error || "Signup failed.";
            return;
        }

        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", data.username);
        window.location.href = "/";
    } catch (err) {
        errorEl.textContent = "Could not connect to server.";
    }
});

// ✅ This acts as a proxy between frontend and backend

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ✅ Automatically choose correct backend URL
    const backendUrl =
      process.env.NODE_ENV === "production"
        ? "https://influitivezone.com"
        : "http://localhost:3001";

    // ✅ Forward the request to backend
    const response = await fetch(`${backendUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Chat API proxy error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
}

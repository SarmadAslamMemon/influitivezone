// pages/api/chat.js (Next.js API route to proxy chat requests to backend)

export default async function handler(req, res) {
  // ✅ Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ✅ FIX 1: Use correct production backend URL (instead of localhost)
    // We prioritize an environment variable (for flexibility)
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "https://influitivezone.com";

    // ✅ Forward the request to your backend Express API
    const response = await fetch(`${backendUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body), // send the body exactly as received
    });

    // ✅ Parse backend response
    const data = await response.json();

    // ✅ Forward the response to the frontend
    res.status(response.status).json(data);
  } catch (error) {
    console.error("❌ API proxy error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
}

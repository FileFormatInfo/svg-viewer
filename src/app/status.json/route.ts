export async function GET(request: Request) {
  const data = {
    success: true,
    commit: process.env.COMMIT || "local",
    lastmod: process.env.LASTMOD || new Date().toISOString(),
    timestamp: new Date().toISOString(),
  };

  return Response.json({ data });
}

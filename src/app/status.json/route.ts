export async function GET(request: Request) {
  const data = {
    success: true,
    timestamp: new Date().toISOString(),
  };

  return Response.json({ data });
}

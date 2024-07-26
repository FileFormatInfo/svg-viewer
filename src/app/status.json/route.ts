export const dynamic = "force-dynamic";
export const revalidate = 0;

const bootTime = new Date().toISOString();

export async function GET(request: Request) {
  const data = {
    success: true,
    commit: process.env.COMMIT || "local",
    lastmod: process.env.LASTMOD || bootTime,
    timestamp: new Date().toISOString(),
    boot: bootTime,
  };

  return Response.json({ data });
}

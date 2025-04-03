export const runtime = "edge"; 

export async function GET(request: Request) {
  // @ts-ignore - 
  const country = request.geo?.country || "your place";

  const countryNames: Record<string, string> = {
    VN: "Vietnam 🇻🇳",
    AU: "Australia 🇦🇺",
    US: "United States 🇺🇸",
    SG: "Singapore 🇸🇬",
  };

  const name = countryNames[country] || country;
  return new Response(`Hello from ${name}!`, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { email, password } = data;

  try {
    const res = await fetch(`${process.env.BACKEND_API_BASE_URL}/api/v1/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const resError = await res.json();
      throw new Error(resError.errors);
    }

    return new NextResponse(JSON.stringify({ message: "Success" }), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(
    );
  }
}

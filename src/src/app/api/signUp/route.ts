import { NextRequest, NextResponse } from "next/server";
import { validationRegistSchema } from "@@/src/validationSchema";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { email, password } = data;

  const validationResult = await validationRegistSchema.safeParseAsync(data);

  if (!validationResult.success) {
    const errors = validationResult.error.flatten().fieldErrors;
    return new NextResponse(JSON.stringify({ errors }), { status: 400 });
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_BASE_URL}/api/v1/sign_up`, {
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

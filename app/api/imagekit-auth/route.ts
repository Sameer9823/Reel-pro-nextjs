import ImageKit from "imagekit";
import { NextResponse, NextRequest } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function GET() {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    return NextResponse.json(authenticationParameters);
  } catch (error) {
    return NextResponse.json(
      { error: "failed to get authentication parameters" },
      { status: 500 }
    );
  }
}

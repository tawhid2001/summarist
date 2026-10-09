import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { priceId, planId, uid } = await request.json();

    if (!priceId || !uid) {
      return NextResponse.json(
        { error: "Price ID and user ID are required" },
        { status: 400 }
      );
    }

    const origin = request.headers.get("origin");

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      metadata: {
        firebaseUid: uid,
        planId,
      },

       subscription_data: {
        ...(planId === "yearly"
          ? {
              trial_period_days: 7,
            }
          : {}),

          metadata: {
          firebaseUid: uid,
          planId,
        },
      },

      success_url: `${origin}/for-you?checkout=success`,

      cancel_url: `${origin}/choose-plan?checkout=cancelled`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}
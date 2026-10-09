import Stripe from "stripe";
import { NextResponse } from "next/server";
import { adminDb } from "@/firebase/firebaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature error:", error);

    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const uid = session.metadata?.firebaseUid;

        if (!uid) break;

        await adminDb.collection("users").doc(uid).set(
          {
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
            subscriptionPlan: session.metadata?.planId ?? null,
          },
          { merge: true }
        );

        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;

        const uid = subscription.metadata?.firebaseUid;

        if (!uid) break;

        await adminDb.collection("users").doc(uid).set(
          {
            subscriptionStatus: subscription.status,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer,
            subscriptionPlan: subscription.metadata?.planId ?? null,
          },
          { merge: true }
        );

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        const uid = subscription.metadata?.firebaseUid;

        if (!uid) break;

        await adminDb.collection("users").doc(uid).set(
          {
            subscriptionStatus: "canceled",
          },
          { merge: true }
        );

        break;
      }
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error("Webhook handling error:", error);

    return NextResponse.json(
      { error: "Webhook handling failed" },
      { status: 500 }
    );
  }
}
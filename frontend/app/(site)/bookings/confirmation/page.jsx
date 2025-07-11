import React, { Suspense } from "react";
import BookingConfirmationClient from "./BookingConfirmationClient";

export default function page() {
  return (
    <Suspense fallback={<div>Chargement more...</div>}>
      <BookingConfirmationClient />
    </Suspense>
  );
}
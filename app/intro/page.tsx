import type { Metadata } from "next";
import { Splash } from "@/components/Splash";

export const metadata: Metadata = {
  title: "Intro",
  robots: { index: false },
};

/** The Gibble logo animation on its own, ending on the finished logo. */
export default function IntroPage() {
  return <Splash mode="intro" />;
}

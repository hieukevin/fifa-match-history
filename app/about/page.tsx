"use client";
import { AnimatedText } from "@/components/animatedText";
import React from "react";

function Page() {
  return (
    <main className="flex flex-col items-center relative z-10">
      <h1 className="lg:text-4xl sm:text-4xl text-xl sm:mb-4 mb-2">About</h1>
      <AnimatedText
        el="p"
        text={[
          `This website delves into the thrilling saga of FIFA match-ups between myself and my friend, Kuba. It serves as a digital coliseum where our battles are immortalized, showcasing not just the scores but the intricate statistics that unveil the true narrative behind each clash. The inception of this platform stems from a pivotal moment when Kuba claimed victory over me, albeit through what some might call a stroke of luck. Yet, beneath the surface, the numbers revealed a different tale – one where skill and strategy were the true victors. Determined to capture the essence of our rivalry and ensure that the truth prevailed, I embarked on the journey to construct this virtual arena. Now, our matches stand as testaments to perseverance, skill, and the undying quest to settle the age-old debate: who truly reigns supreme on the digital pitch.`,
        ]}
        className="text-center sm:w-1/2 text-2xl sm:bg-black rounded-lg px-12 py-8 sm:bg-opacity-50"
        repeatDelay={500}
      />
    </main>
  );
}

export default Page;

"use client";
import { AnimatedText } from "@/components/animatedText";
import PageHeader from "@/components/pageHeader";
import React from "react";

function Page() {
  return (
    <main className="z-10">
      <PageHeader title="About" />
      <div className="flex items-center h-fit justify-center">
      <AnimatedText
        el="h2"
        text='This website delves into the thrilling saga of FIFA match-ups between myself and my friend, Kuba. It serves as a digital coliseum where our battles are immortalized, showcasing not just the scores but the intricate statistics that unveil the true narrative behind each clash. The inception of this platform stems from a pivotal moment when Kuba claimed victory over me, albeit through what some might call a stroke of luck. Yet, beneath the surface, the numbers revealed a different tale – one where skill and strategy were the true victors. Determined to capture the essence of our rivalry and ensure that the truth prevailed, I embarked on the journey to construct this virtual arena. Now, our matches stand as testaments to perseverance, skill, and the undying quest to settle the age-old debate: who truly reigns supreme on the digital pitch.'
        className=" sm:w-1/2 text-2xl sm:bg-black rounded-lg px-12 py-8 sm:bg-opacity-80"
        />
        </div>
    </main>
  );
}

export default Page;

import mobile from "@/public/messironaldomobile.jpg";
import Image from "next/image";
function HeroVideo() {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 -z-10" />
      <div className="min-[564px]:block hidden">
        <video
          loop
          muted
          autoPlay
          className="fixed w-screen h-screen object-cover -z-20"
        >
          <source src="/cinegraph_animation_16-9.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="sm:hidden block">
        <Image
          src={mobile}
          alt="phone"
          className="fixed w-screen h-screen object-cover"
        />
      </div>
    </>
  );
}

export default HeroVideo;

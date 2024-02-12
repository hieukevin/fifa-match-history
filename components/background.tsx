import React from 'react'

function HeroVideo() {
  return (
    <>
    <div className="fixed inset-0 bg-black opacity-50 -z-0"/> 

    <video loop muted autoPlay className="fixed w-screen h-screen object-cover -z-10 ">

        <source src="/cinegraph_animation_16-9.mp4" type="video/mp4" />
    </video>
    
    </>
  )
}

export default HeroVideo
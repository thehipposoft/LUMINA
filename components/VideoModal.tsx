import React from 'react'

interface VideoModal {
    openModal: boolean,
    videoUrl?: string,
    toggleModal: () => void;
}

const VideoModal = ({openModal, videoUrl, toggleModal}:VideoModal) => {

  return (
    <div className={`${openModal ? 'block' : 'hidden'} fixed top-0 left-0 w-screen h-screen z-[99] bg-black/90 flex justify-center items-center`}>
        <button
          className="absolute top-8 right-12 z-[99] text-white hover:bg-white/10 duration-300 bg-white/25 cursor-pointer rounded-full w-12 h-12 "
          onClick={toggleModal}
          aria-label="Cerrar"
        >
          ✕
        </button>
        <iframe
            title="vimeo-player"
            src="https://player.vimeo.com/video/1140176277?h=5c37d91adf"
            width="900"
            height="520"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
        >
        </iframe>
    </div>
  )
}

export default VideoModal

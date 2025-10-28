import React from 'react'

interface VideoModal {
    openModal: boolean,
    videoUrl: string,
    toggleModal: () => void;
}

const VideoModal = ({openModal, videoUrl, toggleModal}:VideoModal) => {

  return (
    <div className={`${openModal ? 'block' : 'hidden'} fixed top-0 left-0 w-screen h-screen z-50 bg-black/90 flex justify-center items-center`}>
        <button
          className="absolute top-8 right-12 z-60 text-white hover:bg-white/10 duration-300 bg-white/25 cursor-pointer rounded-full w-12 h-12 "
          onClick={toggleModal}
          aria-label="Cerrar"
        >
          ✕
        </button>
        <video
            src={videoUrl}
            className='w-[80vw] h-[80vh]'
            autoPlay
            controls
            muted
            playsInline
        />
    </div>
  )
}

export default VideoModal
import { useEffect, useRef, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';

type StartParams = { x: number; y: number; width: number; height: number };

type PhotoModalProps = {
  mount: boolean;
  photoSrc?: string;
  startParams?: StartParams;
  onClose?: () => void;
};

export default function PhotoModal({
  mount,
  photoSrc,
  startParams,
  onClose,
}: PhotoModalProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  const [transition, setTransition] = useState(false);
  const [secondTransition, setSecondTransition] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    });
  }, []);

  useEffect(() => {
    if (startParams) {
      if (mount) {
        requestAnimationFrame(() => {
          if (imageRef.current) {
            imageRef.current.style.borderRadius = '8px'
            imageRef.current.style.top = `${startParams.y}px`;
            imageRef.current.style.left = `${startParams.x}px`;
            imageRef.current.style.width = `${startParams.width}px`;
            imageRef.current.style.height = `${startParams.height}px`;

            setTimeout(() => {
              setTransition(true);
              if (imageRef.current) {
                const imageWidth = window.screen.width * 0.6;
                const imageHeight = (imageWidth * 8) / 16;

                const left = (window.screen.width - imageWidth) / 2;
                const top = (window.screen.height - imageHeight) / 2;

                imageRef.current.style.top = `${top}px`;
                imageRef.current.style.left = `${left}px`;
                imageRef.current.style.width = `${imageWidth}px`;
                imageRef.current.style.height = `${imageHeight}px`;
              }

              setTimeout(() => setSecondTransition(true), 300);
            }, 0);
          }
        });
      }

      if (!mount && imageRef.current) {
        setSecondTransition(false);
        imageRef.current.style.top = `${startParams.y}px`;
        imageRef.current.style.left = `${startParams.x}px`;
        imageRef.current.style.width = `${startParams.width}px`;
        imageRef.current.style.height = `${startParams.height}px`;

        setTimeout(() => {
          setTransition(false);
        }, 300);
      }
    }
  }, [mount]);

  if (!mount && !transition) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 bg-white duration-300 flex items-center justify-center transition-all left-0 w-full h-screen ${
        transition && mount ? 'bg-opacity-100' : 'bg-opacity-0'
      }`}
    >
      <button
        onClick={onClose}
        className={`absolute cursor-pointer left-4 top-4 transition-all flex items-center gap-2 ${
          secondTransition ? 'translate-x-0' : '-translate-x-40'
        }`}
      >
        <IoMdArrowBack /> Назад
      </button>
      <img
        ref={imageRef}
        src={photoSrc}
        className='absolute duration-300 transition-all z-10 object-cover'
      />
    </div>
  );
}

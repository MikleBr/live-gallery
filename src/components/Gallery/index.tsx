import { useState } from 'react';
import PhotoModal from '../PhotoModal';

type GalleryProps = {
  photos: string[];
};

type OpenedPhotoParams = {
  photoSrc?: string;
  startParams?: { x: number; y: number; width: number; height: number };
};

export function Gallery({ photos }: GalleryProps) {
  const [photoOpen, setPhotoOpen] = useState<boolean>(false);
  const [openedPhoto, setOpenedPhoto] = useState<OpenedPhotoParams | null>(
    null
  );
  const onClickPhoto =
    (src: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      const { currentTarget } = e;
      const { x, y, width, height } = currentTarget.getBoundingClientRect();
      setPhotoOpen(true);
      setOpenedPhoto({
        photoSrc: src,
        startParams: {
          x,
          y,
          width,
          height,
        },
      });
    };

  const photoColumns = photos.reduce<[string[], string[], string[]]>(
    (acc, current, index) => {
      console.log(acc);

      if (index % 3 === 1) {
        acc[0].push(current);
      }

      if (index % 3 === 2) {
        acc[1].push(current);
      }

      if (index % 3 === 0) {
        acc[2].push(current);
      }

      return acc
    },
    [[], [], []]
  );

  console.log(photoColumns);

  return (
    <>
      <div className={`w-full grid gap-1 grid-cols-3 transition-all max-w-5xl`}>
        {photoColumns.map((column, index) => (
          <div key={index} className='flex flex-col gap-1'>
            {column.map((photo, _index) => (
              <img
                key={_index}
                onClick={onClickPhoto(photo)}
                src={photo}
                className='select-none overflow-hidden rounded-lg'
              />
            ))}
          </div>
        ))}
      </div>

      <PhotoModal
        mount={photoOpen}
        photoSrc={openedPhoto?.photoSrc}
        startParams={openedPhoto?.startParams}
        onClose={() => setPhotoOpen(false)}
      />
    </>
  );
}

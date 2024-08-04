import Image from "next/image";
import ZoomImage from "./ZoomImage";

const ImageGrid = ({
  images,
  reverse = false,
  separate = false,
}: {
  images: string[];
  reverse?: boolean;
  separate?: boolean;
}) => {
  return (
    <div className="grid grid-cols-4 hover:opacity-90 duration-100 gap-y-2 mt-8 gap-x-2">
      {!reverse && !separate ? (
        <>
          <TWOcols src={images[0]} />
          <OneCol images={images} />
        </>
      ) : separate ? (
        <OneCol separate={true} images={images} />
      ) : (
        <>
          <OneCol images={images} />
          <TWOcols src={images[0]} />
        </>
      )}
    </div>
  );
};
const TWOcols = ({ src }: { src: string }) => {
  return (
    <ZoomImage
      src={src}
      btn={
        <div className="relative cursor-pointer hover:opacity-90 duration-100 w-full col-span-2 row-span-1">
          <Image src={src} alt="image" width={500} height={250} className="object-cover w-full h-full" />
        </div>
      }
    />
  );
};
const OneCol = ({ images, separate = false }: { images: string[]; separate?: boolean }) => {
  return separate ? (
    <>
      {images.slice(1, images.length).map((src, index) => (
        <ZoomImage
          key={index}
          src={src}
          btn={
            <div key={index} className="relative hover:opacity-90 duration-100 cursor-pointer  row-span-1">
              <Image src={src} alt="image" width={250} height={250} className="object-cover row-span-1 w-full h-full" />
            </div>
          }
        />
      ))}
    </>
  ) : (
    <div className={`${separate ? " col-span-full" : "grid-cols-2 col-span-2 grid "}  gap-2 gap-x-2 `}>
      {images.slice(1, images.length).map((src, index) => (
        <ZoomImage
          key={index}
          src={src}
          btn={
            <div className="relative cursor-pointer hover:opacity-90 duration-100 row-span-1">
              <Image src={src} alt="image" width={250} height={250} className="object-cover row-span-1 w-full h-full" />
            </div>
          }
        />
      ))}
    </div>
  );
};

export default ImageGrid;

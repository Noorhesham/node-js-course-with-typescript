import Card from "../Card";

type ReviewCardProps = {
  name: string;
  avatar: string;
  review: string;
  images?: string[];
  rating?: number;
};

const ReviewCard = ({ name, avatar, review, images = [], rating = 5 }: ReviewCardProps) => {
  return (
    <Card className="p-4 my-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <img src={avatar} alt={`${name} avatar`} className="w-10 h-10 rounded-full object-cover" />
          <h5 className="text-sm">{name}</h5>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(rating)].map((_, i) => (
            <span key={i}>⭐</span>
          ))}
        </div>
      </div>

      <div className="mr-12">
        <p className="text-sm text-muted-foreground leading-relaxed">{review}</p>
        {images.length > 0 && (
          <div className="flex gap-2 mt-2">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`review image ${i + 1}`}
                className="w-12 h-12 rounded-xl object-cover bg-gray-200"
              />
            ))}
          </div>
        )}
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
          <span>5M</span>
          <span className=" cursor-pointer">يحب</span>
          <span className=" cursor-pointer">يرد</span>
        </div>
      </div>
    </Card>
  );
};

export default ReviewCard;

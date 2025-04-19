import MotionItem from "../MotionItem";
import Starrating from "./Rate";
import { Progress } from "../ui/progress";

type ReviewSummaryProps = {
  reviews_counts: Record<string, number>;
  review_count: number;
  review_rate: number;
};

const ReviewSummary = ({ reviews_counts, review_count, review_rate }: ReviewSummaryProps) => {
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between items-start gap-8">
      {/* Rating summary */}
      <div className="flex flex-col w-full lg:w-auto items-center bg-gray-100  rounded-xl p-4 justify-center min-w-[120px]">
        <span className="text-6xl ">{review_rate.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">من {review_count} مراجعة</span>
        <Starrating className="mt-2" MaxRating={5} defaultRating={4} change={false} size={30} />
      </div>

      {/* Star distribution */}
      <div className="flex flex-col mt-2 gap-4 flex-grow lg:w-auto flex-[100% ] w-full lg:flex-[50%]">
        {Object.keys(reviews_counts).map((key: any, i: number) => (
          <div className="font-medium flex items-center gap-6" key={key}>
            <p className="text-nowrap ml-10">{key}</p>
            <MotionItem
              nohover
              viewport={{ once: true }}
              initial={{ width: 0, opacity: 0 }}
              whileInView={{
                width: "100%",
                opacity: 1,
                transition: {
                  duration: 0.5,
                  ease: "easeInOut",
                  stiffness: 100,
                  type: "spring",
                  delay: 0.2 * i,
                },
              }}
            >
              <Progress color="#FCAB30" value={(reviews_counts[key] / review_count) * 100} />
            </MotionItem>
            <p className="basis-[3rem] flex-grow">{reviews_counts[key]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSummary;

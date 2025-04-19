import { Truck, Package, Clock, Shield } from "lucide-react";

const features = [
  {
    icon: "/delivery-truck-svgrepo-com (1) 1.svg",
    title: "التسليم في: 3-7 أيام عمل الشحن والإرجاع",
  },
  {
    icon: "/Delivery Truck.svg",
    title: "شحن مجاني عالميًا لجميع الطلبات التي تزيد قيمتها عن 100 دولار",
  },
  {
    icon: "/SVGRepo_iconCarrier.svg",
    title: "تسليم من ايد لايد",
  },
  {
    icon: "/Delivery Truck.svg",
    title: "شحن مجاني عالميًا لجميع الطلبات التي تزيد قيمتها عن 100 دولار",
  },
];

interface FeaturesProps {
  isabic?: boolean;
}

const Features: React.FC<FeaturesProps> = () => {
  return (
    <div className="bg-white ">
      <div className="  ml-auto my-3">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 lg:p-6 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="  bg-[#F5F5F5] p-2 rounded-xl">
                <img className=" w-8" src={feature.icon} alt="" />
              </div>
              <div className={`flex flex-col text-right`}>
                <h3 className=" font-semibold text-sm text-gray-900">{feature.title}</h3>
                <p className="text-sm text-[#B9B9B9]">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;

import { motion } from "framer-motion";

const images = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jPg1FHgb2C5IGES1jT8jionTU3w0Kt.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jPg1FHgb2C5IGES1jT8jionTU3w0Kt.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jPg1FHgb2C5IGES1jT8jionTU3w0Kt.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jPg1FHgb2C5IGES1jT8jionTU3w0Kt.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jPg1FHgb2C5IGES1jT8jionTU3w0Kt.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jPg1FHgb2C5IGES1jT8jionTU3w0Kt.png",
];

export default function Images() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="aspect-video rounded-[32px] overflow-hidden group"
        >
          <img
            src={image || "/placeholder.svg"}
            alt={`Gallery Image ${index + 1}`}
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

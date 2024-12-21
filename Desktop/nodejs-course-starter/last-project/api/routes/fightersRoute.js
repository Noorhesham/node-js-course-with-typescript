import express from "express";
//  base:/fighters
const router = express.Router();
router.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});
export const fightersRoute = router;

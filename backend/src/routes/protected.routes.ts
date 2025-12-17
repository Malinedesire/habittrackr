import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { AuthRequest } from "../types/auth";

const router = Router();

router.get("/me", authenticateToken, (req: AuthRequest, res) => {
  res.json({
    message: "Protected route",
    userId: req.user?.id,
  });
});

export default router;
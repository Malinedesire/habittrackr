import express from "express";

const router = express.Router();

type BoredApiResponse = {
  activity: string;
  type: string;
};

type Challenge = {
  title: string;
  description: string;
  category: string;
};

const FALLBACK_CHALLENGES: Challenge[] = [
  {
    title: "Today's challenge",
    description: "Take a 10-minute walk and reflect on your day.",
    category: "wellbeing",
  },
  {
    title: "Today's challenge",
    description: "Spend 5 minutes planning one small goal for tomorrow.",
    category: "productivity",
  },
  {
    title: "Today's challenge",
    description: "Do one small thing today that supports a habit you’re building.",
    category: "habits",
  },
];

router.get("/challenge", async (_req, res) => {
  try {
    const response = await fetch(
      "https://bored-api.appbrewery.com/random",
    );

    if (!response.ok) {
      throw new Error("External API failed");
    }

    const data = (await response.json()) as BoredApiResponse;

    res.json({
      title: "Today's challenge",
      description: data.activity,
      category: data.type,
    });
  } catch (error) {
    console.warn("External challenge API failed, using fallback");

    const fallback =
      FALLBACK_CHALLENGES[
        Math.floor(Math.random() * FALLBACK_CHALLENGES.length)
      ];

    res.json(fallback);
  }
});

export default router;

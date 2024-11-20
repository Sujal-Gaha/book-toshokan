import { Router } from "express";
import { UserBookSubscriptionMutations } from "../controllers/userBookSubscription/mutation";
import { UserBookSubscriptionQueries } from "../controllers/userBookSubscription/query";

const router = Router();

const { getAllUserBookSubscription } = UserBookSubscriptionQueries;
router.get("/", getAllUserBookSubscription);

const { subscribeToBook, updateBookSubscription, unsubscribeToBook } =
  UserBookSubscriptionMutations;
router.post("/subscribe", subscribeToBook);
router.post("/update", updateBookSubscription);
router.post("/unsubscribe", unsubscribeToBook);

export { router as userBookSubscriptionRouter };

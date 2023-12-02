import { Router, Request, Response } from "express";
import { UserModel } from "../models/users";
import { ProductModel } from "../models/products";
import { ProductErrors, UserErrors } from "../errors";
import { verifyToken } from "./users";

const router = Router();

router.get("/", verifyToken, async (_, res: Response) => {
  try {
    const products = await ProductModel.find({});
    return res.json({ success: true, products });
  } catch (err) {
    return res.status(500).json({ type: err });
  }
});

router.post("/checkout", verifyToken, async (req: Request, res: Response) => {
  const { customerID, cartItems } = req.body;

  try {
    const user = await UserModel.findById(customerID);
    const productIDs = Object.keys(cartItems);
    const products = await ProductModel.find({ _id: { $in: productIDs } });

    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    if (products.length !== productIDs.length) {
      return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
    }

    // calculating the total price of the items in the cart
    let totalPrice = 0;

    for (const item in cartItems) {
      const product = products.find((product) => String(product._id) === item);

      if (!product) {
        return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
      }

      if (product.stockQuantity < cartItems[item]) {
        return res.status(400).json({ type: ProductErrors.NOT_ENOUGH_STOCK });
      }

      totalPrice += product.price * cartItems[item];
    }

    if (user.availableBalance < totalPrice) {
      return res.status(400).json({ type: ProductErrors.INSUFFICIENT_BALANCE });
    }
    user.availableBalance -= totalPrice;
    user.purchasedItems.push(...productIDs);

    await user.save();
    await ProductModel.updateMany(
      { _id: { $in: productIDs } },
      { $inc: { stockQuantity: -1 } }
    );

    res.json({ success: true, purchasedItems: user.purchasedItems });
  } catch (err) {
    return res.status(400).json(err);
  }
});

export { router as productsRouter };

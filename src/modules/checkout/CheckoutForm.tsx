import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/shared/ui/shadcn/button";
import { FieldGroup } from "@/shared/ui/shadcn/field";
import { useCartStore } from "../cart/cart.state";
import CheckoutField from "./CheckoutField";
import { checkoutSchema, type CheckoutValues } from "./checkout.schema";

interface CheckoutFormProps {
  onOrderPlaced: (customerName: string) => void;
}

export default function CheckoutForm({ onOrderPlaced }: CheckoutFormProps) {
  const clearCart = useCartStore((state) => state.clearCart);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    // Show an error when the user leaves a field, then update it while they fix it
    mode: "onTouched",
    defaultValues: { fullName: "", email: "", phone: "", address: "", city: "", postalCode: "" },
  });

  function placeOrder(values: CheckoutValues): void {
    clearCart();
    onOrderPlaced(values.fullName);
  }

  return (
    <form
      className="checkout-form"
      aria-label="Delivery details"
      noValidate
      onSubmit={(event) => void handleSubmit(placeOrder)(event)}
    >
      <FieldGroup>
        <CheckoutField
          id="fullName"
          label="Full name"
          autoComplete="name"
          error={errors.fullName?.message}
          registration={register("fullName")}
        />
        <CheckoutField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          registration={register("email")}
        />
        <CheckoutField
          id="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          error={errors.phone?.message}
          registration={register("phone")}
        />
        <CheckoutField
          id="address"
          label="Address"
          autoComplete="street-address"
          error={errors.address?.message}
          registration={register("address")}
        />
        <CheckoutField
          id="city"
          label="City"
          autoComplete="address-level2"
          error={errors.city?.message}
          registration={register("city")}
        />
        <CheckoutField
          id="postalCode"
          label="Postal code"
          autoComplete="postal-code"
          error={errors.postalCode?.message}
          registration={register("postalCode")}
        />
        <Button className="button" type="submit">
          Place order
        </Button>
      </FieldGroup>
    </form>
  );
}

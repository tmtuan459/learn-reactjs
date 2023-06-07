import PropTypes from "prop-types";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import QuantityField from "Components/form-controls/QuantityField";
import { useForm } from "react-hook-form";
import * as yup from "yup";

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required("Please enter quantity")
      .min(1, "Minimum value is 1")
      .typeError("Please enter a number"),
  });

  const form = useForm({
    defaultValues: {
      // cần có để handle lỗi Uncontrol
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });
  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
      {/* name ở đây phải đúng */}

      <QuantityField name="quantity" label="Quantity" form={form} />

      <Button
        type="submit"
        className="btn-submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        // disabled={isSubmitting}
      >
        ADD TO CART
      </Button>
    </form>
  );
}

export default AddToCartForm;

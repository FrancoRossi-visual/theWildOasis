import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } =
    useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate: mutateCreateNewCabin, isLoading: isCreatingCabin } =
    useMutation({
      mutationFn: createCabin,
      onSuccess: () => {
        toast.success("New cabin successfully created");
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });
        reset();
      },
      onError: (error) => toast.error(error.message),
    });

  function onSubmit(data) {
    // console.log({ ...data, image: data.image[0] });
    mutateCreateNewCabin({ ...data, image: data.image[0] });
  }

  function onError(error) {
    // console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isCreatingCabin}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label='Maximum capacity'
        error={errors?.maxCapacity?.message}
      >
        <Input
          type='number'
          id='maxCapacity'
          disabled={isCreatingCabin}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity needs to be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isCreatingCabin}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price needs to be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isCreatingCabin}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be lower than the cabin's price",
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isCreatingCabin}
          type='text'
          id='description'
          defaultValue=''
          {...register("description")}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput
          disabled={isCreatingCabin}
          id='image'
          accept='image/*'
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' size='medium' type='reset'>
          Cancel
        </Button>
        <Button
          variation='primary'
          size='medium'
          disabled={isCreatingCabin}
        >
          Add cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

/* eslint-disable react/prop-types */
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

import { useForm } from 'react-hook-form';
import useCreateCabin from './useCreateCabin';
import useEditCabin from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreatingCabin, createNewCabin } = useCreateCabin();
  const { editCabin, isEditingCabin } = useEditCabin();

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    isEditSession
      ? editCabin(
          { newCabinData: { ...data, image }, id: editId },
          {
            onSuccess: (data) => {
              console.log(data);
              reset();
              onCloseModal?.();
            },
          }
        )
      : createNewCabin(
          { ...data, image },
          {
            onSuccess: (data) => {
              console.log(data);
              reset();
              onCloseModal?.();
            },
          }
        );
  }

  const isWorking = isCreatingCabin || isEditingCabin;

  function onError(error) {
    // console.log(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity needs to be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price needs to be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              `Discount ${Number(
                value
              )} should be lower than the cabin's price ${Number(
                getValues().regularPrice
              )}`,
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors?.description?.message}>
        <Textarea
          disabled={isWorking}
          type='text'
          id='description'
          defaultValue=''
          {...register('description')}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput
          disabled={isWorking}
          id='image'
          accept='image/*'
          {...register('image', {
            required: isEditSession ? false : 'You must upload an image',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          size='medium'
          type='reset'
          onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button variation='primary' size='medium' disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

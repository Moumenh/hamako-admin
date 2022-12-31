import { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Input,
  ModalFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQueryClient  } from "react-query";

import { updateOption } from "../../Services";

import { DeleteIcon, AddIcon } from "@chakra-ui/icons";

type OptionForm = {
  name: string;
  values: { value: string }[];
};

const EditOptionModal = ({ isOpen, onClose, option }) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  const { mutateAsync, isLoading } = useMutation(updateOption, {
    onSuccess: () => {
      toast({
        title: 'Option updated.',
        description: "Option updated.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      queryClient.invalidateQueries({ queryKey: ['options-listing'] })
  }})
  const { register, control, handleSubmit, setValue } = useForm<OptionForm>();

  const { fields, remove, append, replace: setOptionValues } = useFieldArray({
    name: "values",
    control,
  });


  useEffect(() => {
    setValue("name", option.name)
    setOptionValues(option.values)
  }, [option])

  const onSubmit = async (data) => {
    await mutateAsync({ id: option.id, ...data });
    onClose()
  }

  // TODO: move all useForm methods to option context, move the form here to one component (duplicates with new), make ui componant for Modal

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{option.name} Option</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={4}>
          <Input mb="4" placeholder="Option Name" {...register("name", { required: true, minLength: 3, maxLength: 10 })} />
          {fields.map((field, index) => (
            <Box key={field.id} display="flex" gap="20px" alignItems="center" mb="4">
              <Input placeholder="value" {...register(`values.${index}.value`, { required: true })} />
              <DeleteIcon
                opacity={fields.length === 1 ? "0.5" : 1}
                color="red.500"
                boxSize={6}
                cursor="pointer"
                onClick={() => {
                  fields.length !== 1 && remove(index);
                }}
              />
              <AddIcon
                color="blue.500"
                boxSize={5}
                cursor="pointer"
                onClick={() => {
                  append({ value: "" });
                }}
              />
            </Box>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)} isLoading={isLoading}>
            Update
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditOptionModal;

import { Input, Box, Button } from "@chakra-ui/react"
import { useForm, useFieldArray } from 'react-hook-form';
import { useMutation } from "react-query";
import { DeleteIcon, AddIcon  } from "@chakra-ui/icons";

import { createOption } from "../../Services";

type OptionForm = {
  name: string;
  values: {value: string}[]
}

const NewOption = () => {
  const { mutate, data } = useMutation(createOption);
  const { register, control, handleSubmit } = useForm<OptionForm>({
    defaultValues: {
      values: [{ value: "" }],
    },
  });

  const { fields, remove, append } = useFieldArray({
    name: "values",
    control
  })

  const onSubmit = (data) => {
    console.log({data})
    mutate(data)
  }

  return (
    <Box>
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
      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </Box>
  );
}

export default NewOption
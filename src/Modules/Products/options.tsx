import { useState, useEffect } from "react";
import Select, { SingleValue } from "react-select";
import {  Box, Button, Heading, Flex } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";
import VariantForm from "./variant-form";
import { useProductForm, Combination, Option, OptionValue } from "./context/product.context";

interface OptionSelection {
  label: string;
  option: Option;
  selectedValues: OptionValue[];
  value: string;
}

interface SelectedOption {
  [key: string]: OptionSelection;
}

export const getCombinations = (options: Option[]): Combination[] => {
  if (options.length === 0) {
    return [];
  }

  if (options.length === 1) {
    // @ts-ignore
    const values = options.shift().values;
    console.log({ values });
    if (values.length > 0) {
      // return values.map((v) => [v])
      return values.map((v) => ({
        id: uuidv4(),
        options: [v],
      }));
    }

    return [];
  }

  const combinations = [];
  // @ts-ignore
  const theseValues = options.shift().values;

  const lowerCombinations = getCombinations(options);
  for (const v of theseValues) {
    for (const second of lowerCombinations) {
      const clonedSecond = { id: uuidv4(), options: [...second.options, v] };
      combinations.push(clonedSecond);
    }
  }
  return combinations;
};

const optionsData = [
  {
    id: 1,
    name: "Size",
    productId: 2,
    createdAt: "2022-12-23T16:50:55.735Z",
    updatedAt: "2022-12-23T16:50:55.735Z",
    values: [
      {
        id: 1,
        value: "Large",
        optionId: 1,
        createdAt: "2022-12-23T16:50:55.735Z",
        updatedAt: "2022-12-23T16:50:55.735Z",
      },
      {
        id: 2,
        value: "X-Large",
        optionId: 1,
        createdAt: "2022-12-23T16:50:55.735Z",
        updatedAt: "2022-12-23T16:50:55.735Z",
      },
    ],
  },
  {
    id: 2,
    name: "Color",
    productId: 2,
    createdAt: "2022-12-23T16:50:55.741Z",
    updatedAt: "2022-12-23T16:50:55.741Z",
    values: [
      {
        id: 3,
        value: "Red",
        optionId: 2,
        createdAt: "2022-12-23T16:50:55.741Z",
        updatedAt: "2022-12-23T16:50:55.741Z",
      },
      {
        id: 4,
        value: "Green",
        optionId: 2,
        createdAt: "2022-12-23T16:50:55.741Z",
        updatedAt: "2022-12-23T16:50:55.741Z",
      },
    ],
  },
  {
    id: 3,
    name: "Material",
    productId: 2,
    createdAt: "2022-12-23T16:50:55.741Z",
    updatedAt: "2022-12-23T16:50:55.741Z",
    values: [
      {
        id: 5,
        value: "Iron",
        optionId: 2,
        createdAt: "2022-12-23T16:50:55.741Z",
        updatedAt: "2022-12-23T16:50:55.741Z",
      },
      {
        id: 6,
        value: "Wood",
        optionId: 2,
        createdAt: "2022-12-23T16:50:55.741Z",
        updatedAt: "2022-12-23T16:50:55.741Z",
      },
    ],
  },
];

const Options = () => {
  const {variants, setVariants} = useProductForm()
  const [options, setOptions] = useState([{ id: uuidv4() }]);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption>({})

  const formatedOptions = optionsData
    .map((option) => ({
      label: option.name,
      value: option.name,
      option,
      selectedValues: [],
    }))
    .filter((option) => {
      const formatedSelectedOptions = Object.values(selectedOptions);
      if (formatedSelectedOptions.find((o) => o.value === option.value)) {
        // TODO: make value to be the id
        return false;
      }
      return true;
    });

  const addOption = () => {
    setOptions((prev) => [...prev, { id: uuidv4() }]);
  };

  const handleOptionSelection = (id: string, value: OptionSelection) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [id]: value,
    };
    setSelectedOptions(newSelectedOptions);
    generateVariants(newSelectedOptions);
  };

  const deleteOption = (id: string) => {
    const filteredOptions = options.filter((option) => option.id !== id);
    const { [id]: item, ...otherSelectedOptions } = selectedOptions;
    setSelectedOptions(otherSelectedOptions);
    setOptions(filteredOptions);
    generateVariants(otherSelectedOptions);
  };

  const selectValues = (id: string, values: any) => {
    const selected = selectedOptions[id];
    selected.selectedValues = values;
    const newSelectedOptions = {
      ...selectedOptions,
      [id]: selected,
    };
    setSelectedOptions(newSelectedOptions);
    generateVariants(newSelectedOptions);
  };

  const generateVariants = (newSelectedOptions: any) => {
    const variantsOptions = Object.entries(newSelectedOptions)
      .map(([key, value]: any) => ({
        id: key,
        name: value.label,
        values: value.selectedValues,
      }))
      .filter((variant) => !!variant.values.length);

    const combinations = getCombinations(variantsOptions);
    setVariants?.(combinations)
  };

  return (
    <Box mb="4">
      <Flex alignItems="center" mb="4">
        <Heading size="md" mr="6">
          Options
        </Heading>
      </Flex>
      {options.map((option) => {
        const optionsValues =
          selectedOptions[option.id] &&
          selectedOptions[option.id]?.option?.values.map((optionValue) => ({
            label: optionValue.value,
            value: optionValue.value,
            id: optionValue.id,
          }));
        return (
          <Box key={option.id}>
            <Select
              name="Option Name"
              options={formatedOptions as any}
              onChange={(value) => handleOptionSelection(option.id, value as OptionSelection)}
              value={selectedOptions[option.id]}
              isClearable={true}
              styles={{
                container: (provider) => ({
                  ...provider,
                  marginBottom: 16,
                }),
              }}
            />
            <Select
              isMulti
              name="Option Values"
              options={optionsValues}
              value={selectedOptions[option.id]?.selectedValues}
              onChange={(values) => selectValues(option.id, values)}
              styles={{
                container: (provider) => ({
                  ...provider,
                  marginBottom: 16,
                }),
              }}
            />
            <Button mb="4" onClick={() => deleteOption(option.id)} disabled={options.length === 1}>
              Delete
            </Button>
          </Box>
        );
      })}
      <Flex my="4" alignItems="center">
        <Heading size="xs" mr="6">
          Add Another Option
        </Heading>
        <AddIcon cursor="pointer" onClick={addOption} />
      </Flex>
      {variants && variants?.length > 0 &&
        variants?.map((variant: any, i: number) => (
          <VariantForm key={i} variant={variant} index={i} />
        ))}
    </Box>
  );
};

export default Options;

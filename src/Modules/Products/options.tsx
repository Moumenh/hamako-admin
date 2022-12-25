import { useState, useMemo } from "react";
import Select  from "react-select";
import {  Box, Button, Heading, Flex } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from 'react-query'

import VariantForm from "./variant-form";
import { useProductForm, OptionSelection } from "./context/product.context";

import { getOptions } from "../../Services";

import { getCombinations } from "./helpers";



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
  const { variants, setVariants, selectedOptions, setSelectedOptions } = useProductForm();
  const [options, setOptions] = useState([{ id: uuidv4() }]);

  const { data: optionsApi } = useQuery("options", getOptions)

  const formattedOptions = useMemo(() => {
    if (optionsApi?.status) {
      return optionsApi.body.map((option) => ({
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
    }
  }, [optionsApi, selectedOptions])

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
              options={formattedOptions as any}
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

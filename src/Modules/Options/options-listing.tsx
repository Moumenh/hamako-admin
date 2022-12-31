import { Button, Table, Thead, Tbody, Tr, Th, TableContainer, Box, Modal } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";

import OptionRow from "./option-row";

import { getOptions } from "../../Services";


const OptionsListing = () => {
  const { data, isLoading } = useQuery("options-listing", getOptions);
  const navigate = useNavigate();


  return (
    <Box px="200px">
      <Button
        mb="8"
        onClick={() => {
          navigate("new");
        }}
      >
        Add Option
      </Button>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th w="100%">Option</Th>
              <Th>
                <EditIcon color="gray.500" />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.body.map((option) => (
              <OptionRow key={option.id} option={option} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OptionsListing;

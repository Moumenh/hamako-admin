import { Button, Table, Thead, Tbody, Tr, Th, TableContainer, Box, Flex } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";

import OptionRow from "./option-row";

import { getOptions } from "../../Services";


const OptionsListing = () => {
  const { data, isLoading } = useQuery("options-listing", getOptions);
  const navigate = useNavigate();


  return (
    <Box p={8}>
      <Flex justifyContent="space-between" alignItems="center" mb="4">
        <span>Options #{data?.body?.length}</span>
        <Button
          onClick={() => {
            navigate("new");
          }}
        >
          Add Option
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Option</Th>
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

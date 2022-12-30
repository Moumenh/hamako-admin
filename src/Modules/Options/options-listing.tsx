import { Button, Table, Thead, Tbody, Tr, Th, Td,   TableContainer, Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";

import { ActionMenu, ActionType } from "../../ui";

import { getOptions } from "../../Services";

const StyledTR = styled(Tr)`
  &:hover{
    cursor: pointer;
    background-color: rgb(249 250 251);
  }
`

const OptionsListing = () => {
  const { data, isLoading } = useQuery("options-listing", getOptions);
  const navigate = useNavigate()

  const actions = (optionId: number): ActionType[] => [
    {
      icon: <EditIcon color="gray.500" />,
      label: "edit",
      onClick: () => {
        console.log("here", { optionId });
        navigate(`/options/${optionId}`);
      },
    },
    {
      icon: <DeleteIcon color="red.500" />,
      label: "Delete",
      onClick: () => {},
    },
  ];

  return (
    <Box px="200px">
      <Button mb="8" onClick={() => {
        navigate("new")
      }}>Add Option</Button>
      <TableContainer >
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
              <StyledTR key={option.id}>
                <Td w="100%">{option.name}</Td>
                <Td ><ActionMenu actions={actions(option.id)} /></Td>
              </StyledTR>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OptionsListing;

import {useState} from 'react'
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button, Table, Thead, Tbody, Tr, Th, TableContainer, Td, Box, Flex, useColorModeValue } from '@chakra-ui/react';

import { ActionMenu, ActionType } from "../../ui";

import { getProductListing } from "../../Services";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const ProdcutListing = () => {
  const [page, setPage] = useState(1)
  const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery({
    queryKey: ["product-list", page],
    queryFn: () => getProductListing({ page }),
    keepPreviousData: true,
  });
  
  const navigate = useNavigate();
  console.log({ page, isPreviousData })
  
  const tableHeader = ["", "Name", "Price", "Inventory", <EditIcon color="gray.500" />]

  const actions = (productId: number): ActionType[] => [
    {
      icon: <EditIcon color="gray.500" />,
      label: "edit",
      onClick: () => {
        console.log("here", { productId });
      },
    },
    {
      icon: <DeleteIcon color="red.500" />,
      label: "Delete",
      onClick: () => {},
    },
  ];

  const hoverColor = useColorModeValue("#f9fafb", "#151a24");


  return (
    <Box p={8}>
      <Flex justifyContent='space-between' alignItems="center" mb="4">
        <span>
          Products #{data?.pagination?.count}
        </span>
      <Button
        onClick={() => navigate("new")}
      >
        Add A product
      </Button>
      </Flex>
      
      <TableContainer mb={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              {tableHeader.map((header, i) => (
                <Th key={i}>{header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data?.body.map((product) => (
              <Tr key={product.id} _hover={{ bg: hoverColor }} cursor="pointer">
                <Td>{product.name}</Td>
                <Td>{product.name}</Td>
                <Td>{product.name}</Td>
                <Td>{product.name}</Td>
                <Td><ActionMenu actions={actions(product.id)} /></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={() => setPage((old) => Math.max(old - 1, 1))} disabled={page === 1}>
        Previous Page
      </Button>{" "}
      <Button
        onClick={() => {
          if (!isPreviousData && !(data?.pagination?.pageCount === data?.pagination?.pageNumber)) {
            setPage((old) => old + 1);
          }
        }}
        // Disable the Next Page Button until we know a next page is available
        disabled={isPreviousData || data?.pagination?.pageCount === data?.pagination?.pageNumber}
      >
        Next Page
      </Button>
      {isFetching ? <span> Loading...</span> : null}{" "}
    </Box>
  );
};

export default ProdcutListing;

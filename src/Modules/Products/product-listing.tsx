import {useState} from 'react'
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react';
import { getProductListing } from "../../Services";

const ProdcutListing = () => {
  const [page, setPage] = useState(1)
  const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery({
    queryKey: ["product-list", page],
    queryFn: () => getProductListing({ page }),
    keepPreviousData: true,
  });
  
  const navigate = useNavigate();
  console.log({page, isPreviousData})

  return (
    <div>
      <h1
        style={{
          cursor: "pointer",
          fontWeight: "bold",
        }}
        onClick={() => navigate("new")}
      >
        Add A product
      </h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.body.map(product => (
            <p key={product.id}>{product.name}</p>
          ))}
        </div>
      )}
      <Button
        onClick={() => setPage(old => Math.max(old - 1, 1))}
        disabled={page === 1}
      >
        Previous Page
      </Button>{' '}
      <Button
        onClick={() => {
          if (!isPreviousData && !(data?.pagination?.pageCount === data?.pagination?.pageNumber)) {
            setPage(old => old + 1)
          }
        }}
        // Disable the Next Page Button until we know a next page is available
        disabled={isPreviousData || (data?.pagination?.pageCount === data?.pagination?.pageNumber)}
      >
        Next Page
      </Button>
      {isFetching ? <span> Loading...</span> : null}{' '}
    </div>
  );
};

export default ProdcutListing;

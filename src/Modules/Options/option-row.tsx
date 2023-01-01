import { useState } from "react";
import { Tr, Td, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router";

import EditOptionModal from "./edit-option-modal";

import { ActionMenu, ActionType } from "../../ui";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const OptionRow = ({ option }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const actions = (optionId: number): ActionType[] => [
    {
      icon: <EditIcon color="gray.500" />,
      label: "edit",
      onClick: () => {
        console.log("here", { optionId });
        setIsOpen(true);
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
    <>
      <Tr key={option.id} onClick={() => setIsOpen(true)} _hover={{ bg: hoverColor }} cursor="pointer">
        <Td w="90%">{option.name}</Td>
        <Td>
          <ActionMenu actions={actions(option.id)} />
        </Td>
      </Tr>
      {isOpen && <EditOptionModal isOpen={isOpen} onClose={() => setIsOpen(false)} option={option} />}
    </>
  );
};

export default OptionRow;

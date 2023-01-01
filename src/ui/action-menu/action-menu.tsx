import {FC} from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  PlacementWithLogical,
  Box,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

import MoreHorizontalIcon from "../../assets/more-horizontal-icon";

export type ActionType = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "normal" | "danger";
  disabled?: boolean;
  icon?: React.ReactNode;
};

const StyledButton = styled(Button)`
  svg {
    margin-right: 16px;
  }
`;

type Props = {
  actions: ActionType[];
  placement?: PlacementWithLogical | undefined
}

const ActionMenu:FC<Props> = ({ actions = [], placement="bottom" }) => {
  return (
    <Popover placement={placement}>
      <PopoverTrigger>
        <Box w="20px" onClick={(e) => e.stopPropagation()}>
          <MoreHorizontalIcon />
        </Box>
      </PopoverTrigger>
      <PopoverContent w="200px">
        {actions.map((action, i) => (
          <StyledButton
            key={i}
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              action?.onClick(e);
            }}
            justifyContent="flex-start"
          >
            {action.icon}
            {action.label}
          </StyledButton>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export { ActionMenu };

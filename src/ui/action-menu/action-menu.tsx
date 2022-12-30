import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
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

const ActionMenu = ({ actions = [] }: { actions: ActionType[] }) => {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <div onClick={(e) => e.stopPropagation()}>
          <MoreHorizontalIcon />
        </div>
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

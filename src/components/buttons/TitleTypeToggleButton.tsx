import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaRegRectangleList } from "react-icons/fa6";

import { useConfig } from "../contexts/SturdyConfigContext";
import { SturdyButtonProps } from "./types";

const TitleTypeToggleButton = (props: SturdyButtonProps) => {
  const { config, setConfig } = useConfig();

  const handleClick = () => {
    const { titleType } = config;
    setConfig({
      ...config,
      titleType: titleType === "key" ? "comment" : "key",
    });
  };

  return (
    <OverlayTrigger overlay={<Tooltip>Toggle Title</Tooltip>}>
      <Button {...props} variant="outline-secondary" onClick={handleClick}>
        <FaRegRectangleList className="mb-1" />
      </Button>
    </OverlayTrigger>
  );
};

export default TitleTypeToggleButton;

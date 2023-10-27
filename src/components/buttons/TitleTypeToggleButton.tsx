import Button from "react-bootstrap/Button";
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
    <Button {...props} variant="outline-secondary" onClick={handleClick}>
      <FaRegRectangleList />
    </Button>
  );
};

export default TitleTypeToggleButton;

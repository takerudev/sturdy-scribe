import Button from "react-bootstrap/Button";
import { FaRegRectangleList } from "react-icons/fa6";

import { useConfig } from "../contexts/SturdyConfigContext";

// TODO: Refactor buttons to use an aliased Omit<ButtonProps, "onClick"> and then destructure args into <Button { ...props } >
const TitleTypeToggleButton = () => {
  const { config, setConfig } = useConfig();

  const handleClick = () => {
    const { titleType } = config;
    setConfig({
      ...config,
      titleType: titleType === "key" ? "comment" : "key",
    });
  };

  return (
    <Button variant="secondary" onClick={handleClick}>
      <FaRegRectangleList className="mb-1" /> Toggle Title
    </Button>
  );
};

export default TitleTypeToggleButton;

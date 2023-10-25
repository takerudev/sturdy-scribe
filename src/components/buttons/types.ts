import { ButtonProps } from "react-bootstrap/Button";

export type SturdyButtonProps = Omit<ButtonProps, "onClick">;

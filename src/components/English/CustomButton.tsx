// import Icon from "@atlantum/feather-react-ts";
import React from "react";
import enter from "../../assets/images/enter@2x.png";

// hooks and services

// components, styles and UI

// interfaces
export interface CustomButtonProps {
  disabled?: boolean;
  title: string;
  description: string;
  icon: any;
  color: "blue" | "teal" | "green";
  onClick?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
}

const CustomButton: React.FunctionComponent<CustomButtonProps> = ({
  disabled,
  title,
  description,
  icon,
  color,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={
        "custom-button bg-" + color + " " + `${disabled ? "disabled" : ""}`
      }
    >
      {/* <div className={"icon bg-dark-" + color}> */}
        {/* <Icon name={icon} strokeWidth={1.5} size={20} color="white" /> */}
      {/* </div> */}
      <div className="text">
        <div className="title txt-white">{title}</div>
        <div className="description txt-white">{description}</div>
        <img src={enter} style={{width:'20px',height:'20px',marginTop:'30px'}}/>
      </div>
    </div>
  );
};

export default CustomButton;

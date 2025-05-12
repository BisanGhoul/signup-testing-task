import { screen } from "@testing-library/react";

export const getButtonByName = (name: string) => {
  return screen.getByRole("button", { name: new RegExp(name, "i") });
};

export const getInputByLabel = (label: string) => {
  return screen.getByLabelText(new RegExp(label, "i"));
};

export const findElementByText = (label: string) => {
  return screen.findByText(new RegExp(label, "i"));
};

export const getHeadingByText = (text: string) => {
  return screen.getByRole("heading", { name: new RegExp(text, "i") });
};

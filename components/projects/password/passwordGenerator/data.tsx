export const passwordGeneratorInitialState = {
  lowerCase: { label: "Lower Case", checked: true },
  upperCase: { label: "Upper Case", checked: true },
  specialChar: { label: "Special Character", checked: true },
  digits: { label: "Digits", checked: true },
};

export const MAX_CATEGORY_LENGTH = 50;
export const MIN_CATEGORY_LENGTH = 1;

export const passwordGeneratorCategory = {
  easyToRead: {
    checked: false,
    label: "Easy to read",
    enabled: ["lowerCase", "upperCase"],
    disabled: ["specialChar", "digits"],
  },
  pin: {
    checked: false,
    label: "Pin",
    enabled: ["digits"],
    disabled: ["lowerCase", "upperCase", "specialChar"],
  },
  allCharacter: {
    checked: true,
    label: "All characters",
    enabled: Object.keys(passwordGeneratorInitialState),
    disabled: [],
  },
};

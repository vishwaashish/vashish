import { useCallback, useState } from "react";
import {
  passwordGeneratorInitialState,
  passwordGeneratorCategory,
  MAX_CATEGORY_LENGTH,
  MIN_CATEGORY_LENGTH,
} from "./data";
import clsx from "clsx";

export default function GeneratePassword() {
  const [password, setPassword] = useState("");
  const [isCheck, setIsCheck] = useState(passwordGeneratorInitialState);
  const [length, setLength] = useState(8);
  const [categories, setCategories] = useState(passwordGeneratorCategory);

  const getCategoryCheckedValue = Object.entries(categories).find(
    (val) => !!val[1].checked
  );
  console.log(isCheck, categories, getCategoryCheckedValue);
  const disabled = useCallback(
    (value) => {
      return !Object.entries(isCheck).filter(
        (val) => val[0] !== value && val[1].checked
      ).length;
    },
    [isCheck]
  );

  const onSetLengthInputChange = useCallback((e) => {
    setLength(e.target.value);
  }, []);

  const onSetLength = useCallback((e) => {
    setLength(+e.target.value);
    generatePassword(isCheck, +e.target.value);
  }, []);

  const onSetLengthInputBlur = useCallback((e) => {
    const value = e.target.value;

    if (+value <= MIN_CATEGORY_LENGTH) {
      setLength(MIN_CATEGORY_LENGTH);
      generatePassword(isCheck, MIN_CATEGORY_LENGTH);
      return;
    }

    if (+value > MAX_CATEGORY_LENGTH) {
      setLength(MAX_CATEGORY_LENGTH);
      generatePassword(isCheck, MAX_CATEGORY_LENGTH);
      return;
    }
    generatePassword(isCheck, +value);

    // setLength(+value);
  }, []);

  const onCheck = useCallback(
    (item) => (e) => {
      setIsCheck((check) => {
        const newObj = {
          ...check,
          [item[0]]: { ...item[1], checked: e.target.checked },
        };
        generatePassword(newObj, length);
        return newObj;
      });
    },
    []
  );

  const generateRandomPassword = useCallback((isCheck, max = length) => {
    let password = "";
    const fullLetter = {
      lowerCase: "abcdefghijklmnopqrstuvwxyz",
      upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      specialChar: "!@#$%^&*()-_=+[]{}|;:',.<>?",
      digits: "0123456789",
    };

    const fullLetterArray = Object.entries(fullLetter);
    const isCheckArray = Object.entries(isCheck);
    const fullLetterLength = Object.keys(fullLetter).length;
    let i = 0;
    let j = 0;

    while (password.length < max) {
      if (i % fullLetterLength === 0) {
        j = 0;
      } else {
        j++;
      }
      i++;
      const val = isCheckArray.find((val) => val[0] === fullLetterArray[j][0]);
      if (val[1].checked) {
        const randomIndex = Math.floor(
          Math.random() * fullLetterArray[j][1].length
        );

        const pass = fullLetterArray[j][1][randomIndex];
        if (!password.includes(pass)) {
          password += pass;
        }
      }
    }

    const newPassword = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    return newPassword;
  }, []);

  const generatePassword = useCallback((val, len = length) => {
    setPassword(generateRandomPassword(val, len));
  }, []);

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setPassword(value);
  }, []);

  const onCategories = useCallback(
    (val) => (e) => {
      setCategories((category) => {
        const mapObj = new Map(Object.entries(categories));

        mapObj.forEach((value, key) => {
          if (key === val[0]) {
            mapObj.set(key, {
              ...value,
              checked: true,
            });
          } else {
            mapObj.set(key, {
              ...value,
              checked: false,
            });
          }
        });

        return Object.fromEntries(mapObj);
      });
      setIsCheck((check) => {
        const mapObj = new Map(Object.entries(check));
        mapObj.forEach((check, key) => {
          const found = val[1].enabled?.find((name) => key === name);
          if (found) {
            mapObj.set(key, { ...check, checked: true });
          } else {
            mapObj.set(key, { ...check, checked: false });
          }
        });
        const newObj = Object.fromEntries(mapObj);
        generatePassword(newObj);
        return newObj;
      });
    },
    []
  );

  return (
    <div className="max-w-[600px] m-auto">
      {/* <input
        className="form-control w-full  py-4  text-xl md:text-2xl md:py-5 md:px-5 "
        value={password}
        onChange={handleChange}
      />
      <h3 className="mb-2">Customize your password</h3> */}
      <div className="transition-all  p-4 sm:p-8  bg-dark rounded-lg text-left text-base flex flex-col gap-5">
        <div>
          <label htmlFor="passwordLength" className="text-grey">
            Password Length
          </label>
          <div className="flex gap-5 mt-2">
            <input
              id="passwordLength"
              type="number"
              min="1"
              max="50"
              value={length}
              // defaultValue="0"
              onChange={onSetLengthInputChange}
              onBlur={onSetLengthInputBlur}
              className="form-control w-15 text-center pr-0"
            />
            <input
              className="form-range flex-auto"
              type="range"
              min={MIN_CATEGORY_LENGTH}
              max={MAX_CATEGORY_LENGTH}
              step="1"
              value={length}
              onChange={onSetLength}
            />
          </div>
        </div>

        <div className="text-left">
          <label className="text-grey">Password Type:</label>
          <div className="flex flex-wrap  gap-x-7 gap-y-2 mt-2">
            {Object.entries(categories).map((val) => {
              return (
                <div className="form-check " key={val[0]}>
                  <input
                    className="form-check-input "
                    name="category"
                    id={val[0]}
                    value={val[0]}
                    checked={!!val[1].checked}
                    onChange={onCategories(val)}
                    type="radio"
                  />
                  <label className="form-check-label " htmlFor={val[0]}>
                    {val[1].label}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-left">
          <label className="text-grey">Characters used:</label>
          <div className="flex flex-wrap    gap-x-7 gap-y-2 mt-2 ">
            {Object.entries(isCheck).map((val) => {
              const isDisabled =
                disabled(val[0]) ||
                getCategoryCheckedValue[1].disabled.includes(val[0]);

              return (
                <div className="form-check " key={val[0]}>
                  <input
                    className={`form-check-input `}
                    id={val[0]}
                    name={val[0]}
                    checked={val[1].checked}
                    onChange={onCheck(val)}
                    type="checkbox"
                    disabled={isDisabled}
                  />
                  <label
                    className={clsx(
                      "form-check-label text-offwhite ",
                      isDisabled && "text-grey"
                    )}
                    htmlFor={val[0]}
                  >
                    {val[1].label}
                  </label>
                  <br />
                </div>
              );
            })}
          </div>
        </div>

        {/* {password} */}
        {/* <br /> */}
        {/* <button
          onClick={() => {
            generatePassword(isCheck);
          }}
        >
          GeneratePassword
        </button> */}
      </div>
    </div>
  );
}

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  passwordGeneratorInitialState,
  passwordGeneratorCategory,
  MAX_CATEGORY_LENGTH,
  MIN_CATEGORY_LENGTH,
} from "./data";
import { copyText } from "@/components/utils/text";
import { cn } from "@/components/utils";

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
    (value: any) => {
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
    [length]
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
        generatePassword(newObj, length);
        return newObj;
      });
    },
    [length]
  );

  useEffect(() => {
    generatePassword(isCheck, length);
  }, []);

  const onCopy = async () => {
    await copyText(password);
  };
  return (
    <div className="max-w-[600px] m-auto">
      <div className="flex items-center relative">
        <input
          className={cn(
            "input input-bordered w-full text-xl md:text-2xl input-lg pl-4 pr-[85px]"
          )}
          value={password}
          onChange={handleChange}
        />
        <div className=" flex gap-2 absolute right-5 ">
          <motion.a
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.95,
            }}
            title="Copy"
            role="button"
            onClick={onCopy}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
              />
            </svg>
          </motion.a>
          <motion.a
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.95,
            }}
            role="button"
            // className="text-offwhite"
            title="Regenerate Password"
            onClick={() => {
              generatePassword(isCheck);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 transition-all hover:animate-spin"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </motion.a>
        </div>
      </div>

      <h3 className="mb-2">Customize your password</h3>
      <div
        className="transition-all card input input-bordered h-full  bg-base-100 shadow-xl  p-4 sm:p-8 rounded-lg items-start  flex flex-col gap-5"
        style={{
          borderColor: "hsl(var(--bc) / var(--tw-border-opacity))",
        }}
      >
        <div className="w-full text-left">
          <p htmlFor="passwordLength" className="my-1">
            Password Length
          </p>
          <div className="flex gap-5 mt-2">
            <input
              id="passwordLength"
              type="number"
              min="1"
              max="50"
              value={length}
              onChange={onSetLengthInputChange}
              onBlur={onSetLengthInputBlur}
              className="input input-bordered  w-15 text-center pr-0"
            />
            <input
              className="range range-primary my-auto flex-auto"
              type="range"
              min={MIN_CATEGORY_LENGTH}
              max={MAX_CATEGORY_LENGTH}
              step="1"
              value={length}
              onChange={onSetLength}
            />
          </div>
        </div>

        <div className="w-full text-left">
          <p className="my-1">Password Type:</p>
          <div className="flex flex-wrap  gap-x-7 gap-y-2 mt-2">
            {Object.entries(categories).map((val) => {
              return (
                <div className="form-control" key={val[0]}>
                  <label className="cursor-pointer label " htmlFor={val[0]}>
                    <input
                      className="radio radio-primary"
                      name="category"
                      id={val[0]}
                      value={val[0]}
                      checked={!!val[1].checked}
                      onChange={onCategories(val)}
                      type="radio"
                    />
                    <span className="label-text pl-2">{val[1].label}</span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full text-left">
          <p className="my-1">Characters used:</p>
          <div className="flex flex-wrap    gap-x-7 gap-y-2">
            {Object.entries(isCheck).map((val) => {
              const isDisabled =
                disabled(val[0]) ||
                getCategoryCheckedValue[1].disabled.includes(val[0]);

              return (
                <div className="form-control" key={val[0]}>
                  <label className="label cursor-pointer" htmlFor={val[0]}>
                    <input
                      className={`checkbox checkbox-primary `}
                      id={val[0]}
                      name={val[0]}
                      checked={val[1].checked}
                      onChange={onCheck(val)}
                      type="checkbox"
                      disabled={isDisabled}
                    />
                    <span className="label-text pl-2">{val[1].label}</span>
                  </label>
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

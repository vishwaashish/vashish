"use client";
import { cn } from "@/components/utils";
import _ from "lodash";
import { type ChangeEvent, useCallback, useState } from "react";
import PasswordLayout from "./../PasswordLayout";
import {
    MAX_CATEGORY_LENGTH,
    MIN_CATEGORY_LENGTH,
    type MutateInitialState,
    type ValidResult,
    initialState,
    regrex,
} from "./data";
import { motion } from "framer-motion";
import { HeadPara } from "@/components/shared/Heading";
import { transition } from "@/components/utils/animation";
import { Input } from "@/components/ui/input";

export default function PasswordValidator() {
    const [length, setLength] = useState(8);
    const [password, setPassword] = useState("");
    const [level, setLevel] = useState(0);
    const [cretaria, setCretaria] = useState<MutateInitialState>(() => {
        const convertedState = _.mapValues(initialState, msg => ({
            msg,
            valid: false,
        }));

        return convertedState;
    });

    const onLength = (e: ChangeEvent<HTMLInputElement> | any) => {
        const value = e.target.value;
        const validValue = valid(password, value);
        setLength(+value);
        setCretaria(validValue.value);
        setLevel(validValue.level);
    };

    const valid = (value: string, length = 8): ValidResult => {
        const mapvalue = new Map<string, { msg: string; valid: boolean }>();
        _.forEach(regrex(length), (reg, key) => {
            _.forEach(initialState, (msg, msgKey) => {
                if (msgKey === key) {
                    const isValid = reg.test(value);
                    mapvalue.set(key, { msg, valid: isValid });
                }
            });
        });

        const mapArray = Array.from(mapvalue.entries());

        return {
            value: _.fromPairs(mapArray),
            level: _.filter(mapArray, val => val[1].valid).length ?? 0,
        };
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement> | any) => {
        const value = e.target.value;
        setPassword(value);
        const validValue = valid(value);
        setCretaria(validValue.value);
        setLevel(validValue.level);
    };

    const onSetLengthInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement> | any) => {
            setLength(+e.target.value);
        },
        [setLength],
    );

    const onSetLengthInputBlur = useCallback(
        (e: ChangeEvent<HTMLInputElement> | any) => {
            const value = e.target.value;

            if (+value <= MIN_CATEGORY_LENGTH) {
                setLength(MIN_CATEGORY_LENGTH); return;
            }

            if (+value > MAX_CATEGORY_LENGTH) {
                setLength(MAX_CATEGORY_LENGTH);
            }
        },
        [setLength],
    );
    return (
        <HeadPara
            title="Check Your Password Strength"
            className="prose-p:my-0"
            titleDelay={0.1}
        >
            <motion.p {...transition(0.2)}>
        Discover how strong your password is with our Password Strength Checker.
        Enter your password, and we&apos;ll analyze its robustness based on
        factors such as length, complexity, and diversity of characters.
        Strengthen your online security by crafting passwords that pass the test
        and keep your accounts safe.
            </motion.p>
            <motion.p {...transition(0.3)} className="pt-4">
        📌 To bookmark this page, simply press <kbd className="kbd">Ctrl+D</kbd>
        .
            </motion.p>
            <br />
            <PasswordLayout
                password={password}
                handleChange={handleChange}
                subHeading="Customize and Modify Your Selection"
            >
                <div className="w-full text-left">
                    <p className="my-1">Password Length</p>
                    <div className="flex gap-5 mt-2">
                        <Input
                            id="passwordLength"
                            type="number"
                            min="1"
                            max="50"
                            value={length}
                            onChange={onSetLengthInputChange}
                            onBlur={onSetLengthInputBlur}
                            className="input input-bordered  w-15 text-center pr-0"
                            aria-label="Password Length"
                        />
                        <input
                            className="range range-primary my-auto flex-auto"
                            type="range"
                            min={MIN_CATEGORY_LENGTH}
                            max={MAX_CATEGORY_LENGTH}
                            step="1"
                            value={length}
                            onChange={onLength}
                            aria-label="Password Length"
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full gap-2 ">
                    {Object.entries(cretaria).map(item => (
                        <div
                            className={cn(
                                "transition-all  text-left w-full  py-2 flex ",
                                password.length
                                    ? item[1].valid
                                        ? "text-success"
                                        : "text-destructive"
                                    : "",
                            )}
                            key={item[0]}
                        >
                            <span
                                className={cn(
                                    "swap  swap-rotate",
                                    password.length && item[1].valid && "swap-active",
                                )}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6 swap-off"
                                    aria-label="error"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6 swap-on"
                                    aria-label="success"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
              &nbsp;
                            {item[1].msg}
                        </div>
                    ))}
                </div>
                {/* </div> */}
            </PasswordLayout>
        </HeadPara>
    );
}

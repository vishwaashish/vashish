import { useState } from "react";

const initialStateMessage = {
  lowerCase: "The password contain lowercase letters.",
  upperCase: "The password contain uppercase letters.",
  specialChar: "The password contain special characters.",
  digits: "The password contain digits.",
  inRange: "The password meet the specified criteria.",
  containSpace: "The password does not contain spaces.",
};

const regrex = (length = 8) => ({
  lowerCase: /(?=.*[a-z])/g,
  upperCase: /(?=.*[A-Z])/g,
  specialChar: /(?=.*[\[\]!@#$%^&*()\-_=+{}|;:',.<>?])/g,
  digits: /(?=.*[0-9])/g,
  inRange: new RegExp("^(?=.{" + length + ",30}$)", "g"),
  containSpace: /(?=.*^[^\s]*$)/g,
});

export default function PasswordValidator() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState(0);
  const [cretaria, setCretaria] = useState(() => {
    return Object.fromEntries(
      Object.entries(initialStateMessage).map((item) => [
        item[0],
        { msg: item[1], valid: false },
      ])
    );
  });

  console.log(cretaria, length);

  const onLength = (e) => {
    const value = e.target.value;
    const validValue = valid(password, value);
    setLength(+value);
    setCretaria(validValue.value);
    setLevel(validValue.level);
  };

  const valid = (value, length = 8) => {
    const mapvalue = new Map();
    Object.entries(regrex(length)).forEach((val) => {
      Object.entries(initialStateMessage).forEach((msg) => {
        if (msg[0] === val[0]) {
          if (val[1].test(value)) {
            mapvalue.set(val[0], { msg: msg[1], valid: true });
          } else {
            mapvalue.set(val[0], { msg: msg[1], valid: false });
          }
        }
      });
    });
    return {
      value: Object.fromEntries(mapvalue),
      level: [...mapvalue].filter((val) => !!val[1])?.length,
    };
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const validValue = valid(value);
    setCretaria(validValue.value);
    setLevel(validValue.level);
  };

  return (
    <div className="App">
      <input value={password} onChange={handleChange} />
      {level}
      <br />
      5
      <input type="range" min="5" max="30" value={length} onChange={onLength} />
      30
      <br />
      {password}
      <br />
      <ul>
        {Object.entries(cretaria).map((item) => (
          <li
            key={item[0]}
            style={{ color: !!item[1].valid ? "green" : "red" }}
          >
            {item[1].msg}
          </li>
        ))}
      </ul>
    </div>
  );
}

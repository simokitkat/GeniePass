type Settings = {
  isuppercase: boolean;
  islowercase: boolean;
  isnumbers: boolean;
  issymbols: boolean;
};

const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+";

function getSettingsArray(settingsObject: Settings): string[] {
  const settingsArr: string[] = [];

  for (const key in settingsObject) {
    if (key === "isuppercase" && settingsObject[key]) {
      settingsArr.push(upperCaseLetters);
    } else if (key === "islowercase" && settingsObject[key]) {
      settingsArr.push(lowerCaseLetters);
    } else if (key === "isnumbers" && settingsObject[key]) {
      settingsArr.push(numbers);
    } else if (key === "issymbols" && settingsObject[key]) {
      settingsArr.push(symbols);
    }
  }

  return settingsArr;
}

function getMainCharachters(arr: string[]): string {
  let mainChars = "";

  for (let i = 0; i < arr.length; i++) {
    const randomChar = arr[i][Math.floor(Math.random() * arr[i].length)];
    mainChars += randomChar;
  }

  return mainChars;
}

function shuffleChars(passwordString: string): string {
  const arr: string[] = [];

  for (let i = 0; i < passwordString.length; i++) {
    const randomIndex = Math.floor(Math.random() * passwordString.length);
    if (arr[randomIndex] === undefined) {
      arr[randomIndex] = passwordString[i];
    } else {
      i--;
    }
  }

  return arr.join("");
}

export function generatePassword(
  length: number,
  settingsObject: Settings
): string {
  const settingsArray = getSettingsArray(settingsObject);
  let password = getMainCharachters(settingsArray);
  const lengthOfTheRest = length - password.length;
  const allCharsCombined = settingsArray.join("");

  for (let i = 0; i < lengthOfTheRest; i++) {
    const randomChar =
      allCharsCombined[Math.floor(Math.random() * allCharsCombined.length)];

    password += randomChar;
  }

  return shuffleChars(password);
}

import { CurrencyCodes, LangCodes } from "../constants";
import { Settings } from "../models";
import { Nullable } from "../utils/Nullable";

const defaultSettings: Settings = {
  currency: CurrencyCodes.USD,
  language: LangCodes.EN
}

let cachedSettings: Nullable<Settings> = null;

export const getSettings = (): Settings => {
  if (cachedSettings) {
    return cachedSettings;
  }

  const settingsItem = localStorage.getItem("settings");
  const settings = settingsItem ? JSON.parse(settingsItem) : defaultSettings;

  cachedSettings = settings;

  return settings;
}

export const patchSettings = (patch: Settings): Settings => {
  const existingSettings = getSettings();

  const newSettings = { ...existingSettings, ...patch };

  localStorage.setItem("settings", JSON.stringify(newSettings));

  return newSettings;
}
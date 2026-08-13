const fs = require("fs");
const vm = require("vm");

const html = fs.readFileSync("index.html", "utf8");
const source = `${fs.readFileSync("js/i18n.js", "utf8")}
globalThis.__I18N = I18N;
globalThis.__MODELS = WEATHER_MODELS;`;
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(source, sandbox);

const keys = [...html.matchAll(/data-i18n="([^"]+)"/g)].map((match) => match[1]);
for (const language of ["zh-CN", "en"]) {
  const missing = [...new Set(keys)].filter((key) => !(key in sandbox.__I18N[language]));
  if (missing.length) {
    throw new Error(`${language} missing keys: ${missing.join(", ")}`);
  }
}

const modelCount = Object.values(sandbox.__MODELS).reduce((total, models) => total + models.length, 0);
if (modelCount !== 19) {
  throw new Error(`weather model count: ${modelCount}`);
}

console.log(`i18n keys: ${new Set(keys).size}; weather models: ${modelCount}`);

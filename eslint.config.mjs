import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "coverage/**",
      "uploads/**",
      "файл/**",
      "c4d_work/**",
      ".agentdock/**",
      ".agentdock-tools/**",
      ".agents/**",
      ".vscode/**",
      ".ai-delegation/**"
    ]
  }
];

export default eslintConfig;

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig, { type Colors } from "../../tailwind.config";

// Tailwind export에 정의된 커스텀 컬러 값을 가져오는 메서드
const tw = resolveConfig(tailwindConfig);
const { theme } = tw as unknown as {
  theme: (typeof tw)["theme"] & { colors: Colors };
};

export const TWColors = theme.colors;

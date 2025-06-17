import { gradientMap } from "@/utils/ColorsMap";

export function getGradientColors(
  icon: string
): [string, string] | [string, string, string] {
  const key = icon.toLowerCase() as keyof typeof gradientMap;
  return [...gradientMap[key]] as [string, string] | [string, string, string];
}

export function getGradientLocations(
  colors: [string, string] | [string, string, string]
): [number, number] | [number, number, number] {
  if (colors.length === 2) return [0, 1];
  if (colors.length === 3) return [0, 0.5, 1];
  throw new Error("Unsupported number of gradient colors");
}
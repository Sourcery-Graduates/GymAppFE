import { weightUnits } from '@/app/components/exerciseModal/measurementUnits';

interface WeightComparison {
  limit: number;
  message: string;
}

const weightComparisons: WeightComparison[] = [
  { limit: 1000, message: "it's like a hippo calf!" },
  { limit: 2000, message: "it's equivalent to a small car!" },
  { limit: 5000, message: "it's almost an adult African elephant!" },
  { limit: 10000, message: "it's like lifting a double-decker bus!" },
  { limit: 25000, message: "that's the tongue of a blue whale. Unreal!" },
  { limit: 50000, message: "it's the weight of a commercial airplane. Superhuman!" },
  { limit: Infinity, message: "it's like 10 military tanks. Respect." },
];

const calculateWeightComparison = (totalWeight: number): string => {
  const comparison = weightComparisons.find((comp) => totalWeight < comp.limit);
  return `You've lifted ${totalWeight} ${weightUnits[0]} - ${comparison?.message}`;
};

export default calculateWeightComparison;

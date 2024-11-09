export interface ExerciseSimple {
  id: string;
  name: string;
}

export interface ExerciseDetails extends ExerciseSimple {
  force?: string;
  level?: string;
  mechanic?: string;
  equipment?: string;
  primaryMuscles?: Array<string>;
  secondaryMuscles?: Array<string>;
  description?: Array<string>;
  category?: string;
  images?: Array<string>;
}

export interface CreateRoutineExercise {
  exerciseId: string;
  orderNumber: number;
  defaultSets: number;
  defaultReps: number;
  defaultWeight: number;
  defaultRestTime: number;
  notes?: string;
}

export interface CreteRoutineExerciseJoined extends CreateRoutineExercise {
  exercise: ExerciseDetails;
}

export const mockExercises: CreteRoutineExerciseJoined[] = [
  {
    exerciseId: '1',
    orderNumber: 1,
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 80,
    defaultRestTime: 60,
    notes: 'Focus on form',
    exercise: {
      id: '1',
      name: 'Bench Press',
      force: 'push',
      level: 'intermediate',
      mechanic: 'compound',
      equipment: 'barbell',
      primaryMuscles: ['chest'],
      secondaryMuscles: ['triceps', 'shoulders'],
      description: [
        'Lie back on a flat bench holding a barbell in the rack above you with a shoulder-width, overhand grip.',
        'Lift the bar off the rack and position it above your chest with arms fully extended.',
        'Lower the bar slowly until it touches your middle chest.',
        'Push the bar back to the starting position as you exhale.',
      ],
      category: 'strength',
      images: ['bench_press_1.jpg', 'bench_press_2.jpg'],
    },
  },
  {
    exerciseId: '2',
    orderNumber: 2,
    defaultSets: 4,
    defaultReps: 12,
    defaultWeight: 100,
    defaultRestTime: 90,
    notes: 'Warm up with lower weight',
    exercise: {
      id: '2',
      name: 'Squat',
      force: 'push',
      level: 'advanced',
      mechanic: 'compound',
      equipment: 'barbell',
      primaryMuscles: ['quadriceps'],
      secondaryMuscles: ['glutes', 'hamstrings', 'lower back'],
      description: [
        'Stand with feet shoulder-width apart and a barbell across your upper back.',
        'Keep your chest up, lower your body by bending your knees and hips.',
        'Go down until your thighs are at least parallel to the floor.',
        'Drive through your heels to return to the starting position.',
      ],
      category: 'strength',
      images: ['squat_1.jpg', 'squat_2.jpg'],
    },
  },
  {
    exerciseId: '3',
    orderNumber: 3,
    defaultSets: 3,
    defaultReps: 8,
    defaultWeight: 120,
    defaultRestTime: 120,
    notes: 'Use lifting belt',
    exercise: {
      id: '3',
      name: 'Deadlift',
      force: 'pull',
      level: 'advanced',
      mechanic: 'compound',
      equipment: 'barbell',
      primaryMuscles: ['hamstrings', 'glutes'],
      secondaryMuscles: ['lower back', 'core'],
      description: [
        'Stand with your mid-foot under the barbell.',
        'Bend over and grab the bar with a shoulder-width grip.',
        'Lift your chest and straighten your back.',
        'Pull the bar up along your legs until you’re standing up straight.',
      ],
      category: 'strength',
      images: ['deadlift_1.jpg', 'deadlift_2.jpg'],
    },
  },
  {
    exerciseId: '4',
    orderNumber: 4,
    defaultSets: 4,
    defaultReps: 10,
    defaultWeight: 40,
    defaultRestTime: 45,
    notes: 'Keep core tight',
    exercise: {
      id: '4',
      name: 'Shoulder Press',
      force: 'push',
      level: 'intermediate',
      mechanic: 'compound',
      equipment: 'dumbbells',
      primaryMuscles: ['shoulders'],
      secondaryMuscles: ['triceps'],
      description: [
        'Stand or sit holding a dumbbell in each hand at shoulder height.',
        'Press the weights above your head until your arms are fully extended.',
        'Lower the weights back to shoulder height and repeat.',
      ],
      category: 'strength',
      images: ['shoulder_press_1.jpg', 'shoulder_press_2.jpg'],
    },
  },
  {
    exerciseId: '5',
    orderNumber: 5,
    defaultSets: 3,
    defaultReps: 15,
    defaultWeight: 20,
    defaultRestTime: 30,
    notes: 'Control the movement',
    exercise: {
      id: '5',
      name: 'Bicep Curl',
      force: 'pull',
      level: 'beginner',
      mechanic: 'isolation',
      equipment: 'dumbbells',
      primaryMuscles: ['biceps'],
      secondaryMuscles: [],
      description: [
        'Stand with a dumbbell in each hand at arms length.',
        'Curl the weights while contracting your biceps.',
        'Continue to raise the weights until your biceps are fully contracted.',
        'Slowly lower the weights back to the starting position.',
      ],
      category: 'strength',
      images: ['bicep_curl_1.jpg', 'bicep_curl_2.jpg'],
    },
  },
];

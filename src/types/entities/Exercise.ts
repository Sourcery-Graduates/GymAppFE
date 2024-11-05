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

export const mockExercises: Array<ExerciseDetails> = [
  {
    id: '1',
    name: 'Latissimus Dorsi-SMR',
    force: 'static',
    level: 'beginner',
    mechanic: 'isolation',
    equipment: 'foam roll',
    primaryMuscles: ['lats'],
    secondaryMuscles: [],
    description: [
      'While lying on the floor, place a foam roll under your back and to one side, just behind your arm pit. This will be your starting position.',
      'Keep the arm of the side being stretched behind and to the side of you as you shift your weight onto your lats, keeping your upper body off of the ground. Hold for 10-30 seconds, and switch sides.',
    ],
    category: 'stretching',
    images: ['Latissimus_Dorsi-SMR/0.jpg', 'Latissimus_Dorsi-SMR/1.jpg'],
  },
  {
    id: '2',
    name: 'Leg-Over Floor Press',
    force: 'push',
    level: 'intermediate',
    mechanic: 'compound',
    equipment: 'kettlebells',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders', 'triceps'],
    description: [
      'Lie on the floor with one kettlebell in place on your chest, holding it by the handle. Extend leg on working side over leg on non-working side.Your free arm can be extended out to your side for support.',
      'Press the kettlebll into a locked out position.',
      'Lower the weight until the elbow touches the ground, keeping the kettlebell above the elbow. Repeat for the desired number of repetitions.',
    ],
    category: 'strength',
    images: ['Leg-Over_Floor_Press/0.jpg', 'Leg-Over_Floor_Press/1.jpg'],
  },
  {
    id: '3',
    name: 'Leg-Up Hamstring Stretch',
    force: 'push',
    level: 'beginner',
    mechanic: 'isolation',
    equipment: null,
    primaryMuscles: ['hamstrings'],
    secondaryMuscles: [],
    description: [
      'Lie flat on your back, bend one knee, and put that foot flat on the floor to stabilize your spine.',
      "Extend the other leg in the air. If you're tight, you wont be able to straighten it. That's okay. Extend the knee so that the sole of the lifted foot faces the ceiling (or as close as you can get it).",
      'Slowly straighten the legs as much as possible and then pull the leg toward your nose. Switch sides.',
    ],
    category: 'stretching',
    images: ['Leg-Up_Hamstring_Stretch/0.jpg', 'Leg-Up_Hamstring_Stretch/1.jpg'],
  },
  {
    id: '4',
    name: 'Leg Extensions',
    force: 'push',
    level: 'beginner',
    mechanic: 'isolation',
    equipment: 'machine',
    primaryMuscles: ['quadriceps'],
    secondaryMuscles: [],
    description: [
      'For this exercise you will need to use a leg extension machine. First choose your weight and sit on the machine with your legs under the pad (feet pointed forward) and the hands holding the side bars. This will be your starting position. Tip: You will need to adjust the pad so that it falls on top of your lower leg (just above your feet). Also, make sure that your legs form a 90-degree angle between the lower and upper leg. If the angle is less than 90-degrees then that means the knee is over the toes which in turn creates undue stress at the knee joint. If the machine is designed that way, either look for another machine or just make sure that when you start executing the exercise you stop going down once you hit the 90-degree angle.',
      'Using your quadriceps, extend your legs to the maximum as you exhale. Ensure that the rest of the body remains stationary on the seat. Pause a second on the contracted position.',
      'Slowly lower the weight back to the original position as you inhale, ensuring that you do not go past the 90-degree angle limit.',
      'Repeat for the recommended amount of times.',
    ],
    category: 'strength',
    images: ['Leg_Extensions/0.jpg', 'Leg_Extensions/1.jpg'],
  },
  {
    id: '5',
    name: 'Upward Stretch',
    force: 'static',
    level: 'beginner',
    mechanic: null,
    equipment: null,
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['chest', 'lats'],
    description: [
      'Extend both hands straight above your head, palms touching.',
      'Slowly push your hands up and back, keeping your back straight.',
    ],
    category: 'stretching',
    images: ['Upward_Stretch/0.jpg', 'Upward_Stretch/1.jpg'],
  },
  {
    id: '6',
    name: 'V-Bar Pulldown',
    force: 'pull',
    level: 'intermediate',
    mechanic: 'compound',
    equipment: 'cable',
    primaryMuscles: ['lats'],
    secondaryMuscles: ['biceps', 'middle back', 'shoulders'],
    description: [
      'Sit down on a pull-down machine with a V-Bar attached to the top pulley.',
      'Adjust the knee pad of the machine to fit your height. These pads will prevent your body from being raised by the resistance attached to the bar.',
      'Grab the V-bar with the palms facing each other (a neutral grip). Stick your chest out and lean yourself back slightly (around 30-degrees) in order to better engage the lats. This will be your starting position.',
      'Using your lats, pull the bar down as you squeeze your shoulder blades. Continue until your chest nearly touches the V-bar. Exhale as you execute this motion. Tip: Keep the torso stationary throughout the movement.',
      'After a second hold on the contracted position, slowly bring the bar back to the starting position as you breathe in.',
      'Repeat for the prescribed number of repetitions.',
    ],
    category: 'strength',
    images: ['V-Bar_Pulldown/0.jpg', 'V-Bar_Pulldown/1.jpg'],
  },
  {
    id: '7',
    name: 'V-Bar Pullup',
    force: 'pull',
    level: 'beginner',
    mechanic: 'compound',
    equipment: 'body only',
    primaryMuscles: ['lats'],
    secondaryMuscles: ['biceps', 'middle back', 'shoulders'],
    description: [
      'Start by placing the middle of the V-bar in the middle of the pull-up bar (assuming that the pull-up station you are using does not have neutral grip handles). The V-Bar handles will be facing down so that you can hang from the pull-up bar through the use of the handles.',
      'Once you securely place the V-bar, take a hold of the bar from each side and hang from it. Stick your chest out and lean yourself back slightly in order to better engage the lats. This will be your starting position.',
      'Using your lats, pull your torso up while leaning your head back slightly so that you do not hit yourself with the chin-up bar. Continue until your chest nearly touches the V-bar. Exhale as you execute this motion.',
      'After a second hold on the contracted position, slowly lower your body back to the starting position as you breathe in.',
      'Repeat for the prescribed number of repetitions.',
    ],
    category: 'strength',
    images: ['V-Bar_Pullup/0.jpg', 'V-Bar_Pullup/1.jpg'],
  },
  {
    id: '8',
    name: 'Vertical Swing',
    force: 'pull',
    level: 'beginner',
    mechanic: 'compound',
    equipment: 'dumbbell',
    primaryMuscles: ['hamstrings'],
    secondaryMuscles: ['glutes', 'quadriceps', 'shoulders'],
    description: [
      'Allow the dumbbell to hang at arms length between your legs, holding it with both hands. Keep your back straight and your head up.',
      'Swing the dumbbell between your legs, flexing at the hips and bending the knees slightly.',
      'Powerfully reverse the motion by extending at the hips, knees, and ankles to propel yourself upward, swinging the dumbell over your head.',
      'As you land, absorb the impact through your legs and draw the dumbbell to your torso before the next repetition.',
    ],
    category: 'plyometrics',
    images: ['Vertical_Swing/0.jpg', 'Vertical_Swing/1.jpg'],
  },
  {
    id: '9',
    name: 'Walking, Treadmill',
    force: null,
    level: 'beginner',
    mechanic: null,
    equipment: 'machine',
    primaryMuscles: ['quadriceps'],
    secondaryMuscles: ['calves', 'glutes', 'hamstrings'],
    description: [
      'To begin, step onto the treadmill and select the desired option from the menu. Most treadmills have a manual setting, or you can select a program to run. Typically, you can enter your age and weight to estimate the amount of calories burned during exercise. Elevation can be adjusted to change the intensity of the workout.',
      "Treadmills offer convenience, cardiovascular benefits, and usually have less impact than walking outside. When walking, you should move at a moderate to fast pace, not a leisurely one. Being an activity of lower intensity, walking doesn't burn as many calories as some other activities, but still provides great benefit. A 150 lb person will burn about 175 calories walking 4 miles per hour for 30 minutes, compared to 450 calories running twice as fast. Maintain proper posture as you walk, and only hold onto the handles when necessary, such as when dismounting or checking your heart rate.",
    ],
    category: 'cardio',
    images: ['Walking_Treadmill/0.jpg', 'Walking_Treadmill/1.jpg'],
  },
  {
    id: '10',
    name: 'Weighted Ball Hyperextension',
    force: 'pull',
    level: 'intermediate',
    mechanic: 'compound',
    equipment: 'exercise ball',
    primaryMuscles: ['lower back'],
    secondaryMuscles: ['glutes', 'hamstrings', 'middle back'],
    description: [
      'To begin, lie down on an exercise ball with your torso pressing against the ball and parallel to the floor. The ball of your feet should be pressed against the floor to help keep you balanced. Place a weighted plate under your chin or behind your neck. This is the starting position.',
      'Slowly raise your torso up by bending at the waist and lower back. Remember to exhale during this movement.',
      'Hold the contraction on your lower back for a second and lower your torso back down to the starting position while inhaling.',
      'Repeat for the recommended amount of repetitions prescribed in your program.',
    ],
    category: 'strength',
    images: ['Weighted_Ball_Hyperextension/0.jpg', 'Weighted_Ball_Hyperextension/1.jpg'],
  },
];

import { Routine } from '../types/entities/Routine';

// Mocked data below:
let routines: Routine[] = [
  {
    id: '1',
    name: 'Arni/Push it as hard as you can to the limit',
    description:
      "Benchpress combined with OHP to get the best results during the workout. Motivation: Listen up, champ! You've got a goal in mind, and that goal is within reach. You've got the power within you to crush this workout. Remember why you started. You're not just pushing your body, you're pushing your limits. You're building strength, endurance, and resilience. You're becoming the best version of yourself. This workout is your opportunity to shine. Embrace the burn, the sweat, the challenge. It's a testament to your dedication. You're stronger than you think. Push through the doubt, the fatigue, the whispers of \"give up.\" You've got this! Every rep, every set, every minute is a victory. You're conquering your limitations, building your confidence, and proving to yourself what you're capable of. So, let's go! Let's make this workout count. Let's push harder, go further, and achieve more than we ever thought possible. You've got this!",
    likes: 123,
    userLikes: true,
  },
  {
    id: '2',
    name: 'Arni/Push it as hard as you can to the limit',
    description:
      "Benchpress combined with OHP to get the best results during the workout. Motivation: Listen up, champ! You've got a goal in mind, and that goal is within reach. You've got the power within you to crush this workout. Remember why you started. You're not just pushing your body, you're pushing your limits. You're building strength, endurance, and resilience. You're becoming the best version of yourself. This workout is your opportunity to shine. Embrace the burn, the sweat, the challenge. It's a testament to your dedication. You're stronger than you think. Push through the doubt, the fatigue, the whispers of \"give up.\" You've got this! Every rep, every set, every minute is a victory. You're conquering your limitations, building your confidence, and proving to yourself what you're capable of. So, let's go! Let's make this workout count. Let's push harder, go further, and achieve more than we ever thought possible. You've got this!",
    likes: 12,
    userLikes: false,
  },
  {
    id: '3',
    name: 'Arni/Push it as hard as you can to the limit',
    description:
      "Benchpress combined with OHP to get the best results during the workout. Motivation: Listen up, champ! You've got a goal in mind, and that goal is within reach. You've got the power within you to crush this workout. Remember why you started. You're not just pushing your body, you're pushing your limits. You're building strength, endurance, and resilience. You're becoming the best version of yourself. This workout is your opportunity to shine. Embrace the burn, the sweat, the challenge. It's a testament to your dedication. You're stronger than you think. Push through the doubt, the fatigue, the whispers of \"give up.\" You've got this! Every rep, every set, every minute is a victory. You're conquering your limitations, building your confidence, and proving to yourself what you're capable of. So, let's go! Let's make this workout count. Let's push harder, go further, and achieve more than we ever thought possible. You've got this!",
    likes: 0,
    userLikes: false,
  },
  {
    id: '4',
    name: 'Arni/Push it as hard as you can to the limit',
    description:
      "Benchpress combined with OHP to get the best results during the workout. Motivation: Listen up, champ! You've got a goal in mind, and that goal is within reach. You've got the power within you to crush this workout. Remember why you started. You're not just pushing your body, you're pushing your limits. You're building strength, endurance, and resilience. You're becoming the best version of yourself. This workout is your opportunity to shine. Embrace the burn, the sweat, the challenge. It's a testament to your dedication. You're stronger than you think. Push through the doubt, the fatigue, the whispers of \"give up.\" You've got this! Every rep, every set, every minute is a victory. You're conquering your limitations, building your confidence, and proving to yourself what you're capable of. So, let's go! Let's make this workout count. Let's push harder, go further, and achieve more than we ever thought possible. You've got this!",
    likes: 1200,
    userLikes: true,
  },
  {
    id: '5',
    name: 'Arni/Push it as hard as you can to the limit',
    description:
      "Benchpress combined with OHP to get the best results during the workout. Motivation: Listen up, champ! You've got a goal in mind, and that goal is within reach. You've got the power within you to crush this workout. Remember why you started. You're not just pushing your body, you're pushing your limits. You're building strength, endurance, and resilience. You're becoming the best version of yourself. This workout is your opportunity to shine. Embrace the burn, the sweat, the challenge. It's a testament to your dedication. You're stronger than you think. Push through the doubt, the fatigue, the whispers of \"give up.\" You've got this! Every rep, every set, every minute is a victory. You're conquering your limitations, building your confidence, and proving to yourself what you're capable of. So, let's go! Let's make this workout count. Let's push harder, go further, and achieve more than we ever thought possible. You've got this!",
    likes: 673460,
    userLikes: false,
  },
];

export const fetchRoutines = async (query = ''): Promise<Routine[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const filteredRoutines: Routine[] = routines.filter((routine) =>
    routine.name.toLowerCase().includes(query.toLowerCase()),
  );

  // Uncomment the line below to trigger an error
  // throw new Error();

  return filteredRoutines;
};

export const fetchRoutineDetails = async (routineId: string): Promise<Routine> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const routineDetails: Routine | undefined = routines.find((routine) =>
    routine.id === routineId
  );

  if (routineDetails === undefined) {
    throw new Error();
  }

  return routineDetails;
};

export const createRoutine = async (data: {name: string, description?: string}): Promise<Routine> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newRoutine: Routine = {
    id: (Math.random()*1000).toString(),
    name: data.name,
    description: data.description,
    likes: Math.floor(Math.random()*100000),
    userLikes: false
  };
  routines.push(newRoutine);

  return newRoutine;
};

export const updateRoutine = async (newRoutine: Routine): Promise<Routine> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  routines = routines.map((routine) =>
    routine.id === newRoutine.id ? newRoutine : routine
  );

  return newRoutine;
};

export const deleteRoutine = async (routineId: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  routines = routines.filter((routine) =>
    routine.id !== routineId
  );

  return routineId;
};
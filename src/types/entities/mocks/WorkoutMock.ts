import { Workout } from '@/types/entities/Workout';

export const workoutListMock: Workout[] = [
  {
    id: 'workout-1',
    name: 'Upper Body Strength',
    date: new Date('2024-11-01'),
    comment: 'Focused on chest and back strength.',
    exercises: [
      {
        id: 'exercise-1',
        exercise: { id: 'ex-1', name: 'Bench Press' },
        orderNumber: 1,
        notes: 'Increase weight next time.',
        sets: [
          { id: 'set-1', setNumber: 1, reps: 8, weight: 60, restTime: 90, comment: 'Good form' },
          { id: 'set-2', setNumber: 2, reps: 8, weight: 60, restTime: 90, comment: 'Maintain breathing' },
        ],
      },
      {
        id: 'exercise-2',
        exercise: { id: 'ex-2', name: 'Pull-Up' },
        orderNumber: 2,
        notes: 'Improve control on the descent.',
        sets: [
          { id: 'set-3', setNumber: 1, reps: 10, weight: 0, restTime: 120, comment: 'Focused on range' },
          { id: 'set-4', setNumber: 2, reps: 8, weight: 0, restTime: 120, comment: 'Good control' },
        ],
      },
    ],
  },
  {
    id: 'workout-2',
    name: 'Leg Day',
    date: new Date('2024-11-03'),
    comment: 'Intense quad workout.',
    exercises: [
      {
        id: 'exercise-3',
        exercise: { id: 'ex-3', name: 'Squat' },
        orderNumber: 1,
        notes: 'Focus on depth.',
        sets: [
          { id: 'set-5', setNumber: 1, reps: 10, weight: 80, restTime: 120, comment: 'Good depth' },
          { id: 'set-6', setNumber: 2, reps: 10, weight: 80, restTime: 120, comment: 'Smooth movement' },
        ],
      },
      {
        id: 'exercise-4',
        exercise: { id: 'ex-4', name: 'Leg Press' },
        orderNumber: 2,
        notes: 'Watch knee alignment.',
        sets: [
          { id: 'set-7', setNumber: 1, reps: 12, weight: 100, restTime: 90, comment: 'Felt strong' },
          { id: 'set-8', setNumber: 2, reps: 12, weight: 100, restTime: 90, comment: 'Knees aligned' },
        ],
      },
    ],
  },
  {
    id: 'workout-3',
    name: 'Cardio and Core',
    date: new Date('2024-11-05'),
    comment: 'Light cardio and abs.',
    exercises: [
      {
        id: 'exercise-5',
        exercise: { id: 'ex-5', name: 'Plank' },
        orderNumber: 1,
        notes: 'Increase duration next time.',
        sets: [
          { id: 'set-9', setNumber: 1, reps: 1, weight: 0, restTime: 60, comment: 'Tough hold' },
          { id: 'set-10', setNumber: 2, reps: 1, weight: 0, restTime: 60, comment: 'Core engaged' },
        ],
      },
      {
        id: 'exercise-6',
        exercise: { id: 'ex-6', name: 'Mountain Climbers' },
        orderNumber: 2,
        notes: 'Keep pace consistent.',
        sets: [{ id: 'set-11', setNumber: 1, reps: 30, weight: 0, restTime: 30, comment: 'Steady' }],
      },
    ],
  },
  {
    id: 'workout-4',
    name: 'Shoulders and Arms',
    date: new Date('2024-11-07'),
    comment: 'Focus on shoulder stability.',
    exercises: [
      {
        id: 'exercise-7',
        exercise: { id: 'ex-7', name: 'Overhead Press' },
        orderNumber: 1,
        notes: 'Increase weight next session.',
        sets: [
          { id: 'set-12', setNumber: 1, reps: 8, weight: 40, restTime: 90, comment: 'Stable press' },
          { id: 'set-13', setNumber: 2, reps: 8, weight: 40, restTime: 90, comment: 'Form was good' },
        ],
      },
      {
        id: 'exercise-8',
        exercise: { id: 'ex-8', name: 'Bicep Curl' },
        orderNumber: 2,
        notes: 'Hold contraction longer.',
        sets: [
          { id: 'set-14', setNumber: 1, reps: 12, weight: 15, restTime: 60, comment: 'Good pump' },
          { id: 'set-15', setNumber: 2, reps: 12, weight: 15, restTime: 60, comment: 'Intense hold' },
        ],
      },
    ],
  },
  {
    id: 'workout-5',
    name: 'Core Strength',
    date: new Date('2024-11-09'),
    comment: 'Abs and obliques.',
    exercises: [
      {
        id: 'exercise-9',
        exercise: { id: 'ex-9', name: 'Russian Twist' },
        orderNumber: 1,
        notes: 'Maintain balance.',
        sets: [
          { id: 'set-16', setNumber: 1, reps: 20, weight: 5, restTime: 30, comment: 'Good rotation' },
          { id: 'set-17', setNumber: 2, reps: 20, weight: 5, restTime: 30, comment: 'Solid form' },
        ],
      },
      {
        id: 'exercise-10',
        exercise: { id: 'ex-10', name: 'Bicycle Crunch' },
        orderNumber: 2,
        notes: 'Engage core fully.',
        sets: [{ id: 'set-18', setNumber: 1, reps: 25, weight: 0, restTime: 60, comment: 'Smooth transitions' }],
      },
    ],
  },
  {
    id: 'workout-6',
    name: 'Full Body Conditioning',
    date: new Date('2024-11-10'),
    comment: 'Focus on endurance and conditioning.',
    exercises: [
      {
        id: 'exercise-11',
        exercise: { id: 'ex-11', name: 'Burpees' },
        orderNumber: 1,
        notes: 'Keep intensity high.',
        sets: [
          { id: 'set-19', setNumber: 1, reps: 15, weight: 0, restTime: 60, comment: 'Kept up pace' },
          { id: 'set-20', setNumber: 2, reps: 15, weight: 0, restTime: 60, comment: 'Heart rate was high' },
        ],
      },
      {
        id: 'exercise-12',
        exercise: { id: 'ex-12', name: 'Kettlebell Swing' },
        orderNumber: 2,
        notes: 'Focus on hip drive.',
        sets: [{ id: 'set-21', setNumber: 1, reps: 20, weight: 16, restTime: 90, comment: 'Good power' }],
      },
    ],
  },
  {
    id: 'workout-7',
    name: 'Lower Body Power',
    date: new Date('2024-11-12'),
    comment: 'Intense focus on explosive leg exercises.',
    exercises: [
      {
        id: 'exercise-13',
        exercise: { id: 'ex-13', name: 'Box Jump' },
        orderNumber: 1,
        notes: 'Aim for higher box next time.',
        sets: [{ id: 'set-22', setNumber: 1, reps: 10, weight: 0, restTime: 90, comment: 'Felt strong' }],
      },
      {
        id: 'exercise-14',
        exercise: { id: 'ex-14', name: 'Lunges' },
        orderNumber: 2,
        notes: 'Control each rep.',
        sets: [
          { id: 'set-23', setNumber: 1, reps: 12, weight: 20, restTime: 60, comment: 'Balanced' },
          { id: 'set-24', setNumber: 2, reps: 12, weight: 20, restTime: 60, comment: 'Legs were burning' },
        ],
      },
    ],
  },
  {
    id: 'workout-8',
    name: 'Back and Biceps',
    date: new Date('2024-11-14'),
    comment: 'Focused on upper back and arm strength.',
    exercises: [
      {
        id: 'exercise-15',
        exercise: { id: 'ex-15', name: 'Lat Pulldown' },
        orderNumber: 1,
        notes: 'Pull down to chest level.',
        sets: [
          { id: 'set-25', setNumber: 1, reps: 10, weight: 50, restTime: 90, comment: 'Controlled movement' },
          { id: 'set-26', setNumber: 2, reps: 10, weight: 50, restTime: 90, comment: 'Back felt strong' },
        ],
      },
      {
        id: 'exercise-16',
        exercise: { id: 'ex-16', name: 'Dumbbell Curl' },
        orderNumber: 2,
        notes: 'Full range of motion.',
        sets: [
          { id: 'set-27', setNumber: 1, reps: 12, weight: 12, restTime: 60, comment: 'Nice pump' },
          { id: 'set-28', setNumber: 2, reps: 12, weight: 12, restTime: 60, comment: 'Good control' },
        ],
      },
    ],
  },
  {
    id: 'workout-9',
    name: 'Core Stability',
    date: new Date('2024-11-16'),
    comment: 'Core-focused workout with stability exercises.',
    exercises: [
      {
        id: 'exercise-17',
        exercise: { id: 'ex-17', name: 'Dead Bug' },
        orderNumber: 1,
        notes: 'Engage core throughout.',
        sets: [{ id: 'set-29', setNumber: 1, reps: 20, weight: 0, restTime: 60, comment: 'Form was solid' }],
      },
      {
        id: 'exercise-18',
        exercise: { id: 'ex-18', name: 'Leg Raises' },
        orderNumber: 2,
        notes: 'Avoid swinging.',
        sets: [{ id: 'set-30', setNumber: 1, reps: 15, weight: 0, restTime: 60, comment: 'Controlled reps' }],
      },
    ],
  },
  {
    id: 'workout-10',
    name: 'Mobility and Recovery',
    date: new Date('2024-11-18'),
    comment: 'Light workout for active recovery.',
    exercises: [
      {
        id: 'exercise-19',
        exercise: { id: 'ex-19', name: 'Foam Roll' },
        orderNumber: 1,
        notes: 'Loosen up tight muscles.',
        sets: [{ id: 'set-31', setNumber: 1, reps: 1, weight: 0, restTime: 300, comment: 'Helped with soreness' }],
      },
      {
        id: 'exercise-20',
        exercise: { id: 'ex-20', name: 'Dynamic Stretching' },
        orderNumber: 2,
        notes: 'Maintain flexibility.',
        sets: [{ id: 'set-32', setNumber: 1, reps: 1, weight: 0, restTime: 300, comment: 'Felt relaxed' }],
      },
    ],
  },
];

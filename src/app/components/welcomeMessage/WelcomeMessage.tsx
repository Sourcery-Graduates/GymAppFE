import './WelcomeMessage.scss';

const WelcomeMessage = () => {
  return (
    <div className='welcome-message'>
      <h1>
        Welcome to <span className='welcome-message__app-name'>Gym App</span>!
      </h1>

      <h2>Get Started in 3 Simple Steps</h2>

      <h3>1. Browse Routines</h3>
      <ul>
        <li>Explore a variety of workout routines shared by our community.</li>
        <li>
          Use the <strong>Routines</strong> tab to find yours and other users routines.
        </li>
        <li>Your most used routines from the last 3 months will appear on your dashboard.</li>
      </ul>

      <h3>2. Create Your Own Routine</h3>
      <ul>
        <li>
          Tap the <strong>New Routine</strong> button in the <strong>Routines</strong> tab.
        </li>
        <li>
          Add details like:
          <ul>
            <li>Routine Name (e.g., "Push pull legs").</li>
            <li>Choose exercises from our library.</li>
            <li>Sets, reps, and rest times.</li>
          </ul>
        </li>
        <li>Save your routine to start using it right away and share it with others.</li>
      </ul>

      <h3>3. Track Your Workouts</h3>
      <ul>
        <li>
          Select a routine and tap <strong>Start Workout</strong> to create a workout from it:
          <ul>
            <li>Log weights, reps, or time for each exercise.</li>
            <li>
              Tap <strong>Save Workout</strong> to save it.
            </li>
          </ul>
        </li>
        <li>
          View your workout history in the <strong>My trainings</strong> tab to monitor progress.
        </li>
      </ul>

      <div>
        <h3>Tips for Success</h3>
        <ul>
          <li>
            <strong>Personalize Your Routines:</strong> Adjust exercises, reps, or weights to suit your fitness level.
          </li>
          <li>
            <strong>Engage with the Community:</strong> Browse and give a like if you enjoyed the routine!
          </li>
        </ul>
      </div>

      <p>Feel free to explore and make the app your fitness companion! 🎉💪</p>
    </div>
  );
};

export default WelcomeMessage;

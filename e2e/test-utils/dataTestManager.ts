type CleanupTask = () => Promise<void>;

export class DataTestManager {
  tasks: CleanupTask[] = [];

  constructor() {}

  registerCleanup(task: CleanupTask) {
    this.tasks.push(task);
  }
  async cleanup() {
    for (const task of this.tasks) {
      try {
        await task();
      } catch {
        throw new Error(`Test data cleanup failed for ${task}`);
      }
    }
    this.tasks = [];
  }
}

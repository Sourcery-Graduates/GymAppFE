export interface Profile {
  firstname: string;
  lastname: string;
  username: string;
  bio: string;
  avatarUrl: string;
  location: string;
}

export interface ProfileWithSettings extends Profile {
  settings: unknown;
}

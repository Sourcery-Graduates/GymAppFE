export interface Profile {
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  avatarUrl: string;
  location: string;
}

export interface ProfileWithSettings extends Profile {
  settings: unknown;
}

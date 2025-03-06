export interface LikeNotification {
  ownerId: string;
  routineId: string;
  likesCount: number;
  routineTitle: string;
  createdAt: string;
}

export interface PagedLikeNotification {
  totalPages: number;
  totalElements: number;
  data: LikeNotification[];
}

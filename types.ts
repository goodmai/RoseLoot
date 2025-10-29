export interface LootBox {
  id: number;
  name: string;
  color: string;
  gradient: string;
  shadow: string;
  imageUrl: string;
}

export enum AppState {
  AUTHENTICATING,
  SELECTING_BOX,
  GENERATING_VIDEO,
  VIDEO_READY,
}
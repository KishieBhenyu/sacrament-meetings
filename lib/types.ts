export interface Hymn {
  number: number;
  title: string;
}

export interface Speaker {
  name: string;
  topic: string;
  type: "speaker" | "musical-number";
}

export interface WardBusiness {
  description: string;
}

export interface SacramentMeeting {
  id: number;
  date: string;
  meetingType: "regular" | "special";
  presiding: string;
  conducting: string;
  openingHymn: Hymn;
  openingPrayer: string;
  wardBusiness: WardBusiness[];
  stakeBusiness: boolean;
  sacramentHymn: Hymn;
  speakers: Speaker[];
  closingHymn: Hymn;
  closingPrayer: string;
  announcements: string[];
}
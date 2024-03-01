export interface BaseSelf {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmed: string;
  createdAt: string;
  updatedAt: string;
}
export interface Self extends BaseSelf {}

export interface BaseAdmin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
export interface Admin extends BaseAdmin {}

export enum Font {
  inter = "inter",
  notoSerif = "notoSerif",
}

export enum Layout {
  one = "one",
  two = "two",
  three = "three",
  four = "four",
  five = "five",
}

export interface BaseOrganization {
  id: string;
  slug: string;
  title: string;
  logo: {
    id: string;
    url: string;
  } | null;
  banner: {
    id: string;
    url: string;
  } | null;
  headerFont: Font;
  bodyFont: Font;
  primaryColor: string | null;
  secondaryColor: string | null;
  accentColor: string | null;
  layout: Layout;
  description: string | null;
  longDescription: string | null;

  eeocEnabled: boolean;
  veteranEnabled: boolean;
  disabilityEnabled: boolean;
  raceEnabled: boolean;
  genderEnabled: boolean;

  createdAt: string;
  updatedAt: string;
}
export interface Organization extends BaseOrganization {}

export interface BaseUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmed: string;
  createdAt: string;
  updatedAt: string;
}
export interface User extends BaseUser {}

export interface BaseListing {
  id: string;
  published: boolean;
  jobTitle: string;
  location: string | null;
  employmentType: string | null;
  salaryRange: string | null;
  jobDescription: string | null;
  jobRequirements: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Listing extends BaseListing {}

export enum Gender {
  male = "male",
  female = "female",
  prefer_not_to_say = "prefer_not_to_say",
  other = "other",
}

export interface BaseFile {
  id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface File extends BaseFile {}

export enum Status {
  new = "new",
  in_review = "in_review",
  rejected = "rejected",
  interview = "interview",
  offer_pending = "offer_pending",
  offer_accepted = "offer_accepted",
  offer_rejected = "offer_rejected",
}

export interface BaseApplication {
  id: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  address: string;
  city: string;
  state: string;
  zip: string;
  usCitizen: boolean;
  usAuthorized: boolean;
  prevEmployee: boolean;
  nonCompete: boolean;
  olderThan18: boolean;
  race: string;
  hispanicOrLatino: boolean;
  veteranStatus: string;
  disabilityStatus: string;
  workVisa: boolean;
  workVisaType: string;
  language: string;
  availableStartDate: string;
  relocate: boolean;
  userId: string;
  resumeUrl: string;
  coverLetterUrl: string;

  email: string;
  status: Status;
  linkedInUrl: string | null;
  listingId: string;
  resumeId: string | null;
  coverLetterId: string | null;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Application extends BaseApplication {
  listing: BaseListing;
  resume: BaseFile;
  coverLetter: BaseFile;
}

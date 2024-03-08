import { EmploymentType } from "./interfaces";

const GetEmploymentType = (type: EmploymentType | null) => {
  switch (type) {
    case "full_time":
      return "Tull Time";
    case "part_time":
      return "Part Time";
    case "seasonal":
      return "Seasonal";
    case "internship":
      return "Internship";
    case "contract":
      return "Contract";
    case "temporary":
      return "Temporary";
    default:
      return "-";
  }
};

export default GetEmploymentType;

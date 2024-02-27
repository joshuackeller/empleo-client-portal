import { PageComponent } from "@/pages/_app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Skeleton } from "../shadcn/Skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../shadcn/Form";
import { Input } from "../shadcn/Input";
import { Button } from "../shadcn/Button";
import useAddApplication from "@/src/requests/applications/useAddApplication";
import { useToast } from "../shadcn/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/shadcn/Select";

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  usCitizen: z.boolean().optional(),
  usAuthorized: z.boolean().optional(),
  prevEmployee: z.boolean().optional(),
  nonCompete: z.boolean().optional(),
  olderThan18: z.boolean().optional(),
  race: z.string().optional(),
  hispanicOrLatino: z.boolean().optional(),
  veteranStatus: z.string().optional(),
  disabilityStatus: z.string().optional(),
  workVisa: z.boolean().optional(),
  languages: z.string().optional(),
  availableStartDate: z.string().optional(),
  note: z.string().optional(),
  relocate: z.boolean().optional(),
  userId: z.string().optional(),
  // resumeUrl: z.string().optional(),
  // coverLetterUrl: z.string().optional(),
});

const ApplicationForm: PageComponent = () => {
  const { mutate: addApplication, isPending } = useAddApplication();

  // const { data: application } = useGetApplication(applicationId);

  // const { resume, setResume } = useState<string>("");

  // const { coverLetter, setCoverLetter } = useState<string>("");

  // const [open, setOpen] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);
  // const [isVeteranOpen, setIsVeteranOpen] = useState(false);
  // const [isDisabilityOpen, setIsDisabilityOpen] = useState(false);
  const [tab, setTab] = useState('default');
  

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // const handleClickVeteranOpen = () => {
  //   setIsVeteranOpen(true);
  // }

  // const handleCloseVeteran = () => {
  //   setIsVeteranOpen(false);
  // }

  // const handleClickDisabilityOpen = () => {
  //   setIsDisabilityOpen(true);
  // }

  // const handleCloseDisability = () => {
  //   setIsDisabilityOpen(false);
  // }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // firstName: application?.firstName,
      // lastName: application?.lastName,
      firstName: "",
      lastName: "",
      // phone: "",
      // email: "",
      // gender: "",
      // address: "",
      // city: "",
      // state: "",
      // zip: "",
      // usCitizen: false,
      // usAuthorized: false,
      // prevEmployee: false,
      // nonCompete: false,
      // olderThan18: false,
      // race: "",
      // hispanicOrLatino: false,
      // veteranStatus: "",
      // disabilityStatus: "",
      // workVisa: false,
      // relocate: false,
      // languages: "",
      // availableStartDate: "",
      // note: "",
      // userId: "",
      // resumeUrl: "",
      // coverLetterUrl: "",
    },
  });

  const { toast } = useToast();

  // const { mutate: addApplication, isPending } = useAddApplication();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addApplication(
      { 
        body: {
          ...values,
          coverLetterUrl: "", // Add the coverLetterUrl property with an initial value
          olderThan18: values.olderThan18 || false, // Ensure olderThan18 is of type boolean
          usCitizen: values.usCitizen || false, // Ensure usCitizen is of type boolean
          usAuthorized: values.usAuthorized || false, // Ensure usAuthorized is of type boolean
          prevEmployee: values.prevEmployee || false, // Ensure prevEmployee is of type boolean
          nonCompete: values.nonCompete || false, // Ensure nonCompete is of type boolean
          hispanicOrLatino: values.hispanicOrLatino || false, // Ensure hispanicOrLatino is of type boolean
          workVisa: values.workVisa || false, // Ensure workVisa is of type boolean
          relocate: values.relocate || false, // Ensure relocate is of type boolean
          userId: values.userId || "", // Ensure userId is of type string
        }
      },
      // {
      //   onSuccess: () => {
      //     setOpen(false);
      //   },
      // }
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <div>
          <h3>Application</h3>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="usCitizen"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>U.S Citizen?</FormLabel>
                      <FormControl>
                        <input type="checkbox" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="usAuthorized"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>U.S Authorized?</FormLabel>
                      <FormControl>
                        <input type="checkbox" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="prevEmployee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous Employee?</FormLabel>
                      <FormControl>
                        <input type="checkbox" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nonCompete"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Non-Compete?</FormLabel>
                      <FormControl>
                        <input type="checkbox" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="olderThan18"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>18 or older?</FormLabel>
                      <FormControl>
                        <input type="checkbox" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <p className='font-bold'>Voluntary Self-Identification</p>
                  <Button variant='secondary' onClick={handleClickOpen} type="button">Open Window</Button>
                  {isOpen && (
                    <div style={{
                      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
                      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
                    }}>
                      <div style={{
                        position: 'relative',
                        backgroundColor: 'white', 
                        padding: '20px', 
                        borderRadius: '8px',
                        width: '50%', 
                        height: '80%', 
                        overflowY: 'auto',
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: "center",
                      }}>
                      <div className='mb-2'>
                        <Button 
                          onClick={() => setTab('default')} 
                          type='button' 
                          variant='secondary'
                          style={tab === 'default' ? { backgroundColor: "#1c4966", color: "#fff" } : {}}
                        >
                            General
                        </Button>
                        <Button 
                          onClick={() => setTab('veteran')} 
                          type='button' 
                          className='ml-5' 
                          variant='secondary'
                          style={tab === 'veteran' ? { backgroundColor: "#1c4966", color: "#fff" } : {}}
                        >
                            Veteran
                        </Button>
                        <Button 
                          onClick={() => setTab('disability')} 
                          type='button' 
                          className='ml-5' 
                          variant='secondary'
                          style={tab === 'disability' ? { backgroundColor: "#1c4966", color: "#fff" } : {}}
                        >
                            Disability
                        </Button>
                      </div>
                      {tab === 'default' && (
                        <div>
                        <p className='font-bold text-center'>Voluntary Self-Identification</p>
                        <p style={{flexGrow: 1}}>
                          For government reporting purposes, we ask candidates to respond to the below 
                          self-identification survey. Completion of the form is entirely voluntary. Whatever 
                          your decision, it will not be considered in the hiring process or thereafter. Any 
                          information that you do provide will be recorded and maintained in a confidential file.
                          We do not discriminate on the basis of any protected group status under any applicable law.
                        </p>
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Your Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Select Your Gender</SelectLabel>
                              <SelectItem value="Male">
                                Male</SelectItem>
                              <SelectItem value="Female">
                                Female
                              </SelectItem>
                              <SelectItem value="Prefer not to say">
                                Prefer not to say
                              </SelectItem>
                              <SelectItem value="Other">
                                Other
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Select>
                        <SelectTrigger className="w-[180px] mt-2">
                          <SelectValue placeholder="Select Your Race" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select Your Race</SelectLabel>
                            <SelectItem value="American Indian or Alaska Native">
                              American Indian or Alaska Native
                            </SelectItem>
                            <SelectItem value="Asian">
                              Asian
                            </SelectItem>
                            <SelectItem value="Black or African American">
                              Black or African American
                            </SelectItem>
                            <SelectItem value="Hispanic or Latino">
                              Hispanic or Latino
                            </SelectItem>
                            <SelectItem value="I Do Not Wish to Disclose">
                              I Do Not Wish to Disclose
                            </SelectItem>
                            <SelectItem value="Native Hawaiian or Other Pacific Islander">
                              Native Hawaiian or Other Pacific Islander
                            </SelectItem>
                            <SelectItem value="Other">
                              Other
                            </SelectItem>
                            <SelectItem value="Two or More Races">
                              Two or More Races
                            </SelectItem>
                            <SelectItem value="White">
                              White
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      </div>
                      )}
                      {tab === 'veteran' && (
                        <div>
                          <p className='font-bold text-center'>Voluntary Self-Identification of Veteran Status</p>
                          <p style={{flexGrow: 1}}>
                            If you believe you belong to any of the categories of protected veterans listed below, please indicate 
                            by making the appropriate selection. As a government contractor subject to the Vietnam Era Veterans 
                            Readjustment Assistance Act (VEVRAA), we request this information in order to measure the effectiveness 
                            of the outreach and positive recruitment efforts we undertake pursuant to VEVRAA. Classification of 
                            protected categories is as follows:
                            A "disabled veteran" is one of the following: a veteran of the U.S. military, ground, naval or air 
                            service who is entitled to compensation (or who but for the receipt of military retired pay would be 
                            entitled to compensation) under laws administered by the Secretary of Veterans Affairs; or a person who 
                            was discharged or released from active duty because of a service-connected disability.
                            A "recently separated veteran" means any veteran during the three-year period beginning on the date of 
                            such veteran's discharge or release from active duty in the U.S. military, ground, naval, or air service.
                            An "active duty wartime or campaign badge veteran" means a veteran who served on active duty in the U.S. 
                            military, ground, naval or air service during a war, or in a campaign or expedition for which a campaign 
                            badge has been authorized under the laws administered by the Department of Defense.
                            An "Armed forces service medal veteran" means a veteran who, while serving on active duty in the U.S. 
                            military, ground, naval or air service, participated in a United States military operation for which an 
                            Armed Forces service medal was awarded pursuant to Executive Order 12985.
                          </p>
                          <Select>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder
                              ="Select Your Veteran Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select Your Veteran Status</SelectLabel>
                                <SelectItem value="Armed Forces Service Medal Veteran">
                                  Armed Forces Service Medal Veteran
                                </SelectItem>
                                <SelectItem value="Disabled Veteran">
                                  Disabled Veteran
                                </SelectItem>
                                <SelectItem value="Recently Separated Veteran">
                                  Recently Separated Veteran
                                </SelectItem>
                                <SelectItem value="Special Disabled Veteran">
                                  Special Disabled Veteran
                                </SelectItem>
                                <SelectItem value="Unspecified Veteran Status">
                                  Unspecified Veteran Status
                                </SelectItem>
                                <SelectItem value="Veteran">
                                  Veteran
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      {tab === 'disability' && (
                        <div>
                          <p className='font-bold text-center'>Voluntary Self-Identification of Disability</p>
                          <p style={{flexGrow: 1}}>
                            For government reporting purposes, we ask candidates to respond to the below 
                            self-identification survey. Completion of the form is entirely voluntary. Whatever 
                            your decision, it will not be considered in the hiring process or thereafter. Any 
                            information that you do provide will be recorded and maintained in a confidential file.
                            We do not discriminate on the basis of any protected group status under any applicable law.
                          </p>
                          <Select>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select Your Disability Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select Your Disability Status</SelectLabel>
                                <SelectItem value="Yes, I have a disability (or previously had a disability)">
                                  Yes, I have a disability (or previously had a disability)
                                </SelectItem>
                                <SelectItem value="No, I don't have a disability">
                                  No, I don't have a disability
                                </SelectItem>
                                <SelectItem value="I don't wish to answer">
                                  I don't wish to answer
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                        <br></br>
                        <div
                          className="mt-2"
                          style={{ bottom: "20px", alignSelf: "flex-start", position: "absolute" }}
                        >
                          {/* <Button
                            style={{ backgroundColor: "#ff3b58" }}
                            onClick={handleClose}
                            type="button"
                          >
                            Close
                          </Button> */}
                          <Button
                            style={{ backgroundColor: "#50a88b" }}
                            onClick={handleClose}
                            // onClick={() => {
                            //   const newLayout = `Layout ${page}` as Layout | undefined;
                            //   if (newLayout === selectedLayout) {
                            //     handleClose();
                            //   } else {
                            //     setLayout(Layout[numberToString(page)]);
                            //     setSelectedLayout(newLayout);
                            //   }
                            // }}
                            type="button"
                            // className="ml-4"
                          >
                            Save and Close Window
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>


                <div className="flex justify-end mt-3">
                  <Button disabled={isPending} type="submit">
                    Add
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;

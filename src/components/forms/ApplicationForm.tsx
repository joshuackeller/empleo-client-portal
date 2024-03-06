"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../shadcn/Form";
import { Input } from "../shadcn/Input";
import { Button, buttonVariants } from "../shadcn/Button";
import { CreateApplication } from "@/src/requests/applications/CreateApplication";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../shadcn/Textarea";
import { Label } from "../shadcn/Label";
import Link from "next/link";
import { cn } from "@/src/utilities/cn";
import { Listing, Organization } from "@/src/utilities/interfaces";
import { GetOrganization } from "@/src/requests/organizations/GetOrganization";
import useQuery from "@/src/utilities/useQuery";
import ApplicationFormLoader from "../other/ApplicationFormLoader";
import { GetListing } from "@/src/requests/listings/GetListing";
import YesNoQuestion from "../fields/YesNoQuestion";
import DatePicker from "../shadcn/DatePicker";
import { Separator } from "../shadcn/Separator";
import useGetOrgSlug from "@/src/utilities/useGetOrgSlug";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/Select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/Dialog";
import { Info } from "lucide-react";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  phone: z.string().optional(),
  linkedInUrl: z.string().url().optional(),
  resume: z.any().optional(),
  resumeName: z.any().optional(),
  coverLetter: z.any().optional(),
  coverLetterName: z.any().optional(),
  note: z.string().optional(),
  usAuthorized: z.boolean().optional(),
  availableStartDate: z.string().optional(),
  eeocRace: z.string().optional(),
  eeocVeteranStatus: z.string().optional(),
  eeocDisabilityStatus: z.string().optional(),
  eeocGender: z.string().optional(),
});

interface ApplicationFormProps {
  listingId: string;
}

const ApplicationForm = ({ listingId }: ApplicationFormProps) => {
  const slug = useGetOrgSlug();
  const { data: organization, isLoading: isLoadingOrg } =
    useQuery<Organization | null>(
      GetOrganization,
      { slug },
      { enabled: !!slug }
    );
  const { data: listing, isLoading: isLoadingListing } =
    useQuery<Listing | null>(GetListing, { listingId });

  const isLoading = isLoadingOrg || isLoadingListing;

  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      note: undefined,
      phone: undefined,
      resume: undefined,
      resumeName: undefined,
      coverLetter: undefined,
      coverLetterName: undefined,
      address: undefined,
      city: undefined,
      state: undefined,
      zip: undefined,
      usAuthorized: undefined,
      availableStartDate: undefined,
      eeocRace: undefined,
      eeocVeteranStatus: undefined,
      eeocDisabilityStatus: undefined,
      eeocGender: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsPending(true);
    try {
      await CreateApplication({
        body: {
          ...values,
          eeocRace: values.eeocRace === "-" ? undefined : values.eeocRace,
          eeocGender: values.eeocGender === "-" ? undefined : values.eeocGender,
          eeocVeteranStatus:
            values.eeocVeteranStatus === "-"
              ? undefined
              : values.eeocVeteranStatus,
          eeocDisabilityStatus:
            values.eeocDisabilityStatus === "-"
              ? undefined
              : values.eeocDisabilityStatus,
        },
        listingId,
      });
      setIsSuccess(true);
    } catch {
      setIsSuccess(false);
    }
    setIsPending(false);
  };

  if (isSuccess === true) {
    return (
      <div>
        <h3>Application Submitted</h3>
        <Link href="/applications" className={cn("mt-3", buttonVariants())}>
          View Application
        </Link>
      </div>
    );
  }

  if (isLoading) return <ApplicationFormLoader />;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
          <div className="grid grid-cols-2 gap-x-5">
            <div>
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
            </div>
            <div>
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
            </div>
          </div>
          {listing?.addressEnabled && (
            <div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {listing?.cityEnabled && (
            <div>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {listing?.stateEnabled && (
            <div>
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {listing?.zipEnabled && (
            <div>
              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {listing?.phoneEnabled && (
            <div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {listing?.linkedInUrlEnabled && (
            <div>
              <FormField
                control={form.control}
                name="linkedInUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {listing?.availableStartDateEnabled && (
            <div>
              <FormField
                control={form.control}
                name="availableStartDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Start Date</FormLabel>
                    <FormControl>
                      <div>
                        <DatePicker
                          {...field}
                          onChange={(date) => {
                            form.setValue(
                              "availableStartDate",
                              date?.toISOString()
                            );
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {listing?.resumeEnabled && (
            <div>
              <Label>Resume</Label>
              <Input
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  var file = e.target?.files?.[0];
                  if (file) {
                    form.setValue("resumeName", file.name);
                    let reader = new FileReader();
                    reader.onloadend = function () {
                      const dataUrl = reader.result;
                      form.setValue("resume", dataUrl);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
          )}
          {listing?.coverLetterEnabled && (
            <div>
              <Label>Cover Letter</Label>
              <Input
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  var file = e.target?.files?.[0];
                  if (file) {
                    form.setValue("coverLetterName", file.name);
                    let reader = new FileReader();
                    reader.onloadend = function () {
                      const dataUrl = reader.result;
                      form.setValue("coverLetter", dataUrl);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
          )}
          {listing?.usAuthorizedEnabled && (
            <div>
              <FormField
                control={form.control}
                name="usAuthorized"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Are you authorized to work in the United States?
                    </FormLabel>
                    <FormControl>
                      <YesNoQuestion {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {listing?.noteEnabled && (
            <div>
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Feel free to add anything else we should know!
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {organization?.eeocEnabled && (
            <>
              <Separator className="!my-8" />
              <h3>Voluntary Questions</h3>
              <div className="muted-text">
                In addition to the information required to consider your
                candidacy we invite you to voluntarily provide the following
                information. This information ensures we meet certain
                regulatory reporting obligations and also further supports the
                development, refinement, and execution of our diversity efforts
                and programs. Information will be kept confidential, used only
                for legitimate business purposes, and will never be used in
                making any employment decisions, including hiring decisions.
                Our company does not discriminate on the basis of any protected 
                group status under any applicable law.
                For additional information, please select the information icon next to each question.
              </div>
              <div>
                {organization?.raceEnabled && (
                  <div>
                    <FormField
                      control={form.control}
                      name="eeocRace"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            Race
                            <Dialog>
                              <DialogTrigger>
                                <Info size="16" className="ml-1" />
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle className="text-center">
                                    Voluntary Self-Identification of Race
                                  </DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                  <p>
                                    For government reporting purposes, we ask
                                    candidates to respond to the race
                                    self-identification question. Answering
                                    this question is entirely voluntary.
                                    Whatever your decision, it will not be
                                    considered in the hiring process or
                                    thereafter.
                                  </p>
                                </DialogDescription>
                              </DialogContent>
                            </Dialog>
                          </FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="None Selected" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="-">
                                  I choose not to disclose
                                </SelectItem>
                                <SelectItem value="asian">Asian</SelectItem>
                                <SelectItem value="black_or_african_american">
                                  Black or African American
                                </SelectItem>
                                <SelectItem value="hispanic_or_latino">
                                  Hispanic or Latino
                                </SelectItem>
                                <SelectItem value="native_american_or_alaska_native">
                                  Native American or Alaska Native
                                </SelectItem>
                                <SelectItem value="native_american_or_pacific_islander">
                                  Native Hawaiian or Other Pacific Islander
                                </SelectItem>
                                <SelectItem value="white">White</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
              <div>
                {organization?.genderEnabled && (
                  <div>
                    <FormField
                      control={form.control}
                      name="eeocGender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            Gender
                            <Dialog>
                              <DialogTrigger>
                                <Info size="16" className="ml-1" />
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle className="text-center">
                                    Voluntary Self-Identification of Gender
                                  </DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                  <p>
                                    For government reporting purposes, we ask
                                    candidates to respond to the gender
                                    self-identification question. Answering
                                    this question is entirely voluntary.
                                    Whatever your decision, it will not be
                                    considered in the hiring process or
                                    thereafter.
                                  </p>
                                </DialogDescription>
                              </DialogContent>
                            </Dialog>
                          </FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="None Selected" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="-">
                                  I choose not to disclose
                                </SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
              <div>
                {organization?.veteranEnabled && (
                  <div>
                    <FormField
                      control={form.control}
                      name="eeocVeteranStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            Veteran Status
                            <Dialog>
                              <DialogTrigger>
                                <Info size="16" className="ml-1" />
                              </DialogTrigger>
                              <DialogContent
                                style={{
                                  overflow: 'auto',
                                  height: '90%',
                                }}
                              >
                                <DialogHeader>
                                  <DialogTitle className="text-center">
                                    Voluntary Self-Identification of Veteran Status
                                  </DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                  <p>
                                    If you believe you belong to any of the categories of protected veterans 
                                    listed below, please indicate by making the appropriate selection. As a 
                                    government contractor subject to the Vietnam Era Veterans Readjustment 
                                    Assistance Act (VEVRAA), we request this information in order to measure 
                                    the effectiveness of the outreach and positive recruitment efforts we undertake 
                                    pursuant to VEVRAA. Classification of protected categories is as follows:
                                    <br></br>
                                    <br></br>
                                    A "disabled veteran" is one of the following: 
                                    a veteran of the U.S. military, ground, naval or air service who is entitled to 
                                    compensation (or who but for the receipt of military retired pay would be entitled 
                                    to compensation) under laws administered by the Secretary of Veterans Affairs; or a 
                                    person who was discharged or released from active duty because of a service-connected 
                                    disability.
                                    <br></br>
                                    <br></br>
                                    A "recently separated veteran" means any veteran during the three-year period beginning on the date 
                                    of such veteran's discharge or release from active duty in the U.S. military, ground, naval, or air 
                                    service.
                                    <br></br>
                                    <br></br>
                                    An "active duty wartime or campaign badge veteran" means a veteran who served on active duty in the 
                                    U.S. military, ground, naval or air service during a war, or in a campaign or expedition for which a 
                                    campaign badge has been authorized under the laws administered by the Department of Defense.
                                    <br></br>
                                    <br></br>
                                    An "Armed forces service medal veteran" means a veteran who, while serving on active duty in the U.S. 
                                    military, ground, naval or air service, participated in a United States military operation for which 
                                    an Armed Forces service medal was awarded pursuant to Executive Order 12985.
                                  </p>
                                </DialogDescription>
                              </DialogContent>
                            </Dialog>
                          </FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="None Selected" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="-">
                                  I choose not to disclose
                                </SelectItem>
                                <SelectItem value="female">
                                  I identify as one or more of the
                                  classifications of protected veteran listed.
                                </SelectItem>
                                <SelectItem value="male">
                                  Other veteran
                                </SelectItem>
                                <SelectItem value="other">
                                  I am not a protected veteran
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
              <div>
                {organization?.disabilityEnabled && (
                  <div>
                    <FormField
                      control={form.control}
                      name="eeocDisabilityStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            Disability Status
                            <Dialog>
                              <DialogTrigger>
                                <Info size="16" className="ml-1" />
                              </DialogTrigger>
                              <DialogContent
                                style={{
                                  overflow: 'auto',
                                  height: '90%',
                                }}
                              >
                                <DialogHeader>
                                  <DialogTitle className="text-center">
                                    Voluntary Self-Identification of Disability
                                  </DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                  <p>
                                    <strong>Why are you being asked to answer this question?</strong>
                                    <br></br>
                                    We are a federal contractor or subcontractor. The law requires us to provide 
                                    equal employment opportunity to qualified people with disabilities. We have a 
                                    goal of having at least 7% of our workers as people with disabilities. The law 
                                    says we must measure our progress towards this goal. To do this, we must ask 
                                    applicants and employees if they have a disability or have ever had one. People 
                                    can become disabled, so we need to ask this question at least every five years.
                                    <br></br>
                                    <br></br>
                                    Completing this question is voluntary, and we hope that you will choose to do so. 
                                    Your answer is confidential. No one who makes hiring decisions will see it. 
                                    Your decision to complete the question and your answer will not harm you in any way. 
                                    If you want to learn more about the law or this form, visit the U.S. Department 
                                    of Labor’s Office of Federal Contract Compliance Programs (OFCCP) website at {" "}
                                    <a 
                                      href="https://www.dol.gov/ofccp" 
                                      target="_blank" rel="noopener noreferrer" 
                                      style={{ color: 'blue', textDecoration: 'underline' }}>
                                        www.dol.gov/ofccp
                                    </a>.
                                    <br></br>
                                    <br></br>
                                    <strong>How do I know if I have a disability?</strong>
                                    <br></br>
                                    A disability is a condition that substantially limits one or more of your “major life 
                                    activities.” If you have or have ever had such a condition, you are a person with a 
                                    disability. 
                                    <br></br>
                                    <br></br>
                                    <strong>Disabilities include, but are not limited to:</strong>
                                  </p>
                                  <ul className="list-disc list-inside">
                                    <li>Alcohol or other substance use disorder (not currently using drugs illegally)</li>
                                    <li>Autoimmune disorder, for example, lupus, fibromyalgia, rheumatoid arthritis, HIV/AIDS</li>
                                    <li>Blind or low vision</li>
                                    <li>Cancer (past or present)</li>
                                    <li>Cardiovascular or heart disease</li>
                                    <li>Celiac disease</li>
                                    <li>Cerebral palsy</li>
                                    <li>Deaf or serious difficulty hearing</li>
                                    <li>Diabetes</li>
                                    <li>Disfigurement, for example, disfigurement caused by burns, wounds, accidents, or congenital disorders</li>
                                    <li>Epilepsy or other seizure disorder</li>
                                    <li>Gastrointestinal disorders, for example, Crohn's Disease, irritable bowel syndrome</li>
                                    <li>Intellectual or developmental disability</li>
                                    <li>Mental health conditions, for example, depression, bipolar disorder, anxiety disorder, schizophrenia, PTSD</li>
                                    <li>Missing limbs or partially missing limbs</li>
                                    <li>Mobility impairment, benefiting from the use of a wheelchair, scooter, walker, leg brace(s) and/or other supports</li>
                                    <li>Nervous system condition, for example, migraine headaches, Parkinson’s disease, multiple sclerosis (MS)</li>
                                    <li>Neurodivergence, for example, attention-deficit/hyperactivity disorder (ADHD), autism spectrum disorder, dyslexia, dyspraxia, other learning disabilities</li>
                                    <li>Partial or complete paralysis (any cause)</li>
                                    <li>Pulmonary or respiratory conditions, for example, tuberculosis, asthma, emphysema</li>
                                    <li>Short stature (dwarfism)</li>
                                    <li>Traumatic brain injury</li>
                                  </ul>
                                </DialogDescription>
                              </DialogContent>
                            </Dialog>
                          </FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="None Selected" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="-">
                                  I choose not to disclose
                                </SelectItem>
                                <SelectItem value="female">
                                  Yes, I have a disability, or have had one in
                                  the past
                                </SelectItem>
                                <SelectItem value="male">
                                  No, I do not have a disability and have not
                                  had one in the past
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            </>
          )}
          <div className="flex justify-end !mt-5">
            <Button disabled={isPending} type="submit">
              Submit Application
            </Button>
          </div>
        </form>
      </Form>
      {isSuccess === false && (
        <p className="text-red-500 text-sm">
          Could not submit application. Please refresh page and try again.
        </p>
      )}
    </div>
  );
};

export default ApplicationForm;
